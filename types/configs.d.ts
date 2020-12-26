export = configs;
/**
 * @param {string} apachePath
 */
declare function configs(apachePath: string): {
    listAvailable: () => Promise<string[]>;
    listEnabled: () => Promise<string[]>;
    enable: (config: string) => Promise<any>;
    disable: (config: string) => Promise<any>;
    readConfig: (config: string, parseContent?: boolean) => object | string;
    saveConfig: (config: object | string, fromParsed?: boolean) => Promise<any>;
};
