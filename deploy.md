# Product Requirements Document (PRD)
## Web-world — Startup Marketing & Product Website

| Field | Value |
|---|---|
| Document Owner | Deepdp7 |
| Repository | https://github.com/Deepdp7/Web-world |
| Target Domain | waveword.in |
| Hosting | Self-hosted Ubuntu Server (VMware VM), exposed via Cloudflare Tunnel |
| DNS Registrar | Hostinger |
| Stack | Node.js + Express (Backend) / React (Frontend) |
| Version | 1.0 |
| Status | Draft — Ready for AI Coding Agent handoff |

---

## 1. Executive Summary & Product Vision

### 1.1 Mission Statement
Web-world is the official public-facing website for a startup — the primary digital storefront that communicates the company's value proposition, builds credibility, captures leads, and converts visitors into customers or sign-ups. It is the first impression of the brand and must load fast, look professional, and work flawlessly on any device.

### 1.2 Product Vision
Build a lightweight, fast, SEO-friendly, and easily maintainable startup website that can scale from a simple "MVP landing page" into a full marketing site with a blog, product pages, and a lead-capture/contact pipeline — all self-hosted at near-zero infrastructure cost using a home server, and made publicly reachable and secure through Cloudflare Tunnel rather than exposing any home IP or open inbound port.

### 1.3 Core User Target (Personas)

| Persona | Goal | Key Pages |
|---|---|---|
| **Prospective Customer / Visitor** | Understand what the startup does, decide if it solves their problem | Home, Product/Features, Pricing |
| **Investor / Partner** | Assess credibility, team, traction | About, Team, Blog/News |
| **Job Seeker** | Understand culture, see openings | Careers (optional) |
| **Existing User / Lead** | Contact support, sign up, log in | Contact, Sign-up/CTA forms |
| **Site Admin (Founder/Dev)** | Update content, view leads, monitor uptime | Admin/CMS (phase 2), PM2/Cloudflare dashboards |

### 1.4 Success Metrics (Product-Level KPIs)
- Time-to-first-byte (TTFB) < 200ms (via Cloudflare edge caching)
- Lighthouse Performance score ≥ 90
- Contact-form → lead conversion rate tracked via analytics
- 99.5% uptime (self-hosted, single-node target)
- Zero exposed inbound ports on the home network (Cloudflare Tunnel only)

---

## 2. Core Features & Functional Requirements

### 2.1 Feature Breakdown (MVP — Phase 1)

| # | Feature | Description | Priority |
|---|---|---|---|
| F1 | Landing / Home Page | Hero section, value proposition, CTA button, social proof/logos | P0 |
| F2 | About Page | Mission, story, founder/team bios | P0 |
| F3 | Product/Features Page | Feature grid, screenshots, benefit-oriented copy | P0 |
| F4 | Pricing Page | Tiered pricing cards (static or config-driven) | P1 |
| F5 | Contact/Lead Capture Form | Name, email, message → stored in DB + emailed via SMTP/3rd-party (e.g., Resend/SMTP relay) | P0 |
| F6 | Blog/News (optional, Phase 2) | Markdown or CMS-driven articles for SEO | P2 |
| F7 | Responsive Navigation & Footer | Sticky navbar, mobile hamburger menu, footer with links/socials | P0 |
| F8 | SEO & Meta Tags | Per-page title/description, Open Graph tags, sitemap.xml, robots.txt | P0 |
| F9 | Health-check Endpoint | `/api/health` returning 200 OK for monitoring/PM2/Cloudflare checks | P0 |
| F10 | Analytics Integration | Privacy-friendly analytics (e.g., Plausible/Umami or GA4) | P1 |
| F11 | Newsletter Signup (optional) | Email capture widget, stored in DB or forwarded to Mailchimp/Resend | P2 |
| F12 | Admin View of Leads (Phase 2) | Simple authenticated route to view submitted contact-form leads | P2 |

