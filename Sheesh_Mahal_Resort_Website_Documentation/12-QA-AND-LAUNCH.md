# QA, Accessibility and Launch Checklist

## Content
- [ ] Official name, address, map pin and phone confirmed.
- [ ] Hours and event categories confirmed.
- [ ] Capacity, facilities, prices, policies and room details verified or omitted.
- [ ] Photo/video permissions documented.
- [ ] Contact recipient approved.

## Functionality
- [ ] Responsive navigation works.
- [ ] Call, WhatsApp and directions links are correct.
- [ ] Form validates client and server side.
- [ ] Success/error states are accessible.
- [ ] Email delivery tested in production.
- [ ] Rate limits and spam controls tested.
- [ ] Social links checked.
- [ ] Broken links and 404 behaviour checked.

## Security
- [ ] HTTPS and redirects verified.
- [ ] No secrets in source control, client bundles, source maps or logs.
- [ ] Production environment variables secured.
- [ ] Security headers tested.
- [ ] Dependency and secret scans reviewed.
- [ ] Admin MFA enabled if applicable.
- [ ] Oversized/malformed requests and rate limits tested.
- [ ] Errors reveal no stack traces or private data.
- [ ] Privacy notice and retention owner approved.
- [ ] Backup/restore tested if data is stored.

## SEO/AEO/GEO
- [ ] Unique titles/descriptions and canonical URLs.
- [ ] Sitemap and robots.txt checked.
- [ ] Structured data matches visible verified content.
- [ ] Business NAP consistent with official listings.
- [ ] Meaningful image alt text.
- [ ] Search Console configured.
- [ ] Preview deployments excluded from indexing.

## Accessibility/performance
- [ ] Mobile tested.
- [ ] Images compressed and responsive.
- [ ] Video has poster/fallback and no sound autoplay.
- [ ] Keyboard navigation, focus, contrast and labels checked.
- [ ] Reduced-motion preference respected.
- [ ] Core Web Vitals measured after launch.

## Release
- [ ] Domain/DNS and canonical redirects verified.
- [ ] Form delivery checked after deployment.
- [ ] Uptime/error monitoring enabled.
- [ ] Rollback plan documented.
- [ ] Owner receives access and maintenance instructions.
