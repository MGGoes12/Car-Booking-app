# Vercel Environment Variables Setup

This document explains how to configure environment variables on Vercel for the Cotton Car Booking app.

## Environment Variables

The following variables need to be set on Vercel:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://your-project.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

## Setting Up on Vercel Dashboard

1. **Go to your Vercel project settings**
   - Navigate to https://vercel.com/dashboard
   - Select your project (or create one)

2. **Add Environment Variables**
   - Click on "Settings" tab
   - Go to "Environment Variables" section
   - Add each variable:
     - Name: `VITE_SUPABASE_URL`
     - Value: (paste your Supabase project URL)
     - Production: ✓ (checked)
   - Add the second variable:
     - Name: `VITE_SUPABASE_ANON_KEY`
     - Value: (paste your Supabase anonymous key)
     - Production: ✓ (checked)

3. **Redeploy**
   - Go to "Deployments" tab
   - Click on the latest deployment
   - Click "Redeploy" button

## How It Works

1. During build, `npm run build` runs the Angular build
2. After build, `scripts/inject-env.js` injects env variables into `dist/index.html`
3. At runtime, JavaScript reads from `window.__env__` object
4. The Angular app uses these values via the environment configuration

## Finding Your Supabase Credentials

1. Go to https://app.supabase.com
2. Select your project
3. Click "Settings" → "API"
4. Copy:
   - **Project URL** (for `VITE_SUPABASE_URL`)
   - **anon public** (for `VITE_SUPABASE_ANON_KEY`)

## Local Development

For local testing, you can:

```bash
# Set env vars in your shell
export VITE_SUPABASE_URL="https://your-project.supabase.co"
export VITE_SUPABASE_ANON_KEY="your-anon-key"

# Run the dev server
npm start
```

Or create a `.env.local` file (if you configure Angular to support it):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Security Notes

- **Never commit** credentials to Git (they're in `.gitignore`)
- **Use Vercel Secrets** for sensitive keys in production
- **Rotate keys** if accidentally exposed
- The `VITE_SUPABASE_ANON_KEY` is safe to expose in client-side code (it's designed for that)
