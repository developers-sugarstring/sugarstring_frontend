// app/(wherever)/ReportPreview.tsx
"use client";

import { useState, useRef } from "react";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GeneticReportPage from "@/components/components-report/GeneticReportPage";
import { PDFDocument } from "pdf-lib";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";
import type { HeartDisease, UnaffectedCarrier, MutationItem, DrugTypeItem, HereditaryCancer, OtherDisease } from "@/types/Disease";
import { DrugResponse } from "@/components/components-report/DrugResponse";
import GeneticMutation from "@/components/components-report/GeneticMutationDetails";
import DrugResponseDetails from "@/components/components-report/DrugResponseToAvoid";
import DrugResponseCaution from "@/components/components-report/DrugResponseCaution";
import DownloadModal from "@/components/reusable-report/DownloadModal";
import { use } from "react";
import { useGetCustomerById } from "@/utils/api";
import { useReactToPrint } from "react-to-print";
import MergedDiseaseReport from "@/components/components-report/MergedDiseaseReport";

type PageFactory = (opts: { pageIndex: number; totalPages: number }) => React.ReactElement;

/* -------------------- data mappers -------------------- */
export const getHeartDiseases = (customerData: any): HeartDisease[] => {
  const headers = customerData?.data?.disease?.header || [];
  return headers
    .filter((h: any) => h?.category?.toLowerCase().trim() === "heart diseases")
    .map(
      (h: any): HeartDisease => ({
        name: h.diseaseName,
        gene: h.geneName,
        specialty: h.speciality,
        description: h.diseaseDesc?.intro || "",
        symptoms: { intro: h.diseaseDesc?.symptoms?.desc || "", list: h.diseaseDesc?.symptoms?.points || [] },
        recommendations: { intro: h.diseaseDesc?.recommendations?.desc || "", list: h.diseaseDesc?.recommendations?.points || [] },
      })
    );
};

export const getHereditaryCancer = (customerData: any): HereditaryCancer[] => {
  const headers = customerData?.data?.disease?.header || [];
  return headers
    .filter((h: any) => h?.category?.toLowerCase().trim() === "hereditary cancers")
    .map(
      (h: any): HereditaryCancer => ({
        name: h.diseaseName,
        gene: h.geneName,
        specialty: h.speciality,
        description: h.diseaseDesc?.intro || "",
        symptoms: { intro: h.diseaseDesc?.symptoms?.desc || "", list: h.diseaseDesc?.symptoms?.points || [] },
        recommendations: { intro: h.diseaseDesc?.recommendations?.desc || "", list: h.diseaseDesc?.recommendations?.points || [] },
      })
    );
};

export const getOtherDiseases = (customerData: any): OtherDisease[] => {
  const headers = customerData?.data?.disease?.header || [];
  return headers
    .filter((h: any) => h?.category?.toLowerCase().trim() === "other diseases")
    .map(
      (h: any): OtherDisease => ({
        name: h.diseaseName,
        gene: h.geneName,
        specialty: h.speciality,
        description: h.diseaseDesc?.intro || "",
        symptoms: { intro: h.diseaseDesc?.symptoms?.desc || "", list: h.diseaseDesc?.symptoms?.points || [] },
        recommendations: { intro: h.diseaseDesc?.recommendations?.desc || "", list: h.diseaseDesc?.recommendations?.points || [] },
      })
    );
};

export const getUnaffectedDiseases = (customerData: any): UnaffectedCarrier[] => {
  const headers = customerData?.data?.disease?.header || [];
  return headers
    .filter((h: any) => h?.category?.toLowerCase().trim() === "unaffected carrier")
    .map(
      (h: any): UnaffectedCarrier => ({
        name: h.diseaseName,
        gene: h.geneName,
        specialty: h.speciality,
        description: h.diseaseDesc?.intro || "",
        symptoms: { intro: h.diseaseDesc?.symptoms?.desc || "", list: h.diseaseDesc?.symptoms?.points || [] },
        recommendations: { intro: h.diseaseDesc?.recommendations?.desc || "", list: h.diseaseDesc?.recommendations?.points || [] },
      })
    );
};

