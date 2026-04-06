# EightyMile Travels Deployment Handoff

This document explains exactly how to take the existing GitHub project, deploy it on Vercel, connect a GoDaddy subdomain, and enable the contact form with Resend.

The project code is already ready.

What still needs to be done is:

1. Make sure the latest code is in GitHub.
2. Make sure Vercel is using that GitHub repo.
3. Connect the custom subdomain from GoDaddy to Vercel.
4. Set up Resend so the contact form can send email.
5. Add the required environment variables in Vercel.
6. Redeploy and test everything.

## Important Overview

There are 3 separate services involved:

1. GitHub
   This stores the code repository.

2. Vercel
   This hosts the website.

3. GoDaddy
   This controls the domain and DNS.

4. Resend
   This sends the emails from the contact form.

The website domain and the email sending setup are two different things.

Example recommended setup:

- Main domain: `yourdomain.com`
- Website subdomain: `travel.yourdomain.com`
- Email sending subdomain: `mail.yourdomain.com`
- Contact form sender email: `hello@mail.yourdomain.com`

## Part 1: Push Latest Code to GitHub

Only do this if local code changes were made and have not already been pushed.

### Where to do this

On the developer machine, inside the project folder in PowerShell.

### Commands

```powershell
git status
git add .
git commit -m "Update deployment docs and latest project changes"
git push origin main
```

### Success check

Open the GitHub repository and confirm the latest files are visible.

Repository:

`https://github.com/stylarkofficial/Eighty-mile-travels`

## Part 2: Confirm Vercel Project

### Where to do this

In the Vercel dashboard.

### Steps

1. Log in to Vercel.
2. Open the project named `eighty-mile-travels`.
3. Confirm the deployment exists.
4. Confirm the current Vercel production URL works.

Current Vercel URL:

`https://eighty-mile-travels.vercel.app`

### If the project does not exist

1. Click `Add New...`
2. Click `Project`
3. Import the GitHub repo:
   `stylarkofficial/Eighty-mile-travels`
4. Keep framework preset as `Next.js`
5. Keep default build settings
6. Click `Deploy`

## Part 3: Connect GoDaddy Subdomain to Vercel

This step is for making the site open from your own domain.

### Example target

Use a website subdomain like:

`travel.yourdomain.com`

### Step A: Add the domain in Vercel

### Where to do this

Vercel dashboard -> Project -> `Settings` -> `Domains`

### Steps

1. Click `Add`
2. Type the subdomain you want, for example:
   `travel.yourdomain.com`
3. Save it
4. Vercel will show the DNS record you need to create in GoDaddy

Usually this will be a `CNAME` record for the subdomain.

Do not guess the value.
Use exactly what Vercel shows.

### Step B: Add the DNS record in GoDaddy

### Where to do this

GoDaddy -> My Products -> Domain -> DNS

### Steps

1. Open DNS management for your domain
2. Click `Add New Record`
3. Copy the record exactly from Vercel

Typical example:

- Type: `CNAME`
- Name: `travel`
- Value: value shown by Vercel

4. Save the record

### Step C: Wait for Vercel to verify

Go back to Vercel and wait until the domain status becomes active.

## Part 4: Set Up Resend for Contact Form Emails

This step is required because the contact form needs an email sending provider.

The site is already coded to send form submissions through a server route on Vercel:

`src/app/api/contact/route.ts`

Without Resend, the form will not actually deliver emails.

### Recommended email sending domain

Use an email sending subdomain like:

`mail.yourdomain.com`

### Step A: Add the sending domain in Resend

### Where to do this

Resend dashboard -> `Domains`

### Steps

1. Click `Add Domain`
2. Enter:
   `mail.yourdomain.com`
3. Save

### Step B: Copy the DNS records from Resend

Resend will now show DNS records for verification.

These may include:

- `TXT`
- `CNAME`
- SPF / DKIM related records

Do not change them.
Copy them exactly.

### Step C: Add those DNS records in GoDaddy

### Where to do this

