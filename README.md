# Quill — AI Writing Assistant

A beautiful AI-powered writing assistant built with Claude AI. Improve, rewrite, shorten, expand, or change the tone of any text.

## Project Structure

```
ai-writing-assistant/
├── public/
│   └── index.html        # Frontend (the website)
├── api/
│   └── rewrite.js        # Serverless API proxy (keeps your API key safe)
├── vercel.json           # Vercel deployment config
└── README.md
```

---

## Deploy to Vercel (Free — takes ~5 minutes)

### Step 1 — Get your Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to **API Keys** → click **Create Key**
4. Copy the key (starts with `sk-ant-...`)

### Step 2 — Upload to GitHub
1. Go to [github.com](https://github.com) → click **New repository**
2. Name it `ai-writing-assistant`, set it to **Public**
3. Upload all the files from this folder (drag & drop in the GitHub UI)

### Step 3 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → sign up with GitHub
2. Click **Add New Project** → import your `ai-writing-assistant` repo
3. Click **Deploy** (Vercel auto-detects the config)

### Step 4 — Add your API Key
1. In your Vercel project → go to **Settings → Environment Variables**
2. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your key from Step 1
3. Click **Save** → go to **Deployments** → click **Redeploy**

### Done! 🎉
Your site is live at `https://your-project-name.vercel.app`

---

## Local Development

```bash
# Install Vercel CLI
npm install -g vercel

# Add your API key to a local .env file
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env.local

# Run locally
vercel dev
```

Then open `http://localhost:3000`

---

## Features
- ✦ **Improve** — Better clarity, grammar, and flow
- ↺ **Rewrite** — Fresh version with same meaning
- 🎩 **Make Formal** — Professional/academic tone
- 😊 **Make Casual** — Friendly, conversational tone
- ✂ **Shorten** — Concise and to the point
- ⟷ **Expand** — Add depth and detail

## Tech Stack
- **Frontend:** Vanilla HTML/CSS/JS
- **Backend:** Vercel Serverless Function (Node.js)
- **AI:** Claude claude-sonnet-4-20250514 via Anthropic API
