import ReportHeader from "../reusable-report/ReportHeader";
import ReportFooter from "../reusable-report/ReportFooter";
import type { MutationItem } from "@/types/Disease";

export const GeneticMutation = ({ mutations, allMutations, pageIndex, totalPages, startIndex }: { mutations: MutationItem[]; allMutations: MutationItem[]; pageIndex: number; totalPages: number; startIndex: number }) => {
  const gridTemplate = "0.9fr 2.4fr 0.8fr 0.8fr 1.6fr 0.7fr 0.7fr";

  const uniqueGenes = Array.from(
    mutations
      .reduce((acc, m) => {
        if (!acc.has(m.gene)) acc.set(m.gene, m.gene);
        return acc;
      }, new Map<string, string>())
      .values()
  );

  return (
    // ⬇️ Page wrapper must be a flex column with a min height
    <div className="w-full bg-white font-sans text-[#1A1A1A] flex flex-col min-h-[1050px]">
      {/* ⬇️ Content grows to fill available space */}
      <div className="mx-auto w-full max-w-[820px] flex-1 box-border px-[28px] pt-[38px] pb-[30px]">
        <div className="mb-[6px]">
          <ReportHeader title="RESULT DESCRIPTION" widthClass="w-full" />
        </div>

        {/* ✅ Show table + note only if startIndex === 0 */}
        {startIndex === 0 && (
          <>
            <div className="flex items-start justify-between mt-[8px] mb-[12px]">
              <h1 className="text-[12px] font-bold tracking-wide">GENETIC MUTATIONS DETAILS</h1>
            </div>

            <section className="w-full">
              {/* Table */}
              <div className="w-full grid text-[10px] font-semibold border-b border-[#E5E5E5] pb-[10px] items-center" style={{ gridTemplateColumns: gridTemplate }}>
                <h3 className="pl-1 text-[10px]">Gene</h3>
                <h3 className="pl-1 text-[10px]">Mutation</h3>
                <h3 className="pl-1 text-[10px]">Type</h3>
                <h3 className="pl-1 text-[10px]">Zygosity</h3>
                <h3 className="pl-1 text-[10px]">Disease(s)</h3>
                <h3 className="pl-1 text-[10px]">Inheritance</h3>
                <h3 className="pl-1 text-[10px]">Classification</h3>
              </div>

              <div className="w-full">
                {allMutations.map((m, idx) => (
                  <div key={m.gene + idx} className={`w-full grid text-[10px] leading-[16px] py-[12px] ${idx !== mutations.length - 1 ? "border-b border-[#F3F3F3]" : ""}`} style={{ gridTemplateColumns: gridTemplate, alignItems: "start" }}>
                    <div className="pl-1 font-semibold text-[10px] break-words">{m.gene}</div>

                    {/* Mutation */}
                    <div className="pl-1 text-[9.5px] leading-[14px]">
                      {(() => {
                        const parts = m.mutation.split(" ");
                        const grouped = [parts[0], parts.slice(1, 3).join(" "), parts.slice(3).join(" ")];
                        return grouped.map((g, i) => (
                          <div key={i} className="whitespace-nowrap">
                            {g}
                          </div>
                        ));
                      })()}
                    </div>

                    <div className="pl-1 break-words">{m.type}</div>
                    <div className="pl-1 break-words">{m.zygosity}</div>
                    <div className="pl-1 break-words">{m.diseases}</div>
                    <div className="pl-1 break-words">{m.inheritance}</div>
                    <div className="pl-1 break-words">{m.classification}</div>
                  </div>
                ))}
              </div>

              {/* Note */}
              <div className="mt-[14px]">
                <div className="w-full" />
                <div className="mt-[8px] text-[9px] text-[#6B6B6B] border-b border-[#E0E0E0] pb-[8px] text-right">
                  <em>Note: The MANE-select Ensembl transcript of the gene is reported. The base positions are as per GRCh38.</em>
                </div>
              </div>
            </section>
          </>
        )}

        {/* gene detail section - always visible */}
        <div className="mt-[18px] w-full text-[10px] leading-[18px]">
          {uniqueGenes.map((gene) => {
            const detail = mutations.find((m) => m.gene === gene)?.details;
            if (!detail) return null;

            return (
              <div key={gene} className="mb-[22px]">
                <div className="w-full grid" style={{ gridTemplateColumns: "120px 1fr", columnGap: 20 }}>
                  <div className="pr-2">
                    <h2 className="text-[11px] font-bold">{gene}:</h2>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#222] mb-[8px]">
                      {detail.paragraphs.map((p, i) => (
                        <p key={i} className="mb-[12px] whitespace-pre-wrap break-words">
                          {p}
                        </p>
                      ))}
                      {detail.variantNote && <p className="mb-[10px] text-[9.5px] whitespace-pre-wrap break-words">{detail.variantNote}</p>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer is a sibling and will be pushed down by mt-auto within the component */}
      <div className="px-[40px] pb-[20px]">
        <ReportFooter pageIndex={pageIndex} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default GeneticMutation;
