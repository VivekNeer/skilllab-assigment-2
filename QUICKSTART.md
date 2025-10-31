# 🚀 Quick Start Guide - Synergia Booking System

Complete guide to run both backend and frontend locally.

## 📦 What You Have

```
assignment 2/
├── backend (root folder)
│   ├── server.js           - Express API with MongoDB
│   ├── package.json
│   └── .env               - MongoDB connection
│
└── frontend/
    ├── app/               - Next.js app
    ├── package.json
    └── .env.local        - API URL
```

## 🎯 Step-by-Step Setup

### Step 1: Setup MongoDB (Required)

**Option A: MongoDB Atlas (Recommended - 5 mins)**

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create FREE account (no credit card)
3. Create cluster (M0 Free tier)
4. Create database user & password
5. Add IP: 0.0.0.0/0 (allow all)
6. Get connection string
7. Update `assignment 2/.env`:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/synergia_bookings
PORT=3001
NODE_ENV=development
```

See `MONGODB_SETUP.md` for detailed guide.

### Step 2: Start Backend (Terminal 1)

```powershell
# Navigate to backend
cd "c:\Users\vivek\Documents\skilllab_vd\assignment 2"

# Install dependencies (if not done)
npm install

# Start backend server
npm start
```

**Expected Output:**
```
✅ MongoDB Connected Successfully
🚀 Synergia Event Booking API running on http://localhost:3001
📝 API Documentation: http://localhost:3001
📊 Database: MongoDB
```

**Test Backend:**
```powershell
Invoke-WebRequest -Uri http://localhost:3001/ -Method GET
```

### Step 3: Start Frontend (Terminal 2 - New Window)

```powershell
# Navigate to frontend
cd "c:\Users\vivek\Documents\skilllab_vd\assignment 2\frontend"

# Start development server
npm run dev
```

**Expected Output:**
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Step 4: Open in Browser

Open: **http://localhost:3000**

You should see the beautiful Synergia Event Booking interface! 🎉

---

## 🧪 Test the System

### Create a Booking
1. Click "New Booking" button
2. Fill in the form:
   - Name: John Doe
   - Email: john@example.com
   - Event: Synergia
   - Ticket Type: VIP
3. Click "Create Booking"
4. See it appear in the table below!

### Search & Filter
1. Search by email: Type "john" in search box
2. Filter by event: Select "Synergia"
3. Filter by ticket type: Select "VIP"
4. Click "Apply Filters"

### Edit & Delete
1. Click "Edit" on any booking
2. Modify details and save
3. Click "Delete" to remove a booking

---

## 🌐 Deploy to Vercel

### Deploy Frontend

1. **Create Vercel account**: https://vercel.com/signup

2. **Install Vercel CLI**:
```powershell
npm install -g vercel
```

3. **Deploy**:
```powershell
cd "c:\Users\vivek\Documents\skilllab_vd\assignment 2\frontend"
vercel login
vercel
```

4. **Set Environment Variable** in Vercel Dashboard:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: Your backend URL (see below)

5. **Deploy to production**:
```powershell
vercel --prod
```

### Deploy Backend

**Option 1: Railway (Recommended)**

1. Go to: https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 3001
   - `NODE_ENV`: production
6. Deploy!
7. Copy your backend URL (e.g., `https://your-app.railway.app`)

**Option 2: Render**

1. Go to: https://render.com
2. New → Web Service
3. Connect GitHub repository
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables
7. Deploy!

**Option 3: Heroku**

```powershell
# Install Heroku CLI
# Then:
cd "c:\Users\vivek\Documents\skilllab_vd\assignment 2"
heroku login
heroku create synergia-booking-api
heroku config:set MONGODB_URI="your-connection-string"
git push heroku main
```

### Update Frontend with Backend URL

After deploying backend:

1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL` with your deployed backend URL
4. Redeploy frontend

---

## 🔧 Troubleshooting

### Backend won't start?
- **MongoDB connection error**: Check `.env` file has correct connection string
- **Port in use**: Change PORT in `.env` to 3002

### Frontend can't connect to backend?
- **CORS error**: Backend CORS is already configured ✅
- **Wrong API URL**: Check `frontend/.env.local` has correct URL
- **Backend not running**: Ensure backend is running on port 3001

### MongoDB Atlas connection issues?
- **IP not whitelisted**: Add 0.0.0.0/0 in Network Access
- **Wrong credentials**: Double-check username & password
- **Connection string**: Ensure it includes database name

### Vercel deployment issues?
- **Build failed**: Check build logs in Vercel dashboard
- **API connection**: Ensure environment variable is set correctly
- **CORS**: Ensure backend allows your Vercel URL

---

## 📝 Development Workflow

**Daily Development:**

1. **Terminal 1** - Backend:
```powershell
cd "c:\Users\vivek\Documents\skilllab_vd\assignment 2"
npm start
```

2. **Terminal 2** - Frontend:
```powershell
cd "c:\Users\vivek\Documents\skilllab_vd\assignment 2\frontend"
npm run dev
```

3. **Browser**: http://localhost:3000

**Making Changes:**
- Backend changes: Edit `server.js`, restart server
- Frontend changes: Edit files in `frontend/app/`, auto-reloads

---

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',    // Change primary color
      secondary: '#your-color',  // Change secondary color
    },
  },
}
```

### Add More Events
Edit `frontend/app/page.tsx`:
```typescript
const events = ['Synergia', 'TechFest', 'YourEvent'];
```

### Add More Ticket Types
Edit backend `server.js`:
```javascript
ticketType: {
  type: String,
  enum: ['VIP', 'General', 'Student', 'Early Bird', 'Your Type'],
}
```

---

## 📊 Project URLs

### Local Development
- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:3001/

### Production (After Deployment)
- **Backend**: https://your-app.railway.app
- **Frontend**: https://your-app.vercel.app

---

## 🎯 Features Checklist

✅ Create bookings  
✅ View all bookings  
✅ Edit bookings  
✅ Delete bookings  
✅ Search by email  
✅ Filter by event  
✅ Filter by ticket type  
✅ Responsive design  
✅ Beautiful UI  
✅ Real-time updates  
✅ Error handling  
✅ Loading states  

---

## 🆘 Need Help?

- **Backend Issues**: Check `README.md` and `MONGODB_SETUP.md`
- **Frontend Issues**: Check `frontend/README.md`
- **API Testing**: Check `API_TESTING.md`

---

## 🎉 You're All Set!

Your full-stack Synergia Event Booking System is ready!

**Local**: http://localhost:3000  
**Production**: Deploy to Vercel & Railway

**Happy Coding! 🚀**
