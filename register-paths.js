const tsConfig = require('./tsconfig.json')
const tsConfigPaths = require('tsconfig-paths')

const baseUrl = './build' // or './build' depending on your output directory
tsConfigPaths.register({
    baseUrl,
    paths: tsConfig.compilerOptions.paths,
})
