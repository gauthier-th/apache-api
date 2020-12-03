export function execCommand(command: string): Promise<{
    error: string;
    stdout: string;
    stderr: string;
}>;
