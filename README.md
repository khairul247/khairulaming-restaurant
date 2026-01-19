# Rembayung Restaurant

A modern, full-stack restaurant website built with Next.js 16 for **Rembayung** — a Malaysian restaurant featuring traditional cuisine with a contemporary twist.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

- **Responsive Design** — Fully responsive layout optimized for all devices
- **Smooth Animations** — GSAP ScrollTrigger and Framer Motion powered animations
- **Online Booking System** — Interactive calendar with date/time selection and guest management
- **Admin Dashboard** — Password-protected panel for managing reservations 
- **Google Sheets Integration** — Persistent booking storage via webhook
- **Background Music** — Ambient Malay traditional music toggle
- **Optimized Performance** — Dynamic imports, image optimization, and code splitting

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Frontend | React 19 |
| Styling | Tailwind CSS 4 |
| UI Components | HeroUI |
| Animations | GSAP, Framer Motion |

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/khairulaming-restaurant.git
   cd khairulaming-restaurant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your environment variables in `.env.local`:
   ```env
   ADMIN_PASSWORD=your_admin_password
   ADMIN_TOKEN=your_base64_encoded_token
   GOOGLE_SHEETS_WEBHOOK_URL=your_google_sheets_webhook_url
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/
│   ├── admin/              # Admin login & dashboard
│   ├── api/                # API routes (bookings, auth)
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── About.tsx           # About section
│   ├── BookingForm.tsx     # Booking form with calendar
│   ├── Contact.tsx         # Contact information
│   ├── Footer.tsx          # Footer
│   ├── Gallery.tsx         # Image gallery
│   ├── Hero.tsx            # Hero section
│   ├── Location.tsx        # Location/maps
│   ├── MenuPreview.tsx     # Menu display
│   └── Navbar.tsx          # Navigation bar
└── hooks/
    └── useCalendar.ts      # Calendar logic hook
```

## Booking System

The booking system allows customers to:
- Select a date (1-30 days in advance)
- Choose between lunch or dinner time slots
- Specify guest count (2-8 people)
- Provide contact information

All bookings are stored in Google Sheets via a webhook integration. See [ENV_SETUP.md](ENV_SETUP.md) for detailed setup instructions.

## Admin Panel

Access the admin dashboard at `/admin`.

**Default Credentials:**
- **Password:** `rembayung2026`

**Features:**
- View all bookings with date filtering
- Update booking status (Pending/Confirmed/Cancelled)
- Secure token-based authentication

> **Note:** Change the password in production by updating `ADMIN_PASSWORD` and `ADMIN_TOKEN` in your environment variables.

## Performance

The website is optimized for performance with:
- Dynamic imports for below-fold components
- Next.js Image optimization (WebP/AVIF)
- Tailwind CSS 4 minimal bundle
- Efficient scroll-triggered animations

See [OPTIMIZATION.md](OPTIMIZATION.md) for the full performance report.

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in the Vercel dashboard
4. Deploy

### Other Platforms

```bash
npm run build
npm start
```

Ensure all environment variables are configured on your hosting platform.

## License

This project is proprietary and confidential.

---

Built with passion for Malaysian cuisine.
