# Mirimera — Software Development Company

A modern marketing landing page for Mirimera, built with Next.js, Tailwind CSS v4, TypeScript, and React Aria.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4.1
- **Language:** TypeScript 5.8
- **Components:** Untitled UI React + React Aria
- **Icons:** @untitledui/icons

## Project structure

```
src/
├── app/                  # Next.js app directory
│   ├── landing-page-17.tsx  # Main landing page
│   ├── page.tsx          # Root route (renders landing page)
│   └── layout.tsx        # Root layout with metadata
├── assets/logo/          # Brand logos (PNG)
├── components/           # UI components
│   ├── application/      # App-level components
│   ├── base/             # Base UI components
│   ├── foundations/       # Logo, theme foundations
│   ├── marketing/        # Header navigation, dropdowns
│   └── shared-assets/    # Section dividers, patterns
├── styles/               # Global CSS and theme variables
└── utils/                # Utility functions
```

## Customization

- **Brand color:** Edit `--color-brand-*` values in `src/styles/theme.css`
- **Logo:** Replace files in `src/assets/logo/`
- **Content:** Edit `src/app/landing-page-17.tsx`

## License

Built with Untitled UI React components. Open-source components are MIT licensed. PRO components are subject to the [Untitled UI license](https://www.untitledui.com/license).
