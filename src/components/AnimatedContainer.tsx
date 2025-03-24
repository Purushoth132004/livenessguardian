
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: 'none' | 'short' | 'medium' | 'long';
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className = '',
  delay = 'none'
}) => {
  const delayClass = {
    none: '',
    short: 'animation-delay-200',
    medium: 'animation-delay-400',
    long: 'animation-delay-600'
  }[delay];

  return (
    <div className={cn('animate-fade-in', delayClass, className)}>
      {children}
    </div>
  );
};

export default AnimatedContainer;
