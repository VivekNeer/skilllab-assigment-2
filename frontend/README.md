# Synergia Event Booking - Frontend

Modern, responsive frontend for the Synergia Event Booking API built with Next.js 14, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- ✅ **Create Bookings** - Add new event registrations
- ✅ **View All Bookings** - See all registered participants
- ✅ **Edit Bookings** - Update participant details
- ✅ **Delete Bookings** - Remove registrations
- ✅ **Search by Email** - Find specific bookings
- ✅ **Filter** - Filter by event and ticket type
- ✅ **Responsive Design** - Works on all devices
- ✅ **Real-time Updates** - Instant feedback
- ✅ **Beautiful UI** - Modern gradient design with Tailwind CSS

## 📋 Prerequisites

- Node.js 14+ installed
- Backend API running (from assignment 2)

## 🛠️ Installation

### 1. Navigate to frontend folder
```powershell
cd "c:\Users\vivek\Documents\skilllab_vd\assignment 2\frontend"
```

### 2. Install dependencies
```powershell
npm install
```

### 3. Configure API URL

Edit `.env.local` file:

**For local development:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**For production (after deploying backend):**
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

### 4. Run development server
```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI:**
```powershell
npm install -g vercel
```

2. **Login to Vercel:**
```powershell
vercel login
```

3. **Deploy:**
```powershell
cd "c:\Users\vivek\Documents\skilllab_vd\assignment 2\frontend"
vercel
```

4. **Set environment variable:**
```powershell
vercel env add NEXT_PUBLIC_API_URL
```
Enter your production API URL when prompted.

5. **Deploy to production:**
```powershell
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/synergia-frontend.git
git push -u origin main
```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Next.js
     - **Root Directory:** `frontend`
     - **Environment Variables:**
       - Name: `NEXT_PUBLIC_API_URL`
       - Value: Your backend API URL (e.g., `https://your-api.com/api`)
   - Click "Deploy"

3. **Done!** Your frontend will be live at `https://your-project.vercel.app`

## 🔧 Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page (booking management)
│   └── globals.css      # Global styles
├── public/              # Static assets
├── .env.local           # Environment variables
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── tailwind.config.js   # Tailwind config
└── next.config.js       # Next.js config
```

## 🎨 Features Breakdown

### Booking Management
- Create new bookings with form validation
- Edit existing bookings
- Delete bookings with confirmation
- View all bookings in a table

### Search & Filter
- Search bookings by email (partial match)
- Filter by event name
- Filter by ticket type
- Combine multiple filters
- Clear all filters

### UI/UX
- Gradient background design
- Color-coded ticket types
- Loading states
- Error handling
- Responsive table
- Mobile-friendly

## 🚨 Important Notes

### CORS Configuration

Your backend needs to allow requests from your frontend. Update `server.js`:

```javascript
const cors = require('cors');

// Add before routes
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-frontend.vercel.app' 
    : 'http://localhost:3000'
}));
```

Install cors:
```bash
npm install cors
```

### Environment Variables

**Development:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Production:**
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

## 🐛 Troubleshooting

### API Connection Error
- Ensure backend is running
- Check API URL in `.env.local`
- Verify CORS is enabled on backend
- Check browser console for errors

### Build Errors
```powershell
# Clear cache and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Vercel Deployment Issues
- Ensure environment variables are set in Vercel dashboard
- Check build logs for errors
- Verify `package.json` has correct scripts

## 📝 Available Scripts

```powershell
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🔗 Deploy Backend First

Before deploying frontend, deploy your backend API:

**Options:**
- Railway: https://railway.app
- Render: https://render.com
- Heroku: https://heroku.com
- DigitalOcean: https://digitalocean.com

Then update `NEXT_PUBLIC_API_URL` with your backend URL.

## 🎉 Demo

### Local Development
1. Backend: `http://localhost:3001`
2. Frontend: `http://localhost:3000`

### Production
1. Backend: Your deployed API URL
2. Frontend: Your Vercel URL

## 📄 License

MIT

---

**Built with ❤️ for Synergia Event Management**
