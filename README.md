# DHMaths.lk LMS

Production-focused LMS built with Next.js 14 + Supabase for Sri Lankan tuition workflows.

## Stack
- Next.js 14 (App Router + TypeScript)
- Tailwind CSS with Light/Dark mode (`dark` class strategy)
- Supabase (PostgreSQL, Auth, Storage)
- PayHere (sandbox + live)
- YouTube unlisted secure proxy playback
- XLSX upload for marks
- Notify.lk SMS hook support
- Zoom server integration endpoint

## Setup
1. Copy env file:
   ```bash
   cp .env.example .env.local
   ```
2. Fill all env vars.
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```

## Database
Apply SQL:
```bash
# in Supabase SQL editor
# paste db/schema.sql
```

## Security Highlights
- `youtube_video_id` only (never full URL) in database.
- `/api/lesson/[id]` validates auth + paid enrollment before returning video ID.
- Service key used server-side only.
- Payment callback signature verification.
- Role-targeted RLS policies.

## Free Deployment (Vercel)
1. Push repo to GitHub.
2. Import into Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.

## Main Routes
- Admin: `/admin/dashboard`, `/admin/courses`, `/admin/marks/upload`, etc.
- Student: `/dashboard`, `/classroom/[courseId]`, `/exams`, `/marks`, `/payment`
- Parent: `/parent/dashboard`
