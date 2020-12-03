export function listAvailable(): Promise<string[]>;
export function listEnabled(): Promise<string[]>;
export function enable(mod: string): Promise<any>;
export function disable(mod: string): Promise<any>;
