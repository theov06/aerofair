# ✈️ SkyVibe - Smart Flight Booking Platform

A complete, innovative flight booking website with unique features that don't exist in traditional booking sites. Built with vanilla HTML, CSS, and JavaScript - no frameworks required!

## 🌟 Unique Features

### 🤖 AeroFair AI + DeFi Integration
- **Autonomous AI Agent** - Natural language flight booking ("Book me a flight to Paris under $500")
- **DeFi Escrow** - Secure USDC smart contracts on Polygon blockchain
- **NFT Rebates** - Automatic refunds as tradeable NFT tokens if you overpaid
- **Fair Price Guarantee** - AI monitors prices 24/7 and refunds the difference
- **Web3 Wallet Integration** - Connect MetaMask for blockchain transactions

### 🌍 Climate Impact Score
- See CO2 emissions for each flight
- Compare environmental impact between options
- Eco-friendly flights highlighted with badges
- Carbon offset calculator and tracking

### 🤖 AI Price Prediction
- Real-time price trend analysis (rising/falling/stable)
- "Book now" or "wait" recommendations
- Historical price tracking
- Price drop alerts

### 📅 Flexible Date Heat Map
- Visual calendar with color-coded pricing
- Find the cheapest days to fly at a glance
- Interactive date selection
- ±3 days flexibility option

### 🎯 Layover Activities
- Discover things to do during long layovers
- City-specific recommendations
- Time-based suggestions
- Turn layovers into mini-adventures

### ✨ Travel Mood Selector
- **Adventure** - Exotic destinations and experiences
- **Luxury** - Premium flights and comfort
- **Budget** - Best deals and savings
- **Eco-Friendly** - Lowest carbon footprint
- **Business** - Fast, direct flights

### 🗺️ Multi-City Route Builder
- Plan complex trips with multiple stops
- Visual route planning
- Optimized connections

## 📄 Complete Website Pages

### 1. **Home / Flight Search** (`index.html`)
- Hero section with animated background
- Travel mood selector
- Advanced search form with autocomplete
- Flight results with detailed information
- Interactive filters and sorting
- Detailed flight modals

### 2. **AeroFair AI + DeFi** (`aerofair.html`) ⭐ NEW
- AI chatbot for natural language flight booking
- Real-time price fairness detection
- Web3 wallet connection (MetaMask)
- DeFi escrow dashboard
- NFT rebate gallery
- Fair price guarantee statistics
- Blockchain transaction tracking

### 3. **Explore Destinations** (`explore.html`)
- 12+ popular destinations
- Category filters (Beach, City, Adventure, Culture, Eco)
- Destination details with activities
- Carbon footprint calculator
- Travel inspiration blog section

### 4. **Deals** (`deals.html`)
- Flash deals with countdown timer
- Weekend getaway specials
- Last-minute deals
- Price alert system
- Discount badges and savings calculator

### 5. **My Trips** (`my-trips.html`)
- Upcoming trips dashboard
- Digital boarding passes
- Past trip history
- Trip statistics (countries visited, miles traveled)
- Carbon offset progress tracker
- Trip ratings and reviews
- Travel map visualization

## 🚀 Getting Started

### Option 1: Direct Browser
Simply open `frontend/index.html` in your browser:
```bash
open frontend/index.html
# or double-click the file
```

### Option 2: Local Server (Recommended)

**Using Python:**
```bash
cd frontend
python -m http.server 8000
# Visit http://localhost:8000
```

**Using Node.js:**
```bash
npx serve frontend
# Visit http://localhost:3000
```

**Using PHP:**
```bash
cd frontend
php -S localhost:8000
```

## 📁 Project Structure

```
frontend/
├── index.html          # Main flight search page
├── aerofair.html       # AI + DeFi fair pricing ⭐ NEW
├── explore.html        # Destinations explorer
├── deals.html          # Special deals and offers
├── my-trips.html       # Trip management dashboard
├── styles.css          # Complete styling (responsive)
├── script.js           # Main page functionality
├── aerofair.js         # AI agent & blockchain logic ⭐ NEW
├── explore.js          # Explore page logic
├── deals.js            # Deals page logic
└── my-trips.js         # Trip management logic
```

