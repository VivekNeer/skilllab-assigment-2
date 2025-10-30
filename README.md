# Synergia Event Booking API - MongoDB Version

A RESTful API built with Node.js, Express.js, and MongoDB for managing event bookings for Synergia technical event. This version extends the previous in-memory API with MongoDB integration, CRUD operations, and advanced querying features.

## 🚀 Features

- ✅ MongoDB database integration with Mongoose
- ✅ Complete CRUD operations
- ✅ Search functionality by email
- ✅ Filter bookings by event and ticket type
- ✅ Data validation with Mongoose schemas
- ✅ Proper HTTP status codes and error handling
- ✅ RESTful API design
- ✅ Environment variable configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd "assignment 2"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/synergia_bookings
PORT=3001
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/synergia_bookings?retryWrites=true&w=majority
PORT=3001
NODE_ENV=production
```

### 4. Start MongoDB (if using local installation)

**Windows:**
```bash
mongod
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
```

### 5. Run the application

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3001`

## 📊 Database Schema

```javascript
{
  name: String,           // Required
  email: String,          // Required, validated
  event: String,          // Required
  ticketType: String,     // Enum: ['VIP', 'General', 'Student', 'Early Bird']
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

## 🔌 API Endpoints

### 1. Get All Bookings
- **Method:** `GET`
- **URL:** `/api/bookings`
- **Description:** Retrieve all event bookings

**Response Example:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "email": "john@example.com",
      "event": "Synergia",
      "ticketType": "VIP",
      "createdAt": "2025-10-30T10:00:00.000Z",
      "updatedAt": "2025-10-30T10:00:00.000Z"
    }
  ]
}
```

### 2. Create New Booking
- **Method:** `POST`
- **URL:** `/api/bookings`
- **Description:** Create a new event booking

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "event": "Synergia",
  "ticketType": "VIP"
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "event": "Synergia",
    "ticketType": "VIP",
    "createdAt": "2025-10-30T10:00:00.000Z",
    "updatedAt": "2025-10-30T10:00:00.000Z"
  }
}
```

### 3. Get Booking by ID
- **Method:** `GET`
- **URL:** `/api/bookings/:id`
- **Description:** Get specific booking details by MongoDB ObjectId

**Response Example:**
```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "event": "Synergia",
    "ticketType": "VIP",
    "createdAt": "2025-10-30T10:00:00.000Z",
    "updatedAt": "2025-10-30T10:00:00.000Z"
  }
}
```

### 4. Update Booking
- **Method:** `PUT`
- **URL:** `/api/bookings/:id`
- **Description:** Update participant details

**Request Body:**
```json
{
  "name": "John Smith",
  "ticketType": "Student"
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Booking updated successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Smith",
    "email": "john@example.com",
    "event": "Synergia",
    "ticketType": "Student",
    "createdAt": "2025-10-30T10:00:00.000Z",
    "updatedAt": "2025-10-30T11:00:00.000Z"
  }
}
```

### 5. Delete Booking
- **Method:** `DELETE`
- **URL:** `/api/bookings/:id`
- **Description:** Delete/cancel a booking

**Response Example:**
```json
{
  "success": true,
  "message": "Booking deleted successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "event": "Synergia",
    "ticketType": "VIP"
  }
}
```

### 6. Search Bookings by Email
- **Method:** `GET`
- **URL:** `/api/bookings/search?email=john@example.com`
- **Description:** Search bookings by email (case-insensitive, partial match)

**Response Example:**
```json
{
  "success": true,
  "count": 2,
  "searchQuery": "john",
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "email": "john@example.com",
      "event": "Synergia",
      "ticketType": "VIP"
    }
  ]
}
```

### 7. Filter Bookings
- **Method:** `GET`
- **URL:** `/api/bookings/filter?event=Synergia&ticketType=VIP`
- **Description:** Filter bookings by event and/or ticket type

**Query Parameters:**
- `event` - Filter by event name (case-insensitive, partial match)
- `ticketType` - Filter by ticket type (exact match)

**Response Example:**
```json
{
  "success": true,
  "count": 3,
  "filters": {
    "event": "Synergia",
    "ticketType": "VIP"
  },
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "email": "john@example.com",
      "event": "Synergia",
      "ticketType": "VIP"
    }
  ]
}
```

## 🧪 Testing the API

### Using PowerShell (Windows)

**1. Get all bookings:**
```powershell
Invoke-WebRequest -Uri http://localhost:3001/api/bookings -Method GET | Select-Object -Expand Content
```

**2. Create a booking:**
```powershell
$body = @{
    name = "John Doe"
    email = "john@example.com"
    event = "Synergia"
    ticketType = "VIP"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3001/api/bookings -Method POST -Body $body -ContentType "application/json" | Select-Object -Expand Content
```

**3. Get booking by ID:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/<booking-id>" -Method GET | Select-Object -Expand Content
```

**4. Update booking:**
```powershell
$body = @{
    name = "John Smith"
    ticketType = "Student"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/<booking-id>" -Method PUT -Body $body -ContentType "application/json" | Select-Object -Expand Content
```

**5. Delete booking:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/<booking-id>" -Method DELETE | Select-Object -Expand Content
```

**6. Search by email:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/search?email=john@example.com" -Method GET | Select-Object -Expand Content
```

**7. Filter by event:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/filter?event=Synergia" -Method GET | Select-Object -Expand Content
```

### Using cURL

**1. Get all bookings:**
```bash
curl http://localhost:3001/api/bookings
```

**2. Create a booking:**
```bash
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","event":"Synergia","ticketType":"VIP"}'
```

**3. Search by email:**
```bash
curl "http://localhost:3001/api/bookings/search?email=john@example.com"
```

**4. Filter by event:**
```bash
curl "http://localhost:3001/api/bookings/filter?event=Synergia&ticketType=VIP"
```

## 📁 Project Structure

```
assignment 2/
├── server.js          # Main application file with routes and MongoDB connection
├── package.json       # Dependencies and scripts
├── .env              # Environment variables (not committed to Git)
├── .env.example      # Example environment variables
├── .gitignore        # Git ignore rules
└── README.md         # Documentation
```

## 🔒 Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Invalid input data or validation errors
- **404 Not Found** - Booking not found
- **500 Internal Server Error** - Database or server errors

**Validation Error Example:**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    "Name is required",
    "Please provide a valid email address"
  ]
}
```

## 🎫 Ticket Types

The API supports the following ticket types:
- `VIP` - VIP access
- `General` - General admission
- `Student` - Student discount ticket
- `Early Bird` - Early bird special

## 🔧 Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment variable management

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/synergia_bookings` |
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## 🚨 Important Notes

1. **Never commit `.env` file to Git** - It contains sensitive credentials
2. **Use `.env.example`** as a template for other developers
3. **MongoDB must be running** before starting the application
4. **For MongoDB Atlas**, whitelist your IP address in the cluster settings
5. **ObjectId format** - MongoDB uses 24-character hexadecimal ObjectIds

## 🔗 MongoDB Atlas Setup (Optional)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get connection string and update `.env` file

## 📦 Deployment

### Environment Setup
1. Set `NODE_ENV=production` in your production environment
2. Update `MONGODB_URI` with production database URL
3. Set appropriate `PORT` if required by hosting platform

### Recommended Platforms
- **Heroku**
- **Render**
- **Railway**
- **DigitalOcean**
- **AWS EC2**

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or connection string is correct
- Check firewall settings
- Verify network access in MongoDB Atlas

**Port Already in Use:**
- Change `PORT` in `.env` file
- Kill process using the port: `netstat -ano | findstr :3001`

**Validation Errors:**
- Ensure all required fields are provided
- Check email format
- Verify ticketType is one of the allowed values

## 📄 License

ISC

## 👨‍💻 Author

Synergia Event Management Team

---

**Happy Coding! 🎉**

  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "eventName": "Synergia",
      "bookingDate": "2025-10-30T10:00:00.000Z",
      "status": "confirmed"
    }
  ]
}
```

### 2. Create New Booking
- **Method:** `POST`
- **URL:** `/api/bookings`
- **Description:** Register for the event

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "eventName": "Synergia"
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "eventName": "Synergia",
    "bookingDate": "2025-10-30T10:00:00.000Z",
    "status": "confirmed"
  }
}
```

### 3. Get Booking by ID
- **Method:** `GET`
- **URL:** `/api/bookings/:id`
- **Description:** Get specific booking details

**Response Example:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "eventName": "Synergia",
    "bookingDate": "2025-10-30T10:00:00.000Z",
    "status": "confirmed"
  }
}
```