const getDrugsToAvoidData = (customerData: any): DrugTypeItem[] => {
  if (!customerData?.data?.disease?.drugResponse?.drugsToAvoid) return [];
  return customerData.data.disease.drugResponse.drugsToAvoid.map((drug: any) => ({
    name: drug.drugName,
    medical_speciality: drug.medicalSpeciality,
    gene: drug.geneName,
    diplotype: drug.diplotype,
    phenotype: drug.phenotype,
    function: drug.function,
    medical_conditions: drug.medicalCondition,
    similar_drugs: drug.similarDrug,
    alternative_drugs: drug.alternativeDrug,
  }));
};

const getDrugsWithCautionData = (customerData: any): DrugTypeItem[] => {
  if (!customerData?.data?.disease?.drugResponse?.drugsWithCaution) return [];
  return customerData.data.disease.drugResponse.drugsWithCaution.map((drug: any) => ({
    name: drug.drugName,
    medical_speciality: drug.medicalSpeciality,
    gene: drug.geneName,
    diplotype: drug.diplotype,
    phenotype: drug.phenotype,
    function: drug.function,
    medical_conditions: drug.medicalCondition,
    similar_drugs: drug.similarDrug,
    alternative_drugs: drug.alternativeDrug,
  }));
};

const getMutations = (customerData: any): MutationItem[] => {
  if (!customerData?.data?.disease?.geneticMutation) return [];
  return customerData.data.disease.geneticMutation.map((mut: any) => ({
    gene: mut.gene.geneName,
    mutation: mut.mutation,
    type: mut.type,
    zygosity: mut.zygosity,
    diseases: mut.diseaseName,
    inheritance: mut.inheritance,
    classification: mut.classification,
    details: {
      paragraphs: [mut.gene.desc.intro, mut.gene.desc.mid],
      variantNote: mut.gene.desc.end,
    },
  }));
};

/* ---------------- merged pagination (RANGES) ---------------- */
type Starts = { hereditary?: number; heart?: number; other?: number; unaffected?: number };
type SectionRange = [start: number, end: number]; // end exclusive
type MergedPageRanges = {
  ranges: {
    hereditary: SectionRange;
    heart: SectionRange;
    other: SectionRange;
    unaffected: SectionRange;
  };
  starts: Starts; // global starts (for header/intro logic)
  isFirstMergedPage: boolean;
};

const estimateRowHeight = (symCount: number, recCount: number, descLen: number) => {
  const BASE = 46; // title/gene/specialty + spacing
  const PER_BULLET = 12;
  const DESC = Math.min(Math.ceil((descLen || 0) / 120), 4) * 14; // up to ~4 lines
  return BASE + (symCount + recCount) * PER_BULLET + DESC;
};