## 🎨 Design Highlights

- **Modern Gradient Design** - Beautiful purple/pink gradients throughout
- **Animated Elements** - Floating clouds, flying planes, smooth transitions
- **Glassmorphism** - Frosted glass effects on cards and modals
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Fade-ins, slides, hover effects
- **Accessible** - Keyboard navigation, focus states, semantic HTML

## 💡 Key Features Explained

### Flight Search
1. Select your travel mood (optional)
2. Enter departure and destination (with autocomplete)
3. Choose dates and passengers
4. Enable flexible dates to see price heatmap
5. Search and filter results
6. View detailed flight information
7. Book your flight

### Smart Filtering
- Price range slider
- Number of stops
- Airline selection
- Sort by: Best Value, Fastest, Cheapest, Most Eco-Friendly

### Flight Details Modal
- Complete flight information
- Environmental impact breakdown
- Amenities included
- Price prediction analysis
- Layover activity suggestions
- One-click booking

### Carbon Tracking
- Per-flight CO2 emissions
- Total carbon footprint
- Offset progress tracking
- Equivalence calculations (car miles, trees needed)
- Offset purchase options

## 🌍 Sample Data

The website includes realistic sample data for:
- 6 flights with varying prices, routes, and features
- 12 destinations across the globe
- Multiple deals and promotions
- Trip history and upcoming bookings

## 🔧 Customization

### Adding New Flights
Edit `frontend/script.js` and add to the `sampleFlights` array:
```javascript
{
    id: 7,
    airline: "Your Airline",
    from: "JFK",
    to: "LAX",
    price: 299,
    co2: 850,
    // ... more properties
}
```

### Adding New Destinations
Edit `frontend/explore.js` and add to the `allDestinations` array.

### Changing Colors
Edit `frontend/styles.css` - main colors are:
- Primary: `#667eea` (purple)
- Secondary: `#764ba2` (darker purple)
- Accent: `#f093fb` (pink)

## 📱 Mobile Responsive

- Hamburger menu for navigation
- Touch-friendly buttons and cards
- Optimized layouts for small screens
- Swipe-friendly carousels

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + K` - Focus search input
- `Esc` - Close modals
- `Tab` - Navigate through elements

## 🎯 Future Enhancements

The platform is designed to easily integrate:
- Real flight API (Amadeus, Skyscanner, etc.)
- Payment processing (Stripe, PayPal)
- User authentication
- Backend database
- Email notifications
- Real-time price updates
- Social sharing
- Reviews and ratings system

## 🌟 Unique Selling Points

1. **Environmental Focus** - First booking platform with comprehensive CO2 tracking
2. **Mood-Based Search** - Personalized recommendations based on travel style
3. **Layover Value** - Turn waiting time into experiences
4. **Price Intelligence** - AI-powered booking recommendations
5. **Visual Price Discovery** - Heatmap makes finding deals intuitive

## 📊 Technical Details

- **Pure Vanilla JS** - No frameworks, fast loading
- **CSS Grid & Flexbox** - Modern, flexible layouts
- **Local Storage** - Save preferences and history
- **Responsive Images** - Optimized for all screen sizes
- **Performance** - Lazy loading, optimized animations
- **Accessibility** - ARIA labels, keyboard navigation

## 🎨 Color Palette

- Primary Purple: `#667eea`
- Dark Purple: `#764ba2`
- Pink: `#f093fb`
- Success Green: `#28a745`
- Warning Yellow: `#ffc107`
- Danger Red: `#dc3545`
- Neutral Gray: `#666`

## 📝 License

This is a demonstration project. Feel free to use and modify as needed.

## 🤝 Contributing

This is a complete, production-ready frontend. To extend:
1. Add backend API integration
2. Implement real payment processing
3. Add user authentication
4. Connect to flight data providers
5. Implement email notifications

---

**Built with ❤️ for travelers who care about the planet and their wallet.**
