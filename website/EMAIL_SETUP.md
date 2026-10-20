# Estimate email activation
Owner confirmed recipient: info@automaven.ca.
Set server-only Vercel production and preview variables using the dashboard:
- RESEND_API_KEY: a sending key for a verified sender domain.
- ESTIMATE_EMAIL_FROM: verified sending address.
- ESTIMATE_EMAIL_TO: info@automaven.ca.
- ESTIMATE_EMAIL_ENABLED: set to true only after recipient confirmation and delivery testing.
No secrets belong in GitHub or chat. Redeploy after configuration.
Email is disabled unless all three exist and the explicit enable flag is true. There is no fake success or mailto attachment workaround.
Before activation verify real mailbox delivery with owner-approved test photos, reply-to, invalid files, and mobile flows. Max 10 photos / 3 MB combined keeps multipart requests below Vercel function limits.
The per-instance rate limiter is best-effort only; add a shared limiter or bot protection if traffic requires it.
VIN uses NHTSA vPIC, with editable results and manual fallback. It does not guarantee complete vehicle specifications.
