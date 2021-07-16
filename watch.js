const esbuildConfig = require('./esbuild.config');

require('esbuild').build({
    ...esbuildConfig,
    watch: {
        onRebuild(error, result) {
            if (error) console.error('watch build failed:', error)
            else console.log('watch build succeeded:', result)
        },
    },
});