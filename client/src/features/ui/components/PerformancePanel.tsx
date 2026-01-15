import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PerformancePanel
 *
 * Dev-only panel showing performance metrics. Can be toggled
 * to demonstrate performance awareness during interviews.
 */
export const PerformancePanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 btn-primary text-xs"
      >
        {isOpen ? 'Hide' : 'Show'} Metrics
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-16 right-4 z-50 card-surface p-4 w-64 text-xs space-y-2"
          >
            <h3 className="font-semibold mb-2">Performance Metrics</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-text-muted">Render Count:</span>
                <span>N/A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Message Load:</span>
                <span>N/A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">WS Latency:</span>
                <span>N/A</span>
              </div>
            </div>
            <p className="text-[10px] text-text-muted mt-2">
              Metrics collection can be extended with real measurements
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
