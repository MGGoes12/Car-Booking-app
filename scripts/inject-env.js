#!/usr/bin/env node

/**
 * Inject environment variables into index.html for runtime use.
 * Run this after the Angular build completes.
 */

const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist/cotton-car-booking/index.html');
const envVars = {
  VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL || '',
  VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || ''
};

if (fs.existsSync(distPath)) {
  let html = fs.readFileSync(distPath, 'utf8');
  
  // Replace placeholder environment variables
  html = html.replace(
    /window\.__env__\s*=\s*{[^}]+}/,
    `window.__env__ = ${JSON.stringify(envVars)}`
  );
  
  fs.writeFileSync(distPath, html, 'utf8');
  console.log('✓ Environment variables injected into index.html');
} else {
  console.warn('⚠ index.html not found at', distPath);
}
