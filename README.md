# Taskmaster

A modern, minimalist todo list application with timeline view, built with React + Vite + TailwindCSS + IndexedDB.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tech Stack](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![Tech Stack](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

## Features

### Core Functionality
- ✅ **Create, Read, Update, Delete** tasks
- ✅ **Mark complete/incomplete** with completion timestamp
- ✅ **Persistent storage** via IndexedDB (data survives browser restarts)

### Task Organization
- 🏷️ **Priority levels**: High / Medium / Low
- 📅 **Due dates** with overdue detection
- 🏷️ **Tags** for categorization (up to 5 per task)
- ✏️ **Inline editing** - click any task to edit

### Views
- 📋 **List View**: Traditional todo list grouped by status
- 📊 **Timeline View**: Tasks organized by time (Overdue / Today / Tomorrow / This Week / Completed)

### Filtering & Search
- 🔍 **Full-text search** across task content and tags
- 🎚️ **Status filter**: All / Active / Completed
- 🎯 **Priority filter**: High / Medium / Low
- 🏷️ **Tag filter**: Click any tag to filter

### Statistics Dashboard
- Real-time counts: Total / Active / Completed / Overdue
- Priority distribution breakdown
- Visual indicators for overdue tasks

## Design

**Monochrome SaaS Aesthetic**
- Clean black, white, and gray color palette
- Refined shadows and subtle transitions
- Minimal, modern UI components
- Consistent system font stack for optimal readability

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Styling | TailwindCSS 4 |
| Storage | IndexedDB (local) |
| Linting | ESLint |

## Project Structure

```
src/
├── components/          # React components
│   ├── InputArea.jsx   # Task input form
│   ├── TodoList.jsx    # List view
│   ├── TodoItem.jsx    # Single task item
│   ├── TimelineView.jsx # Timeline visualization
│   ├── StatsCard.jsx   # Statistics dashboard
│   ├── FilterBar.jsx   # Search & filters
│   ├── EditModal.jsx   # Task editor modal
│   └── ...
├── hooks/
│   ├── useTodos.jsx    # Main state management
│   └── useIndexedDB.jsx # Database operations
├── utils/
│   ├── constants.js    # App constants
│   └── dateUtils.js    # Date formatting & logic
└── App.jsx             # Root component
```

## Browser Support

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)

IndexedDB requires a modern browser for data persistence.

## Deploy to GitHub Pages

### Automatic Deployment (Recommended)

This project includes a GitHub Actions workflow for automatic deployment.

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Source: Select **GitHub Actions**

3. **Access your site:**
   - URL: `https://<username>.github.io/todo-list/`

### Manual Deployment

```bash
# Install gh-pages (one time)
npm install -g gh-pages

# Build and deploy
npm run build
gh-pages -d dist
```

## License

MIT
