
import React from 'react';
import { Shield } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  textVisible?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', textVisible = true }) => {
  const sizeClass = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  }[size];

  const iconSize = {
    sm: 18,
    md: 24,
    lg: 32
  }[size];

  return (
    <div className="flex items-center gap-2">
      <Shield 
        size={iconSize} 
        className="text-primary" 
      />
      {textVisible && (
        <span className={`font-semibold ${sizeClass} tracking-tight`}>
          <span className="text-primary">Pension</span>
          <span className="text-foreground">Guardian</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
