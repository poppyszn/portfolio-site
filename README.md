# Precious Okpor - DevOps Portfolio

A modern, high-converting portfolio website built with React and Vite.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed ([Download here](https://nodejs.org/))
- npm or yarn package manager

### Installation

1. **Extract the zip file** and open terminal in the project folder

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and go to `http://localhost:5173`

That's it! 🎉

---

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `dist` folder with all your static files.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Free)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy" - done!

### Option 2: Netlify (Free)
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your repo and deploy

### Option 3: GitHub Pages (Free)
1. Install gh-pages: `npm install gh-pages --save-dev`
2. Add to package.json scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Run: `npm run deploy`

### Option 4: Traditional Server (Nginx/Apache)
1. Run `npm run build`
2. Upload the contents of the `dist` folder to your server
3. Configure your web server to serve the files

---

## ✏️ Customization

### Update Your Info
Edit `src/App.jsx` to update:
- Your name and bio
- Social links (LinkedIn, GitHub)
- Projects and descriptions
- Work experience
- Skills list
- Contact email

### Change Colors
Find and replace these values in `src/App.jsx`:
- Primary accent: `#00ffc8` (cyan/teal)
- Background: `#0a0a0f` (dark)
- Secondary: `#8b949e` (gray text)

### Add Your Photo
1. Add your image to the `public` folder
2. Reference it in the code where needed

---

## 📁 Project Structure

```
precious-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx        # Main portfolio component
│   └── main.jsx       # React entry point
├── index.html         # HTML template with SEO tags
├── package.json       # Dependencies and scripts
├── vite.config.js     # Vite configuration
└── README.md          # This file
```

---

## 🔧 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS-in-JS** - Inline styles for simplicity
- **Google Fonts** - IBM Plex Sans, JetBrains Mono, Space Grotesk

---

## 📞 Need Help?

If you run into any issues:
1. Make sure Node.js is installed: `node --version`
2. Delete `node_modules` and run `npm install` again
3. Clear your browser cache
