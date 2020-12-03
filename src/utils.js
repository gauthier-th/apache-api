const child = require('child_process');

/**
 * @param {string} command 
 * @returns {Promise<{ error: string, stdout: string, stderr: string }>}
 */
module.exports.execCommand = function(command) {
	return new Promise((resolve, reject) => {
		child.exec(command, (error, stdout, stderr) => {
			if (error)
				reject(error);
			else
				resolve({ error, stdout, stderr });
		});
	});
}