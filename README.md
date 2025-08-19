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
- `POST /api/auth/login` with `{ email, password }` returns a JWT.
- Include header: `Authorization: Bearer <token>` for protected routes.
- All management routes are protected for `admin` by default in this scaffold.

## Endpoints (Summary)

### Patients
- `POST /api/patients` (admin) – create patient (+auto wallet)
- `GET /api/patients` (admin) – list
- `GET /api/patients/search?q=...` (admin) – search by name/email
- `GET /api/patients/:id` (admin)

### Medications (Inventory)
- `POST /api/medications` (admin) – add medication
- `PATCH /api/medications/:id` (admin) – update stock/price
- `GET /api/medications/low-stock` (admin) – items with stock < 10

### Prescriptions
- `POST /api/prescriptions` (admin) – create (computes totalPrice)
- `GET /api/prescriptions?patientId=&status=` (admin) – list/filter
- `PATCH /api/prescriptions/:id/status` (admin) – transition status
  - When moving `pending -> filled`, inventory stock is decremented
  - Payment moves `filled -> picked-up` (via Wallets)

### Wallets
- `GET /api/wallets/:patientId` (admin) – get wallet
- `GET /api/wallets/:patientId/transactions` (admin) – tx history
- `POST /api/wallets/:patientId/fund` (admin) – `{ amount }` credit
- `POST /api/wallets/:patientId/pay` (admin) – `{ prescriptionId }` debits and marks Rx `picked-up`

### Booking
- `POST /api/slots` (admin) – create appointment slot
- `GET /api/slots?date=YYYY-MM-DD` (admin) – list available slots by date
- `POST /api/bookings` (admin) – create booking `{ slotId, patientId }`
- `DELETE /api/bookings/:id` (admin) – cancel booking (frees slot)

## Postman
A Postman collection is included at: `postman/Pharmacy.postman_collection.json`

## Notes
- Proper error handling and validation are included for key endpoints.
- For production, add HTTPS, helmet/cors, rate-limits, and stronger auth policies.
- You can containerize quickly with Docker (compose) if desired.

## Bonus (optional ideas)
- Add user-facing endpoints (patients manage own wallet/booking) with role-based access.
- Add pagination on list endpoints.
- Add unit tests (Jest + supertest).
- Add rate limiting (express-rate-limit).
