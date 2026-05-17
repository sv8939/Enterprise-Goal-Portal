# Enterprise Goal Portal

## Live Demo

### Frontend URL

[https://enterprise-goal-frontend.onrender.com](https://enterprise-goal-frontend.onrender.com)

### Backend API URL

[https://enterprise-goal-backend.onrender.com](https://enterprise-goal-backend.onrender.com)

### GitHub Repository

[https://github.com/sv8939/Enterprise-Goal-Portal](https://github.com/sv8939/Enterprise-Goal-Portal)

---

# Overview

Enterprise Goal Portal is a full-stack enterprise performance management system designed for employees, managers, and administrators.

The portal enables:

* Goal creation and tracking
* Approval workflows
* Quarterly check-ins
* Audit logging
* Analytics dashboards
* Role-based access
* Enterprise KPI monitoring

This project was built as a hackathon submission aligned with enterprise BRD requirements.

---

# Features

## Employee Features

* Create goals
* Goal weightage validation
* Quarterly progress check-ins
* Track approval status
* View analytics

## Manager Features

* Approve goals
* Reject goals
* Review quarterly updates
* Monitor team progress

## Admin Features

* View enterprise dashboard
* Access audit logs
* System-wide visibility
* Analytics monitoring

---

# Business Rule Validations

The application implements strict enterprise validations:

* Maximum 8 goals per employee
* Minimum 10% weightage per goal
* Total weightage cannot exceed 100%
* Quarterly check-ins (Q1–Q4)
* Goal approval workflow
* Audit trail tracking

---

# Tech Stack

## Frontend

* React.js
* Vite
* Axios
* React Router DOM
* Recharts

## Backend

* Node.js
* Express.js
* JWT Authentication
* REST APIs

## Database

* MongoDB Atlas
* Mongoose ODM

## Deployment

* Render
* GitHub

---

# Architecture

```text
React Frontend
       ↓
REST APIs
       ↓
Node + Express Backend
       ↓
MongoDB Atlas
```

Additional Components:

* JWT Authentication
* Audit Logging System
* Analytics Engine
* Quarterly Check-In Workflow

---

# Login Credentials

| Role     | Email                                         | Password |
| -------- | --------------------------------------------- | -------- |
| Admin    | [admin@test.com](mailto:admin@test.com)       | 123456   |
| Manager  | [manager@test.com](mailto:manager@test.com)   | 123456   |
| Employee | [employee@test.com](mailto:employee@test.com) | 123456   |

---

# Demo Flow

## Employee Journey

1. Login as employee
2. Create goal
3. Add quarterly updates
4. Track approval status

## Manager Journey

1. Login as manager
2. Review pending goals
3. Approve or reject goals
4. Monitor analytics

## Admin Journey

1. Login as admin
2. View dashboard
3. Access audit logs
4. Monitor overall system

---

# Analytics Dashboard

The portal includes:

* Goal completion analytics
* Approval statistics
* Pending goal tracking
* Goal status distribution charts

---

# Audit Logs

Audit logs track:

* Goal creation
* Goal approvals
* Goal rejections
* Goal updates
* Goal deletions

This improves transparency and enterprise governance.

---

# API Endpoints

## Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

## Goals

* GET `/api/goals`
* POST `/api/goals`
* PUT `/api/goals/:id/approve`
* PUT `/api/goals/:id/reject`
* DELETE `/api/goals/:id`

## Audit Logs

* GET `/api/goals/audit/logs`

---

# Project Structure

```text
Enterprise-Goal-Portal
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── layouts
│   │   └── pages
│   └── package.json
│
├── server
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/sv8939/Enterprise-Goal-Portal.git
```

---

## Backend Setup

```bash
cd server
npm install
npm start
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the server folder.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# Submission Deliverables

## Live Hosted Demo

[https://enterprise-goal-frontend.onrender.com](https://enterprise-goal-frontend.onrender.com)

## Source Code Repository

[https://github.com/sv8939/Enterprise-Goal-Portal](https://github.com/sv8939/Enterprise-Goal-Portal)

## Architecture Diagram

Included separately in submission.

## Role Credentials

| Role     | Email                                         | Password |
| -------- | --------------------------------------------- | -------- |
| Admin    | [admin@test.com](mailto:admin@test.com)       | 123456   |
| Manager  | [manager@test.com](mailto:manager@test.com)   | 123456   |
| Employee | [employee@test.com](mailto:employee@test.com) | 123456   |

---

# Future Improvements

* Goal lock/unlock workflow
* Shared KPI assignment
* Export reports (CSV/Excel)
* Advanced role permissions
* Real-time notifications
* Performance scoring formulas

---

# Author

Saurabh Verma

BTech Data Science
Manipal University Jaipur

---

# Conclusion

Enterprise Goal Portal delivers an enterprise-grade goal management workflow with authentication, analytics, validations, approvals, and audit tracking.

The project focuses on clean workflows, usability, role-based functionality, and scalable architecture suitable for enterprise environments.
