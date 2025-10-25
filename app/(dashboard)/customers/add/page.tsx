"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import { useCreateCustomer, useUpdateCustomer } from "@/utils/api";

// --- Payload Types ---
interface PersonalPayload {
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  dob: string;
  email: string;
  mobile: string;
}

interface OrderPayload {
  orderId: string;
  orderDate: string;
  sampleId: string;
  sampleReceived: string;
  testId: string;
}

// --- Component ---
export default function AddCustomerPage() {
  const router = useRouter();
  const [tab, setTab] = useState("personal");
  const [customerId, setCustomerId] = useState<string | null>(null);

  const [personal, setPersonal] = useState<PersonalPayload>({
    firstName: "",
    lastName: "",
    gender: "Male",
    dob: "",
    email: "",
    mobile: "",
  });

  const [order, setOrder] = useState<OrderPayload>({
    orderId: "",
    orderDate: "",
    sampleId: "",
    sampleReceived: "",
    testId: "",
  });

  // MUTATIONS
  const createCustomerMutation = useCreateCustomer();
  const updateCustomerMutation = useUpdateCustomer();

  const handleSubmit = () => {
    if (tab === "personal") {
      const payload = personal;
      if (!payload.firstName || !payload.lastName || !payload.dob || !payload.email || !payload.mobile) {
        toast.error("All personal fields are required");
        return;
      }
      createCustomerMutation.mutate(payload, {
        onSuccess: (res) => {
          setCustomerId(res.data._id);
          toast.success("Customer created");
          setTab("order");
        },
        onError: (err: any) => {
          const msg: string = err?.response?.data?.errors[0]?.message || "Failed to create customer";
          toast.error(msg);
        },
      });
      return;
    }

    if (tab === "order") {
      if (!customerId) {
        toast.error("Customer not found. Complete personal details first.");
        return;
      }
      const payload = order;
      if (!payload.orderId || !payload.orderDate || !payload.sampleId || !payload.sampleReceived || !payload.testId) {
        toast.error("All order fields are required");
        return;
      }
      updateCustomerMutation.mutate(
        { id: customerId, payload },
        {
          onSuccess: () => {
            toast.success("Order details saved");
            router.push("/customers"); // <-- Navigate to /customers after order
          },
          onError: () => toast.error("Failed to update order details"),
        }
      );
      return;
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/customers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Add Customer</h1>
          <p className="text-muted-foreground">Add a new customer profile.</p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="order">Order</TabsTrigger>
        </TabsList>

        {/* Personal */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="First Name" value={personal.firstName} onChange={(e) => setPersonal({ ...personal, firstName: e.target.value })} />
              <Input placeholder="Last Name" value={personal.lastName} onChange={(e) => setPersonal({ ...personal, lastName: e.target.value })} />
              <select
                value={personal.gender}
                onChange={(e) => setPersonal({ ...personal, gender: e.target.value as "Male" | "Female" | "Other" })}
                className="border rounded p-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Date of Birth</label>
                <Input type="date" value={personal.dob} onChange={(e) => setPersonal({ ...personal, dob: e.target.value })} />
              </div>
              <Input placeholder="Email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} />
              <Input placeholder="Phone" value={personal.mobile} onChange={(e) => setPersonal({ ...personal, mobile: e.target.value })} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order */}
        <TabsContent value="order">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Order ID" value={order.orderId} onChange={(e) => setOrder({ ...order, orderId: e.target.value })} />
              <div className="flex flex-col gap-2">
                <label className="font-medium">Order Date</label>
                <Input type="date" value={order.orderDate} onChange={(e) => setOrder({ ...order, orderDate: e.target.value })} />
              </div>
              <Input placeholder="Sample ID" value={order.sampleId} onChange={(e) => setOrder({ ...order, sampleId: e.target.value })} />
              <div className="flex flex-col gap-2">
                <label className="font-medium">Sample Received</label>
                <Input type="date" value={order.sampleReceived} onChange={(e) => setOrder({ ...order, sampleReceived: e.target.value })} />
              </div>
              <Input placeholder="Test ID" value={order.testId} onChange={(e) => setOrder({ ...order, testId: e.target.value })} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}
