# Sprint 1 UI design

Status: approved by the user as product decision co-owner on 25 October 2026. UI prototype implementation is available locally; [evidence](../../evidence/sprint-1-ui.md) records checks and remaining acceptance. Approval covers this design; acceptance of the implemented screens follows the checks below.

## User problem and outcome

An assessment consultant needs to move between setup, evidence, interviews, cohort findings, recommendations and report approval without losing the current engagement or confusing draft work with approved output. Sprint 1 establishes the visual system and realistic screens that make this workflow clear and professional.

The intended consultant reviewed the flow and three synthetic scenario outlines on 25 October 2026 and confirmed they align. That validates the outline, not screen usability or the assessment method.

## Goals

- Apply the Moorhouse UI Standard to a coherent Next.js and React application shell.
- Make the assessment stages and their workflow progress visible while leaving room for dense evidence work.
- Provide a design gallery and realistic prototypes for the consultant home, scenario setup, evidence review and report approval.
- Support light and dark modes, responsive layouts and keyboard and screen-reader use.
- Keep all example content synthetic and label unfinished screens as prototypes.

## Non-goals

- Implement evidence import, assessment synthesis, report generation, authentication or production persistence in Sprint 1.
- Define an assessment method, heatmap, access matrix, production hosting or live-client-data policy in this UI design.
- Add individual scores, rankings or employment recommendations.

## Approaches considered

| Approach | Trade-off |
| --- | --- |
| Persistent side panel listing assessment stages | Keeps progress and destinations visible, supports revisiting work and leaves horizontal space for dense screens. |
| Horizontal tabs for all assessment sections | Keeps one engagement in view, but gives seven stages less room for status and long labels. |
| Step-by-step wizard | Makes a fixed sequence explicit, but makes returning to evidence and revising earlier work less direct. |

**Selected direction:** use the persistent side panel as the primary navigation. The intended consultant and technical owner endorsed this direction on 25 October 2026. Amy Wilkinson and the user share product decision ownership from 25 October 2026; either may review and approve the design. Tabs may be used inside a stage when a page has distinct subviews.

## Proposed application shell

```text
Engagement name · Synthetic · Draft
┌─────────────────────────────┬──────────────────────────────────┐
│ Assessment stages           │ Current stage title              │
│                             │                                  │
│ Overview                    │ Main task, evidence or review    │
│ 1. Set up                   │                                  │
│ 2. Evidence                 │ Stage-specific actions           │
│ 3. Interview preparation    │                                  │
│ 4. Interview capture        │                                  │
│ 5. Cohort findings          │                                  │
│ 6. Recommendations          │                                  │
│ 7. Report approval          │                                  │
└─────────────────────────────┴──────────────────────────────────┘
```

Each stage is a direct route in the Next.js App Router. A shared layout keeps engagement context and navigation consistent. The active stage is visibly and programmatically identified. Progress markers use text and icons as well as colour, and communicate workflow state rather than assessment results. For the design gallery, use illustrative labels such as “Not started,” “In progress,” “Review needed” and “Complete.” These are display examples; status definitions, permissions and transition rules remain open for product-owner review before workflow behavior is implemented.

On narrow screens, the stage panel becomes a compact menu that still identifies the current stage. The content area follows the UI Standard's responsive spacing and reflow rules.

## Prototype screens

1. **Consultant home:** synthetic engagements and a clear route to continue or open one. Until the product name and approved logo asset are available, use “Assessment workspace” as a neutral text-only prototype title.
2. **Scenario setup:** client context, assessment purpose, participant groups, themes, questions and missing-input guidance.
3. **Evidence review:** a dense synthetic source list with visible provenance and review state; no working import behavior in Sprint 1.
4. **Report approval:** a clearly labelled draft, review actions and an approval/export state; export remains blocked until approval in the workflow prototype.

The side panel shows the full journey on each screen, including stages represented by prototypes or placeholders. The scenarios are the reference-shaped synthetic case, large pharma and energy and utilities. The supplied reports and workbook inform process shape only and are not prototype fixtures.

## Visual and interaction rules

- Use the supplied Moorhouse tokens, Poppins type scale, spacing, component specs and motion rules. Keep working views precise and information-dense, with more open space on decision and approval views.
- Implement light and dark themes. Follow the standard's system preference by default and provide a manual theme choice.
- Keep focus visible, provide labelled controls, support keyboard navigation and reduced motion, and preserve colour-independent status cues.
- Check text and component contrast in both themes, reflow at narrow widths and 200% zoom, and review with keyboard and screen-reader use.
- Use British English and sentence case. Keep the standard's tone-of-voice placeholder visible as an open item for review.
- Do not invent a logo. The standard references a logo asset that is absent from this repository; use the neutral text-only title above until an approved brand treatment is available.

## Data and privacy boundary

Prototype content is synthetic. The prototype runs on a local Next.js development server and may save only synthetic demo state in browser storage when persistence is added. The specific browser storage mechanism is still open. No live client evidence or identifying assessment material belongs in the prototype or its logs.

## Acceptance checks

- The gallery and four prototype screens render in light and dark modes at desktop and narrow widths.
- The stage panel gives a clear route to every assessment stage and identifies the current stage.
- A consultant can distinguish draft, review and approved states without relying on colour alone.
- Controls have visible labels and keyboard focus; key tasks work using keyboard navigation; layouts remain usable at 200% zoom.
- Empty, loading, error and approval states are visible where relevant, and unfinished functions are labelled as prototypes.
- An intended consultant reviews the prototypes and their corrections are recorded before the visual direction is accepted.
- Amy Wilkinson or the user, as product decision co-owners, reviews the visual direction and approves or requests changes before implementation.

## Traceability and open decisions

- Requirements: UI-01–03; groundwork for FR-01–06, FR-10–12, FR-20–22 and SEC-08.
- Decisions: D-03 (Next.js, React and App Router), D-09 (owners), D-12 (light and dark modes), D-14 (local synthetic prototype boundary), D-16 (stage navigation).
- Open: exact stage status vocabulary and semantics for functional workflow behavior; approved logo and product name; full tone-of-voice guidance; persistence of a manually selected theme; design owner if separate from the product decision owners.
- Later decisions: assessment method, permissions, production storage and hosting, input/output formats and any AI processing remain outside Sprint 1.
