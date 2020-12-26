/**
 * Show Apache status, start, stop, and restart Apache service with systemctl.
 * @module actions
 */

const { execCommand } = require("./utils");

/**
 * Start Apache service.
 * @returns {Promise<any>}
 */
function startApache() {
	return systemctl('start');
}
module.exports.startApache = startApache;

/**
 * Stop Apache service.
 * @returns {Promise<any>}
 */
function stopApache() {
	return systemctl('stop');
}
module.exports.stopApache = stopApache;

/**
 * Restart Apache service.
 * @returns {Promise<any>}
 */
function restartApache() {
	return systemctl('restart');
}
module.exports.restartApache = restartApache;

/**
 * Returns a promise with the Apache service status.
 * @returns {Promise<string>}
 */
function statusApache() {
	return systemctl('status');
}
module.exports.statusApache = statusApache;

function systemctl(command) {
	return execCommand(`systemctl ${command} apache2`).then(({ error, stdout, stderr }) => stdout);
}