# LearnHub — Learning Management System

## 1. Project Overview
LearnHub is a full-stack Learning Management System (LMS) developed using the MERN stack. It provides a platform where students can register, log in, explore courses, view course details, and enroll in courses. Instructors and administrators have authorized access to course creation features.

## 2. Technologies Used
- **Frontend:** React.js, Vite, JavaScript, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API Testing:** Postman
- **Development Environment:** Visual Studio Code

## 3. Project Features
- Student registration and login
- User authentication and logout
- Protected routes
- Course listing and course details
- Course enrollment
- Duplicate enrollment prevention
- Role-based authorization for instructors and administrators
- Course creation
- Persistent storage of users, courses, and enrollments in MongoDB

## 4. Project Structure

```text
LearnHub/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── package.json
│   └── server.js
└── README.md
```

*Note: The structure above is representative. Actual files may differ depending on the project setup.*

## 5. Installation and Setup

### Prerequisites
- Node.js and npm
- MongoDB Community Server
- Visual Studio Code

### Step 1: Install Backend Dependencies
Open a terminal in the backend directory:

```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables
Create or configure the backend `.env` file with the required MongoDB connection string and authentication secret.

Do not share or upload secret keys, passwords, or tokens publicly.

### Step 3: Start the Backend
From the backend directory, run:

```bash
npm run dev
```

Ensure that the server starts successfully and MongoDB connects.

### Step 4: Install Frontend Dependencies
Open a second terminal in the frontend directory:

```bash
cd frontend
npm install
```

### Step 5: Start the Frontend

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## 6. Testing
The application has been tested for:
- Student registration and login
- Logout and protected route access
- Course listing and details
- Course enrollment
- Duplicate enrollment prevention
- Course creation authorization
- Database persistence

## 7. Security
- Protected routes require authentication.
- Course creation is restricted to authorized instructor and admin roles.
- Environment variables should be kept private.

## 8. Limitations
Course editing is not included unless implemented separately.

## 9. Conclusion
LearnHub demonstrates full-stack web development using React, Node.js, Express.js, and MongoDB. It implements core LMS functionality, including authentication, course browsing, enrollment, and role-based access control.

## 10. Developer Information
**Project Name:** LearnHub  
**Project Type:** Full-Stack Web Application  
**Purpose:** Learning Management System