export type ScenarioId = "reference" | "pharma" | "energy-utilities";
export type SourceType = "Survey" | "Interview" | "Role context";
export interface EvidenceSource {
  id: string;
  title: string;
  type: SourceType;
  role: string;
  theme: string;
  excerpt: string;
  note: string;
}
export interface SyntheticScenario {
  id: ScenarioId;
  name: string;
  sector: string;
  shortName: string;
  purpose: string;
  context: string;
  roles: readonly string[];
  themes: readonly string[];
  question: string;
  sources: readonly EvidenceSource[];
}

function makeSources(
  prefix: string,
  roles: readonly string[],
  themes: readonly string[],
  excerpts: readonly string[],
): EvidenceSource[] {
  return [
    {
      id: `${prefix}-S01`,
      title: "Working across organisational boundaries",
      type: "Survey",
      role: roles[0],
      theme: themes[0],
      excerpt: excerpts[0],
      note: "Synthetic survey response · participant P01 · question Q03. Attribution is an example, not a live assessment record.",
    },
    {
      id: `${prefix}-S02`,
      title: "Role responsibilities and decision scope",
      type: "Role context",
      role: roles[1],
      theme: themes[1],
      excerpt: excerpts[1],
      note: "Synthetic role brief · role group R02. Context needs consultant review before use in a finding.",
    },
    {
      id: `${prefix}-S03`,
      title: "Making decisions together",
      type: "Interview",
      role: roles[2],
      theme: themes[0],
      excerpt: excerpts[2],
      note: "Synthetic interview note · participant P03 · question Q07. This passage illustrates source traceability.",
    },
    {
      id: `${prefix}-S04`,
      title: "Leading through change",
      type: "Survey",
      role: roles[3],
      theme: themes[2],
      excerpt: excerpts[3],
      note: "Synthetic survey response · participant P04 · question Q11. Review alongside contrary evidence.",
    },
    {
      id: `${prefix}-S05`,
      title: "Turning priorities into action",
      type: "Interview",
      role: roles[1],
      theme: themes[1],
      excerpt: excerpts[4],
      note: "Synthetic interview note · participant P05 · question Q09. Cohort interpretations require human review.",
    },
  ];
}

const referenceRoles = [
  "Executive leadership",
  "Functional leadership",
  "Regional leadership",
  "Programme leadership",
];
const pharmaRoles = [
  "Research and development",
  "Manufacturing and supply",
  "Commercial operations",
  "Regional leadership",
];
const energyRoles = [
  "Network operations",
  "Generation and engineering",
  "Customer operations",
  "Corporate functions",
];
const referenceThemes = [
  "Shared direction",
  "Decision clarity",
  "Leading change",
];
const pharmaThemes = [
  "Cross-functional collaboration",
  "Decision ownership",
  "Leading change",
];
const energyThemes = [
  "Operational collaboration",
  "Decision clarity",
  "Leading modernisation",
];

export const syntheticScenarios: readonly SyntheticScenario[] = [
  {
    id: "reference",
    name: "Reference scenario",
    sector: "Cross-sector",
    shortName: "Reference-shaped assessment",
    purpose:
      "Explore a consultant-led assessment from setup through a reviewed cohort report.",
    context:
      "A wholly fictional organisation bringing several leadership groups together around a shared programme of change. The scenario follows the shape of the supplied workflow; its records and people are invented.",
    roles: referenceRoles,
    themes: referenceThemes,
    question:
      "Describe a recent decision that needed input from another leadership group. How did you agree the next action?",
    sources: makeSources("RF", referenceRoles, referenceThemes, [
      "Our teams have a shared destination, but practical hand-offs between functions are still being agreed.",
      "This leadership group coordinates delivery across functions and escalates decisions when accountability is unclear.",
      "A regular conversation helped us surface different assumptions before we agreed the next step.",
      "People want to understand how the change affects immediate priorities as well as the wider programme.",
      "We could describe the priority clearly. Agreeing who would take the first action needed a further conversation.",
    ]),
  },
  {
    id: "pharma",
    name: "Large pharma scenario",
    sector: "Pharmaceuticals",
    shortName: "Connecting cross-functional leadership",
    purpose:
      "Understand leadership across research, development, manufacturing and commercial teams during an operating-model change.",
    context:
      "A fictional multinational pharmaceutical organisation is changing how its functions work together. The assessment explores leadership practices and decision ownership across organisational boundaries.",
    roles: pharmaRoles,
    themes: pharmaThemes,
    question:
      "Tell us about a cross-functional decision during the operating-model change. What helped people agree their responsibilities?",
    sources: makeSources("PH", pharmaRoles, pharmaThemes, [
      "The research and commercial teams are talking earlier. We still need a clearer way to carry shared decisions into the next planning cycle.",
      "The manufacturing and supply leadership group connects local delivery plans with cross-functional priorities. Its remit includes surfacing dependencies and clarifying decision ownership.",
      "When we brought the functions together, we found different assumptions about who could commit resources. Writing down the decision and owner helped us move forward.",
      "The direction is becoming clearer, but teams are asking how the new operating model changes day-to-day work.",
      "We have begun to review shared priorities together. Some decisions still return to separate functional meetings before an owner is agreed.",
    ]),
  },
  {
    id: "energy-utilities",
    name: "Energy and utilities scenario",
    sector: "Energy and utilities",
    shortName: "Leading operational modernisation",
    purpose:
      "Explore leadership across network operations, generation, customer and corporate functions during modernisation.",
    context:
      "A fictional energy and utilities organisation is modernising how it plans and delivers services. The assessment explores how leadership groups coordinate operational responsibilities and longer-term change.",
    roles: energyRoles,
    themes: energyThemes,
    question:
      "Describe a modernisation decision that involved operational and customer teams. How were trade-offs and responsibilities discussed?",
    sources: makeSources("EU", energyRoles, energyThemes, [
      "Network operations and customer teams now review dependencies together. Decisions about competing priorities sometimes move between several forums.",
      "Generation and engineering leaders coordinate specialist operational responsibilities while contributing to modernisation. Boundaries between programme decisions and local delivery decisions require further discussion.",
      "Bringing customer and network colleagues together changed how we described the problem. We still need to agree who follows through after the meeting.",
      "People see the purpose of modernisation and want a clearer connection between the programme and everyday service responsibilities.",
      "Joint planning surfaced operational dependencies earlier. The next step is to make ownership visible to all groups.",
    ]),
  },
];

export function getScenario(id: string): SyntheticScenario | undefined {
  return syntheticScenarios.find((scenario) => scenario.id === id);
}
