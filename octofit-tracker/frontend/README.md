# OctoFit Tracker - Frontend

A modern React 19 frontend for the OctoFit Tracker multi-tier application using Vite, React Router, and Bootstrap.

## Setup

### Prerequisites

- Node.js (LTS)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. **IMPORTANT:** Configure environment variables

   Create a `.env.local` file in the frontend directory (copy from `.env.local.example`):
   
   ```bash
   cp .env.local.example .env.local
   ```

   Then edit `.env.local` and set `VITE_CODESPACE_NAME` to your GitHub Codespace name:
   
   ```env
   VITE_CODESPACE_NAME=your-codespace-name
   ```

   This is **required** for the frontend to communicate with the backend API.

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm preview
```

## Features

### Pages

- **Home**: Dashboard with quick navigation
- **Users**: View all registered users
- **Activities**: Browse user activities with pagination
- **Workouts**: Explore available workout routines
- **Teams**: View teams and their members
- **Leaderboard**: Competitive rankings and scores

### Architecture

#### API Integration

The frontend uses a custom `useApi` hook to fetch data from the backend:

- **Endpoint Pattern**: `https://${VITE_CODESPACE_NAME}--8000.app.github.dev/api/[endpoint]/`
- **Base URL Construction**: Automatically handled by `getApiBaseUrl()` function
- **Fallback Handling**: If `VITE_CODESPACE_NAME` is unset, it falls back to `https://localhost:8000/api`

#### Response Handling

Components support both response formats:

1. **Paginated responses**:
   ```json
   {
     "data": [...],
     "page": 1,
     "totalPages": 5,
     "total": 100
   }
   ```

2. **Array responses**:
   ```json
   [...]
   ```

Each component gracefully handles both formats and implements pagination when available.

### Custom Hooks

#### `useApi<T>(endpoint: string, options?: UseApiOptions)`

Fetches data from the API and manages loading/error states.

```typescript
const { data, loading, error } = useApi('/users');
```

**Options:**
- `skip?: boolean` - Skip fetching on mount (default: false)

#### `apiRequest<T>(endpoint: string, method?: string, body?: unknown)`

Makes manual POST/PUT/DELETE requests to the API.

```typescript
const result = await apiRequest('/users', 'POST', { username: 'john' });
```

## Navigation

The app uses React Router for client-side navigation with a persistent navbar showing:

- 🏠 Home
- 👥 Users
- 📝 Activities
- 💪 Workouts
- 🤝 Teams
- 🏆 Leaderboard

## Styling

All components use Bootstrap 5 for responsive design and styling. The application includes:

- Bootstrap CSS framework
- Responsive grid layouts
- Bootstrap components (tables, cards, pagination, badges)
- Custom CSS for additional styling (`src/index.css`)

## Environment Variables

### Required

- `VITE_CODESPACE_NAME` - Your GitHub Codespace name (e.g., `my-codespace-name`)

### Optional

None currently defined, but can be added as needed for future features.

## Troubleshooting

### API calls return "undefined-8000" errors

**Solution**: Make sure `VITE_CODESPACE_NAME` is set in `.env.local`:

```env
VITE_CODESPACE_NAME=your-actual-codespace-name
```

Then restart the dev server.

### Port 5173 already in use

**Solution**: Specify a different port when running dev:

```bash
npm run dev -- --port 3000
```

### TypeScript errors

**Solution**: Run TypeScript compiler:

```bash
npx tsc --noEmit
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Activities.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── Teams.jsx
│   │   ├── Users.jsx
│   │   └── Workouts.jsx
│   ├── hooks/               # Custom React hooks
│   │   └── useApi.js
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── .env.local.example       # Environment template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## Technology Stack

- **React** 19 - UI framework
- **React Router** 6 - Client-side routing
- **Vite** 5 - Build tool and dev server
- **Bootstrap** 5 - CSS framework
- **TypeScript** - Type safety
