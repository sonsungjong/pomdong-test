"use client";

import { ChevronDown, RefreshCcw, Square, X } from "lucide-react";

const patientRows = [
  ["High Risk", "120"],
  ["Middle Risk", "250"],
  ["Low Risk", "150"],
];

import { SubgroupSetsSummary } from "@/components/subgroups/SubgroupSetsSummary";

export default function SubgroupsPage() {
  return (
    <section>
      <div className="flex items-end justify-between mb-6 px-4">
        <div>
          <h1 className="text-[40px] font-bold tracking-tight text-[#1E1F23]">Subgroups Set Selection</h1>
          <p className="text-2xl text-gray-500 mt-1">Drug Responsivenss</p>
        </div>
      </div>

      <div className="subgroups-layout">
        <div className="summary-side">
          <SubgroupSetsSummary />
        </div>

        <section className="detail-main panel-soft">
          <table className="data-table">
            <thead>
              <tr>
                <th>Detail</th>
                <th>Select</th>
                <th>No</th>
                <th>Set Name</th>
                <th>Outcome</th>
                <th>Cutoff</th>
                <th>Month</th>
                <th>#Of Groups</th>
                <th>Progression Delay</th>
                <th>Group balance</th>
                <th>Refine Cutoffs</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ChevronDown size={14} />
                </td>
                <td>
                  <Square size={14} />
                </td>
                <td>01</td>
                <td>Set 2</td>
                <td>rHTE</td>
                <td>≤ 80%</td>
                <td>15</td>
                <td>3</td>
                <td>2.3 months</td>
                <td>OK (n min=120)</td>
                <td>
                  <RefreshCcw size={14} />
                </td>
                <td>
                  <X size={14} />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="sub-content">
            <div className="left-cards">
              <article className="mini-card">
                <h3>Disease Progression by Subgroup</h3>
                <div className="line-grid">
                  <span className="line one" />
                  <span className="line two" />
                  <span className="line three" />
                </div>
              </article>

              <article className="mini-card">
                <h3>Number of patients</h3>
                <p className="small-muted">At least 00 patients per group are recommended.</p>
                <table className="mini-table">
                  <thead>
                    <tr>
                      <th>Group</th>
                      <th>Number of patients</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientRows.map((row) => (
                      <tr key={row[0]}>
                        <td>{row[0]}</td>
                        <td>{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            </div>

            <article className="variance-card">
              <h3>Variance Reduction Explained</h3>
              <p>
                Subgroup stratification reduced the overall variance by 35.5%. The observed variance reduction was
                primarily driven by the Low Risk patient group.
              </p>

              <div className="variance-grid">
                <section className="variance-box">
                  <h4>Variance composition</h4>
                  <p className="value-row">
                    Variance <strong>30.10</strong> VR <strong>0.348</strong>
                  </p>
                  <div className="stack-bar">
                    <span className="stack-a" />
                    <span className="stack-b" />
                  </div>
                </section>

                <section className="variance-box">
                  <h4>Within-group variance by subgroup</h4>
                  <p className="value-row">
                    High <strong>50</strong> Low <strong>12</strong>
                  </p>
                  <div className="bars">
                    <span className="bar h1" />
                    <span className="bar h2" />
                    <span className="bar h3" />
                  </div>
                </section>
              </div>
            </article>
          </div>
        </section>
      </div>

      <div className="footer-actions">
        <button type="button" className="btn-ghost">
          Save Progress
        </button>
        <button type="button" className="btn-disabled">
          Subgroup Explain
        </button>
      </div>
    </section>
  );
}
