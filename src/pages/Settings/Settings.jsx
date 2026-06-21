import React from 'react';
import styles from '../Page.module.css';

function Settings() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>系统设置</h1>
      <p className={styles.description}>系统设置页面，将包含主题切换、个人配置和系统偏好设置。</p>
      <div className={styles.placeholder}>⚙️ 设置表单占位</div>
    </div>
  );
}

export default Settings;
