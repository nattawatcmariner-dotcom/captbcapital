---
description: How to deploy updates to Vercel
---

# Deploying to Vercel

Since your project is likely connected to a Git repository (GitHub, GitLab, etc.), the best way to deploy is to **push your code**. Vercel will detect the new commit and rebuild the site automatically.

## Step 1: Commit and Push Changes

Open your terminal and run:

```bash
# 1. Add all changed files
git add .

# 2. Commit with a message
git commit -m "Fix: Connect Fleet Management to Supabase and handle errors"

# 3. Push to your repository (usually main or master)
git push origin main
```

## Step 2: Configure Environment Variables

**Crucial Step**: Since we are now using Supabase, Vercel needs to know the connection details.

1.  Go to your **Vercel Dashboard** > Select Project.
2.  Go to **Settings** > **Environment Variables**.
3.  Add the following keys (copy values from your local `.env` or Supabase dashboard):
    *   `VITE_SUPABASE_URL`
    *   `VITE_SUPABASE_ANON_KEY`
4.  Adding new variables usually requires a **Redeploy**. Go to the **Deployments** tab, find the latest one, click the 3 dots, and select **Redeploy**.

## Step 3: Verify

Once the build is "Ready" (green), verify on `captbcapital.com`.
