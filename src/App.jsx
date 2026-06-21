import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import styles from './App.module.css';

const Overview = lazy(() => import('./pages/Overview/Overview'));
const TablePage = lazy(() => import('./pages/Table/Table'));
const Settings = lazy(() => import('./pages/Settings/Settings'));

function LoadingFallback() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
      <span className={styles.loadingText}>加载中...</span>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="table" element={<TablePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
