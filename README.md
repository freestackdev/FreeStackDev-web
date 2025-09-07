# 🧙‍♂️ Free Stack Dev - Ghibli-Inspired Developer Portfolio

A stunning, production-ready single-page portfolio website for Free Stack Dev with Ghibli-inspired aesthetics, built with modern React and enhanced with beautiful animations and interactions.

![Portfolio Preview](https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800)

## ✨ Features

### 🎨 Design & Aesthetics
- **Ghibli-inspired Design**: Soft pastels, organic shapes, and whimsical elements
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Seamless theme switching with smooth transitions
- **Floating Particles**: Animated background elements (sparkles, nature, clouds)
- **Modern Gradients**: Beautiful gradient backgrounds throughout

### 🚀 Interactive Features
- **Smooth Scrolling**: Elegant navigation between sections
- **Typing Animation**: Dynamic hero headline with rotating text
- **Scroll Animations**: Elements animate into view as you scroll
- **Hover Effects**: Engaging micro-interactions on all interactive elements
- **Project Modals**: Detailed project information in animated modals
- **Contact Form**: Working contact form with EmailJS integration

### 🏗️ Technical Excellence
- **Modern React 18+**: Built with latest React features and hooks
- **Framer Motion**: Smooth animations and page transitions
- **Tailwind CSS 3+**: Utility-first CSS framework for rapid styling
- **TypeScript Ready**: Full TypeScript support (optional)
- **Modular Architecture**: Clean, maintainable component structure
- **Performance Optimized**: Fast loading with optimized assets

