# PayPulse – Frontend

> Secure Digital Banking Platform — React.js Frontend

The frontend of PayPulse is a responsive single-page application built with **React.js 19** and **Vite**. It provides a clean, modern banking UI supporting account management, UPI/IMPS transfers, transaction history, and secure JWT-based authentication — all deployed live on **Netlify**.

🔗 **Live Demo:** [paypulse-banking.netlify.app](https://69d2441c2b469f440d817c08--paypulse-banking.netlify.app)  
🔗 **Backend Repo:** [bank-services-app](https://github.com/pranitlavangare0007/payPulse)

---

## Screenshots

| Landing Page | Login | Dashboard |
|---|---|---|
| ![Landing](./public/favicon.png) | Sign in with JWT | Account overview |

---

## Features

- **JWT Authentication** — Secure login with token stored in session; auto-attached to every API request via Axios interceptors
- **Account Management** — Open Savings or Current accounts, select between multiple accounts
- **Deposit & Withdraw** — MPIN-verified cash transactions
- **UPI Transfer** — Send money instantly using UPI ID with MPIN verification
- **IMPS Transfer** — Transfer to any account number with bank-grade encryption
- **Transaction History** — Full transaction log with date, reference ID, channel, amount, and running balance
- **User Profile** — View masked personal details
- **Admin Panel** — Separate admin view for account oversight
- **Transaction Success Page** — Detailed receipt after every transaction
- **Protected Routes** — `AccountProtectedRoute` guards all post-login pages
- **Responsive Design** — Works on desktop and mobile with Tailwind CSS

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React.js | 19.2.0 | UI framework |
| Vite | 7.3.1 | Build tool & dev server |
| React Router DOM | 7.13.0 | Client-side routing |
| Axios | 1.13.5 | HTTP client with interceptors |
| Tailwind CSS | 4.2.2 | Utility-first styling |

---

## Project Structure

```
bank-app-frontend/
├── public/
│   ├── favicon.png
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Navbar with auth state
│   │   ├── Footer.jsx             # Site footer
│   │   ├── Layout.jsx             # Shared page wrapper
│   │   └── AccountProtectedRoute.jsx  # Auth guard
│   ├── pages/
│   │   ├── Welcome.jsx            # Landing page
│   │   ├── Login.jsx              # JWT login form
│   │   ├── Register.jsx           # Account registration
│   │   ├── SelectAccount.jsx      # Account selector
│   │   ├── Dashboard.jsx          # Main dashboard
│   │   ├── OpenAccount.jsx        # Open new bank account
│   │   ├── Deposit.jsx            # Deposit money
│   │   ├── Withdraw.jsx           # Withdraw money
│   │   ├── UpiTransfer.jsx        # UPI payment
│   │   ├── ImpsTransfer.jsx       # IMPS transfer
│   │   ├── Transactions.jsx       # Transaction history
│   │   ├── TransactionSuccess.jsx # Success receipt
│   │   ├── Statement.jsx          # Account statement
│   │   ├── profile.jsx            # User profile
│   │   ├── AdminPanel.jsx         # Admin dashboard
│   │   └── PageNotFound.jsx       # 404 page
│   ├── styles/                    # Page-specific CSS files
│   ├── App.jsx                    # Routes configuration
│   └── main.jsx                   # React entry point
├── api.js                         # Axios instance with JWT interceptor
├── index.html
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- PayPulse Backend running (see [backend repo](https://github.com/pranitlavangare0007/payPulse)

### Installation

```bash
# Clone the repository
git clone https://github.com/pranitlavangare0007/payPulse-.git
cd payPulse-

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Update `api.js` if your backend URL is different:

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
```

### Running Locally

```bash
# Start development server
npm run dev
```

App runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Deployment

This app is deployed on **Netlify**.

1. Push your code to GitHub
2. Connect the repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_API_BASE_URL=<your-backend-url>`

---

## API Integration

All API calls are made through the centralized `api.js` Axios instance which automatically:
- Sets the base URL from environment variables
- Attaches the JWT token from `localStorage` to every request's `Authorization` header
- Handles 401 responses for session expiry

---

## Author

**Pranit Lavangare**  
📧 pranitlavangare0007@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/pranit-lavangare-5a49a1373) | [GitHub](https://github.com/pranitlavangare0007)
