# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Framer Motion animations.

## Features

- ✅ Responsive design that works on all devices
- ✅ Smooth page transitions and animations using Framer Motion
- ✅ Dark mode support with theme switching
- ✅ Interactive components with hover effects
- ✅ Sections for bio, skills, education, experience, projects, and achievements
- ✅ Contact form
- ✅ Social media integration
- ✅ Resume preview and download capability

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Shadcn UI](https://ui.shadcn.com/) - UI components
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
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

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/app                  # Next.js App Router
  /components         # App-specific components
  globals.css         # Global styles
  layout.tsx          # Root layout
  page.tsx            # Home page
/components           # Reusable components
  /ui                 # UI components
/hooks                # Custom React hooks
/lib                  # Utility functions
/public               # Static assets
  /images             # Image files
```

## Customization

### Personal Information

Edit page.tsx to update:
- Name and biography
- Social media links
- Skills and statistics

### Content Sections

Each section is a separate component in components:
- Update education details in `education.tsx`
- Modify project information in `projects.tsx`
- Edit experience history in `experience.tsx`
- Change achievements in `achievements.tsx`

### Styling

This project uses Tailwind CSS for styling:
- Global styles are in globals.css
- Theme configuration is in tailwind.config.ts

## Deployment

The portfolio can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
ntl deploy
```

## License

MIT

---

Feel free to use this template for your own portfolio! If you found it useful, please consider giving it a star ⭐️
