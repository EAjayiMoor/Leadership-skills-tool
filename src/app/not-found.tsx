import { Compass } from "lucide-react";
import { ActionLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <main className="error-layout">
      <div>
        <div className="placeholder-icon">
          <Compass size={28} aria-hidden="true" />
        </div>
        <p className="eyebrow">Assessment workspace</p>
        <h1>Page not found</h1>
        <p className="body-copy">
          This assessment or stage is not available. Return to the workspace to
          choose a synthetic scenario.
        </p>
        <ActionLink href="/">Back to assessments</ActionLink>
      </div>
    </main>
  );
}
