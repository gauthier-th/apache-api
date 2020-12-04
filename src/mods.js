const fs = require('fs/promises');
const { execCommand } = require('./utils');

/**
 * Show available Apache mods.
 * @returns {Promise<string[]>}
 */
function listAvailable() {
	return fs.readdir('/etc/apache2/mods-available/').then(result => {
		return [...(new Set(
			result.map(mod => mod.replace(/\.(conf|load)$/i, '').toLowerCase())
		))];
	});
}
module.exports.listAvailable = listAvailable;
/**
 * Show enabled Apache mods.
 * @returns {Promise<string[]>}
 */
function listEnabled() {
	return fs.readdir('/etc/apache2/mods-enabled/').then(result => {
		return [...(new Set(
			result.map(mod => mod.replace(/\.(conf|load)$/i, '').toLowerCase())
		))];
	});
}
module.exports.listEnabled = listEnabled;

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
module.exports.enable = enable;
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
module.exports.disable = disable;