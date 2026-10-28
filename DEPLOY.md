# FxTune Website Deployment Guide

This guide covers deploying the FxTune marketing website to various platforms.

## Prerequisites

Before deploying, ensure you have:

1. Node.js 18+ installed
2. All dependencies installed (`npm install`)
3. A production build (`npm run build`)

## Build for Production

```bash
# Navigate to the website directory
cd fxtune-website

# Install dependencies (if not done)
npm install

# Build for production
npm run build

# Output will be in the dist/ directory
```

## Deployment Options

### 1. Vercel (Recommended)

Vercel is the easiest option for Astro sites.

#### Manual Deployment:
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Automatic Deployment:
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Astro and configure the build
5. Deployments will be automatic on push to main branch

#### Configuration:
Create `vercel.json` in the root directory if needed:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

### 2. Netlify

#### Manual Deployment:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod
```

#### Automatic Deployment:
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Deploy

### 3. Cloudflare Pages

#### Manual Deployment:
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build and deploy
npm run build
wrangler pages deploy dist --project-name=fxtune-website
```

#### Automatic Deployment:
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
3. Navigate to Pages
4. Connect your repository
5. Set build command: `npm run build`
6. Set build output directory: `dist`
7. Deploy

### 4. GitHub Pages

#### Manual Deployment:
```bash
# Install gh-pages
npm install -g gh-pages

# Build the site
npm run build

# Deploy to GitHub Pages
gh-pages -d dist
```

#### Automatic Deployment with GitHub Actions:
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 5. Traditional Web Hosting

For traditional web hosting (Apache, Nginx, etc.):

1. Build the site:
   ```bash
   npm run build
   ```

2. Upload the contents of the `dist/` directory to your web server

3. Configure your web server to serve the static files

#### Apache Configuration:
Create `.htaccess` in the root of your dist directory:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

#### Nginx Configuration:
```nginx
server {
    listen 80;
    server_name fxtune.app;
    root /var/www/fxtune-website;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 6. Docker

Create a Dockerfile:
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t fxtune-website .
docker run -p 8080:80 fxtune-website
```

## Environment Variables

The FxTune website doesn't require environment variables for basic operation. However, if you add dynamic content or analytics, you might need to set:

- `PUBLIC_ANALYTICS_ID` - For analytics tracking
- `PUBLIC_CONTACT_API_URL` - For contact form submissions

## Custom Domain Setup

### Vercel:
1. Go to your project settings
2. Add your domain (e.g., fxtune.app)
3. Update DNS records as instructed

### Netlify:
1. Go to Domain settings
2. Add custom domain
3. Configure DNS

### Cloudflare Pages:
1. Go to Custom domains
2. Add your domain
3. DNS is automatically configured

## SSL/HTTPS

All recommended platforms (Vercel, Netlify, Cloudflare Pages) provide automatic SSL certificates. No additional configuration is needed.

## Performance Optimization

The Astro build already includes:
- Static HTML generation
- Automatic code splitting
- Image optimization (with Sharp)
- CSS minification

For additional optimization:
1. Use `loading="lazy"` for images
2. Implement proper caching headers on your hosting platform
3. Consider using a CDN for global distribution

## Monitoring

After deployment:
1. Test all pages and links
2. Check mobile responsiveness
3. Verify SEO metadata
4. Test page load speeds (Google PageSpeed Insights)
5. Set up analytics if needed

## Troubleshooting

### Build Fails:
- Ensure Node.js 18+ is installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for syntax errors in your code

### 404 Errors:
- Ensure all internal links are correct
- Check that the base path is configured correctly in `astro.config.mjs`

### Images Not Loading:
- Verify images are in the `public/` directory
- Check image paths in your components

### CSS Issues:
- Run `npm run format` to fix formatting
- Check Tailwind configuration in `tailwind.config.mjs`

## Support

For deployment issues:
- Check the Astro deployment docs: https://docs.astro.build/en/guides/deploy/
- Review platform-specific documentation
- Open an issue in the repository