const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// CORS Configuration - Allow requests from frontend
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || '*'
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/synergia_bookings');
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Booking Schema
const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address']
  },
  event: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true
  },
  ticketType: {
    type: String,
    enum: ['VIP', 'General', 'Student', 'Early Bird'],
    default: 'General'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for search optimization
bookingSchema.index({ email: 1 });
bookingSchema.index({ event: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Synergia Event Booking API with MongoDB',
    version: '2.0',
    database: 'MongoDB',
    endpoints: {
      'GET /api/bookings': 'Get all event bookings',
      'POST /api/bookings': 'Create a new booking',
      'GET /api/bookings/:id': 'Get booking by ID',
      'PUT /api/bookings/:id': 'Update participant details',
      'DELETE /api/bookings/:id': 'Delete/cancel booking',
      'GET /api/bookings/search?email=xyz': 'Search booking by email',
      'GET /api/bookings/filter?event=Synergia': 'Filter bookings by event'
    }
  });
});

// 1. GET /api/bookings - Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// 2. POST /api/bookings - Create a new booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { name, email, event, ticketType } = req.body;

    // Create new booking
    const newBooking = new Booking({
      name,
      email,
      event,
      ticketType
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: savedBooking
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
});

// 3. GET /api/bookings/:id - Get booking by ID
app.get('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
});

// 4. PUT /api/bookings/:id - Update participant details
app.put('/api/bookings/:id', async (req, res) => {
  try {
    const { name, email, event, ticketType } = req.body;

    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (event) updateData.event = event;
    if (ticketType) updateData.ticketType = ticketType;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format'
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating booking',
      error: error.message
    });
  }
});

// 5. DELETE /api/bookings/:id - Delete/cancel booking
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
      data: deletedBooking
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error deleting booking',
      error: error.message
    });
  }
});

// 6. GET /api/bookings/search?email=xyz - Search booking by email
app.get('/api/bookings/search', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email query parameter is required'
      });
    }

    const bookings = await Booking.find({ 
      email: { $regex: email, $options: 'i' } 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      searchQuery: email,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching bookings',
      error: error.message
    });
  }
});

// 7. GET /api/bookings/filter?event=Synergia - Filter bookings by event
app.get('/api/bookings/filter', async (req, res) => {
  try {
    const { event, ticketType } = req.query;

    if (!event && !ticketType) {
      return res.status(400).json({
        success: false,
        message: 'At least one filter parameter (event or ticketType) is required'
      });
    }

    // Build filter object
    const filter = {};
    if (event) filter.event = { $regex: event, $options: 'i' };
    if (ticketType) filter.ticketType = ticketType;

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      filters: { event, ticketType },
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error filtering bookings',
      error: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connect to DB and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Synergia Event Booking API running on http://localhost:${port}`);
    console.log(`📝 API Documentation: http://localhost:${port}`);
    console.log(`📊 Database: MongoDB`);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('❌ UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
