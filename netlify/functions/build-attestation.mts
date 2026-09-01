declare const Netlify: {
  env: {
    get(name: string): string | undefined;
  };
};

function value(name: string) {
  return Netlify.env.get(name) ?? null;
}

export default async () => {
  const payload = {
    service: "aixion-lab-website",
    provider: "netlify",
    git_sha: value("COMMIT_REF"),
    deploy_id: value("DEPLOY_ID"),
    branch: value("BRANCH"),
    context: value("CONTEXT"),
    deploy_url: value("DEPLOY_URL"),
    site_url: value("URL"),
    generated_at: new Date().toISOString(),
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
};

export const config = {
  path: "/__aixion/build-attestation",
};
