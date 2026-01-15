import { useEffect, useState, useRef } from 'react';

interface PerformanceMetrics {
  renderCounts: Record<string, number>;
  messageLoadTime: number;
  websocketLatency: number;
}

/**
 * usePerformanceMetrics
 *
 * Tracks render counts for components and basic performance metrics.
 * Useful for demonstrating performance awareness in interviews.
 */
export const usePerformanceMetrics = (componentName: string) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderCounts: {},
    messageLoadTime: 0,
    websocketLatency: 0,
  });
  const renderCountRef = useRef(0);

  useEffect(() => {
    renderCountRef.current += 1;
    setMetrics((prev) => ({
      ...prev,
      renderCounts: {
        ...prev.renderCounts,
        [componentName]: renderCountRef.current,
      },
    }));
  });

  return metrics;
};
