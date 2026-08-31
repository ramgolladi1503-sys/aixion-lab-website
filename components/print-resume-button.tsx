"use client";

export function PrintResumeButton() {
  return (
    <button className="button-secondary print-resume-button" type="button" onClick={() => window.print()}>
      Print / Save PDF
    </button>
  );
}
