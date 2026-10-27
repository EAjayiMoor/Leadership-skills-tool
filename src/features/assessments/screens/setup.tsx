import type { SyntheticScenario } from "../fixtures";
import { exampleProfile } from "@/features/intake/examples";
import { IntakeWorkspace } from "@/features/intake/workspace";
export function SetupScreen({ scenario }: { scenario: SyntheticScenario }) {
  return <IntakeWorkspace initialProfile={exampleProfile(scenario)} />;
}
