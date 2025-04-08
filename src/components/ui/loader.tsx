
import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Loader({ size = 'md' }: LoaderProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-primary border-t-transparent`}></div>
    </div>
  );
}
