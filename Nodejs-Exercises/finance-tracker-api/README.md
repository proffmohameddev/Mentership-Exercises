# Personal Finance Tracker API

Node.js + Express + MongoDB. JWT auth, transactions, monthly summary, Cloudinary uploads, Swagger docs.

## Run it

```bash
npm install
cp .env.example .env      # then fill in the values
npm run dev
```

Docs: http://localhost:3000/docs

## Endpoints

| Tag | Method | Route |
| --- | --- | --- |
| Auth | POST | /auth/register |
| Auth | POST | /auth/login |
| Auth | GET | /auth/profile |
| Transactions | POST | /transactions |
| Transactions | GET | /transactions |
| Transactions | GET | /transactions/monthly-summary?month=2025-05 |
| Transactions | PUT | /transactions/:id |
| Transactions | DELETE | /transactions/:id |
| Categories | GET | /categories |
| Upload | POST | /upload/profile-picture |
| Admin | GET | /admin/overview |

## Deploy on Render

1. Push to GitHub, then New > Web Service.
2. Build command: `npm install`. Start command: `npm start`.
3. Add every variable from `.env.example` in the Environment tab (use a MongoDB Atlas URI).
4. Set `RENDER_URL` to your service URL so Swagger shows it in `servers`.