const paginateMergedRanges = (data: { hereditary: HereditaryCancer[]; heart: HeartDisease[]; other: OtherDisease[]; unaffected: UnaffectedCarrier[] }): MergedPageRanges[] => {
  const { hereditary, heart, other, unaffected } = data;

  const MAX_CONTENT_HEIGHT = 575;
  const HEADER_H = 28;
  const INTRO_H = 130;

  let hi = 0,
    ci = 0,
    oi = 0,
    ui = 0;
  let hHeader = false,
    cHeader = false,
    oHeader = false,
    uHeader = false;

  const pages: MergedPageRanges[] = [];
  let firstMergedPage = true;

  const takeFrom = <T extends { description?: string; symptoms?: any; recommendations?: any }>(arr: T[], index: number, headerShown: boolean, used: { v: number }): [end: number, headerShownNow: boolean] => {
    let end = index;
    let headerNow = headerShown;

    if (index >= arr.length) return [end, headerNow];

    if (!headerNow) {
      if (used.v + HEADER_H > MAX_CONTENT_HEIGHT) return [end, headerNow];
      used.v += HEADER_H;
      headerNow = true;
    }

    while (end < arr.length) {
      const row: any = arr[end];
      const sym = row?.symptoms?.list?.length || 0;
      const rec = row?.recommendations?.list?.length || 0;
      const descLen = (row?.description || "").length;
      const rowH = estimateRowHeight(sym, rec, descLen);
      if (used.v + rowH > MAX_CONTENT_HEIGHT) break;
      used.v += rowH;
      end++;
    }
    return [end, headerNow];
  };

  while (hi < hereditary.length || ci < heart.length || oi < other.length || ui < unaffected.length) {
    const pageStarts: Starts = { hereditary: hi, heart: ci, other: oi, unaffected: ui };
    const used = { v: 0 };
    if (firstMergedPage) used.v += INTRO_H;

    const [hEnd, hHeaderNow]: [number, boolean] = takeFrom(hereditary, hi, hHeader, used);
    const [cEnd, cHeaderNow]: [number, boolean] = takeFrom(heart, ci, cHeader, used);
    const [oEnd, oHeaderNow]: [number, boolean] = takeFrom(other, oi, oHeader, used);
    const [uEnd, uHeaderNow]: [number, boolean] = takeFrom(unaffected, ui, uHeader, used);

    // nothing fit → force one item to avoid infinite loop
    if (hEnd === hi && cEnd === ci && oEnd === oi && uEnd === ui) {
      if (hi < hereditary.length) {
        pages.push({
          ranges: { hereditary: [hi, hi + 1], heart: [ci, ci], other: [oi, oi], unaffected: [ui, ui] },
          starts: pageStarts,
          isFirstMergedPage: firstMergedPage,
        });
        hi += 1;
        hHeader = true;
        firstMergedPage = false;
        continue;
      }
      if (ci < heart.length) {
        pages.push({
          ranges: { hereditary: [hi, hi], heart: [ci, ci + 1], other: [oi, oi], unaffected: [ui, ui] },
          starts: pageStarts,
          isFirstMergedPage: firstMergedPage,
        });
        ci += 1;
        cHeader = true;
        firstMergedPage = false;
        continue;
      }
      if (oi < other.length) {
        pages.push({
          ranges: { hereditary: [hi, hi], heart: [ci, ci], other: [oi, oi + 1], unaffected: [ui, ui] },
          starts: pageStarts,
          isFirstMergedPage: firstMergedPage,
        });
        oi += 1;
        oHeader = true;
        firstMergedPage = false;
        continue;
      }
      if (ui < unaffected.length) {
        pages.push({
          ranges: { hereditary: [hi, hi], heart: [ci, ci], other: [oi, oi], unaffected: [ui, ui + 1] },
          starts: pageStarts,
          isFirstMergedPage: firstMergedPage,
        });
        ui += 1;
        uHeader = true;
        firstMergedPage = false;
        continue;
      }
    }

    pages.push({
      ranges: {
        hereditary: [hi, hEnd],
        heart: [ci, cEnd],
        other: [oi, oEnd],
        unaffected: [ui, uEnd],
      },
      starts: pageStarts,
      isFirstMergedPage: firstMergedPage,
    });

    hi = hEnd;
    ci = cEnd;
    oi = oEnd;
    ui = uEnd;
    hHeader = hHeaderNow;
    cHeader = cHeaderNow;
    oHeader = oHeaderNow;
    uHeader = uHeaderNow;
    firstMergedPage = false;
  }

  if (pages.length === 0) {
    pages.push({
      ranges: { hereditary: [0, 0], heart: [0, 0], other: [0, 0], unaffected: [0, 0] },
      starts: { hereditary: 0, heart: 0, other: 0, unaffected: 0 },
      isFirstMergedPage: true,
    });
  }

  return pages;
};

