export = configs;
/**
 * @param {string} apachePath
 */
declare function configs(apachePath: string): {
    listAvailable: (sites?: boolean) => Promise<string[]>;
    listEnabled: (sites?: boolean) => Promise<string[]>;
    enable: (config: string, sites?: boolean) => Promise<any>;
    disable: (config: string, sites?: boolean) => Promise<any>;
    readConfig: (config: string, sites?: boolean, parseContent?: boolean) => object | string;
    saveConfig: (config: object | string, sites?: boolean, fromParsed?: boolean) => Promise<any>;
};
