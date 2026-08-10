# Migrating web UI to KitchenKin Design System

Read `artifacts/kitchenkin-ds/docs/AGENTS.md` and
`artifacts/kitchenkin-ds/docs/consuming-web.md` first. Use this guide
when a web app, including a fresh scaffold, already has local theme or component
copies.

## Replace the local theme

Replace the app's Tailwind/theme setup with the package import from the web
consumption guide.

- Remove the app's own `@import "tailwindcss"`, plugin imports, and generated
  `:root` / `.dark` token definitions.
- Keep app-specific CSS that is not a theme or package-provided primitive.
- Keep Tailwind v3 directives and configure its package component source as
  described in the web consumption guide.

## Rewrite imports

Rewrite every local import for a module this package provides to the **package
root barrel**:

- `@/components/ui/<name>` → `@sverg84/kkds-react` (named export)
- `@/lib/utils` (`cn`) → `@sverg84/kkds-react` (`cn`)
- Local hooks that match a public export (e.g. `useIsMobile`) →
  `@sverg84/kkds-react`

There are **no** `./components/*`, `./lib/*`, or `./hooks/*` subpath exports.
Do not rewrite to `@workspace/kitchenkin-ds/...` (legacy name).

Judge component ownership by the imported module, not by the file doing the
import. App-specific components may remain local, but they must import shared
primitives from this package.

### Toast and other non-exports

`useToast` / `Toaster` / `SonnerToaster` are **not** exported from
`@sverg84/kkds-react`. Keep an app-local toast solution or adopt a toast library
directly — do not expect a KKDS toast hook after migration.

## Delete superseded files

- Delete package-provided files from the app's `src/components/ui/`; remove the
  directory if it becomes empty.
- Delete local `src/lib/utils.ts` when it only provided `cn`.
- Remove dependencies used only by the deleted local component library when the
  design-system package already supplies them transitively.

## Verify migration

Grep for `@/components/ui/`, `@/lib/utils`, `@workspace/kitchenkin-ds`, and
toast imports that assumed a KKDS export. Every remaining match must refer to an
app-specific module or an export the package does not provide. Run typecheck and
the dev server after deleting local copies.

Migration is complete when no package-provided component, `cn`, or theme token
block remains local.
