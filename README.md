
# MERN Blog

A full-stack blogging platform built with MongoDB, Express.js, React and Node.js.

**Live Demo:** https://mern-blog-one-mu.vercel.app/

## Overview

MERN Blog is a modern blogging application that allows users to create accounts, publish articles, explore posts and manage their own content.

The project demonstrates full-stack development, REST API integration, authentication, database management and responsive user interface design.

## Features

- User registration and login
- Secure password hashing
- JWT-based authentication
- Create, read, update and delete blog posts
- Individual article pages
- Author information and post categories
- Image support for blog posts
- Responsive design
- MongoDB database integration

## Technologies Used

### Frontend
- React
- Vite
- React Router
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens
- bcryptjs

## Project Structure

```text
mern-blog/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
│
└── .gitignore
```

## Installation

Clone the repository:

```bash
git clone https://github.com/FaroTech7/mern-blog.git
```

Navigate into the project:

```bash
cd mern-blog
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the server directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the client directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## What I Learned

Through this project, I gained practical experience with:

- Building RESTful APIs
- Connecting React applications to backend services
- Implementing authentication with JWT
- Managing application data with MongoDB
- Structuring a full-stack application
- Deploying frontend and backend services

## Author

**FaroTech7**

GitHub: https://github.com/FaroTech7
