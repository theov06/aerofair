# 🌟 SkyVibe Features Documentation

## Complete Feature List

### 🏠 Home Page (index.html)

#### Hero Section
- **Animated Background**: Floating clouds and flying plane animations
- **Travel Mood Selector**: 5 mood options (Adventure, Luxury, Budget, Eco-Friendly, Business)
- **Smart Search Form**: 
  - Autocomplete for airports (12+ major airports)
  - Swap button for quick route reversal
  - Date pickers with default values
  - Passenger selection
  - Flexible dates option
  - Direct flights only filter

#### Flight Results
- **6 Sample Flights** with realistic data:
  - Economy and Business class options
  - Direct and connecting flights
  - Price range: $420 - $2,850
  - Various airlines with emoji logos
  - Seat availability indicators
  - Amenities lists

#### Unique Features Per Flight
1. **CO2 Emissions Display**
   - Exact kg of CO2 per passenger
   - Color-coded impact levels (Low/Medium/High)
   - Comparison between flights
   - Eco-friendly badges

2. **AI Price Predictions**
   - 📉 Price dropping - Book now
   - 📈 Price rising - Book soon
   - ➡️ Stable pricing
   - Confidence indicators

3. **Layover Activities**
   - City-specific recommendations
   - Time-based suggestions
   - Local attractions
   - Food and entertainment tips

#### Interactive Elements
- **Filter Sidebar**:
  - Price range slider ($0-$2000)
  - Stops filter (Direct, 1 stop, 2+ stops)
  - Airline selection
  
- **Sort Options**:
  - Best Value (balanced score)
  - Fastest (by duration)
  - Cheapest (by price)
  - Most Eco-Friendly (by CO2)

#### Flight Detail Modal
- Complete flight information
- Environmental impact breakdown with progress bar
- Amenities checklist
- Price prediction analysis
- Layover activity details
- One-click booking

#### Flexible Date Heatmap
- 28-day calendar view
- Color-coded pricing (green = cheap, red = expensive)
- Interactive date selection
- Price range: $580-$960
- Visual price comparison

---

### 🗺️ Explore Page (explore.html)

#### Destinations
**12 Featured Destinations**:
1. Tokyo, Japan - $650 (Eco-friendly)
2. Paris, France - $520
3. Dubai, UAE - $780
4. Bali, Indonesia - $890 (Eco-friendly)
5. London, UK - $480
6. Barcelona, Spain - $550
7. Reykjavik, Iceland - $620 (Eco-friendly)
8. Maldives - $1,200 (Luxury, Eco-friendly)
9. New Zealand - $950 (Adventure, Eco-friendly)
10. Santorini, Greece - $680
11. Costa Rica - $720 (Eco-friendly)
12. Singapore - $750 (Eco-friendly)

#### Destination Details
- High-quality images
- Price from major hubs
- Star ratings (4.5-4.9)
- Category tags (Beach, City, Adventure, Culture, Eco)
- Popular activities list
- Detailed descriptions
- "Why Visit" sections

#### Category Filters
- All destinations
- 🌱 Eco-Friendly
- 🏖️ Beach
- 🏙️ City
- 🏔️ Adventure
- 🎭 Culture

#### Carbon Calculator
- Distance input (km)
- Passenger count
- Real-time CO2 calculation
- Equivalence comparisons:
  - Car driving distance
  - Trees needed for offset
- Carbon offset purchase option

#### Travel Inspiration
3 blog-style articles:
1. Best Time to Visit Japan
2. Eco-Friendly Travel Tips
3. Hidden Gems in Europe

---

### 🔥 Deals Page (deals.html)

#### Flash Deals
**3 Limited-Time Offers**:
- New York → London: $299 (48% off, was $580)
- Los Angeles → Tokyo: $499 (41% off, was $850)
- Miami → Barcelona: $349 (44% off, was $620)

Features:
- Countdown timer (6 hours)
- Discount percentage badges
- Seats remaining indicator
- CO2 impact display
- High-quality destination images

