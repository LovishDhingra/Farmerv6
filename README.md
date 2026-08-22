# FarmSphere

**AI-Powered Agricultural Marketplace** — Connecting Farmers & Buyers with Fair Pricing

---

## Overview

FarmSphere is an agricultural marketplace platform that helps farmers and buyers connect directly. The platform uses AI to suggest fair prices and provides real-time market data, making trading transparent and accessible for everyone.

**Current Status:** Fully functional full-stack application ready for local development and deployment.

---

## Features

- **Full-Stack Web Application** — React frontend with Express backend
- **AI Price Recommendations** — Uses Groq AI to suggest fair market prices
- **Live Market Data** — Real-time mandi prices from India's data.gov.in API
- **Easy Authentication** — Clerk auth with built-in local mock auth for development
- **Type-Safe Code** — TypeScript throughout, Drizzle ORM for database
- **Monorepo Structure** — Organized workspace using pnpm
- **Responsive Design** — Works on desktop and mobile devices

---

## Tech Stack

**Frontend**
- React + Vite
- TypeScript
- Tailwind CSS

**Backend**
- Express.js
- Drizzle ORM
- PostgreSQL

**Tools & Deployment**
- pnpm (package manager)
- Neon PostgreSQL (cloud database)
- Render (hosting ready)

---

## Getting Started

### Requirements

Before starting, make sure you have:
- Node.js v18 or v20+
- pnpm (install with: `npm install -g pnpm`)
- PostgreSQL (local or cloud like Neon/Supabase)

### Step 1: Clone and Install

```bash
git clone https://github.com/LovishDhingra/Farmerv6.git
cd Farmerv6
pnpm install
```

### Step 2: Setup Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/farmsphere
GROQ_API_KEY=your_groq_api_key_here
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key (optional)
CLERK_SECRET_KEY=your_clerk_secret (optional)
DATA_GOV_IN_API_KEY=your_government_api_key (optional)
```

**Note:** If you skip the Clerk keys, a built-in mock auth will work automatically for local development.

### Step 3: Setup Database

```bash
pnpm --filter @workspace/db run push
```

This creates all necessary tables in your PostgreSQL database.

### Step 4: Start Development

**Option A: Run everything at once**
```bash
pnpm dev
```

This starts:
- Frontend at http://localhost:5173
- Backend API at http://localhost:3000

**Option B: Run separately**

Terminal 1 (Backend):
```bash
pnpm --filter @workspace/api-server run dev
```

Terminal 2 (Frontend):
```bash
pnpm --filter @workspace/farmer-market run dev
```

---

## Project Structure

```
Farmerv6/
├── lib/
│   ├── db/               # Database schema & migrations
│   ├── api-spec/         # API types & codegen
│   └── types/            # Shared TypeScript types
├── apps/
│   ├── farmer-market/    # React frontend
│   │   └── src/
│   │       ├── pages/
│   │       ├── components/
│   │       └── hooks/
│   └── api-server/       # Express backend
│       └── src/
│           ├── routes/
│           ├── middleware/
│           └── services/
├── package.json
└── pnpm-workspace.yaml
```

---

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start frontend and backend together |
| `pnpm run build` | Build all packages for production |
| `pnpm run typecheck` | Check TypeScript types across all packages |
| `pnpm --filter @workspace/db run push` | Apply database migrations |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate API client hooks |

---

## Using Neon PostgreSQL

For production, use Neon PostgreSQL:

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new PostgreSQL database
3. Copy your connection string
4. Update `.env`:
```env
DATABASE_URL=postgresql://user:password@ep-xxxxx.neon.tech/farmsphere
```

---

## Using Clerk Authentication

To enable Clerk authentication:

1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Get your Publishable Key and Secret Key
4. Update `.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```
5. Restart the development server

---

## Deployment

The project includes `render.yaml` for easy deployment to Render:

1. Push your code to GitHub
2. Connect your repository to Render
3. Render will auto-deploy on every push to the main branch

---

## Project Roadmap

- [x] Full-stack setup with React + Express
- [x] PostgreSQL database with Drizzle ORM
- [x] AI pricing recommendations
- [x] Authentication system
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Blockchain smart contracts

---

## Contributing

We welcome contributions! Here's how to help:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m 'Add your feature'`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

**Guidelines:**
- Use TypeScript for all new code
- Follow the existing code style
- Run `pnpm run typecheck` before submitting
- Update documentation for new features

---

## Support

- **Issues:** [Open an issue](https://github.com/LovishDhingra/Farmerv6/issues) if you find a bug
- **Discussions:** [Start a discussion](https://github.com/LovishDhingra/Farmerv6/discussions) for questions

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Made with ❤️ by [Lovish Dhingra](https://github.com/LovishDhingra)

Please star this repo if you find it helpful!
