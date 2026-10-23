# Heavy Traffic, Rate Limiting and Resilience

## Architecture
Browser → CDN/WAF → cached public pages/assets → enquiry endpoint → validation/rate limiter/bot check → email provider.

A database is optional; do not add one without a clear requirement.

## Public-page protection
Cache public pages and static assets, use responsive images, compress video, lazy-load gallery media and avoid making every page depend on a database or external API.

## Enquiry endpoint controls
- Initial per-IP sliding window: 5 requests / 10 minutes.
- Initial per-IP daily ceiling: 20 requests / 24 hours.
- Global email-provider quota and emergency kill switch.
- Request body limit (example: 16 KB).
- Server-side schema validation and allowed event types.
- Bot challenge based on risk.
- Duplicate submission prevention.
- Provider timeout and bounded retry strategy.
- Generic client errors and protected operational logs.
- HTTP 429 with a clear retry message when limited.

Tune limits after observing legitimate use. In serverless deployments, use platform/WAF controls or a distributed limiter with atomic counters/expiry, not process memory.

## Avoid amplification
Do not send multiple emails for repeated retries. Use deduplication where suitable, bounded exponential backoff and short timeouts. Do not retry invalid or rate-limited requests.

## Test
Use staging or a provider-approved test window. Test normal form flow, bursts to static pages, rate thresholds, malformed/oversized payloads, email timeout, fallback behaviour and error-data leakage. Only load-test systems you own or are authorised to test.
