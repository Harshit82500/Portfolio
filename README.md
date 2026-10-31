# Harshit Vishwakarma — Personal Portfolio & Case Study Archive

An editorial, high-performance personal portfolio built for **Harshit Vishwakarma** — Data Analyst, Data Scientist, and Applied Machine Learning Developer. Grounded in statistical rigor, reproducible architecture, and verified engineering case studies.

---

## 🏛 Design Direction: Editorial Dark

This portfolio explicitly rejects the generic "AI-generated template" aesthetic (no purple/cyan gradients, no glassmorphism, no glow effects, no generic bento cards, no emoji icons, no fake typing animations). Instead, it embraces an **Editorial Dark** print-inspired philosophy:

- **Palette:**
  - Background Canvas: `#0F0E0C` (Obsidian)
  - Primary Text: `#ECE7DD` (Warm Ivory)
  - Muted Text: `#8A857B` (Warm Stone)
  - Hairline Borders: `rgba(236, 231, 221, 0.12)`
  - Singular Focal Accent: `#FF4B2B` (Vermilion, used sparingly for interaction signals)
- **Typography:**
  - Display Font: *Instrument Serif* at very large scale with tight tracking.
  - Body Font: *Inter* for clean legibility and data density.
  - Badges & Metrics: *JetBrains Mono* for technical metadata.
- **Layout:**
  - Strict 12-column grid with generous whitespace and numbered editorial labels (`01 / About`, `02 / Skills`).
  - Large image-led case study panels rather than tiny cards.
  - Subtle procedural film-grain overlay (`opacity: 0.035`, `pointer-events: none`).
  - Desktop-only custom cursor with trailing hairline ring (hidden on touch screens).

---

## ⚡ Technical Stack

- **Framework:** React 19 + TypeScript (Strict mode enabled)
- **Bundler:** Vite 8 with optimized vendor chunking
- **Styling:** Tailwind CSS v4 with `@tailwindcss/vite`
- **Motion:** `motion/react` with a unified custom easing curve (`cubic-bezier(0.22, 1, 0.36, 1)`)
- **Smooth Scroll:** `locomotive-scroll` v5 (Lenis engine) with automatic route reset and parallax
- **Iconography:**
  - Brand & Tech Logos: `simple-icons` (`@icons-pack/react-simple-icons`) & `devicon` SVG vectors (monochrome ivory, brand color on hover).
  - UI Icons: `lucide-react` (thin stroke, used sparingly).
- **Contact:** Client-side rate-limited form with hidden honeypot bot trap and `@emailjs/browser`.
- **Hosting & SPA Routing:** Vercel with `vercel.json` SPA rewrite rules.

---

## 📁 Repository Structure

```text
portfolio/
├── docs/                      # Documentation
├── public/
│   ├── favicon.svg            # Editorial monogram SVG favicon
│   ├── og-image.svg           # 1200x630 social share Open Graph banner
│   ├── resume.pdf             # Curriculum vitae PDF
│   └── images/                # Local photos & project screenshots
│       ├── harshit.jpg        # Portrait (renders monogram fallback if absent)
│       └── projects/          # Case study screenshots
├── src/
│   ├── components/
│   │   ├── icons/             # Custom SVG vectors (e.g. Devicon LinkedIn)
│   │   ├── layout/            # Layout shell, Navbar, Footer, CustomCursor, FilmGrain, SkipToContent
│   │   ├── motion/            # Preloader, TextReveal, SectionReveal, PageTransition
│   │   ├── sections/          # Hero, About, Skills, Projects, Experience, Education, Certifications, Contact
│   │   └── ui/                # SectionHeader, Button (magnetic), Badge
│   ├── context/               # Locomotive Scroll v5 provider & useScroll hook
│   ├── data/                  # Single source of truth for all personal & project data
│   │   ├── personalInfo.ts    # Name, role, bio, social URLs, availability toggle
│   │   ├── skills.ts          # Categorized technical competencies
│   │   ├── projects.ts        # 3 featured case studies with verified metrics
│   │   ├── experience.ts      # Chronological trajectory
│   │   ├── education.ts       # Degree curriculum & laboratory investigations
│   │   └── certifications.ts  # Verified credentials
│   ├── pages/
│   │   ├── Home.tsx           # Main single-page overview
│   │   ├── ProjectDetail.tsx  # In-depth case study page (/project/:id)
│   │   └── NotFound.tsx       # Custom 404 page
│   ├── tokens/
│   │   └── designTokens.ts    # Central design system constants
│   ├── App.tsx                # React Router & AnimatePresence setup
│   ├── index.css              # Tailwind CSS imports, tokens, and reduced-motion reset
│   └── main.tsx               # App entrypoint
├── .env.example               # Template for EmailJS credentials
├── vercel.json                # SPA rewrite rules & caching headers
├── package.json               # Pinned dependencies
└── vite.config.ts             # Vite + Tailwind + Rolldown chunking config
```

