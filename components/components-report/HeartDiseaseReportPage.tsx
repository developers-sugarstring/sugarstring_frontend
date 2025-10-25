// src/components/HeartDiseaseReportPage.tsx

import ReportHeader from "../reusable-report/ReportHeader";
import ReportFooter from "../reusable-report/ReportFooter";

const HeartDiseaseReportPage = () => {
  return (
    <div className="w-full h-full bg-white font-sans text-[#1A1A1A] px-[54px] pt-[38px] pb-[30px] flex flex-col justify-between">
      {/* Header */}
       <ReportHeader title="RESULT DESCRIPTION" />

      {/* Main Content */}
      <div className="flex-1">
        {/* Section Title */}
        <h2 className="text-[12px] font-bold mt-[20px]">GENETIC RISKS</h2>
        <p className="text-[9px] leading-[14px] mt-[4px]">
          HEALTH<strong>STRING</strong> analyses your DNA to identify genetic
          factors associated with 100 hereditary cancers, 105 heart conditions
          and 6,000 other genetic diseases that
          <br /> could impact your health and well-being.The results can be
          utilised during consultations with a physician to develop strategies
          aimed at preventing adverse
          <br /> health events through lifestyle optimisations, medications, or
          other appropriate medical interventions.
        </p>
        <p className="text-[9px] italic mt-[6px] text-center">
          For the list of cancer & cardiac diseases screened, see the ‘Disease
          Coverage’ section on page I & III
        </p>

        {/* Hereditary Cancers */}
        <div className="mt-[24px]">
          <div className="flex items-center space-x-[8px]">
            <img src="/heriditary.svg" alt="FooterLogo" className="h-[20px]" />
            <h3 className="text-[9px] font-bold tracking-wide">
              HEREDITARY CANCERS
            </h3>
          </div>
          <p className="text-[9px] italic mt-[4px]">
            – No significant genetic risk detected –
          </p>
        </div>

        {/* Heart Diseases */}
        <div className="mt-[24px]">
          <div className="flex items-center space-x-[8px]">
            <img src="/heart.svg" alt="FooterLogo" className="h-[20px]" />
            <h3 className="text-[9px] font-bold tracking-wide">
              HEART DISEASES
            </h3>
          </div>

          {/* Brugada syndrome */}
          <div className="flex mt-[8px] gap-[10px]">
            {/* Left column */}
            <div className="w-[20%] flex flex-col pl-[10px]">
              <p className="text-[9px] font-semibold leading-tight">
                1. Brugada syndrome
              </p>
              <p className="text-[9px] italic mt-[2px]">
                Gene: <span className="italic font-semibold">SCN10A</span>
              </p>
              <span
                className="bg-[#000083] text-[9px] font-semibold rounded-full px-[8px] py-[4px] mt-[4px] w-fit"
                style={{ color: "#ffffff" }}
              >
                Cardiology
              </span>
            </div>

            {/* Right column */}
            <div className="w-[70%]">
              {/* Description */}
              <p className="text-[9px] leading-[14px]">
                Brugada Syndrome is a genetic disorder that affects the heart’s
                electrical system, leading to irregular heart rhythms
                (arrhythmias) and an increased risk of sudden cardiac death.
              </p>

              {/* Symptoms */}
              <h4 className="text-[9px] font-bold mt-[8px]">SYMPTOMS</h4>
              <p className="text-[9px] leading-[14px] mt-[2px]">
                Brugada syndrome often does not cause noticeable symptoms, and
                many people may be unaware they have it (see PMID: 30139433).
                When symptoms occur, they may include:
              </p>
              <ul className="text-[9px] list-disc ml-[14px] leading-[14px]">
                <li>Fainting or blackouts (syncope)</li>
                <li>Dizziness or lightheadedness</li>
                <li>
                  Heart palpitations (feeling of rapid, fluttering, or pounding
                  heartbeat)
                </li>
                <li>
                  Extremely fast and chaotic heartbeat (ventricular arrhythmias)
                </li>
                <li>Seizures</li>
                <li>Gasping or labored breathing, especially at night</li>
                <li>Unexplained nighttime urination</li>
                <li>
                  Sudden cardiac arrest or sudden death, often during sleep or
                  rest
                </li>
              </ul>
              <p className="text-[9px] leading-[14px] mt-[6px]">
                A major indication of Brugada syndrome is an abnormal ECG
                pattern showing ST-segment elevation in leads V1–V3, but this
                can be intermittent (see PMID: 26157012).
              </p>

              {/* Recommendations */}
              <h4 className="text-[9px] font-bold mt-[8px]">RECOMMENDATIONS</h4>
              <p className="text-[9px] leading-[14px] mt-[2px]">
                The following precautions are recommended for people who carry a
                gene mutation associated with Brugada syndrome, to reduce the
                risk of arrhythmias and sudden cardiac events:
              </p>
              <ul className="text-[9px] list-disc ml-[14px] leading-[14px] mt-[4px]">
                <li>
                  Consult a cardiologist experienced in inherited arrhythmias
                  for appropriate evaluation.
                </li>
                <li>
                  Avoid medications that may trigger arrhythmias (see
                  www.brugadadrugs.org).
                </li>
                <li>Manage fever aggressively and seek prompt care.</li>
                <li>Avoid recreational drugs and excessive alcohol.</li>
                <li>
                  Avoid strenuous exercise unless cleared by a cardiologist.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <ReportFooter pageIndex={0} totalPages={17} />
      </div>
    </div>
  );
};

export default HeartDiseaseReportPage;
