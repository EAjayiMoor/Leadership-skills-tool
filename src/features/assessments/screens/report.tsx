"use client";

import { useState } from "react";
import Link from "next/link";
import { Circle, FileCheck2, LockKeyhole } from "lucide-react";
import { Badge, Button, Notice, PageHeading } from "@/components/ui/primitives";

export function ReportScreen({
  scenarioId,
  scenarioName,
  purpose,
  themes,
  sourceIds,
}: {
  scenarioId: string;
  scenarioName: string;
  purpose: string;
  themes: readonly string[];
  sourceIds: readonly string[];
}) {
  const [preview, setPreview] = useState("draft");
  const approved = preview === "approved";
  return (
    <>
      <PageHeading
        eyebrow="Stage 07 · Report approval"
        title="Review before sharing"
        description="Bring cohort findings and recommendations together, with an explicit human review before publication."
        action={
          <Badge tone={approved ? "success" : "purple"}>
            {approved ? "Approved example" : "Draft example"}
          </Badge>
        }
      />
      <div className="report-controls">
        <label htmlFor="report-preview">Report preview state</label>
        <select
          id="report-preview"
          value={preview}
          onChange={(event) => setPreview(event.target.value)}
        >
          <option value="draft">Draft example</option>
          <option value="approved">Approved example</option>
        </select>
        <span className="muted" style={{ fontSize: 12 }}>
          Display examples only
        </span>
      </div>
      <div className="two-column">
        <article className="card report-paper">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <p className="eyebrow">Synthetic cohort report</p>
            <Badge tone={approved ? "success" : "neutral"}>
              {approved ? "Approved example" : "Draft"}
            </Badge>
          </div>
          <h2 className="report-title">Leadership assessment</h2>
          <p>{scenarioName} · Demonstration report</p>
          <div className="report-rule" />
          <h3>Assessment purpose</h3>
          <p>{purpose}</p>
          <h3>Illustrative cohort themes</h3>
          <p>
            The examples below show the structure of a reviewable report. They
            are fictional drafts and have not been validated as assessment
            findings.
          </p>
          {themes.map((theme, index) => (
            <section
              className="report-theme"
              key={theme}
              style={{ marginTop: index === 0 ? 20 : 0 }}
            >
              <h4>
                0{index + 1} · {theme}
              </h4>
              <p>
                {index === 0
                  ? "Shared conversations are helping functions recognise different assumptions. Further evidence would be needed to establish how consistently decisions are carried into action."
                  : index === 1
                    ? "The source examples raise questions about decision ownership and follow-through. A consultant would inspect the supporting and contrary passages before accepting this interpretation."
                    : "The source examples describe interest in change and a need to connect the wider direction with everyday responsibilities. This is an illustrative draft for review."}
              </p>
              <Link
                className="source-reference"
                href={`/assessments/${scenarioId}/evidence`}
              >
                Source examples: {sourceIds[index]},{" "}
                {sourceIds[(index + 2) % sourceIds.length]} · View evidence
              </Link>
            </section>
          ))}
          <h3>Recommendation example</h3>
          <p>
            Consider a shared decision review that makes ownership, next actions
            and open dependencies visible. A consultant would check its
            relevance against approved findings before including it in a final
            report.
          </p>
          <div style={{ marginTop: 24 }}>
            <Notice
              title={
                approved
                  ? "Approved-state illustration"
                  : "Draft for consultant review"
              }
            >
              {approved
                ? "This example illustrates an approved state. No actual review or publication has occurred."
                : "The report text is synthetic and requires human review. No content is ready for external use."}
            </Notice>
          </div>
        </article>
        <aside className="stack report-aside">
          <section className="card">
            <div className="card-header">
              <h2>Publication review</h2>
              <FileCheck2 size={18} className="muted" aria-hidden="true" />
            </div>
            <div className="card-body">
              <h3>Review checklist preview</h3>
              <ul className="checklist">
                {[
                  "Findings checked against sources",
                  "Recommendations reviewed",
                  "Audience and content confirmed",
                  "Reviewer approval recorded",
                ].map((item) => (
                  <li key={item}>
                    <Circle size={15} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="report-actions">
                <Button
                  disabled
                  title="Approval workflow is not available in this prototype"
                >
                  Approve report
                </Button>
                <Button disabled>
                  <LockKeyhole size={15} aria-hidden="true" />
                  Export report
                </Button>
              </div>
              <p className="muted" style={{ marginTop: 16 }}>
                Export is unavailable in this prototype. Operational approval
                and export will be added in a later stage.
              </p>
            </div>
          </section>
          <Notice title="Controlled publication">
            Working evidence and draft findings remain separate from the
            client-facing output. A human review is required before sharing.
          </Notice>
        </aside>
      </div>
    </>
  );
}
