# Tradix - Stock Trading Platform

Tradix is a full-stack stock trading web application inspired by modern investment platforms. It allows users to manage funds, view stocks, place buy and sell orders, track holdings and positions, and maintain a personal watchlist.

The project is built using the **MERN stack** with separate frontend, backend, and dashboard applications.

## 🌐 Live Demo

* **Frontend:** https://tradix-fo5h.onrender.com
* **Dashboard:** https://tradix-dashboard.onrender.com
* **Backend API:** https://tradix-backend.onrender.com


## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router
* React Hook Form
* Zod

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Joi
* CORS

### Dashboard

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router

### Testing

* Vitest
* Supertest

### Deployment

* Render

---

## 📌 Features

### 🔐 Authentication

* User registration and login
* JWT-based authentication
* Protected API routes
* Password hashing using bcrypt
* Profile management
* Change password functionality

### 💰 Funds Management

* View available funds
* Add funds
* Withdraw funds
* Automatic balance updates after transactions
* Insufficient funds validation

### 📈 Stock Trading

* View available stocks
* Buy stocks
* Sell stocks
* CNC and MIS product types
* BUY and SELL order management
* Stock quantity validation
* Stock price validation
* Insufficient funds validation

### 📊 Portfolio

* View holdings
* View positions
* Track stock quantities
* Track investment-related information

### ⭐ Watchlist

* Add stocks to personal watchlist
* Remove stocks from watchlist
* Prevent duplicate stocks
* Validate available stocks
* User-specific watchlists

### 👤 Profile

* View profile
* Update name and email
* Change password
* Logout

---

## 🔐 Authentication Flow

Tradix uses JWT-based authentication.

```text
User Login
    ↓
Backend validates credentials
    ↓
Password verified using bcrypt
    ↓
JWT token generated
    ↓
Token sent to frontend
    ↓
Frontend sends token with protected requests
    ↓
Auth middleware verifies token
    ↓
Protected controller executes
```

---

## 📡 API Routes

### Authentication

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| POST   | `/auth/signup`          | Create a new account |
| POST   | `/auth/login`           | Login user           |
| GET    | `/auth/me`              | Get current user     |
| PUT    | `/auth/profile`         | Update profile       |
| PUT    | `/auth/change-password` | Change password      |

### Funds

| Method | Endpoint          | Description    |
| ------ | ----------------- | -------------- |
| GET    | `/funds`          | Get funds      |
| POST   | `/funds/add`      | Add funds      |
| POST   | `/funds/withdraw` | Withdraw funds |

### Orders

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/orders`     | Get user orders   |
| POST   | `/orders/new` | Place a new order |

### Holdings

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| GET    | `/holdings` | Get user holdings |

### Positions

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | `/positions` | Get user positions |

### Watchlist

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| GET    | `/watchlist`              | Get user watchlist |
| POST   | `/watchlist/add`          | Add stock          |
| DELETE | `/watchlist/remove/:name` | Remove stock       |

---

## 🧪 Testing

Automated API testing was implemented using **Vitest** and **Supertest**.

Test files include:

```text
backend/
└── tests/
    ├── auth.test.js
    ├── funds.test.js
    ├── orders.test.js
    ├── holdings.test.js
    ├── positions.test.js
    └── watchlist.test.js
```

### Run Tests

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run the complete test suite:

```bash
npm test
```

To run an individual test file:

```bash
npx vitest tests/auth.test.js
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

For the frontend, create the required Vite environment variables:

```env
VITE_API_URL=your_backend_api_url
```

**Do not commit `.env` files or secret keys to GitHub.**

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

### 2. Open the project

```bash
cd Tradix
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
```

### 4. Install backend dependencies

```bash
cd ../backend
npm install
```

### 5. Install dashboard dependencies

```bash
cd ../dashboard
npm install
```

### 6. Run the backend

```bash
cd backend
npm start
```

### 7. Run the frontend

```bash
cd frontend
npm run dev
```

### 8. Run the dashboard

```bash
cd dashboard
npm run dev
```

---

## 🔒 Security

The application includes:

* JWT authentication
* Password hashing with bcrypt
* Protected routes
* User-specific database queries
* Input validation
* Authorization checks
* Environment variables for sensitive configuration

Users can only access their own funds, orders, holdings, positions, and watchlist data.

---

## 🎯 Project Objective
The main objective of Tradix is to develop a practical full-stack application that demonstrates how a stock trading platform can manage:

