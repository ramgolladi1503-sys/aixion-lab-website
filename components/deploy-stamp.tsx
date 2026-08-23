"use client";

import { useEffect, useState } from "react";

type Attestation = {
  git_sha: string | null;
  deploy_id: string | null;
  context: string | null;
};

export function DeployStamp() {
  const [attestation, setAttestation] = useState<Attestation | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") return;

    let active = true;

    fetch("/__aixion/build-attestation", { cache: "no-store" })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (active && data?.git_sha) setAttestation(data);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  if (!attestation?.git_sha) {
    return <span>AIXION LAB / BUILD PREVIEW</span>;
  }

  const sha = attestation.git_sha.slice(0, 8);
  const deploy = attestation.deploy_id ? attestation.deploy_id.slice(0, 8) : "unknown";
  const context = attestation.context ?? "deploy";

  return (
    <span title={`Git ${attestation.git_sha} · Netlify deploy ${attestation.deploy_id ?? "unknown"}`}>
      AIXION LAB / {context.toUpperCase()} · {sha} · DEPLOY {deploy}
    </span>
  );
}
