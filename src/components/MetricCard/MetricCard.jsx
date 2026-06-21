import React from 'react';
import styles from './MetricCard.module.css';

function MetricCard({ title, value, change, prefix = '', suffix = '', icon = '📊' }) {
  const isPositive = change >= 0;
  const changeSign = isPositive ? '+' : '';

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>
          {prefix}
          {value}
          {suffix}
        </div>
        <div className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
          <span className={styles.arrow}>{isPositive ? '↑' : '↓'}</span>
          <span className={styles.percent}>{changeSign}{Math.abs(change)}%</span>
          <span className={styles.label}>环比</span>
        </div>
      </div>
    </div>
  );
}

export default MetricCard;