---

## 🔒 Non-Negotiable Honesty Rules

- **Zero Speculation:** No fake metrics, fabricated accuracy scores, synthetic client testimonials, or invented internships.
- **Explicit Placeholders:** Any pending value or missing file is clearly marked as `[ADD: ...]` and localized in `src/data/`.
- **Missing Brand Icons:** If a technology logo is absent from both Simple Icons and Devicon (e.g. Power BI), an explicit audit notice and clean typographic indicator are displayed instead of substituting an unverified fake icon.

---

## 🛠 Getting Started Locally

### 1. Prerequisites
- Node.js 20 or later
- npm (or pnpm)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Harshit82500/portfolio.git
cd portfolio

# Install pinned dependencies
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build & Preview Production Bundle
```bash
# Type check and build optimized bundle
npm run build

# Run local preview server
npm run preview
```

---

## ✉️ EmailJS Dashboard Setup

The contact form uses `@emailjs/browser` with zero backend server required. Follow these steps to connect your email:

1. **Create an Account:** Sign up for free at [emailjs.com](https://www.emailjs.com/).
2. **Add Email Service:**
   - Go to **Email Services** > **Add New Service**.
   - Choose **Gmail** and connect `harshitvishwakarma6264@gmail.com`.
   - Copy your **Service ID** (e.g. `service_abc123`).
3. **Create Email Template:**
   - Go to **Email Templates** > **Create New Template**.
   - Set the template content to:
     ```text
     New inquiry from portfolio:
     Name: {{from_name}}
     Email: {{from_email}}
     Subject: {{subject}}

     Message:
     {{message}}
     ```
   - In template settings, set **Reply-To** to `{{from_email}}`.
   - Save and copy your **Template ID** (e.g. `template_xyz789`).
4. **Obtain Public Key:**
   - Go to **Account** > **API Keys** > copy your **Public Key**.
5. **Secure Allowed Domains:**
   - In **Account** > **Security**, enable **Allow EmailJS API calls only from listed domains**.
   - Add your domains: `localhost:5173`, `localhost:4173`, and `*.vercel.app`.
6. **Configure Environment Variables:**
   - Create a `.env` file in the project root:
     ```bash
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     ```

---

## 🚀 Beginner-Friendly Deployment Guide (GitHub + Vercel)

### Step 1: Push Code to GitHub
1. Open your terminal in this project folder (`h:\portfolio`).
2. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Editorial Dark portfolio"
   ```
3. Create a new repository on [GitHub](https://github.com/new) named `portfolio` (keep it Public).
4. Link and push your repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/Harshit82500/portfolio.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel in 1-Click
1. Go to [vercel.com](https://vercel.com/) and log in with your GitHub account.
2. Click **"Add New..."** > **"Project"**.
3. Locate `portfolio` in your list of GitHub repositories and click **"Import"**.
4. In the project configuration screen:
   - **Framework Preset:** `Vite` (automatically detected).
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Under **Environment Variables**, add your three EmailJS keys:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
6. Click **"Deploy"**.
7. In ~30 seconds, your site will be live at a URL like `https://portfolio-harshit.vercel.app`!

---

## 📄 License
MIT License. © 2026 Harshit Vishwakarma.
