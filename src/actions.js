const { execCommand } = require("../utils");

/**
 * @returns {Promise<string>}
 */
function startApache() {
	return systemctl('start');
}
module.exports.startApache = startApache;

/**
 * @returns {Promise<string>}
 */
function stopApache() {
	return systemctl('stop');
}
module.exports.stopApache = stopApache;

/**
 * @returns {Promise<string>}
 */
function restartApache() {
	return systemctl('restart');
}
module.exports.restartApache = restartApache;

/**
 * @returns {Promise<string>}
 */
function statusApache() {
	return systemctl('status');
}
module.exports.statusApache = statusApache;

function systemctl(command) {
	return execCommand(`systemctl ${command} apache2`).then(({ error, stdout, stderr }) => stdout);
}