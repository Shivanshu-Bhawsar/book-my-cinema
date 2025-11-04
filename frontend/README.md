# Book My Cinema — Frontend

This is the frontend client for the Book My Cinema application. It's built with React and Redux Toolkit, styled using Tailwind CSS, and uses Axios for API communication with the backend.

## Table of Contents

- Tech Stack
- Project Structure
- Components
- Pages
- State Management
## Project Structure

```
frontend/
├── public/                 # Static assets and metadata (index.html, manifest, etc.)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Auth/           # Login/Signup/OTP components
│   │   ├── common/         # NavBar, Footer, HomeSlider, MovieCard, etc.
│   │   ├── Pages/          # Page-level components (Home, MoviesPage, Profile, etc.)
│   │   ├── protected/      # Route protection components
│   │   ├── seatComponents/ # Seat UI components (Balcony, Regular, VIP)
│   │   └── superadmin/     # Admin/superadmin UI components
│   ├── context/            # Lightweight context providers (Auth)
│   ├── redux/              # Redux store, slices, API helpers
│   ├── utils/              # Utility functions and small components
│   ├── App.js
│   └── index.js
├── package.json
├── tailwind.config.js
└── README.md
```

## Components

The `src/components` folder contains UI parts used across the app. Notable groups:

- Auth (`src/components/Auth`): `Login.jsx`, `Signup.jsx`, `CustomOtpInput.jsx`.
- Common (`src/components/common`): `NavBar.jsx`, `Footer.jsx`, `HomeSlider.jsx`, `MovieCard.jsx`, `PremiereSlider.jsx`, `TicketBox.jsx`, `Skeleton.jsx`, `SliderComponent.jsx`.
- Pages (`src/components/Pages`): page-level React components like `Home.jsx`, `MoviesPage.jsx`, `ShowSeats.jsx`, `Profile.jsx`, `TransactionPage.jsx`, `AddCinema.jsx`, `AddShow.jsx`.
- Protected (`src/components/protected`): route guards like `AdminProtected.jsx`, `SuperAdminProtected.jsx`.
- Seat components (`src/components/seatComponents`): `BalconySeat.jsx`, `RegularSeat.jsx`, `VipSeat.jsx`.
- Superadmin (`src/components/superadmin`): movie management UI: `AddMoviePage.jsx`, `UpdateMoviePage.jsx`, `AdminsPage.jsx`, `CitiesRevenue.jsx`, etc.

## Pages

Major pages are under `src/components/Pages` and include:

- Home — landing page with featured movies and sliders
- Movies / All Movies — browse and search movies
- Cinemas / Cinema Show Page — cinema-focused pages and showtimes
- ShowSeats — select seats for a show
- Profile — user profile and booking history
- TransactionPage — payment & transaction history
- Admin pages — AddCinema, AddShow, AdminRevenue, AdminCinemas, AdminCitiesRevenue

## State Management

This project uses Redux Toolkit. The store and slices are under `src/redux/`.

Common slices found in the codebase:

- `authSlice` — authentication state
- `movieSlice` — movie data and CRUD operations
- `showSlice` — show timings and seat maps
- `seatSlice` — seat selection and availability
- `bookingSlice` — current booking and history
- `paymentSlice` — payment status and verification
- `revenueSlice` / `adminSlice` — admin and revenue data

The store is initialized at `src/redux/store/store.js` and the app connects via `Provider` in `src/index.js`.

## Services

API helpers and connectors are in `src/redux/api.js` and `src/redux/utils/apiConnector.js` (or similar). These wrap Axios and manage base URLs, interceptors (auth tokens), and common error handling.

## Utils

Utility modules include:

- `FilterData.js` — data filtering helpers
- `LoaderPage.jsx` — loading screen
- `PremiereData.js`, `SliderData.js` and related arrays for UI content
- `ScrollTop.js` — scroll restoration

## Data

Static or mock data used by the frontend lives in `src/utils/` files such as slider arrays and premiere data. Replace or connect these to backend endpoints as needed.

## Features

- Authentication (email/OTP-based flows)
- Movie browsing and search
- Cinema & show management (admin/superadmin)
- Seat selection with multiple seat types (VIP, Balcony, Regular)
- Booking workflow and Razorpay payments
- Admin dashboards for revenue and cinema management
- Responsive UI with sliders and previews

## Environment Variables

Create a `.env` file in `frontend/` with these variables (examples):

```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_RAZORPAY_KEY=your_razorpay_key
```

Adjust the base URL to point to your backend API.

## How to run

Install dependencies and run locally (PowerShell example):

```powershell
cd frontend
npm install
npm start
```

Build for production:

```powershell
npm run build
```

Test (if applicable):

```powershell
npm test
```

## Deployment

Build the app (`npm run build`) and serve the contents of the `build/` folder using any static host (Netlify, Vercel, Surge, nginx). Make sure environment variables are set in the hosting provider.

## Troubleshooting

- If the app fails to load, ensure `REACT_APP_BASE_URL` points to a running backend.
- Check browser console for CORS or network errors.
- Verify Node and npm versions are compatible with the project's dependencies.

---

If you'd like, I can also add:

- an `ENV_EXAMPLE` file in the `frontend/` folder with stub values
- a small README section with example API request/response for login or booking
- a script or short checklist for deploying to Vercel or Netlify

Tell me which of the above you'd like next and I will add it.
