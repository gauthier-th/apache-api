export type ParserResult = {
    tagName: string;
    attribute: string;
    children: ParserResult[];
};
/**
* @typedef {Object} ParserResult
* @property {string} tagName
* @property {string} attribute
* @property {ParserResult[]} children
*/
/**
 * Parse a apache configuration file
 * @param {string} content
 * @param {boolean} skipComments
 * @returns {{ children: ParserResult[] }}
 */
export function parse(content: string, skipComments?: boolean): {
    children: ParserResult[];
};
/**
 * Serialize a apache configuration file
 * @param {{ children: ParserResult[] }} content
 * @param {string} indent
 * @param {boolean} extendedSpaces
 * @returns {string}
 */
export function serialize(content: {
    children: ParserResult[];
}, indent?: string, extendedSpaces?: boolean, _nodeCount?: number): string;
