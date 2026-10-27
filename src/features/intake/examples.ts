import type { SyntheticScenario } from "../assessments/fixtures";
import { emptyProfile, type Profile } from "./model";
export function exampleProfile(scenario: SyntheticScenario): Profile {
  return {
    ...emptyProfile(),
    name: scenario.name,
    why: scenario.context,
    outcome: scenario.purpose,
    sector: scenario.sector,
    scale: "Several functions and leadership groups — fictional example",
    locations: "Illustrative regional scope",
    structure: scenario.context,
    roles: scenario.roles.join("\n"),
    cohort:
      scenario.id === "reference"
        ? "12"
        : scenario.id === "pharma"
          ? "18"
          : "16",
    responsibilities:
      "Shared priorities, cross-functional decisions and delivery within the recorded role groups.",
    themes: scenario.themes.join("\n"),
    clientQuestions: scenario.purpose,
    material: ["Role descriptions", "Organisation background"],
    materialNotes:
      "Synthetic role and organisation context. No source documents are uploaded or inherited.",
    timeline:
      scenario.id === "reference"
        ? "Six to seven weeks — reference-shaped example"
        : "To agree with the client",
    audience: "Assessment consultant and client sponsor",
    reviewer: "Lead assessment consultant",
  };
}
