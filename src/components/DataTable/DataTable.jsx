import React from 'react';
import styles from './DataTable.module.css';

const defaultColumns = [
  { key: 'name', title: '姓名' },
  { key: 'department', title: '部门' },
  { key: 'status', title: '状态' },
  { key: 'date', title: '日期' },
];

function DataTable({ columns = defaultColumns, data = [], statusColorMap = {} }) {
  const renderCell = (column, row) => {
    const value = row[column.key];
    if (column.key === 'status' && statusColorMap[value]) {
      const colorClass = statusColorMap[value];
      return <span className={`${styles.statusBadge} ${styles[colorClass]}`}>{value}</span>;
    }
    return value;
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={styles.th}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id || index} className={styles.tr}>
              {columns.map((col) => (
                <td key={col.key} className={styles.td}>
                  {renderCell(col, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && <div className={styles.empty}>暂无数据</div>}
    </div>
  );
}

export default DataTable;
