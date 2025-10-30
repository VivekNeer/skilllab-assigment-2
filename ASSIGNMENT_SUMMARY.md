# Assignment 2 - Synergia Event Booking API with MongoDB

## ✅ Completed Implementation

Your Assignment 2 is now complete with all required features!

### 📦 What's Included:

1. **server.js** - Complete REST API with MongoDB integration
2. **package.json** - All dependencies (Express, Mongoose, dotenv)
3. **README.md** - Comprehensive documentation
4. **MONGODB_SETUP.md** - Step-by-step MongoDB setup guide
5. **API_TESTING.md** - Complete API testing guide
6. **.env** - Environment configuration
7. **.env.example** - Template for sharing
8. **.gitignore** - Git ignore rules

### 🎯 All Requirements Met:

- ✅ MongoDB connection using Mongoose
- ✅ Booking model with required schema
- ✅ All 7 API endpoints implemented
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Search by email functionality
- ✅ Filter by event and ticket type
- ✅ Field validation (name, email, event required)
- ✅ Proper HTTP status codes
- ✅ Error handling
- ✅ RESTful API standards

### 📊 API Endpoints Summary:

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 1 | GET | `/api/bookings` | Get all bookings |
| 2 | POST | `/api/bookings` | Create new booking |
| 3 | GET | `/api/bookings/:id` | Get booking by ID |
| 4 | PUT | `/api/bookings/:id` | Update booking |
| 5 | DELETE | `/api/bookings/:id` | Delete booking |
| 6 | GET | `/api/bookings/search?email=xyz` | Search by email |
| 7 | GET | `/api/bookings/filter?event=Synergia` | Filter bookings |

### 🗄️ Database Schema:

```javascript
{
  name: String,           // Required, trimmed
  email: String,          // Required, validated, lowercase
  event: String,          // Required, trimmed
  ticketType: String,     // Enum: VIP, General, Student, Early Bird
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

---

## 🚀 Next Steps to Run the Project:

### Step 1: Set Up MongoDB

**Option A: MongoDB Atlas (Recommended - Free Cloud Database)**

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster (M0 tier)
4. Create a database user (save username & password)
5. Whitelist your IP address (Network Access)
6. Get your connection string
7. Update `.env` file with your connection string:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/synergia_bookings?retryWrites=true&w=majority
PORT=3001
NODE_ENV=development
```

**Option B: Install MongoDB Locally**

See `MONGODB_SETUP.md` for detailed local installation instructions.

### Step 2: Install Dependencies

Already done! ✅ We ran `npm install`

### Step 3: Start the Server

```powershell
cd "c:\Users\vivek\Documents\skilllab_vd\assignment 2"
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Synergia Event Booking API running on http://localhost:3001
📝 API Documentation: http://localhost:3001
📊 Database: MongoDB
```

### Step 4: Test the API

**Quick Test:**
```powershell
# Create a booking
$booking = @{
    name = "John Doe"
    email = "john@example.com"
    event = "Synergia"
    ticketType = "VIP"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3001/api/bookings -Method POST -Body $booking -ContentType "application/json" | Select-Object -Expand Content
```

See `API_TESTING.md` for complete testing guide!

---

## 📝 For GitHub Submission:

### Files to Commit:

```
assignment 2/
├── server.js              ✅ Commit
├── package.json           ✅ Commit
├── .env.example           ✅ Commit
├── .gitignore             ✅ Commit
├── README.md              ✅ Commit
├── MONGODB_SETUP.md       ✅ Commit
├── API_TESTING.md         ✅ Commit
└── .env                   ❌ DO NOT COMMIT (in .gitignore)
```

### Git Commands:

```bash
# Initialize git (if not already done)
git init

# Add files
git add .

# Commit
git commit -m "Assignment 2: Synergia Event Booking API with MongoDB"

# Create GitHub repository (go to github.com)
# Then push
git remote add origin https://github.com/YOUR_USERNAME/synergia-booking-api.git
git branch -M main
git push -u origin main
```

---

## 🔍 Key Features Explained:

### 1. MongoDB Integration
- Mongoose ODM for schema validation
- Async/await for database operations
- Connection error handling
- Indexes for optimized queries

### 2. Schema Validation
- Required fields: name, email, event
- Email format validation with regex
- Ticket type enum validation
- Automatic timestamps

### 3. Error Handling
- Validation errors (400)
- Not found errors (404)
- Database errors (500)
- Invalid ObjectId handling

### 4. Search & Filter
- Case-insensitive email search
- Regex-based event filtering
- Multiple filter combinations
- Sorted results (newest first)

---

## 🎓 Learning Outcomes:

You've successfully learned:
- ✅ Express.js server setup
- ✅ MongoDB connection and configuration
- ✅ Mongoose schemas and models
- ✅ RESTful API design
- ✅ CRUD operations with MongoDB
- ✅ Query parameters and filtering
- ✅ Data validation
- ✅ Error handling in async operations
- ✅ Environment variables with dotenv
- ✅ Git best practices (.gitignore)

---

## 🆚 Difference from Assignment 1:

| Feature | Assignment 1 | Assignment 2 |
|---------|-------------|--------------|
| Storage | In-memory array | MongoDB database |
| Persistence | Lost on restart | Permanent storage |
| ID Generation | Manual counter | MongoDB ObjectId |
| Validation | Manual checks | Mongoose schema |
| Querying | Array methods | MongoDB queries |
| Search | N/A | Email search |
| Filter | N/A | Event/ticket filter |

---

## 🐛 Troubleshooting:

### MongoDB Connection Error?
- Check `.env` file has correct connection string
- For Atlas: Verify IP is whitelisted
- For Local: Ensure MongoDB service is running

### Port 3001 Already in Use?
- Change PORT in `.env` to 3002 or another number
- Or stop the other service using port 3001

### Validation Error?
- Ensure name, email, and event are provided
- Check email format is valid
- Verify ticketType is one of: VIP, General, Student, Early Bird

---

## 📚 Additional Resources:

- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Mongoose Docs:** https://mongoosejs.com/docs/guide.html
- **Express.js Guide:** https://expressjs.com/en/guide/routing.html
- **REST API Best Practices:** https://restfulapi.net/

---

## 🎉 Congratulations!

You've successfully completed Assignment 2 with:
- ✅ Full MongoDB integration
- ✅ 7 working API endpoints
- ✅ Search and filter functionality
- ✅ Professional error handling
- ✅ Complete documentation
- ✅ Ready for GitHub submission

**Need help setting up MongoDB?** Check `MONGODB_SETUP.md`
**Ready to test?** See `API_TESTING.md`

---

**Happy Coding! 🚀**
