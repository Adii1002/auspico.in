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

Submissions are validated (name, email, message required; phone optional). On success, users are redirected to `/contact?success=1`; on validation error, to `/contact?error=...`. In production you can plug in email (e.g. Nodemailer) or save to a database.

## Contact details (site)

- **Website:** auspico.com  
- **Email:** customerservice@auspico.com  
- **Phone:** +91 70209 20064  

## Deploy

1. Set `PORT` if needed (default 3000).
2. Run `npm install --production` and `npm start` (or use a process manager like PM2).
3. Put a reverse proxy (e.g. Nginx) in front for HTTPS and static caching if desired.