### 2.2 UI/UX Structure

```
/                → Home
/about           → About / Team
/product         → Product / Features
/pricing         → Pricing
/blog            → Blog index (Phase 2)
/blog/:slug      → Blog post (Phase 2)
/contact         → Contact form
/privacy-policy  → Legal
/terms           → Legal
* (404)          → Custom Not Found page
```

**Layout Convention:**
- Persistent `Navbar` (logo left, nav links center/right, primary CTA button far right)
- Persistent `Footer` (sitemap links, social icons, copyright, contact email)
- Each route renders inside a shared `<Layout>` wrapper (React Router `Outlet` pattern)

### 2.3 Primary User Flow — Lead Capture (Critical Path)

1. Visitor lands on `/` from ad, search, or social referral.
2. Visitor reads hero + scrolls through feature sections.
3. Visitor clicks primary CTA ("Get Started" / "Book a Demo") → smooth-scrolls or routes to `/contact`.
4. Visitor fills out the contact form (client-side validation via `react-hook-form` + `zod`/`yup`).
5. Form `POST`s to `/api/contact` (Express route).
6. Backend validates payload server-side, persists to DB (or JSON/flat file for MVP), and sends a notification email.
7. Frontend shows a success toast/confirmation state; backend returns `201 Created`.
8. (Phase 2) Admin logs into `/admin` to view/export all captured leads.

### 2.4 Non-Functional UX Requirements
- Mobile-first responsive design (breakpoints: 375px, 768px, 1024px, 1440px)
- WCAG 2.1 AA accessibility baseline (alt text, contrast ratios, keyboard navigation)
- Page transitions should not cause layout shift (CLS < 0.1)
- All forms must have loading, success, and error states

---

## 3. System Architecture & Tech Stack

### 3.1 High-Level Architecture

```
[ User Browser ]
      │  HTTPS (waveword.in)
      ▼
[ Cloudflare Edge / CDN ]
      │  Cloudflare Tunnel (outbound-only, encrypted)
      ▼
[ cloudflared daemon ]  ── runs on the Ubuntu VM
      │
      ▼
[ Nginx (reverse proxy, local) ]  :80/:443 internal
      │
      ├──► [ React Static Build ]  served as static files (or via Express static middleware)
      │
      └──► [ Express.js API Server ]  :5000 (internal only)
                  │
                  ▼
           [ Database Layer ]
     (MVP: SQLite/lowdb  |  Scale: PostgreSQL/MongoDB)
```

### 3.2 Frontend

| Aspect | Choice |
|---|---|
| Framework | React 18+ (Vite build tool — faster dev/build than CRA) |
| Routing | `react-router-dom` v6 |
| Styling | TailwindCSS (utility-first, fast iteration, small bundle with purge) |
| Forms | `react-hook-form` + `zod` for schema validation |
| State | React Context / lightweight (no Redux needed for a marketing site) |
| Icons | `lucide-react` |
| Build Output | Static `dist/` folder, served by Express `express.static` or Nginx directly |

### 3.3 Backend

| Aspect | Choice |
|---|---|
| Runtime | Node.js LTS (v20.x) |
| Framework | Express.js |
| API Style | REST (`/api/...`), JSON |
| Validation | `zod` (shared schema definitions with frontend where possible) |
| Email | Nodemailer (SMTP relay) or Resend API for transactional email |
| Security Middleware | `helmet`, `cors` (restricted origin), `express-rate-limit` |
| Env Config | `dotenv` — `.env` file, never committed |
| Logging | `pino` or `morgan` (HTTP request logs) → piped into PM2 logs |

### 3.4 Database

| Phase | Choice | Rationale |
|---|---|---|
| MVP (Phase 1) | SQLite (via `better-sqlite3`) or flat JSON file | Zero external dependency, perfect for a single-VM home server, easy backup (single file) |
| Scale (Phase 2+) | PostgreSQL (self-hosted via Docker) or MongoDB | If lead volume/blog CMS complexity grows |

