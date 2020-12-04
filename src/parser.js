/**
 * Functions to parse and serialize an Apache configuration file.
 * @module parser
 */

/**
* @typedef {Object} ParserResult
* @property {string} tagName 
* @property {string} attribute 
* @property {ParserResult[]} children 
*/

/**
 * Parse an Apache configuration file.
 * @param {string} content Apache configuration file to parse
 * @param {boolean} [skipComments] Wether ignore comments. Default: `false`
 * @returns {{ children: ParserResult[] }}
 */
function parse(content, skipComments = false) {
	if (skipComments)
		content = content.replace(/^#(.*)\n?/gm, '').trim();
	const result = {
		children: []
	};

	const match = parseTag(content);
	if (!match)
		return result;
	if (match.tagName === '$comment' || match.tagName === '$rule') {
		result.children.push({
			tagName: match.tagName,
			content: match.content
		});
	}
	else {
		result.children.push({
			tagName: match.tagName,
			attribute: match.attribute,
			...parse(match.content)
		});
	}
	if (match.after) {
		const afterContent = parse(match.after);
		if (afterContent.children.length > 0) {
			result.children.push(...afterContent.children);
		}
	}

	return result;
}

/**
 * Parse a virtual host content
 * @param {string} content 
 * @param {string} [tag] 
 * @returns {{ tagName: string, attribute: string, content: string, outer: string }}
 */
function parseTag(content) {
	const match = /(^(|\s*#.*)$|(<(.*?)(\s+(.*?))?>)\s*((.|\s)*?)\s*<\/\4>|^(.*)$)/gm.exec(content);
	if (match && match[0]) {
		if (match[2]) {
			return {
				tagName: '$comment',
				attribute: null,
				content: match[2],
				after: content.slice(match.index + match[0].length).trim()
			}
		}
		else if (match[9]) {
			return {
				tagName: '$rule',
				attribute: null,
				content: match[9],
				after: content.slice(match.index + match[0].length).trim()
			}
		}
		else {
			return {
				tagName: match[4],
				attribute: match[6] || null,
				content: match[7],
				after: content.slice(match.index + match[0].length).trim()
			}
		}
	}
	else
		return null;
}


/**
 * Serialize an Apache configuration file.
 * @param {{ children: ParserResult[] }} content Configuration object to serialize
 * @param {string} [indent] Indent type. Default: two space
 * @param {boolean} [extendedSpaces] Add more line returns between instructions. Default: `false`
 * @returns {string}
 */
function serialize(content, indent = '  ', extendedSpaces = false, _nodeCount = -1) {
	if (content.tagName === '$comment' || content.tagName === '$rule')
		return indent.repeat(_nodeCount) + content.content;
	let result = '';
	if (content.tagName) {
		result += indent.repeat(_nodeCount) + `<${content.tagName}${content.attribute ? ' ' + content.attribute : ''}>\n`;
		if (extendedSpaces)
			result += '\n';
	}
	for (let child of (content.children || [])) {
		result += serialize(child, indent, extendedSpaces, _nodeCount + 1) + '\n';
	}
	if (content.tagName) {
		if (extendedSpaces)
			result += '\n';
		result += indent.repeat(_nodeCount) + `</${content.tagName}>`;
		if (extendedSpaces)
			result += '\n';
	}
	return result;
}


module.exports.parse = parse;
module.exports.serialize = serialize;