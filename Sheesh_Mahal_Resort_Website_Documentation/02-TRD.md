# Technical Requirements Document (TRD)

## Recommended stack
- Next.js + TypeScript.
- Tailwind CSS or a consistent component system.
- Managed hosting/CDN.
- Server-side form route/action with schema validation.
- Trusted transactional email provider.
- Optional managed database only if enquiry storage or CMS is genuinely needed.
- Optional bot protection such as Turnstile.
- Search Console and privacy-conscious analytics.

Avoid a database/admin panel if email-only enquiries meet the need.

## Architecture
Serve public pages statically or server-rendered where practical. Keep the enquiry endpoint and email integration server-side. Validate environment variables on startup. Do not expose secrets via `NEXT_PUBLIC_*`.

## Enquiry flow
1. User submits a short form.
2. Browser validation improves usability.
3. Server validates lengths, formats, required fields and allowed event types.
4. Apply rate limit and bot check.
5. Normalise data and send to approved recipient.
6. Log a request ID and operational status only.
7. Return generic success/failure messaging.
8. Provide phone/WhatsApp fallback if email delivery fails.

## Environment variables
Examples: `ENQUIRY_EMAIL_TO`, `ENQUIRY_EMAIL_FROM`, `EMAIL_PROVIDER_API_KEY`, `TURNSTILE_SECRET_KEY`, and `DATABASE_URL` only if approved. Store real values in local ignored env files or hosting secrets. Commit placeholders only.

## Data handling
Collect only what is needed to reply. Limit access to enquiries. Do not put phone numbers or message text in analytics. Define retention/deletion procedures. Use TLS and provider encryption. Use parameterised queries/ORM if a database exists.

## Performance
Use AVIF/WebP responsive images, dimensions to reduce layout shift, lazy-load below-fold media, compress hero video and provide poster/static fallback. Cache public pages and assets; never cache private enquiry responses.

## SEO
Unique titles/descriptions, canonical URLs, Open Graph, sitemap, robots.txt, accurate structured data, consistent business name/address/phone, descriptive alt text and correct 404s.

## Release process
Separate development, preview and production. Keep production secrets separate. Run lint, type-check, build, dependency audit, secret scan and link checks. Use reviewed changes, preview deployment and rollback plan.
