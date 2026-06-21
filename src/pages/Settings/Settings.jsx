import React from 'react';
import useSettingsForm from '../../hooks/useSettingsForm';
import styles from './Settings.module.css';

const themeOptions = [
  { value: 'light', label: '浅色模式' },
  { value: 'dark', label: '深色模式' },
  { value: 'auto', label: '跟随系统' },
];

function Settings() {
  const { formData, saved, handleChange, handleSave, handleReset } = useSettingsForm();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>系统设置</h1>
        <p className={styles.subtitle}>配置个人偏好和系统选项</p>
      </div>

      <div className={styles.card}>
        <div className={styles.sectionTitle}>个人设置</div>
        <form className={styles.form} onSubmit={handleSave}>
          <div className={styles.formItem}>
            <label className={styles.label}>显示名称</label>
            <input
              type="text"
              className={styles.input}
              value={formData.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
              placeholder="请输入显示名称"
            />
            <span className={styles.hint}>该名称将在顶部用户区显示</span>
          </div>

          <div className={styles.formItem}>
            <label className={styles.label}>主题偏好</label>
            <select
              className={styles.select}
              value={formData.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
            >
              {themeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className={styles.hint}>
              主题切换功能开发中，暂只作为占位选项
            </span>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={`${styles.button} ${styles.primary}`}>
              保存设置
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.secondary}`}
              onClick={handleReset}
            >
              恢复默认
            </button>
          </div>

          {saved && (
            <div className={`${styles.tip} ${styles.successTip}`}>
              ✓ 设置已保存（当前仅内存中演示，刷新后会恢复默认）
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Settings;
