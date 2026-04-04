# EightyMile Travels

Premium travel landing page built with Next.js App Router, Tailwind CSS v4, Framer Motion, and React Three Fiber.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Environment

Create a `.env.local` file when you know your live domain:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

For Vercel, add the same variable in Project Settings -> Environment Variables.

## Deploy to Vercel

1. Push this project to GitHub, GitLab, or Bitbucket.
2. Import the repository into Vercel.
3. Keep the default framework preset as `Next.js`.
4. Deploy.

This project has already been verified with `npm run build`, so it is ready for a normal Vercel deployment.

## Connect your GoDaddy subdomain

1. In Vercel, open your project and add the subdomain you want to use.
2. Vercel will show the exact DNS record required for that subdomain.
3. In GoDaddy DNS, create the matching `CNAME` record for your subdomain host.
4. Wait for DNS propagation and confirm the domain becomes active in Vercel.

Important: you do not paste the raw Vercel deployment URL into GoDaddy as a redirect. For a subdomain, you normally create a DNS `CNAME` record using the value Vercel tells you to use.

## Content updates

Main page structure lives in `src/App.tsx` and the sections live in `src/components`.
