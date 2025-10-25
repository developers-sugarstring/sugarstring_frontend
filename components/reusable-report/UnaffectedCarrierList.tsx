import type { UnaffectedCarrier } from "@/types/Disease";

export const UnaffectedCarrierList = ({
  carriers,
  startIndex = 0,
}: {
  carriers: UnaffectedCarrier[];
  startIndex?: number;
}) => {
  return (
    <>
      {carriers.map((carrier, index) => (
        <div key={index} className="flex mt-[8px] gap-[10px]">
          {/* Left column */}
          <div className="w-[20%] flex flex-col pl-[10px]">
            <p className="text-[9px] font-semibold leading-tight">
              {startIndex + index + 1}. {carrier.name}
            </p>
            <p className="text-[9px] italic mt-[8px]">
              Gene: <span className="italic font-semibold">{carrier.gene}</span>
            </p>
            <span className="bg-[#000083] text-[9px] font-semibold rounded-full px-[8px] py-[4px] mt-[12px] w-fit text-white"
            style={{ color: "#ffffff" }}>
              {carrier.specialty}
            </span>
          </div>

          {/* Right column */}
          <div className="w-[80%]">
            <p className="text-[9px] leading-[14px]">{carrier.description}</p>

            {/* Symptoms */}
            <h4 className="text-[9px] font-bold mt-[8px]">SYMPTOMS</h4>
            {carrier.symptoms.intro && (
              <p className="text-[9px] leading-[14px]">
                {carrier.symptoms.intro}
              </p>
            )}
            <ul className="text-[9px] list-disc ml-[14px] leading-[14px]">
              {carrier.symptoms.list.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            {carrier.symptoms.outro && (
              <p className="text-[9px] leading-[14px] mt-[4px]">
                {carrier.symptoms.outro}
              </p>
            )}

            {/* Recommendations */}
            <h4 className="text-[9px] font-bold mt-[8px]">RECOMMENDATIONS</h4>
            {carrier.recommendations.intro && (
              <p className="text-[9px] leading-[14px]">
                {carrier.recommendations.intro}
              </p>
            )}
            <ul className="text-[9px] list-disc ml-[14px] leading-[14px]">
              {carrier.recommendations.list.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            {carrier.recommendations.outro && (
              <p className="text-[9px] leading-[14px] mt-[4px]">
                {carrier.recommendations.outro}
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
