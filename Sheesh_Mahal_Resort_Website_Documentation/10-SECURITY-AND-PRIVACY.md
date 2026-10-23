# Security, Privacy and Abuse Prevention

This plan reduces common risks but cannot guarantee a site will never be attacked.

## Threats
Spam and form abuse; injection/XSS; exposed API keys; vulnerable dependencies; unauthorised admin access; traffic spikes/DoS; data leaks in logs/source maps; malicious uploads if uploads are added.

## Reduce attack surface
Prefer a mostly static site. Avoid admin logins, uploads, payments and custom booking systems unless needed. Keep dependencies limited, disable debug routes, use managed hosting/CDN/WAF and restrict maintainer access.

## Secrets
Store API keys, email credentials and database URLs server-side. Never expose them in frontend code, `NEXT_PUBLIC_*`, HTML, Git or logs. Use placeholder-only `.env.example`. Separate preview/production secrets and rotate any exposed credential.

## Validation
Validate every field server-side; use allow-lists, field/request-size limits, safe normalisation and context-appropriate output encoding. Never render user-submitted HTML. Use parameterised database operations or a reputable ORM.

## Rate limits and spam
Suggested starting values, to tune with real traffic:
- Enquiry form: 5 requests per IP per 10 minutes.
- Additional per-IP ceiling: 20 per 24 hours.
- Global email/provider cap and emergency disable switch.
- Small request-body limit, e.g. 16 KB.
- Bot challenge such as Turnstile for suspicious or repeated traffic.
- Honeypot and minimum-completion-time signals as supplementary controls.
- Return HTTP 429 when limited.
Use edge/WAF or distributed rate limiting in serverless deployments; in-memory counters do not work reliably across instances. Avoid limits so strict they block customers on shared mobile networks.

## Security headers
Configure and test CSP (start report-only, then enforce), HSTS after HTTPS is confirmed, `X-Content-Type-Options: nosniff`, suitable Referrer-Policy, Permissions-Policy and CSP `frame-ancestors`. Test maps, analytics, video and form integrations before enforcing restrictive CSP.

## Admin/CMS
If present, use MFA, individual accounts, least privilege, timely access removal, audit logs and reputable managed authentication. Never store plaintext passwords.

## Heavy traffic and availability
Use CDN caching for public pages/assets; compress images/video; set endpoint body/execution limits; use timeouts and bounded retries; avoid retry storms; protect email quotas; use provider-approved WAF/DDoS protections. Provide phone/WhatsApp fallback if the form service fails.

## Monitoring
Monitor uptime, 4xx/5xx rates, latency, email quotas, form abuse and delivery failures. Log request IDs and operational status, not full messages or secrets. Set retention and access controls.

## Privacy
Collect only necessary enquiry details. Publish a privacy notice, define retention/deletion, restrict staff access, obtain photo/testimonial permission, and use consent controls where required for non-essential tracking.

## Incident response
Contain the abused endpoint, rotate exposed credentials, preserve relevant protected logs, patch and regression-test, assess data exposure, restore service, monitor recurrence and document corrective actions.
