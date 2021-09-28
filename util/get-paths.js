const path = require('path')

module.exports = argv => {
    const moduleName = path.basename(argv.$0);
    const cwd = argv.directory ? path.resolve(argv.directory) : process.cwd()
    const configFilePath = path.resolve(cwd, `config.${moduleName}.json`)
    const secretsFilePath = path.resolve(cwd, `secrets.${moduleName}.json`)
    const schemaFilePath = path.resolve(cwd, 'schema.json')
    const storefrontApiQueryFilePath = path.resolve(cwd, 'storefront-api-query.graphql')
    const templateFilePath = path.resolve(cwd, 'template.html')

    return {
        cwd,
        configFilePath,
        secretsFilePath,
        schemaFilePath,
        storefrontApiQueryFilePath,
        templateFilePath,
    }

}