**MVP Schema (`leads` table):**
```sql
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  source_page TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 3.5 Node.js / PM2 Process Setup

PM2 keeps the Express server (and optionally a static file server) alive, auto-restarts on crash, and starts on VM boot.

**`ecosystem.config.js`:**
```js
module.exports = {
  apps: [
    {
      name: "webworld-api",
      script: "./server/index.js",
      cwd: "/home/<user>/Web-world",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        PORT: 5000
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      merge_logs: true,
      time: true
    }
  ]
};
```

**Commands:**
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup systemd   # generates & registers systemd unit so PM2 survives VM reboot
```

### 3.6 Local Deployment Configuration

| Layer | Detail |
|---|---|
| Host OS | Ubuntu Server 22.04/24.04 LTS |
| Virtualization | VMware Workstation/ESXi — VM allocated ≥2 vCPU, ≥2GB RAM, bridged network adapter (so it gets a real LAN IP, not NAT-only, to simplify router/Cloudflare routing) |
| Node Version Manager | `nvm` to install/pin Node LTS |
| Reverse Proxy | Nginx (local only — Cloudflare Tunnel connects directly to `localhost`, but Nginx is recommended for clean static+API routing and future TLS-at-origin needs) |
| Process Manager | PM2 (systemd-integrated) |
| Env Variables | Stored in `.env` (git-ignored), loaded via `dotenv`; a `.env.example` committed to repo documenting required keys |

**`.env.example`:**
```
NODE_ENV=production
PORT=5000
DB_PATH=./data/webworld.sqlite
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_TO_EMAIL=founder@waveword.in
CORS_ORIGIN=https://waveword.in
```

---

## 4. Infrastructure, Networking & Security

### 4.1 Why Cloudflare Tunnel (not port forwarding)
Cloudflare Tunnel creates an **outbound-only** encrypted connection from the home VM to Cloudflare's edge — no inbound ports need to be opened on the home router, no public IP exposure, and DDoS/CDN protection is inherited automatically.

### 4.2 Cloudflare Tunnel Setup

1. **Add domain to Cloudflare** and point Hostinger's nameservers to Cloudflare's assigned NS records (this moves DNS management to Cloudflare while the domain stays registered at Hostinger).
2. **Install `cloudflared` on the Ubuntu VM:**
   ```bash
   curl -L https://pkg.cloudflare.com/cloudflare-main.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloudflare-main.gpg
   echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
   sudo apt update && sudo apt install cloudflared
   ```
3. **Authenticate & create the tunnel:**
   ```bash
   cloudflared tunnel login
   cloudflared tunnel create webworld-tunnel
   ```
4. **Configure routing (`~/.cloudflared/config.yml`):**
   ```yaml
   tunnel: <TUNNEL-UUID>
   credentials-file: /home/<user>/.cloudflared/<TUNNEL-UUID>.json

   ingress:
     - hostname: waveword.in
       service: http://localhost:80
     - hostname: www.waveword.in
       service: http://localhost:80
     - service: http_status:404
   ```
5. **Create DNS records pointing to the tunnel:**
   ```bash
   cloudflared tunnel route dns webworld-tunnel waveword.in
   cloudflared tunnel route dns webworld-tunnel www.waveword.in
   ```
6. **Run as a system service (survives reboot):**
   ```bash
   sudo cloudflared service install
   sudo systemctl enable --now cloudflared
   ```

### 4.3 Hostinger DNS Integration
- In the Hostinger control panel, under the domain's **Nameservers** section, replace default Hostinger nameservers with the two Cloudflare-assigned nameservers (found in the Cloudflare dashboard after adding the site).
- Propagation can take up to 24 hours; verify with `dig NS waveword.in`.
- After propagation, all DNS records (A/CNAME for the tunnel, MX for email if needed) are managed entirely in the Cloudflare dashboard, not Hostinger.

