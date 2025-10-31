const path = require('path')
const fs = require('fs')
const tsconfig = require('./tsconfig.json')

module.exports = function (fileInfo, api) {
    const j = api.jscodeshift
    const root = j(fileInfo.source)
    const filePath = fileInfo.path

    // Get paths from tsconfig
    const paths = tsconfig.compilerOptions.paths || {}

    root.find(j.ImportDeclaration).forEach((path) => {
        // const importPath = path.node.source.value

        console.log(path)

        // Check each alias
        // Object.keys(paths).forEach((alias) => {
        //     const aliasPattern = alias.replace('/*', '')
        //     const targetPattern = paths[alias][0].replace('/*', '')
        //
        //     if (importPath.startsWith(aliasPattern)) {
        //         const relativePath = importPath.replace(
        //             aliasPattern,
        //             targetPattern
        //         )
        //         const absoluteImport = require('path').resolve(
        //             process.cwd(),
        //             relativePath
        //         )
        //         const fileDir = require('path').dirname(filePath)
        //         let relPath = require('path').relative(fileDir, absoluteImport)
        //
        //         if (!relPath.startsWith('.')) {
        //             relPath = './' + relPath
        //         }
        //
        //         path.node.source.value = relPath
        //     }
        // })
    })

    return root.toSource()
}
