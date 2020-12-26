const actions = require('./actions');
const mods = require('./mods');
const configs = require('./configs');
const parser = require('./parser');

const defaultPath = '/etc/apache2/';

function apacheApi(path = defaultPath) {
	return {
		actions: actions,
		mods: mods(path),
		configs: configs(path),
		parser
	}
}
apacheApi.actions = actions;
apacheApi.mods = mods(defaultPath);
apacheApi.configs = configs(defaultPath);
apacheApi.parser = parser;

module.exports = apacheApi;