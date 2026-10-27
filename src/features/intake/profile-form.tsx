import { Button, Field } from "@/components/ui/primitives";
import { materialOptions, type Profile, type ProfileField } from "./model";

export const sections = [
  {
    title: "Purpose",
    fields: [
      ["name", "Assessment name"],
      ["why", "Why is the assessment needed now?"],
      ["outcome", "What should the assessment help the client understand?"],
    ],
  },
  {
    title: "Company",
    fields: [
      ["sector", "Sector"],
      ["scale", "Organisation scale"],
      ["locations", "Locations or regions"],
      ["structure", "Structure and operating context"],
    ],
  },
  {
    title: "Leadership scope",
    fields: [
      ["roles", "Which leadership groups are involved?"],
      ["cohort", "Indicative participant count"],
      ["responsibilities", "Relevant role responsibilities"],
    ],
  },
  {
    title: "Assessment focus",
    fields: [
      ["framework", "Existing leadership framework"],
      ["themes", "Agreed themes or areas to explore"],
      ["clientQuestions", "Specific questions the client wants explored"],
    ],
  },
  {
    title: "Available material",
    fields: [["materialNotes", "Material notes"]],
  },
  {
    title: "Expectations",
    fields: [
      ["timeline", "Indicative timeline"],
      ["audience", "Intended report audience"],
      ["reviewer", "Question and finding reviewers"],
    ],
  },
] as const;
const longFields = [
  "why",
  "outcome",
  "structure",
  "roles",
  "responsibilities",
  "themes",
  "clientQuestions",
  "materialNotes",
];
export function ProfileForm({
  profile,
  onChange,
  section,
  onSection,
  onQuestions,
}: {
  profile: Profile;
  onChange: (p: Profile) => void;
  section: number;
  onSection: (n: number) => void;
  onQuestions: () => void;
}) {
  return (
    <div className="stack">
      <nav aria-label="Profile sections" className="intake-sections">
        {sections.map((s, i) => (
          <button
            type="button"
            key={s.title}
            aria-current={section === i ? "step" : undefined}
            onClick={() => onSection(i)}
          >
            {s.title}
          </button>
        ))}
      </nav>
      <form className="card" onSubmit={(e) => e.preventDefault()}>
        <div className="form-section">
          <h2 id="profile-section-heading" tabIndex={-1}>
            {sections[section].title}
          </h2>
          <p>
            Capture synthetic company and role context. These inputs inform
            draft questions, not assessment findings.
          </p>
          {section === 4 && (
            <fieldset className="intake-material">
              <legend>Available material types</legend>
              {materialOptions.map((value) => (
                <label key={value}>
                  <input
                    type="checkbox"
                    checked={profile.material.includes(value)}
                    onChange={(e) =>
                      onChange({
                        ...profile,
                        material: e.target.checked
                          ? [...profile.material, value]
                          : profile.material.filter((v) => v !== value),
                      })
                    }
                  />
                  {value}
                </label>
              ))}
              <p className="field-hint">
                Describe available material; file uploads are not part of this
                increment.
              </p>
            </fieldset>
          )}
          <div className="stack">
            {sections[section].fields.map(([key, label]) => {
              const required = ["why", "outcome", "roles"].includes(key);
              const hint =
                key === "roles"
                  ? "Enter role groups, one per line or separated by commas. Do not enter real participant names."
                  : key === "cohort"
                    ? "Optional planning estimate, from 1 to 10,000."
                    : undefined;
              const props = {
                id: `profile-${key}`,
                value: profile[key],
                required,
                maxLength: longFields.includes(key) ? 2000 : 300,
                "aria-describedby": hint ? `profile-${key}-hint` : undefined,
                onChange: (
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
                ) => onChange({ ...profile, [key]: e.target.value }),
              };
              return (
                <Field
                  key={key}
                  id={`profile-${key}`}
                  label={label}
                  required={required}
                  hint={hint}
                >
                  {longFields.includes(key) ? (
                    <textarea {...props} />
                  ) : (
                    <input
                      {...props}
                      type={key === "cohort" ? "number" : "text"}
                      min={key === "cohort" ? 1 : undefined}
                      max={key === "cohort" ? 10000 : undefined}
                    />
                  )}
                </Field>
              );
            })}
          </div>
        </div>
        <div className="form-actions">
          <Button
            type="button"
            className="button-secondary"
            disabled={section === 0}
            onClick={() => onSection(section - 1)}
          >
            Previous
          </Button>
          <span className="muted">Section {section + 1} of 6</span>
          <Button
            type="button"
            onClick={() =>
              section === 5 ? onQuestions() : onSection(section + 1)
            }
          >
            {section === 5
              ? "Review sample questions"
              : `Next: ${sections[section + 1].title}`}
          </Button>
        </div>
      </form>
    </div>
  );
}
export function ProfileSummary({ profile }: { profile: Profile }) {
  return (
    <dl className="detail-list intake-detail">
      {[
        ["Assessment", profile.name || "Untitled assessment"],
        ["Current situation", profile.why],
        ["Intended outcome", profile.outcome],
        ["Role groups", profile.roles],
        ["Focus", profile.themes],
      ].map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value || "Not entered yet"}</dd>
        </div>
      ))}
    </dl>
  );
}
export function ProfilePrerequisites({ profile }: { profile: Profile }) {
  return (
    <>
      {sections.map((s) => (
        <details key={s.title} className="intake-disclosure">
          <summary>{s.title}</summary>
          <dl className="detail-list intake-detail">
            {s.fields.map(([key, label]) => (
              <div key={key}>
                <dt>{label}</dt>
                <dd>{profile[key as ProfileField] || "Not entered"}</dd>
              </div>
            ))}
            {s.title === "Available material" && (
              <div>
                <dt>Material types</dt>
                <dd>{profile.material.join(", ") || "Not entered"}</dd>
              </div>
            )}
          </dl>
        </details>
      ))}
    </>
  );
}
