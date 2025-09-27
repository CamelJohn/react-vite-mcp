import { MiddlewareFunction } from 'react-router-dom';

export const _function_Middleware: MiddlewareFunction = async (
  { request, params, context },
  next
) => {
  console.log({ request, params, context });
  //   before the route
  await next();
  //   after the route
};
