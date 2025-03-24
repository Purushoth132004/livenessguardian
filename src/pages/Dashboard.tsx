
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileCheck, AlertTriangle, ArrowRight, BadgeCheck, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/layouts/DashboardLayout';
import AnimatedContainer from '@/components/AnimatedContainer';

// Mock pension details
const pensionDetails = {
  pensionId: 'P001',
  aadhaarNumber: '123456789012',
  name: 'John Doe',
  profession: 'Retired Teacher',
  lastVerification: '2023-03-15T09:30:00',
  lastPaidDate: '2023-03-05',
  nextDueDate: '2023-04-05',
  paymentStatus: 'Paid',
  nextVerificationDue: '2023-06-15',
  department: 'Education'
};

const Dashboard = () => {
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Calculate days until next verification
  const getNextVerificationDays = () => {
    const today = new Date();
    const nextVerification = new Date(pensionDetails.nextVerificationDue);
    const diffTime = nextVerification.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const verificationDays = getNextVerificationDays();
  
  return (
    <DashboardLayout>
      <section className="mb-8">
        <AnimatedContainer className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {pensionDetails.name}</h1>
          <p className="text-muted-foreground">
            Here's an overview of your pension status and verification details
          </p>
        </AnimatedContainer>
        
        <AnimatedContainer delay="short" className="mb-6">
          <Card className="glass border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Pension Status</CardTitle>
                <Badge variant={pensionDetails.paymentStatus === 'Paid' ? 'default' : 'destructive'}>
                  {pensionDetails.paymentStatus}
                </Badge>
              </div>
              <CardDescription>
                Pension ID: {pensionDetails.pensionId} • Department: {pensionDetails.department}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="mb-1 text-sm font-medium text-muted-foreground">Last Payment Date</div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-primary" />
                  <span className="font-medium">{formatDate(pensionDetails.lastPaidDate)}</span>
                </div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium text-muted-foreground">Next Payment Due</div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-primary" />
                  <span className="font-medium">{formatDate(pensionDetails.nextDueDate)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>
        
        <AnimatedContainer delay="medium">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className={`glass border ${verificationDays < 30 ? 'border-amber-300 dark:border-amber-600' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={20} />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="mb-1 text-sm font-medium text-muted-foreground">Last Verification</div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={20} className="text-green-500" />
                    <span className="font-medium">{formatDate(pensionDetails.lastVerification)}</span>
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium text-muted-foreground">Next Verification Due</div>
                  <div className="flex items-center gap-2">
                    {verificationDays < 30 ? (
                      <AlertTriangle size={20} className="text-amber-500" />
                    ) : (
                      <FileCheck size={20} className="text-primary" />
                    )}
                    <span className="font-medium">{formatDate(pensionDetails.nextVerificationDue)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {verificationDays < 30 ? (
                  <Link to="/verification" className="w-full">
                    <Button variant="outline" className="w-full gap-2">
                      <span>Complete Verification</span>
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Next verification in {verificationDays} days
                  </p>
                )}
              </CardFooter>
            </Card>
            
            <Card className="glass border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck size={20} />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-2">
                    <FileCheck size={18} className="text-green-500" />
                    <span>Life Certificate</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    Verified
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-2">
                    <FileCheck size={18} className="text-green-500" />
                    <span>Pension Payment Order</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    Verified
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-2">
                    <FileCheck size={18} className="text-green-500" />
                    <span>Aadhaar Verification</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    Verified
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/documents" className="w-full">
                  <Button variant="outline" className="w-full gap-2">
                    <span>View All Documents</span>
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </AnimatedContainer>
      </section>
      
      <section>
        <AnimatedContainer delay="long">
          <Card className="glass border">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Your recent interactions with the pension system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-md p-2 transition-colors hover:bg-accent">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <BadgeCheck size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Liveness Verification Completed</p>
                    <p className="text-xs text-muted-foreground">Today at 10:30 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 rounded-md p-2 transition-colors hover:bg-accent">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                    <Calendar size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Pension Payment Processed</p>
                    <p className="text-xs text-muted-foreground">{formatDate(pensionDetails.lastPaidDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 rounded-md p-2 transition-colors hover:bg-accent">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                    <FileCheck size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Document Verification Completed</p>
                    <p className="text-xs text-muted-foreground">March 10, 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
