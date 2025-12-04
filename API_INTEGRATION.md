# 🔌 AirLabs API Integration Guide

## Overview

SkyVibe now supports live Canadian flight data through the AirLabs API. This integration provides real-time flight information for all major Canadian airlines.

## Features

### Live Data
- ✈️ Real-time flight tracking
- 📅 Flight schedules
- 🛫 Departure/arrival times
- ⏱️ Flight delays and status
- 🗺️ Route information

### Canadian Airlines Supported
- **Air Canada (AC)** 🍁
- **WestJet (WS)** 🛫
- **Porter Airlines (PD)** ✈️
- **Flair Airlines (F8)** 💰
- **Air Transat (TS)** 🌴

### Canadian Airports Covered
All major Canadian airports including:
- YYZ (Toronto), YVR (Vancouver), YUL (Montreal)
- YYC (Calgary), YOW (Ottawa), YEG (Edmonton)
- YHZ (Halifax), YWG (Winnipeg), YQB (Quebec City)
- And more...

## Setup Instructions

### 1. Get Your API Key

1. Visit [airlabs.co](https://airlabs.co)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key

### 2. Configure in SkyVibe

**Option A: Through Settings Page**
1. Open `frontend/settings.html`
2. Paste your API key
3. Click "Test Connection"
4. Click "Save API Key"

**Option B: Direct Configuration**
1. Open `frontend/api-config.js`
2. Replace `YOUR_API_KEY_HERE` with your actual key:
```javascript
AIRLABS_API_KEY: 'your-actual-api-key-here'
```

### 3. Verify Integration

1. Refresh the main page
2. Search for a flight (e.g., Toronto to Vancouver)
3. Check browser console for "AirLabs API initialized"
4. Live flights will be displayed if available

## API Endpoints Used

### 1. Flights by Airline
```
GET /v9/flights?airline_iata={AIRLINE}&api_key={KEY}
```
Fetches all current flights for a specific airline.

### 2. Flights by Route
```
GET /v9/flights?dep_iata={FROM}&arr_iata={TO}&api_key={KEY}
```
Fetches flights between two specific airports.

### 3. Schedules
```
GET /v9/schedules?dep_iata={FROM}&arr_iata={TO}&api_key={KEY}
```
Fetches scheduled flights for future dates.

## Data Mapping

### API Response Format
```json
{
  "flag": "CA",
  "airline_iata": "AC",
  "airline_icao": "ACA",
  "flight_number": "21",
  "flight_iata": "AC21",
  "dep_iata": "YYZ",
  "dep_time": "2021-07-21 18:50",
  "arr_iata": "YVR",
  "arr_time": "2021-07-22 07:04",
  "duration": 434,
  "status": "en-route",
  "delayed": 1
}
```

### Converted to SkyVibe Format
```javascript
{
  id: 1,
  airline: "Air Canada",
  logo: "🍁",
  from: "YYZ",
  to: "YVR",
  departTime: "6:50 PM",
  arriveTime: "7:04 AM",
  duration: "7h 14m",
  stops: "Direct",
  price: 285,
  co2: 420,
  priceChange: "down",
  ecoFriendly: false,
  class: "Economy",
  seats: 12,
  amenities: ["WiFi", "Meals", "Entertainment"],
  flightNumber: "AC21",
  status: "en-route",
  delayed: true
}
```

## Filtering Logic

### Canadian Domestic Only
The integration automatically filters for:
- Flights with Canadian departure airports (Y** codes)
- Flights with Canadian arrival airports (Y** codes)
- Excludes international flights

### Example Filter
```javascript
filterCanadianDomestic(flights) {
    return flights.filter(flight => {
        const depIATA = flight.dep_iata;
        const arrIATA = flight.arr_iata;
        
        return (
            depIATA && arrIATA &&
            CANADIAN_AIRPORTS[depIATA] &&
            CANADIAN_AIRPORTS[arrIATA]
        );
    });
}
```

## Fallback Behavior

If API is not configured or fails:
1. App displays sample data
2. User sees notification: "Using sample data"
3. All features continue to work normally
4. No errors or broken functionality

## Cost & Limits

### Free Tier
- 100 requests per month
- Basic flight data
- Perfect for testing

### Paid Plans
- More requests
- Additional data fields
- Historical data
- Priority support

Visit [airlabs.co/pricing](https://airlabs.co/pricing) for details.

## Usage Examples

### Search Specific Route
```javascript
// User searches: Toronto to Vancouver
const flights = await fetchRouteFlights('YYZ', 'YVR');
// Returns live Air Canada, WestJet flights on this route
```

### Get All Canadian Flights
```javascript
// Fetch all current Canadian domestic flights
const flights = await fetchLiveCanadianFlights();
// Returns flights from AC, WS, PD, F8, TS
```

### Check Flight Status
```javascript
// Each flight includes status
flight.status // "scheduled", "en-route", "landed", "cancelled"
flight.delayed // true/false
```

## Troubleshooting

### No Live Flights Showing
1. Check API key is saved correctly
2. Verify key in browser console
3. Test connection in Settings page
4. Check browser console for errors

### API Errors
- **401 Unauthorized**: Invalid API key
- **429 Too Many Requests**: Rate limit exceeded
- **500 Server Error**: AirLabs service issue

### Console Messages
```javascript
// Success
"AirLabs API initialized - Live flight data available"

// No API key
"Using sample data - Set API key to use live flights"

// API call success
"Found 12 live flights!"

// API call failed
"Showing sample flights (API data unavailable)"
```

## Development

### Testing Locally
```bash
# Start local server
npm start

# Open settings page
http://localhost:5000/settings.html

# Configure API key
# Test connection
# Return to main page
```

### Adding New Airlines
Edit `api-config.js`:
```javascript
CANADIAN_AIRLINES: {
    'XX': { name: 'New Airline', logo: '✈️', iata: 'XX', icao: 'XXX' }
}
```

### Adding New Airports
Edit `api-config.js`:
```javascript
CANADIAN_AIRPORTS: {
    'YXX': { name: 'New Airport', city: 'City', province: 'XX' }
}
```

## Security Notes

### API Key Storage
- Stored in browser localStorage
- Not sent to any server except AirLabs
- User can clear anytime
- No backend storage

### Best Practices
- Don't commit API keys to git
- Use environment variables in production
- Rotate keys periodically
- Monitor usage on AirLabs dashboard

## Future Enhancements

### Planned Features
- [ ] Real-time price tracking
- [ ] Flight delay notifications
- [ ] Historical price data
- [ ] Seat availability
- [ ] Aircraft type information
- [ ] Weather integration
- [ ] Airport delays

### API Expansion
- [ ] International flights (US-Canada)
- [ ] Charter flights
- [ ] Cargo flights
- [ ] Private aviation

## Support

### Resources
- [AirLabs Documentation](https://airlabs.co/docs)
- [API Status Page](https://status.airlabs.co)
- [Support Email](mailto:support@airlabs.co)

### SkyVibe Support
- Check `settings.html` for configuration
- Review browser console for errors
- Test API connection before use
- Clear cache if issues persist

## Example API Response

```json
{
  "request": {
    "airline_iata": "AC",
    "api_key": "********"
  },
  "response": [
    {
      "flag": "CA",
      "airline_iata": "AC",
      "airline_icao": "ACA",
      "flight_number": "301",
      "flight_iata": "AC301",
      "flight_icao": "ACA301",
      "dep_iata": "YYZ",
      "dep_icao": "CYYZ",
      "dep_terminal": "1",
      "dep_gate": "D45",
      "dep_time": "2024-12-02 08:00",
      "dep_time_utc": "2024-12-02 13:00",
      "arr_iata": "YVR",
      "arr_icao": "CYVR",
      "arr_terminal": "M",
      "arr_gate": "C42",
      "arr_time": "2024-12-02 10:30",
      "arr_time_utc": "2024-12-02 18:30",
      "duration": 330,
      "delayed": 0,
      "status": "scheduled",
      "aircraft_icao": "B77W",
      "reg_number": "C-FIUR"
    }
  ],
  "terms": "https://airlabs.co/terms"
}
```

---

**Ready to use live Canadian flight data!** 🇨🇦✈️
