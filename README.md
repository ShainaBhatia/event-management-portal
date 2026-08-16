# Event Admin Portal

A full-stack event management portal built with Next.js, TypeScript, MongoDB, and Cloudinary.

The platform allows users to discover and search for events, while administrators can securely create, edit, and delete events through a protected admin dashboard.

## Live Demo

[View Live Project] https://event-management-portal-eight.vercel.app/

## Features

### Public Events

- View all upcoming events
- Search events by title or description
- Filter events by category
- View event date and time
- View event venue
- View event banner/image
- Register for an event using the provided registration link
- Responsive design for desktop and mobile

### Admin Dashboard

- Secure admin login
- Protected admin dashboard
- Create new events
- Edit existing events
- Delete events
- Upload event images
- Search and filter events
- Logout functionality
- Authentication using secure HTTP-only cookies

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Node.js
- Mongoose

### Database
- MongoDB

### Authentication
- JWT-based authentication
- HTTP-only cookies
- `jose`

### Image Storage
- Cloudinary

### Deployment
- Vercel

## Project Architecture


                         ┌──────────────────┐
                         │      User        │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │    Next.js UI    │
                         │ Public / Admin   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   API Routes     │
                         │  GET / POST      │
                         │  PUT / DELETE    │
                         └───────┬───┬──────┘
                                 │   │
                    ┌────────────┘   └──────────────┐
                    ▼                               ▼
             ┌──────────────┐                ┌──────────────┐
             │   MongoDB    │                │  Cloudinary  │
             │    Events    │                │    Images    │
             └──────────────┘                └──────────────┘

# Project Structure
event-admin-portal/
│
├── app/
│   ├── admin/
│   │   ├── login/
│   │   └── dashboard/
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── logout/
│   │   │
│   │   ├── events/
│   │   │   └── [id]/
│   │   │
│   │   └── upload/
│   │
│   ├── events/
│   │
│   └── page.tsx
│
├── models/
│   └── Event.ts
│
├── lib/
│   └── mongodb.ts
│
├── public/
│
├── .env.local
├── package.json
└── README.md


# Authentication Flow

The admin authentication works as follows:

Admin Login
     │
     ▼
POST /api/auth/login
     │
     ▼
Verify credentials
     │
     ▼
Generate authentication token
     │
     ▼
Store token in HTTP-only cookie
     │
     ▼
Access protected dashboard

When the admin logs out, the authentication cookie is removed and the user is redirected to the login page.

# Event CRUD Flow

The admin dashboard supports complete CRUD operations:

Create  → POST   /api/events
Read    → GET    /api/events
Update  → PUT    /api/events/[id]
Delete  → DELETE /api/events/[id]

Events are stored in MongoDB using Mongoose models.

# Image Upload Flow

Event images are uploaded to Cloudinary rather than being stored directly on the server.

Select Image
     │
     ▼
Next.js Upload API
     │
     ▼
Cloudinary
     │
     ▼
Image URL
     │
     ▼
MongoDB Event Document

Only the Cloudinary image URL is stored in the event document.

# Search & Filtering

The public events page supports:

Keyword-based event search
Category-based filtering

This allows users to quickly find relevant events.

# Environment Variables

Create a .env.local file in the project root:

MONGODB_URI=your_mongodb_connection_string


ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password


AUTH_SECRET=your_auth_secret


CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


# Getting Started
1. Clone the repository
git clone https://github.com/ShainaBhatia/event-management-portal
2. Navigate into the project
cd event-admin-portal
3. Install dependencies
npm install
4. Configure environment variables

Create .env.local and add the required variables.

5. Start the development server
npm run dev
6. Open the application

Visit:

http://localhost:3000


# Responsive Design

The application is designed to work across:

Desktop
Tablet
Mobile

The public event listing and admin dashboard adapt to smaller screen sizes.

# Deployment

The application is deployed using Vercel.

For deployment, the required environment variables must be added to the Vercel project settings.

# Future Improvements

Possible future improvements include:

Admin analytics dashboard
Event pagination
Event sorting
Event registration tracking
Role-based admin access
Email notifications
Event reminders
Rich event descriptions
Calendar integration

## Admin Test Credentials

To test the admin dashboard:

**Admin Login:** `/admin/login`

- Email: `tester@example.com`
- Password: `EventPortal@2026`

> These credentials are provided for project evaluation purposes.

# Author

Shaina Bhatia
B.Tech CSE (AI)
IGDTUW