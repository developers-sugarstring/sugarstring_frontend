"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, CalendarDays } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { useGetCustomerById } from "@/utils/api";
import { useRouter } from "next/navigation";

interface CustomerProfile {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  orderId: string;
  orderDate: string;
  mobile: string;
  email: string;
  sampleReceived: string;
  sampleId: string;
  testId: string;
  disease?: {
    header: any[];
    drugResponse: {
      drugsToAvoid: any[];
      drugsWithCaution: any[];
    };
    geneticMutation: any[];
    reportGenerated: any;
  };
}

export default function CustomerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole);
    }
  }, []);

  // Fetch customer by ID
  const { data: customerData, isLoading, isError } = useGetCustomerById(id) as { data: { success: boolean; message: string; data: CustomerProfile }; isLoading: boolean; isError: boolean };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !customerData?.data) return notFound();

  const customer = customerData.data;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back to customers</span>
        </Button>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Customer Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar>
              <AvatarFallback>{`${customer.firstName?.charAt(0) ?? ""}${customer.lastName?.charAt(0) ?? ""}` || "C"}</AvatarFallback>
            </Avatar>

            <CardTitle>
              {customer.firstName} {customer.lastName}
            </CardTitle>
            {role !== "ReportingUser" && <CardDescription>{customer.email}</CardDescription>}
            <div className="mt-2">
              <Badge variant="outline">{customer.gender}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              <strong>DOB:</strong> {new Date(customer.dob).toLocaleDateString()}
            </p>
            {role !== "ReportingUser" && (
              <p>
                <strong>Mobile:</strong> {customer.mobile}
              </p>
            )}
            <p>
              <strong>Sample ID:</strong> {customer.sampleId}
            </p>
            <p>
              <strong>Test ID:</strong> {customer.testId}
            </p>
            <p>
              <strong>Order ID:</strong> {customer.orderId}
            </p>
            <p>
              <strong>Order Date:</strong> {new Date(customer.orderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Sample Recieved:</strong> {new Date(customer.sampleReceived).toLocaleDateString()}
            </p>
            <p>
              <strong>Report Generated:</strong> {new Date(customer.disease?.reportGenerated).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        {/* Tabs for disease info */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">Disease Risk</TabsTrigger>
              <TabsTrigger value="genetic">Genetic Mutation</TabsTrigger>
              <TabsTrigger value="drugResponse">Drug Response</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Disease Risk</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  {customer.disease?.header?.length ? (
                    <table className="w-full table-auto border-collapse border border-slate-200">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-300 p-2 text-left">Disease Name</th>
                          <th className="border border-slate-300 p-2 text-left">Speciality</th>
                          <th className="border border-slate-300 p-2 text-left">Gene</th>
                          <th className="border border-slate-300 p-2 text-left">Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customer.disease.header.map((h, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="border border-slate-300 p-2 break-words">{h.diseaseName}</td>
                            <td className="border border-slate-300 p-2 break-words">{h.speciality}</td>
                            <td className="border border-slate-300 p-2 break-words">{h.geneName}</td>
                            <td className="border border-slate-300 p-2 break-words">
                              <Badge variant="secondary">{h.category || "Other Diseases"}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-muted-foreground text-sm leading-relaxed">No disease risk information is available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="genetic">
              <Card>
                <CardHeader>
                  <CardTitle>Genetic Mutation</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  {customer.disease?.geneticMutation?.length ? (
                    <table className="w-full table-auto border-collapse border border-slate-200">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-300 p-2 text-left">Gene</th>
                          <th className="border border-slate-300 p-2 text-left">Mutation</th>
                          <th className="border border-slate-300 p-2 text-left">Type</th>
                          <th className="border border-slate-300 p-2 text-left">Zygosity</th>
                          <th className="border border-slate-300 p-2 text-left">Disease</th>
                          <th className="border border-slate-300 p-2 text-left">Inheritance</th>
                          <th className="border border-slate-300 p-2 text-left">Classification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customer.disease.geneticMutation.map((gm, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="border border-slate-300 p-2 break-words">{gm.gene.geneName}</td>
                            <td className="border border-slate-300 p-2 break-words">{gm.mutation}</td>
                            <td className="border border-slate-300 p-2 break-words">{gm.type}</td>
                            <td className="border border-slate-300 p-2 break-words">{gm.zygosity}</td>
                            <td className="border border-slate-300 p-2 break-words">{gm.diseaseName}</td>
                            <td className="border border-slate-300 p-2 break-words">{gm.inheritance}</td>
                            <td className="border border-slate-300 p-2 break-words">{gm.classification}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-muted-foreground text-sm leading-relaxed">No genetic mutation data available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="drugResponse">
              <Card>
                <CardHeader>
                  <CardTitle>Drug Response</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto space-y-6">
                  {/* Drugs to Avoid */}
                  <div>
                    <h3 className="font-semibold text-red-600 mb-2">🚫 Drugs to Avoid</h3>
                    {customer.disease?.drugResponse?.drugsToAvoid?.length ? (
                      <table className="w-full table-auto border-collapse border border-red-200">
                        <thead>
                          <tr className="bg-red-50">
                            <th className="border border-red-300 p-2 text-left">Drug Name</th>
                            <th className="border border-red-300 p-2 text-left">Speciality</th>
                            <th className="border border-red-300 p-2 text-left">Condition</th>
                            <th className="border border-red-300 p-2 text-left">Alternative</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customer.disease.drugResponse.drugsToAvoid.map((drug, i) => (
                            <tr key={i} className="hover:bg-red-50">
                              <td className="border border-red-300 p-2 break-words">{drug.drugName}</td>
                              <td className="border border-red-300 p-2 break-words">{drug.medicalSpeciality}</td>
                              <td className="border border-red-300 p-2 break-words">{drug.medicalCondition}</td>
                              <td className="border border-red-300 p-2 break-words">{drug.alternativeDrug}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-muted-foreground text-sm leading-relaxed">No medications to avoid.</p>
                    )}
                  </div>

                  {/* Drugs with Caution */}
                  <div>
                    <h3 className="font-semibold text-yellow-600 mb-2">⚠️ Drugs with Caution</h3>
                    {customer.disease?.drugResponse?.drugsWithCaution?.length ? (
                      <table className="w-full table-auto border-collapse border border-yellow-200">
                        <thead>
                          <tr className="bg-yellow-50">
                            <th className="border border-yellow-300 p-2 text-left">Drug Name</th>
                            <th className="border border-yellow-300 p-2 text-left">Speciality</th>
                            <th className="border border-yellow-300 p-2 text-left">Condition</th>
                            <th className="border border-yellow-300 p-2 text-left">Alternative</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customer.disease.drugResponse.drugsWithCaution.map((drug, i) => (
                            <tr key={i} className="hover:bg-yellow-50">
                              <td className="border border-yellow-300 p-2 break-words">{drug.drugName}</td>
                              <td className="border border-yellow-300 p-2 break-words">{drug.medicalSpeciality}</td>
                              <td className="border border-yellow-300 p-2 break-words">{drug.medicalCondition}</td>
                              <td className="border border-yellow-300 p-2 break-words">{drug.alternativeDrug}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-muted-foreground text-sm leading-relaxed">No drugs marked as "use with caution".</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
          </Tabs>
        </div>
      </div>
    </div>
  );
}
