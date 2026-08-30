# Expensify

A React clone of the Expensify website and dashboard, built as part of the MERN stack practice series. Recreates the marketing landing page along with a multi-page dashboard experience.

## Features

### Landing Page
- Hero section with animated background and email signup
- Feature grid showcasing expense management, travel, receipt scanning, virtual cards, and more, with a "See All Features" toggle
- Auto-scrolling logo reel of trusted brands
- Testimonials section with customer reviews
- Ratings and award badges (G2 leader, top rated, shortlist)
- FAQ section
- Bottom CTA section for signup
- Google sign-in modal with grayscale background effect on open

### Dashboard
- Inbox, Spend, and Workspaces pages
- Account section with sub-pages: Agents, Expense, Profile, and Wallet
- Profile page syncs live with Firebase Firestore, so user detail changes reflect in real time

### Theming
- Full dark and light mode support across the entire app, powered by a custom `useToggle` hook

## Tech Stack

- **React** — component structure and page routing
- **React Router** — navigation between landing page and dashboard pages
- **Tailwind CSS** — styling and responsive layout
- **Firebase / Firestore** — authentication and live data sync for user profile
- **React Icons** — icon set for logos, ratings, and UI elements

## Project Structure

```
src/
├── assets/          # icons, badges, images
├── components/       # reusable UI components (Card, Greenbtn, Googlebtn, Firstcard, Testcards, Faq, etc.)
├── pages/
│   ├── Home.jsx
│   ├── Firstcards.jsx
│   ├── Footer.jsx
│   └── dashboard/
│       ├── Dashboardhome.jsx
│       ├── Inbox.jsx
│       ├── Spend.jsx
│       ├── Workspaces.jsx
│       └── account/
│           ├── Agents.jsx
│           ├── Expense.jsx
│           ├── Profile.jsx
│           └── Wallet.jsx
```

## What This Project Practices

- Building multi-page apps with nested routing
- Creating and using a custom React hook for shared state (theme toggling)
- Integrating Firebase Authentication and Firestore into a React app
- Structuring reusable, prop-driven components across a large page set
- Replicating a real-world SaaS landing page layout and interaction patterns

## Status

Actively being built out. Firebase live sync is currently implemented on the Profile page, with plans to extend it further across the dashboard.
