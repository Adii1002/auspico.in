# No email when clicking Submit? Fix it here

## 1. You must have a `.env` file (not just .env.example)

The app reads keys from **`.env`** in the project root. Copy the example and fill in your real values:

```bash
cp .env.example .env
```

Then edit **`.env`** and set:

- `EMAILJS_SERVICE_ID=service_xxxxx`  (from EmailJS → Email Services)
- `EMAILJS_TEMPLATE_ID=template_xxxxx` (from EmailJS → Email Templates — **must be the ID of the template you created**)
- `EMAILJS_PUBLIC_KEY=xxxx`           (from EmailJS → Account)

Save the file. **Restart the server** after changing `.env` (stop with Ctrl+C, then run `npm start` again).

---

## 2. Check the server log on startup

When you run `npm start`, you should see one of:

- **"Contact form: EmailJS is configured (emails will be sent)."** → Config is loaded; if you still don’t get mail, see steps 3–4.
- **"Contact form: EmailJS not configured. Add EMAILJS_..."** → `.env` is missing, wrong, or not loaded. Fix `.env` and restart.

---

## 3. Create the template in EmailJS and use its Template ID

1. Go to [EmailJS → Email Templates](https://dashboard.emailjs.com/admin/templates).
2. Create a template (or open the one you use for the contact form).
3. In the template, use these **exact** variables in the body: `{{from_name}}`, `{{from_email}}`, `{{from_phone}}`, `{{message}}`.
4. Set **To email** to the address that should receive the emails (e.g. auspico.dev@gmail.com).
5. Save and copy the **Template ID** (e.g. `template_6h0ov36`).
6. Put that ID in `.env` as `EMAILJS_TEMPLATE_ID=template_6h0ov36`.
7. Restart the server.

---

## 4. If it still doesn’t work: browser console

1. Open the contact page, press **F12** (or right‑click → Inspect) → **Console** tab.
2. Submit the form.
3. If you see **"EmailJS error: ..."**, the message is what’s wrong (e.g. wrong template ID, wrong service, or EmailJS account issue).

---

## Quick checklist

- [ ] File **`.env`** exists in the project root (same folder as `server.js`).
- [ ] `.env` contains `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` (no quotes, no spaces around `=`).
- [ ] `EMAILJS_TEMPLATE_ID` is the **real** ID from the EmailJS template (starts with `template_`).
- [ ] Server was **restarted** after editing `.env`.
- [ ] In EmailJS, the template **To email** is set to your inbox address.
