import React from "react";
import ReportHeader from "../reusable-report/ReportHeader";
import ReportFooter from "../reusable-report/ReportFooter";
import type { DrugTypeItem } from "@/types/Disease";

interface Props {
  pageIndex: number;
  totalPages: number;
  drugs: DrugTypeItem[];
  startIndex: number;
}

export const DrugResponseDetails: React.FC<Props> = ({
  pageIndex,
  totalPages,
  drugs,
  startIndex,
}) => {
  return (
    <div className="w-full h-full bg-white font-sans text-[#1A1A1A] px-[54px] pt-[38px] pb-[30px] flex flex-col justify-between">
      <ReportHeader title="RESULT DESCRIPTION" />

      <div className="flex-1 mt-[14px] flex flex-col justify-start">
        <div className="max-w-[980px]">
          {/* --- Important Medical Information: ONLY show on first chunk --- */}
          {startIndex === 0 && (
            <div className="mt-[10px] gap-4">
              <h2 className="text-[16px] font-semibold">
                DRUG RESPONSE DETAILS
              </h2>
              <div className="flex items-center space-x-[8px]">
                <img
                  src="/Group.png"
                  alt="DrugResponseLogo"
                  className="h-[20px]"
                />
                <h1 className="text-[12px] font-bold tracking-wide mt-[10px]">
                  Important Medical Information !
                </h1>
              </div>

              <div className="text-[10px] leading-[14px] text-[#333] max-w-[820px] mt-[5px]">
                <div>
                  The drug response information provided in this report is not a
                  substitute for professional medical advice. Medication use and
                  treatment decisions should be made only by a physician or a
                  qualified healthcare professional based on a comprehensive
                  clinical evaluation.
                </div>

                <div className="mt-[8px]">
                  Drug response insights provided herein are based on current
                  scientific knowledge and guidelines, including those from the
                  Clinical Pharmacogenetics Implementation Consortium (CPIC),
                  Dutch Pharmacogenetics Working Group (DPWG), Canadian
                  Pharmacogenomics Network for Drug Safety (CPNDS), and French
                  National Network of Pharmacogenetics (RNPGx).
                </div>
              </div>
              <h3 className="mt-[28px] text-[13px] font-semibold tracking-wide">
                DETAILS OF DRUGS TO AVOID
              </h3>
            </div>
          )}
        </div>

        <section className="max-w-[980px] relative">
          {drugs.map((drug, idx) => (
            <div
              key={idx}
              className="mb-[26px] border-b border-[#EAEAEA] w-[95%] pb-[20px]"
            >
              <div className="flex justify-between">
                <div className="min-w-0 w-full">
                  <div className="flex items-center">
                    <h3 className="text-[13px] font-semibold text-[#000083]">
                      {drug.name}
                    </h3>
                    <div
                      className="ml-auto mr-[35px] flex gap-[6px] flex-wrap"
                      style={{ color: "#fff" }}
                    >
                      {drug.medical_speciality
                        ?.split(",")
                        .map((spec, specIdx) => (
                          <div
                            key={specIdx}
                            className="px-[10px] py-[4px] rounded-full bg-[#000083] text-white text-[10px] font-medium leading-[12px]"
                          >
                            {spec.trim()}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="absolute right-[-20px] top-0 bottom-0 flex items-center">
                    <div className="transform -rotate-90 origin-center text-[10px] tracking-widest text-[#A0A0A0]">
                      TO AVOID
                    </div>
                  </div>

                  <div className="mt-[6px] text-[10px] text-[#555] border-b border-[#E5E5E5] pb-[10px] flex flex-wrap items-center gap-x-[14px] gap-y-1">
                    <div>
                      <h3 className="inline font-semibold text-[#1A1A1A]">
                        Gene:
                      </h3>{" "}
                      <span className="font-medium text-[#1A1A1A]">
                        {drug.gene ?? "—"}
                      </span>
                    </div>
                    <div>
                      <h3 className="inline font-semibold text-[#1A1A1A]">
                        Diplotype:
                      </h3>{" "}
                      <span className="font-medium">
                        {drug.diplotype ?? "—"}
                      </span>
                    </div>
                    <div>
                      <h3 className="inline font-semibold text-[#1A1A1A]">
                        Phenotype:
                      </h3>{" "}
                      <span className="font-medium">
                        {drug.phenotype ?? "—"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-[14px] grid grid-cols-2 gap-x-[48px] text-[10px] leading-[15px]">
                    <div>
                      <h3 className="font-semibold mb-[6px] text-[10px]">
                        Function
                      </h3>
                      <div className="text-[#333]">{drug.function ?? "—"}</div>

                      <h3 className="mt-[16px] font-semibold mb-[6px] text-[10px]">
                        Similar Drugs
                      </h3>
                      <div className="text-[#333]">
                        {drug.similar_drugs ?? "—"}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-[6px] text-[10px]">
                        Medical Conditions
                      </h3>
                      <div className="text-[#333]">
                        {drug.medical_conditions ?? "—"}
                      </div>

                      <h3 className="mt-[16px] font-semibold mb-[6px] text-[10px]">
                        Alternative Drugs
                      </h3>
                      <div className="text-[#333]">
                        {drug.alternative_drugs ?? "—"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      <ReportFooter pageIndex={pageIndex} totalPages={totalPages} />
    </div>
  );
};

export default DrugResponseDetails;
