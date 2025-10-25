import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  withCredentials: false,
});

export const createDoctor = async (formData: FormData) => {
  const response = await api.post("/auth/admin/create-doctor", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.doctor;
};

export const getAllDoctors = async () => {
  const response = await api.get("/auth/admin/get-all-doctors");
  return response.data.doctors;
};

export const getDoctorById = async (id: string) => {
  const response = await api.get(`/auth/admin/get-doctor/${id}`);
  return response.data.doctor;
};

export const updateDoctorById = async ({ id, formData }: { id: string; formData: FormData }) => {
  const response = await api.put(`/auth/admin/update-doctor/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.doctor;
};

export const deleteDoctorById = async (id: string) => {
  const response = await api.delete(`/auth/admin/delete-doctor/${id}`);
  return response.data;
};

// MUTATION FUNCTIONS
export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

export const useGetAllDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });
};

export const useGetDoctorById = (id: string) => {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorById(id),
    enabled: !!id,
  });
};

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDoctorById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDoctorById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

// <-------------- SUGARSTRING INTERNAL USERS ------------------------> //
export interface SignupPayload {
  email: string;
  password: string;
  role: "SuperAdmin" | "OperationsUser" | "ReportingUser" | "Genetic Counsellor";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
}

export const signupUser = async (payload: SignupPayload): Promise<SignupResponse> => {
  const response = await api.post("/api/signup", payload);
  return response.data;
};

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post("/api/login", payload);
  return response.data;
};

// <-------------- SUGARSTRING CUSTOMER USERS ------------------------> //
const getAuthHeaders = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
};

export interface CustomerPayload {
  _id?: string;
  firstName?: string;
  lastName?: string;
  gender?: "Male" | "Female" | "Other";
  dob?: string | Date;
  orderId?: string;
  orderDate?: string | Date;
  mobile?: string;
  email?: string;
  sampleReceived?: string | Date;
  sampleId?: string;
  testId?: string;
}

export interface CustomerDiseasePayload {
  header?: any;
  drugResponse?: any;
  geneticMutation?: any;
  reportGenerated?: any;
}

export interface ExcelDiseaseDataPayload {
  category: string[];
  diseases: any[]; // You can replace 'any' with your typed Disease interface
  genes: any[];
  drugs: any[];
  mutations: any;
}

// CREATE (only OperationsUser)
export const createCustomer = async (payload: CustomerPayload) => {
  const response = await api.post("/api/users/create-user", payload, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return response.data;
};

// READ ALL (public)
export const getAllCustomers = async () => {
  const response = await api.get("/api/users/get-users");
  return response.data;
};

// READ SINGLE (public)
export const getCustomerById = async (id: string) => {
  const response = await api.get(`/api/users/get-user/${id}`);
  return response.data;
};

// UPDATE (OperationsUser or ReportingUser)
export const updateCustomer = async ({ id, payload }: { id: string; payload: Partial<CustomerPayload> }) => {
  const response = await api.put(`/api/users/update-user/${id}`, payload, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return response.data;
};

// DELETE (not protected in backend, but maybe should be)
export const deleteCustomer = async (id: string) => {
  const response = await api.delete(`/api/users/delete-user/${id}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return response.data;
};

// UPDATE DISEASE (only ReportingUser)
export const updateCustomerDisease = async ({ id, payload }: { id: string; payload: CustomerDiseasePayload }) => {
  const response = await api.put(
    `/api/users/update-user-disease/${id}`,
    payload, // <-- directly pass the object
    {
      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  return response.data;
};

// GET BY SAMPLE ID (ReportingUser)
export const getCustomerBySampleId = async (sampleId: string) => {
  const response = await api.get(`/api/users/get-user-by-sample/${sampleId}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return response.data;
};

export const createExcelDiseaseDataAPI = async (payload: ExcelDiseaseDataPayload) => {
  const response = await api.post("/api/excel/create-disease", payload);
  return response.data;
};

export const getAllExcelDiseaseDataAPI = async () => {
  const response = await api.get("/api/excel/get-disease");
  return response.data;
};


// <-------------- REACT QUERY MUTATIONS ------------------------> //
export const useSignupUser = () => {
  return useMutation({ mutationFn: signupUser });
};

export const useLoginUser = () => {
  return useMutation({ mutationFn: loginUser });
};

export const useCreateCustomer = () => {
  return useMutation({
    mutationFn: createCustomer,
  });
};

export const useGetAllCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });
};

export const useGetCustomerById = (id: string) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomerById(id),
    enabled: !!id,
  });
};

export const useUpdateCustomer = () => {
  return useMutation({
    mutationFn: updateCustomer,
  });
};

export const useDeleteCustomer = () => {
  return useMutation({
    mutationFn: deleteCustomer,
  });
};

export const useUpdateCustomerDisease = () => {
  return useMutation({
    mutationFn: updateCustomerDisease,
  });
};

export const useGetCustomerBySampleId = (sampleId?: string) => {
  return useQuery({
    queryKey: ["customer", "sampleId", sampleId],
    queryFn: () => getCustomerBySampleId(sampleId!),
    enabled: !!sampleId,
  });
};

export const useCreateExcelDiseaseData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExcelDiseaseDataAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diseaseData"] });
    },
  });
};


export const useGetAllExcelDiseaseData = () => {
  return useQuery({
    queryKey: ["diseaseData"],
    queryFn: getAllExcelDiseaseDataAPI,
  });
};

export default api;
