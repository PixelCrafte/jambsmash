# Prismic CMS Setup (Gallery & Projects)

This guide walks through wiring the `/gallery` and `/projects` pages up to Prismic
so clients can post gallery images and projects without a developer touching code.

**Nothing here has been run yet** — `lib/galleryData.ts` and `lib/projectsData.ts`
still power the pages with static placeholder content. Follow the steps below
yourself (or hand this file to whoever sets up the CMS) and the pages will switch
over to live Prismic content.

Everything is designed to keep both pages as **Server Components** (no
`'use client'`). Content is fetched on the server and statically generated with
ISR, so the rendered HTML always contains the real content for search engines —
exactly like the pages work today.

---

## 1. Install dependencies

This project uses **pnpm** — don't use npm/yarn.

```bash
pnpm add @prismicio/client @prismicio/next @prismicio/react
pnpm add -D slice-machine-ui @slicemachine/adapter-next
```

- `@prismicio/client` — fetches documents from your Prismic repository.
- `@prismicio/next` — small Next.js helpers (previews, route helpers).
- `@prismicio/react` — `<PrismicRichText>` / `<PrismicImage>` components. These
  render on the server by default, so they won't turn the page into a Client
  Component.
- `slice-machine-ui` (dev only) — the local UI used to model custom types and
  push them to your Prismic repo.
- `@slicemachine/adapter-next` (dev only) — tells Slice Machine this is a
  Next.js project. Required for it to start at all.

---

## 2. Create the Prismic repository

1. Go to https://prismic.io and sign up / log in.
2. Click **Create a repository**.
3. Pick a repository name, e.g. `jambsmash` — this becomes
   `jambsmash.prismic.io` and is your `repositoryName`.
4. Choose the **Next.js** framework option if offered (it just pre-fills some
   defaults — it's fine to pick "Other"/blank too).
5. Once created, note the repository name — you'll need it in step 4.

---

## 3. Define the custom types

Create `slicemachine.config.json` at the project root (this project has none
of its own dynamic page-builder Slices, so `libraries` can point at an empty
folder — Slice Machine just needs the key present to start):

```json
{
  "repositoryName": "jambsmash",
  "adapter": "@slicemachine/adapter-next",
  "libraries": [
    "./slices"
  ]
}
```

Then launch Slice Machine using the binary from the `slice-machine-ui`
dependency you just installed — **not** `pnpm dlx slicemachine`, which
resolves to an unrelated package (`prismic-cli`) and just prints a generic
help screen:

```bash
pnpm exec start-slicemachine
```

This opens a local UI (usually `http://localhost:9999`). The first run will ask
you to log in and link the repository you just created.

Create **two repeatable custom types**:

### `gallery_image`

| Field (API ID) | Type       | Notes                                  |
|-----------------|------------|-----------------------------------------|
| `image`         | Image      | Required                                |
| `caption`       | Key Text   | Short caption shown under the image     |

### `project`

| Field (API ID) | Type       | Notes                                                      |
|-----------------|------------|-------------------------------------------------------------|
| `title`         | Key Text   | Project name                                                |
| `date`          | Date       | Used for sorting, newest first                               |
| `image`         | Image      | Required                                                     |
| `description`   | Rich Text  | In field options, restrict the toolbar to **Paragraph only** so clients can't add headings/lists — keeps it as "just a normal paragraph" |

After modeling both, click **Push changes** in Slice Machine (top right) to
publish the custom types to your Prismic repository.

---

## 4. Environment variables

Add to `.env.local` (create it if it doesn't exist — never commit it):

```env
NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME=jambsmash
```

If you later make the repository private and need previews/webhooks with
restricted content, also add a Prismic **API access token** from
**Settings → API & Security** in the Prismic dashboard:

```env
PRISMIC_ACCESS_TOKEN=your-token-here
```

---

## 5. Add the Prismic client

Create `prismicio.ts` at the project root:

```ts
// prismicio.ts
import { createClient as baseCreateClient } from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME as string;

export function createClient(config: Parameters<typeof baseCreateClient>[1] = {}) {
  const client = baseCreateClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
}
```

---

## 6. Allow Prismic-hosted images

Prismic images are served from `images.prismic.io`. Add it to
`next.config.ts` alongside the existing remote patterns:

```ts
remotePatterns: [
  { protocol: 'https', hostname: 'placehold.co' },
  { protocol: 'https', hostname: 'unsplash.com' },
  { protocol: 'https', hostname: 'images.unsplash.com' },
  { protocol: 'https', hostname: 'images.prismic.io' },
],
```

---

## 7. Update the pages to fetch from Prismic

Both pages stay `async function` Server Components — no `'use client'` needed.

**`app/gallery/page.tsx`** — replace the `galleryItems` import/usage with:

```ts
import { createClient } from '@/prismicio';

export const revalidate = 3600; // re-check Prismic once an hour

export default async function GalleryPage() {
  const client = createClient();
  const galleryItems = await client.getAllByType('gallery_image');

  // then map: item.data.image.url, item.data.image.alt, item.data.caption
}
```

**`app/projects/page.tsx`** — replace the `projects` import/usage with:

```ts
import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';

export const revalidate = 3600;

export default async function ProjectsPage() {
  const client = createClient();
  const projects = await client.getAllByType('project', {
    orderings: { field: 'my.project.date', direction: 'desc' },
  });

  // then map: doc.data.title, doc.data.date, doc.data.image.url,
  // and render the description with <PrismicRichText field={doc.data.description} />
}
```

`export const revalidate = 3600` is what gives you ISR: pages are built
statically and Next.js silently re-fetches from Prismic in the background at
most once per hour, so edits in Prismic show up without a redeploy, with zero
extra infrastructure.

### Optional: instant updates via webhook

If an hour is too slow, add a route handler that Prismic calls the moment
someone publishes:

```ts
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }
  revalidatePath('/gallery');
  revalidatePath('/projects');
  return NextResponse.json({ revalidated: true });
}
```

Then in Prismic: **Settings → Webhooks → Create a webhook**, URL
`https://yourdomain.com/api/revalidate?secret=YOUR_SECRET`, trigger on
"A document is published/updated/deleted". Add `PRISMIC_WEBHOOK_SECRET` to
your env vars, matching whatever you put in the URL.

---

## 8. Add content in Prismic

Go to `https://<your-repo-name>.prismic.io/documents`, click **Create new**,
and add documents of each type.

To seed it with real content, use the same items already sitting in
`lib/galleryData.ts` and `lib/projectsData.ts` in this repo — they were
written to map 1:1 onto the custom types above, so you can copy them straight
in:

- **Gallery**: the 6 entries in `lib/galleryData.ts` (image + caption each).
- **Projects**: the 5 entries in `lib/projectsData.ts` (title, date, image,
  description). Paste the `description` text into the Rich Text field as a
  single paragraph.

You'll want to swap the placeholder Unsplash images for real photos of actual
Jambsmash work once you have them — the CMS entry just needs *an* image to
start.

Remember to click **Publish** on each document — unpublished (draft)
documents won't be returned by `getAllByType`.

---

## 9. Test it

```bash
pnpm dev
```

Visit `/gallery` and `/projects` — they should now show whatever's published
in Prismic. If a page renders empty, check:
- The custom type API IDs match exactly (`gallery_image`, `project`).
- Documents are **published**, not just saved as drafts.
- `NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME` matches your repo name exactly.

Once you're confident it's fetching correctly, `lib/galleryData.ts` and
`lib/projectsData.ts` can be deleted.
