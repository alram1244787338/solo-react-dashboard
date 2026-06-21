import { describe, it, expect } from 'vitest';
import { createSettingsForm } from '../src/hooks/useSettingsForm';

describe('createSettingsForm 纯函数逻辑', () => {
  it('getInitialValues 返回正确初始值（无覆盖）', () => {
    const form = createSettingsForm();
    expect(form.getInitialValues()).toEqual({
      theme: 'light',
      displayName: '管理员',
    });
  });

  it('getInitialValues 接受覆盖值', () => {
    const form = createSettingsForm({ theme: 'dark', displayName: '张三' });
    expect(form.getInitialValues()).toEqual({
      theme: 'dark',
      displayName: '张三',
    });
  });

  it('getInitialValues 只覆盖指定字段，其他保留默认', () => {
    const form = createSettingsForm({ theme: 'auto' });
    expect(form.getInitialValues()).toEqual({
      theme: 'auto',
      displayName: '管理员',
    });
  });

  it('getDefaultValues 始终返回默认值', () => {
    const form = createSettingsForm({ theme: 'dark', displayName: '张三' });
    expect(form.getDefaultValues()).toEqual({
      theme: 'light',
      displayName: '管理员',
    });
  });

  it('getInitialValues 返回新对象，不会被外部修改污染', () => {
    const form = createSettingsForm();
    const v1 = form.getInitialValues();
    v1.theme = 'hacked';
    const v2 = form.getInitialValues();
    expect(v2.theme).toBe('light');
  });

  it('handleChange 更新单个字段，保持其他不变', () => {
    const form = createSettingsForm();
    const current = form.getInitialValues();
    const next = form.handleChange(current, 'displayName', '新名字');
    expect(next).toEqual({
      theme: 'light',
      displayName: '新名字',
    });
    expect(current.displayName).toBe('管理员');
  });

  it('handleChange 更新 theme 字段', () => {
    const form = createSettingsForm();
    const current = form.getInitialValues();
    const next = form.handleChange(current, 'theme', 'dark');
    expect(next).toEqual({
      theme: 'dark',
      displayName: '管理员',
    });
  });

  it('handleChange 不修改原对象（immutable）', () => {
    const form = createSettingsForm();
    const current = form.getInitialValues();
    form.handleChange(current, 'theme', 'dark');
    expect(current.theme).toBe('light');
  });
});

describe('useSettingsForm 行为验证', () => {
  it('handleChange 连续更新多个字段', () => {
    const form = createSettingsForm();
    let state = form.getInitialValues();
    state = form.handleChange(state, 'displayName', '用户A');
    state = form.handleChange(state, 'theme', 'auto');
    expect(state).toEqual({
      theme: 'auto',
      displayName: '用户A',
    });
  });

  it('handleSave 和 handleReset 协作流程', () => {
    const form = createSettingsForm();
    let saved = false;
    let state = form.getInitialValues();

    state = form.handleChange(state, 'displayName', '测试');
    saved = true;

    state = form.getDefaultValues();
    saved = false;

    expect(state).toEqual({
      theme: 'light',
      displayName: '管理员',
    });
    expect(saved).toBe(false);
  });
});
