import React from 'react';
import { formatChange, getChangeSign } from '../../utils/format';
import styles from './MetricCard.module.css';

function MetricCard({ title, value, change, prefix = '', suffix = '', icon = '📊' }) {
  const signClass = getChangeSign(change);
  const isPositive = signClass === 'positive';

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
        <div className={`${styles.change} ${styles[signClass]}`}>
          <span className={styles.arrow}>{isPositive ? '↑' : '↓'}</span>
          <span className={styles.percent}>{formatChange(change)}</span>
          <span className={styles.label}>环比</span>
        </div>
      </div>
    </div>
  );
}

export default MetricCard;
