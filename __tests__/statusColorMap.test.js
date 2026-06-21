import { describe, it, expect } from 'vitest';
import { statusColorMap } from '../src/data/table';

describe('statusColorMap', () => {
  it('在职 → success', () => {
    expect(statusColorMap['在职']).toBe('success');
  });

  it('离职 → danger', () => {
    expect(statusColorMap['离职']).toBe('danger');
  });

  it('休假 → warning', () => {
    expect(statusColorMap['休假']).toBe('warning');
  });

  it('未知状态 → undefined（无样式）', () => {
    expect(statusColorMap['未知']).toBeUndefined();
    expect(statusColorMap['']).toBeUndefined();
    expect(statusColorMap['在职中']).toBeUndefined();
    expect(statusColorMap[undefined]).toBeUndefined();
  });
});
