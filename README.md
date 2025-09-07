# Ghibli-Inspired Developer Portfolio

A modern, production-ready single-page portfolio website designed with a Ghibli-inspired aesthetic. Built using React, Tailwind CSS, and Framer Motion, the site combines clean technical architecture with immersive visual design to highlight projects, skills, and professional experience.  

![Portfolio Preview](https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800)

---

## Features

### Design & Aesthetics
- Ghibli-inspired visual style with soft pastels, organic shapes, and whimsical elements  
- Fully responsive layout optimized for desktop, tablet, and mobile devices  
- Light and dark theme support with smooth transitions  
- Animated particle background with clouds, sparkles, and subtle motion  
- Modern gradient backgrounds and carefully selected color palette  

### Interactive Elements
- Smooth scrolling for seamless navigation between sections  
- Hero section with dynamic typing animation  
- Scroll-triggered animations to bring elements into view  
- Hover-based micro-interactions for buttons and cards  
- Animated project modals with detailed project information  
- Contact form with integrated form handling and validation  

### Technical Implementation
- Built with React 18+ and modern hooks  
- Framer Motion for smooth animations and transitions  
- Tailwind CSS for a scalable utility-first styling approach  
- TypeScript support (optional) for type safety  
- Modular and maintainable component architecture  
- Optimized for performance and fast load times  

### Contact and Form Handling
- Formspree integration for handling submissions  
- Google Sheets integration for structured data storage  
- reCAPTCHA integration for spam protection  
- Multiple form types supported: general contact, project inquiries, and newsletter subscription  
- Visual feedback for successful form submissions  

---

## Getting Started

### Prerequisites
- Node.js 18+  
- npm or yarn  

### Installation

1. Clone the repository  
   ```bash
   git clone <repository-url>
   cd ghibli-portfolio
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Copy environment variables  
   ```bash
   cp .env.example .env
   ```

4. Configure Formspree and Google Sheets integration (detailed setup included below).  

5. Start the development server  
   ```bash
   npm run dev
   ```  

6. Open your browser at:  
   ```
   http://localhost:5173
   ```  

---

## Project Structure

```
src/
├── components/
│   ├── Hero/
│   ├── About/
│   ├── Portfolio/
│   ├── Services/
│   ├── Contact/
│   ├── Footer/
│   ├── ParticleBackground.jsx
│   ├── TypingAnimation.jsx
│   └── ThemeToggle.jsx
├── hooks/
├── data/
├── App.jsx
├── main.jsx
└── index.css
```

- **Hero**: Landing section with animated introduction  
- **About**: Skills and background  
- **Portfolio**: Project showcase with filtering and modals  
- **Services**: Professional offerings  
- **Contact**: Form with Formspree integration  
- **Footer**: Social links and newsletter signup  

---

## Customization

- **Personal Details**: Update `Contact.jsx` with your email and links  
- **Projects**: Edit `projects.json` in `src/data/`  
- **Skills**: Update `skills.json` in `src/data/`  
- **Styling**: Customize colors in `tailwind.config.js`  

---

## Deployment

The project supports deployment on Vercel, Netlify, and GitHub Pages.  

- **Vercel (recommended)**: Push the repository and connect it to your Vercel account. Configure environment variables in the dashboard.  
- **Netlify**: Build locally and deploy the `dist` folder or set up continuous deployment from GitHub.  
- **GitHub Pages**: Use the `gh-pages` package for automated deployment.  

Security configurations are included for HTTPS, content security policies, and optimized caching.  

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build  

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.  

---

## Acknowledgments

- Inspired by the art and atmosphere of Studio Ghibli films  
- Images from [Pexels](https://pexels.com)  
- Icons from [Lucide React](https://lucide.dev)  
- Animations powered by [Framer Motion](https://framer.com/motion)  
- Styling with [Tailwind CSS](https://tailwindcss.com)  

---

## Contact

For inquiries: [contact@freestackdev.com](mailto:contact@freestackdev.com)  
