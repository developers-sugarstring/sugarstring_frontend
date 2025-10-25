"use client";

import React from "react";
import ReportHeader from "../reusable-report/ReportHeader";
import ReportFooter from "../reusable-report/ReportFooter";
import type {
  HereditaryCancer,
  HeartDisease,
  OtherDisease,
  UnaffectedCarrier,
} from "@/types/Disease";

import { HereditaryCancerList } from "../reusable-report/HereditaryCancerList";
import { HeartDiseaseList } from "../reusable-report/HeartDiseaseList";
import { OtherDiseaseList } from "../reusable-report/OtherDiseaseList";
import { UnaffectedCarrierList } from "../reusable-report/UnaffectedCarrierList";

type Totals = { hereditary: number; heart: number; other: number; unaffected: number };
type Starts = {
  hereditary?: number;
  heart?: number;
  other?: number;
  unaffected?: number;
};

type Props = {
  pageIndex: number;
  totalPages: number;
  hereditary: HereditaryCancer[];   // sliced for this page
  heart: HeartDisease[];            // sliced for this page
  other: OtherDisease[];            // sliced for this page
  unaffected: UnaffectedCarrier[];  // sliced for this page
  starts?: Starts;                  // global starts (for header/intro decisions)
  showIntroOnFirstPage?: boolean;
   totals: Totals;
};

const MergedDiseaseReport: React.FC<Props> = ({
  pageIndex,
  totalPages,
  hereditary,
  heart,
  other,
  unaffected,
  starts = {},
  showIntroOnFirstPage = true,
  totals,  
}) => {
  const hStart = starts.hereditary ?? 0;
  const cStart = starts.heart ?? 0;
  const oStart = starts.other ?? 0;
  const uStart = starts.unaffected ?? 0;

  // This is true only on the first merged-disease page
  const isFirstMergedPage = hStart === 0 && cStart === 0 && oStart === 0 && uStart === 0;

  const showIntro =
    showIntroOnFirstPage &&
    pageIndex === 0 &&
    isFirstMergedPage;

  const NoRiskLine = () => (
    <p className="text-[9px] italic mt-[6px] text-gray-500">
      – No significant genetic risk detected –
    </p>
  );

  const showNoRiskHereditary = totals.hereditary === 0 && isFirstMergedPage && hStart === 0;
  const showNoRiskHeart      = totals.heart      === 0 && isFirstMergedPage && cStart === 0;
  const showNoRiskOther      = totals.other      === 0 && isFirstMergedPage && oStart === 0;
  const showNoRiskUnaffected = totals.unaffected === 0 && isFirstMergedPage && uStart === 0;

  return (
    <div className="w-full h-full bg-white font-sans text-[#1A1A1A] px-[54px] pt-[38px] pb-[30px] flex flex-col justify-between">
      <ReportHeader title="RESULT DESCRIPTION" />

      <div className="flex-1">
        {showIntro && (
          <>
            <h2 className="text-[12px] font-bold mt-[20px]">GENETIC RISKS</h2>
            <p className="text-[9px] leading-[14px] mt-[4px]">
              HEALTH<strong>STRING</strong> analyses your DNA to identify genetic
              factors associated with 100 hereditary cancers, 105 heart conditions,
              and 6,000 other genetic diseases that could impact your health and well-being.
              The results can be utilised during consultations with a physician to develop strategies
              aimed at preventing adverse health events through lifestyle optimisations,
              medications, or other appropriate medical interventions.
            </p>
            <p className="text-[9px] italic mt-[6px] text-right">
              For the list of cancer & cardiac diseases screened, see the ‘Disease
              Coverage’ section on page I & III
            </p>
          </>
        )}

        {/* ===== HEREDITARY ===== */}
        {(hereditary.length > 0 || showNoRiskHereditary) && (
          <section className="mt-[24px]">
            {hStart === 0 && (
              <div className="flex items-center space-x-[8px] mb-[6px]">
                <img src="/heriditary.svg" alt="Hereditary" className="h-[20px]" />
                <h3 className="text-[9px] font-bold tracking-wide">HEREDITARY CANCERS</h3>
              </div>
            )}
            {hereditary.length > 0 ? (
              <HereditaryCancerList cancers={hereditary} startIndex={hStart} /> 
            ) : (
              showNoRiskHereditary && <NoRiskLine />
            )}
          </section>
        )}

        {/* ===== HEART ===== */}
        {(heart.length > 0 || showNoRiskHeart) && (
          <section className="mt-[24px]">
            {cStart === 0 && (
              <div className="flex items-center space-x-[8px] mb-[6px]">
                <img src="/heart.svg" alt="Heart" className="h-[20px]" />
                <h3 className="text-[9px] font-bold tracking-wide">HEART DISEASES</h3>
              </div>
            )}
            {heart.length > 0 ? (
              <HeartDiseaseList diseases={heart} startIndex={cStart} />       
            ) : (
              showNoRiskHeart && <NoRiskLine />
            )}
          </section>
        )}

        {/* ===== OTHER ===== */}
        {(other.length > 0 || showNoRiskOther) && (
          <section className="mt-[24px]">
            {oStart === 0 && (
              <div className="flex items-center space-x-[8px] mb-[6px]">
                <img src="/other.svg" alt="Other" className="h-[20px]" />
                <h3 className="text-[9px] font-bold tracking-wide">OTHER DISEASES</h3>
              </div>
            )}
            {other.length > 0 ? (
              <OtherDiseaseList others={other} startIndex={oStart} />         
            ) : (
              showNoRiskOther && <NoRiskLine />
            )}
          </section>
        )}

        {/* ===== UNAFFECTED CARRIER ===== */}
        {(unaffected.length > 0 || showNoRiskUnaffected) && (
          <section className="mt-[24px]">
            {uStart === 0 && (
              <div className="flex items-center space-x-[8px] mb-[6px]">
                <img src="/unaffected.svg" alt="Unaffected Carrier" className="h-[20px]" />
                <h3 className="text-[9px] font-bold tracking-wide">UNAFFECTED CARRIER</h3>
              </div>
            )}
            {unaffected.length > 0 ? (
              <UnaffectedCarrierList carriers={unaffected} startIndex={uStart} />
            ) : (
              showNoRiskUnaffected && <NoRiskLine />
            )}
          </section>
        )}
      </div>

      <ReportFooter pageIndex={pageIndex} totalPages={totalPages} />
    </div>
  );
};

export default MergedDiseaseReport;
