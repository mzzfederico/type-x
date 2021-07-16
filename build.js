const esbuildConfig = require('./esbuild.config');

require('esbuild').build({
    ...esbuildConfig
});