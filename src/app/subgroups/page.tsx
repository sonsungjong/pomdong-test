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
          <p className="text-2xl text-gray-500 mt-1">Drug Responsivenss</p>
        </div>
      </div>

      <div className="grid grid-cols-[360px_minmax(0,1fr)] gap-3 mt-4">
        <div className="p-4">
          <SubgroupSetsSummary />
        </div>

        <section className="flex flex-col gap-2 p-2 rounded-[22px] border border-[#cdced2] bg-[#e6e6e8] shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#e8e8eb]">
                <th className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">Detail</th>
                <th className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">Select</th>
                <th className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">No</th>
                <th className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">Set Name</th>
                <th className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">Outcome</th>
                <th className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">Cutoff</th>
                <th className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">Month</th>
                <th className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">#Of Groups</th>
                <th className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">Progression Delay</th>
                <th className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">Group balance</th>
                <th className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">Refine Cutoffs</th>
                <th className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">
                  <ChevronDown size={14} />
                </td>
                <td className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">
                  <Square size={14} />
                </td>
                <td className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">01</td>
                <td className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">Set 2</td>
                <td className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">rHTE</td>
                <td className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">≤ 80%</td>
                <td className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">15</td>
                <td className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">3</td>
                <td className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">2.3 months</td>
                <td className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">OK (n min=120)</td>
                <td className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">
                  <RefreshCcw size={14} />
                </td>
                <td className="border border-[#cbccd2] p-2 text-[11px] text-left whitespace-nowrap">
                  <X size={14} />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-[1fr_1.6fr] gap-2">
            <div className="grid grid-rows-[1fr_130px] gap-2">
              <article className="rounded-xl border border-[#d2d3d8] bg-[#efeff2] p-2">
                <h3 className="text-sm mb-1.5 font-semibold text-[#1e1f23]">Disease Progression by Subgroup</h3>
                <div className="h-[110px] rounded-lg border border-[#d8d9df] bg-[#f4f4f6] relative">
                  <span className="absolute left-[8%] right-[8%] border-t-2 border-[#8dbfe8] top-[28%]" />
                  <span className="absolute left-[8%] right-[8%] border-t-2 border-[#9292eb] top-[38%]" />
                  <span className="absolute left-[8%] right-[8%] border-t-2 border-[#353262] top-[60%]" />
                </div>
              </article>

              <article className="rounded-xl border border-[#d2d3d8] bg-[#efeff2] p-2">
                <h3 className="text-sm mb-1.5 font-semibold text-[#1e1f23]">Number of patients</h3>
                <p className="text-[11px] text-[#616270] m-0 mb-2">At least 00 patients per group are recommended.</p>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border-t border-[#d8d9df] p-1 text-[10px] text-left font-semibold">Group</th>
                      <th className="border-t border-[#d8d9df] p-1 text-[10px] text-left font-semibold">Number of patients</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientRows.map((row) => (
                      <tr key={row[0]}>
                        <td className="border-t border-[#d8d9df] p-1 text-[10px] text-left">{row[0]}</td>
                        <td className="border-t border-[#d8d9df] p-1 text-[10px] text-left">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            </div>

            <article className="rounded-xl border border-[#292565] bg-[#28235f] text-white p-2.5">
              <h3 className="text-[23px] leading-[1.1] m-0 font-medium">Variance Reduction Explained</h3>
              <p className="text-[10px] text-[#d8d7f0] mt-1.5 m-0">
                Subgroup stratification reduced the overall variance by 35.5%. The observed variance reduction was
                primarily driven by the Low Risk patient group.
              </p>

              <div className="grid grid-cols-2 gap-2 mt-2.5">
                <section className="rounded-[10px] border border-[#b8b8d5] bg-[#f0f0f3] text-[#202233] p-2">
                  <h4 className="text-[11px] m-0 mb-1 font-semibold">Variance composition</h4>
                  <p className="text-[11px] m-0">
                    Variance <strong className="text-[#f17201]">30.10</strong> VR <strong className="text-[#f17201]">0.348</strong>
                  </p>
                  <div className="mt-2 h-[72px] rounded-md overflow-hidden border border-[#d3d3de] bg-white flex flex-col">
                    <span className="block w-full h-[42px] bg-[#2d2a66]" />
                    <span className="block w-full h-[30px] bg-[#a8a4e7]" />
                  </div>
                </section>

                <section className="rounded-[10px] border border-[#b8b8d5] bg-[#f0f0f3] text-[#202233] p-2">
                  <h4 className="text-[11px] m-0 mb-1 font-semibold">Within-group variance by subgroup</h4>
                  <p className="text-[11px] m-0">
                    High <strong className="text-[#f17201]">50</strong> Low <strong className="text-[#f17201]">12</strong>
                  </p>
                  <div className="mt-2 h-[72px] rounded-md border border-[#d3d3de] bg-white flex items-end gap-1.5 p-1.5">
                    <span className="flex-1 rounded-[4px] bg-[#2d2a66] h-[78%]" />
                    <span className="flex-1 rounded-[4px] bg-[#d8d8ec] h-[22%]" />
                    <span className="flex-1 rounded-[4px] bg-[#aba7ea] h-[34%]" />
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
