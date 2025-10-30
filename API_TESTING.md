# API Testing Guide - Synergia Event Booking API

Complete guide for testing all API endpoints using PowerShell.

## Prerequisites
- Server must be running (`npm start` in assignment 2 folder)
- MongoDB must be connected

## Test All Endpoints

### 1. Test Server Connection
```powershell
Invoke-WebRequest -Uri http://localhost:3001/ -Method GET | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

### 2. Create Sample Bookings

**Create Booking 1:**
```powershell
$booking1 = @{
    name = "Alice Johnson"
    email = "alice@example.com"
    event = "Synergia"
    ticketType = "VIP"
} | ConvertTo-Json

$response1 = Invoke-WebRequest -Uri http://localhost:3001/api/bookings -Method POST -Body $booking1 -ContentType "application/json"
$response1.Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

**Create Booking 2:**
```powershell
$booking2 = @{
    name = "Bob Smith"
    email = "bob@example.com"
    event = "Synergia"
    ticketType = "General"
} | ConvertTo-Json

$response2 = Invoke-WebRequest -Uri http://localhost:3001/api/bookings -Method POST -Body $booking2 -ContentType "application/json"
$response2.Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

**Create Booking 3:**
```powershell
$booking3 = @{
    name = "Charlie Davis"
    email = "charlie@example.com"
    event = "Synergia"
    ticketType = "Student"
} | ConvertTo-Json

$response3 = Invoke-WebRequest -Uri http://localhost:3001/api/bookings -Method POST -Body $booking3 -ContentType "application/json"
$response3.Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

**Create Booking 4:**
```powershell
$booking4 = @{
    name = "Diana Prince"
    email = "diana@example.com"
    event = "TechFest"
    ticketType = "VIP"
} | ConvertTo-Json

$response4 = Invoke-WebRequest -Uri http://localhost:3001/api/bookings -Method POST -Body $booking4 -ContentType "application/json"
$response4.Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

### 3. Get All Bookings
```powershell
Invoke-WebRequest -Uri http://localhost:3001/api/bookings -Method GET | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