### 4. Update Booking
- **Method:** `PUT`
- **URL:** `/api/bookings/:id`
- **Description:** Update participant details

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "9876543210"
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Booking updated successfully",
  "data": {
    "id": 1,
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "9876543210",
    "eventName": "Synergia",
    "bookingDate": "2025-10-30T10:00:00.000Z",
    "status": "confirmed",
    "lastUpdated": "2025-10-30T11:00:00.000Z"
  }
}
```

### 5. Cancel Booking
- **Method:** `DELETE`
- **URL:** `/api/bookings/:id`
- **Description:** Cancel a booking

**Response Example:**
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "eventName": "Synergia",
    "bookingDate": "2025-10-30T10:00:00.000Z",
    "status": "confirmed"
  }
}
```

## Testing with cURL

### Get all bookings:
```bash
curl http://localhost:3000/api/bookings
```

### Create a new booking:
```bash
curl -X POST http://localhost:3000/api/bookings -H "Content-Type: application/json" -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"phone\":\"1234567890\"}"
```

### Get booking by ID:
```bash
curl http://localhost:3000/api/bookings/1
```

### Update booking:
```bash
curl -X PUT http://localhost:3000/api/bookings/1 -H "Content-Type: application/json" -d "{\"name\":\"John Smith\",\"phone\":\"9876543210\"}"
```

### Delete booking:
```bash
curl -X DELETE http://localhost:3000/api/bookings/1
```

## Error Handling

The API includes proper error handling with appropriate HTTP status codes:

- `200 OK` - Successful GET, PUT requests
- `201 Created` - Successful POST request
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Booking not found
- `500 Internal Server Error` - Server errors

## Data Validation

- Required fields: name, email, phone
- Email validation using regex pattern
- ID validation for update and delete operations

## Project Structure

```
assignment 1/
├── server.js          # Main application file
├── package.json       # Dependencies and scripts
└── README.md         # Documentation
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JSON** - Data format

## Notes

- Data is stored in-memory (resets on server restart)
- No database required for this assignment
- Sequential ID generation starting from 1
- Timestamps for booking creation and updates
