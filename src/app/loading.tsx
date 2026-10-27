export default function Loading() {
  return (
    <main className="error-layout" role="status">
      <div>
        <h1>Loading workspace</h1>
        <p className="body-copy">Preparing this view.</p>
        <div className="small-stack" aria-hidden="true">
          <div className="skeleton" />
          <div className="skeleton short" />
        </div>
      </div>
    </main>
  );
}
