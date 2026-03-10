# EmailJS setup – step-by-step guide

This guide walks you through setting up **EmailJS** so that when someone submits the contact form on your site, you receive an email at **auspico.dev@gmail.com** (or any address you choose).

---

## Step 1: Create an EmailJS account

1. Go to **[https://www.emailjs.com/](https://www.emailjs.com/)**
2. Click **Sign Up** (top right)
3. Register with your email or Google
4. Confirm your email if asked

---

## Step 2: Add an email service (Gmail)

1. In the EmailJS dashboard, go to **Email Services** (left sidebar)
2. Click **Add New Service**
3. Choose **Gmail**
4. **Service name:** e.g. `auspico_contact`
5. Click **Connect Account** and sign in with the Gmail account that will **send** the emails (e.g. auspico.dev@gmail.com). Allow access.
6. Click **Create Service**
7. **Copy the Service ID** (e.g. `service_abc123`) – you’ll need it later

---

## Step 3: Create an email template

1. In the left sidebar, go to **Email Templates**
2. Click **Create New Template**
3. **Name:** e.g. `Auspico Contact Form`
4. **Content** – use the variables below so the form data appears in the email:

   **Subject (Subject line):**
   ```
   [Auspico] Contact from {{from_name}}
   ```

   **Body (Content):**
   ```
   New contact form submission:

   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{from_phone}}

   Message:
   {{message}}
   ```

5. **To email:** Enter the address that should **receive** the emails (e.g. `auspico.dev@gmail.com`)
6. **Reply-To (optional):** `{{from_email}}` so you can reply directly to the customer
7. Click **Save**
8. **Copy the Template ID** (e.g. `template_xyz789`) – you’ll need it later

---

## Step 4: Get your Public Key

1. In the left sidebar, go to **Account** (or **API Keys** / **General**)
2. Find **Public Key** (or **API Key**)
3. **Copy the Public Key** (e.g. `AbCdEfGh123456`) – you’ll need it next

---

## Step 5: Add the keys to your project

1. In your project folder, copy the example env file (if you don’t have a `.env` yet):
   ```bash
   cp .env.example .env
   ```
2. Open `.env` in an editor
3. Set these three values (use the IDs you copied):

   ```env
   EMAILJS_SERVICE_ID=service_xxxxx
   EMAILJS_TEMPLATE_ID=template_xxxxx
   EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

4. Save the file. **Do not commit `.env`** – it’s in `.gitignore` and must stay private.

---

## Step 6: Restart your app and test

1. Restart your Node server:
   ```bash
   npm start
   ```
2. Open the contact page: `http://localhost:3000/contact`
3. Fill the form and click **Send message**
4. Check the inbox of the “To email” you set in the template (e.g. auspico.dev@gmail.com). You should receive the contact email.

---

## Template variables used by this project

The contact form sends these variables to EmailJS. Your template **must** use the same names:

| Variable    | Meaning              | Example        |
|------------|----------------------|----------------|
| `{{from_name}}`  | Sender’s name        | John           |
| `{{from_email}}` | Sender’s email       | john@example.com |
| `{{from_phone}}` | Sender’s phone       | +91 98765 43210 |
| `{{message}}`    | Message text         | Hello, I want… |

If you use different names in the template, the form won’t fill them. Stick to these four.

---

## Troubleshooting

| Issue | What to do |
|-------|------------|
| No email received | Check spam; confirm “To email” in the template; check EmailJS dashboard for errors. |
| “EmailJS error” in browser console | Confirm Service ID, Template ID, and Public Key in `.env`; restart the server. |
| Form says “Thank you” but no email | Submission is saved on the server; EmailJS may have failed. Check EmailJS dashboard and browser console. |
| Emails go to spam | In Gmail, mark as “Not spam”; over time delivery usually improves. |

---

## Free tier limits

EmailJS free plan has a monthly limit (e.g. 200 emails/month). For more, see [EmailJS pricing](https://www.emailjs.com/pricing/).

---

## Summary checklist

- [ ] EmailJS account created  
- [ ] Gmail service added and **Service ID** copied  
- [ ] Email template created with `{{from_name}}`, `{{from_email}}`, `{{from_phone}}`, `{{message}}` and **Template ID** copied  
- [ ] **Public Key** copied from Account/API Keys  
- [ ] `.env` created with `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`  
- [ ] Server restarted and contact form tested  

Once these are done, every contact form submission will both be saved on your server (and visible in the admin page) and sent to your inbox via EmailJS.