GoDaddy -> Domain -> DNS

### Steps

1. For each DNS record shown by Resend:
2. Click `Add New Record` in GoDaddy
3. Choose the matching type
4. Copy the Host/Name exactly
5. Copy the Value/Content exactly
6. Save

Repeat until all Resend records are added.

### Step D: Verify the domain in Resend

Go back to Resend and click verify/check DNS.

Wait until the domain shows as verified.

Do not continue with branded sender email until this step is complete.

## Part 5: Create Resend API Key

### Where to do this

Resend dashboard -> `API Keys`

### Steps

1. Click `Create API Key`
2. Give it a name like:
   `vercel-production`
3. Copy the key immediately

Example format:

`re_xxxxxxxxxxxxxxxxx`

Keep it private.

## Part 6: Add Environment Variables in Vercel

These variables are required for the contact form.

### Where to do this

Vercel dashboard -> Project -> `Settings` -> `Environment Variables`

### Add these values

1. `RESEND_API_KEY`
   Value: the real Resend API key

2. `CONTACT_TO_EMAIL`
   Value: the email address where contact messages should arrive
   Example:
   `stylarkofficial@gmail.com`

3. `CONTACT_FROM_EMAIL`
   Value: the sender email for the form
   Example:
   `EightyMile Travels <hello@mail.yourdomain.com>`

4. `NEXT_PUBLIC_SITE_URL`
   Value: the full live website URL
   Example:
   `https://travel.yourdomain.com`

### Important note

If Resend domain verification is not complete yet, keep using the temporary sender until verification is done.

The repo includes a safe example file here:

`.env.example`

## Part 7: Redeploy Vercel

After adding environment variables, redeploy the project.

### Where to do this

Vercel dashboard -> `Deployments`

### Steps

1. Open the latest deployment
2. Click `Redeploy`

This is required because new environment variables are only used in new deployments.

## Part 8: Test the Website

### Website test

1. Open the final site URL
2. Confirm the homepage loads
3. Confirm scrolling, animations, sections, and contact form display correctly

### Contact form test

1. Open the contact form
2. Fill in:
   - Name
   - Email
   - Phone
   - Subject
   - Message
3. Click `Send Message`
4. Check the inbox configured in `CONTACT_TO_EMAIL`

### Expected result

The message should arrive in the configured inbox.

## Part 9: If Something Fails

### If website domain does not work

Check:

1. The Vercel domain record was added in GoDaddy exactly as shown
2. DNS propagation has completed
3. The domain is marked active in Vercel

### If contact form says it cannot send

Check:

1. `RESEND_API_KEY` exists in Vercel
2. `CONTACT_TO_EMAIL` exists in Vercel
3. `CONTACT_FROM_EMAIL` exists in Vercel
4. Resend domain is verified
5. The project was redeployed after env vars were added

### If contact form submits but no email arrives

Check:

1. Spam folder
2. Resend logs/dashboard
3. Sender domain verification status
4. Reply-to and receiving email address spelling

## Part 10: Final Checklist

Before saying the project is complete, confirm all of these:

- GitHub repo has latest code
- Vercel project is deployed
- GoDaddy website subdomain DNS is set
- Website opens from custom subdomain
- Resend domain is verified
- Resend API key is created
- Vercel env vars are added
- Vercel project has been redeployed
- Contact form sends a real email

## Files In This Repo Related to Deployment

- `README.md`
- `.env.example`
- `src/app/api/contact/route.ts`
- `src/components/Contact.tsx`
- `next.config.ts`

## Handoff Summary

If a friend is doing the setup, tell them to follow this exact order:

1. Confirm GitHub repo
2. Confirm Vercel project
3. Add custom subdomain in Vercel
4. Add Vercel DNS record in GoDaddy
5. Add sending domain in Resend
6. Add Resend DNS records in GoDaddy
7. Verify domain in Resend
8. Create Resend API key
9. Add Vercel environment variables
10. Redeploy in Vercel
11. Test homepage
12. Test contact form
