# Prismic CMS Setup (Gallery & Projects)

**Status: connected and live.** `/gallery` and `/projects` fetch real content
from Prismic on the server (no `'use client'` on either page — content is in
the initial HTML for SEO, exactly like the rest of the site).

- **Repository**: `kc4fnj9e` (public repo, no access token needed to read it)
  → dashboard at `https://kc4fnj9e.prismic.io`
- **Custom types live**: `gallery_image`, `project` (plus an unused `homepage`
  type with `Hero`/`ResourceLinks`/`CardGrid` slices — leftover from the
  starter template used to create the repo; harmless, safe to ignore or
  delete later, not used by any page)
- `prismic.config.json` and `prismicio.ts` hold the connection config —
  already in place, nothing to configure there
- `slicemachine.config.json` is set up so `pnpm exec start-slicemachine` opens
  the local model editor at `http://localhost:9999` whenever you need to
  change a custom type's fields (requires logging in there first — that's a
  one-time browser step, separate from reading published content)

## Field reference

### `gallery_image`
| API ID                    | Type     |
|----------------------------|----------|
| `gallery_image`             | Image    |
| `fig_caption_for_image`      | Text (plain string, used as the caption) |

### `project`
| API ID        | Type   |
|----------------|--------|
| `title`         | Text   |
| `date`          | Date   |
| `image`         | Image  |
| `description`   | Text (plain string — renders as a single paragraph, no rich formatting) |

(Field names came out a bit inconsistent — e.g. `gallery_image.gallery_image`
duplicates the type name, and `fig_caption_for_image` is verbose — but
renaming now would need re-linking already-published documents in Slice
Machine, so it's left as-is. Cosmetic only; not worth the risk to fix mid-rush.)

## What's next (whenever you have time — nothing here blocks the site)

1. **Replace the test content.** Right now both pages are showing real but
   placeholder documents your own testing created ("Project 1"/"Project 2",
   "jambsmash test image 1", etc.) — go to
   `https://kc4fnj9e.prismic.io/documents`, edit or add documents, and
   **Publish**. Unpublished drafts won't show on the site.
2. `lib/galleryData.ts` / `lib/projectsData.ts` are kept only as a fallback —
   each page shows Prismic content when any exists, and only falls back to
   these local files if a type has zero published documents. Once you've got
   real content in Prismic for both types, these files can be deleted.
3. **Optional — faster cache invalidation.** The Prismic client is set up so
   production requests are cached indefinitely until tagged content changes
   ("prismic" tag), and `app/api/revalidate/route.ts` already exists to
   revalidate that tag on a POST request. To make edits show up instantly
   instead of on the next deploy, add a webhook in Prismic
   (**Settings → Webhooks**) pointing at
   `https://yourdomain.com/api/revalidate`, triggered on document
   publish/update/delete.
4. **Optional — clean up the starter leftovers.** `customtypes/homepage`,
   `slices/Hero`, `slices/ResourceLinks`, `slices/CardGrid`, and
   `app/slice-simulator/page.tsx` came from the template used to bootstrap
   the repo and aren't wired into any page. Safe to delete whenever, or keep
   if you want a slice-based page builder for something later.
