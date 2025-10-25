import type { OtherDisease } from "@/types/Disease";

export const OtherDiseaseList = ({
  others,
  startIndex = 0,
}: {
  others: OtherDisease[];
  startIndex?: number;
}) => {
  return (
    <>
      {others.map((other, index) => (
        <div key={index} className="flex mt-[8px] gap-[10px]">
          {/* Left column */}
          <div className="w-[20%] flex flex-col pl-[10px]">
            <p className="text-[9px] font-semibold leading-tight">
              {startIndex + index + 1}. {other.name}
            </p>
            <p className="text-[9px] italic mt-[8px]">
              Gene: <span className="italic font-semibold">{other.gene}</span>
            </p>
            <span className="bg-[#000083] text-[9px] font-semibold rounded-full px-[8px] py-[4px] mt-[12px] w-fit text-white"
            style={{ color: "#ffffff" }}>
              {other.specialty}
            </span>
          </div>

          {/* Right column */}
          <div className="w-[80%]">
            <p className="text-[9px] leading-[14px]">{other.description}</p>

            {/* Symptoms */}
            <h4 className="text-[9px] font-bold mt-[8px]">SYMPTOMS</h4>
            {other.symptoms.intro && (
              <p className="text-[9px] leading-[14px]">
                {other.symptoms.intro}
              </p>
            )}
            <ul className="text-[9px] list-disc ml-[14px] leading-[14px]">
              {other.symptoms.list.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            {other.symptoms.outro && (
              <p className="text-[9px] leading-[14px] mt-[4px]">
                {other.symptoms.outro}
              </p>
            )}

            {/* Recommendations */}
            <h4 className="text-[9px] font-bold mt-[8px]">RECOMMENDATIONS</h4>
            {other.recommendations.intro && (
              <p className="text-[9px] leading-[14px]">
                {other.recommendations.intro}
              </p>
            )}
            <ul className="text-[9px] list-disc ml-[14px] leading-[14px]">
              {other.recommendations.list.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            {other.recommendations.outro && (
              <p className="text-[9px] leading-[14px] mt-[4px]">
                {other.recommendations.outro}
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
