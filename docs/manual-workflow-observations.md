# Observed manual assessment workflow

Status: working interpretation from a thematic workbook and 12 completed individual reports supplied by the product owner on 24 October 2026. The source files contain identifiable and individual-level assessment information and remain outside this public repository. This note records structure and method facts only; it does not reproduce any person's findings, source answers or client-specific gap wording.

## What the completed records show

1. Each record starts with role context, then presents survey questions and answers organised under six recurring themes.
2. The records include interview focus areas or guardrails and tailored interview questions. Some also include response notes and a qualitative response summary. The reports vary in structure, so import must recognise missing or differently labelled sections.
3. The thematic workbook consolidates confirmed gaps. Each `X` means the gap was confirmed for that individual; the product owner confirmed this meaning on 24 October 2026. Row totals are intended to count the `X` marks. The workbook also contains proposed actions and working totals by individual. The role authorised to confirm a gap still needs to be defined.
4. The workbook is a working consolidation artefact, not a specification for automatic individual scoring or a complete heatmap method. It does not explicitly link each `X` to source passages or define the judgement criteria used to confirm a gap.

## Design implications to validate

- Preserve a restricted individual evidence record before aggregating it into cohort-level themes. Keep the source answer, interview note, consultant decision and review status distinguishable.
- Represent a confirmed gap as a human-reviewed assertion linked to one or more evidence items, a theme, the affected assessment record, the confirmer and a timestamp. The system may calculate counts of confirmed marks, but those counts must not be presented as a validated individual score or ranking.
- Derive totals from current confirmed marks rather than store manually edited copies. The supplied workbook has three row totals that do not match its visible `X` marks; import validation should expose such discrepancies without silently rewriting the source.
- Keep client-facing thematic outputs separate from the restricted individual matrix. Decide the minimum group size, uncertainty treatment and review process before displaying cohort counts or a heatmap.
- Support report-format variation and clear import errors. Several supplied DOCX files have package metadata inconsistencies that some parsers reject even though a document renderer opens them.

## Still to resolve

- What evidence and judgement standard does a consultant use to confirm an individual gap? Who can revise or withdraw a confirmation?
- Does the first product proof replay these completed records, or support a new assessment from setup onward? This remains D-02.
- Which individual-level totals, if any, may appear in a restricted consultant view? Which cohort counts may appear in an approved client output?
- How should gap frequency, severity, confidence and proposed actions be distinguished in the heatmap and report? A count alone is not a severity or quality measure.
- Which input document sections and output formats are required for the first slice? This remains D-05.
