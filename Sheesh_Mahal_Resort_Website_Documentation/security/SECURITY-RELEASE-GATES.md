# Security Release Gates

Do not launch until critical checks pass:
- No hard-coded credentials or API keys.
- No secrets in frontend code, Git, source maps or logs.
- Enquiry endpoint validates on the server.
- Rate limiting active at edge/WAF/distributed store.
- Spam protection and global sending limits active.
- Security headers configured and tested.
- Dependency and secret scans reviewed.
- Production errors do not expose stack traces/private data.
- Privacy notice and data-retention owner confirmed.
- Correct phone number and enquiry recipient verified.

Recommended: MFA on hosting/domain/email/source control/CMS; least-privilege access; security alerts; uptime/form-delivery monitoring; documented credential rotation and rollback; periodic access reviews.
