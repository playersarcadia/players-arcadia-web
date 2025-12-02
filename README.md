# players-arcadia-web
Players Arcadia: Pro-level tools for running seamless mobile esports tournaments with fast, effortless payouts across the continent.

## Project Structure

```
players-arcadia-web/
├── app/                 # Next.js App Router pages and layouts
├── components/          # React components
├── public/              # Static assets (served from root)
│   ├── images/          # General images (hero, banners)
│   ├── icons/           # Icon files (SVG, PNG)
│   └── assets/          # Organized asset folders
│       ├── logos/       # Logo files
│       ├── games/       # Game-related images
│       └── partners/    # Partner logos
├── docs/                # Documentation
└── ...
```

## Asset Directory Structure

All static assets should be placed in the `public/` directory:

- **`/public/images/`** - Hero images, banners, backgrounds
- **`/public/icons/`** - Icon files (SVG, PNG)
- **`/public/assets/logos/`** - Company and brand logos
- **`/public/assets/games/`** - Game logos and screenshots
- **`/public/assets/partners/`** - Partner logos

Files in `public/` are accessible from the root path:
- `public/images/hero.jpg` → `/images/hero.jpg`
- `public/icons/logo.svg` → `/icons/logo.svg`

For detailed asset usage guide, see [docs/ASSET_STRUCTURE.md](./docs/ASSET_STRUCTURE.md)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **ESLint** - Code linting
- **Jest** - Testing framework
- **React Testing Library** - Component testing

## Testing

Run tests with:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

Tests are located in the `__tests__` directory and follow the same structure as the source code.

## Git Hooks (Husky)

This project uses [Husky](https://typicode.github.io/husky/) to run Git hooks:

- **pre-commit**: Runs `lint-staged` to lint and format staged files before committing
- **pre-push**: Runs tests before pushing to ensure all tests pass

To bypass hooks (not recommended):
```bash
git commit --no-verify
git push --no-verify
```
