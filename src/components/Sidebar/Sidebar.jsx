import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const menuItems = [
  { path: '/', label: '概览', icon: '📊' },
  { path: '/table', label: '表格', icon: '📋' },
  { path: '/settings', label: '设置', icon: '⚙️' },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>📈</span>
        <span className={styles.logoText}>Dashboard</span>
      </div>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
