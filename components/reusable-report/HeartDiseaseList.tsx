import type { HeartDisease } from "@/types/Disease";

export const HeartDiseaseList = ({ diseases, startIndex = 0 }: { diseases: HeartDisease[]; startIndex?: number }) => {
  return (
    <>
      {diseases.map((disease, index) => (
        <div key={index} className="flex mt-[8px] gap-[10px]">
          {/* Left column */}
          <div className="w-[20%] flex flex-col pl-[10px]">
            <p className="text-[9px] font-semibold leading-tight">
              {startIndex + index + 1}. {disease.name}
            </p>
            <p className="text-[9px] italic mt-[8px]">
              Gene: <span className="italic font-semibold">{disease.gene}</span>
            </p>
            <span className="bg-[#000083] text-[9px] font-semibold rounded-full px-[8px] py-[4px] mt-[12px] w-fit text-white" style={{ color: "#ffffff" }}>
              {disease.specialty}
            </span>
          </div>

          {/* Right column */}
          <div className="w-[80%]">
            <p className="text-[9px] leading-[14px]">{disease.description}</p>

            {/* Symptoms */}
            <h4 className="text-[9px] font-bold mt-[8px]">SYMPTOMS</h4>
            {disease.symptoms.intro && <p className="text-[9px] leading-[14px]">{disease.symptoms.intro}</p>}
            <ul className="text-[9px] list-disc ml-[14px] leading-[14px]">
              {disease.symptoms.list.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            {disease.symptoms.outro && <p className="text-[9px] leading-[14px] mt-[4px]">{disease.symptoms.outro}</p>}

            {/* Recommendations */}
            <h4 className="text-[9px] font-bold mt-[8px]">RECOMMENDATIONS</h4>
            {disease.recommendations.intro && <p className="text-[9px] leading-[14px]">{disease.recommendations.intro}</p>}
            <ul className="text-[9px] list-disc ml-[14px] leading-[14px]">
              {disease.recommendations.list.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            {disease.recommendations.outro && <p className="text-[9px] leading-[14px] mt-[4px]">{disease.recommendations.outro}</p>}
          </div>
        </div>
      ))}
    </>
  );
};
