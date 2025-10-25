const GeneticReportPage = ({
  pageIndex,
  totalPages,
  customerData,
}: {
  pageIndex: number;
  totalPages: number;
  customerData: any;
}) => {
  // ✅ Normalize once
  const profile = customerData?.data ?? {};
  const diseaseData = profile?.disease ?? {};
  const drugResponse = diseaseData?.drugResponse ?? {};

  // ✅ Arrays guarded
  const drugsToAvoid: string[] = Array.isArray(drugResponse?.drugsToAvoid)
    ? drugResponse.drugsToAvoid.map((d: any) => d?.drugName).filter(Boolean)
    : [];

  const drugsWithCaution: string[] = Array.isArray(drugResponse?.drugsWithCaution)
    ? drugResponse.drugsWithCaution.map((d: any) => d?.drugName).filter(Boolean)
    : [];

  // ✅ Disease categories (guard header array)
  const headers: any[] = Array.isArray(diseaseData?.header) ? diseaseData.header : [];

  const hereditaryCancers = headers.filter((d) => d?.category?.toLowerCase() === "hereditary cancers");
  const heartDiseases     = headers.filter((d) => d?.category?.toLowerCase() === "heart diseases");
  const otherDiseases     = headers.filter((d) => d?.category?.toLowerCase() === "other diseases");
  const unaffectedCarriers= headers.filter((d) => d?.category?.toLowerCase() === "unaffected carrier");

  return (
    <div>
      {/* PAGE WRAPPER: full height, controlled padding; footer will be pushed by mt-auto */}
      <div className="relative w-full h-full min-h-[1050px] font-sans text-[#1A1A1A] text-[11px] px-[40px] pt-[40px] pb-[20px] flex flex-col">
        {/* Header */}
        <div className="mb-[12px]">
          <div className="flex justify-between items-start">
            <img src="/Group 48098013.svg" alt="Logo" className="h-[60px]" />
          </div>
          <div className="border-t border-[#D9D9D9] my-[8px] w-full" />
        </div>

        {/* Main content (fills remaining space) */}
        <div className="flex flex-row flex-1 gap-[20px] leading-[1.3]">
          {/* Left Sidebar */}
          <div className="w-[150px] space-y-[6px] shrink-0">
            <div>
              <strong>FULL NAME:</strong>
              <div>{profile?.firstName ?? "—"} {profile?.lastName ?? ""}</div>
            </div>
            <div>
              <strong>GENDER:</strong>
              <div>{profile?.gender ?? "—"}</div>
            </div>
            <div>
              <strong>DOB:</strong>
              <div>{profile?.dob ? new Date(profile.dob).toLocaleDateString() : "—"}</div>
            </div>
            <div>
              <strong>SAMPLE ID:</strong>
              <div>{profile?.sampleId ?? "—"}</div>
            </div>
            <div className="pt-[4px]">
              <strong>TEST ID:</strong>
              <div>{profile?.testId ?? "—"}</div>
            </div>
            <div>
              <strong>ORDER ID:</strong>
              <div>{profile?.orderId ?? "—"}</div>
            </div>
            <div>
              <strong>SAMPLE RECEIVED:</strong>
              <div>{profile?.sampleReceived ? new Date(profile.sampleReceived).toLocaleDateString() : "—"}</div>
            </div>
            <div>
              <strong>REPORT GENERATED:</strong>
              <div>{diseaseData?.reportGenerated ? new Date(diseaseData.reportGenerated).toLocaleDateString() : "—"}</div>
            </div>
            <div className="pt-[8px]">
              <img src="/image 376.svg" alt="ISO Logo" className="w-[48px]" />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-[16px] pr-[10px] flex-1">
            {/* Intro Paragraph */}
            <div className="text-[10px] leading-[1.6] text-justify">
              <p>
                <strong>HEALTH STRING</strong> is a preemptive genetic screening product developed with the vision of empowering individuals to
                identify and address health risks before they escalate. The test pinpoints underlying genetic factors using DNA sequencing and
                artificial intelligence. It is recommended that the findings in the report be corroborated with a physician.
              </p>
            </div>

            {/* Genetic Risk Summary Header */}
            <div className="bg-[#000083] px-[16px] py-[10px] rounded-sm leading-tight text-white">
              <div className="text-[11px] font-bold tracking-wide">
                {diseaseData?.risksDetected ?? "00"} GENETIC RISK DETECTED
              </div>
              <div className="text-[9px] opacity-80 tracking-wide">
                {unaffectedCarriers.length} DISEASE(S) AS AN UNAFFECTED CARRIER DETECTED
              </div>
            </div>

            {/* Genetic Risks Section */}
            <div className="space-y-0 bg-[#F9F9F9] p-[16px] rounded-sm">
              <div className="text-[11px] font-semibold pb-[6px] border-b border-[#E5E5E5]">GENETIC RISKS</div>

              {/* HEREDITARY CANCERS */}
              <div className="flex justify-between items-start py-[8px] border-b border-[#E5E5E5]">
                <div className="flex items-center gap-[8px]">
                  <img src="/heriditary.svg" alt="Hereditary Cancers" className="h-[18px]" />
                  <div className="font-semibold">HEREDITARY CANCERS</div>
                </div>
                {hereditaryCancers.length === 0 ? (
                  <div className="italic text-gray-500 text-right">– No significant genetic risk detected –</div>
                ) : (
                  <ul className="list-disc pl-[16px] text-left">
                    {hereditaryCancers.map((d: any, i: number) => <li key={i}>{d?.diseaseName}</li>)}
                  </ul>
                )}
              </div>

              {/* HEART DISEASES */}
              <div className="flex justify-between items-start py-[8px] border-b border-[#E5E5E5]">
                <div className="flex items-center gap-[8px]">
                  <img src="/heart.svg" alt="Heart Diseases" className="h-[18px]" />
                  <div className="font-semibold">HEART DISEASES</div>
                </div>
                {heartDiseases.length === 0 ? (
                  <div className="italic text-gray-500 text-right">– No significant genetic risk detected –</div>
                ) : (
                  <ul className="list-disc pl-[16px] text-left">
                    {heartDiseases.map((d: any, i: number) => <li key={i}>{d?.diseaseName}</li>)}
                  </ul>
                )}
              </div>

              {/* OTHER DISEASES */}
              <div className="flex justify-between items-start py-[8px] border-b border-[#E5E5E5]">
                <div className="flex items-center gap-[8px]">
                  <img src="/other.svg" alt="Other Diseases" className="h-[18px]" />
                  <div className="font-semibold">OTHER DISEASES</div>
                </div>
                {otherDiseases.length === 0 ? (
                  <div className="italic text-gray-500 text-right">– No significant genetic risk detected –</div>
                ) : (
                  <ul className="list-disc pl-[16px] text-left">
                    {otherDiseases.map((d: any, i: number) => <li key={i}>{d?.diseaseName}</li>)}
                  </ul>
                )}
              </div>

              {/* UNAFFECTED CARRIER */}
              <div className="flex justify-between items-start py-[8px]">
                <div className="flex items-center gap-[8px]">
                  <img src="/unaffected.svg" alt="Unaffected Carrier" className="h-[18px]" />
                  <div className="font-semibold">UNAFFECTED CARRIER</div>
                </div>
                {unaffectedCarriers.length === 0 ? (
                  <div className="italic text-gray-500 text-right">– No carriers detected –</div>
                ) : (
                  <ul className="list-disc pl-[16px] text-left">
                    {unaffectedCarriers.map((d: any, i: number) => <li key={i}>{d?.diseaseName}</li>)}
                  </ul>
                )}
              </div>
            </div>

            {/* Drug Response Section */}
            <div className="space-y-0 bg-[#F9F9F9] p-[16px] rounded-sm mt-[16px]">
              <div className="flex items-center gap-[8px] pb-[6px] border-b border-[#E5E5E5]">
                <img src="/drug_response.svg" alt="Drug Response" className="h-[18px]" />
                <div className="text-[11px] font-semibold">DRUG RESPONSE</div>
              </div>

              {/* TO AVOID */}
              <div className="flex justify-between items-start py-[8px]">
                <div className="font-semibold">TO AVOID</div>
                {drugsToAvoid.length > 0 ? (
                  <div className="text-right text-[11px] leading-[1.4] max-w-[65%]">{drugsToAvoid.join(", ")}</div>
                ) : (
                  <div className="italic text-gray-500 text-right">– No drugs to avoid detected –</div>
                )}
              </div>

              {/* USE WITH CAUTION */}
              <div className="flex justify-between items-start py-[8px]">
                <div className="font-semibold">USE WITH CAUTION</div>
                {drugsWithCaution.length > 0 ? (
                  <div className="text-right text-[11px] leading-[1.4] max-w-[65%]">{drugsWithCaution.join(", ")}</div>
                ) : (
                  <div className="italic text-gray-500 text-right">– No drugs to avoid detected –</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER — in flow, pinned to bottom by mt-auto; aligned with page padding */}
        <footer className="mt-auto w-full border-t border-[#D9D9D9] pt-[6px] bg-white flex justify-between items-center text-[9px]">
          <img src="/SugarStringsLogo_Classic_Full 15.svg" alt="FooterLogo" className="h-[44px]" />
          <div className="text-[#1A1A1A] text-[9px] font-medium">
            {String(pageIndex).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GeneticReportPage;
