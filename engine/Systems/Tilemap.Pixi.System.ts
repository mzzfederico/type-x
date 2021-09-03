import * as PIXI from 'pixi.js';
import System from "__Core/System";
import Entity from "__Core/Entity";
import Tilemap from '../Components/Tilemap.Component';
import { ISpritesheetData } from 'pixi.js';
import { TILE_SIZE, ZOOM } from '../Utils/defaultConstants';
import Position from '../Components/Position.Component';

export default class TilemapRenderer extends System {
    pixiApp: PIXI.Application = null;
    tilemaps: PIXI.Spritesheet[] = [];

    constructor(pixiApp: PIXI.Application, tilemaps: Array<{ name: string, atlas: ISpritesheetData }>) {
        super();
        this.pixiApp = pixiApp;

        tilemaps.forEach(
            entry => {
                let spritesheet = new PIXI.Spritesheet(
                    this.pixiApp.loader.resources[entry.name].texture,
                    entry.atlas as ISpritesheetData
                );
                spritesheet.parse(() => { });

                this.tilemaps[entry.name] = spritesheet;
            }
        )
    }

    hasTilemap = (entity: Entity): boolean => !!entity.getComponent(Tilemap);

    start(entities: Entity[]) {
        entities.filter(this.hasTilemap).forEach(entity => {
            const tilemapComps: Tilemap[] = entity.getComponents(Tilemap) as Tilemap[];
            tilemapComps.forEach((component) => this.initTilemap(entity, component));
        });
    }

    initTilemap = (entity: Entity, component: Tilemap) => {
        const position = entity.getComponent(Position) as Position;
        component.tilemap = this.tilemaps[component.name];
        component.sprites = [];

        component.map.forEach((row, rowNumber: number) => {
            row.forEach((cell, columnNumber: number) => {
                if (!cell) return;
                if (!(cell in component.tilemap.textures)) return;
                const texture = component.tilemap.textures[cell];
                const sprite = new PIXI.Sprite(texture);
                sprite.x = (columnNumber * TILE_SIZE * ZOOM) + (position.x * TILE_SIZE * ZOOM);
                sprite.y = (rowNumber * TILE_SIZE * ZOOM) + (position.y * TILE_SIZE * ZOOM);
                sprite.height = TILE_SIZE * ZOOM;
                sprite.width = TILE_SIZE * ZOOM;

                this.pixiApp.stage.addChild(sprite);
                component.sprites = [...component.sprites, sprite];
            });
        })
    }

    handleNewEntity(entity) {
        const tilemapComps: Tilemap[] = entity.getComponents(Tilemap) as Tilemap[];

        tilemapComps.forEach((component) => this.initTilemap(entity, component));
    }

    cleanup(entity) {
        const tilemapComps: Tilemap[] = entity.getComponents(Tilemap) as Tilemap[];

        tilemapComps.forEach((component) => component.sprites.forEach(sprite => sprite.destroy()));
    }
}