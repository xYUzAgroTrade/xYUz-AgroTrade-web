// src/components/common/SkeletonBlock.tsx
import type React from 'react';

export const SkeletonBlock: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-800/60 rounded-xl ${className}`}></div>
  );
};