### 📧 Contact Integration
- **Formspree Integration**: Send form submissions directly to Google Sheets
- **Form Validation**: Client-side form validation
- **Success States**: Visual feedback for form submissions
- **Responsive Forms**: Beautiful forms that work on all devices
- **Newsletter Subscription**: Collect email subscriptions in footer
- **Multiple Form Types**: Contact form, hire me form, and newsletter signup

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ghibli-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Configure Formspree + Google Sheets**
   - Sign up at [Formspree](https://formspree.io/)
   - Create a new form and get your form ID
   - **Connect to Google Sheets** (detailed steps below)
   - Add your credentials to `.env`:
   ```env
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
   ```
   - Update the form endpoints in the components with your actual Formspree ID

### 📊 **Google Sheets Integration Setup**

Follow these detailed steps to connect your forms to Google Sheets for automatic data collection:

#### **Step 1: Create Google Sheet**
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Portfolio Form Submissions"
4. Create separate sheets for different forms:
   - **Contact Form** (Sheet 1)
   - **Hire Me Requests** (Sheet 2) 
   - **Newsletter Subscriptions** (Sheet 3)

#### **Step 2: Set Up Sheet Headers**
Add these column headers to organize your data:

**Contact Form Sheet:**
```
A1: Timestamp | B1: Name | C1: Email | D1: Subject | E1: Message | F1: Form Type
```

**Hire Me Sheet:**
```
A1: Timestamp | B1: Name | C1: Email | D1: Company | E1: Country | F1: Project Type | G1: Budget | H1: Timeline | I1: Message | J1: Form Type
```

**Newsletter Sheet:**
```
A1: Timestamp | B1: Email | C1: Form Type
```

#### **Step 3: Connect Formspree to Google Sheets**
1. **In Formspree Dashboard:**
   - Go to your form settings
   - Click on "Integrations" tab
   - Find "Google Sheets" integration
   - Click "Connect to Google Sheets"

2. **Authorize Google Account:**
   - Sign in with your Google account
   - Grant Formspree permission to access your Google Sheets
   - Select the spreadsheet you created

3. **Map Form Fields:**
   - Choose which sheet to use for this form
   - Map form fields to spreadsheet columns:
     - `name` → Name column
     - `email` → Email column
     - `subject` → Subject column (contact form)
     - `message` → Message column
     - `_form_type` → Form Type column
     - Add timestamp mapping for submission time

4. **Test Integration:**
   - Submit a test form from your website
   - Check that data appears in your Google Sheet
   - Verify all fields are mapped correctly

#### **Step 4: Configure Multiple Forms (Optional)**
If you want separate Google Sheets for different forms:

1. **Create separate Formspree forms:**
   - Contact Form: `https://formspree.io/f/CONTACT_FORM_ID`
   - Hire Me Form: `https://formspree.io/f/HIRE_ME_FORM_ID`
   - Newsletter: `https://formspree.io/f/NEWSLETTER_FORM_ID`

2. **Update environment variables:**
   ```env
   VITE_FORMSPREE_CONTACT_ENDPOINT=https://formspree.io/f/CONTACT_FORM_ID
   VITE_FORMSPREE_HIRE_ENDPOINT=https://formspree.io/f/HIRE_ME_FORM_ID
   VITE_FORMSPREE_NEWSLETTER_ENDPOINT=https://formspree.io/f/NEWSLETTER_FORM_ID
   ```

3. **Update component endpoints:**
   - `src/components/Contact/Contact.jsx` → Use `VITE_FORMSPREE_CONTACT_ENDPOINT`
   - `src/components/HireMeModal.jsx` → Use `VITE_FORMSPREE_HIRE_ENDPOINT`
   - `src/components/Footer/Footer.jsx` → Use `VITE_FORMSPREE_NEWSLETTER_ENDPOINT`

#### **Step 5: Security & Privacy**
1. **Sheet Permissions:**
   - Keep your Google Sheet **private** (not "Anyone with link can edit")
   - Only Formspree should have write access
   - You can share read-only access with team members if needed

2. **Data Protection:**
   - Regularly backup your sheet data
   - Consider setting up automated exports for compliance
   - Review and delete old submissions as per your privacy policy

#### **Step 6: Advanced Features (Optional)**
1. **Email Notifications:**
   - In Formspree, enable email notifications for new submissions
   - Set up custom email templates
   - Configure notification recipients

2. **Webhook Integration:**
   - Set up webhooks for real-time processing
   - Integrate with Slack, Discord, or other tools
   - Create automated workflows with Zapier

3. **Data Analysis:**
   - Use Google Sheets formulas to analyze submission trends
   - Create charts and graphs for insights
   - Set up conditional formatting for priority requests

#### **Troubleshooting Google Sheets Integration**

**Common Issues:**
- **Data not appearing:** Check Formspree integration status and re-authorize if needed
- **Missing fields:** Verify field mapping in Formspree dashboard
- **Permission errors:** Ensure Google account has proper access to the sheet
- **Duplicate entries:** Check for multiple form submissions or webhook loops

**Testing Checklist:**
- [ ] Test each form type (Contact, Hire Me, Newsletter)
- [ ] Verify data appears in correct Google Sheet tabs
- [ ] Check that all form fields are captured
- [ ] Confirm timestamps are recorded correctly
- [ ] Test email notifications (if enabled)

5. **Configure Google reCAPTCHA**
   - Sign up at [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
   - Create a new reCAPTCHA v2 site
   - Add your domain to the allowed domains list
   - Copy your site key to `.env`:
   ```env
   VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
   ```

6. **Start the development server**
```bash
npm run dev
```

7. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero/
│   │   └── Hero.jsx              # Hero section with typing animation
│   ├── About/
│   │   ├── About.jsx             # About section with skills
│   │   └── SkillOrb.jsx          # Individual skill component
│   ├── Portfolio/
│   │   ├── Portfolio.jsx         # Portfolio grid with filtering
│   │   ├── ProjectCard.jsx       # Individual project cards
│   │   └── ProjectModal.jsx      # Project detail modals
│   ├── Services/
│   │   └── Services.jsx          # Services offered section
│   ├── Contact/
│   │   └── Contact.jsx           # Contact form with EmailJS
│   ├── Footer/
│   │   └── Footer.jsx            # Footer with social links
│   ├── ParticleBackground.jsx    # Floating particle animations
│   ├── TypingAnimation.jsx       # Typewriter text effect
│   └── ThemeToggle.jsx           # Dark/light mode toggle
├── hooks/
│   ├── useTheme.js               # Theme management hook
│   └── useScrollAnimation.js     # Scroll-triggered animations
├── data/
│   ├── projects.json             # Portfolio projects data
│   └── skills.json               # Skills and proficiency data
├── App.jsx                       # Main app component
├── main.jsx                      # React entry point
└── index.css                     # Global styles and Tailwind
```

## 🎨 Customization

### 🔧 Personal Information
Update the following files with your information:

**Contact Details** (`src/components/Contact/Contact.jsx`):
```javascript
const contactInfo = [
  {
    title: "Email Me",
    content: "contact@freestackdev.com",  // Update this
    href: "mailto:contact@freestackdev.com"
  },
  // ... other contact info
];
```

**Projects** (`src/data/projects.json`):
```json
{
  "id": 1,
  "title": "Your Project Name",
  "description": "Your project description",
  "image": "your-image-url",
  "technologies": ["React", "Node.js"],
  "liveUrl": "your-live-url",
  "githubUrl": "your-github-url",
  "category": "fullstack"
}
```

**Skills** (`src/data/skills.json`):
```json
{
  "category": "Frontend",
  "skills": [
    { "name": "React", "level": 95, "icon": "⚛️" }
  ]
}
```

### 🎨 Styling & Theme
The portfolio uses a Ghibli-inspired color palette defined in `tailwind.config.js`:

```javascript
colors: {
  ghibli: {
    forest: '#2D4A22',
    sage: '#9CAF88', 
    cream: '#F5F1E8',
    terracotta: '#D4A574',
    sky: '#87CEEB',
    sunset: '#FFB347',
  },
}
```

### 📱 Adding New Sections
1. Create a new component in `src/components/`
2. Add scroll animation using the `useScrollAnimation` hook
3. Import and include in `src/App.jsx`
4. Add smooth scrolling navigation if needed

## 🚀 Deployment

### Production Build & Security

The project includes comprehensive production hardening:

**Build Commands:**
```bash
# Standard production build (minified, no source maps)
npm run build

# Build with bundle analysis
npm run build:analyze

# Build with source maps for error tracking (CI only)
npm run build:sourcemaps

# Pre-deployment checks (lint + typecheck + build)
npm run predeploy
```

**Production Security Features:**
- **Console removal**: All console.log/debug statements stripped in production
- **Source map protection**: Source maps not exposed publicly (optional CI upload to Sentry)
- **Error boundaries**: Graceful error handling with user-friendly messages
- **Bundle optimization**: Code splitting and minification
- **Cache headers**: Long-term caching for static assets
- **Security headers**: CSP, HSTS, and anti-clickjacking protection

**Error Tracking Setup (Optional):**
```env
# Add to .env for Sentry integration
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project
SENTRY_AUTH_TOKEN=your_sentry_auth_token
SENTRY_RELEASE=1.0.0
```

### Security Configuration

The project includes comprehensive security configurations for HTTPS enforcement:

**Enhanced Security Features:**
- **Content Security Policy (CSP)**: Prevents XSS attacks by controlling resource loading
- **Subresource Integrity (SRI)**: Ensures external resources haven't been tampered with
- **Secure image loading**: Validates all external images against CSP policies
- **HTTPS enforcement**: Automatic redirects and HSTS headers

**Netlify Deployment:**
- `public/_headers` - Configures HSTS and security headers
- `public/_redirects` - Handles HTTP to HTTPS redirects and SPA routing

**Vercel Deployment:**
- `public/vercel.json` - Configures headers, redirects, and rewrites

**Security Features:**
- Automatic HTTP to HTTPS redirects
- Strict Transport Security (HSTS) with 1-year max-age
- Content Security Policy (CSP) headers
- XSS protection and clickjacking prevention
- Client-side HTTPS enforcement fallback
- Subresource Integrity for external resources
- Secure resource loading utilities

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Update domain redirects in `public/vercel.json` with your actual domain
4. Add environment variables in Vercel dashboard
5. Deploy automatically on every push

### Netlify  
1. Build the project: `npm run build`
2. Update domain redirects in `public/_redirects` with your actual domain
3. Drag the `dist` folder to [Netlify](https://netlify.com)
4. Add environment variables in Netlify settings
5. Set up continuous deployment from GitHub

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

## 📧 EmailJS Setup

## 📧 Formspree + Google Sheets Setup

1. **Create Formspree Account**: Sign up at [formspree.io](https://formspree.io/)

2. **Create Forms**:
   - Create a new form for contact submissions
   - Note your form ID (e.g., `xpzgkqyw` from `https://formspree.io/f/xpzgkqyw`)
   - You can use the same form for all submissions or create separate forms

3. **Configure Domain Restrictions**:
   - In your Formspree dashboard, go to "Settings" → "Restrictions"
   - Add your domain (e.g., `freestackdev.com`) to "Allowed Origins"
   - Enable "Block submissions from other origins"
   - This prevents direct API abuse and console-based attacks

4. **Connect to Google Sheets**:
   - In your Formspree dashboard, go to your form settings
   - Navigate to "Integrations" tab
   - Connect to Google Sheets
   - Choose or create a spreadsheet to store submissions
   - **IMPORTANT**: Keep your Google Sheet private (not "Anyone with link can edit")
   - Only Formspree should have write access to your sheet

5. **Update Form Endpoints**:
   - Replace `YOUR_FORMSPREE_ID` in the following files with your actual form ID:
     - `src/components/HireMeModal.jsx`
     - `src/components/Contact/Contact.jsx`
     - `src/components/Footer/Footer.jsx`
   
6. **Environment Variables**:
   ```env
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
   ```

7. **Form Security Features**:
   - **Domain Restriction**: Forms only accept submissions from your domain
   - **reCAPTCHA Protection**: Prevents automated bot submissions
   - **Honeypot Fields**: Catches simple bots that fill all fields
   - **Rate Limiting**: Built-in protection against form flooding
   - **Origin Validation**: All submissions include origin verification

8. **Form Types**:
   - **Hire Me Form**: Collects project details, budget, timeline
   - **Contact Form**: General inquiries and messages  
   - **Newsletter**: Email subscription in footer
   - All submissions include `_form_type` field to identify the source

## 🛠️ Development Commands

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

## 🎯 Performance Optimizations

- **Image Optimization**: Uses external CDN images (Pexels)
- **Code Splitting**: React lazy loading for components
- **Bundle Optimization**: Vite's built-in optimizations
- **Minimal Dependencies**: Only essential packages included
- **Efficient Animations**: Framer Motion with optimized animations

## 📱 Browser Support

- ✅ Chrome 88+
- ✅ Firefox 85+  
- ✅ Safari 14+
- ✅ Edge 88+
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Studio Ghibli films and aesthetic
- **Images**: [Pexels](https://pexels.com) for beautiful stock photography  
- **Icons**: [Lucide React](https://lucide.dev) for clean, modern icons
- **Animations**: [Framer Motion](https://framer.com/motion) for smooth animations
- **Styling**: [Tailwind CSS](https://tailwindcss.com) for rapid development

## 📬 Contact

Free Stack Dev - [contact@freestackdev.com](mailto:contact@freestackdev.com)


---

⭐ **Star this repo if you found it helpful!** ⭐