// src/components/ReportHeader.tsx

interface ReportHeaderProps {
  title?: string;        // Optional dynamic title
  widthClass?: string;   // Optional width override (default w-[90%])
}

const ReportHeader = ({
  title = "RESULT DESCRIPTION",
  widthClass = "w-full", // default
}: ReportHeaderProps) => {
  return (
    <div className={`${widthClass} overflow-hidden`}>
      <div className="flex justify-between items-start">
        <img src="/Group 48098013.svg" alt="HealthString Logo" className="h-[30px]" />
        <h2 className="text-[12px] font-bold">{title}</h2>
      </div>
      <div className="border-t border-[#E6E6E6]" />
    </div>
  );
};

export default ReportHeader;
