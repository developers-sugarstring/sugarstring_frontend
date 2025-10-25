import type { HereditaryCancer } from "@/types/Disease";

export const HereditaryCancerList = ({
  cancers,
  startIndex = 0,
}: {
  cancers: HereditaryCancer[];
  startIndex?: number;
}) => {
  return (
    <>
      {cancers.map((cancer, index) => (
        <div key={index} className="flex mt-[8px] gap-[10px]">
          {/* Left column */}
          <div className="w-[20%] flex flex-col pl-[10px]">
            <p className="text-[9px] font-semibold leading-tight">
              {startIndex + index + 1}. {cancer.name}
            </p>
            <p className="text-[9px] italic mt-[8px]">
              Gene: <span className="italic font-semibold">{cancer.gene}</span>
            </p>
            <span className="bg-[#000083] text-[9px] font-semibold rounded-full px-[8px] py-[4px] mt-[12px] w-fit text-white"
            style={{ color: "#ffffff" }}>
              {cancer.specialty}
            </span>
          </div>

          {/* Right column */}
          <div className="w-[80%]">
            <p className="text-[9px] leading-[14px]">{cancer.description}</p>

            {/* Symptoms */}
            <h4 className="text-[9px] font-bold mt-[8px]">SYMPTOMS</h4>
            {cancer.symptoms.intro && (
              <p className="text-[9px] leading-[14px]">
                {cancer.symptoms.intro}
              </p>
            )}
            <ul className="text-[9px] list-disc ml-[14px] leading-[14px]">
              {cancer.symptoms.list.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            {cancer.symptoms.outro && (
              <p className="text-[9px] leading-[14px] mt-[4px]">
                {cancer.symptoms.outro}
              </p>
            )}

            {/* Recommendations */}
            <h4 className="text-[9px] font-bold mt-[8px]">RECOMMENDATIONS</h4>
            {cancer.recommendations.intro && (
              <p className="text-[9px] leading-[14px]">
                {cancer.recommendations.intro}
              </p>
            )}
            <ul className="text-[9px] list-disc ml-[14px] leading-[14px]">
              {cancer.recommendations.list.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            {cancer.recommendations.outro && (
              <p className="text-[9px] leading-[14px] mt-[4px]">
                {cancer.recommendations.outro}
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
