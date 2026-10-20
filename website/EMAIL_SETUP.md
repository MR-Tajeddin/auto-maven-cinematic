# Estimate email activation
Recipient: info@automaven.ca. SMTP support is implemented but remains disabled until configured.

In the Vercel project auto-maven-cinematic, Settings > Environment Variables, add server-only Production values:
- ESTIMATE_EMAIL_PROVIDER=smtp
- SMTP_HOST=the exact outgoing server from the mailbox provider (do not guess)
- SMTP_PORT=465 (implicit TLS) or 587 (required STARTTLS), matching provider instructions
- SMTP_USER=info@automaven.ca
- SMTP_PASS=mailbox password or app password, entered only by the owner in Vercel as Sensitive
- ESTIMATE_EMAIL_FROM=info@automaven.ca
- ESTIMATE_EMAIL_TO=info@automaven.ca
- ESTIMATE_EMAIL_ENABLED=true

Never paste credentials into chat or commit them. Use only a mailbox the owner confirms exists. Redeploy after setting values; submit a clearly labelled test inquiry with a harmless photo and confirm receipt and reply-to before declaring email operational. A successful submission means the SMTP server accepted the message, not that inbox delivery is verified.

For Namecheap cPanel mail, get the exact SMTP host from Email Accounts > Connect Devices > Mail Client Manual Settings. For Private Email, use its own published settings. Do not change MX records or use the website hostname as SMTP host without verification.

Resend remains supported when ESTIMATE_EMAIL_PROVIDER is unset or resend: configure RESEND_API_KEY plus verified ESTIMATE_EMAIL_FROM, ESTIMATE_EMAIL_TO and ESTIMATE_EMAIL_ENABLED=true instead.

Max 10 photos / 3 MB combined. SMTP uses certificate verification and TLS; remote URL and file-path attachment fetching are disabled. Provider errors never report success. Per-instance rate limiting is best-effort; add shared rate limiting or bot protection if traffic requires it.
