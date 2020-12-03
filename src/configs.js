const fs = require('fs/promises');
const path = require('path');

const { execCommand } = require('./utils');
const { parse, serialize } = require('./parser');

/**
 * Show Apache available configs
 * @returns {Promise<string[]>}
 */
function listAvailable() {
	return fs.readdir('/etc/apache2/conf-available/').then(result => {
		return [...(new Set(
			result.map(mod => mod.replace(/\.conf$/i, '').toLowerCase())
		))];
	});
}
module.exports.listAvailable;
/**
 * Show Apache enabled configs
 * @returns {Promise<string[]>}
 */
function listEnabled() {
	return fs.readdir('/etc/apache2/conf-enabled/').then(result => {
		return [...(new Set(
			result.map(mod => mod.replace(/\.conf$/i, '').toLowerCase())
		))];
	});
}
module.exports.listAvailable = listAvailable;

/**
 * Enable an Apache config
 * @param {string} config 
 * @returns {Promise<>}
 */
function enable(config) {
	return new Promise((resolve, reject) => {
		execCommand('a2enconf ' + config).then(() => {
			resolve();
		}).catch(error => {
			if (error.toString().toLowerCase().includes(`conf ${config} does not exist!`))
				reject(`Error: config ${config} does not exist!`);
			else
				reject(error.toString());
		});
	});
}
module.exports.enable = enable;
/**
 * Disable an Apache config
 * @param {string} config 
 * @returns {Promise<>}
 */
function disable(config) {
	return new Promise((resolve, reject) => {
		execCommand('a2disconf ' + config).then(() => {
			resolve();
		}).catch(error => {
			if (error.toString().toLowerCase().includes(`conf ${config} does not exist!`))
				reject(`Error: config ${config} does not exist!`);
			else
				reject(error.toString());
		});
	});
}
module.exports.disable = disable;

/**
 * Read and parse (optionnal) a config
 * @param {string} config 
 * @param {boolean} parseContent 
 * @returns {object|string}
 */
async function readConfig(config, parseContent = true) {
	const content = await fs.readFile(path.join('/etc/apache2/conf-available/', config.replace(/\.conf$/i, '') + '.conf'));
	if (parseContent)
		return parse(content);
	else
		return content;
}
module.exports.readConfig = readConfig;

/**
 * Save and parse (optionnal) a config
 * @param {object|string} config 
 * @param {boolean} fromParsed 
 * @returns {Promise}
 */
async function saveConfig(config, fromParsed = true) {
	return fs.writeFile(path.join('/etc/apache2/conf-available/', config.replace(/\.conf$/i, '') + '.conf'), fromParsed ? serialize(content) : content);
}
module.exports.saveConfig = saveConfig;