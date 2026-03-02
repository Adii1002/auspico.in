const path = require('path');
const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// In-memory store for demo (replace with DB/email in production)
const contactSubmissions = [];

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional({ checkFalsy: true }).trim().isLength({ max: 20 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
];

app.get('/', (req, res) => {
  res.render('home', { title: 'Home', active: 'home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us', active: 'about' });
});

app.get('/features', (req, res) => {
  res.render('features', { title: 'Features', active: 'features' });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us',
    active: 'contact',
    success: req.query.success === '1',
    error: req.query.error,
  });
});

app.post(
  '/contact',
  contactValidation,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msg = errors.array().map((e) => e.msg).join(', ');
      return res.redirect('/contact?error=' + encodeURIComponent(msg));
    }
    const { name, email, phone, message } = req.body;
    contactSubmissions.push({ name, email, phone, message, createdAt: new Date().toISOString() });
    console.log('Contact form submission:', { name, email, phone });
    res.redirect('/contact?success=1');
  }
);

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found', active: null });
});

app.listen(PORT, () => {
  console.log(`Auspico website running at http://localhost:${PORT}`);
});
