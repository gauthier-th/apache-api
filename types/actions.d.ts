/**
 * Start Apache service.
 * @returns {Promise<any>}
 */
export function startApache(): Promise<any>;
/**
 * Stop Apache service.
 * @returns {Promise<any>}
 */
export function stopApache(): Promise<any>;
/**
 * Restart Apache service.
 * @returns {Promise<any>}
 */
export function restartApache(): Promise<any>;
/**
 * Returns a promise with the Apache service status.
 * @returns {Promise<string>}
 */
export function statusApache(): Promise<string>;
