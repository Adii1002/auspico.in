# Auspico — Professional Cafe POS Website

Marketing website for **Auspico**, an AI-powered cafe POS: table-wise QR ordering, AI-generated menus, and no-code management for cafe owners. Built with **Express.js** and **EJS**.

## Tech stack

- **Node.js** + **Express** — server and routes
- **EJS** — server-side templates (layout, partials)
- **express-validator** — contact form validation
- **Plain CSS** — responsive, cafe-inspired design
- **Vanilla JS** — mobile menu, scroll effects

## Project structure

```
auspico/
├── server.js           # Express app, routes, contact POST
├── package.json
├── views/
│   ├── partials/       # header.ejs, footer.ejs
│   ├── home.ejs
│   ├── about.ejs
│   ├── features.ejs
│   ├── contact.ejs
│   └── 404.ejs
└── public/
    ├── css/styles.css
    └── js/main.js
```

## Routes

| Route       | Description                    |
|------------|--------------------------------|
| `GET /`    | Home                           |
| `GET /about` | About Us                     |
| `GET /features` | Features (detailed)        |
| `GET /contact` | Contact Us + form           |
| `POST /contact` | Contact form submission    |
| 404        | Page not found                |

## Run locally

```bash
npm install
npm start
```

Open **http://localhost:3000**.

## Contact form

Submissions are validated (name, email, message required; phone optional). On success, users are redirected to `/contact?success=1`; on validation error, to `/contact?error=...`. Data is stored in memory (resets on restart).

**Email:** Contact form uses **EmailJS** to send you an email when someone submits. See **[EMAILJS_SETUP.md](./EMAILJS_SETUP.md)** for a step-by-step guide. Set `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, and `EMAILJS_PUBLIC_KEY` in `.env`. If not set, submissions are still saved and shown on the admin page; no email is sent.

**Admin page:** View submissions at `/admin/contacts`. To protect it, set env var `ADMIN_KEY` to a secret; then open `https://yoursite.com/admin/contacts?key=YOUR_SECRET`. If `ADMIN_KEY` is not set, the page is open (use only for local dev). See `.env.example`.

## Contact details (site)

- **Website:** auspico.in  
- **Email:** auspico.dev@gmail.com  
- **Phone:** +91 8432431002 

## Deploy to your domain

See **[DEPLOY.md](./DEPLOY.md)** for the full procedure. Summary:

1. **Deploy** the app to a host (e.g. [Render](https://render.com) or [Railway](https://railway.app) — connect GitHub, they build and run Node).
2. **Add your domain** in the host’s dashboard (e.g. auspico.in).
3. **DNS:** In your domain registrar, add the CNAME or A record the host gives you (points your domain to the app).
4. **HTTPS** is usually automatic on PaaS; on a VPS use Nginx + Let’s Encrypt (steps in DEPLOY.md).
