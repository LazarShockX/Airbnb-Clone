# 🏡 Airbnb Clone

An Airbnb clone that enables users to browse and search property listings, make reservations, and manage bookings, with both host and guest functionalities. Built with Next.js, TypeScript, and Prisma. Check out the app on Vercel: [https://bookbnb-mu.vercel.app/](https://bookbnb-mu.vercel.app/)

<img width="1088" height="713" alt="Screenshot 2025-08-31 at 13 41 10" src="https://github.com/user-attachments/assets/a5c08b80-50ec-45e3-9be6-41532a55a3b4" />

<br/>
<br/>

## ✨ Features

### Property Listings
- Browse all available properties
- Filter by location, dates, guests, rooms, bathrooms
- Category-based filtering (Beach, Modern, Country, etc.)
- Interactive map integration

### Reservations System
- Date range selection with calendar
- Automatic price calculation
- Conflict prevention for double bookings
- Reservation management for both guests and hosts

### User Dashboard
- **My Trips**: View and cancel your bookings
- **My Favorites**: Manage favorite properties
- **My Properties**: List and manage your properties
- **My Reservations**: Manage bookings on your properties

### Authentication & Security
- Secure authentication with NextAuth.js
- User session management
- Protected routes and API endpoints

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form handling and validation
- **Leaflet** - Interactive maps

### Backend and Database
- **Next.js API Routes** - Server-side API endpoints
- **NextAuth.js** - Authentication with GitHub and Google OAuth
- **Prisma ORM** - Type-safe database access
- **MongoDB** - NoSQL database
- **bcrypt** - Password hashing
- **Cloudinary** - Image upload and storage
- **Axios** - HTTP client for API requests

## 🚀 Getting Started

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<dbname>"

# NextAuth
NEXTAUTH_SECRET="your_nextauth_secret"

# OAuth Providers
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_cloudinary_upload_preset"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npx prisma generate` - Generate Prisma Client from schema
- `npx prisma db push` - Sync schema changes to the database
