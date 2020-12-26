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
        listAvailable: () => Promise<string[]>;
        listEnabled: () => Promise<string[]>;
        enable: (config: string) => Promise<any>;
        disable: (config: string) => Promise<any>;
        readConfig: (config: string, parseContent?: boolean) => any;
        saveConfig: (config: any, fromParsed?: boolean) => Promise<any>;
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
        listAvailable: () => Promise<string[]>;
        listEnabled: () => Promise<string[]>;
        enable: (config: string) => Promise<any>;
        disable: (config: string) => Promise<any>;
        readConfig: (config: string, parseContent?: boolean) => any;
        saveConfig: (config: any, fromParsed?: boolean) => Promise<any>;
    };
    export { parser };
}
import actions = require("./actions");
import parser = require("./parser");
