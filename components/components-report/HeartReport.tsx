// src/components/HeartDiseaseReportPage.tsx

import ReportHeader from "../reusable-report/ReportHeader";
import ReportFooter from "../reusable-report/ReportFooter";
import { HeartDiseaseList } from "../reusable-report/HeartDiseaseList";
import type { HeartDisease } from "@/types/Disease";

const HeartReport = ({
  diseases,
  pageIndex,
  totalPages,
  startIndex = 0,
}: {
  diseases: HeartDisease[];
  pageIndex: number;
  totalPages: number;
  startIndex?: number;
}) => {
  return (
    <div className="w-full h-full bg-white font-sans text-[#1A1A1A] px-[54px] pt-[38px] pb-[30px] flex flex-col justify-between">
      <ReportHeader title="RESULT DESCRIPTION" />
      <div className="flex-1">
        <div className="mt-[24px]">
          <div className="flex items-center space-x-[8px]">
            <img src="/heart.svg" alt="FooterLogo" className="h-[20px]" />
            <h3 className="text-[9px] font-bold tracking-wide">
              HEART DISEASES
            </h3>
          </div>

          {/* Pass updated structure to HeartDiseaseList */}
          <HeartDiseaseList diseases={diseases} startIndex={startIndex} />
        </div>
      </div>
      <ReportFooter pageIndex={pageIndex} totalPages={totalPages} />
    </div>
  );
};

export default HeartReport;
