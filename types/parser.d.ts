export type ParserResult = {
    tagName: string;
    attribute: string;
    children: ParserResult[];
};
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
export function parse(content: string, skipComments?: boolean): {
    children: ParserResult[];
};
/**
 * Serialize an Apache configuration file.
 * @param {{ children: ParserResult[] }} content Configuration object to serialize
 * @param {string} [indent] Indent type. Default: two space
 * @param {boolean} [extendedSpaces] Add more line returns between instructions. Default: `false`
 * @returns {string}
 */
export function serialize(content: {
    children: ParserResult[];
}, indent?: string, extendedSpaces?: boolean, _nodeCount?: number): string;