/* --------------- other paginations (unchanged) --------------- */
const paginateMutations = (mutations: MutationItem[]) => {
  const MAX_HEIGHT = 575;
  const pages: { chunk: MutationItem[]; startIndex: number }[] = [];
  let currentPage: MutationItem[] = [];
  let currentHeight = 0;
  let globalIndex = 0;

  mutations.forEach((m) => {
    const estimatedHeight = 120 + m.details.paragraphs.length * 40;
    if (currentHeight + estimatedHeight > MAX_HEIGHT && currentPage.length > 0) {
      pages.push({ chunk: currentPage, startIndex: globalIndex - currentPage.length });
      currentPage = [m];
      currentHeight = estimatedHeight;
    } else {
      currentPage.push(m);
      currentHeight += estimatedHeight;
    }
    globalIndex++;
  });

  if (currentPage.length > 0) pages.push({ chunk: currentPage, startIndex: globalIndex - currentPage.length });
  return pages;
};

const paginateDrugs = (drugs: DrugTypeItem[]) => {
  const MAX_HEIGHT = 575;
  const pages: { chunk: DrugTypeItem[]; startIndex: number }[] = [];
  let currentPage: DrugTypeItem[] = [];
  let currentHeight = 0;
  let globalIndex = 0;

  drugs.forEach((d) => {
    const baseHeight = 120;
    const extraHeight = (d.function?.length ?? 0) / 50 + (d.medical_conditions?.length ?? 0) / 50 + (d.similar_drugs?.length ?? 0) / 50 + (d.alternative_drugs?.length ?? 0) / 50;
    const estimatedHeight = baseHeight + extraHeight * 12;

    if (currentHeight + estimatedHeight > MAX_HEIGHT && currentPage.length > 0) {
      pages.push({ chunk: currentPage, startIndex: globalIndex - currentPage.length });
      currentPage = [d];
      currentHeight = estimatedHeight;
    } else {
      currentPage.push(d);
      currentHeight += estimatedHeight;
    }
    globalIndex++;
  });

  if (currentPage.length > 0) pages.push({ chunk: currentPage, startIndex: globalIndex - currentPage.length });
  return pages;
};

