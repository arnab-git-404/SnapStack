# 📸 SnapStack - Contemporary Photo Album

A beautiful, modern photo gallery application built with React, TypeScript, and Tailwind CSS. This project features secure authentication, dynamic photo management, interactive puzzles, and a sleek dark mode interface.

![Version](https://img.shields.io/badge/version-0.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css)

## ✨ Features

### 🎨 Core Features
- **📱 Responsive Design** - Fully responsive across all devices
- **🌓 Dark/Light Mode** - Seamless theme switching with `next-themes`
- **🔐 Secure Authentication** - Protected routes with JWT-based auth
- **📤 Photo Upload** - Admin dashboard for uploading photos to GitHub & MongoDB
- **🖼️ Dynamic Galleries** - Separate galleries for individuals and couples
- **🧩 Interactive Puzzle Game** - Transform photos into jigsaw puzzles
- **⚡ Real-time Updates** - Photos appear instantly without refresh
- **🎭 Smooth Animations** - Beautiful transitions with Framer Motion
- **🔍 Year Filtering** - Filter photos by year
- **💫 Smooth Scrolling** - Enhanced UX with Lenis smooth scroll

### 🛡️ Authentication Features
- Login & Signup
- Password Reset via Email
- Protected Routes
- Session Management

### 📁 Gallery Organization
- Personal Gallery (Arnab)
- Partner Gallery (Deblina)
- Together Gallery
- Year-based filtering
- Full-screen photo viewer
- Photo navigation (Previous/Next)

## 🚀 Tech Stack

### Frontend
- **React 18.3.1** - UI Library
- **TypeScript 5.8.3** - Type Safety
- **Vite 5.4.19** - Build Tool
- **Tailwind CSS 3.4.17** - Styling
- **Framer Motion 12.23.24** - Animations
- **React Router DOM 6.30.1** - Routing

### UI Components & Libraries
- **Radix UI** - Accessible component primitives (Dialog, Dropdown, Select, etc.)
- **Shadcn/ui** - Beautiful, customizable components
- **Lucide React 0.462.0** - Icon library
- **React Icons 5.5.0** - Additional icons
- **Embla Carousel 8.6.0** - Touch-friendly carousel
- **Recharts 2.15.4** - Chart library
- **CMDK 1.1.1** - Command menu
- **Vaul 0.9.9** - Drawer component

### State & Data Management
- **TanStack React Query 5.83.0** - Server state management
- **React Hook Form 7.61.1** - Form handling
- **Zod 3.25.76** - Schema validation

### Utilities & Enhancement
- **Class Variance Authority 0.7.1** - CSS variant management
- **Tailwind Merge 2.6.0** - Merge Tailwind classes
- **CLSX 2.1.1** - Conditional class names
- **Date-fns 3.6.0** - Date manipulation
- **Lenis 1.3.11** - Smooth scroll library
- **React Hot Toast 2.6.0** - Toast notifications
- **Sonner 1.7.4** - Toast notifications alternative

### Storage & Backend
- **MongoDB** - Photo metadata storage
- **GitHub** - Image hosting (CDN)

## 📦 Installation

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
```

### Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/photo_gallery.git

# Navigate to project directory
cd photo_gallery

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Authentication
VITE_LOGIN_PASSWORD="your_password"

# Server URL
VITE_SERVER_URL="https://your-server-url.com"
# VITE_SERVER_URL="http://localhost:5000"  # For local development

# Client Configuration
VITE_CLIENT_NAME="yourName"
VITE_CLIENT_PARTNER_NAME="partnerName"
VITE_CLIENT_TOGETHER_NAME="togetherName"
```

## 🎯 Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Development build
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 📂 Project Structure

```
photo_gallery/
├── public/
│   ├── robots.txt
│   └── Home/
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PhotoCard.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── ...
│   ├── data/
│   │   ├── photos.ts
│   │   ├── arnabPhotos.ts
│   │   ├── deblinaPhotos.ts
│   │   └── artworks.ts
│   ├── hooks/
│   │   ├── usePhotos.tsx
│   │   └── use-toast.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── yourName.tsx
│   │   ├── partnerName.tsx
│   │   ├── Together.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── Puzzle.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── vercel.json
```

## 🎨 Key Features Breakdown

### 🔐 Authentication Flow
```typescript
// Protected route wrapper
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

### 📤 Admin Upload System
- Image upload to GitHub (CDN)
- Metadata storage in MongoDB
- Category-based organization
- Year and location tagging

### 🧩 Puzzle Game
```typescript
// Transform any photo into a puzzle
<JigsawPuzzle
  imageSrc={imageUrl}
  rows={4}
  columns={4}
  onSolved={handleSolved}
/>
```

### 🎭 Animations
```typescript
// Smooth page transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</motion.div>
```

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  // ... more colors
}
```

### Environment Variables
Update `.env` to change:
- Client names
- Server URLs
- Authentication passwords

## 📱 Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/` | Home page | ✅ |
| `/login` | Login page | ❌ |
| `/signup` | Signup page | ❌ |
| `/forgot-password` | Password reset | ❌ |
| `/${name}` | Personal gallery | ✅ |
| `/${partnerName}` | Partner gallery | ✅ |
| `/${together}` | Couple gallery | ✅ |
| `/puzzle` | Puzzle game | ✅ |
| `/upload` | Admin dashboard | ✅ |

## 🛠️ Development

### Code Style
- ESLint 9.32.0 configured with TypeScript support
- Prettier for code formatting (recommended)
- TypeScript ESLint 8.38.0
- React Hooks ESLint Plugin 5.2.0

### Component Library
This project uses [shadcn/ui](https://ui.shadcn.com/) components. Configuration in `components.json`.

### Available Radix UI Components
- Accordion
- Alert Dialog
- Aspect Ratio
- Avatar
- Checkbox
- Collapsible
- Context Menu
- Dialog
- Dropdown Menu
- Hover Card
- Label
- Menubar
- Navigation Menu
- Popover
- Progress
- Radio Group
- Scroll Area
- Select
- Separator
- Slider
- Switch
- Tabs
- Toast
- Toggle
- Toggle Group
- Tooltip

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Vercel Deployment
The project includes `vercel.json` for seamless Vercel deployment:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## 📊 Performance Features
- ⚡ Vite 5.4.19 for lightning-fast builds
- 🎨 Tailwind CSS 3.4.17 for optimized styling
- 📦 Code splitting with React lazy loading
- 🖼️ Image optimization with GitHub CDN
- 🔄 React Query 5.83.0 for efficient data fetching
- 🎭 Framer Motion 12.23.24 for smooth animations
- 💨 SWC for faster compilation (@vitejs/plugin-react-swc)

## 📚 Dependencies Overview

### Production Dependencies (54)
- **UI Components**: 27 Radix UI components
- **Styling**: Tailwind CSS + utilities (clsx, tailwind-merge, cva)
- **State Management**: React Query 5.83.0
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM 6.30.1
- **Animations**: Framer Motion 12.23.24
- **Date Handling**: date-fns 3.6.0
- **Charts**: Recharts 2.15.4
- **Carousel**: Embla Carousel 8.6.0
- **Notifications**: React Hot Toast + Sonner
- **Smooth Scroll**: Lenis 1.3.11
- **Puzzle Game**: react-jigsaw-puzzle 1.0.5
- **Resizable Panels**: react-resizable-panels 2.1.9

### Development Dependencies (16)
- **Build Tool**: Vite 5.4.19
- **TypeScript**: 5.8.3
- **Linting**: ESLint 9.32.0 + plugins
- **CSS Processing**: PostCSS + Autoprefixer
- **Tailwind Plugins**: @tailwindcss/typography
- **Code Quality**: Lovable Tagger

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🐛 Known Issues

- None currently reported

## 🗺️ Roadmap

- [ ] Add photo comments feature
- [ ] Implement photo sharing
- [ ] Add photo search functionality
- [ ] Create mobile app version
- [ ] Add video support

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible components
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [TanStack Query](https://tanstack.com/query) for powerful data synchronization
- [Vite](https://vitejs.dev/) for blazing fast development

## 📞 Contact

**Developer**: Arnab Mukherjee

For any queries or support, please open an issue in the repository.

---

<div align="center">
  
### SnapStack 💖

**⭐ Star this repo if you find it helpful!**

</div>