### 4.4 SSL/TLS
- Cloudflare provides a free **Universal SSL** certificate at the edge automatically once DNS is proxied (orange-cloud icon).
- Set **SSL/TLS mode** to **"Full"** (or "Full (strict)" if you also configure a self-signed/Origin CA cert on Nginx) in Cloudflare dashboard — never "Flexible," which leaves the tunnel-to-origin hop unencrypted in some configs.
- Enable **"Always Use HTTPS"** and **HSTS** in Cloudflare's Edge Certificates settings.
- Recommended: install a **Cloudflare Origin CA certificate** on the local Nginx so traffic between `cloudflared` and Nginx is also encrypted end-to-end.

### 4.5 Security Best Practices

**UFW Firewall (Ubuntu):**
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH        # or a custom SSH port if hardened
sudo ufw enable
sudo ufw status verbose
```
> Note: Because Cloudflare Tunnel is outbound-only, you do **not** need to open port 80/443 in UFW at all — this is one of the tunnel's key security advantages.

**SSH Hardening (`/etc/ssh/sshd_config`):**
```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
Port 2222                # optional: change from default 22
AllowUsers <your-username>
MaxAuthTries 3
```
- Generate and use SSH key pairs only (`ssh-keygen -t ed25519`); disable password login entirely.
- Install `fail2ban` to auto-ban repeated failed login attempts.

**Application-Level Security:**
- `helmet` middleware on Express for secure HTTP headers.
- `express-rate-limit` on `/api/contact` to prevent spam/abuse (e.g., 5 requests/min/IP).
- Input validation and sanitization (`zod`) on every API endpoint — never trust client input.
- CORS locked to `https://waveword.in` only in production.
- Store all secrets in `.env`, add `.env` to `.gitignore`, never commit credentials to the repo.
- Enable **Cloudflare WAF** (free tier includes basic managed rules) and **Bot Fight Mode**.
- Automatic OS patching: `sudo apt install unattended-upgrades`.

---

## 5. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | First Contentful Paint < 1.5s; Lighthouse Performance ≥ 90; static assets served with Cloudflare edge caching + long `Cache-Control` headers |
| **Uptime** | Target 99.5% monthly uptime for a single-VM home setup; PM2 auto-restart on crash; VM configured to auto-start on host boot |
| **Scalability** | Stateless Express API allows horizontal scaling later (e.g., migrate to a VPS/K8s) without rewriting app logic; DB abstracted behind a repository layer to ease SQLite → PostgreSQL migration |
| **Reliability** | `pm2 startup` + `systemctl enable cloudflared` ensures both app and tunnel survive VM/host reboots |
| **Observability / Logging** | `pm2 logs`, `pm2 monit` for real-time metrics; rotate logs via `pm2-logrotate` module; optional integration with Cloudflare Analytics dashboard for edge traffic |
| **Backup** | Nightly cron job to copy SQLite DB file + `.env` (encrypted) to a secondary location (external drive/cloud storage) |
| **Maintainability** | Clear folder separation (`/client`, `/server`), documented `.env.example`, README with setup instructions |

