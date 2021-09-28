const fs = require('fs')
const path = require('path')

const isRootDir = (dir) => {
	// define a "root dir" as one which has package.json in it
	return fs.readdirSync(dir).find((d) => d ==='package.json')
}

const getProjectRoot = () => {
	let dir = process.cwd()
	while (!isRootDir(dir)) {
		let parentDir = path.resolve(dir, '..')
		if (parentDir === dir) {
			throw new Error(`Couldn't identify root directory from ${process.cwd()}`)
		}
		dir = parentDir
	}

	return dir

}

const getWidgetConfig = (argv) => {
	const moduleName = path.basename(argv.$0)
	const root = getProjectRoot()

	const baseConfigFilePath = path.resolve(root, `config.${moduleName}.json`)
	const widgetConfigFilePath = argv.directory ? path.resolve(argv.directory, `config.${moduleName}.json`) : path.resolve(process.cwd(), `config.${moduleName}.json`)
	let widgetConfig = {}
	try {
		Object.assign(widgetConfig, require(baseConfigFilePath))
	} catch (e) {
	}

	if (widgetConfigFilePath) {
		try {
			Object.assign(widgetConfig, require(widgetConfigFilePath))
		} catch (e) {
		}
	}

	return widgetConfig
}

const getSecretsConfig = (argv) => {
	const moduleName = path.basename(argv.$0)
	const root = getProjectRoot()

    const baseSecretsFilePath = path.resolve(root, `secrets.${moduleName}.json`)
	const widgetSecretsFilePath = argv.directory ? path.resolve(argv.directory, `secrets.${moduleName}.json`) : path.resolve(process.cwd(), `secrets.${moduleName}.json`)
	let secretsConfig = {}
	try {
		Object.assign(secretsConfig, require(baseSecretsFilePath))
	} catch (e) {
	}

	if (widgetSecretsFilePath) {
		try {
			Object.assign(secretsConfig, require(widgetSecretsFilePath))
		} catch (e) {
		}
	}

	return secretsConfig

}

module.exports = {
	getWidgetConfig,
	getSecretsConfig
}