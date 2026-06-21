import React from 'react';
import MetricCard from '../../components/MetricCard/MetricCard';
import BarChart from '../../components/BarChart/BarChart';
import { metricCards, visitTrend } from '../../data/metrics';
import styles from './Overview.module.css';

function Overview() {
  return (
    <div className={styles.page}>
      <div className={styles.cards}>
        {metricCards.map((card) => (
          <MetricCard
            key={card.id}
            title={card.title}
            value={card.value}
            change={card.change}
            prefix={card.prefix}
            suffix={card.suffix}
            icon={card.icon}
          />
        ))}
      </div>
      <div className={styles.chart}>
        <BarChart title={visitTrend.title} labels={visitTrend.labels} data={visitTrend.data} />
      </div>
    </div>
  );
}

export default Overview;
