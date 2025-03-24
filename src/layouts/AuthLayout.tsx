
import React from 'react';
import Logo from '@/components/Logo';
import AnimatedContainer from '@/components/AnimatedContainer';
import { Card, CardContent } from '@/components/ui/card';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30" />
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      <AnimatedContainer className="mb-8">
        <Logo size="lg" />
      </AnimatedContainer>
      
      <Card className="w-full max-w-md glass border-0 shadow-lg">
        <CardContent className="p-6">
          <AnimatedContainer className="mb-6 text-center">
            <h1 className="text-2xl font-semibold">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </AnimatedContainer>
          
          <AnimatedContainer delay="short">
            {children}
          </AnimatedContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthLayout;
