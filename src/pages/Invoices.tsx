import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Layout from "@/components/Layout";
import { useState } from "react";
import { useEnrollments } from "@/data/enrollments";

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { enrollments, loading, error } = useEnrollments();
  const invoices = [
    {
      id: "INV-001",
      date: "2024-01-15",
      amount: "$350.00",
      status: "Paid",
      client: "Acme Corp",
      description: "Software Development Services"
    },
    {
      id: "INV-002", 
      date: "2024-01-10",
      amount: "$1,250.00",
      status: "Paid",
      client: "Tech Solutions Inc",
      description: "UI/UX Design Project"
    },
    {
      id: "INV-003",
      date: "2024-01-05",
      amount: "$750.00",
      status: "Pending",
      client: "StartupXYZ",
      description: "Mobile App Development"
    },
    {
      id: "INV-004",
      date: "2023-12-28",
      amount: "$500.00",
      status: "Paid",
      client: "E-commerce Plus",
      description: "Database Optimization"
    },
    {
      id: "INV-005",
      date: "2023-12-20",
      amount: "$2,100.00",
      status: "Overdue",
      client: "Global Industries",
      description: "Full Stack Development"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalAmount = invoices.reduce((sum, invoice) => {
    return sum + parseFloat(invoice.amount.replace('$', '').replace(',', ''));
  }, 0);

  const paidAmount = invoices
    .filter(invoice => invoice.status === "Paid")
    .reduce((sum, invoice) => {
      return sum + parseFloat(invoice.amount.replace('$', '').replace(',', ''));
    }, 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Past Invoices</h1>
          <p className="text-muted-foreground">Track and manage your billing history.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Total Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{invoices.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalAmount.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Paid Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">${paidAmount.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Learner</TableHead>
                    <TableHead>Track</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-medium">{enrollment.id}</TableCell>
                      <TableCell>{new Date(enrollment.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{enrollment.learner}</TableCell>
                      <TableCell>{enrollment.track}</TableCell>
        
                      <TableCell className="font-semibold">{enrollment.amount}</TableCell>
                      <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Invoices;