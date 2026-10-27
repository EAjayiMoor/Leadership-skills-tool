"use client";

import { useState } from "react";
import { FileSearch, Search } from "lucide-react";
import type { EvidenceSource, SourceType } from "../fixtures";
import { Badge, Button, Notice, PageHeading } from "@/components/ui/primitives";

export function EvidenceScreen({
  sources,
}: {
  sources: readonly EvidenceSource[];
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [selectedId, setSelectedId] = useState(sources[0]?.id);
  const filtered = sources.filter(
    (source) =>
      (type === "all" || source.type === type) &&
      `${source.id} ${source.title} ${source.role} ${source.theme}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  const selected =
    filtered.find((source) => source.id === selectedId) ?? filtered[0];
  return (
    <>
      <PageHeading
        eyebrow="Stage 02 · Evidence"
        title="Evidence review"
        description="Keep the source in view. Inspect attribution and context before developing a cohort finding."
        action={<Badge tone="warning">Review needed</Badge>}
      />
      <Notice title="Fictional sources, visible provenance">
        Explore how survey responses, role context and interview notes stay
        connected. Importing and editing sources will follow in a later stage.
      </Notice>
      <div className="evidence-toolbar">
        <div className="search-field">
          <Search size={16} aria-hidden="true" />
          <label className="sr-only" htmlFor="source-search">
            Search sources
          </label>
          <input
            className="filter-input"
            id="source-search"
            type="search"
            placeholder="Search by title, role or source ID"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <label className="sr-only" htmlFor="source-type">
          Source type
        </label>
        <select
          className="filter-select"
          id="source-type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="all">All source types</option>
          {(["Survey", "Interview", "Role context"] as SourceType[]).map(
            (item) => (
              <option key={item}>{item}</option>
            ),
          )}
        </select>
      </div>
      <div className="evidence-grid">
        {filtered.length ? (
          <>
            <section className="card" aria-label="Source list">
              <div className="card-header">
                <h2>Sources</h2>
                <span className="muted" style={{ fontSize: 12 }} role="status">
                  {filtered.length} of {sources.length}
                </span>
              </div>
              <ul className="source-list">
                {filtered.map((source) => (
                  <li key={source.id}>
                    <button
                      className="source-button"
                      aria-pressed={selected?.id === source.id}
                      onClick={() => setSelectedId(source.id)}
                    >
                      <span className="source-meta">
                        <span className="mono">{source.id}</span>
                        <Badge
                          tone={
                            source.type === "Interview" ? "purple" : "neutral"
                          }
                        >
                          {source.type}
                        </Badge>
                      </span>
                      <h3>{source.title}</h3>
                      <p>{source.role}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
            {selected ? (
              <section
                className="card source-detail"
                aria-label="Source detail"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span className="eyebrow">Source passage</span>
                  <Badge>Synthetic example</Badge>
                </div>
                <h2>{selected.title}</h2>
                <dl className="detail-list">
                  <div>
                    <dt>Source ID</dt>
                    <dd className="mono">{selected.id}</dd>
                  </div>
                  <div>
                    <dt>Source type</dt>
                    <dd>{selected.type}</dd>
                  </div>
                  <div>
                    <dt>Role group</dt>
                    <dd>{selected.role}</dd>
                  </div>
                  <div>
                    <dt>Theme example</dt>
                    <dd>{selected.theme}</dd>
                  </div>
                </dl>
                <blockquote>“{selected.excerpt}”</blockquote>
                <Notice title="Consultant review required">
                  Check context, source attribution and contrary evidence before
                  using a passage to support a cohort finding.
                </Notice>
                <h3>Provenance</h3>
                <p className="source-note">{selected.note}</p>
              </section>
            ) : null}
          </>
        ) : (
          <section className="card empty-state" role="status">
            <FileSearch size={32} strokeWidth={1.5} aria-hidden="true" />
            <h2>No matching sources</h2>
            <p>Try a different search or show all source types.</p>
            <Button
              className="button-secondary"
              onClick={() => {
                setQuery("");
                setType("all");
              }}
            >
              Clear filters
            </Button>
          </section>
        )}
      </div>
    </>
  );
}
