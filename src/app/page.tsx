"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Copy, Plus, Trash2, Upload } from "lucide-react";

const featureSource = ["MMSE", "MMSE", "MMSE", "MMSE", "MMSE", "MMSE", "MMSE", "MMSE", "MMSE"];

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
    <section className="screen-panel">
      <header className="screen-head">
        <div>
          <h1 className="screen-title">Filter</h1>
          <p className="screen-subtitle">Cohort Filter Setup</p>
        </div>
        <div className="head-buttons">
          <button type="button" className="btn-ghost">
            Save Simulation
          </button>
          <Link href="/subgroups" className="btn-ghost">
            Go to Subgroups
          </Link>
          <Link href="/dashboard" className="btn-primary">
            Go to Simulation
          </Link>
        </div>
      </header>

      <div className="filter-layout">
        <aside className="left-pane">
          <h2 className="pane-label">Feature List</h2>
          <input
            className="search-input"
            placeholder="Search features"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="feature-scroll">
            {featureList.map((item, index) => (
              <button type="button" className="feature-row" key={`${item}-${index}`}>
                <ChevronDown size={14} className="feature-chevron" />
                <span>{item}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="right-pane">
          <div className="right-top">
            <div className="tab-list">
              <button
                type="button"
                className={tab === "inclusion" ? "tab-chip is-active" : "tab-chip"}
                onClick={() => setTab("inclusion")}
              >
                Inclusion
              </button>
              <button
                type="button"
                className={tab === "exclusion" ? "tab-chip is-active" : "tab-chip"}
                onClick={() => setTab("exclusion")}
              >
                Exclusion
              </button>
            </div>

            <div className="tool-list">
              <button type="button" className="tool-btn">
                <Upload size={14} />
              </button>
              <button type="button" className="tool-btn">
                <Copy size={14} />
              </button>
              <button type="button" className="tool-btn">
                <Trash2 size={14} />
              </button>
              <button type="button" className="tool-add">
                Add Section <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="rule-box">
            <div className="rule-head">
              <ChevronUp size={14} />
              <span>Section 1</span>
            </div>
            <div className="rule-line">
              <select className="rule-select" defaultValue="AGE">
                <option value="AGE">AGE</option>
                <option value="WEIGHT">WEIGHT</option>
                <option value="EGFR">eGFR</option>
              </select>
              <select className="rule-select short" defaultValue="gt">
                <option value="gt">&gt;</option>
                <option value="lt">&lt;</option>
                <option value="eq">=</option>
              </select>
              <input className="rule-input" placeholder="Write Input" />
              <button type="button" className="tool-plus">
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="canvas-area" />
          <div className="bottom-strip" />
        </section>
      </div>
    </section>
  );
}