**PM2 Monitoring Setup:**
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 monit
```

---

## 6. Step-by-Step Implementation Roadmap

### Milestone 1 — Local Environment & Repository Clone
- [ ] Provision Ubuntu Server VM in VMware (bridged network, static local IP via router DHCP reservation)
- [ ] `sudo apt update && sudo apt upgrade -y`
- [ ] Install `nvm`, then Node.js LTS: `nvm install --lts`
- [ ] Install `git`, clone the repo:
  ```bash
  git clone https://github.com/Deepdp7/Web-world.git
  cd Web-world
  ```
- [ ] Scaffold folder structure if not already present:
  ```
  Web-world/
  ├── client/          # React + Vite app
  ├── server/          # Express API
  │   ├── index.js
  │   ├── routes/
  │   ├── controllers/
  │   └── db/
  ├── ecosystem.config.js
  ├── .env.example
  └── README.md
  ```
- [ ] Install dependencies in both `client/` and `server/`
- [ ] Create `.env` from `.env.example` and fill in real values

### Milestone 2 — Build & PM2 Process Manager Configuration
- [ ] Build the React frontend: `cd client && npm run build`
- [ ] Configure Express to serve the built static files (or configure Nginx to serve `client/dist` directly and proxy `/api` to Express)
- [ ] Install PM2 globally: `npm install -g pm2`
- [ ] Add `ecosystem.config.js` (see Section 3.5)
- [ ] Start and verify:
  ```bash
  pm2 start ecosystem.config.js --env production
  pm2 status
  curl http://localhost:5000/api/health
  ```
- [ ] Persist PM2 across reboots: `pm2 save && pm2 startup systemd`

### Milestone 3 — Cloudflare Tunnel & Domain Routing Configuration
- [ ] Add `waveword.in` to Cloudflare, note the two assigned nameservers
- [ ] In Hostinger dashboard, update nameservers to Cloudflare's
- [ ] Install `cloudflared` on the Ubuntu VM
- [ ] Authenticate: `cloudflared tunnel login`
- [ ] Create tunnel and config file per Section 4.2
- [ ] Route DNS: `cloudflared tunnel route dns webworld-tunnel waveword.in`
- [ ] Install as a service: `sudo cloudflared service install && sudo systemctl enable --now cloudflared`
- [ ] In Cloudflare dashboard → SSL/TLS → set mode to "Full" and enable "Always Use HTTPS" + HSTS
- [ ] Set up UFW (deny all inbound except SSH) and confirm no port-forwarding is needed on the home router

### Milestone 4 — Verification, CI/CD Pipeline, and Maintenance
- [ ] Verify public access: visit `https://waveword.in`, confirm valid padlock/SSL, test on mobile + desktop
- [ ] Run Lighthouse audit; fix any performance/accessibility flags
- [ ] Test the contact form end-to-end (submission → DB row → email notification)
- [ ] Set up a simple CI pipeline (GitHub Actions) that, on push to `main`:
  - Runs lint/tests
  - SSHes into the home server (or triggers a self-hosted GitHub Actions runner on the VM) to `git pull`, rebuild client, and `pm2 restart webworld-api`
  ```yaml
  # .github/workflows/deploy.yml (self-hosted runner approach)
  name: Deploy Web-world
  on:
    push:
      branches: [main]
  jobs:
    deploy:
      runs-on: self-hosted
      steps:
        - uses: actions/checkout@v4
        - run: cd client && npm ci && npm run build
        - run: cd server && npm ci
        - run: pm2 restart webworld-api
  ```
- [ ] Set up a nightly cron backup of the SQLite DB and `.env`
- [ ] Document the full runbook in `README.md` (setup, deploy, rollback, troubleshooting `pm2 logs` / `cloudflared` logs)
- [ ] Ongoing maintenance: monthly `apt upgrade`, PM2/Node version checks, Cloudflare Analytics review, dependency audit (`npm audit`)

---

## Appendix A — Instructions for AI Coding Agent Handoff

When passing this PRD to a coding agent (e.g., AntiGravity, Claude Code, Cursor):
1. Provide this document in full as the primary spec.
2. Instruct the agent to scaffold the `client/` (Vite + React + Tailwind) and `server/` (Express) folders exactly per Section 3.6's structure.
3. Have it implement features in priority order: F1 → F2 → F3 → F5 → F7 → F8 → F9, before Phase 2 items (F4, F6, F10–F12).
4. Have it generate the `ecosystem.config.js`, `.env.example`, and a `README.md` runbook covering Milestones 1–4 verbatim.
5. Explicitly instruct it **not** to hardcode secrets, and to use `.env` + `dotenv` throughout.
6. Ask it to include a `/api/health` endpoint from the very first commit, since Milestone 2 verification depends on it.