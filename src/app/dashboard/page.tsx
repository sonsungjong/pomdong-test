"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Circle, CircleDot } from "lucide-react";

const strategies = [
  {
    id: "A",
    color: "border-t-[#4a35e3]", // var(--a)
    name: "Strategy A",
    detail: ["Basal insulin", "SGLT2 inhibitors", "Dapagliflozin, Empagliflozin"],
  },
  {
    id: "B",
    color: "border-t-[#f28715]", // var(--b)
    name: "Strategy B",
    detail: ["Basal insulin", "SGLT2 inhibitors", "Dapagliflozin, Empagliflozin"],
  },
  {
    id: "C",
    color: "border-t-[#22bcc8]", // var(--c)
    name: "Strategy C",
    detail: ["Basal insulin", "SGLT2 inhibitors", "Dapagliflozin, Empagliflozin"],
  },
];

export default function DashboardPage() {
  const [active, setActive] = useState("A");

  return (
    <section>
      <h1 className="m-0 font-display text-[clamp(42px,3.3vw,58px)] leading-[1.04] -tracking-[0.01em]">Drug Response Prediction Dashboard</h1>

      <div className="grid grid-cols-[270px_minmax(0,1fr)] gap-3 mt-3">
        <aside className="rounded-[22px] border border-[#cdced2] bg-[#e6e6e8] shadow-sm p-2.5 flex flex-col gap-2">
          <h2 className="m-0 text-[31px] leading-[1.1] -tracking-[0.01em]">Simulation strategies</h2>

          <div className="flex flex-col gap-2">
            {strategies.map((strategy) => (
              <button
                type="button"
                key={strategy.id}
                className={`rounded-[14px] border border-[#cfd0d6] bg-[#f0f0f3] p-2.5 text-left cursor-pointer border-t-[3px] ${strategy.color} ${active === strategy.id ? "shadow-[inset_0_0_0_1px_#a3a4af]" : ""
                  }`}
                onClick={() => setActive(strategy.id)}
              >
                <strong className="block text-[26px] leading-none mb-1">{strategy.name}</strong>
                <ol className="m-0 pl-4 text-[10px] text-[#5f6170 list-decimal">
                  {strategy.detail.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ol>
              </button>
            ))}
          </div>

          <section className="rounded-[14px] border border-[#d1d2d8] bg-[#ededf1] overflow-hidden">
            <button type="button" className="w-full border-0 border-b border-[#cbccd3] bg-transparent min-h-[30px] text-left px-2.5 text-xs text-[#4e5060] inline-flex items-center gap-1.5 font-bold">
              <ChevronDown size={14} />
              <span>MMSE</span>
            </button>
            <button type="button" className="w-full border-0 border-b border-[#cbccd3] bg-transparent min-h-[30px] text-left px-2.5 text-xs text-[#3129ce] inline-flex items-center gap-1.5 cursor-pointer">
              <CircleDot size={14} />
              <span>HbA1c</span>
            </button>
            <button type="button" className="w-full border-0 border-b border-[#cbccd3] bg-transparent min-h-[30px] text-left px-2.5 text-xs text-[#4e5060] inline-flex items-center gap-1.5 cursor-pointer hover:bg-black/5 transition-colors">
              <Circle size={14} />
              <span>eGFR</span>
            </button>
            <button type="button" className="w-full border-0 border-b border-[#cbccd3] bg-transparent min-h-[30px] text-left px-2.5 text-xs text-[#4e5060] inline-flex items-center gap-1.5 cursor-pointer hover:bg-black/5 transition-colors">
              <Circle size={14} />
              <span>Weight</span>
            </button>
            <button type="button" className="w-full border-0 border-b border-[#cbccd3] bg-transparent min-h-[30px] text-left px-2.5 text-xs text-[#4e5060] inline-flex items-center gap-1.5 cursor-pointer hover:bg-black/5 transition-colors">
              <Circle size={14} />
              <span>Complication (ex : eGFR slope)</span>
            </button>
          </section>

          <p className="m-0 text-[11px] text-[#616270]">Population : N=440</p>
          <p className="m-0 text-[11px] text-[#616270]">Follow-up : 12months</p>
          <button type="button" className="h-[34px] rounded-full border-0 px-4 inline-flex items-center justify-center text-xs font-bold bg-[#f57f10] text-white mt-auto">
            Edit Condition
          </button>
        </aside>

        <section className="rounded-[22px] border border-[#cdced2] bg-[#e6e6e8] shadow-sm p-3.5 flex flex-col gap-2">
          <header className="flex flex-col gap-1.5">
            <h2 className="m-0 text-[31px] leading-[1.1] -tracking-[0.01em]">Summary</h2>
            <p className="m-0 text-[11px] text-[#525462]">
              Based on counterfactual simulation adjusted for baseline severity, Strategy A demonstrates greater HbA1c
              reduction and faster response, at the cost of increased hypoglycemia risk.
            </p>
            <div className="flex gap-2">
              <span className="h-6 px-2.5 rounded-full inline-flex items-center text-[11px] bg-[#efeff3] text-[#5f6171]">Efficacy</span>
              <span className="h-6 px-2.5 rounded-full inline-flex items-center text-[11px] bg-[#28235f] text-white">AE risk</span>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-2">
            <article className="rounded-[14px] p-2 border border-[#1f1a55] bg-[#28235f] text-white">
              <h3 className="m-0 text-base font-semibold">Safety Trade-off</h3>
              <div className="mt-2 h-[240px] rounded-lg border border-[#d8d8df] bg-[#efeff3] relative overflow-hidden">
                <span className="absolute rounded-full w-10 h-10 left-[24%] bottom-[28%] bg-[#25bcc8]" />
                <span className="absolute rounded-full w-[58px] h-[58px] left-[36%] bottom-[18%] bg-[#3f22d8]" />
                <span className="absolute rounded-full w-[74px] h-[74px] left-[68%] bottom-[40%] bg-[#f17100]" />
              </div>
            </article>

            <article className="rounded-[14px] p-2 border border-[#1f1a55] bg-[#28235f] text-white">
              <div className="flex justify-between items-center">
                <h3 className="m-0 text-base font-semibold">AE Risk</h3>
                <button type="button" className="h-6 rounded-full border border-[#c8c9d4] bg-[#d5d5e1] text-[#3a3d52] text-[10px] font-bold px-2 inline-flex items-center gap-1">
                  <span>Stroke</span>
                  <ChevronDown size={12} />
                </button>
              </div>
              <div className="mt-2 h-[240px] rounded-lg border border-[#d8d8df] bg-[#efeff3] relative overflow-hidden">
                <span className="absolute left-[8%] right-[6%] border-t-2 border-[#85cbe2] top-[64%]" />
                <span className="absolute left-[8%] right-[6%] border-t-2 border-[#9190ef] top-[55%]" />
                <span className="absolute left-[8%] right-[6%] border-t-2 border-[#ef8b4a] top-[46%]" />
              </div>
            </article>
          </div>

          <article className="rounded-[14px] border border-[#d1d2d8] bg-[#efeff2] p-2">
            <h3 className="m-0 text-lg text-[#2b2d65] font-semibold">Non responder Identification</h3>
            <p className="m-0 text-[11px] text-[#616270]">
              Top contributing factors ranked by impact score, where higher scores indicate stronger contribution to
              non-response.
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {strategies.map((strategy) => (
                <section key={strategy.id} className="rounded-xl border border-[#d3d4db] bg-[#f5f5f7] p-1.5">
                  <h4 className={`m-0 mb-1 text-[25px] leading-none font-bold ${strategy.id === 'A' ? 'text-[#4a35e3]' : strategy.id === 'B' ? 'text-[#f28715]' : 'text-[#22bcc8]'
                    }`}>{strategy.name}</h4>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border-t border-[#d9d9df] p-1 text-[10px] text-left font-semibold text-gray-600">Rank</th>
                        <th className="border-t border-[#d9d9df] p-1 text-[10px] text-left font-semibold text-gray-600">Feature condition</th>
                        <th className="border-t border-[#d9d9df] p-1 text-[10px] text-left font-semibold text-gray-600">Impact score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-t border-[#d9d9df] p-1 text-[10px] text-left">1</td>
                        <td className="border-t border-[#d9d9df] p-1 text-[10px] text-left">DM duration &gt; 7y</td>
                        <td className="border-t border-[#d9d9df] p-1 text-[10px] text-left">0.32</td>
                      </tr>
                      <tr>
                        <td className="border-t border-[#d9d9df] p-1 text-[10px] text-left">2</td>
                        <td className="border-t border-[#d9d9df] p-1 text-[10px] text-left">Age &gt; 70</td>
                        <td className="border-t border-[#d9d9df] p-1 text-[10px] text-left">0.31</td>
                      </tr>
                      <tr>
                        <td className="border-t border-[#d9d9df] p-1 text-[10px] text-left">3</td>
                        <td className="border-t border-[#d9d9df] p-1 text-[10px] text-left">CKD stage i 3</td>
                        <td className="border-t border-[#d9d9df] p-1 text-[10px] text-left">0.18</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              ))}
            </div>
          </article>
        </section>
      </div>

      <div className="flex justify-end gap-2 mt-2.5">
        <button type="button" className="h-[34px] rounded-full border border-[#c8c9d0] bg-[#d9d9de] text-[#46475a] px-4 font-bold text-xs inline-flex items-center justify-center">
          Save Simulation
        </button>
        <Link href="/" className="h-[34px] rounded-full border-0 bg-[#f57f10] text-white px-4 font-bold text-xs inline-flex items-center justify-center">
          Go to Main
        </Link>
      </div>
    </section>
  );
}
