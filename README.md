# APFFHECOD Website

Association of Professional for Family Health Empowerment and Community Development

## Tech Stack
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Sora (display) + DM Sans (body) via Google Fonts

## Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, stats, services, testimonials |
| About | `/about` | Organization history, D&I pillars, core principles |
| Mission | `/mission` | Mission & vision, four focus areas, strategic framework |
| Activities | `/activities` | Filterable gallery of programs and projects |
| Contact | `/contact` | Contact form, office info, ways to get involved |
| Read More | `/read-more` | Full GESI policy, history, implementation details |

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Colors
Edit `tailwind.config.js` — the primary color palette is indigo/violet-based (`primary` key). You can swap the entire palette by changing the hex values.

### Content
All content is in the page files under `/pages/`. Each page exports a default React component.

### Contact Form
The contact form at `/pages/contact.js` currently shows a success state on submit. To wire it up to a backend:
1. Replace the `handleSubmit` function with a `fetch` call to your API endpoint or a service like Formspree / EmailJS.

### Fonts
Loaded via Google Fonts in `styles/globals.css`. Change the import URL to use different fonts.

## Deployment
Works with any Next.js-compatible hosting:
- **Vercel** (recommended): `vercel deploy`
- **Netlify**: add `next.config.js` and deploy
- **Self-hosted**: `npm run build && npm start`

## Credits
Designed and developed for APFFHECOD — Auchi, Edo State, Nigeria.
