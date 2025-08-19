# Simplified Pharmacy Prescription System (Express + Sequelize + TypeScript)

A working API implementing Patients, Prescriptions, Inventory, Wallets, and Booking (slots & bookings) with JWT auth.

## Tech
- Express.js + TypeScript
- PostgreSQL + Sequelize (with migrations/seeders via `sequelize-cli`)
- JWT authentication
- Input validation (`express-validator`)

## Getting Started

### 1) Prereqs
- Node 18+
- PostgreSQL 13+
- Enable `pgcrypto` (for `gen_random_uuid()`): run `CREATE EXTENSION IF NOT EXISTS pgcrypto;` in your DB.

### 2) Clone & Install
```bash
npm install
cp .env.example .env
# then edit .env to match your Postgres credentials
```

### 3) Create DB & Run Migrations/Seeds
```bash
createdb pharmacy_dev   # or create via GUI
npx sequelize db:migrate
npx sequelize db:seed:all
```

### 4) Start Dev Server
```bash
npm run dev
# API runs on http://localhost:4000
# Seeded admin: admin@example.com / Admin@123
```

## Auth
- `POST /auth/login` with `{ email, password }` returns a JWT.
- Include header: `Authorization: Bearer <token>` for protected routes.
- All management routes are protected for `admin` by default in this scaffold.

## Endpoints (Summary)

### Patients
- `POST /patients` (admin) – create patient (+auto wallet)
- `GET /patients` (admin) – list
- `GET /patients/search?q=...` (admin) – search by name/email
- `GET /patients/:id` (admin)

### Medications (Inventory)
- `POST /medications` (admin) – add medication
- `GET /medications` (admin) - get all medications
- `PATCH /medications/:id` (admin) – update stock/price
- `GET /medications/low-stock` (admin) – items with stock < 10

### Prescriptions
- `POST /prescriptions` (admin) – create (computes totalPrice)
- `GET /prescriptions?patientId=&status=` (admin) – list/filter
- `PATCH /prescriptions/:id/status` (admin) – transition status
  - When moving `pending -> filled`, inventory stock is decremented
  - Payment moves `filled -> picked-up` (via Wallets)

### Wallets
- `GET /wallets/:patientId` (admin) – get wallet
- `GET /wallets/:patientId/transactions` (admin) – tx history
- `POST /wallets/:patientId/fund` (admin) – `{ amount }` credit
- `POST /wallets/:patientId/pay` (admin) – `{ prescriptionId }` debits and marks Rx `picked-up`

### Booking
- `POST /slots` (admin) – create appointment slot
- `GET /slots?date=YYYY-MM-DD` (admin) – list available slots by date
- `POST /bookings` (admin) – create booking `{ slotId, patientId }`
- `GET /bookings` (admin) - All bookings
- `GET /bookings/:id` (admin) - A booking
- `DELETE /bookings/:id` (admin) – cancel booking (frees slot)

## Postman
A Postman collection is included at: `postman/Pharmacy.postman_collection.json` and at: `https://postman.co/workspace/My-Workspace~2854002b-fb94-4a5d-8ae4-aa6327822fa6/collection/38281521-688197a6-e339-4c53-8670-4dd0cee167ce?action=share&creator=38281521&active-environment=38281521-eb84dc41-c570-481a-bb88-f515f8629dfb`

## Notes
- Proper error handling and validation are included for key endpoints.
- For production, add HTTPS, helmet/cors, rate-limits, and stronger auth policies.
- You can containerize quickly with Docker (compose) if desired.

## Bonus (optional ideas)
- Add user-facing endpoints (patients manage own wallet/booking) with role-based access.
- Add pagination on list endpoints.
- Add unit tests (Jest + supertest).
- Add rate limiting (express-rate-limit).
