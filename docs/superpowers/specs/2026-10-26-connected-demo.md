# Connected synthetic assessment demo

Approved direction: the user requested a simple end-to-end demo and approved proceeding with profile → reviewed questions → loaded sample responses/interview notes → evidence review → cohort findings → recommendations → reviewed report preview. Upload formats and real AI drafting are deferred. This is a focused demonstration across Sprints 4–7, not completion of their production gates.

User problem: saved assessments currently stop at setup, so a consultant cannot demonstrate the full process. Outcome: a saved, reviewed configuration can load a fictional pack, inspect its question/source links, review illustrative cohort drafts and recommendations, then mark a report preview reviewed and reopen it after reload.

Data: wholly fictional material only. No files, API, model calls, scores, rankings, individual judgements or publication/export. The report omits raw participant passages. Demo review is local and not an authenticated approval or permission boundary.

Implementation choices: keep existing shell/theme/components and browser storage. Add an optional, validated demo run to existing version-1 drafts; old drafts remain readable. Packs: reference, pharma, energy/utilities, selectable with a sector-based default. Sample responses are explicitly prepared fictional illustrations, not genuine answers to consultant-edited questions. Every record captures the reviewed question wording/role, participant code, source ID and passage. No sample evidence is silently inherited from old fixture screens.

Freeze the configuration signature when loading a pack. Later profile/question changes preserve old evidence but block downstream demo review until the consultant explicitly replaces the pack. Replacing a pack resets downstream review. Findings cite supporting and differing evidence; they are labelled illustrative drafts requiring accept/edit/reject. Recommendations reference accepted findings and require their own review. Editing a finding resets its decision, dependent recommendation decisions and report review; editing a recommendation resets its review and report review. Rejected/draft content cannot enter the report. A reviewed demo preview requires accepted findings and recommendations and current, reviewed evidence. Review can be reopened.

The existing seven stages remain addressable. Interview preparation shows example follow-ups with source context; interview capture shows the loaded sample notes. These are demonstration views, not real interview capture. Stage labels derive from saved state rather than claiming unfinished analysis has run.

Demo edits save locally; failures remain visible, preserve in-memory edits and activate the existing unsaved-navigation protection. Explicit retry is available. No production persistence or live-data approval is inferred.

Acceptance: complete the journey for all three packs; preserve source/question links and review decisions through reload; independent assessments never share sources; duplicate load is explicit replacement; stale configuration blocks downstream review; rejected/unreviewed items are excluded; editing invalidates dependent review; bad stored demo data is rejected without overwriting; storage failure is visible; source links resolve to exact records; narrow and both-theme views remain usable. No heatmap is included.
