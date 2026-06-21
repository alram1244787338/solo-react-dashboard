export const routeConfig = [
  { path: '/', label: '概览', breadcrumb: '概览', icon: '📊' },
  { path: '/table', label: '表格', breadcrumb: '数据表格', icon: '📋' },
  { path: '/settings', label: '设置', breadcrumb: '系统设置', icon: '⚙️' },
];

export function getBreadcrumbByPath(pathname) {
  const match = routeConfig.find((r) => {
    if (r.path === '/') return pathname === '/';
    return pathname.startsWith(r.path);
  });
  const currentLabel = match ? match.breadcrumb : '未知';
  return [{ label: '首页' }, { label: currentLabel }];
}