/* --------------------------- ReportPreview --------------------------- */
const ReportPreview = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: customerData } = useGetCustomerById(id);
  const printRef = useRef<HTMLDivElement>(null);

  // Source data
  const hereditary = getHereditaryCancer(customerData);
  const heart = getHeartDiseases(customerData);
  const other = getOtherDiseases(customerData);
  const unaffected = getUnaffectedDiseases(customerData);

  // ✅ merged pagination with explicit ranges
  const mergedRangePages = paginateMergedRanges({ hereditary, heart, other, unaffected });

  // Other sections
  const drugsToAvoid = getDrugsToAvoidData(customerData);
  const drugsToCaution = getDrugsWithCautionData(customerData);
  const mutations = getMutations(customerData);

  const drugAvoidPages = paginateDrugs(drugsToAvoid);
  const drugCautionPages = paginateDrugs(drugsToCaution);
  const mutationPages = paginateMutations(mutations);

  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const reportRef = useRef<HTMLDivElement>(null);

  const introFactories: PageFactory[] = [
    () => (
      <div className="flex flex-col items-center justify-between w-full h-full py-6">
        <div className="flex-grow flex items-center justify-center">
          <img src="/Group 48098013.svg" alt="HealthString Logo" className="h-16" />
        </div>
        <div className="pt-4">
          <img src="/Frame 20108.svg" alt="SugarStrings Footer" className="h-10" />
        </div>
      </div>
    ),
    () => (
      <div className="flex items-center justify-center h-full">
        <p className="italic text-gray-600 text-xl">– The Code Within –</p>
      </div>
    ),
  ];

  const contentFactories: PageFactory[] = [
    (opts) => <GeneticReportPage key="genetic" customerData={customerData} pageIndex={opts.pageIndex} totalPages={opts.totalPages} />,

    // ✅ merged disease pages built from exact slices
    ...mergedRangePages.map((pg, idx) => {
      const [hStart, hEnd] = pg.ranges.hereditary;
      const [cStart, cEnd] = pg.ranges.heart;
      const [oStart, oEnd] = pg.ranges.other;
      const [uStart, uEnd] = pg.ranges.unaffected;

      const hereditaryPage = hereditary.slice(hStart, hEnd);
      const heartPage = heart.slice(cStart, cEnd);
      const otherPage = other.slice(oStart, oEnd);
      const unaffectedPage = unaffected.slice(uStart, uEnd);

      return (opts: { pageIndex: number; totalPages: number }) => (
        <MergedDiseaseReport
          key={`merged-${idx}`}
          pageIndex={opts.pageIndex}
          totalPages={opts.totalPages}
          hereditary={hereditaryPage}
          heart={heartPage}
          other={otherPage}
          unaffected={unaffectedPage}
          starts={pg.starts}
          showIntroOnFirstPage={pg.isFirstMergedPage}
          totals={{
            hereditary: hereditary.length,
            heart: heart.length,
            other: other.length,
            unaffected: unaffected.length,
          }}
        />
      );
    }),

    (opts) => <DrugResponse key="drug-response" pageIndex={opts.pageIndex} totalPages={opts.totalPages} customerData={customerData} />,

    ...mutationPages.map(({ chunk, startIndex }, idx) => (opts: { pageIndex: number; totalPages: number }) => <GeneticMutation key={`mutation-${idx}`} mutations={chunk} allMutations={mutations} pageIndex={opts.pageIndex} totalPages={opts.totalPages} startIndex={startIndex} />),

    ...drugAvoidPages.map(({ chunk, startIndex }, idx) => (opts: { pageIndex: number; totalPages: number }) => <DrugResponseDetails key={`drug-${idx}`} drugs={chunk} startIndex={startIndex} pageIndex={opts.pageIndex} totalPages={opts.totalPages} />),

    ...drugCautionPages.map(({ chunk, startIndex }, idx) => (opts: { pageIndex: number; totalPages: number }) => <DrugResponseCaution key={`drug-caution-${idx}`} drugs={chunk} startIndex={startIndex} pageIndex={opts.pageIndex} totalPages={opts.totalPages} />),
  ];

  const totalPages = contentFactories.length;
  const introPages = introFactories.map((factory) => factory({ pageIndex: 0, totalPages: 0 }));
  const contentPages = contentFactories.map((factory, idx) => factory({ pageIndex: idx + 1, totalPages }));
  const pages = [...introPages, ...contentPages];

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const downloadPDF = useReactToPrint({
    contentRef: printRef,
    documentTitle: "The_Sugarstring_Report",
    onBeforePrint: async () => document.documentElement.classList.add("print-mode"),
    onAfterPrint: async () => document.documentElement.classList.remove("print-mode"),
  });

  return (
    <div className="report-body flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4 space-y-4">
      <div className="w-full max-w-[794px] flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold text-blue-900 text-center w-full">The SugarString Report</h2>
        <div className="absolute pr-4">
          <button onClick={downloadPDF} className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-900 transition shadow">
            Download as PDF
          </button>
          <DownloadModal isOpen={isModalOpen} progress={progress} />
        </div>
      </div>

      <div className="relative">
        <button onClick={prevPage} disabled={currentPage === 0} className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 text-blue-700 disabled:text-gray-300 hover:text-blue-900">
          <ChevronLeft size={36} />
        </button>

        <div ref={reportRef} className="relative w-[794px] h-[1050px] max-w/full max-h/full bg-white shadow-lg p-0 border-2 border-blue-800 rounded-lg mx-auto">
          {pages[currentPage]}
        </div>

        <button onClick={nextPage} disabled={currentPage === pages.length - 1} className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 text-blue-700 disabled:text-gray-300 hover:text-blue-900">
          <ChevronRight size={36} />
        </button>
      </div>

      {/* Print root */}
      <div style={{ position: "fixed", left: -99999, top: 0 }}>
        <div ref={printRef} className="print-root">
          {pages.map((p, i) => (
            <div key={i} className="print-page">
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;
