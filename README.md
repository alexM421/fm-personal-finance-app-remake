# Personal Finance App

A personal finance dashboard for tracking balances, transactions, budgets, savings pots, and recurring bills. Built as a remake of the [Frontend Mentor Personal Finance App](https://www.frontendmentor.io/) challenge, with auth, cloud sync, and multi-currency support.

## Features

- **Overview** — balance, income, expenses, and summaries for budgets, pots, transactions, and bills
- **Transactions** — add, edit, filter, and paginate income and spending
- **Budgets** — category spending limits with cycle-based tracking
- **Pots** — savings goals with add/withdraw flows
- **Recurring bills** — bill and income schedules with due-date status
- **Auth** — sign up, log in, password reset, and guest sign-in
- **Settings** — preferred currency, budget cycle day, and starting balance
- **Multi-currency** — amounts converted via Open Exchange Rates

## Tech stack

- React 19 + TypeScript
- Vite
- React Router
- Supabase (auth + data)
- Open Exchange Rates API
- API Ninjas (holiday / date data)

## Getting started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project
- API keys for Open Exchange Rates and API Ninjas

### Install

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_KEY=your_supabase_anon_key
VITE_API_OPEN_EXCHANGE_ID=your_open_exchange_rates_app_id
VITE_API_NINJA_KEY=your_api_ninjas_key
```

### Run

```bash
npm run dev
```

### Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start the dev server     |
| `npm run build`   | Typecheck and build      |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint               |

## App routes

| Path                 | Page            |
| -------------------- | --------------- |
| `/auth/login`        | Log in          |
| `/auth/signup`       | Sign up         |
| `/auth/reset`        | Password reset  |
| `/auth/update`       | Update password |
| `/overview`          | Dashboard       |
| `/transactions`      | Transactions    |
| `/budgets`           | Budgets         |
| `/pots`              | Savings pots    |
| `/recurring-bills`   | Recurring bills |

Guest sign-in is available from the login page for quick exploration without creating an account.
