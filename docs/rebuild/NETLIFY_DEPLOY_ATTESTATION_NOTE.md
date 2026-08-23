# Netlify Deploy Attestation Note

Current implementation branch: `website/blueprint-v1-pass1`

The site now contains a Netlify-only public-safe attestation endpoint at:

`/__aixion/build-attestation`

The endpoint returns:

- Git commit SHA from Netlify `COMMIT_REF`
- Netlify deploy ID
- branch
- deploy context
- deploy URL
- site URL

No secrets or arbitrary environment variables are returned.

## Current connector limitation

The connected Netlify project reader exposes the preview project and its branch-version URL, but does not expose the deploy's commit SHA or a full current-deploy object. The deploy action available through the connector requires a source-directory CLI handoff rather than accepting a GitHub ref directly.

Therefore the attestation endpoint is now the canonical hosted-build proof. Hosted UAT is considered authoritative only after the endpoint's `git_sha` exactly equals the GitHub PR head SHA.
