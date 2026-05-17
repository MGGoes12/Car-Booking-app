# Cotton Car Booking App

A mobile-first Angular booking app for family car access, built for Supabase authentication and data storage, and optimized for Vercel hosting.

## Features

- Supabase auth with email/password flow
- Password reset flow
- Booking creation with date, reason, time range, and whole-day option
- Booking approval workflow for admin user
- Odometer capture before and after the trip
- Calendar-style overview of car bookings
- Booking report pull by date range
- PWA install support for Chrome and mobile devices

## Setup

1. Create a Supabase project.
2. Add the `supabaseUrl` and `supabaseKey` values to `src/environments/environment.ts` and `src/environments/environment.prod.ts`.
3. Run `npm install`.
4. Run `npm start`.

## Supabase tables

The `sql/` folder includes scripts to create the `profiles` and `bookings` tables.

## Sample users

- `mark@thecottonclub.co.za`
- `david@thecottonclub.co.za`
- `lyndsay@lcproofing.co.za` (admin)
