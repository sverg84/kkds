import { RecipeAuthor } from '../../../components/kkds/recipe-author';
import { Row, Stack } from '../../parts';

export function RecipeAuthorDemo() {
  return (
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
  );
}
