# Data Breach Viewer

A Next.js application to view and explore known data breaches. This application fetches data from an external API and displays it in a user-friendly interface.

## Features

- View a list of known data breaches with titles, breach dates, and icons
- Lazy-loading / infinite scrolling to view all breaches
- Detailed view for each breach with complete information
- Persistent state on refresh (stays on the same breach detail)
- Automatic light/dark mode based on user's system preferences
- Manual toggle for light/dark mode
- Fully responsive design for mobile and desktop

## Technologies Used

- Next.js 14
- TypeScript
- React
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd breach-viewer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

To run the production build:

```bash
npm start
# or
yarn start
```

## API Details

The application connects to an external API endpoint:
- Base URL: `https://hiring.external.guardio.dev/fe/breaches`
- Authentication: Header `X-Best-Pokemon` with a Pokemon name
- Pagination: Uses offset query parameter

## Project Structure

- `src/app/` - Main application code
  - `components/` - Reusable UI components
  - `services/` - API services and data fetching logic
  - `breach/[id]/` - Dynamic route for breach details
  - `page.tsx` - Home page with breach listing
  - `providers.tsx` - Context providers (theme)
  - `globals.css` - Global styles and theme variables

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
