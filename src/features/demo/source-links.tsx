import Link from "next/link";
export const sourceLabel = (id: string) => id.split("-").slice(-2).join("-");
export function SourceLinks({
  draftId,
  ids,
}: {
  draftId: string;
  ids: string[];
}) {
  return (
    <div className="demo-source-links">
      {ids.map((id) => (
        <Link
          className="text-link"
          key={id}
          href={`/drafts/${draftId}/evidence?source=${encodeURIComponent(id)}`}
          aria-label={`Inspect source ${id}`}
        >
          {sourceLabel(id)}
        </Link>
      ))}
    </div>
  );
}
