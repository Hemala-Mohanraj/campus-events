# Campus Event Management System - Backend API

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB** for managing campus events, user authentication, role-based authorization, and event registrations.

---

## Features

- **User Authentication & Authorization:** JWT-based login and registration with role-based access control (`student` and `admin`).
- **Event Management:** CRUD operations for events (Create, Read, Update, Delete).
- **Registration System:** Allows students to register and cancel registrations for events.
- **Data Validation & Constraints:** Enforces capacity limits, prevents duplicate registrations, and validates event dates.
- **Search, Filter & Sort:** Search by name/resource person, filter by type/status, and sort by date or available seats.

---

## Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Middleware:** CORS, Express JSON Parser

---

## Project Structure

```text
backend/
├── controllers/
│   ├── authController.js
│   ├── eventController.js
│   └── registrationController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Event.js
│   └── Registration.js
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   └── registrationRoutes.js
├── .env
├── server.js
└── package.json
