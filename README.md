# 🪔 PujaSewa Nepal

> Nepal's first digital platform for booking verified Hindu priests (Pandits), ceremony packages, decorations, and religious services online.

![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E)
![React](https://img.shields.io/badge/React-18.x-61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)
![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748)
![Redis](https://img.shields.io/badge/Redis-7-DC382D)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)

---

## 📖 Overview

**PujaSewa Nepal** is a production-grade SaaS platform that modernizes the process of hiring Hindu priests and managing religious ceremonies across Nepal.

Users can easily discover verified Pandits, select ceremony packages, book decorations, make secure payments, receive real-time updates, and manage events from a centralized dashboard.

The platform also provides powerful administrative tools for managing bookings, inventory, payments, content, and platform operations.

---

## 🎯 Vision

Our mission is to preserve Nepal's religious traditions while making ceremony planning simple, transparent, and accessible through technology.

Whether it is:

- 🪔 Puja
- 👶 Nwaran
- 🎓 Bratabandha
- 💍 Marriage Ceremony
- 🕊️ Funeral Rituals
- 🏠 Griha Pravesh
- 🌿 Rudri & Mahamrityunjaya
- 🙏 Satyanarayan Puja
- 📿 Special Religious Events

PujaSewa connects families with trusted and verified priests in just a few clicks.

---

# ✨ Features

## 👤 Customer Features

### Authentication & Security

- Secure JWT Authentication
- Refresh Tokens
- Email Verification
- Password Reset
- Social Login (Optional)
- Session Management

### Pandit Discovery

- Browse Verified Pandits
- Search by District
- Search by Event Type
- Search by Language
- Search by Specialization
- Ratings & Reviews

### Booking Management

- Instant Booking
- Schedule Future Ceremonies
- Select Ceremony Package
- Add Decoration Services
- Add Required Materials
- Booking Status Tracking

### Payment System

- Khalti Integration
- eSewa Integration
- QR-Based Payments
- Payment Verification
- Invoice Generation

### Notifications

- Booking Confirmations
- Event Reminders
- Payment Updates
- Cancellation Alerts
- SMS Notifications
- Email Notifications

### User Dashboard

- Upcoming Events
- Booking History
- Saved Pandits
- Reviews & Ratings
- Profile Management

---

## 🙏 Pandit Features

### Professional Profile

- Bio & Experience
- Specializations
- Languages
- Service Areas
- Availability Schedule
- Verification Status

### Booking Calendar

- Daily Schedule
- Upcoming Ceremonies
- Booking Requests
- Event Details

### Earnings Dashboard

- Total Earnings
- Monthly Revenue
- Pending Payouts
- Transaction History

### Availability Management

- Vacation Mode
- Time Slot Management
- Booking Limits

### Emergency Reassignment

- Backup Pandit System
- Automatic Reallocation
- Customer Notifications

---

## 🛠️ Admin Features

### Dashboard

- Total Users
- Total Pandits
- Total Bookings
- Revenue Analytics
- Daily Activity Metrics

### User Management

- Customer Management
- Role Management
- Account Suspension
- Account Verification

### Pandit Management

- Application Review
- Verification Process
- Approval/Rejection Workflow
- Performance Monitoring

### Booking Management

- Booking Monitoring
- Manual Intervention
- Dispute Resolution

### Payment Management

- Pending Payments
- Payment Verification
- Refund Handling
- Financial Reports

### Inventory Management

- Puja Materials
- Pricing Management
- Stock Tracking

### Package Management

- Ceremony Packages
- Decoration Packages
- Pricing Configuration

### CMS

- About Us
- Contact Pages
- Blogs
- SEO Settings

### Audit Logs

- Admin Activity Tracking
- Security Logs
- Change History

---

# 🚀 Advanced Platform Features

## Real-Time System

- Socket.IO Integration
- Live Notifications
- Booking Status Updates
- Real-Time Availability

## Queue Processing

- BullMQ
- Background Jobs
- Email Processing
- SMS Processing
- Reminder Scheduling

## Caching

- Redis Caching
- API Optimization
- Session Storage

## Monitoring

- Health Checks
- Error Tracking
- Winston Logging
- Prometheus Metrics

## Security

- Rate Limiting
- Helmet Security
- CORS Protection
- Input Validation
- XSS Prevention
- SQL Injection Prevention

---

# 🏗️ Technology Stack

## Backend

| Technology | Purpose |
|------------|----------|
| NestJS | Backend Framework |
| TypeScript | Programming Language |
| PostgreSQL | Database |
| Prisma ORM | Database ORM |
| Redis | Caching & Queues |
| BullMQ | Background Jobs |
| Passport.js | Authentication |
| JWT | Authorization |
| Socket.IO | Real-Time Communication |
| Nodemailer | Email Services |
| Winston | Logging |
| Swagger | API Documentation |

---

## Frontend

| Technology | Purpose |
|------------|----------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| React Router | Routing |
| Zustand | State Management |
| TanStack Query | Server State |
| Tailwind CSS | Styling |
| Shadcn/UI | UI Components |
| React Hook Form | Forms |
| Zod | Validation |
| Axios | HTTP Client |
| Socket.IO Client | Real-Time Updates |

---

## DevOps

| Technology | Purpose |
|------------|----------|
| Docker | Containerization |
| Docker Compose | Environment Management |
| Nginx | Reverse Proxy |
| GitHub Actions | CI/CD |
| Let's Encrypt | SSL Certificates |

---

# 📂 Project Structure

```text
pujasewa-nepal/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   │
│   ├── src/
│   │
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── pandits/
│   │   ├── bookings/
│   │   ├── payments/
│   │   ├── packages/
│   │   ├── inventory/
│   │   ├── cms/
│   │   ├── reviews/
│   │   ├── notifications/
│   │   ├── analytics/
│   │   ├── ai/
│   │   ├── websocket/
│   │   ├── queue/
│   │   ├── common/
│   │   └── config/
│   │
│   └── test/
│
├── frontend/
│   ├── src/
│   │
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── types/
│   │   └── i18n/
│   │
│   └── public/
│
├── infrastructure/
│   ├── nginx/
│   ├── docker/
│   └── ssl/
│
├── docs/
├── .github/
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

---

# 🚀 Quick Start

## Prerequisites

- Node.js 20+
- PostgreSQL 16+
- Redis 7+
- Docker & Docker Compose

---

## Clone Repository

```bash
git clone https://github.com/your-org/pujasewa-nepal.git

cd pujasewa-nepal
```

---

## Environment Variables

### Backend

Create:

```bash
backend/.env
```

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/pujasewa

JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret

REDIS_HOST=localhost
REDIS_PORT=6379

FRONTEND_URL=http://localhost:5173

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=example@mail.com
SMTP_PASS=password

KHALTI_SECRET_KEY=xxxxxxxx
ESEWA_SECRET_KEY=xxxxxxxx
```

---

### Frontend

Create:

```bash
frontend/.env
```

```env
VITE_API_URL=http://localhost:3000/api/v1
```

---

## Start Development Environment

```bash
docker-compose up -d
```

Services:

| Service | Port |
|----------|--------|
| Frontend | 5173 |
| Backend | 3000 |
| PostgreSQL | 5432 |
| Redis | 6379 |

---

## Database Setup

Run migrations:

```bash
docker-compose exec backend npx prisma migrate dev
```

Seed database:

```bash
docker-compose exec backend npx prisma db seed
```

---

## Access Application

| Service | URL |
|----------|------|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000/api/v1 |
| Swagger Docs | http://localhost:3000/api/docs |

---

# 📘 API Documentation

After starting the backend:

```text
http://localhost:3000/api/docs
```

Swagger provides:

- Endpoint Documentation
- Request Schemas
- Response Schemas
- Authentication Flow
- Testing Interface

---

# 🧪 Testing

## Backend

```bash
cd backend

npm run test

npm run test:e2e

npm run test:cov
```

## Frontend

```bash
npm run test
```

---

# 🔒 Security

The platform follows modern security best practices:

- JWT Authentication
- Refresh Token Rotation
- Password Hashing (bcrypt)
- Role-Based Access Control (RBAC)
- Two-Factor Authentication
- Rate Limiting
- Input Validation
- CORS Protection
- Helmet Security Headers
- Audit Logging
- Encrypted Secrets

---

# 📈 Scalability

PujaSewa is designed using a **Modular Monolith Architecture** that can later evolve into microservices.

Future service extraction:

- Authentication Service
- Booking Service
- Payment Service
- Notification Service
- Analytics Service
- AI Recommendation Service

This approach keeps infrastructure costs low during the startup phase while remaining enterprise-ready.

---

# 🚀 Deployment

## Production Build

Backend:

```bash
cd backend

npm run build
```

Frontend:

```bash
cd frontend

npm run build
```

---

## Docker Deployment

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## CI/CD Pipeline

GitHub Actions automatically:

- Run Tests
- Build Applications
- Create Docker Images
- Deploy to VPS
- Restart Containers

---

# 🌏 Future Roadmap

- Mobile Applications (Flutter)
- AI-Based Pandit Recommendation
- Voice-Based Booking
- Multi-Language Support
- Live Video Consultation
- Astrology Services
- Online Puja Streaming
- Donation System
- Temple Marketplace
- Religious Event Management

---

# 🤝 Contributing

We welcome contributions from the community.

```bash
# Fork Repository

# Create Feature Branch
git checkout -b feature/new-feature

# Commit Changes
git commit -m "Added new feature"

# Push Changes
git push origin feature/new-feature
```

Then create a Pull Request.

---

# 📄 License

Licensed under the MIT License.

See the `LICENSE` file for more information.

---

# 🙏 Acknowledgements

Special thanks to:

- Hindu Priests across Nepal
- Open Source Community
- Contributors and Testers
- Nepalese Cultural Organizations

---

## ❤️ Built for Nepal

**PujaSewa Nepal** aims to bridge ancient traditions with modern technology, making religious services accessible, trustworthy, and convenient for every Nepali family.

**Made with ❤️ in Nepal 🇳🇵**