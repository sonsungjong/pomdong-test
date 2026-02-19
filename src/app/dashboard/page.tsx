"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Circle, CircleDot } from "lucide-react";

const strategies = [
  {
    id: "A",
    cls: "strategy-a",
    name: "Strategy A",
    detail: ["Basal insulin", "SGLT2 inhibitors", "Dapagliflozin, Empagliflozin"],
  },
  {
    id: "B",
    cls: "strategy-b",
    name: "Strategy B",
    detail: ["Basal insulin", "SGLT2 inhibitors", "Dapagliflozin, Empagliflozin"],
  },
  {
    id: "C",
    cls: "strategy-c",
    name: "Strategy C",
    detail: ["Basal insulin", "SGLT2 inhibitors", "Dapagliflozin, Empagliflozin"],
  },
];

export default function DashboardPage() {
  const [active, setActive] = useState("A");

  return (
    <section>
      <h1 className="screen-title">Drug Response Prediction Dashboard</h1>

      <div className="dashboard-layout">
        <aside className="left-board panel-soft">
          <h2 className="section-title">Simulation strategies</h2>

          <div className="strategy-list">
            {strategies.map((strategy) => (
              <button
                type="button"
                key={strategy.id}
                className={active === strategy.id ? `strategy-card ${strategy.cls} active` : `strategy-card ${strategy.cls}`}
                onClick={() => setActive(strategy.id)}
              >
                <strong>{strategy.name}</strong>
                <ol>
                  {strategy.detail.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ol>
              </button>
            ))}
          </div>

          <section className="feature-box">
            <button type="button" className="feature-head">
              <ChevronDown size={14} />
              <span>MMSE</span>
            </button>
            <button type="button" className="feature-radio active">
              <CircleDot size={14} />
              <span>HbA1c</span>
            </button>
            <button type="button" className="feature-radio">
              <Circle size={14} />
              <span>eGFR</span>
            </button>
            <button type="button" className="feature-radio">
              <Circle size={14} />
              <span>Weight</span>
            </button>
            <button type="button" className="feature-radio">
              <Circle size={14} />
              <span>Complication (ex : eGFR slope)</span>
            </button>
          </section>

          <p className="small-muted">Population : N=440</p>
          <p className="small-muted">Follow-up : 12months</p>
          <button type="button" className="btn-primary bottom-btn">
            Edit Condition
          </button>
        </aside>

        <section className="right-board panel-soft">
          <header className="summary-head">
            <h2 className="section-title">Summary</h2>
            <p className="summary-copy">
              Based on counterfactual simulation adjusted for baseline severity, Strategy A demonstrates greater HbA1c
              reduction and faster response, at the cost of increased hypoglycemia risk.
            </p>
            <div className="summary-tags">
              <span>Efficacy</span>
              <span className="active">AE risk</span>
            </div>
          </header>

          <div className="chart-row">
            <article className="chart-box dark">
              <h3>Safety Trade-off</h3>
              <div className="bubble-area">
                <span className="bubble one" />
                <span className="bubble two" />
                <span className="bubble three" />
              </div>
            </article>

            <article className="chart-box dark">
              <div className="chart-top">
                <h3>AE Risk</h3>
                <button type="button" className="small-select">
                  <span>Stroke</span>
                  <ChevronDown size={12} />
                </button>
              </div>
              <div className="risk-area">
                <span className="risk-line a" />
                <span className="risk-line b" />
                <span className="risk-line c" />
              </div>
            </article>
          </div>

          <article className="non-panel">
            <h3>Non responder Identification</h3>
            <p className="small-muted">
              Top contributing factors ranked by impact score, where higher scores indicate stronger contribution to
              non-response.
            </p>
            <div className="non-grid">
              {strategies.map((strategy) => (
                <section key={strategy.id} className={`non-card ${strategy.cls}`}>
                  <h4>{strategy.name}</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Feature condition</th>
                        <th>Impact score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>DM duration &gt; 7y</td>
                        <td>0.32</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Age &gt; 70</td>
                        <td>0.31</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>CKD stage i 3</td>
                        <td>0.18</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              ))}
            </div>
          </article>
        </section>
      </div>

      <div className="footer-actions">
        <button type="button" className="btn-ghost">
          Save Simulation
        </button>
        <Link href="/" className="btn-primary">
          Go to Main
        </Link>
      </div>
    </section>
  );
}
