
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, MoreHorizontal, Eye, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import AnimatedContainer from '@/components/AnimatedContainer';

// Mock pensioner data
const pensionersData = [
  { 
    id: 'P001', 
    name: 'John Doe', 
    aadhaar: '123456789012', 
    department: 'Education', 
    status: 'Verified',
    lastVerified: '2023-03-15',
    nextDue: '2023-06-15',
    paymentStatus: 'Paid'
  },
  { 
    id: 'P002', 
    name: 'Jane Smith', 
    aadhaar: '987654321098', 
    department: 'Healthcare',
    status: 'Pending',
    lastVerified: '2023-01-10',
    nextDue: '2023-04-10',
    paymentStatus: 'Pending'
  },
  { 
    id: 'P003', 
    name: 'Robert Johnson', 
    aadhaar: '456789012345', 
    department: 'Civil Services',
    status: 'Verified',
    lastVerified: '2023-02-22',
    nextDue: '2023-05-22',
    paymentStatus: 'Paid'
  },
  { 
    id: 'P004', 
    name: 'Emily Brown', 
    aadhaar: '789012345678', 
    department: 'Education',
    status: 'Failed',
    lastVerified: '2023-02-05',
    nextDue: '2023-05-05',
    paymentStatus: 'Pending'
  },
  { 
    id: 'P005', 
    name: 'Michael Davis', 
    aadhaar: '234567890123', 
    department: 'Defense',
    status: 'Verified',
    lastVerified: '2023-03-01',
    nextDue: '2023-06-01',
    paymentStatus: 'Paid'
  },
  { 
    id: 'P006', 
    name: 'Sarah Wilson', 
    aadhaar: '345678901234', 
    department: 'Healthcare',
    status: 'Pending',
    lastVerified: '2023-01-25',
    nextDue: '2023-04-25',
    paymentStatus: 'Paid'
  },
  { 
    id: 'P007', 
    name: 'David Taylor', 
    aadhaar: '567890123456', 
    department: 'Education',
    status: 'Verified',
    lastVerified: '2023-02-18',
    nextDue: '2023-05-18',
    paymentStatus: 'Paid'
  },
  { 
    id: 'P008', 
    name: 'Jennifer Anderson', 
    aadhaar: '678901234567', 
    department: 'Civil Services',
    status: 'Verified',
    lastVerified: '2023-03-10',
    nextDue: '2023-06-10',
    paymentStatus: 'Pending'
  }
];

const AdminPensioners = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Filter pensioners based on search and filters
  const filteredPensioners = pensionersData.filter(pensioner => {
    // Search query filter
    const matchesSearch = 
      pensioner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pensioner.aadhaar.includes(searchQuery) ||
      pensioner.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Department filter
    const matchesDepartment = 
      departmentFilter === 'all' || 
      pensioner.department.toLowerCase() === departmentFilter.toLowerCase();
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      pensioner.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  // Handle mark as verified
  const handleMarkAsVerified = (id: string) => {
    toast({
      title: "Pensioner Verified",
      description: `Pensioner ID ${id} has been marked as verified.`,
    });
  };
  
  // Handle payment approval
  const handleApprovePayment = (id: string) => {
    toast({
      title: "Payment Approved",
      description: `Payment for Pensioner ID ${id} has been approved.`,
    });
  };
  
  return (
    <DashboardLayout isAdmin>
      <AnimatedContainer className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Pensioner Management</h1>
        <p className="text-muted-foreground">
          View and manage pensioners across all departments
        </p>
      </AnimatedContainer>
      
      <AnimatedContainer delay="short" className="mb-6">
        <Card className="glass border">
          <CardHeader className="pb-3">
            <CardTitle>Search and Filter</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID or Aadhaar"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select 
              value={departmentFilter} 
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger id="department" className="line-clamp-1 w-full">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="civil services">Civil Services</SelectItem>
                <SelectItem value="defense">Defense</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger id="status" className="line-clamp-1 w-full">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </AnimatedContainer>
      
      <AnimatedContainer delay="medium">
        <Card className="glass border overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Pensioners</CardTitle>
              <div className="text-sm text-muted-foreground">
                Showing {filteredPensioners.length} of {pensionersData.length} pensioners
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Verified</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPensioners.length > 0 ? (
                    filteredPensioners.map((pensioner) => (
                      <TableRow key={pensioner.id}>
                        <TableCell className="font-medium">
                          {pensioner.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{pensioner.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Aadhaar: {pensioner.aadhaar.substring(0, 4)}XXXXXXXX
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{pensioner.department}</TableCell>
                        <TableCell>
                          <Badge variant={
                            pensioner.status === 'Verified' 
                              ? 'default' 
                              : pensioner.status === 'Pending'
                              ? 'outline'
                              : 'destructive'
                          }>
                            {pensioner.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{formatDate(pensioner.lastVerified)}</span>
                            <span className="text-xs text-muted-foreground">
                              Next: {formatDate(pensioner.nextDue)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            pensioner.paymentStatus === 'Paid' 
                              ? 'outline' 
                              : 'secondary'
                          } className={
                            pensioner.paymentStatus === 'Paid' 
                              ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                          }>
                            {pensioner.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMarkAsVerified(pensioner.id)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Mark as Verified</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleApprovePayment(pensioner.id)}>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Approve Payment</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                <span>Flag for Review</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No results found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </DashboardLayout>
  );
};

export default AdminPensioners;
