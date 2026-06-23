# Mini Social Post Application

A full-stack social media application built for the **3W Full Stack Internship Assignment**.

Inspired by the Social Feed section of the TaskPlanet app, this project allows users to create accounts, share text and image posts, interact through likes and comments, and browse a public social feed.

## Assignment Requirements Covered

### Account Creation

* User Signup
* User Login
* User data stored in MongoDB

### Create Post

* Text-only posts
* Image-only posts
* Text + Image posts
* Cloudinary image uploads

### Feed

* Public social feed
* Displays username, content, likes, and comments
* Latest posts shown first

### Like & Comment

* Like / Unlike posts
* Add comments
* Instant UI updates
* Usernames stored for likes and comments

### Authentication

* JWT Authentication
* Protected routes
* Persistent login sessions

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Vanilla CSS

### Backend

* Node.js
* Express.js
* JWT
* Multer
* Cloudinary

### Database

* MongoDB Atlas
* Mongoose

---

## Bonus Features Implemented

* Responsive design
* Protected routes
* Cloudinary image uploads
* Optimistic UI updates
* Clean reusable component structure
* Loading and empty states

---

## Project Structure

```txt
TaskPlanet-Social/

├── frontend/
│   ├── src/
│   └── ...
│
└── backend/
    ├── controllers/
    ├── routes/
    ├── models/
    ├── middlewares/
    └── ...
```

---

## Installation

### Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd TaskPlanet-Social
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=

JWT_SECRET_KEY=
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

FRONTEND_URL=
```

### Frontend (.env)

```env
VITE_API_URL=
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

### Posts

```http
GET  /api/posts
POST /api/posts
PUT  /api/posts/:id/like
POST /api/posts/:id/comment
```

---

## Deployment

### Live Demo

Frontend:
https://task-planet-social-orpin.vercel.app

Backend:
https://taskplanet-social-4kfp.onrender.com

---

## Screenshots

### Login Page

Add Screenshot Here

### Signup Page

Add Screenshot Here

### Social Feed

Add Screenshot Here

### Create Post

Add Screenshot Here

### Comments Section

Add Screenshot Here

---

## Author

Arnav Bhure

Submitted for the **3W Full Stack Internship Assignment**.
