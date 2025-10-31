'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface Booking {
  _id: string;
  name: string;
  email: string;
  event: string;
  ticketType: string;
  createdAt: string;
}

export default function Home() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [filterEvent, setFilterEvent] = useState('');
  const [filterTicketType, setFilterTicketType] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    event: 'Synergia',
    ticketType: 'General',
  });

  const ticketTypes = ['VIP', 'General', 'Student', 'Early Bird'];
  const events = ['Synergia', 'TechFest', 'CodeCon', 'HackNight'];

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_URL}/bookings`);
      setBookings(response.data.data);
    } catch (err: any) {
      setError('Failed to fetch bookings. Make sure the API is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search by email
  const handleSearch = async () => {
    if (!searchEmail.trim()) {
      fetchBookings();
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/bookings/search?email=${searchEmail}`);
      setBookings(response.data.data);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings
  const handleFilter = async () => {
    if (!filterEvent && !filterTicketType) {
      fetchBookings();
      return;
    }
    try {
      setLoading(true);
      let url = `${API_URL}/bookings/filter?`;
      if (filterEvent) url += `event=${filterEvent}&`;
      if (filterTicketType) url += `ticketType=${filterTicketType}`;
      const response = await axios.get(url);
      setBookings(response.data.data);
    } catch (err) {
      setError('Filter failed');
    } finally {
      setLoading(false);
    }
  };

  // Create or update booking
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await axios.put(`${API_URL}/bookings/${editingId}`, formData);
        alert('Booking updated successfully!');
      } else {
        // Create
        await axios.post(`${API_URL}/bookings`, formData);
        alert('Booking created successfully!');
      }
      setFormData({ name: '', email: '', event: 'Synergia', ticketType: 'General' });
      setShowForm(false);
      setEditingId(null);
      fetchBookings();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save booking');
    }
  };

  // Delete booking
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      await axios.delete(`${API_URL}/bookings/${id}`);
      alert('Booking deleted successfully!');
      fetchBookings();
    } catch (err) {
      alert('Failed to delete booking');
    }
  };

  // Edit booking
  const handleEdit = (booking: Booking) => {
    setFormData({
      name: booking.name,
      email: booking.email,
      event: booking.event,
      ticketType: booking.ticketType,
    });
    setEditingId(booking._id);
    setShowForm(true);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Synergia Event Booking
              </h1>
              <p className="text-gray-600 mt-1">Manage your event registrations</p>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setFormData({ name: '', email: '', event: 'Synergia', ticketType: 'General' });
              }}
              className="btn-primary flex items-center gap-2"
            >
              <span className="text-xl">+</span> New Booking
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Booking Form */}
        {showForm && (
          <div className="card mb-8 border-2 border-primary">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingId ? 'Edit Booking' : 'Create New Booking'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="input-field"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event *
                  </label>
                  <select
                    className="input-field"
                    value={formData.event}
                    onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                  >
                    {events.map((event) => (
                      <option key={event} value={event}>
                        {event}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ticket Type
                  </label>
                  <select
                    className="input-field"
                    value={formData.ticketType}
                    onChange={(e) => setFormData({ ...formData, ticketType: e.target.value })}
                  >
                    {ticketTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update Booking' : 'Create Booking'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ name: '', email: '', event: 'Synergia', ticketType: 'General' });
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and Filter */}
        <div className="card mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Search & Filter</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Email
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input-field"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="email@example.com"
                />
                <button onClick={handleSearch} className="btn-primary whitespace-nowrap">
                  Search
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Event
              </label>
              <select
                className="input-field"
                value={filterEvent}
                onChange={(e) => setFilterEvent(e.target.value)}
              >
                <option value="">All Events</option>
                {events.map((event) => (
                  <option key={event} value={event}>
                    {event}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Ticket Type
              </label>
              <select
                className="input-field"
                value={filterTicketType}
                onChange={(e) => setFilterTicketType(e.target.value)}
              >
                <option value="">All Types</option>
                {ticketTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleFilter} className="btn-primary">
              Apply Filters
            </button>
            <button
              onClick={() => {
                setSearchEmail('');
                setFilterEvent('');
                setFilterTicketType('');
                fetchBookings();
              }}
              className="btn-secondary"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              All Bookings ({bookings.length})
            </h3>
            <button onClick={fetchBookings} className="btn-secondary text-sm">
              ↻ Refresh
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No bookings found</p>
              <p className="text-gray-400 mt-2">Create your first booking to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Ticket Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">
                        {booking.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                        {booking.email}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                          {booking.event}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            booking.ticketType === 'VIP'
                              ? 'bg-purple-100 text-purple-800'
                              : booking.ticketType === 'Student'
                              ? 'bg-green-100 text-green-800'
                              : booking.ticketType === 'Early Bird'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {booking.ticketType}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleEdit(booking)}
                          className="text-indigo-600 hover:text-indigo-900 font-medium mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
          <p>Synergia Event Booking System © 2025</p>
        </div>
      </footer>
    </div>
  );
}
