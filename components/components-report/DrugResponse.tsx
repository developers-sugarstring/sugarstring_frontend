import ReportHeader from "../reusable-report/ReportHeader";
import ReportFooter from "../reusable-report/ReportFooter";
import type { DrugItem } from "@/types/Disease";

const getDrugsToAvoidData = (customerData: any): DrugItem[] => {
  if (!customerData?.data?.disease?.drugResponse?.drugsToAvoid) return [];

  return customerData.data.disease.drugResponse.drugsToAvoid.map((drug: any) => ({
    name: drug.drugName,
    medical_speciality: drug.medicalSpeciality,
  }));
};

const getDrugsWithCautionData = (customerData: any): DrugItem[] => {
  if (!customerData?.data?.disease?.drugResponse?.drugsWithCaution) return [];

  return customerData.data.disease.drugResponse.drugsWithCaution.map((drug: any) => ({
    name: drug.drugName,
    medical_speciality: drug.medicalSpeciality,
  }));
};

export const DrugResponse = ({
  pageIndex,
  totalPages,
  customerData
}: {
  pageIndex: number;
  totalPages: number;
  customerData: any;
}) => {
  const drugsToAvoid = getDrugsToAvoidData(customerData);
  const drugsToUseWithCaution = getDrugsWithCautionData(customerData);
  return (
    <div className="w-full h-full bg-white font-sans text-[#1A1A1A] px-[54px] pt-[38px] pb-[30px] flex flex-col justify-between">
      {/* Header */}
      <ReportHeader title="RESULT SUMMARY" />

      {/* Body */}
      <div className="flex-1 mt-[16px] flex flex-col justify-start">
        {/* Title + intro */}
        <div className="max-w-[980px]">
          <div className="flex items-center space-x-[8px]">
            <img
              src="/drug_response.svg"
              alt="DrugResponseLogo"
              className="h-[20px]"
            />
            <h1 className="text-[12px] font-bold tracking-wide">
              DRUG RESPONSE
            </h1>
          </div>

          <p className="mt-[10px] text-[10px] leading-[15px]">
            A person’s response to drugs or medication can vary based on genetic
            factors. HEALTH STRING scans 52 genes associated with the response
            to 307 drugs. The following recommendations are provided based on
            your genetic variants and their possible effects on drug metabolism.
          </p>

          <p className="mt-[4px] text-[8px] leading-[12px] italic text-right">
            For the list of drugs screened, see the ‘Drug Coverage’ section on
            page V
          </p>
        </div>

        {/* ---------- Section: Drugs to avoid ---------- */}
        <section className="mt-[24px] max-w-[980px]">
          <div className="grid grid-cols-[1fr_200px_260px]">
            {/* Header */}
            <div className="col-span-2 grid grid-cols-[1fr_200px] text-[10px] font-medium border-b border-[#E5E5E5] pb-[6px]">
              <h2 className="text-[10px] font-semibold mb-[6px]">
                Drugs to avoid
              </h2>
              <h2 className="text-[10px] font-semibold mb-[6px]">
                Medical Speciality
              </h2>
            </div>
            <div></div>

            {/* Rows */}
            <div className="col-span-2 text-[10px] leading-[16px]">
              {drugsToAvoid.map((drug, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[1fr_200px] py-[8px]"
                >
                  <div>{drug.name}</div>
                  <div>{drug.medical_speciality}</div>
                </div>
              ))}
            </div>

            {/* Note box */}
            <div className={`row-span-${drugsToAvoid.length} flex items-start pt-[8px]`}>
              <div className="border border-[#E6E6E6] rounded-sm p-[10px] text-[8.5px] leading-[12px] max-w-[230px]">
                These drugs may cause adverse effects or reduced efficacy;
                therefore, alternative medication is recommended.
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Section: Drugs to use with caution ---------- */}
        <section className="mt-[28px] max-w-[980px]">
          <div className="grid grid-cols-[1fr_200px_260px]">
            {/* Header */}
            <div className="col-span-2 grid grid-cols-[1fr_200px] text-[10px] font-medium border-b border-[#E5E5E5] pb-[6px]">
              <h2 className="text-[10px] font-semibold mb-[6px]">
                Drugs to use with caution
              </h2>
              <h2 className="text-[10px] font-semibold mb-[6px]">
                Medical Speciality
              </h2>
            </div>
            <div></div>

            {/* Rows */}
            <div className="col-span-2 text-[10px] leading-[16px]">
              {drugsToUseWithCaution.map((drug, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[1fr_200px] py-[8px]"
                >
                  <div>{drug.name}</div>
                  <div>{drug.medical_speciality}</div>
                </div>
              ))}
            </div>

            {/* Note box */}
            <div className={`row-span-${drugsToUseWithCaution.length} flex items-start pt-[8px]`}>
              <div className="border border-[#E6E6E6] rounded-sm p-[10px] text-[8.5px] leading-[12px] max-w-[230px]">
                These drugs may cause adverse effects or reduced efficacy;
                therefore, alternative medication is recommended.
              </div>
            </div>
          </div>
        </section>

        {/* Next page line */}
        <div className="max-w-[980px] mr-[70px] mt-[22px] text-right text-[9px] text-[#777] italic">
          -- Next page: Genetic Mutations Details --
        </div>
      </div>

      {/* Footer */}
      <ReportFooter pageIndex={pageIndex} totalPages={totalPages} />
    </div>
  );
};
