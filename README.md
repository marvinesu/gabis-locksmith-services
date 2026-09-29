# Gabis Locksmith Services

Static business website for Gabis Locksmith Services.

## Local development

```bash
npm install
npm run dev:worker
```

## Cloudflare deployment

Cloudflare Workers Builds deploys the site automatically whenever a commit is
pushed to the `main` branch. The build runs `npm run build`, followed by
`npx wrangler deploy`, and serves the files in `public/` through Workers Static
Assets.

The legacy Express server remains available for local or Hostinger rollback
until the DNS cutover to Cloudflare is complete.