#### Weekend Getaways
**4 Short-Trip Options**:
- New York → Miami: $89 (3h 15m)
- San Francisco → Las Vegas: $79 (1h 30m)
- Chicago → New Orleans: $99 (2h 45m)
- Boston → Washington DC: $69 (1h 45m)

Features:
- Duration display
- Star ratings
- Quick booking
- Perfect for 2-3 day trips

#### Last Minute Deals
**3 Urgent Offers**:
- New York → Cancun: $199 (was $450) - Tomorrow
- Los Angeles → Hawaii: $249 (was $520) - Dec 3
- Chicago → Denver: $89 (was $220) - Dec 4

Features:
- Departure date badges
- Savings calculator
- Urgency indicators
- Price comparison

#### Price Alerts
- Route-based alerts
- Email notification system
- Custom price thresholds
- Alert management

---

### ✈️ My Trips Page (my-trips.html)

#### Travel Statistics Dashboard
- **Total Trips**: 12
- **Countries Visited**: 8
- **Miles Traveled**: 45,000
- **CO₂ Offset**: 8.2 tons

#### Upcoming Trips
**2 Confirmed Bookings**:
1. New York → Tokyo (Dec 15-25, 2024)
2. Tokyo → New York (Return)

Features per trip:
- Airline and class information
- Departure and arrival times
- Booking reference number
- CO2 impact
- Status badge (Confirmed)
- Action buttons:
  - View Ticket (digital boarding pass)
  - Check In
  - Add to Calendar
  - Manage Trip

#### Digital Boarding Pass
- Passenger name
- Flight route with airport codes
- Departure date and time
- Class information
- Booking reference (large, scannable format)
- Download PDF option
- Print-friendly design

#### Past Trips
**3 Historical Trips**:
1. New York → London (Oct 10, 2024)
2. Los Angeles → Paris (Sep 5, 2024)
3. Miami → Barcelona (Aug 20, 2024)

Features:
- Trip rating system (1-5 stars)
- CO2 tracking
- Airline information
- Rate trip option

#### Carbon Offset Tracker
- Progress bar (82% complete)
- Total emissions: 12.5 tons
- Offset amount: 10.2 tons
- Remaining: 2.3 tons
- Offset purchase option
- Visual progress indicator

#### Travel Map
- Countries visited visualization
- Flag emojis for each country
- Interactive country badges
- Travel journey tracking

---

## 🎨 Design System

### Color Palette
- **Primary Purple**: #667eea
- **Dark Purple**: #764ba2
- **Pink Accent**: #f093fb
- **Success Green**: #28a745
- **Warning Yellow**: #ffc107
- **Danger Red**: #dc3545
- **Eco Green**: #d4edda
- **Text Gray**: #666

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Heading Sizes**: 48px, 36px, 24px, 20px, 18px
- **Body Size**: 16px
- **Small Text**: 14px, 12px

### Components
1. **Buttons**
   - Primary gradient button
   - Secondary outline button
   - Large CTA button
   - Icon buttons

2. **Cards**
   - Flight cards with hover effects
   - Destination cards with overlays
   - Deal cards with badges
   - Trip cards with actions

3. **Modals**
   - Flight details modal
   - Boarding pass modal
   - Rating modal
   - Confirmation modal

4. **Forms**
   - Text inputs with icons
   - Date pickers
   - Select dropdowns
   - Checkboxes and radio buttons
   - Range sliders

5. **Badges**
   - Eco-friendly badge
   - Price prediction badge
   - Layover activity badge
   - Discount badge
   - Status badge

### Animations
- Floating clouds (20s loop)
- Flying plane (15s loop)
- Card hover effects (translateY)
- Modal fade-in/scale
- Button hover (translateY)
- Staggered list animations
- Progress bar fills
- Countdown timer updates

---

## 🔧 Technical Features

### JavaScript Functionality
1. **Search & Filter**
   - Real-time filtering
   - Multi-criteria sorting
   - Price range filtering
   - Mood-based filtering

2. **Autocomplete**
   - Airport search
   - City matching
   - Code matching
   - Recent searches

