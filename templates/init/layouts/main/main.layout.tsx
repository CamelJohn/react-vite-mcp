import { Outlet, NavLink } from 'react-router';
import styles from './main-layout.module.css';

interface ILink {
  to: string;
  label: string;
}

interface IMainLayoutProps {
  title?: string;
  links?: ILink[];
}

export const MainLayout = ({ title = '', links = [] }: IMainLayoutProps) => (
  <div>
    <h1>{title}</h1>
    <nav className={styles.nav}>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to}>
          {link.label}
        </NavLink>
      ))}
    </nav>
    <main>
      <Outlet />
    </main>
    <footer>Footer</footer>
  </div>
);
