"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");

    // not logged in
    if (!role) {
      toast.error("Please login first.");
      router.replace("/auth/login");
      return;
    }

    // wrong role
    if (!allowedRoles.includes(role)) {
      toast.error("Access denied 🚫 Redirecting you to your dashboard");

      // redirect to their dashboard
      if (role === "SuperAdmin") {
        router.replace("/");
      } else if (role === "OperationsUser") {
        router.replace("/operations-dashboard");
      } else if (role === "ReportingUser") {
        router.replace("/reporting-dashboard");
      } else {
        router.replace("/auth/login"); // fallback
      }
      return;
    }

    // allowed
    setIsAllowed(true);
  }, [router, allowedRoles]);

  if (isAllowed === null) return null; // or spinner

  return <>{children}</>;
}
