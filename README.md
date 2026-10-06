# Aysha Iram — Portfolio

Personal portfolio of **Aysha Iram**, AI Engineer · Software Developer · AI/ML Builder.
Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · GSAP · Framer Motion · Lucide.

## Design concept

A cinematic black → red → black editorial scroll, built from the reference portfolio's visual language:

- **Hero:** tracked red `PORTFOLIO` over a full-bleed red gradient band, the portrait standing in front of both, `AI ENGINEER` in huge white condensed type below.
- **Two-tone light headings:** `ABOUT ME`, `GET IN TOUCH`, with a small red italic kicker (`technical`, `academic`, `these are`).
- **Photography:** grayscale photos, red brush circles, and certificate tiles carried on a red band.
- **Experience and projects:** offset frames with white L-lines for the work flow, and large case studies with problem / solution / technology columns.

The colour tokens live in `app/globals.css`:

| Token | Hex |
|---|---|
| Black | `#000000` |
| Primary red | `#E00000` |
| Deep red | `#7A090C` |
| Dark red | `#4A080A` |
| White | `#FFFFFF` |
| Grey | `#B8B8B8` |
| Surface | `#161616` |

Fonts: Oswald (PORTFOLIO), Bebas Neue (display), Tenor Sans (section titles), Poppins (body). All four are self-hosted through `@fontsource`, so no Google Fonts request is made at build time.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: enables the live chatbot
npm run dev                  # http://localhost:3000
```

Checks:

```bash
npm run lint
npx tsc --noEmit
npm run build && npm start
```

## Editing content

All text lives in `data/`. Components never hard-code content, and the chatbot reads the same files.

| File | Contents |
|---|---|
| `data/profile.ts` | Name, roles, about text, email (set `""` to hide it), LinkedIn, GitHub, site URL |
| `data/projects.ts` | The 4 featured case studies and the "Also built" list |
| `data/skills.ts` | Skill groups |
| `data/experience.ts` | Work experience and education (delete a `score` to hide a grade) |
| `data/achievements.ts` | Achievements and certifications. Only add verified items. |

## Assets

All of Aysha's photos, certificates and project screenshots are already in place. Missing files never break the site: portraits and project images fall back to designed placeholders, and achievement or certificate photos are simply skipped. After adding or replacing files, restart `npm run dev` or rebuild, because file detection runs on the server (`lib/assets.ts`).

| What | Path |
|---|---|
| Hero portrait (transparent cutout) | `public/images/aysha-hero.png` |
| About, skills circle, contact, education photos | `public/images/aysha-about.jpg`, `public/images/aysha-skills.jpg`, `public/images/aysha-contact.jpg`, `public/images/education.jpg` |
| Achievement photos | `public/achievements/*.jpg`, referenced from `data/achievements.ts` |
| Certificate images | `public/certificates/*.jpg`, referenced from `data/achievements.ts` |
| Project screenshots and galleries | `public/projects/*.jpg`, referenced from `data/projects.ts` |
| Project videos *(optional)* | `public/videos/icu-sentinel.mp4`, `public/videos/aml.mp4` |
| Voice intro (Aysha's own recording, cleaned and loudness-normalised) | `public/audio/aysha-intro.mp3` |
| Resume | `public/resume/Aysha-Iram-Resume.pdf` (it shows a phone number) |

**Images still to add:** Educational Atlas has no screenshot yet and shows a black/red diagram. Add `public/projects/educational-atlas.jpg` (16:9, about 2000px wide) when available.

**Adding an achievement:** add an entry to `achievements` in `data/achievements.ts` (newest first) and drop its photos into `public/achievements/`. The first photo becomes the lead image. Use `position` (for example `"50% 20%"`) to control how a photo is cropped. The chatbot picks the entry up automatically.

**Voice tips:** record 20–40 s in a quiet room on your phone and export as MP3 at 128 kbps.

## Chatbot ("Ask Aysha's AI")

The chatbot runs through `app/api/chat/route.ts`, which executes on the server. API keys are read only there and never reach the browser.

- **Grounded answers:** it answers only from `data/` (see `lib/knowledge.ts`). Its rules forbid inventing grades, salary, employers, achievements, statistics or personal details.
- **Realtime:** replies stream into the chat word by word as they're generated.

**Free setup with Groq (no credit card):**

1. Sign up at **console.groq.com** and create a key under **API Keys**. It starts with `gsk_`.
2. Put it in `.env.local`:
   ```
   AI_API_KEY=gsk_your_key
   ```
3. On Vercel, add `AI_API_KEY` under **Settings → Environment Variables**, then redeploy.

**Optional settings:**

| Variable | Default | Purpose |
|---|---|---|
| `AI_BASE_URL` | `https://api.groq.com/openai/v1` | Any OpenAI-compatible API |
| `AI_MODEL` | `openai/gpt-oss-20b` | Try `openai/gpt-oss-120b` for higher quality |

Groq retires models from time to time. If the chat stops answering, check console.groq.com/docs/models and update `AI_MODEL`.

**Other providers:**

- **OpenAI (paid):** set `OPENAI_API_KEY`. It's used only when `AI_API_KEY` is empty.
- **Ollama (free, local only):** set `OLLAMA_BASE_URL=http://localhost:11434`. Vercel can't reach your computer, so this won't work on the live site.
- **None:** with no provider set, the chat says the live assistant is off, and the six suggested questions still get verified answers (`lib/fallback-answers.ts`).

**Built-in limits:** messages are capped at 600 characters, only the last 10 turns are sent, and each IP can make 12 requests per minute. This keeps usage well inside Groq's free tier.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com, choose **Add New → Project** and import the repository. The framework is detected automatically.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL`: your final URL
   - `OPENAI_API_KEY`: optional, enables the live chatbot
4. Deploy. Every push to `main` redeploys.

After adding a custom domain, update `NEXT_PUBLIC_SITE_URL` and redeploy so the sitemap and OpenGraph URLs are correct.

## Structure

```
app/            layout, page, api/chat, robots, sitemap, icon, opengraph-image
components/     Loader, Navigation, Cursor, ScrollFX, ChatWidget, VoiceIntro, ProjectMedia, ContactComposer
components/sections/  Hero, About, Skills, Education, Achievements, Experience, Projects, Resume, Contact, Footer
components/ui/  SplitText, SectionTitle, Placeholder, Flow, ProjectVisual, BrandIcons
data/           all content
lib/            assets detection, chatbot knowledge, GSAP setup
hooks/          reduced-motion and pointer detection
types/          shared types
public/         images/ projects/ videos/ audio/ resume/
```

## Motion and accessibility

- **One system for motion:** all scroll effects are opt-in through data attributes, handled by `components/ScrollFX.tsx`.
- **Reduced motion:** when `prefers-reduced-motion` is on, every effect is skipped and the loader shortens.
- **Desktop only:** the custom cursor runs only on mouse or trackpad devices.
- **Accessibility:** includes a skip link, semantic landmarks, visible focus states, labelled controls, keyboard-closable menu and chat (Esc), and alt text on every image.
