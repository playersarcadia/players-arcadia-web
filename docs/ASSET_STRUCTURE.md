# Asset Structure Guide

This document explains the directory structure for static assets in the Players Arcadia web application.

## Directory Structure

```
public/
├── images/              # General images (hero sections, banners, backgrounds)
├── icons/               # Icon files (SVG, PNG icons)
└── assets/
    ├── logos/           # Logo files (company logos, brand logos)
    ├── games/           # Game-related images (game logos, screenshots)
    └── partners/        # Partner logos and images
```

## Usage in Next.js

### Using Images in Components

#### Option 1: Using Next.js Image Component (Recommended)
```tsx
import Image from 'next/image';

<Image
  src="/images/hero-banner.jpg"
  alt="Hero Banner"
  width={1200}
  height={600}
  priority
/>
```

#### Option 2: Using Regular img Tag
```tsx
<img src="/images/hero-banner.jpg" alt="Hero Banner" />
```

#### Option 3: Using SVG Icons
```tsx
import Image from 'next/image';

<Image
  src="/icons/logo.svg"
  alt="Logo"
  width={40}
  height={40}
/>
```

### Path Reference

All files in the `public` directory are served from the root path `/`:
- `public/images/hero.jpg` → `/images/hero.jpg`
- `public/icons/logo.svg` → `/icons/logo.svg`
- `public/assets/logos/company.png` → `/assets/logos/company.png`

## Best Practices

1. **Image Optimization**: Always use Next.js `Image` component for better performance
2. **File Naming**: Use kebab-case for file names (e.g., `hero-banner.jpg`)
3. **File Formats**:
   - Use `.svg` for icons and logos
   - Use `.jpg` or `.webp` for photos
   - Use `.png` for images with transparency
4. **Organization**: Keep related assets in their respective folders
5. **File Size**: Optimize images before adding them to the repository

## Current Assets Needed

Based on the design, you'll need:

- `/public/images/hero-soccer.jpg` - Hero section soccer image
- `/public/images/football-player.jpg` - Football player image
- `/public/images/soldiers-bg.jpg` - Background image for CTA section
- `/public/icons/logo.svg` - Main logo (if using SVG instead of inline)
- `/public/assets/games/cod-mobile.jpg` - Call of Duty Mobile image
- `/public/assets/games/fc26.jpg` - EA Sports FC 26 image
- `/public/assets/partners/` - Partner logos

