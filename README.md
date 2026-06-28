# Miss. W Coffee

Miss. W Coffee is a responsive business website for an Ethiopian coffee importer. It presents sourcing programs, quality controls, trade promises, and a buyer inquiry form backed by an Express API.

## Tech Stack

- React 19
- Vite
- Express
- Firebase client SDK
- Firebase Admin SDK
- Lucide React icons

## Project Structure

```text
.
├── index.html
├── package.json
├── server/
│   ├── firebaseAdmin.js
│   └── index.js
└── src/
    ├── firebase.js
    ├── main.jsx
    └── styles.css
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Run the React app and Express API together:

```bash
npm run dev
```

The client runs with Vite and the API runs on `http://localhost:5000` by default.

## Available Scripts

- `npm run dev` starts the client and server together.
- `npm run dev:client` starts only the Vite client.
- `npm run dev:server` starts only the Express server with Nodemon.
- `npm run build` creates a production build in `dist/`.
- `npm run start` starts the Express server and serves the built app from `dist/`.
- `npm run preview` previews the Vite production build.

## Inquiry Form API

The contact form posts to:

```text
POST /api/inquiries
```

Required fields:

- `name`
- `email`
- `message`

Optional fields:

- `company`
- `volume`

If Firebase Admin credentials are configured, inquiries are saved in the `tradeInquiries` Firestore collection. If credentials are missing, the server stores inquiries in memory for demo/testing mode.

## Firebase Setup

Copy `.env.example` to `.env`, then add Firebase values as needed.

For browser-side Firebase config:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

For server-side Firestore writes, use either a full service account JSON:

```env
FIREBASE_SERVICE_ACCOUNT=
```

Or individual service account fields:

```env
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

## Production

Build the frontend:

```bash
npm run build
```

Start the server:

```bash
npm run start
```

The Express server serves both the API and the static production files from `dist/`.
