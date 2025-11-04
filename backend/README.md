# Backend — Book My Cinema

This is the backend server for Book My Cinema. The server is built using Node.js and Express.js, featuring MongoDB (Mongoose) for persistence, JWT-based auth, Cloudinary for media, Razorpay for payments, and Nodemailer for emails.

## Overview

The backend is a Node.js + Express application that provides APIs for authentication, movies, cinemas, shows, bookings, payments, revenue, and related functionality. It uses MongoDB (via Mongoose) for persistence, Cloudinary for media uploads, Razorpay for payments, and Nodemailer for email.

% This README documents the backend server for the Book My Cinema project.

## Table of Contents

- Tech Stack
- Server Configuration
- Project Structure
- API Routes
- Database Models
- Middlewares
- Controllers
- Utils
- Configuration
- Environment Variables

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Bcrypt for password hashing
- express-fileupload for file handling
- Cloudinary for media storage
- Nodemailer for email services
- Razorpay for payment integration

## Server Configuration

The server is configured in `server.js` with the following key features:

- CORS enabled
- JSON body parsing
- Cookie parsing
- File upload handling (`express-fileupload`)
- Database connection initialization (Mongoose)
- Cloudinary configuration
- Environment variables support via `dotenv`

Entrypoint: `server.js`

Scripts defined in `package.json` (backend):

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## Project Structure

```
backend/
├── config/         # Configuration files (DB, cloud services)
├── controllers/    # Request handlers and business logic
├── middlewares/    # Custom middleware functions
├── models/         # Database schemas and models
├── routes/         # API route definitions
├── utils/          # Utility and helper functions
├── server.js       # App entrypoint
├── package.json
├── .env            # Environment variables (not committed)
└── vercel.json     # Optional deployment config
```

### Brief file/folder descriptions

- `config/` — DB connection (`database.js`), Cloudinary (`cloudinary.js`), Razorpay (`razorpay.js`).
- `controllers/` — Handlers for auth, bookings, movies, cinemas, shows, payments, revenue.
- `middlewares/` — Authentication and authorization logic (`auth.js`).
- `models/` — Mongoose models: `User`, `Movie`, `Cinema`, `Show`, `Booking`, `Seat`, etc.
- `routes/` — Express routing files that map endpoints to controller methods.
- `utils/` — Helpers like `fileUploader.js` and `mailSender.js`.

## API Routes

This project groups endpoints under `/api/v1/` prefixes in the `routes/` folder. Example routes (check files in `routes/` for exact endpoints):

1. Auth Routes (`/api/v1/auth`)
	- `POST /signup` - Register new user
	- `POST /login` - User login
	- `POST /sendotp` - Send OTP for verification
	- `POST /reset-password-token` - Request password reset
	- `POST /reset-password` - Reset password
	- `POST /changepassword` - Change password (Auth required)

2. User/Profile Routes (`/api/v1/users`)
	- `GET /getUserDetails` - Get user information
	- `PUT /updateProfile` - Update profile details
	- `PUT /updateDisplayPicture` - Update profile picture

3. Movie Routes (`/api/v1/movie`)
	- `GET /getAllMovies` - Get all movies
	- `POST /createMovie` - Create a movie (admin)
	- `POST /getMovieDetails` - Get movie details

4. Cinema & Show Routes (`/api/v1/cinema`, `/api/v1/show`)
	- Create cinemas, screens, and shows
	- Fetch show times and seat maps

5. Booking & Payment Routes (`/api/v1/booking`, `/api/v1/payment`)
	- `POST /capturePayment` - Initialize payment
	- `POST /verifyPayment` - Verify payment
	- `POST /createBooking` - Create booking after payment

6. Revenue Routes (`/api/v1/revenue`)
	- Admin endpoints for revenue reporting

## Database Models

Key models used in this project (files under `models/`):

- `User` — account details, roles (user/admin), profile, tokens
- `Movie` — movie metadata, poster, casts, runtime
- `Cinema` — cinema locations, screens
- `Screen` — screen layout, seat map
- `Show` / `MovieShow` — scheduled showtimes for movies in a screen
- `Seat` / `ShowSeat` — seats and per-show seat availability
- `Booking` — booking records, references to user, show, seats
- `Transaction` — payment transaction records and verification
- `OTP` — temporary OTP storage for verification flows

## Middlewares

Common middlewares:

- `auth.js` — JWT verification, attach user to `req.user`, protect routes
- Error handling and validation middlewares (add as needed)

## Controllers

- `Auth.js` — Signup, login, OTP, password reset
- `Movie.js` — Create/update/list movies
- `Cinema.js` & `Show.js` — Create cinemas/screens/shows, fetch show details
- `Booking.js` — Create bookings, manage seat holds
- `Payment.js` — Integrate with Razorpay, verify signatures
- `Revenue.js` — Aggregation endpoints for admin revenue

## Utils

- `fileUploader.js` — Cloudinary integration for file uploads
- `mailSender.js` — Nodemailer wrapper for transactional emails

## Configuration

1. Cloudinary Config — `config/cloudinary.js` sets up Cloudinary using env vars.
2. Database Config — `config/database.js` connects to MongoDB using `MONGODB_URL`.
3. Razorpay Config — `config/razorpay.js` initializes the Razorpay instance with env vars.

## Environment Variables

Create a `.env` in the `backend/` folder containing required variables. Typical variables used:

```env
PORT=4000
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
MAIL_HOST=your_mail_host
MAIL_USER=your_mail_user
MAIL_PASS=your_mail_password
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

Adjust as needed based on `config/` files.

## How to run

Install dependencies and run locally (PowerShell example):

```powershell
cd backend
npm install
# create .env with required variables (see Environment Variables)
npm run dev    # development (uses nodemon)
# or production
npm start
```

## Deployment

The repository includes `vercel.json`. If deploying to Vercel (or other providers), set environment variables in the provider settings and ensure the proper start command is used.

## Troubleshooting

If the server fails to start, check (in order):

1. `.env` exists and `MONGODB_URL` is valid
2. Cloudinary and Razorpay credentials are correct
3. Required ports are free
4. Inspect logs printed by `server.js` for stack traces

## Optional next steps

- Add an `ENV_EXAMPLE` file with stubbed `.env` values
- Add a small health-check route and a smoke-test script
- Add example request/response payloads for core endpoints

If you'd like, I can add any of the optional items above. Let me know which and I'll implement it.
