"use client";

import { ChevronDown, RefreshCcw, Square, X } from "lucide-react";
import { SubgroupSetsSummary } from "@/components/subgroups/SubgroupSetsSummary";

const patientRows = [
  ["High Risk", "120"],
  ["Middle Risk", "250"],
  ["Low Risk", "150"],
];

export default function SubgroupsPage() {
  return (
    <section>
      <div className="flex items-end justify-between mb-6 px-4">
        <div>
          <h1 className="text-[40px] font-bold tracking-tight text-[#1E1F23] font-display">Subgroups Set Selection</h1>
          <p className="text-gray-500 mt-1">Drug Responsivenss</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-8 items-start mt-4">
        {/* Left Column: Summary Card Wrapper (Gray Border Box) */}
        <div className="bg-[#f2f2f5] rounded-[32px] p-4 border border-[#e1e1e5] shadow-sm lg:sticky lg:top-4">
          <SubgroupSetsSummary />
        </div>

        <section className="flex flex-col gap-6 p-6 rounded-[32px] bg-white shadow-sm min-h-[800px]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-[#f0f0f3]">
                  <th className="p-3 text-[12px] font-bold text-[#8b8d98] text-left">Detail</th>
                  <th className="p-3 text-[12px] font-bold text-[#8b8d98] text-left">Select</th>
                  <th className="p-3 text-[12px] font-bold text-[#8b8d98] text-left">No</th>
                  <th className="p-3 text-[12px] font-bold text-[#8b8d98] text-left">Set Name</th>
                  <th className="p-3 text-[12px] font-bold text-[#8b8d98] text-left">Outcome</th>
                  <th className="p-3 text-[12px] font-bold text-[#8b8d98] text-left">Cutoff</th>
                  <th className="p-3 text-[12px] font-bold text-[#8b8d98] text-left">Month</th>
                  <th className="p-3 text-[12px] font-bold text-[#8b8d98] text-left">#Of Groups</th>
                  <th className="p-3 text-[12px] font-bold text-[#8b8d98] text-left">Progression Delay</th>
                  <th className="p-3 text-[12px] font-bold text-[#8b8d98] text-left">Group balance</th>
                  <th className="p-3 text-[12px] font-bold text-[#8b8d98] text-left">Refine Cutoffs</th>
                  <th className="p-3 text-[12px] font-bold text-[#8b8d98] text-left">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 text-[11px] text-left whitespace-nowrap">
                    <ChevronDown size={14} className="text-[#6b6d7b]" />
                  </td>
                  <td className="p-3 text-[11px] text-left whitespace-nowrap">
                    <Square size={14} className="text-[#cbccd2]" />
                  </td>
                  <td className="p-3 text-[13px] text-[#1e1f23]">01</td>
                  <td className="p-3 text-[13px] text-[#1e1f23]">Set 2</td>
                  <td className="p-3 text-[13px] text-[#1e1f23]">rHTE</td>
                  <td className="p-3 text-[13px] text-[#1e1f23] font-bold">≤ 80%</td>
                  <td className="p-3 text-[13px] text-[#1e1f23]">15</td>
                  <td className="p-3 text-[13px] text-[#1e1f23]">3</td>
                  <td className="p-3 text-[13px] text-[#1e1f23]">2.3 months</td>
                  <td className="p-3 text-[13px] text-[#1e1f23]">OK (n min=120)</td>
                  <td className="p-3 text-[11px] text-left whitespace-nowrap">
                    <RefreshCcw size={14} className="text-[#6b6d7b]" />
                  </td>
                  <td className="p-3 text-[11px] text-left whitespace-nowrap">
                    <div className="h-4 w-[1px] bg-[#dcdcdf] mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.6fr] gap-6">
            <div className="flex flex-col gap-6">
              <article className="rounded-2xl border border-[#d2d3d8] bg-[#f8f8fa] p-4">
                <h3 className="text-[15px] mb-4 font-bold text-[#1e1f23]">Disease Progression by Subgroup</h3>
                <div className="h-[200px] w-full relative">
                  {/* Simplified Chart Placeholder matching style */}
                  <div className="absolute inset-0 border-l border-b border-[#e1e1e6] m-4">
                    <svg className="w-full h-full overflow-visible">
                      <path d="M0,20 Q40,30 80,60 T160,120" fill="none" stroke="#28235f" strokeWidth="2" />
                      <path d="M0,10 Q40,15 80,30 T160,50" fill="none" stroke="#a09ce3" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-[#d2d3d8] bg-[#f8f8fa] p-4">
                <h3 className="text-[15px] mb-1 font-bold text-[#1e1f23]">Number of patients</h3>
                <p className="text-[12px] text-[#616270] m-0 mb-4">At least 00 patients per group are recommended.</p>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-[12px] pb-2 border-b border-[#e6e6e9]">
                    <span className="font-bold text-[#8b8d98]">Group</span>
                    <span className="font-bold text-[#8b8d98]">Number of patients</span>
                  </div>
                  {patientRows.map((row, i) => (
                    <div key={i} className="flex justify-between items-center text-[13px]">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-[#28235f]' : i === 1 ? 'bg-[#6d6a9c]' : 'bg-[#b6b4d6]'}`} />
                        <span className="text-[#1e1f23]">{row[0]}</span>
                      </div>
                      <span className="text-[#1e1f23] font-medium">{row[1]}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <article className="rounded-[24px] border border-[#292565] bg-[#28235f] text-white p-6 flex flex-col">
              <h3 className="text-[20px] leading-[1.1] m-0 font-bold">Variance Reduction Explained</h3>
              <p className="text-[12px] text-[#d8d7f0] mt-2 mb-6 opacity-90 leading-relaxed">
                Subgroup stratification reduced the overall variance by 35.5%.<br />
                The observed variance reduction was primarily driven by the Low Risk patient group.<br />
                Therefore, if cutoff adjustment is required, maintaining the Low Risk group and adjusting
                the cutoff for the High Risk group is a reasonable strategy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                <section className="rounded-xl bg-white text-[#1e1f23] p-4">
                  <h4 className="text-[13px] m-0 mb-2 font-bold">Variance decomposition</h4>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-[10px] text-[#6b6d7b] font-bold uppercase">Variance</span>
                    <span className="text-[24px] font-bold text-[#f57f10]">30.10</span>
                    <span className="text-[10px] text-[#6b6d7b] font-bold uppercase ml-2">VR</span>
                    <span className="text-[24px] font-bold text-[#f57f10]">0.348</span>
                  </div>
                  <div className="h-[100px] w-full bg-[#f0f0f3] rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 w-full h-[60%] bg-[#28235f]" />
                    <div className="absolute top-0 w-full h-[40%] bg-[#b6b4d6]" />
                  </div>
                </section>

                <section className="rounded-xl bg-white text-[#1e1f23] p-4">
                  <h4 className="text-[13px] m-0 mb-2 font-bold">Within-group variance by subgroup</h4>
                  <div className="flex items-baseline gap-4 mb-4 text-[10px] font-bold text-[#6b6d7b] uppercase">
                    <div className="flex flex-col">
                      <span>High</span>
                      <span className="text-[20px] text-[#f57f10]">50</span>
                    </div>
                    <div className="flex flex-col">
                      <span>Low</span>
                      <span className="text-[20px] text-[#f57f10]">12</span>
                    </div>
                  </div>
                  <div className="h-[100px] w-full flex items-end justify-center gap-4">
                    <div className="w-12 bg-[#28235f] rounded-t-lg h-full" />
                    <div className="w-12 bg-[#b6b4d6] rounded-t-lg h-[20%]" />
                  </div>
                </section>
              </div>
            </article>
          </div>
        </section>
      </div>

      <div className="flex justify-end gap-2 mt-2.5">
        <button type="button" className="h-[34px] rounded-full px-4 inline-flex items-center justify-center text-xs font-bold bg-[#d9d9de] text-[#46475a] border border-[#c8c9d0]">
          Save Progress
        </button>
        <button type="button" className="h-[34px] rounded-full px-4 inline-flex items-center justify-center text-xs font-bold bg-[#d9d9de] text-[#9ea0ab] border border-[#cacbd2]">
          Subgroup Explain
        </button>
      </div>
    </section>
  );
}
