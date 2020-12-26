export = mods;
/**
 * @param {string} apachePath
 */
declare function mods(apachePath: string): {
    listAvailable: () => Promise<string[]>;
    listEnabled: () => Promise<string[]>;
    enable: (mod: string) => Promise<any>;
    disable: (mod: string) => Promise<any>;
};