### 4. Get Booking by ID
**First, save a booking ID from previous response, then:**
```powershell
# Replace <BOOKING_ID> with actual ID from response
$bookingId = "<BOOKING_ID>"
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/$bookingId" -Method GET | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

### 5. Update Booking
```powershell
# Replace <BOOKING_ID> with actual ID
$bookingId = "<BOOKING_ID>"
$updateData = @{
    name = "Alice Johnson Updated"
    ticketType = "Early Bird"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/$bookingId" -Method PUT -Body $updateData -ContentType "application/json" | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

### 6. Search by Email
```powershell
# Search for Alice
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/search?email=alice@example.com" -Method GET | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 5

# Partial search
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/search?email=example" -Method GET | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

### 7. Filter Bookings

**Filter by Event:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/filter?event=Synergia" -Method GET | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

**Filter by Ticket Type:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/filter?ticketType=VIP" -Method GET | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

**Filter by Both:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/filter?event=Synergia&ticketType=VIP" -Method GET | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

### 8. Delete Booking
```powershell
# Replace <BOOKING_ID> with actual ID
$bookingId = "<BOOKING_ID>"
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/$bookingId" -Method DELETE | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

---

## Complete Test Script

Run all tests at once:

```powershell
# Test API - Complete Script
Write-Host "`n=== Testing Synergia Event Booking API ===" -ForegroundColor Green

# 1. Test server
Write-Host "`n1. Testing Server Connection..." -ForegroundColor Yellow
Invoke-WebRequest -Uri http://localhost:3001/ -Method GET | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 3

# 2. Create bookings
Write-Host "`n2. Creating Sample Bookings..." -ForegroundColor Yellow

$bookings = @(
    @{ name = "Alice Johnson"; email = "alice@example.com"; event = "Synergia"; ticketType = "VIP" },
    @{ name = "Bob Smith"; email = "bob@example.com"; event = "Synergia"; ticketType = "General" },
    @{ name = "Charlie Davis"; email = "charlie@example.com"; event = "Synergia"; ticketType = "Student" },
    @{ name = "Diana Prince"; email = "diana@example.com"; event = "TechFest"; ticketType = "VIP" }
)

foreach ($booking in $bookings) {
    $json = $booking | ConvertTo-Json
    $response = Invoke-WebRequest -Uri http://localhost:3001/api/bookings -Method POST -Body $json -ContentType "application/json"
    Write-Host "Created: $($booking.name)" -ForegroundColor Green
}

# 3. Get all bookings
Write-Host "`n3. Getting All Bookings..." -ForegroundColor Yellow
$allBookings = Invoke-WebRequest -Uri http://localhost:3001/api/bookings -Method GET | Select-Object -Expand Content | ConvertFrom-Json
Write-Host "Total Bookings: $($allBookings.count)" -ForegroundColor Cyan
$allBookings | ConvertTo-Json -Depth 5

# 4. Search by email
Write-Host "`n4. Searching by Email (alice@example.com)..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/search?email=alice" -Method GET | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 5

# 5. Filter by event
Write-Host "`n5. Filtering by Event (Synergia)..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/filter?event=Synergia" -Method GET | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 5

# 6. Filter by ticket type
Write-Host "`n6. Filtering by Ticket Type (VIP)..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/filter?ticketType=VIP" -Method GET | Select-Object -Expand Content | ConvertFrom-Json | ConvertTo-Json -Depth 5

Write-Host "`n=== All Tests Completed! ===" -ForegroundColor Green
```

---

## Test Error Handling

### Test Validation Errors

**Missing Required Fields:**
```powershell
$invalidBooking = @{
    name = "John Doe"
    # Missing email and event
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3001/api/bookings -Method POST -Body $invalidBooking -ContentType "application/json"
# Should return 400 Bad Request
```

**Invalid Email:**
```powershell
$invalidEmail = @{
    name = "John Doe"
    email = "invalid-email"
    event = "Synergia"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3001/api/bookings -Method POST -Body $invalidEmail -ContentType "application/json"
# Should return 400 Bad Request
```

**Invalid Booking ID:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/invalid-id" -Method GET
# Should return 400 Bad Request
```

**Non-existent Booking:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/bookings/507f1f77bcf86cd799439011" -Method GET
# Should return 404 Not Found
```

---

## Using Bruno (Alternative to Postman)

If you have Bruno installed, you can import the `.bru` files from the `bruno` folder in the workspace.

---

## Using cURL (Alternative)

### Create Booking:
```bash
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"event\":\"Synergia\",\"ticketType\":\"VIP\"}"
```

### Get All Bookings:
```bash
curl http://localhost:3001/api/bookings
```

### Search by Email:
```bash
curl "http://localhost:3001/api/bookings/search?email=john@example.com"
```

### Filter by Event:
```bash
curl "http://localhost:3001/api/bookings/filter?event=Synergia"
```

---

## Expected Response Codes

| Endpoint | Method | Success Code | Error Codes |
|----------|--------|--------------|-------------|
| `/api/bookings` | GET | 200 | 500 |
| `/api/bookings` | POST | 201 | 400, 500 |
| `/api/bookings/:id` | GET | 200 | 400, 404, 500 |
| `/api/bookings/:id` | PUT | 200 | 400, 404, 500 |
| `/api/bookings/:id` | DELETE | 200 | 400, 404, 500 |
| `/api/bookings/search` | GET | 200 | 400, 500 |
| `/api/bookings/filter` | GET | 200 | 400, 500 |

---

## Tips

1. **Save Booking IDs:** After creating bookings, save the `_id` values for testing GET, PUT, DELETE
2. **Pretty Print JSON:** Use `| ConvertFrom-Json | ConvertTo-Json -Depth 5` for readable output
3. **Error Handling:** PowerShell may throw errors on 4xx/5xx responses, use try-catch if needed
4. **View in Browser:** GET endpoints can be opened directly in browser

---

## Next Steps

After testing the API:
1. Review MongoDB Compass to see the data
2. Try different filter combinations
3. Test edge cases and error scenarios
4. Implement additional features if needed

**Happy Testing! 🚀**
