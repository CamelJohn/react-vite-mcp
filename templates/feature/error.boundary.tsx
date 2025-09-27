import { useRouteError } from "react-router-dom";

export const _class_ErrorBoundary = () => {
    const error = useRouteError();

    return (
    <div>
      <h2>Something went wrong</h2>
      <pre>{JSON.stringify(error)}</pre>
    </div>
  );
};
