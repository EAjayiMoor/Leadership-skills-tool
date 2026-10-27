export const demoPacks = {
  reference: {
    label: "Reference case",
    context: "the shared change programme",
    action: "Agree ownership for cross-functional programme decisions",
  },
  pharma: {
    label: "Large pharma",
    context: "research, manufacturing and commercial handoffs",
    action: "Agree ownership for research-to-manufacturing handoffs",
  },
  "energy-utilities": {
    label: "Energy and utilities",
    context: "operational and modernisation priorities",
    action: "Agree ownership at operational and programme interfaces",
  },
} as const;
export type DemoPack = keyof typeof demoPacks;
export function suggestedPack(sector: string): DemoPack {
  return /pharma/i.test(sector)
    ? "pharma"
    : /energy|utilit/i.test(sector)
      ? "energy-utilities"
      : "reference";
}
export function samplePassages(
  pack: DemoPack,
  topic: string,
): [string, string, string] {
  const { context } = demoPacks[pack];
  return [
    `We discuss ${topic.toLowerCase()} at shared planning meetings about ${context}. We can usually explain the priorities we are working towards.`,
    `In some decisions involving ${context}, I still have to ask who owns the next step. The shared meetings do not resolve every exception.`,
    `A recent discussion about ${context} helped us agree a next step. I would find it useful to record who follows through, especially when priorities change.`,
  ];
}
