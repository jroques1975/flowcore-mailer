require('dotenv').config();
const express = require('express');
const { sendMail } = require('./mailer');
const { renderTemplate } = require('./templates');

const app = express();
app.use(express.json());

// API key auth
app.use((req, res, next) => {
  if (req.path === '/health') return next();
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (token !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Health check — no auth required
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'flowcore-mailer' });
});

// Send email
app.post('/send', async (req, res) => {
  const { to, template, data, subject, html } = req.body;

  if (!to) return res.status(400).json({ error: 'Missing required field: to' });

  try {
    let mailOptions;

    if (template) {
      // Template-based send
      mailOptions = renderTemplate(template, data || {});
    } else if (subject && html) {
      // Raw send
      mailOptions = { subject, html };
    } else {
      return res.status(400).json({ error: 'Provide either "template" or "subject" + "html"' });
    }

    await sendMail({ to, ...mailOptions, replyTo: data?.email });
    console.log(`[mailer] Sent "${mailOptions.subject}" → ${to}`);
    res.json({ ok: true });
  } catch (err) {
    console.error('[mailer] Send failed:', err.message);
    res.status(500).json({ error: 'Failed to send email', detail: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[mailer] Running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});
