import React from 'react';
import useChart from '../../hooks/useChart';
import styles from './BarChart.module.css';

function BarChart({ title = '', labels = [], data = [], height = 320 }) {
  const { canvasRef, containerRef } = useChart({ labels, data, height });

  return (
    <div className={styles.wrapper}>
      {title && <div className={styles.title}>{title}</div>}
      <div ref={containerRef} className={styles.chart}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default BarChart;
