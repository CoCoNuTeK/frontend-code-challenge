# Pokemon Frontend Challenge

A modern Pokedex application built with Next.js that allows users to browse, search, and favorite Pokemon.

## Implementation Details

### Tech Stack
- **Next.js** - React framework for the application
- **SCSS Modules** - For component-scoped styling
- **GraphQL** - For efficient data fetching from the backend

### Key Features
- Grid/List view toggle for Pokemon display
- Real-time search functionality
- Type-based filtering with dropdown
- Favorite system with dedicated favorites tab
- Modal view for detailed Pokemon information including:
  - High-quality images
  - Stats (CP, HP)
  - Type information
  - Pokemon sound playback
  - Weight and height details

### Data Management
- Initial minimal data fetch for Pokemon cards
- Lazy loading of detailed Pokemon information when opening modal
- Local state management using React hooks
- Real-time favorite status syncing with backend

## Running the Project

1. Ensure the backend server is running (see main README)
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```