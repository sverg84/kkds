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

- Add an npm Automation token as the `NPM_TOKEN` GitHub Actions secret.
- Allow Actions read/write permission so the Version Packages PR can be created.
