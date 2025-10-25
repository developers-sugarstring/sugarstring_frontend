
import ReportHeader from "../reusable-report/ReportHeader";
import ReportFooter from "../reusable-report/ReportFooter";
import type { UnaffectedCarrier } from "@/types/Disease";
import { UnaffectedCarrierList } from "../reusable-report/UnaffectedCarrierList";

const UnaffectedReport = ({
  diseases,
  pageIndex,
  totalPages,
  startIndex = 0,
}: {
  diseases: UnaffectedCarrier[];
  pageIndex: number;
  totalPages: number;
  startIndex?: number;
}) => {
  return (
    <div className="w-full h-full bg-white font-sans text-[#1A1A1A] px-[54px] pt-[38px] pb-[30px] flex flex-col justify-between">
      <ReportHeader title="RESULT DESCRIPTION" />

      {/* Static intro text only for first page */}
      {/* {startIndex === 0 && (
        <>
          <div className="mt-[24px]">
            <div className="flex items-center space-x-[8px]">
              <img src="/other.svg" alt="FooterLogo" className="h-[20px]" />
              <h3 className="text-[9px] font-bold tracking-wide">
                OTHER DISEASES
              </h3>
            </div>
            <p className="text-[9px] italic mt-[4px]">
              – No significant genetic risk detected –
            </p>
          </div>
        </>
      )} */}

      <div className="flex-1">
        <div className="mt-[24px]">
          <div className="flex items-center space-x-[8px]">
            <img src="/unaffected.svg" alt="FooterLogo" className="h-[20px]" />
            <h3 className="text-[9px] font-bold tracking-wide">
              UNAFFECTED CARRIER
            </h3>
          </div>

          {/* Pass updated structure to UnaffectedCarrierList */}
          <UnaffectedCarrierList carriers={diseases} startIndex={startIndex} />
        </div>
      </div>
       <ReportFooter pageIndex={pageIndex} totalPages={totalPages} />
    </div>
  );
};

export default UnaffectedReport;
