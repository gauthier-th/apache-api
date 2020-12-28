const fs = require('fs/promises');
const path = require('path');

const { execCommand } = require('./utils');
const { parse, serialize } = require('./parser');

/**
 * @param {string} apachePath 
 */
function configs(apachePath) {
	/**
	 * Show available Apache configs.
	 * @param {boolean} sites Wether to list sites folder
	 * @returns {Promise<string[]>}
	 */
	function listAvailable(sites = false) {
		return fs.readdir(path.join(apachePath, sites ? 'sites-available/' : 'conf-available/')).then(result => {
			return [...(new Set(
				result.map(mod => mod.replace(/\.conf$/i, '').toLowerCase())
			))];
		});
	}
	/**
	 * Show enabled Apache configs.
	 * @param {boolean} sites Wether to list sites folder
	 * @returns {Promise<string[]>}
	 */
	function listEnabled(sites = false) {
		return fs.readdir(path.join(apachePath, sites ? 'sites-available/' : 'conf-available/')).then(result => {
			return [...(new Set(
				result.map(mod => mod.replace(/\.conf$/i, '').toLowerCase())
			))];
		});
	}

	/**
	 * Enable an Apache config.
	 * @param {string} config Config to enable
	 * @param {boolean} sites Wether to enable sites folder
	 * @returns {Promise<any>}
	 */
	function enable(config, sites = false) {
		return new Promise((resolve, reject) => {
			execCommand((sites ? 'a2ensite ' : 'a2enconf ') + config).then(() => {
				resolve();
			}).catch(error => {
				if (error.toString().toLowerCase().includes(`${sites ? 'site' : 'config'} ${config} does not exist!`))
					reject(`Error: ${sites ? 'site' : 'config'} ${config} does not exist!`);
				else
					reject(error.toString());
			});
		});
	}
	/**
	 * Disable an Apache config.
	 * @param {string} config Config to disable
	 * @param {boolean} sites Wether to disable sites folder
	 * @returns {Promise<any>}
	 */
	function disable(config, sites = false) {
		return new Promise((resolve, reject) => {
			execCommand((sites ? 'a2dissite ' : 'a2disconf ') + config).then(() => {
				resolve();
			}).catch(error => {
				if (error.toString().toLowerCase().includes(`${sites ? 'site' : 'config'} ${config} does not exist!`))
					reject(`Error: ${sites ? 'site' : 'config'} ${config} does not exist!`);
				else
					reject(error.toString());
			});
		});
	}

	/**
	 * Read and parse (optional) a config.
	 * @param {string} config Config to read
	 * @param {boolean} sites Wether to use sites folder
	 * @param {boolean} [parseContent] Wether to parse content
	 * @returns {object|string}
	 */
	async function readConfig(config, sites = false, parseContent = true) {
		const content = await fs.readFile(path.join(apachePath, sites ? 'sites-available/' : 'conf-available/', config.replace(/\.conf$/i, '') + '.conf'));
		if (parseContent)
			return parse(content.toString());
		else
			return content;
	}

	/**
	 * Parse (optional) and save a config.
	 * @param {object|string} config Config to save
	 * @param {boolean} sites Wether to use sites folder
	 * @param {boolean} [fromParsed] Wether to parse content
	 * @returns {Promise<any>}
	 */
	async function saveConfig(config, sites = false, fromParsed = true) {
		return fs.writeFile(path.join(apachePath, sites ? 'sites-available/' : 'conf-available/', config.replace(/\.conf$/i, '') + '.conf'), fromParsed ? serialize(content) : content);
	}

	return {
		listAvailable,
		listEnabled,
		enable,
		disable,
		readConfig,
		saveConfig
	};
}

module.exports = configs;
