const fs = require('fs/promises');
const { execCommand } = require('./utils');

/**
 * Show Apache available mods
 * @returns {Promise<string[]>}
 */
module.exports.listAvailable = function() {
	return fs.readdir('/etc/apache2/mods-available/').then(result => {
		return [...(new Set(
			result.map(mod => mod.replace(/\.(conf|load)$/i, '').toLowerCase())
		))];
	});
}
/**
 * Show Apache enabled mods
 * @returns {Promise<string[]>}
 */
module.exports.listEnabled = function() {
	return fs.readdir('/etc/apache2/mods-enabled/').then(result => {
		return [...(new Set(
			result.map(mod => mod.replace(/\.(conf|load)$/i, '').toLowerCase())
		))];
	});
}

/**
 * Enable an Apache mod
 * @param {string} mod 
 * @returns {Promise<>}
 */
module.exports.enable = function(mod) {
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
 * Disable an Apache mod
 * @param {string} mod 
 * @returns {Promise<>}
 */
module.exports.disable = function(mod) {
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