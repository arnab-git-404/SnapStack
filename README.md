# 📸 Photo Gallery

A polished, password-gated gallery artistry and memories. Built with Vite + React + TypeScript + Tailwind CSS for a fast, responsive, and modern viewing experience.

## ✨ Features

- 🔐 Password-protected landing via [`PasswordGate`](src/components/PasswordGate.tsx)
- 🖼️ Dynamic photo grids powered by [`PhotoCard`](src/components/PhotoCard.tsx) and [`ArtworkCard`](src/components/ArtworkCard.tsx)
- 🧭 Smooth navigation with [`Navbar`](src/components/Navbar.tsx) and a curated [`Footer`](src/components/Footer.tsx)
- 🗓️ Year-based filtering through [`YearFilter`](src/components/YearFilter.tsx)
- ⚡ Vite dev server with instant updates and Tailwind-powered styling

## 🧰 Tech Stack

- React 18 + TypeScript
- Vite build tooling
- Tailwind CSS + PostCSS
- Node.js package scripts

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit the local dev server (default: http://localhost:5173) and enter the configured passphrase.

### Production Build

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

## 🗂️ Project Structure

```text
src/
├─ App.tsx
├─ components/
│  ├─ Navbar.tsx
│  ├─ Footer.tsx
│  ├─ PasswordGate.tsx
│  ├─ PhotoCard.tsx
│  ├─ ArtworkCard.tsx
│  └─ YearFilter.tsx
├─ data/
│  ├─ deblinaPhotos.ts
│  ├─ arnabPhotos.ts
│  └─ artworks.ts
├─ hooks/
├─ lib/
└─ pages/
```

- [`App`](src/App.tsx): entry composition root
- [`main`](src/main.tsx): client bootstrap with ReactDOM
- [`index.css`](src/index.css) & [`App.css`](src/App.css): Tailwind layers + global tweaks
- [`deblinaPhotos`](src/data/deblinaPhotos.ts), [`arnabPhotos`](src/data/arnabPhotos.ts), [`artworks`](src/data/artworks.ts): content catalogs

## 🔧 Configuration

- Update Tailwind and theme tokens in [`tailwind.config.ts`](tailwind.config.ts)
- Adjust Vite settings in [`vite.config.ts`](vite.config.ts)
- Control component registration via [`components.json`](components.json) if using UI tooling

## 📸 Content Management

Add or modify photo entries in the data files under [`src/data`](src/data). Each entry drives the metadata rendered by the corresponding card components, keeping the UI configuration-free.

## 🤝 Contributing

1. Fork and clone
2. Create a feature branch
3. Commit with clear messages
4. Open a pull request with context and screenshots

## 🛟 Support

For issues, open a GitHub ticket or reach out to the maintainer. Contributions, feedback, and new memories are always welcome! 💌