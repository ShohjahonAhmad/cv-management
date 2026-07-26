# HireBoard – CV Management System

A modern full-stack CV Management System designed for recruiters, candidates, and administrators to streamline recruitment and CV management.

## Overview

HireBoard is a web application that enables organizations to manage candidates, job positions, CVs, and reusable attributes from a single platform.

The system provides secure authentication, role-based authorization, a dynamic CV Builder, multilingual support, dark mode, and an intuitive dashboard for managing recruitment workflows.

---

## Features

### Authentication

- JWT Authentication
- Google OAuth
- GitHub OAuth
- Protected routes

### User Management

- Candidate accounts
- Recruiter accounts
- Administrator accounts
- User blocking
- Role assignment
- Bulk operations

### Profile Management

- Editable candidate profile
- Avatar upload
- Dynamic profile attributes
- Optimistic locking to prevent conflicting updates

### Position Management

- Create positions
- Update positions
- Archive positions
- Position levels
- Required skills and attributes

### CV Builder

- Dynamic CV generation
- Multiple CVs per candidate
- Automatic synchronization with position attributes
- Read-only mode
- Completion tracking

### Attribute Library

Reusable attributes shared across the application.

Supported types include:

- Text
- Long Text
- Number
- Boolean
- Date
- Period
- Image
- Select

### Dashboard

- New CVs
- Total Positions
- Total Candidates
- Total Recruiters
- Submitted CVs

### Search

- Full-text search
- Candidate search
- Position search
- Attribute search

### Other Features

- Pagination
- Form validation
- Toast notifications
- Responsive UI
- Dark Mode
- English & Uzbek localization

---

# Technology Stack

## Frontend

- React 19
- React Router v8
- TypeScript
- Tailwind CSS v4
- i18next
- Lucide Icons
- Shadcn UI
- Zod
- Sonner

## Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Passport.js
- JWT Authentication
- Google OAuth
- GitHub OAuth
- Multer

## Database

- PostgreSQL

---

# Project Structure

```
app/
    routes/
    layouts/
    components/
    hooks/
    utils/
    config/
```

---

# Roles

## Administrator

- Manage users
- Manage recruiters
- Manage candidates
- Manage positions
- Manage attributes
- View every profile
- Edit every profile
- Block users
- Assign roles

## Recruiter

- Create positions
- Manage positions
- Manage attributes
- Review candidate CVs

## Candidate

- Manage profile
- Build CVs
- Upload images
- Apply profile attributes

---

# Security

- JWT Authentication
- Role-based Authorization
- OAuth Login
- Optimistic Locking
- Server-side Validation
- Protected API Endpoints

---

# Internationalization

Supported languages:

- English
- Uzbek

The selected language is automatically saved in Local Storage.

---

# Dark Mode

The application supports both Light and Dark themes.

User preference is persisted using Local Storage.

---

# Installation

Clone the repository

```bash
git clone https://github.com/ShohjahonAhmad/cv-management.git
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build production version

```bash
npm run build
```

---

# Environment Variables

Example frontend configuration:

```env
VITE_API_URL=http://localhost:3000
```

Backend example:

```env
DATABASE_URL=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
FRONTEND_URL=
API_URL=
```

---

# Screenshots

You can add screenshots here:

- Dashboard
- Users
- Positions
- Candidate Profile
- CV Builder
- Login
- Dark Mode

---

# Future Improvements

- Email notifications
- Interview scheduling
- Resume export
- Analytics
- Audit logs

---

# Author

**Shohjahon Ahmad**

GitHub:
https://github.com/ShohjahonAhmad

---

## License

This project was developed for internship purposes as a itransition final project.
