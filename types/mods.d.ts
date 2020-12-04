/**
 * Show available Apache mods.
 * @returns {Promise<string[]>}
 */
export function listAvailable(): Promise<string[]>;
/**
 * Show enabled Apache mods.
 * @returns {Promise<string[]>}
 */
export function listEnabled(): Promise<string[]>;
/**
 * Enable an Apache mod.
 * @param {string} mod Mod to enable
 * @returns {Promise<any>}
 */
export function enable(mod: string): Promise<any>;
/**
 * Disable an Apache mod.
 * @param {string} mod  Mod to disable
 * @returns {Promise<any>}
 */
export function disable(mod: string): Promise<any>;
