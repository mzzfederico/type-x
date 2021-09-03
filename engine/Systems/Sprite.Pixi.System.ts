import * as PIXI from 'pixi.js';
import System from "__Core/System";
import Entity from "__Core/Entity";
import Position from "__Components/Position.Component";
import PositionOffset from "__Components/PositionOffset.Component";

import PixiSprite from '../Components/PixiSprite.Component';
import Tilemap from '../Components/Tilemap.Component';

import * as constants from "../Utils/defaultConstants";

export default class SpriteRenderer extends System {
    pixiApp: PIXI.Application = null;

    constructor(pixiApp: PIXI.Application) {
        super();
        this.pixiApp = pixiApp;
    }

    start(entities: Entity[]) {
        const entitiesWithSprites = entities.filter(this.hasSprites);

        entitiesWithSprites.forEach(entity => {
            const spriteComponents: PixiSprite[] = entity.getComponents(PixiSprite) as PixiSprite[];
            spriteComponents.forEach(this.initNewSprite);
            this.updateSprites(entity);
        });
    }

    initNewSprite = (component) => {
        const resources = this.pixiApp.loader.resources;
        const resource = resources[component.name];
        if (resource) {
            component.sprite = new PIXI.Sprite(resource.texture);
            component.sprite.anchor.set(0);
            this.pixiApp.stage.addChild(component.sprite);
        }
    }

    draw = (time, entities) => {
        entities
            .filter(this.hasSprites)
            .forEach(this.updateSprites);

        this.pixiApp.render();
    }

    hasSprites = (entity: Entity): boolean => !!entity.getComponent(PixiSprite);

    updateSprites = (entity: Entity): void => {
        const entityPos = entity.getComponent(Position) as Position;
        const entityPosOffset = entity.getComponent(PositionOffset) as PositionOffset;
        const spriteComponents: PixiSprite[] = entity.getComponents(PixiSprite) as PixiSprite[];

        spriteComponents.forEach(component => {
            if (!component.sprite) return;
            component.sprite.visible = component.isEnabled && !entity.isDisabled;
            component.sprite.position.x = (entityPos.x + (entityPosOffset.x || 0)) * constants.ZOOM * constants.TILE_SIZE;
            component.sprite.position.y = (entityPos.y + (entityPosOffset.y || 0)) * constants.ZOOM * constants.TILE_SIZE;
            component.sprite.width = component.width * constants.ZOOM * constants.TILE_SIZE;
            component.sprite.height = component.height * constants.ZOOM * constants.TILE_SIZE;

            const resources = this.pixiApp.loader.resources;
            const resource = resources[component.name];

            component.sprite.texture = resource.texture;
        });
    }

    handleNewEntity = (entity: Entity): void => {
        if (this.hasSprites(entity)) {
            const spriteComponents: PixiSprite[] = entity.getComponents(PixiSprite) as PixiSprite[];
            spriteComponents.forEach(
                component => component.sprite
                    ? this.pixiApp.stage.addChild(component.sprite)
                    : this.initNewSprite(component)
            )
        }
    }

    cleanup = (entity: Entity) => {
        const spriteComponents: PixiSprite[] = entity.getComponents(PixiSprite) as PixiSprite[];
        spriteComponents.forEach(component => this.pixiApp.stage.removeChild(component.sprite));
    }

    end = (entities: Entity[]) => {
        entities.forEach(this.cleanup);
    }
}

interface IPixiRenderProps {
    width?: number,
    height?: number,
    resources?: Array<{ name: string, url: string }>
}