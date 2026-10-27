import { FileSearch, Palette } from "lucide-react";
import { AssessmentShell } from "@/components/assessment-shell";
import {
  ActionLink,
  Badge,
  Button,
  Field,
  Notice,
  PageHeading,
} from "@/components/ui/primitives";

export const metadata = { title: "Design gallery" };

export default function Gallery() {
  return (
    <AssessmentShell>
      <PageHeading
        eyebrow="Development reference · Design gallery"
        title="A consistent visual language"
        description="A development reference for reviewing shared components, colours and interaction states."
        action={
          <ActionLink href="/assessments/pharma/evidence" secondary>
            Explore a screen
          </ActionLink>
        }
      />
      <div className="gallery-grid">
        <section className="card">
          <div className="card-header">
            <h2>Actions</h2>
          </div>
          <div className="card-body">
            <ActionLink href="/assessments/pharma">Open assessment</ActionLink>
            <ActionLink href="/" secondary>
              Back to workspace
            </ActionLink>
            <Button disabled>Unavailable action</Button>
          </div>
        </section>
        <section className="card">
          <div className="card-header">
            <h2>Content and workflow states</h2>
          </div>
          <div className="card-body">
            <Badge>Not started</Badge>
            <Badge tone="purple">In progress</Badge>
            <Badge tone="warning">Review needed</Badge>
            <Badge tone="success">Complete</Badge>
            <Badge>Draft</Badge>
            <Badge tone="success">Approved example</Badge>
            <p className="body-copy">
              Workflow progress and content approval have separate meanings.
              These are display examples.
            </p>
          </div>
        </section>
        <section className="card">
          <div className="card-header">
            <h2>Labelled fields</h2>
          </div>
          <div className="card-body">
            <div className="gallery-field">
              <Field
                id="gallery-purpose"
                label="Assessment purpose"
                required
                hint="State the question the assessment should help answer."
              >
                <input
                  id="gallery-purpose"
                  required
                  aria-describedby="gallery-purpose-hint"
                  placeholder="Enter a purpose"
                />
              </Field>
            </div>
            <div className="gallery-field">
              <Field id="gallery-error" label="Required input" required>
                <input
                  id="gallery-error"
                  required
                  aria-invalid="true"
                  aria-describedby="gallery-error-message"
                  defaultValue=""
                />
                <p
                  id="gallery-error-message"
                  style={{ color: "var(--error-text)", fontSize: 12 }}
                >
                  Enter the assessment purpose.
                </p>
              </Field>
            </div>
          </div>
        </section>
        <section className="card">
          <div className="card-header">
            <h2>Review messages</h2>
          </div>
          <div className="card-body">
            <Notice title="Consultant review required">
              Inspect the source context before accepting a draft finding.
            </Notice>
            <Notice warning title="Context is incomplete">
              Confirm the participant role group before using this source.
            </Notice>
          </div>
        </section>
        <section className="card">
          <div className="card-header">
            <h2>Empty state</h2>
          </div>
          <div className="empty-state">
            <FileSearch size={30} aria-hidden="true" />
            <h3>No sources to review</h3>
            <p>Agreed sample evidence will appear here when it is available.</p>
            <Badge>Empty-state example</Badge>
          </div>
        </section>
        <section className="card">
          <div className="card-header">
            <h2>Loading and recovery</h2>
          </div>
          <div className="card-body">
            <div className="small-stack" style={{ width: "100%" }}>
              <p className="body-copy">Loading-state example</p>
              <div className="skeleton" aria-hidden="true" />
              <div className="skeleton short" aria-hidden="true" />
            </div>
            <Notice warning title="This view could not load">
              A recovery view offers a retry and a route back to the workspace.
            </Notice>
          </div>
        </section>
        <section className="card">
          <div className="card-header">
            <h2>Palette and typography</h2>
            <Palette size={18} className="muted" aria-hidden="true" />
          </div>
          <div className="card-body">
            {[
              ["Brand", "var(--brand)"],
              ["Accent", "var(--brand-accent)"],
              ["Surface", "var(--surface-muted)"],
            ].map(([name, colour]) => (
              <div className="gallery-colour" key={name}>
                <span
                  className="swatch"
                  style={{ background: colour }}
                  aria-hidden="true"
                />
                <span>{name}</span>
              </div>
            ))}
            <p className="body-copy" style={{ width: "100%" }}>
              Poppins carries the interface. Geist Mono keeps identifiers and
              references easy to scan.
            </p>
            <span className="mono">SOURCE PH-S03</span>
          </div>
        </section>
      </div>
    </AssessmentShell>
  );
}
