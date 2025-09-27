import { run_commands } from '../utils/run-commands';
export const init = async ({ name }) => {
    const commands = [
        `npm create vite ${name} -- --template react-ts`,
        `cd ${name} && npm i react-router-dom`,
        `mkdir -p ${name}/src/{pages,shared,routes,layouts}`,
        `touch ${name}/src/routes/{provider.tsx,router.tsx,routes.tsx}`,
        `rm ${name}/src/{main.tsx,App.tsx,App.css}`,
        `cp -r ./templates/init/. ./${name}/src/`,
    ];
    await run_commands(commands);
    return {
        content: [],
    };
};
