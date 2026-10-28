# IMovies — Movie Ticket Booking Made Simple

> **Project Category:** Full-Stack Commercial Cinema Booking Web Platform  
> **Project Owner:** Aditya Vishwakarma  
> **Stack:** MERN (MongoDB, Express.js, React.js 18 / Vite, Node.js v24) with Socket.IO, Multer & Razorpay  
> **Repository:** [binarybrain-7/iMovies---Movie-Ticket-Booking-Made-Simple](https://github.com/binarybrain-7/iMovies---Movie-Ticket-Booking-Made-Simple)

---

## 1. Project Overview

**IMovies** is a comprehensive, production-ready cinema ticket booking web platform delivering a commercial multiplex booking experience. Inspired by leading platforms such as BookMyShow and Cinepolis, the application enables cinema-goers to discover movies, browse theatres and schedules, select auditorium seats in real-time with live concurrency locking, apply bank discounts, complete payments, view digital tickets with cryptographic QR verification, and track bookings.

The platform includes an **Administration Control Suite** allowing cinema managers to manage movies, theatres, screens, seat tiers, show timings, and financial revenue reports.

---

## 2. Key Features

### 🎬 Commercial Cinema Seat Selection (Cinepolis Style)
- **Authentic Auditorium Geometry:** Custom-designed 184-seat layout matching **Cinepolis Bansal Plaza, Bhopal** across 6 distinct pricing tiers:
  - **RECLINER: ₹690** (Row L — 11 seats configured in couple pods: `[11, 10]`, `[9, 8]`, `[7, 6]`, `[5, 4]`, `[3, 2]`, `[1]`).
  - **PREMIUM PLUS: ₹230** (Row K — 15 seats with left, center, and right aisles).
  - **PREMIUM XL: ₹230** (Row J — 13 seats with designated wheelchair-accessible indicators ♿ on seats 9 & 6).
  - **PREMIUM: ₹210** (Rows I, H, G, F, E — with electric blue sweet-spot central viewing highlights).
  - **EXECUTIVE: ₹210** (Rows D, C, B — 15 seats with walkway aisle).
  - **NORMAL: ₹210** (Row A — 15 seats nearest to screen).
- **Seat Number Orientation:** Exact cinema numbering descending from left to right as configured.
- **Auditorium Screen Indicator:** Shallow curved purple cinema screen (`All eyes this way — Cinema Screen`) with upper glow edge facing up towards the audience.
- **Seat State Styling:** Available (dark squircle with thin border), Selected (vivid purple `#6B5CF6` with glow), Booked (muted dark gray `#18181C`), Reserved / Locked (amber `#78350F`), and Prime viewing (blue outline `#2563EB`).
- **Interactive Zoom & Pan:** Viewport controls (`Zoom In`, `Zoom Out`, `100% Reset`) for effortless mobile and desktop navigation.
- **Partner Offers Strip:** Integrated bank discount bar (`[Visa][Axis][Mastercard][RuPay] 40 offers >`) with an interactive modal displaying instant discount codes (e.g., `AXISBOGO`, `VISA20`, `ICICI25`, `RUPAY50`, `PAYTM50`).
- **Fixed Bottom Booking Panel:** High-contrast mobile-friendly footer displaying selected seat count, live pricing breakdown, and a prominent white `Proceed` button.

### ⚡ Concurrency-Safe Real-Time Seat Locking
- **Socket.IO Real-Time Sync:** Broadcasts live seat locks, releases, and confirmed bookings across simultaneous clients without page reloads.
- **5-Minute Temporary Seat Lock:** Atomic, concurrency-safe seat locking engine prevents double bookings and holds seats for 5 minutes during checkout.
- **Server-Side Price Calculation:** Tickets subtotal, 18% GST, and convenience fees are computed strictly on the backend to prevent client-side price tampering.

### 🖼️ Direct Device Poster Upload Engine
- **Multer Disk Storage:** High-performance file upload supporting JPG, PNG, WEBP, AVIF, and GIF directly from the user's computer (up to 10MB) into `server/public/uploads/posters/`.
- **Live Preview Frames:** Instant visual preview with cinema borders before uploading.
- **Poster Replacement:** Administrators can replace posters directly from movie cards or the creation form.
- **Pre-configured Cinema Artwork:** Official high-resolution posters configured for *Drishyam: The Conclusion*, *The Raja Saab*, *OG*, *Toxic*, and *Kantara: Chapter 1*.

### 💾 Persistent Local Database Storage
- **Zero Data Loss:** Configured with MongoDB's `wiredTiger` storage engine persisting directly to disk in `.mongodb_data/`. Movies, custom posters, user accounts, and bookings are permanently retained across server restarts and machine reboots.

### 🛡️ Administration Management Suite
- **Manage Movies (`/admin/manage-movies`):** Search, genre filtering, status badges, quick edit modal, poster replacement, and deletion guards.
- **Manage Theatres (`/admin/manage-theatres`):** Create and edit theatres, location details, active status toggles.
- **Manage Screens (`/admin/manage-screens`):** Screen creation, tier pricing configuration, live seat layout preview, and safe deletion.
- **Manage Shows (`/admin/manage-shows`):** Multi-theatre show scheduling with automated conflict detection (preventing overlapping showtimes on the same screen).
- **Admin Dashboard (`/admin/dashboard`):** Real-time analytics, revenue reports, total bookings counter, and active shows telemetry.

### 💳 Payments & Digital Tickets
- **Flexible Payment Gateway:** Dual-mode payment processing supporting **Razorpay** checkout and development **Sandbox Simulation**.
- **Digital Tickets with QR Codes:** Instant digital tickets with verifiable QR verification tokens, printable to PDF.
- **Ticket Verification Portal (`/verify-ticket`):** Real-time scanner / lookup for cinema ushers to validate entry.

---

## 3. Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 8, React Router v7, React Icons, Bootstrap 5 + Vanilla CSS, React Toastify, `qrcode.react`, Canvas Confetti |
| **Backend** | Node.js (v24), Express.js (MVC Pattern), Socket.IO, Multer (File Uploads) |
| **Database** | MongoDB / Mongoose v8 with persistent `wiredTiger` disk storage (`.mongodb_data/`) |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs password hashing, role-based route guards (`USER` / `ADMIN`) |
| **Testing** | Node.js native test runner (`node --test`), Supertest integration suite |

---

## 4. Directory Structure

```
IMovies/
|-- client/
|   |-- public/
|   |   |-- posters/             # Static cinema movie posters
|   |   |-- favicon.svg
|   |-- src/
|   |   |-- components/
|   |   |   |-- admin/           # Admin header, navigation tabs
|   |   |   |-- common/          # LoadingSpinner, ConfirmModal
|   |   |   |-- layout/          # Navbar, Footer
|   |   |   |-- movies/          # MovieCard
|   |   |   |-- seats/           # SeatMap (Cinepolis 184-seat auditorium)
|   |   |   |-- booking/         # DigitalTicket with QR code
|   |   |-- pages/
|   |   |   |-- Home.jsx         # Cinema landing page
|   |   |   |-- Movies.jsx       # Movie catalogue & filters
|   |   |   |-- MovieDetails.jsx # Movie info, cast, and reviews
|   |   |   |-- SelectShow.jsx   # Date & showtimes picker
|   |   |   |-- SeatSelection.jsx# Cinepolis seat selection & offers
|   |   |   |-- Payment.jsx      # Payment order & checkout
|   |   |   |-- BookingConfirmation.jsx # Confirmed ticket view
|   |   |   |-- MyBookings.jsx   # Customer booking history
|   |   |   |-- Favorites.jsx    # User watchlist
|   |   |   |-- TicketVerification.jsx # QR admission validation
|   |   |-- pages/admin/
|   |   |   |-- AdminDashboard.jsx # Telemetry & analytics
|   |   |   |-- ManageMovies.jsx   # Movie management & poster replacement
|   |   |   |-- AddMovie.jsx       # Create movie with device poster upload
|   |   |   |-- ManageTheatres.jsx # Theatre management
|   |   |   |-- ManageScreens.jsx  # Screen & seat tier configuration
|   |   |   |-- ManageShows.jsx    # Show schedule & conflict detection
|   |   |   |-- ManageBookings.jsx # Financial bookings table
|   |   |   |-- RevenueReports.jsx # Revenue analytics
|   |   |-- context/             # AuthContext, BookingContext, ThemeContext
|   |   |-- services/            # Axios API services (movie, show, screen, booking, etc.)
|   |   |-- styles/              # global.css, theme.css
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |-- package.json
|   |-- vite.config.js
|
|-- server/
|   |-- config/          # database.js (persistent disk engine), payment.js
|   |-- models/          # Movie, Show, Screen, Theatre, SeatLock, Booking, User, Payment
|   |-- controllers/     # movie, show, screen, theatre, booking, payment, admin controllers
|   |-- routes/          # RESTful routes under /api/v1
|   |-- middleware/      # authenticate, authorizeAdmin, upload (Multer), errorHandler, rateLimiter
|   |-- services/        # seatLockService, bookingService, paymentService, socketService
|   |-- public/
|   |   |-- uploads/     # Device uploaded posters directory
|   |-- scripts/         # autoSeed.js, updatePosters.js, createAdmin.js
|   |-- tests/           # api.test.js (30 automated integration tests)
|   |-- server.js
|   |-- package.json
|
|-- .mongodb_data/       # Persistent database files (WiredTiger engine)
|-- README.md
```

---

## 5. Getting Started & Setup

### Prerequisites
- **Node.js:** v18.0.0 or later (v24 recommended)
- **npm:** v9.0.0 or later

### Step 1: Clone the Repository
```bash
git clone https://github.com/binarybrain-7/iMovies---Movie-Ticket-Booking-Made-Simple.git
cd iMovies---Movie-Ticket-Booking-Made-Simple
```

### Step 2: Install Dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

## 6. Environment Configuration

### Backend (`server/.env`)
```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/imovies
JWT_SECRET=super_secret_imovies_jwt_token_key_change_in_production_987654321
CLIENT_URL=http://localhost:5173
API_BASE_URL=http://localhost:8000/api/v1

# Payment Configuration (Sandbox simulation enabled by default for demo)
PAYMENT_PROVIDER=sandbox
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# Admin initial credentials
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@imovies.com
ADMIN_PASSWORD=Admin@123456
```

### Frontend (`client/.env`)
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_SOCKET_URL=http://localhost:8000
VITE_PAYMENT_PROVIDER=sandbox
VITE_RAZORPAY_KEY_ID=
```

---

## 7. Running the Application

### 1. Launch Backend Server
```bash
cd server
npm run dev
# Server running at: http://localhost:8000
# Health check: http://localhost:8000/api/v1/health
```

### 2. Launch Frontend Client
In a separate terminal:
```bash
cd client
npm run dev
# Vite client running at: http://localhost:5173
```

Open your browser at **[http://localhost:5173](http://localhost:5173)**.

---

## 8. Default Credentials

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@imovies.com` | `Admin@123456` |
| **Customer** | `aditya@example.com` | `User@123456` |
| **Demo Customer** | `gvvdkumar@gmail.com` | `User@123456` |

---

## 9. Automated Testing

The backend includes a comprehensive automated test suite (`api.test.js`) validating:
- Health checks & system telemetry
- Customer registration & duplicate validation
- Role-based authorization (`USER` vs `ADMIN`)
- Movie catalogue search & genre filters
- Real-time seat availability maps (184-seat Cinepolis auditorium)
- Concurrency-safe seat locks (5-minute TTL) & conflict rejections
- Server-side subtotal, GST (18%), and fee calculations
- Sandbox payment order creation & verification
- Digital ticket cryptographic verification
- Admin Screen Management (Create screen, update screen, fetch screens)
- Show schedule conflict detection (overlapping slot rejection)

To execute all tests:
```bash
cd server
npm test
```
All **30 integration tests** pass cleanly with zero failures.

---

## 10. License & Author

- **Author:** Mohd Tanzeel Imam  
- **Project:** [iMovies — Movie Ticket Booking Made Simple](https://github.com/binarybrain-7/iMovies---Movie-Ticket-Booking-Made-Simple)  
