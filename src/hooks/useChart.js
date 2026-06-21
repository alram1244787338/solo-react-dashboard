import { useEffect, useRef, useCallback } from 'react';

function useChart({ labels = [], data = [], height = 320, padding = { top: 30, right: 30, bottom: 40, left: 50 } }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || data.length === 0) return;

    const width = container.clientWidth;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const maxValue = Math.max(...data) * 1.15;
    const minValue = 0;
    const stepCount = 4;

    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#8c8c8c';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;

    for (let i = 0; i <= stepCount; i++) {
      const y = padding.top + (chartHeight * i) / stepCount;
      const value = Math.round(maxValue - ((maxValue - minValue) * i) / stepCount);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();
      ctx.fillText(value.toString(), padding.left - 8, y);
    }

    const barCount = data.length;
    const groupWidth = chartWidth / barCount;
    const barWidth = Math.min(groupWidth * 0.55, 40);
    const baseY = padding.top + chartHeight;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#595959';

    data.forEach((value, index) => {
      const x = padding.left + groupWidth * index + groupWidth / 2;
      const barHeight = (value / maxValue) * chartHeight;
      const barX = x - barWidth / 2;
      const barY = baseY - barHeight;

      const gradient = ctx.createLinearGradient(barX, barY, barX, baseY);
      gradient.addColorStop(0, '#1890ff');
      gradient.addColorStop(1, '#40a9ff');

      ctx.fillStyle = gradient;
      const radius = Math.min(barWidth / 2, 4);
      roundRect(ctx, barX, barY, barWidth, barHeight, radius);
      ctx.fill();

      ctx.fillStyle = '#8c8c8c';
      ctx.fillText(labels[index], x, baseY + 10);

      ctx.fillStyle = '#262626';
      ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(value.toString(), x, barY - 14);
      ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    });

    ctx.strokeStyle = '#e8e8e8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, baseY);
    ctx.lineTo(padding.left + chartWidth, baseY);
    ctx.stroke();
  }, [labels, data, height, padding.left, padding.right, padding.top, padding.bottom, dpr]);

  useEffect(() => {
    draw();

    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [draw]);

  return { canvasRef, containerRef };
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default useChart;
