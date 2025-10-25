"use client";

import { useState } from "react";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import { useUpdateCustomerDisease } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useGetAllExcelDiseaseData } from "@/utils/api";

// ---- Types ----
interface SymptomOrRecommendation {
  desc: string;
  points: string[];
}
interface DiseaseDescription {
  intro: string;
  symptoms: SymptomOrRecommendation;
  recommendations: SymptomOrRecommendation;
}
interface DiseaseHeader {
  diseaseName: string;
  speciality: string;
  geneName: string;
  category: "Heart Diseases" | "Hereditary Cancers" | "Other Diseases" | "Unaffected Carrier";
  diseaseDesc: DiseaseDescription;
}
interface DrugSpeciality {
  name: string;
}
interface DrugDetail {
  drugName: string;
  medicalSpeciality: string;
  geneName: string;
  diplotype: string;
  phenotype: string;
  function: string;
  medicalCondition: string;
  similarDrug: string;
  alternativeDrug: string;
  speciality: DrugSpeciality[];
}
interface DrugResponse {
  drugsToAvoid: DrugDetail[];
  drugsWithCaution: DrugDetail[];
}
interface GeneticMutation {
  gene: {
    geneName: string;
    desc: {
      intro: string;
      mid: string;
      end: string;
    };
  };
  mutation: string;
  type: string;
  zygosity: string;
  diseaseName: string;
  inheritance: string;
  classification: string;
}
export interface DiseasePayload {
  header: DiseaseHeader[];
  drugResponse: DrugResponse;
  geneticMutation: GeneticMutation[];
  reportGenerated?: string;
}

