const fs = require('fs/promises');
const path = require('path');
const { execCommand } = require('./utils');

/**
 * @param {string} apachePath 
 */
function mods(apachePath) {
	/**
	 * Show available Apache mods.
	 * @returns {Promise<string[]>}
	 */
	function listAvailable() {
		return fs.readdir(path.join(apachePath, 'mods-available/')).then(result => {
			return [...(new Set(
				result.map(mod => mod.replace(/\.(conf|load)$/i, '').toLowerCase())
			))];
		});
	}
	/**
	 * Show enabled Apache mods.
	 * @returns {Promise<string[]>}
	 */
	function listEnabled() {
		return fs.readdir(path.join(apachePath, 'mods-enabled/')).then(result => {
			return [...(new Set(
				result.map(mod => mod.replace(/\.(conf|load)$/i, '').toLowerCase())
			))];
		});
	}
	
	/**
	 * Enable an Apache mod.
	 * @param {string} mod Mod to enable
	 * @returns {Promise<any>}
	 */
	function enable(mod) {
		return new Promise((resolve, reject) => {
			execCommand('a2enmod ' + mod).then(() => {
				resolve();
			}).catch(error => {
				if (error.toString().toLowerCase().includes(`module ${mod} does not exist!`))
					reject(`Error: module ${mod} does not exist!`);
				else
					reject(error.toString());
			});
		});
	}
	/**
	 * Disable an Apache mod.
	 * @param {string} mod  Mod to disable
	 * @returns {Promise<any>}
	 */
	function disable(mod) {
		return new Promise((resolve, reject) => {
			execCommand('a2dismod ' + mod).then(() => {
				resolve();
			}).catch(error => {
				if (error.toString().toLowerCase().includes(`module ${mod} does not exist!`))
					reject(`Error: module ${mod} does not exist!`);
				else
					reject(error.toString());
			});
		});
	}

	return {
		listAvailable,
		listEnabled,
		enable,
		disable
	}
}

module.exports = mods;
