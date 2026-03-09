# Deploy Auspico to Your Domain

This guide covers how to put your site live on your own domain (e.g. **auspico.com** or **auspico.in**).

---

## Overview

1. **Deploy** the Node.js app to a host (PaaS or VPS).
2. **Point your domain** to that host (DNS).
3. **Enable HTTPS** (SSL) — most hosts do this automatically.

Your app already uses `process.env.PORT`, so it works on any host that sets `PORT`.

---

## Option 1: Deploy with a PaaS (easiest)

Good if you want: connect GitHub → auto deploy, free tier, HTTPS by default.

### A. Render (free tier, custom domain)

1. **Sign up:** [render.com](https://render.com) (GitHub login).
2. **New Web Service:** Dashboard → **New +** → **Web Service**.
3. **Connect repo:** Choose **Adii1002/auspico.in** (or connect GitHub and select the repo).
4. **Settings:**
   - **Name:** `auspico` (or any name).
   - **Runtime:** Node.
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Plan:** Free.
5. **Deploy:** Click **Create Web Service**. Render builds and runs your app. You get a URL like `https://auspico-xxxx.onrender.com`.
6. **Custom domain:**
   - In the service → **Settings** → **Custom Domains** → **Add custom domain**.
   - Enter `auspico.in` (or `www.auspico.in`, or `auspico.com`).
   - Render shows you the **CNAME** or **A record** to add in your DNS (see “Domain & DNS” below).

### B. Railway (free tier, custom domain)

1. **Sign up:** [railway.app](https://railway.app) (GitHub login).
2. **New project:** **New Project** → **Deploy from GitHub repo** → select **auspico.in**.
3. Railway detects Node and runs `npm install` and `npm start`. You get a URL like `https://auspico-production-xxxx.up.railway.app`.
4. **Custom domain:** Project → **Settings** → **Domains** → **Custom Domain** → add `auspico.in` (or your domain). Use the CNAME/A value they give you in your DNS.

### C. Other PaaS options

- **Fly.io** — `fly launch` and add custom domain.
- **Cyclic** — Connect GitHub, add domain in dashboard.
- **Vercel** — Best for serverless; needs small changes for Express (e.g. serverless function wrapper).

---

## Option 2: Deploy on a VPS (full control)

Use this if you have or want a server (DigitalOcean, AWS EC2, Linode, etc.).

### 1. Server (e.g. Ubuntu 22.04)

- Create a droplet/instance (1 GB RAM is enough).
- SSH in: `ssh root@your-server-ip`

### 2. Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Install PM2 (keeps Node running)

```bash
sudo npm install -g pm2
```

### 4. Clone your repo and run

```bash
cd /var/www
sudo git clone https://github.com/Adii1002/auspico.in.git auspico
cd auspico
npm install --production
PORT=3000 pm2 start server.js --name auspico
pm2 save
pm2 startup   # run the command it prints so PM2 starts on reboot
```

Your app is now running on port 3000 (only reachable on the server for now).

### 5. Nginx (reverse proxy + HTTPS)

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

Create Nginx config:

```bash
sudo nano /etc/nginx/sites-available/auspico
```

Paste (replace `auspico.in` with your domain):

```nginx
server {
    listen 80;
    server_name auspico.in www.auspico.in;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and get SSL:

```bash
sudo ln -s /etc/nginx/sites-available/auspico /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d auspico.in -d www.auspico.in
```

Certbot will add HTTPS and redirect HTTP → HTTPS.

---

## Domain & DNS

Where you bought the domain (GoDaddy, Namecheap, Cloudflare, etc.) has a **DNS** section. You only add records there; the host (Render/Railway/VPS) tells you what to add.

### If you use Render or Railway

- They give a **CNAME** target, e.g. `auspico-xxxx.onrender.com` or `your-app.up.railway.app`.
- In your DNS:
  - **Type:** CNAME  
  - **Name:** `@` (root) or `www`  
  - **Value / Target:** the host URL they gave you  
  - **TTL:** 3600 or Auto  

Some registrars don’t allow CNAME on root (`@`). Then either:
- Use **www.auspico.in** as CNAME and redirect root to www, or  
- Use their **A record** if the host provides an IP.

### If you use your own VPS

- **A record:**  
  - **Name:** `@` (and optionally `www`)  
  - **Value:** your server’s **public IP**  
  - **TTL:** 3600  

DNS can take 5–60 minutes to update. Check with: `dig auspico.in` or [whatsmydns.net](https://www.whatsmydns.net).

---

## Checklist

| Step | Action |
|------|--------|
| 1 | Deploy app to Render / Railway / VPS |
| 2 | Note the app URL (e.g. `https://auspico-xxxx.onrender.com`) or your server IP |
| 3 | In your domain’s DNS, add CNAME or A record pointing to that host |
| 4 | On PaaS: add custom domain in dashboard; on VPS: Nginx + Certbot already use your domain |
| 5 | Wait for DNS; then open `https://yourdomain.com` |

---

## After deploy

- **Contact form:** Right now submissions are only stored in memory. To get emails, add something like [Nodemailer](https://nodemailer.com/) or a form service (Formspree, etc.) and wire it to your `POST /contact` handler.
- **Updates:** Push to `main` on GitHub; Render/Railway auto-deploy. On VPS: `cd /var/www/auspico && git pull && pm2 restart auspico`.

If you tell me your domain (e.g. auspico.in vs auspico.com) and whether you prefer PaaS or VPS, I can give you exact DNS values and host steps.
