"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="error-layout" role="alert">
      <div>
        <p className="eyebrow">Assessment workspace</p>
        <h1>This view could not load</h1>
        <p className="body-copy">
          Try loading the view again, or return to the assessment overview.
        </p>
        <div className="tag-list">
          <button className="button" onClick={reset}>
            Try again
          </button>
          <Link className="button button-secondary" href="/">
            Back to assessments
          </Link>
        </div>
      </div>
    </div>
  );
}
