import React from 'react';
import DataTable from '../../components/DataTable/DataTable';
import { tableData, statusColorMap } from '../../data/table';
import styles from './Table.module.css';

const columns = [
  { key: 'name', title: '姓名' },
  { key: 'department', title: '部门' },
  { key: 'status', title: '状态' },
  { key: 'date', title: '入职日期' },
];

function TablePage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>数据表格</h1>
        <p className={styles.subtitle}>共 {tableData.length} 条记录</p>
      </div>
      <DataTable columns={columns} data={tableData} statusColorMap={statusColorMap} />
    </div>
  );
}

export default TablePage;
