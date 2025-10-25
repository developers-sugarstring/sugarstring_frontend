// src/components/ReportFooter.tsx

interface ReportFooterProps {
  pageIndex?: number; // zero-based index from parent
  totalPages?: number;
  widthClass?: string; // optional prop to override width (e.g. "w-[90%]", "w-full")
}

const ReportFooter = ({
  pageIndex = 0,
  totalPages = 17,
  widthClass = "w-full", // default
}: ReportFooterProps) => {
  const pageNumber = pageIndex;
  const formatNumber = (num: number) => (num < 10 ? `0${num}` : String(num));

  return (
    <footer className={`mt-auto ${widthClass} border-t border-[#D9D9D9] pt-[6px] flex justify-between items-center text-[9px]`}>
      <img src="/Frame 20108.svg" alt="FooterLogo" className="h-[44px]" />
      <div className="text-[#1A1A1A] text-[9px] font-medium">
        {formatNumber(pageNumber)} / {formatNumber(totalPages)}
      </div>
    </footer>
  );
};

export default ReportFooter;
