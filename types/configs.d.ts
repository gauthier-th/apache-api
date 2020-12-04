/**
 * Show available Apache configs.
 * @returns {Promise<string[]>}
 */
export function listAvailable(): Promise<string[]>;
/**
 * Enable an Apache config.
 * @param {string} config Config to enable
 * @returns {Promise<any>}
 */
export function enable(config: string): Promise<any>;
/**
 * Disable an Apache config.
 * @param {string} config Config to disable
 * @returns {Promise<any>}
 */
export function disable(config: string): Promise<any>;
/**
 * Read and parse (optional) a config.
 * @param {string} config Config to read
 * @param {boolean} [parseContent] Wether to parse content
 * @returns {object|string}
 */
export function readConfig(config: string, parseContent?: boolean): object | string;
/**
 * Parse (optional) and save a config.
 * @param {object|string} config Config to save
 * @param {boolean} [fromParsed] Wether to parse content
 * @returns {Promise<any>}
 */
export function saveConfig(config: object | string, fromParsed?: boolean): Promise<any>;
