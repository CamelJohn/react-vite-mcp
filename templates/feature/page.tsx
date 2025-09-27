import { useLoaderData } from "react-router-dom";
import styles from './page.module.css';

interface ILoaderData {}

export function _class_Page() {
  const data = useLoaderData() as ILoaderData;
  console.log({ data, styles });

  return (
    <div>
      <h1>_placeholder_ Page</h1>
    </div>
  );
}