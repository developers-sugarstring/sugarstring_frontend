
import ReportHeader from "../reusable-report/ReportHeader";
import ReportFooter from "../reusable-report/ReportFooter";
import type { HereditaryCancer } from "@/types/Disease";
import { HereditaryCancerList } from "../reusable-report/HereditaryCancerList";

const HereditaryReport = ({
  diseases,
  pageIndex,
  totalPages,
  startIndex = 0,
}: {
  diseases: HereditaryCancer[];
  pageIndex: number;
  totalPages: number;
  startIndex?: number;
}) => {
  return (
    <div className="w-full h-full bg-white font-sans text-[#1A1A1A] px-[54px] pt-[38px] pb-[30px] flex flex-col justify-between">
      <ReportHeader title="RESULT DESCRIPTION" />

      {/* Static intro text only for first page */}
      {startIndex==0 && (
        <>
          {/* Section Title */}
          <h2 className="text-[12px] font-bold mt-[20px]">GENETIC RISKS</h2>
          <p className="text-[9px] leading-[14px] mt-[4px]">
            HEALTH<strong>STRING</strong> analyses your DNA to identify genetic
            factors associated with 100 hereditary cancers, 105 heart conditions
            and 6,000 other genetic diseases that could impact your health and well-being. 
            The results can be utilised during consultations with a physician to develop strategies
            aimed at preventing adverse health events through lifestyle optimisations, medications,
            or other appropriate medical interventions.
          </p>
          <p className="text-[9px] italic mt-[6px] text-right">
            For the list of cancer & cardiac diseases screened, see the ‘Disease
            Coverage’ section on page I & III
          </p>
        </>
      )}

      <div className="flex-1">
        <div className="mt-[24px]">
          <div className="flex items-center space-x-[8px]">
            <img src="/heriditary.svg" alt="FooterLogo" className="h-[20px]" />
            <h3 className="text-[9px] font-bold tracking-wide">
              HEREDITARY CANCERS
            </h3>
          </div>

          {/* Pass updated structure to HeartDiseaseList */}
          <HereditaryCancerList cancers={diseases} startIndex={startIndex} />
        </div>
      </div>
      <ReportFooter pageIndex={pageIndex} totalPages={totalPages} />
    </div>
  );
};

export default HereditaryReport;
