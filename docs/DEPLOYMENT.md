# Evision IT - Deployment Guide

## Overview

This guide covers the complete deployment process for the Evision IT website across different environments.

## Prerequisites

- Node.js 18+ with npm/yarn
- Vercel account (for production deployment)
- MongoDB Atlas account (for database)
- Environment variables configured (see `.env.example`)

## Environment Variables

Required environment variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga4_id
NEXT_PUBLIC_BING_UET_ID=your_bing_uet_id

# Email Service
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# API Keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret

# Vercel
VERCEL_API_TOKEN=your_vercel_token
```

## Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

## Production Deployment (Vercel)

### 1. Connect Repository

```bash
# Login to Vercel
vercel login

# Link project
vercel link
```

### 2. Set Environment Variables

```bash
# Add to Vercel
vercel env add MONGODB_URI
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
# ... add all other env vars
```

### 3. Deploy

```bash
# Automatic deployment on git push
git push origin main

# Or manual deployment
vercel --prod
```

### 4. Verify Deployment

- Check Analytics Dashboard: https://vercel.com/dashboard
- Check Google Search Console: https://search.google.com/search-console
- Check Uptime: https://www.pingdom.com

## Performance Optimization

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

Run audit:

```bash
npm run audit
# or use Lighthouse in Chrome DevTools
```

### Image Optimization

- Use Next.js `Image` component
- Compress images with TinyPNG
- Use WebP format where supported
- Set proper responsive sizes

### Code Splitting

- Dynamic imports for large components
- Route-based code splitting (automatic)
- Component lazy loading with React.lazy()

### Caching Strategy

- Static pages: ISR with 1 hour revalidation
- Blog posts: ISR with 24 hour revalidation
- API responses: CDN edge caching

## Database Backups

### MongoDB Atlas

1. Enable automated backups in Atlas console
2. Configure 30-day retention
3. Test restore procedure monthly

### Manual Backup

```bash
# Export database
mongodump --uri="mongodb+srv://..." --out=./backup

# Import database
mongorestore --uri="mongodb+srv://..." ./backup
```

## Security Checklist

- [ ] CSP headers configured
- [ ] SSL/TLS certificate installed
- [ ] Security headers in place
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Environment variables not exposed
- [ ] Database credentials secured
- [ ] API authentication in place

## Monitoring & Alerts

### Set Up Alerts For:

1. **Uptime**: Configure Pingdom or StatusPage alerts
2. **Performance**: Set up Vercel Analytics alerts
3. **Errors**: Configure Sentry error tracking
4. **Database**: Set up MongoDB Atlas alerts

## CI/CD Pipeline

The project uses Vercel's built-in CI/CD:

- Automatic preview deployments on pull requests
- Automatic production deployment on merges to main
- Automatic rollbacks on failed builds
- Environment-specific variables

### GitHub Actions (Optional)

For additional checks:

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
```

## Rollback Procedure

If something goes wrong:

```bash
# Rollback to previous deployment
vercel rollback

# Or redeploy specific commit
vercel --prod --target=<commit-hash>
```

## Maintenance

### Regular Tasks

- **Weekly**: Check error logs, review analytics
- **Monthly**: Test database backups, review performance metrics
- **Quarterly**: Security audit, dependency updates

### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update with caution
npm update

# Major version upgrades (test in staging first)
npm install package@latest
```

## Support & Troubleshooting

### Common Issues

1. **Build fails**: Check build logs in Vercel dashboard
2. **Database timeout**: Check MongoDB Atlas connection limits
3. **Slow performance**: Run Lighthouse audit, check images
4. **Email not sending**: Verify SMTP credentials

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev

# Check Vercel logs
vercel logs
```

## Disaster Recovery

- Automated MongoDB backups (30-day retention)
- GitHub repo as version control backup
- Vercel deployment history (100+ deployments)
- DNS failover plan documented

## Contact

For deployment issues, contact: devops@evision.lk
