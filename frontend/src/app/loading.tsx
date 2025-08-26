import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-dark-900/80 z-40 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  );
}
