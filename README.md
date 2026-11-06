# Alignaa D2C website draft

This private design review draft provides two comparable homepage options with the same content and enquiry flow. Option A leads with a full-width video hero. Option B uses a structured clinical hero with the video beside the copy. Use the selector below the header to compare them; `/?design=a` and `/?design=b` also open each option directly.

## Run and build

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
npm run build
npm run preview
```

The build creates a static multi-page site in `dist/`. It includes the homepage, `/become-a-partner/`, `/privacy-policy/`, `/terms/`, a not-found page, `robots.txt`, and `sitemap.xml`.

## Update content and assets

- Patient copy, price, inclusions, steps, concerns, result examples, benefits, FAQ topics, and partner copy live in `src/data/content.ts`.
- The official Alignaa logo is not in the workspace. Replace the temporary text wordmark in `src/components/SiteHeader.tsx` with the supplied approved logo, preserving its aspect ratio and using the correct light or dark asset.
- The hero poster at `public/assets/alignaa-video-poster.svg` is a labelled draft visual. Add the approved video at `public/assets/alignaa-hero.mp4`, then set `VITE_ALIGNAA_HERO_VIDEO=/assets/alignaa-hero.mp4` in the local environment. The video plays muted, inline and in a loop when supported; reduced motion, autoplay failures and media errors leave the poster visible.
- Result photography, testimonials, contact details, social links, final inclusions, EMI availability, scan availability, comparison values, clinical FAQ answers, partner benefits, privacy wording and terms are still client inputs. The current draft labels these dependencies and uses no invented patient stories or result images.

## Enquiry delivery

Both forms use `VITE_ALIGNAA_FORM_ENDPOINT` from the local environment. Copy `.env.example` to `.env.local` and set the HTTPS endpoint after selecting the hosted delivery service. The endpoint URL is public client configuration; do not put an inbox address, SMTP password, API secret, or other private credential in a `VITE_` variable or frontend file.

The endpoint must validate fields again, enforce rate limits and spam protections, send both enquiry types to the same owner inbox, and only return a successful HTTP response after the email service accepts the message. The frontend sends the distinct subject, enquiry type, ISO submission time, browser timezone, source page, trimmed fields and consent text. It excludes the honeypot and does not store form data in local storage or analytics. Configure the validated customer email as Reply-To on the server when present.

Until the owner inbox and delivery service are configured, the forms show a failure state and preserve entered values. They do not claim to have sent an email. Do not configure a public launch until both forms have been checked against the actual inbox.

## Draft and release status

- Both homepage options, patient and partner fields, inline validation, keyboard focus, accessible status messages, result filters, FAQ disclosure controls, mobile navigation and the partner website link are implemented.
- The patient enquiry form, partner form, hover states, selected filter and design states, validation errors, loading state, success state and delivery failure state are represented in the shared interface.
- The source pages use `noindex`, and `public/robots.txt` blocks crawling while this is a draft. Remove draft restrictions only at the approved launch and update sitemap and metadata as needed.
- The official logo, approved hero footage and result images, consented reviews, policy content, support details and email delivery configuration are pending. Public launch and production acceptance remain blocked on those inputs.
- Draft comparisons, unverified inclusions, EMI wording, scan availability, age and guardian language, clinical descriptions, clinical FAQ answers and partner benefits require client review before publication.

## Acceptance checklist

- Brand and homepage video: pending approved logo and footage.
- Page sections, starting price and shared patient form: implemented as draft content; final claims and conditions pending approval.
- Partner page and parent website links: implemented; partner copy needs client approval.
- Shared inbox email delivery: pending owner inbox and endpoint configuration.
- Responsive and keyboard behavior: implemented in source; final device and accessibility review remains due.
- Scope boundary: no centre finder, location access, booking calendar, login, checkout, treatment portal, payment flow or photo upload is included.
- Release: pending final assets, policies, content approvals and inbox checks.
