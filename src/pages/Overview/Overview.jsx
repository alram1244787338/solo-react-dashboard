import React from 'react';
import styles from '../Page.module.css';

function Overview() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>概览</h1>
      <p className={styles.description}>Dashboard 概览页面，将展示核心数据指标、Canvas 图表和关键业务概览。</p>
      <div className={styles.placeholder}>📊 图表区域占位</div>
    </div>
  );
}

export default Overview;
