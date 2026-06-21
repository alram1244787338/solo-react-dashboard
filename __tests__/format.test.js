import { describe, it, expect } from 'vitest';
import { formatChange, getChangeSign } from '../src/utils/format';

describe('formatChange', () => {
  it('正数显示 + 号：12.5 → +12.5%', () => {
    expect(formatChange(12.5)).toBe('+12.5%');
  });

  it('负数显示 - 号：-3.8 → -3.8%', () => {
    expect(formatChange(-3.8)).toBe('-3.8%');
  });

  it('零显示 + 号：0 → +0%', () => {
    expect(formatChange(0)).toBe('+0%');
  });

  it('整数：5 → +5%', () => {
    expect(formatChange(5)).toBe('+5%');
  });

  it('负整数：-10 → -10%', () => {
    expect(formatChange(-10)).toBe('-10%');
  });

  it('多位小数：12.345 → +12.345%', () => {
    expect(formatChange(12.345)).toBe('+12.345%');
  });
});

describe('getChangeSign', () => {
  it('正数返回 positive', () => {
    expect(getChangeSign(12.5)).toBe('positive');
    expect(getChangeSign(1)).toBe('positive');
    expect(getChangeSign(0.1)).toBe('positive');
  });

  it('负数返回 negative', () => {
    expect(getChangeSign(-3.8)).toBe('negative');
    expect(getChangeSign(-1)).toBe('negative');
    expect(getChangeSign(-0.1)).toBe('negative');
  });

  it('零返回 positive', () => {
    expect(getChangeSign(0)).toBe('positive');
  });
});
