# FlowCore Mailer

Centralized email microservice for all FlowCore Systems apps. Built with Node.js/Express + Nodemailer + Hostinger SMTP.

**Live at:** https://mail.2309apt.com

---

## Usage

```bash
POST /send
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

### Template-based send
```json
{
  "to": "recipient@example.com",
  "template": "contact_form",
  "data": {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "reason": "General inquiry",
    "message": "Hello..."
  }
}
```

### Raw send
```json
{
  "to": "recipient@example.com",
  "subject": "Hello",
  "html": "<p>Your message here</p>"
}
```

### Health check (no auth)
```bash
GET /health
→ {"status":"ok","service":"flowcore-mailer"}
```

---

## Available Templates

| Template | Subject format | Used by |
|---|---|---|
| `contact_form` | `New Submission - [Reason] - [Name]` | FlowCore website contact page |

---

## Adding a New Template

1. Create `src/templates/your_template.js` — export a function `({ ...data }) => ({ subject, html })`
2. Register it in `src/templates/index.js`
3. Redeploy

---

## Environment Variables

| Variable | Description |
|---|---|
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP port (465 for SSL) |
| `SMTP_SECURE` | `true` for SSL |
| `SMTP_USER` | SMTP username / from address |
| `SMTP_PASS` | SMTP password |
| `EMAIL_FROM` | Display name + address |
| `API_KEY` | Bearer token for all requests |
| `PORT` | Internal port (default 3000) |

Copy `.env.example` to `.env` and fill in values. Generate a new API key with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Deployment

Server path: `~/apps/flowcore-mailer/` on `10.0.0.57`

```bash
# Sync and rebuild
sshpass -p '<password>' rsync -az --exclude='node_modules' \
  flowcore-mailer/ jroques@10.0.0.57:~/apps/flowcore-mailer/

sshpass -p '<password>' ssh -o StrictHostKeyChecking=no jroques@10.0.0.57 \
  "cd ~/apps/flowcore-mailer && docker compose up -d --build"
```

---

## Stack

- **Runtime:** Node.js 20 (Alpine)
- **Framework:** Express 5
- **Email:** Nodemailer + Hostinger SMTP (`smtp.hostinger.com:465`)
- **Auth:** API key via `Authorization: Bearer` header
- **Container:** Docker on port 15124
- **Tunnel:** Cloudflare `2309apt-server` → `mail.2309apt.com`
