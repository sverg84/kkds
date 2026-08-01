import { RecipeAuthor } from '@sverg84/kkds-react';
import { DocBlock, Row, Stack } from '../../parts';

export function RecipeAuthorDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="Identity row composing Avatar, display name, and an optional subtitle. Used for recipe attribution on detail pages and as the identity header in user profiles. Avatar initials are generated automatically from the name prop when avatarUrl is absent."
        whenToUse={[
          'Recipe detail page attribution below the title',
          'User profile header as the primary identity display',
          'Recipe card author credit where layout permits',
        ]}
        whenNotToUse={[
          'Generic user lists where an avatar alone suffices',
          'Comment threads favouring compact avatar-only treatments',
          'System-generated or anonymous content with no author identity',
        ]}
        composition="Use size='default' (40px avatar) for standalone attribution blocks and size='compact' (32px) when embedded in tight layouts such as card footers. The subtitle prop typically carries a date, recipe count ('12 recipes'), or role label."
        accessibility="Avatar image alt text defaults to the user's name. The initials fallback is generated automatically — no additional aria labelling is required."
        example={`<RecipeAuthor
  name={author.name}
  avatarUrl={author.image}
  subtitle="12 recipes"
/>`}
      />

      <div className="rounded-xl border bg-card p-6 space-y-8">
        <Stack label="Default size — profile header">
          <RecipeAuthor
            name="Maria Santos"
            avatarUrl="https://i.pravatar.cc/80?img=5"
            subtitle="maria@example.com"
          />
        </Stack>

        <Stack label="Default size — no avatar (initials fallback)">
          <RecipeAuthor name="Thomas Keller" subtitle="Chef & Author" />
        </Stack>

        <Stack label="Default size — name only">
          <RecipeAuthor name="Yotam Ottolenghi" />
        </Stack>

        <Row label="Compact size — inline on recipe cards">
          <RecipeAuthor
            name="Jamie Oliver"
            avatarUrl="https://i.pravatar.cc/80?img=12"
            size="compact"
          />
          <RecipeAuthor
            name="Nigella Lawson"
            subtitle="@nigella"
            size="compact"
          />
        </Row>

        <Stack label="Long name truncation">
          <div className="w-48">
            <RecipeAuthor
              name="Heston Blumenthal de Rochemont"
              subtitle="The Fat Duck, Bray"
              size="compact"
            />
          </div>
        </Stack>
      </div>
    </div>
  );
}
