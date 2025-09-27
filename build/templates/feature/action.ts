import { ActionFunction } from 'react-router-dom';

export const _function_Action: ActionFunction = async ({ request, params, context }) => {
  console.log({ request, params, context });
  return { success: true };
};
