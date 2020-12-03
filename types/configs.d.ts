export function listAvailable(): Promise<string[]>;
export function listEnabled(): Promise<string[]>;
export function enable(config: string): Promise<any>;
export function disable(config: string): Promise<any>;
export function readConfig(config: string, parseContent?: boolean): object | string;
export function saveConfig(config: object | string, fromParsed?: boolean): Promise<any>;
