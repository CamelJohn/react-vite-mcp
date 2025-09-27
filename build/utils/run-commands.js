import util from 'node:util';
import child_process from 'node:child_process';
const exec = util.promisify(child_process.exec);
export const run_commands = async (commands) => {
    for (const cmd of commands) {
        await exec(cmd, { cwd: process.cwd() });
    }
};
