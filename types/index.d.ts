export = apacheApi;
declare function apacheApi(path?: string): {
    actions: typeof actions;
    mods: {
        listAvailable: () => Promise<string[]>;
        listEnabled: () => Promise<string[]>;
        enable: (mod: string) => Promise<any>;
        disable: (mod: string) => Promise<any>;
    };
    configs: {
        listAvailable: (sites?: boolean) => Promise<string[]>;
        listEnabled: (sites?: boolean) => Promise<string[]>;
        enable: (config: string, sites?: boolean) => Promise<any>;
        disable: (config: string, sites?: boolean) => Promise<any>;
        readConfig: (config: string, sites?: boolean, parseContent?: boolean) => any;
        saveConfig: (config: any, sites?: boolean, fromParsed?: boolean) => Promise<any>;
    };
    parser: typeof parser;
};
declare namespace apacheApi {
    export { actions };
    export const mods: {
        listAvailable: () => Promise<string[]>;
        listEnabled: () => Promise<string[]>;
        enable: (mod: string) => Promise<any>;
        disable: (mod: string) => Promise<any>;
    };
    export const configs: {
        listAvailable: (sites?: boolean) => Promise<string[]>;
        listEnabled: (sites?: boolean) => Promise<string[]>;
        enable: (config: string, sites?: boolean) => Promise<any>;
        disable: (config: string, sites?: boolean) => Promise<any>;
        readConfig: (config: string, sites?: boolean, parseContent?: boolean) => any;
        saveConfig: (config: any, sites?: boolean, fromParsed?: boolean) => Promise<any>;
    };
    export { parser };
}
import actions = require("./actions");
import parser = require("./parser");
