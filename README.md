# VR Engineering — Frontend

Complete React frontend for VR Engineering business website.

## Tech Stack
- React 18 + Vite
- Three.js (3D scenes)
- Lucide React (icons)
- CSS Variables (no Tailwind needed)

## Project Structure

```
vr-engineering/
├── index.html              # Entry HTML
├── vite.config.js          # Vite config
├── package.json            # Dependencies
├── .env.example            # Environment variables template
└── src/
    ├── main.jsx            # React root
    ├── App.jsx             # Root component (routing, cursor)
    ├── index.css           # All global styles
    ├── data.jsx            # All content data & constants
    ├── pages.jsx           # All 6 pages (Home, Services, Gallery, About, Quote, Contact)
    ├── hooks/
    │   └── useThreeScenes.js   # Three.js scene hooks
    └── components/
        ├── Shared.jsx      # Navbar, Footer, Counter, Ticker, WhatsApp
        └── ChatBot.jsx     # AI Chatbot (Vijay - Claude API)
```

## Setup & Run

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Set up environment (for AI Chatbot)
```bash
cp .env.example .env
# Edit .env and add your Anthropic API key
```

### Step 3 — Start development server
```bash
npm run dev
```

Opens at: http://localhost:3000

### Step 4 — Build for production
```bash
npm run build
```

## Pages
| Page | Route (internal) |
|------|-----------------|
| Home | home |
| Services | services |
| Gallery | gallery |
| About | about |
| Get a Quote | quote |
| Contact | contact |

## AI Chatbot Setup
1. Get API key from https://console.anthropic.com
2. Add to `.env` as `VITE_ANTHROPIC_API_KEY=sk-ant-...`
3. The chatbot works without a key too (uses fallback responses)

> ⚠️ **Production Note:** Move the Anthropic API call to your Django backend
> to keep the API key secure. Never expose it in the frontend build.

## Features
- ✅ 3D animated hero (Three.js torus knot)
- ✅ Mouse-reactive 3D scenes
- ✅ 6 complete pages
- ✅ Custom cursor
- ✅ Sticky navbar with mobile hamburger
- ✅ Gallery with category filters + lightbox (keyboard nav)
- ✅ Animated stats counters
- ✅ Quote form with validation + file upload
- ✅ AI Chatbot (Vijay) powered by Claude
- ✅ WhatsApp floating button
- ✅ Fully responsive
- ✅ Scroll animations
- ✅ Page transitions

## Django Backend (Next Step)
The quote form currently just shows a success screen.
Connect it to Django REST API at `/api/enquiries/` to save submissions.
