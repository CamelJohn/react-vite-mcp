import { LoaderFunction } from 'react-router-dom';

export const _function_Loader: LoaderFunction = async ({ request, params, context }) => {
  console.log({ request, params, context });
  return {};
};