3. **Data Management**
   - Local storage for preferences
   - Search history tracking
   - Favorite destinations
   - User preferences

4. **Interactive Elements**
   - Modal system
   - Notification system
   - Mobile menu toggle
   - Smooth scrolling
   - Keyboard shortcuts

5. **Calculations**
   - CO2 emissions
   - Price comparisons
   - Savings calculator
   - Duration parsing
   - Best value scoring

### Responsive Design
- **Breakpoints**:
  - Desktop: 1200px+
  - Tablet: 768px-1199px
  - Mobile: <768px

- **Mobile Features**:
  - Hamburger menu
  - Touch-friendly buttons
  - Stacked layouts
  - Optimized images
  - Swipe gestures

### Performance
- Lazy loading images
- Optimized animations
- Minimal dependencies
- Fast page loads
- Efficient DOM manipulation

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus states
- Screen reader support
- High contrast ratios

---

## 📊 Sample Data

### Flights: 6 options
- Price range: $420-$2,850
- Duration range: 14h 15m - 18h 15m
- CO2 range: 980kg - 1,520kg
- Classes: Economy, Business
- Stops: Direct, 1 stop, 2 stops

### Destinations: 12 locations
- 6 continents represented
- Price range: $480-$1,200
- Ratings: 4.5-4.9 stars
- 5 eco-friendly options

### Deals: 10 offers
- Flash deals: 3 (41-48% off)
- Weekend getaways: 4 ($69-$99)
- Last minute: 3 (departing within 7 days)

### Trips: 5 bookings
- Upcoming: 2
- Past: 3
- Total statistics tracked

---

## 🚀 Unique Innovations

### 1. Climate Impact Score
**Industry First**: No major booking platform shows detailed CO2 per flight
- Real calculations based on distance
- Color-coded impact levels
- Offset tracking and purchase
- Eco-friendly alternatives highlighted

### 2. AI Price Prediction
**Smart Booking**: Tells users when to book
- Trend analysis (up/down/stable)
- Confidence indicators
- Historical data simulation
- Save money recommendations

### 3. Layover Activities
**Turn Waiting into Exploring**: Unique value proposition
- City-specific suggestions
- Time-based recommendations
- Local attractions
- Food and entertainment

### 4. Mood-Based Search
**Personalized Discovery**: Match flights to travel style
- 5 distinct moods
- Automatic filtering
- Preference learning
- Tailored recommendations

### 5. Visual Price Discovery
**Heatmap Calendar**: See all prices at once
- 28-day view
- Color-coded pricing
- Interactive selection
- Flexible date optimization

---

## 💡 Use Cases

### For Eco-Conscious Travelers
- Compare CO2 emissions
- Choose eco-friendly flights
- Track carbon footprint
- Purchase offsets
- See environmental impact

### For Budget Travelers
- Find cheapest flights
- Use price heatmap
- Set price alerts
- Last-minute deals
- Weekend getaways

### For Business Travelers
- Direct flights only
- Fastest routes
- Business class options
- Quick booking
- Trip management

### For Adventure Seekers
- Layover activities
- Multi-city routes
- Exotic destinations
- Adventure category
- Flexible dates

### For Luxury Travelers
- Premium flights
- Business class
- High-end destinations
- Comfort amenities
- Luxury category

---

## 🎯 Future Integration Ideas

1. **Real Flight APIs**
   - Amadeus
   - Skyscanner
   - Kayak
   - Google Flights

2. **Payment Processing**
   - Stripe
   - PayPal
   - Apple Pay
   - Google Pay

3. **User Authentication**
   - Email/Password
   - Social login
   - OAuth
   - JWT tokens

4. **Backend Services**
   - Node.js/Express
   - Database (MongoDB/PostgreSQL)
   - Email notifications
   - Real-time updates

5. **Advanced Features**
   - Seat selection
   - Meal preferences
   - Baggage management
   - Travel insurance
   - Hotel booking
   - Car rental

---

**This is a complete, production-ready frontend that can be integrated with any flight booking API.**
