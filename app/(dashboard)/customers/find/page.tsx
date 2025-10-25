"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search } from "lucide-react";
import Link from "next/link";
import { useGetCustomerBySampleId } from "@/utils/api"; // 👉 you’ll need this query hook
import { toast } from "react-hot-toast";

export interface CustomerProfile {
  _id: string;
  firstName?: string;
  lastName?: string;
  gender?: "Male" | "Female" | "Other";
  dob?: string;
  orderId?: string;
  orderDate?: string;
  mobile?: string;
  email?: string;
  sampleReceived?: string;
  sampleId?: string;
  testId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function NewCustomerPage() {
  const [sampleId, setSampleId] = useState("");
  const [submittedSampleId, setSubmittedSampleId] = useState<string | null>(null);

  // Fetch by sampleId only when submitted
  const { data: customer, isLoading, error } = useGetCustomerBySampleId(submittedSampleId ?? undefined);
  console.log("data", customer);

  const handleSearch = () => {
    if (!sampleId) {
      toast.error("Please enter a sample ID");
      return;
    }
    setSubmittedSampleId(sampleId.trim());
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Sample ID input form */}
      <Card>
        <CardHeader>
          <CardTitle>Find Customer by Sample ID</CardTitle>
          <CardDescription>Enter the sample ID to fetch customer details.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input placeholder="Enter sample ID..." value={sampleId} onChange={(e) => setSampleId(e.target.value)} />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {submittedSampleId && (
        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
            <CardDescription>{isLoading ? "Loading customer..." : customer ? "Customer record found." : "No customer found with this Sample ID."}</CardDescription>
          </CardHeader>
          <CardContent>
            {customer && (
              <Table className="whitespace-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Test ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Sample ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow key={customer.data._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{`${customer.data.firstName?.charAt(0) ?? ""}${customer.data.lastName?.charAt(0) ?? ""}` || "C"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {customer.data.firstName} {customer.data.lastName}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.data.testId || "--"}</TableCell>
                    <TableCell>{customer.data.orderId || "--"}</TableCell>
                    <TableCell>{customer.data.sampleId || "--"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/customers/${customer.data._id}`}>View profile</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/customers/customer-disease/${customer.data._id}/edit`}>Generate Report</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/report-page/${customer.data._id}`}>View Report</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {/* You can add delete action here if needed */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
