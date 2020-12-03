const { execCommand } = require("../utils");

/**
 * @returns {Promise<string>}
 */
module.exports.startApache = function() {
	return systemctl('start');
}

/**
 * @returns {Promise<string>}
 */
module.exports.stopApache = function() {
	return systemctl('stop');
}

/**
 * @returns {Promise<string>}
 */
module.exports.restartApache = function() {
	return systemctl('restart');
}

/**
 * @returns {Promise<string>}
 */
module.exports.statusApache = function() {
	return systemctl('status');
}

function systemctl(command) {
	return execCommand(`systemctl ${command} apache2`).then(({ error, stdout, stderr }) => stdout);
}