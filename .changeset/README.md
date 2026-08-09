# Changesets

Versioning and publishing for `@sverg84/kkds-*` packages (fixed group — shared
version line). Private `@workspace/*` packages are listed in `config.json`
`ignore` so they are never versioned or published.

## Contributor flow

1. After making a releasable change, run:

   ```sh
   pnpm changeset
   ```

2. Select the package(s), bump type (`patch` / `minor` / `major`), and a short summary.
3. Commit the new file under `.changeset/` with your PR.

Merging to `main` opens or updates a **Version Packages** PR. Merging that PR
publishes to npm via GitHub Actions. Feature merges alone never publish.

## One-time repo setup

- On npmjs.com, configure a **Trusted publisher** for each of `@sverg84/kkds-common`
  and `@sverg84/kkds-react`: GitHub → `sverg84` / `kkds` / workflow `release.yml`.
- Allow Actions read/write permission so the Version Packages PR can be created.
- Do not set `NPM_TOKEN` / `NODE_AUTH_TOKEN` on the Release workflow — publishing
  uses OIDC via `id-token: write`. Delete any leftover `NPM_TOKEN` secret if unused.