// ---- Component ----
export default function CustomerDiseasePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [tab, setTab] = useState("header");
  const [disease, setDisease] = useState<DiseasePayload>({
    header: [
      {
        diseaseName: "",
        speciality: "",
        geneName: "",
        category: "" as DiseaseHeader["category"],
        diseaseDesc: {
          intro: "",
          symptoms: { desc: "", points: [] },
          recommendations: { desc: "", points: [] },
        },
      },
    ],
    drugResponse: {
      drugsToAvoid: [
        {
          drugName: "",
          medicalSpeciality: "",
          geneName: "",
          diplotype: "",
          phenotype: "",
          function: "",
          medicalCondition: "",
          similarDrug: "",
          alternativeDrug: "",
          speciality: [],
        },
      ],
      drugsWithCaution: [
        {
          drugName: "",
          medicalSpeciality: "",
          geneName: "",
          diplotype: "",
          phenotype: "",
          function: "",
          medicalCondition: "",
          similarDrug: "",
          alternativeDrug: "",
          speciality: [],
        },
      ],
    },
    geneticMutation: [
      {
        gene: {
          geneName: "",
          desc: { intro: "", mid: "", end: "" },
        },
        mutation: "",
        type: "",
        zygosity: "",
        diseaseName: "",
        inheritance: "",
        classification: "",
      },
    ],
    reportGenerated: "",
  });
  const { data: excelData } = useGetAllExcelDiseaseData();
  // const drugOptions = [...dummyDiseaseData.drugResponse.drugsToAvoid.map((d) => d.drugName), ...dummyDiseaseData.drugResponse.drugsWithCaution.map((d) => d.drugName)];
  // const mutationDiseaseOptions = dummyDiseaseData.geneticMutation.map((g) => g.diseaseName);

  const { id } = use(params);
  const updateCustomerDiseaseMutation = useUpdateCustomerDisease();

  const handleSubmit = () => {
    if (tab === "header") {
      const invalid = disease.header.some((h) => {
        return !h.diseaseName || !h.speciality || !h.geneName || !h.category || !h.diseaseDesc?.intro || !h.diseaseDesc?.symptoms?.desc || h.diseaseDesc?.symptoms?.points?.length === 0 || !h.diseaseDesc?.recommendations?.desc || h.diseaseDesc?.recommendations?.points?.length === 0;
      });

      if (invalid) {
        toast.error("All fields in Disease Risk are required");
        return;
      }

      updateCustomerDiseaseMutation.mutate(
        { id, payload: { header: disease.header } },
        {
          onSuccess: () => {
            toast.success("Disease header updated");
            setTab("drugResponse");
          },
          onError: () => toast.error("Failed to update disease header"),
        }
      );
      return;
    }
    if (tab === "drugResponse") {
      const invalid =
        disease.drugResponse.drugsToAvoid.some((d) => {
          return !d.drugName || !d.medicalSpeciality || !d.geneName || !d.diplotype || !d.phenotype || !d.function || !d.medicalCondition || !d.similarDrug || !d.alternativeDrug || !d.speciality || d.speciality.length === 0;
        }) ||
        disease.drugResponse.drugsWithCaution.some((d) => {
          return !d.drugName || !d.medicalSpeciality || !d.geneName || !d.diplotype || !d.phenotype || !d.function || !d.medicalCondition || !d.similarDrug || !d.alternativeDrug || !d.speciality || d.speciality.length === 0;
        });

      if (invalid) {
        toast.error("All fields in Drug Response are required");
        return;
      }

      updateCustomerDiseaseMutation.mutate(
        { id, payload: { drugResponse: disease.drugResponse } },
        {
          onSuccess: () => {
            toast.success("Drug response updated");
            setTab("reportGenerated");
          },
          onError: () => toast.error("Failed to update drug response"),
        }
      );
      return;
    }
    if (tab === "geneticMutation") {
      const invalid = disease.geneticMutation.some((g) => {
        return !g.gene?.geneName || !g.mutation || !g.type || !g.zygosity || !g.diseaseName || !g.inheritance || !g.classification;
      });

      if (invalid) {
        toast.error("All fields in Genetic Mutation are required");
        return;
      }
      updateCustomerDiseaseMutation.mutate(
        { id, payload: { geneticMutation: disease.geneticMutation } },
        {
          onSuccess: () => {
            toast.success("Genetic mutation updated");
            setTab("drugResponse");
          },
          onError: () => toast.error("Failed to update genetic mutation"),
        }
      );
      return;
    }
    if (tab === "reportGenerated") {
      if (!disease.reportGenerated) {
        toast.error("Please select a report generated date");
        return;
      }

      updateCustomerDiseaseMutation.mutate(
        { id, payload: { reportGenerated: disease.reportGenerated } },
        {
          onSuccess: () => {
            toast.success("Report generated date updated");
            router.push(`/customers/${id}`);
          },
          onError: () => toast.error("Failed to update report generated date"),
        }
      );
      return;
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/customers/find">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Generate Report</h1>
          <p className="text-muted-foreground">Generate a customer report using their disease details.</p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="header">Disease Risk</TabsTrigger>
          <TabsTrigger value="geneticMutation">Genetic Mutation</TabsTrigger>
          <TabsTrigger value="drugResponse">Drug Response</TabsTrigger>
          <TabsTrigger value="reportGenerated">Report Generated</TabsTrigger>
        </TabsList>

        {/* --- HEADER --- */}
        <TabsContent value="header">
          <Card>
            <CardHeader>
              <CardTitle>Disease Risk</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {disease.header.map((h, idx) => (
                <div key={idx} className="space-y-2 border p-2 rounded">
                  <select
                    className="border rounded p-2 w-full"
                    value={h.category}
                    onChange={(e) => {
                      const updated = [...disease.header];
                      updated[idx].category = e.target.value as DiseaseHeader["category"];
                      setDisease({ ...disease, header: updated });
                    }}
                  >
                    <option value="">Select Category</option>
                    {excelData?.[0]?.category.map((cat: string, i: number) => (
                      <option key={i} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border rounded p-2 w-full"
                    value={h.diseaseName}
                    onChange={(e) => {
                      const selected = excelData?.[0]?.diseases.find((d: any) => d.diseaseName === e.target.value);
                      const updated = [...disease.header];
                      if (selected) {
                        updated[idx].diseaseName = selected.diseaseName;
                        updated[idx].speciality = selected.speciality;
                        updated[idx].diseaseDesc = {
                          intro: selected.intro,
                          symptoms: selected.symptoms,
                          recommendations: selected.recommendations,
                        };
                      } else {
                        updated[idx].diseaseName = e.target.value;
                      }
                      setDisease({ ...disease, header: updated });
                    }}
                  >
                    <option value="">Select Disease</option>
                    {excelData?.[0]?.diseases.map((d: any, i: any) => (
                      <option key={i} value={d.diseaseName}>
                        {d.diseaseName}
                      </option>
                    ))}
                  </select>
                  <Input
                    placeholder="Speciality"
                    value={h.speciality}
                    onChange={(e) => {
                      const updated = [...disease.header];
                      updated[idx].speciality = e.target.value;
                      setDisease({ ...disease, header: updated });
                    }}
                  />
                  <Input
                    placeholder="Gene Name"
                    value={h.geneName}
                    onChange={(e) => {
                      const updated = [...disease.header];
                      updated[idx].geneName = e.target.value;
                      setDisease({ ...disease, header: updated });
                    }}
                  />
                  <Input
                    placeholder="Intro"
                    value={h.diseaseDesc.intro}
                    onChange={(e) => {
                      const updated = [...disease.header];
                      updated[idx].diseaseDesc.intro = e.target.value;
                      setDisease({ ...disease, header: updated });
                    }}
                  />
                  <Input
                    placeholder="Symptoms Desc"
                    value={h.diseaseDesc.symptoms.desc}
                    onChange={(e) => {
                      const updated = [...disease.header];
                      updated[idx].diseaseDesc.symptoms.desc = e.target.value;
                      setDisease({ ...disease, header: updated });
                    }}
                  />
                  <Input
                    placeholder="Symptoms Points"
                    value={h.diseaseDesc.symptoms.points.join(", ")}
                    onChange={(e) => {
                      const updated = [...disease.header];
                      updated[idx].diseaseDesc.symptoms.points = e.target.value === "" ? [] : e.target.value.split(",").map((p) => p.trim());
                      setDisease({ ...disease, header: updated });
                    }}
                  />
                  <Input
                    placeholder="Recommendations Desc"
                    value={h.diseaseDesc.recommendations.desc}
                    onChange={(e) => {
                      const updated = [...disease.header];
                      updated[idx].diseaseDesc.recommendations.desc = e.target.value;
                      setDisease({ ...disease, header: updated });
                    }}
                  />
                  <Input
                    placeholder="Recommendations Points"
                    value={h.diseaseDesc.recommendations.points.join(", ")}
                    onChange={(e) => {
                      const updated = [...disease.header];
                      updated[idx].diseaseDesc.recommendations.points = e.target.value === "" ? [] : e.target.value.split(",").map((p) => p.trim());
                      setDisease({ ...disease, header: updated });
                    }}
                  />
                </div>
              ))}
              <Button
                onClick={() =>
                  setDisease({
                    ...disease,
                    header: [
                      ...disease.header,
                      {
                        diseaseName: "",
                        speciality: "",
                        geneName: "",
                        category: "Hereditary Cancers",
                        diseaseDesc: { intro: "", symptoms: { desc: "", points: [""] }, recommendations: { desc: "", points: [""] } },
                      },
                    ],
                  })
                }
              >
                Add Disease Risk
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- GENETIC MUTATION --- */}
        <TabsContent value="geneticMutation">
          <Card>
            <CardHeader>
              <CardTitle>Genetic Mutation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {disease.geneticMutation.map((g, idx) => (
                <div key={idx} className="space-y-2 border p-2 rounded">
                  <select
                    className="border rounded p-2 w-full"
                    value={g.gene.geneName}
                    onChange={(e) => {
                      const selectedGene = excelData?.[0]?.genes.find((gene: any) => gene.geneName === e.target.value);
                      const updated = [...disease.geneticMutation];
                      if (selectedGene) {
                        updated[idx].gene.geneName = selectedGene.geneName;
                        updated[idx].gene.desc.intro = selectedGene.intro;
                        updated[idx].gene.desc.mid = selectedGene.mid;
                      } else {
                        updated[idx].gene.geneName = e.target.value;
                      }
                      setDisease({ ...disease, geneticMutation: updated });
                    }}
                  >
                    <option value="">Select Gene</option>
                    {excelData?.[0]?.genes.map((gene: any, i: any) => (
                      <option key={i} value={gene.geneName}>
                        {gene.geneName}
                      </option>
                    ))}
                  </select>

                  <Input
                    placeholder="Disease Name"
                    value={g.diseaseName}
                    onChange={(e) => {
                      const updated = [...disease.geneticMutation];
                      updated[idx].diseaseName = e.target.value;
                      setDisease({ ...disease, geneticMutation: updated });
                    }}
                  />

                  {/* Conditionally render Intro, Mid, End */}
                  {g.gene.desc.intro && (
                    <Input
                      placeholder="Intro"
                      value={g.gene.desc.intro}
                      onChange={(e) => {
                        const updated = [...disease.geneticMutation];
                        updated[idx].gene.desc.intro = e.target.value;
                        setDisease({ ...disease, geneticMutation: updated });
                      }}
                    />
                  )}
                  {g.gene.desc.mid && (
                    <Input
                      placeholder="Mid"
                      value={g.gene.desc.mid}
                      onChange={(e) => {
                        const updated = [...disease.geneticMutation];
                        updated[idx].gene.desc.mid = e.target.value;
                        setDisease({ ...disease, geneticMutation: updated });
                      }}
                    />
                  )}
                  <Input
                    placeholder="Mutation Description"
                    value={g.gene.desc.end}
                    onChange={(e) => {
                      const updated = [...disease.geneticMutation];
                      updated[idx].gene.desc.end = e.target.value;
                      setDisease({ ...disease, geneticMutation: updated });
                    }}
                  />

                  <Input
                    placeholder="Mutation"
                    value={g.mutation}
                    onChange={(e) => {
                      const updated = [...disease.geneticMutation];
                      updated[idx].mutation = e.target.value;
                      setDisease({ ...disease, geneticMutation: updated });
                    }}
                  />
                  <select
                    className="border rounded p-2 w-full"
                    value={g.type}
                    onChange={(e) => {
                      const updated = [...disease.geneticMutation];
                      updated[idx].type = e.target.value;
                      setDisease({ ...disease, geneticMutation: updated });
                    }}
                  >
                    <option value="">Select Type</option>
                    {excelData?.[0]?.mutations.type.map((t: any, i: any) => (
                      <option key={i} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                  <select
                    className="border rounded p-2 w-full"
                    value={g.zygosity}
                    onChange={(e) => {
                      const updated = [...disease.geneticMutation];
                      updated[idx].zygosity = e.target.value;
                      setDisease({ ...disease, geneticMutation: updated });
                    }}
                  >
                    <option value="">Select Zygosity</option>
                    {excelData?.[0]?.mutations.zygosity.map((z: any, i: any) => (
                      <option key={i} value={z}>
                        {z}
                      </option>
                    ))}
                  </select>

                  <select
                    className="border rounded p-2 w-full"
                    value={g.inheritance}
                    onChange={(e) => {
                      const updated = [...disease.geneticMutation];
                      updated[idx].inheritance = e.target.value;
                      setDisease({ ...disease, geneticMutation: updated });
                    }}
                  >
                    <option value="">Select Inheritance</option>
                    {excelData?.[0]?.mutations.inheritance.map((inh: any, i: any) => (
                      <option key={i} value={inh}>
                        {inh}
                      </option>
                    ))}
                  </select>

                  <select
                    className="border rounded p-2 w-full"
                    value={g.classification}
                    onChange={(e) => {
                      const updated = [...disease.geneticMutation];
                      updated[idx].classification = e.target.value;
                      setDisease({ ...disease, geneticMutation: updated });
                    }}
                  >
                    <option value="">Select Classification</option>
                    {excelData?.[0]?.mutations.classification.map((c: any, i: any) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <Button
                onClick={() =>
                  setDisease({
                    ...disease,
                    geneticMutation: [
                      ...disease.geneticMutation,
                      {
                        gene: {
                          geneName: "",
                          desc: { intro: "", mid: "", end: "" },
                        },
                        mutation: "",
                        type: "",
                        zygosity: "",
                        diseaseName: "",
                        inheritance: "",
                        classification: "",
                      },
                    ],
                  })
                }
              >
                Add Genetic Mutation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- DRUG RESPONSE --- */}
        <TabsContent value="drugResponse">
          <Card>
            <CardHeader>
              <CardTitle>Drug Response</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["drugsToAvoid", "drugsWithCaution"].map((type) => (
                <div key={type} className="border p-4 rounded space-y-2">
                  <h3 className="font-semibold">{type === "drugsToAvoid" ? "Drugs to Avoid" : "Drugs With Caution"}</h3>
                  {(disease.drugResponse as any)[type].map((d: DrugDetail, idx: number) => (
                    <div key={idx} className="grid grid-cols-2 gap-2">
                      <select
                        className="border rounded p-2 w-full"
                        value={d.drugName}
                        onChange={(e) => {
                          const selectedDrug = excelData?.[0]?.drugs.find((dr: any) => dr.drugName === e.target.value);

                          const updated = [...(disease.drugResponse as any)[type]];
                          if (selectedDrug) {
                            updated[idx] = {
                              ...updated[idx],
                              drugName: selectedDrug.drugName,
                              medicalSpeciality: selectedDrug.medicalSpeciality,
                              function: selectedDrug.function,
                              medicalCondition: selectedDrug.medicalCondition,
                              similarDrug: selectedDrug.similarDrug,
                              alternativeDrug: selectedDrug.alternativeDrug,
                            };
                          } else {
                            updated[idx].drugName = e.target.value;
                          }

                          setDisease({
                            ...disease,
                            drugResponse: { ...disease.drugResponse, [type]: updated },
                          });
                        }}
                      >
                        <option value="">Select Drug</option>
                        {excelData?.[0]?.drugs.map((drug: any, i: any) => (
                          <option key={i} value={drug.drugName}>
                            {drug.drugName}
                          </option>
                        ))}
                      </select>

                      <Input
                        placeholder="Medical Speciality"
                        value={d.medicalSpeciality}
                        onChange={(e) => {
                          const updated = [...(disease.drugResponse as any)[type]];
                          updated[idx].medicalSpeciality = e.target.value;
                          setDisease({ ...disease, drugResponse: { ...disease.drugResponse, [type]: updated } });
                        }}
                      />
                      <Input
                        placeholder="Gene Name"
                        value={d.geneName}
                        onChange={(e) => {
                          const updated = [...(disease.drugResponse as any)[type]];
                          updated[idx].geneName = e.target.value;
                          setDisease({ ...disease, drugResponse: { ...disease.drugResponse, [type]: updated } });
                        }}
                      />
                      <Input
                        placeholder="Diplotype"
                        value={d.diplotype}
                        onChange={(e) => {
                          const updated = [...(disease.drugResponse as any)[type]];
                          updated[idx].diplotype = e.target.value;
                          setDisease({ ...disease, drugResponse: { ...disease.drugResponse, [type]: updated } });
                        }}
                      />
                      <Input
                        placeholder="Phenotype"
                        value={d.phenotype}
                        onChange={(e) => {
                          const updated = [...(disease.drugResponse as any)[type]];
                          updated[idx].phenotype = e.target.value;
                          setDisease({ ...disease, drugResponse: { ...disease.drugResponse, [type]: updated } });
                        }}
                      />
                      <Input
                        placeholder="Function"
                        value={d.function}
                        onChange={(e) => {
                          const updated = [...(disease.drugResponse as any)[type]];
                          updated[idx].function = e.target.value;
                          setDisease({ ...disease, drugResponse: { ...disease.drugResponse, [type]: updated } });
                        }}
                      />
                      <Input
                        placeholder="Medical Condition"
                        value={d.medicalCondition}
                        onChange={(e) => {
                          const updated = [...(disease.drugResponse as any)[type]];
                          updated[idx].medicalCondition = e.target.value;
                          setDisease({ ...disease, drugResponse: { ...disease.drugResponse, [type]: updated } });
                        }}
                      />
                      <Input
                        placeholder="Similar Drug"
                        value={d.similarDrug}
                        onChange={(e) => {
                          const updated = [...(disease.drugResponse as any)[type]];
                          updated[idx].similarDrug = e.target.value;
                          setDisease({ ...disease, drugResponse: { ...disease.drugResponse, [type]: updated } });
                        }}
                      />
                      <Input
                        placeholder="Alternative Drug"
                        value={d.alternativeDrug}
                        onChange={(e) => {
                          const updated = [...(disease.drugResponse as any)[type]];
                          updated[idx].alternativeDrug = e.target.value;
                          setDisease({ ...disease, drugResponse: { ...disease.drugResponse, [type]: updated } });
                        }}
                      />
                      <Input
                        placeholder="Speciality"
                        value={d.speciality.map((s) => s.name).join(", ")}
                        onChange={(e) => {
                          const updated = [...(disease.drugResponse as any)[type]];
                          updated[idx].speciality = e.target.value === "" ? [] : e.target.value.split(",").map((s) => ({ name: s.trim() }));
                          setDisease({ ...disease, drugResponse: { ...disease.drugResponse, [type]: updated } });
                        }}
                      />
                    </div>
                  ))}
                  <Button
                    onClick={() => {
                      const newDrug: DrugDetail = { drugName: "", medicalSpeciality: "", geneName: "", diplotype: "", phenotype: "", function: "", medicalCondition: "", similarDrug: "", alternativeDrug: "", speciality: [] };
                      const updated = [...(disease.drugResponse as any)[type], newDrug];
                      setDisease({ ...disease, drugResponse: { ...disease.drugResponse, [type]: updated } });
                    }}
                  >
                    Add {type === "drugsToAvoid" ? "Drug to Avoid" : "Drug With Caution"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- REPORT GENERATED --- */}
        <TabsContent value="reportGenerated">
          <Card>
            <CardHeader>
              <CardTitle>Report Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900">Select Report Date</label>
                <Input
                  type="date"
                  value={disease.reportGenerated ? disease.reportGenerated.split("T")[0] : ""}
                  onChange={(e) => {
                    setDisease({ ...disease, reportGenerated: e.target.value });
                  }}
                />
              </div>
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
