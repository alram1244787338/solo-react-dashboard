import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const breadcrumbMap = {
  '/': [{ label: '首页' }, { label: '概览' }],
  '/table': [{ label: '首页' }, { label: '数据表格' }],
  '/settings': [{ label: '首页' }, { label: '系统设置' }],
};

function Header() {
  const location = useLocation();
  const breadcrumbs = breadcrumbMap[location.pathname] || [{ label: '首页' }];

  return (
    <header className={styles.header}>
      <div className={styles.breadcrumb}>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className={styles.separator}>/</span>}
            <span
              className={`${styles.breadcrumbItem} ${
                index === breadcrumbs.length - 1 ? styles.breadcrumbActive : ''
              }`}
            >
              {item.label}
            </span>
          </React.Fragment>
        ))}
      </div>
      <div className={styles.right}>
        <div className={styles.user}>
          <span className={styles.avatar}>👤</span>
          <span className={styles.username}>管理员</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
