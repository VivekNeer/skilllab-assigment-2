# MongoDB Setup Guide for Assignment 2

This guide will help you set up MongoDB for the Synergia Event Booking API.

## Option 1: MongoDB Atlas (Cloud - Recommended for Beginners)

MongoDB Atlas is a free cloud-hosted MongoDB service. Perfect for development and testing.

### Steps:

1. **Create MongoDB Atlas Account**
   - Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose the **FREE** tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in the left menu
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `synergia_user` (or any name you prefer)
   - Password: Generate a secure password (save it!)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP Address**
   - Go to "Network Access" in the left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development only!)
   - Or add your current IP address
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Database" (Clusters)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`

6. **Update .env File**
   ```env
   MONGODB_URI=mongodb+srv://synergia_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/synergia_bookings?retryWrites=true&w=majority
   PORT=3001
   NODE_ENV=development
   ```
   
   **Important:** Replace:
   - `synergia_user` with your database username
   - `YOUR_PASSWORD` with your database password
   - `cluster0.xxxxx` with your actual cluster address

7. **Start the Server**
   ```bash
   npm start
   ```

---

## Option 2: Local MongoDB Installation

### Windows:

1. **Download MongoDB**
   - Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Download MongoDB Community Server for Windows
   - Run the installer (.msi file)

2. **Install MongoDB**
   - Choose "Complete" installation
   - Install MongoDB as a Windows Service (recommended)
   - Default data directory: `C:\Program Files\MongoDB\Server\{version}\data`

3. **Add to PATH (if not automatically done)**
   - Add `C:\Program Files\MongoDB\Server\{version}\bin` to system PATH

4. **Verify Installation**
   ```powershell
   mongod --version
   mongo --version
   ```

5. **Start MongoDB Service**
   - MongoDB should start automatically as a Windows Service
   - Or manually start: `net start MongoDB`

6. **Update .env File**
   ```env
   MONGODB_URI=mongodb://localhost:27017/synergia_bookings
   PORT=3001
   NODE_ENV=development
   ```

7. **Start the Server**
   ```bash
   npm start
   ```

### Linux (Ubuntu/Debian):

```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Reload package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongod --version
```

### macOS:

```bash
# Install with Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongod --version
```

---

## Testing Database Connection

After setting up MongoDB, test the connection:

1. **Start your server:**
   ```bash
   npm start
   ```

2. **Look for this message:**
   ```
   ✅ MongoDB Connected Successfully
   🚀 Synergia Event Booking API running on http://localhost:3001
   ```

3. **If you see an error:**
   - Check your connection string in `.env`
   - Ensure MongoDB service is running (for local)
   - Check Network Access settings (for Atlas)
   - Verify username and password (for Atlas)

---

## MongoDB Compass (GUI Tool - Optional)

MongoDB Compass is a free GUI for viewing and managing your MongoDB data.

1. **Download:**
   - [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)

2. **Connect:**
   - Open Compass
   - Paste your connection string
   - Click "Connect"

3. **View Data:**
   - Browse `synergia_bookings` database
   - See the `bookings` collection
   - View, edit, and delete documents

---

## Troubleshooting

### Connection Timeout Error
```
Error: connect ETIMEDOUT
```
**Solution:** 
- For Atlas: Add your IP to whitelist
- For local: Ensure MongoDB service is running

### Authentication Failed
```
Error: Authentication failed
```
**Solution:**
- Check username and password in connection string
- Verify user has correct permissions

### Database Not Found
- MongoDB creates databases automatically when you insert data
- Don't worry if you don't see `synergia_bookings` initially

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3001
```
**Solution:**
- Change PORT in `.env` to different number (e.g., 3002)
- Or kill the process using port 3001

---

## Quick Start (MongoDB Atlas)

**For fastest setup, use MongoDB Atlas:**

1. Sign up at mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Allow access from anywhere (Network Access)
5. Copy connection string
6. Update `.env` file with connection string
7. Run `npm start`

**Done! 🎉**

---

## Environment Variables Template

```env
# MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/synergia_bookings?retryWrites=true&w=majority

# OR MongoDB Local
# MONGODB_URI=mongodb://localhost:27017/synergia_bookings

# Server Configuration
PORT=3001
NODE_ENV=development
```

---

## Need Help?

- MongoDB Atlas Documentation: [https://docs.atlas.mongodb.com/](https://docs.atlas.mongodb.com/)
- MongoDB Installation: [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
- Mongoose Documentation: [https://mongoosejs.com/](https://mongoosejs.com/)
