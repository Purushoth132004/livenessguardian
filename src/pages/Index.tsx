import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedContainer from '@/components/AnimatedContainer';
import Logo from '@/components/Logo';
import { Shield, User, ArrowRight, FileText } from 'lucide-react';

const Index = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30" />
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      <AnimatedContainer className="mb-8">
        <Logo size="lg" />
      </AnimatedContainer>
      
      <AnimatedContainer delay="short" className="max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block">Secure Pension</span>
          <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Verification System</span>
        </h1>
        <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
          A modern, secure system for pension verification and management with advanced biometric authentication.
        </p>
      </AnimatedContainer>
      
      <AnimatedContainer delay="medium" className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
        <Link to="/login" className="w-full">
          <Button className="w-full gap-2 py-6 text-lg" size="lg">
            <User size={20} />
            <span>Pensioner Login</span>
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </Link>
        <Link to="/admin-login" className="w-full">
          <Button variant="outline" className="w-full gap-2 py-6 text-lg" size="lg">
            <Shield size={20} />
            <span>Admin Login</span>
          </Button>
        </Link>
      </AnimatedContainer>
      
      <AnimatedContainer delay="long" className="mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="glass card-hover rounded-lg p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Shield size={24} />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Secure Authentication</h3>
          <p className="text-sm text-muted-foreground">
            Multi-layer security with Aadhaar and biometric verification.
          </p>
        </div>
        
        <div className="glass card-hover rounded-lg p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User size={24} />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Liveness Detection</h3>
          <p className="text-sm text-muted-foreground">
            Advanced technology to ensure genuine user verification.
          </p>
        </div>
        
        <div className="glass card-hover rounded-lg p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileText size={24} />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Pension Management</h3>
          <p className="text-sm text-muted-foreground">
            Efficient tracking and management of pension disbursements.
          </p>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default Index;
