"use client";

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { useCreateExcelDiseaseData } from "@/utils/api";

export default function ExcelUploadPage() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadToBackend, status } = useCreateExcelDiseaseData();
  const uploading = status === "pending";

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset state for new upload
    setProgress(0);
    setMessage(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setProgress(10);

      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      setProgress(40);

      const diseaseSheet = XLSX.utils.sheet_to_json(
        workbook.Sheets["Diseases"] || workbook.Sheets[workbook.SheetNames[0]]
      );
      const mutationSheet = XLSX.utils.sheet_to_json(
        workbook.Sheets["Genetic Mutations"] || []
      );
      const drugSheet = XLSX.utils.sheet_to_json(
        workbook.Sheets["Drug Response"] || []
      );

      const transformed = transformExcel(diseaseSheet, mutationSheet, drugSheet);

      setProgress(60);

      uploadToBackend(transformed, {
        onSuccess: () => {
          setProgress(100);
          setMessage("✅ Excel data is successfully saved in our storage. Thank you!");

          // Reset for next upload
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
        onError: () => {
          setProgress(0);
          setMessage("❌ Failed to upload data to backend.");
        },
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const transformExcel = (diseaseRows: any[], mutationRows: any[], drugRows: any[]) => {
    const categories = Array.from(new Set(diseaseRows.map((r) => r["Category"]))).filter(Boolean);

    const diseases = diseaseRows.map((r) => ({
      diseaseName: r["Disease Name"],
      speciality: r["Speciality"],
      intro: r["Intro"],
      symptoms: {
        desc: "Symptoms may vary depending on the condition:",
        points: r["Symptoms"] ? r["Symptoms"].split(",").map((s: string) => s.trim()) : [],
      },
      recommendations: {
        desc: "Recommendations for management:",
        points: r["Recommendations"] ? r["Recommendations"].split(",").map((s: string) => s.trim()) : [],
      },
    }));

    const genes = Array.from(
      new Map(
        mutationRows
          .filter((r) => r["Gene"])
          .map((r) => [
            r["Gene"],
            {
              geneName: r["Gene"],
              intro: `The ${r["Gene"]} gene is associated with ${r["Disease"]}.`,
              mid: `Mutations in ${r["Gene"]} may contribute to ${r["Disease"]}.`,
            },
          ])
      ).values()
    );

    const drugs = drugRows.map((r) => ({
      drugName: r["Drug Name"],
      medicalSpeciality: r["Medical Speciality"],
      function: r["Function"],
      medicalCondition: r["Medical Condition"],
      similarDrug: r["Similar Drug"],
      alternativeDrug: r["Alternative Drug"],
    }));

    const mutations = {
      type: Array.from(new Set(mutationRows.map((m) => m["Type"]))).filter(Boolean),
      zygosity: Array.from(new Set(mutationRows.map((m) => m["Zygosity"]))).filter(Boolean),
      inheritance: Array.from(new Set(mutationRows.map((m) => m["Inheritance"]))).filter(Boolean),
      classification: Array.from(new Set(mutationRows.map((m) => m["Classification"]))).filter(Boolean),
    };

    return { category: categories, diseases, genes, drugs, mutations };
  };

  return (
    <div className="flex justify-center pt-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl transition-all duration-300">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Sugarstring Excel Data Uploader
        </h1>

        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="mb-6 block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />

        {(uploading || progress > 0) && (
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {message && <p className="text-green-600 font-medium mt-4">{message}</p>}
      </div>
    </div>
  );
}
