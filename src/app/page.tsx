"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Copy, Plus, Trash2, Upload } from "lucide-react";

const featureSource = ["MMSE1", "MMSE2", "MMSE3", "MMSE4", "MMSE5", "MMSE6", "MMSE7", "MMSE8", "MMSE9"];

export default function FilterPage() {
  const [tab, setTab] = useState<"inclusion" | "exclusion">("inclusion");
  const [search, setSearch] = useState("");

  const featureList = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return featureSource;
    }
    return featureSource.filter((item) => item.toLowerCase().includes(term));
  }, [search]);

  return (
    <section className="rounded-[22px] border border-[#cdced2] bg-[#e6e6e8] shadow-sm p-3.5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h1 className="m-0 font-display text-[clamp(42px,3.3vw,58px)] leading-[1.04] -tracking-[0.01em]">Filter</h1>
          <p className="mt-1 text-[15px] text-[#5f616c] m-0">Cohort Filter Setup</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="h-[34px] rounded-full border border-[#c8c9d0] bg-[#d9d9de] text-[#46475a] px-4 font-bold text-xs inline-flex items-center justify-center">
            Save Simulation
          </button>
          <Link href="/subgroups" className="h-[34px] rounded-full border border-[#c8c9d0] bg-[#d9d9de] text-[#46475a] px-4 font-bold text-xs inline-flex items-center justify-center">
            Go to Subgroups
          </Link>
          <Link href="/dashboard" className="h-[34px] rounded-full border-0 bg-[#f57f10] text-white px-4 font-bold text-xs inline-flex items-center justify-center">
            Go to Simulation
          </Link>
        </div>
      </header>

      <div className="mt-3.5 grid grid-cols-[240px_minmax(0,1fr)] gap-3">
        <aside className="rounded-[14px] border border-[#cdced2] bg-[#efeff1] p-2.5 flex flex-col gap-2">
          <h2 className="m-0 text-sm font-bold">Feature List</h2>
          <input
            className="h-8 rounded-full border border-[#d8d8dc] bg-[#f5f5f7] text-[#4c4e58] px-3 text-xs w-full"
            placeholder="Search features"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="flex flex-col">
            {featureList.map((item, index) => (
              <button type="button" className="border-0 border-b border-[#cfd0d6] bg-transparent min-h-[38px] flex items-center gap-2 text-[#4b4d58] cursor-pointer text-left" key={`${item}-${index}`}>
                <ChevronDown size={14} className="text-[#6a6d78] w-3.5 h-3.5 flex-none" />
                <span>{item}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-[14px] border border-[#cdced2] bg-[#efeff1] p-2.5 flex flex-col gap-2.5">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`h-7 rounded-full border border-transparent bg-transparent px-3.5 text-xs font-bold cursor-pointer ${tab === "inclusion" ? "bg-[#28235f] text-white" : "text-[#424553]"
                  }`}
                onClick={() => setTab("inclusion")}
              >
                Inclusion
              </button>
              <button
                type="button"
                className={`h-7 rounded-full border border-transparent bg-transparent px-3.5 text-xs font-bold cursor-pointer ${tab === "exclusion" ? "bg-[#28235f] text-white" : "text-[#424553]"
                  }`}
                onClick={() => setTab("exclusion")}
              >
                Exclusion
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" className="w-7 h-7 rounded-full border border-[#d8d8dc] bg-[#e1e1e5] text-[#8b8d98] cursor-pointer inline-flex items-center justify-center">
                <Upload size={14} />
              </button>
              <button type="button" className="w-7 h-7 rounded-full border border-[#d8d8dc] bg-[#e1e1e5] text-[#8b8d98] cursor-pointer inline-flex items-center justify-center">
                <Copy size={14} />
              </button>
              <button type="button" className="w-7 h-7 rounded-full border border-[#d8d8dc] bg-[#e1e1e5] text-[#8b8d98] cursor-pointer inline-flex items-center justify-center">
                <Trash2 size={14} />
              </button>
              <button type="button" className="h-7 rounded-full border border-[#d8d8dc] bg-[#e1e1e5] text-[#8b8d98] px-3 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer">
                Add Section <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="rounded-[10px] border border-[#d8d8dc] bg-[#ededf0]">
            <div className="min-h-[38px] border-b border-[#d0d1d7] px-3 flex items-center gap-2 text-sm font-bold text-[#434653]">
              <ChevronUp size={14} />
              <span>Section 1</span>
            </div>
            <div className="p-2 grid grid-cols-[230px_120px_1fr_34px] gap-2">
              <select className="h-8 border border-[#d8d8dc] rounded-lg bg-[#e5e5ea] text-[#5f6270] text-xs px-2.5 w-full" defaultValue="AGE">
                <option value="AGE">AGE</option>
                <option value="WEIGHT">WEIGHT</option>
                <option value="EGFR">eGFR</option>
              </select>
              <select className="h-8 border border-[#d8d8dc] rounded-lg bg-[#e5e5ea] text-[#5f6270] text-xs px-2.5 w-full" defaultValue="gt">
                <option value="gt">&gt;</option>
                <option value="lt">&lt;</option>
                <option value="eq">=</option>
              </select>
              <input className="h-8 border border-[#d8d8dc] rounded-lg bg-[#e5e5ea] text-[#5f6270] text-xs px-2.5 w-full" placeholder="Write Input" />
              <button type="button" className="h-8 border border-[#d8d8dc] rounded-lg bg-[#e5e5ea] text-[#5f6270] text-xs px-2.5 flex items-center justify-center cursor-pointer">
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="min-h-[340px]" />
          <div className="min-h-[78px] rounded-[10px] border border-[#d8d8dc] bg-[#f3f3f5]" />
        </section>
      </div>
    </section>
  );
}
