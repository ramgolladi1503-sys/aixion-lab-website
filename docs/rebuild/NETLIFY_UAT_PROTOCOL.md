# Netlify UAT Provenance Protocol

This document prevents visual/UAT review of an unverified hosted build.

## Required authority chain

A hosted Aixion website review is valid only when all three authorities agree:

1. GitHub PR head SHA
2. Netlify build attestation
3. Browser/UAT report

## Build attestation endpoint

Netlify exposes:

`/__aixion/build-attestation`

The endpoint returns only public-safe deployment metadata:

- `git_sha`
- `deploy_id`
- `branch`
- `context`
- `deploy_url`
- `site_url`
- response generation timestamp

It must never return secrets or arbitrary environment variables.

## UAT gate

Before reviewing the hosted preview:

1. Read the current PR head SHA from GitHub.
2. Read `/__aixion/build-attestation` from the exact Netlify preview URL.
3. Require `git_sha` to exactly equal the PR head SHA.
4. Record the returned `deploy_id` and `deploy_url` in the UAT report.
5. Only then run browser/UI/UX/UAT checks.

If the SHAs differ, verdict is:

`NETLIFY_PREVIEW_PROVENANCE=FAIL`

Do not report visual defects against that preview as defects of the current PR.

If they match:

`NETLIFY_PREVIEW_PROVENANCE=PASS`

The deployment ID, Git SHA and UAT report then form one review authority.

## Release rule

A production promotion must not be approved from screenshots or a generic `current` Netlify project state alone. The exact deployed commit must be proven first.
