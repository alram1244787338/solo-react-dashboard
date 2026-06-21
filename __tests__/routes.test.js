import { describe, it, expect } from 'vitest';
import { routeConfig, getBreadcrumbByPath } from '../src/config/routes';

describe('routeConfig', () => {
  it('包含 3 个路由配置', () => {
    expect(routeConfig.length).toBe(3);
  });

  it('每个路由都有 path、label、breadcrumb、icon', () => {
    routeConfig.forEach((route) => {
      expect(route).toHaveProperty('path');
      expect(route).toHaveProperty('label');
      expect(route).toHaveProperty('breadcrumb');
      expect(route).toHaveProperty('icon');
      expect(typeof route.path).toBe('string');
      expect(typeof route.label).toBe('string');
      expect(typeof route.breadcrumb).toBe('string');
      expect(typeof route.icon).toBe('string');
    });
  });

  it('路径唯一不重复', () => {
    const paths = routeConfig.map((r) => r.path);
    const uniquePaths = [...new Set(paths)];
    expect(paths.length).toBe(uniquePaths.length);
  });
});

describe('getBreadcrumbByPath', () => {
  it('正常路径返回正确面包屑：/table', () => {
    const result = getBreadcrumbByPath('/table');
    expect(result).toEqual([{ label: '首页' }, { label: '数据表格' }]);
  });

  it('根路径返回概览面包屑：/', () => {
    const result = getBreadcrumbByPath('/');
    expect(result).toEqual([{ label: '首页' }, { label: '概览' }]);
  });

  it('/settings 返回系统设置', () => {
    const result = getBreadcrumbByPath('/settings');
    expect(result).toEqual([{ label: '首页' }, { label: '系统设置' }]);
  });

  it('不存在的路径返回首页 + 未知', () => {
    const result = getBreadcrumbByPath('/unknown-path');
    expect(result).toEqual([{ label: '首页' }, { label: '未知' }]);
  });

  it('空字符串路径返回未知', () => {
    const result = getBreadcrumbByPath('');
    expect(result).toEqual([{ label: '首页' }, { label: '未知' }]);
  });
});
