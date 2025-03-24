
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Users, Verified, AlertTriangle, BadgeCheck, Clock, UserCheck } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import AnimatedContainer from '@/components/AnimatedContainer';

// Mock data
const pensionStats = {
  totalPensioners: 2456,
  pendingVerifications: 128,
  pendingPayments: 45,
  verifiedThisMonth: 312,
  departments: [
    { name: 'Education', count: 845, verificationRate: 92, paymentRate: 98 },
    { name: 'Healthcare', count: 632, verificationRate: 87, paymentRate: 95 },
    { name: 'Civil Services', count: 512, verificationRate: 94, paymentRate: 97 },
    { name: 'Defense', count: 467, verificationRate: 98, paymentRate: 99 }
  ]
};

// Recent verification activities
const recentActivities = [
  { id: 1, name: 'John Doe', aadhaar: '1234XXXXXXXX', status: 'Verified', time: '2 hours ago', department: 'Education' },
  { id: 2, name: 'Jane Smith', aadhaar: '9876XXXXXXXX', status: 'Pending', time: '3 hours ago', department: 'Healthcare' },
  { id: 3, name: 'Robert Johnson', aadhaar: '5432XXXXXXXX', status: 'Verified', time: '5 hours ago', department: 'Civil Services' },
  { id: 4, name: 'Emily Brown', aadhaar: '7890XXXXXXXX', status: 'Failed', time: '1 day ago', department: 'Education' },
  { id: 5, name: 'Michael Davis', aadhaar: '2345XXXXXXXX', status: 'Verified', time: '1 day ago', department: 'Defense' }
];

const Admin = () => {
  return (
    <DashboardLayout isAdmin>
      <section className="mb-8">
        <AnimatedContainer className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of pension verification and payment statistics
          </p>
        </AnimatedContainer>
        
        <AnimatedContainer delay="short" className="mb-8">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="glass border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Pensioners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{pensionStats.totalPensioners.toLocaleString()}</div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users size={24} className="text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Verifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{pensionStats.pendingVerifications}</div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20">
                    <Clock size={24} className="text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{pensionStats.pendingPayments}</div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                    <AlertTriangle size={24} className="text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Verified This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{pensionStats.verifiedThisMonth}</div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                    <BadgeCheck size={24} className="text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedContainer>
        
        <AnimatedContainer delay="medium">
          <Tabs defaultValue="education">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Department Statistics</h2>
              <TabsList>
                {pensionStats.departments.map((dept) => (
                  <TabsTrigger key={dept.name} value={dept.name.toLowerCase()}>
                    {dept.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {pensionStats.departments.map((dept) => (
              <TabsContent key={dept.name} value={dept.name.toLowerCase()}>
                <Card className="glass border">
                  <CardHeader>
                    <CardTitle>{dept.name} Department</CardTitle>
                    <CardDescription>
                      Total pensioners: {dept.count}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Verification Rate</h3>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-2xl font-bold">{dept.verificationRate}%</span>
                          {dept.verificationRate >= 90 ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Good
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                              Needs Attention
                            </Badge>
                          )}
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div 
                            className={`h-2 rounded-full ${
                              dept.verificationRate >= 90 ? 'bg-green-500' : 'bg-amber-500'
                            }`} 
                            style={{ width: `${dept.verificationRate}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Payment Rate</h3>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-2xl font-bold">{dept.paymentRate}%</span>
                          {dept.paymentRate >= 95 ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Good
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                              Needs Attention
                            </Badge>
                          )}
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div 
                            className={`h-2 rounded-full ${
                              dept.paymentRate >= 95 ? 'bg-green-500' : 'bg-amber-500'
                            }`} 
                            style={{ width: `${dept.paymentRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/admin/pensioners?department=${dept.name.toLowerCase()}`} className="w-full">
                      <Button variant="outline" className="w-full gap-2">
                        <span>View {dept.name} Pensioners</span>
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedContainer>
      </section>
      
      <section>
        <AnimatedContainer delay="long">
          <Card className="glass border">
            <CardHeader>
              <CardTitle>Recent Verification Activities</CardTitle>
              <CardDescription>
                Latest pensioner verification events across departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-md p-3 transition-colors hover:bg-accent"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        activity.status === 'Verified' 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
                          : activity.status === 'Pending'
                          ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                          : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {activity.status === 'Verified' ? (
                          <Verified size={20} />
                        ) : activity.status === 'Pending' ? (
                          <Clock size={20} />
                        ) : (
                          <AlertTriangle size={20} />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{activity.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Aadhaar: {activity.aadhaar} • {activity.department}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        activity.status === 'Verified' 
                          ? 'default' 
                          : activity.status === 'Pending'
                          ? 'outline'
                          : 'destructive'
                      }>
                        {activity.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/admin/pensioners" className="w-full">
                <Button variant="outline" className="w-full gap-2">
                  <UserCheck size={18} />
                  <span>Manage All Pensioners</span>
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </AnimatedContainer>
      </section>
    </DashboardLayout>
  );
};

export default Admin;
