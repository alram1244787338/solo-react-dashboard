import React from 'react';
import styles from '../Page.module.css';

function TablePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>数据表格</h1>
      <p className={styles.description}>数据表格页面，将展示数据列表、分页、筛选和排序功能。</p>
      <div className={styles.placeholder}>📋 数据表格占位</div>
    </div>
  );
}

export default TablePage;
