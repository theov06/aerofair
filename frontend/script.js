// Sample flight data with unique features
const sampleFlights = [
    {
        id: 1,
        airline: "SkyWings",
        logo: "✈️",
        from: "JFK",
        to: "NRT",
        departTime: "10:30 AM",
        arriveTime: "2:45 PM +1",
        duration: "14h 15m",
        stops: "Direct",
        price: 850,
        co2: 1200,
        priceChange: "down",
        layoverActivity: null,
        ecoFriendly: true,
        class: "Economy",
        seats: 12,
        amenities: ["WiFi", "Meals", "Entertainment"]
    },
    {
        id: 2,
        airline: "Pacific Air",
        logo: "🌊",
        from: "JFK",
        to: "NRT",
        departTime: "6:15 PM",
        arriveTime: "11:30 PM +1",
        duration: "16h 15m",
        stops: "1 stop (LAX)",
        price: 650,
        co2: 1450,
        priceChange: "up",
        layoverActivity: "3h layover - Visit Santa Monica Beach, Venice Boardwalk nearby",
        ecoFriendly: false,
        class: "Economy",
        seats: 8,
        amenities: ["WiFi", "Snacks"]
    },
    {
        id: 3,
        airline: "EcoJet",
        logo: "🌱",
        from: "JFK",
        to: "NRT",
        departTime: "8:00 AM",
        arriveTime: "1:15 PM +1",
        duration: "15h 15m",
        stops: "Direct",
        price: 920,
        co2: 980,
        priceChange: "stable",
        layoverActivity: null,
        ecoFriendly: true,
        class: "Economy",
        seats: 15,
        amenities: ["WiFi", "Organic Meals", "Entertainment", "Extra Legroom"]
    },
    {
        id: 4,
        airline: "Global Express",
        logo: "🌍",
        from: "JFK",
        to: "NRT",
        departTime: "11:45 PM",
        arriveTime: "5:30 AM +2",
        duration: "17h 45m",
        stops: "1 stop (SFO)",
        price: 580,
        co2: 1380,
        priceChange: "down",
        layoverActivity: "4h layover - Golden Gate Bridge tour, Fisherman's Wharf, Alcatraz views",
        ecoFriendly: false,
        class: "Economy",
        seats: 5,
        amenities: ["Meals", "Entertainment"]
    },
    {
        id: 5,
        airline: "Luxury Airways",
        logo: "💎",
        from: "JFK",
        to: "NRT",
        departTime: "9:00 AM",
        arriveTime: "1:30 PM +1",
        duration: "14h 30m",
        stops: "Direct",
        price: 2850,
        co2: 1100,
        priceChange: "stable",
        layoverActivity: null,
        ecoFriendly: false,
        class: "Business",
        seats: 4,
        amenities: ["WiFi", "Gourmet Meals", "Lie-flat Seats", "Lounge Access", "Premium Entertainment"]
    },
    {
        id: 6,
        airline: "Budget Wings",
        logo: "💰",
        from: "JFK",
        to: "NRT",
        departTime: "3:30 AM",
        arriveTime: "9:45 PM +1",
        duration: "18h 15m",
        stops: "2 stops (ORD, SEA)",
        price: 420,
        co2: 1520,
        priceChange: "down",
        layoverActivity: "2h in Chicago - Deep dish pizza, 3h in Seattle - Pike Place Market",
        ecoFriendly: false,
        class: "Economy",
        seats: 20,
        amenities: ["Basic Seat"]
    }
];

// Destinations data
const destinations = [
    {
        name: "Tokyo, Japan",
        code: "NRT",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
        price: 650,
        description: "Experience the perfect blend of tradition and technology",
        ecoFriendly: true,
        popular: true
    },
    {
        name: "Paris, France",
        code: "CDG",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        price: 520,
        description: "The city of lights and romance",
        ecoFriendly: false,
        popular: true
    },
    {
        name: "Dubai, UAE",
        code: "DXB",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        price: 780,
        description: "Luxury and innovation in the desert",
        ecoFriendly: false,
        popular: true
    },
    {
        name: "Bali, Indonesia",
        code: "DPS",
        image: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=800",
        price: 890,
        description: "Tropical paradise with stunning beaches",
        ecoFriendly: true,
        popular: true
    },
    {
        name: "London, UK",
        code: "LHR",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
        price: 480,
        description: "Historic charm meets modern culture",
        ecoFriendly: false,
        popular: true
    },
    {
        name: "Barcelona, Spain",
        code: "BCN",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800",
        price: 550,
        description: "Art, architecture, and Mediterranean vibes",
        ecoFriendly: false,
        popular: true
    }
];

// User preferences storage
let userPreferences = {
    mood: null,
    searchHistory: [],
    favoriteDestinations: []
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeMoodSelector();
    initializeSearchForm();
    initializeSwapButton();
    initializeTabs();
    setDefaultDates();
});

// Mood Selector
function initializeMoodSelector() {
    const moodItems = document.querySelectorAll('.mood-item');
    
    moodItems.forEach(item => {
        item.addEventListener('click', () => {
            moodItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');
            
            const mood = item.dataset.mood;
            console.log(`Selected mood: ${mood}`);
            // Filter flights based on mood
            filterByMood(mood);
        });
    });
}

function filterByMood(mood) {
    // This would filter flights based on selected mood
    const filters = {
        adventure: { sortBy: 'destinations', preference: 'exotic' },
        luxury: { sortBy: 'price', preference: 'high', class: 'business' },
        budget: { sortBy: 'price', preference: 'low' },
        eco: { sortBy: 'co2', preference: 'low' },
        business: { sortBy: 'duration', preference: 'short', class: 'business' }
    };
    
    console.log('Applying mood filter:', filters[mood]);
}

// Search Form
function initializeSearchForm() {
    const searchBtn = document.querySelector('.search-btn');
    const flexibleDates = document.getElementById('flexibleDates');
    
    searchBtn.addEventListener('click', () => {
        performSearch();
    });
    
    flexibleDates.addEventListener('change', (e) => {
        if (e.target.checked) {
            showHeatmap();
        } else {
            hideHeatmap();
        }
    });
}

function performSearch() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const departure = document.getElementById('departure').value;
    const returnDate = document.getElementById('return').value;
    
    if (!from || !to || !departure) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show results
    displayFlights();
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function displayFlights() {
    const resultsSection = document.getElementById('results');
    const flightsList = document.getElementById('flightsList');
    
    resultsSection.style.display = 'block';
    flightsList.innerHTML = '';
    
    sampleFlights.forEach(flight => {
        const flightCard = createFlightCard(flight);
        flightsList.appendChild(flightCard);
    });
}

function createFlightCard(flight) {
    const card = document.createElement('div');
    card.className = 'flight-card';
    
    const priceChangeText = {
        down: '📉 Book now - Price dropping',
        up: '📈 Book soon - Price rising',
        stable: '➡️ Stable price'
    };
    
    const co2Level = flight.co2 < 1000 ? 'Low' : flight.co2 < 1300 ? 'Medium' : 'High';
    const co2Color = flight.co2 < 1000 ? '#28a745' : flight.co2 < 1300 ? '#ffc107' : '#dc3545';
    
    card.innerHTML = `
        <div class="flight-header">
            <div class="airline-info">
                <div class="airline-logo">${flight.logo}</div>
                <div>
                    <div style="font-weight: 600; font-size: 18px;">${flight.airline}</div>
                    <div style="font-size: 14px; color: #666;">${flight.stops} • ${flight.class}</div>
                </div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 14px; color: ${co2Color}; font-weight: 600;">
                    🌍 ${flight.co2}kg CO₂
                </div>
                <div style="font-size: 12px; color: #666;">${co2Level} Impact</div>
            </div>
        </div>
        
        <div class="flight-details">
            <div class="flight-time">
                <div class="time">${flight.departTime}</div>
                <div class="airport">${flight.from}</div>
            </div>
            
            <div class="flight-duration">
                <div style="font-size: 14px; color: #666; margin-bottom: 5px;">${flight.duration}</div>
                <div class="duration-line"></div>
                <div style="font-size: 12px; color: #999; margin-top: 5px;">${flight.stops}</div>
            </div>
            
            <div class="flight-time">
                <div class="time">${flight.arriveTime}</div>
                <div class="airport">${flight.to}</div>
            </div>
        </div>
        
        <div style="margin: 15px 0; padding: 12px; background: #f8f9fa; border-radius: 8px;">
            <div style="font-size: 13px; color: #666; margin-bottom: 8px;">
                <strong>Amenities:</strong> ${flight.amenities.join(' • ')}
            </div>
            <div style="font-size: 13px; color: #666;">
                <strong>Seats Available:</strong> ${flight.seats} left at this price
            </div>
        </div>
        
        <div class="flight-footer">
            <div class="flight-badges">
                ${flight.ecoFriendly ? '<span class="badge eco-badge">🌱 Eco-Friendly</span>' : ''}
                <span class="badge price-prediction">${priceChangeText[flight.priceChange]}</span>
                ${flight.layoverActivity ? '<span class="badge layover-badge">🎯 Layover Activities</span>' : ''}
            </div>
            
            <div class="flight-price">
                <div>
                    <div class="price">$${flight.price}</div>
                    <div style="font-size: 12px; color: #666;">per person</div>
                </div>
                <button class="book-btn" onclick="showFlightDetails(${flight.id})">View Details</button>
            </div>
        </div>
        
        ${flight.layoverActivity ? `
            <div style="margin-top: 15px; padding: 15px; background: #f0f8ff; border-radius: 10px; font-size: 14px;">
                <strong>✨ Layover Activities:</strong> ${flight.layoverActivity}
            </div>
        ` : ''}
    `;
    
    return card;
}

function showFlightDetails(flightId) {
    const flight = sampleFlights.find(f => f.id === flightId);
    if (!flight) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close" onclick="closeModal()">&times;</span>
            <h2>Flight Details</h2>
            
            <div class="modal-section">
                <div class="airline-info" style="margin-bottom: 20px;">
                    <div class="airline-logo" style="font-size: 48px;">${flight.logo}</div>
                    <div>
                        <h3>${flight.airline}</h3>
                        <p>${flight.class} Class</p>
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h3>Flight Information</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Departure</span>
                        <span class="info-value">${flight.departTime} from ${flight.from}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Arrival</span>
                        <span class="info-value">${flight.arriveTime} at ${flight.to}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Duration</span>
                        <span class="info-value">${flight.duration}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Stops</span>
                        <span class="info-value">${flight.stops}</span>
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h3>Environmental Impact</h3>
                <div class="co2-details">
                    <div class="co2-bar">
                        <div class="co2-fill" style="width: ${(flight.co2 / 2000) * 100}%; background: ${flight.co2 < 1000 ? '#28a745' : flight.co2 < 1300 ? '#ffc107' : '#dc3545'};"></div>
                    </div>
                    <p style="margin-top: 10px;">This flight produces <strong>${flight.co2}kg of CO₂</strong> per passenger.</p>
                    <p style="font-size: 14px; color: #666;">That's equivalent to driving ${Math.round(flight.co2 / 0.4)} km in a car.</p>
                    ${flight.ecoFriendly ? '<p style="color: #28a745; font-weight: 600;">✓ This is an eco-friendly option!</p>' : ''}
                </div>
            </div>
            
            <div class="modal-section">
                <h3>Amenities Included</h3>
                <div class="amenities-list">
                    ${flight.amenities.map(a => `<span class="amenity-tag">✓ ${a}</span>`).join('')}
                </div>
            </div>
            
            ${flight.layoverActivity ? `
                <div class="modal-section">
                    <h3>Layover Activities</h3>
                    <p>${flight.layoverActivity}</p>
                </div>
            ` : ''}
            
            <div class="modal-section">
                <h3>Price Prediction</h3>
                <div class="price-prediction-detail">
                    ${flight.priceChange === 'down' ? 
                        '<p style="color: #28a745;">📉 <strong>Great time to book!</strong> Our AI predicts prices will continue dropping.</p>' :
                        flight.priceChange === 'up' ?
                        '<p style="color: #dc3545;">📈 <strong>Book soon!</strong> Prices are expected to rise in the next 24-48 hours.</p>' :
                        '<p style="color: #666;">➡️ <strong>Stable pricing.</strong> Good time to book if this fits your schedule.</p>'
                    }
                </div>
            </div>
            
            <div class="modal-footer">
                <div class="modal-price">
                    <span style="font-size: 14px; color: #666;">Total Price</span>
                    <span style="font-size: 36px; font-weight: 700; color: #667eea;">$${flight.price}</span>
                    <span style="font-size: 14px; color: #666;">per person</span>
                </div>
                <button class="book-btn-large" onclick="bookFlight(${flight.id})">Book This Flight</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function bookFlight(flightId) {
    const flight = sampleFlights.find(f => f.id === flightId);
    alert(`Booking flight with ${flight.airline} for $${flight.price}\n\n🌍 CO₂ Impact: ${flight.co2}kg\n\nThank you for choosing SkyVibe!`);
}

// Swap Button
function initializeSwapButton() {
    const swapBtn = document.getElementById('swapBtn');
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    
    swapBtn.addEventListener('click', () => {
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
    });
}

// Tabs
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabType = tab.dataset.tab;
            console.log(`Switched to ${tabType} tab`);
            // Handle different tab layouts
        });
    });
}

// Heatmap
function showHeatmap() {
    const heatmapSection = document.getElementById('heatmap');
    heatmapSection.style.display = 'block';
    generateHeatmap();
    heatmapSection.scrollIntoView({ behavior: 'smooth' });
}

function hideHeatmap() {
    const heatmapSection = document.getElementById('heatmap');
    heatmapSection.style.display = 'none';
}

function generateHeatmap() {
    const calendar = document.getElementById('heatmapCalendar');
    calendar.innerHTML = '';
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const prices = [650, 580, 620, 850, 920, 780, 690, 
                   720, 680, 590, 870, 940, 800, 710,
                   730, 690, 600, 880, 950, 820, 720,
                   740, 700, 610, 890, 960, 830, 730];
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    // Add day headers
    days.forEach(day => {
        const header = document.createElement('div');
        header.style.textAlign = 'center';
        header.style.fontWeight = '600';
        header.style.padding = '10px';
        header.textContent = day;
        calendar.appendChild(header);
    });
    
    // Add price days
    prices.forEach((price, index) => {
        const day = document.createElement('div');
        day.className = 'heatmap-day';
        
        // Calculate color intensity
        const intensity = (price - minPrice) / (maxPrice - minPrice);
        const hue = 120 - (intensity * 120); // Green to red
        day.style.background = `hsl(${hue}, 70%, 85%)`;
        
        day.innerHTML = `
            <div style="font-weight: 600;">${index + 1}</div>
            <div style="font-size: 12px; margin-top: 5px;">$${price}</div>
        `;
        
        day.addEventListener('click', () => {
            alert(`Selected date with price: $${price}`);
        });
        
        calendar.appendChild(day);
    });
}

// Set default dates
function setDefaultDates() {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const twoWeeks = new Date(today);
    twoWeeks.setDate(today.getDate() + 14);
    
    document.getElementById('departure').value = nextWeek.toISOString().split('T')[0];
    document.getElementById('return').value = twoWeeks.toISOString().split('T')[0];
}

// Filter chips
document.addEventListener('DOMContentLoaded', () => {
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });
});

// Price range slider
const priceRange = document.getElementById('priceRange');
if (priceRange) {
    priceRange.addEventListener('input', (e) => {
        document.getElementById('maxPrice').textContent = `$${e.target.value}`;
    });
}


function bookFlight(flightId) {
    const flight = sampleFlights.find(f => f.id === flightId);
    closeModal();
    
    // Show booking confirmation
    const confirmation = document.createElement('div');
    confirmation.className = 'modal';
    confirmation.innerHTML = `
        <div class="modal-content booking-confirmation">
            <div class="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>Your flight with ${flight.airline} has been booked successfully.</p>
            
            <div class="booking-summary">
                <div class="summary-row">
                    <span>Flight</span>
                    <span>${flight.from} → ${flight.to}</span>
                </div>
                <div class="summary-row">
                    <span>Departure</span>
                    <span>${flight.departTime}</span>
                </div>
                <div class="summary-row">
                    <span>Class</span>
                    <span>${flight.class}</span>
                </div>
                <div class="summary-row">
                    <span>CO₂ Impact</span>
                    <span>${flight.co2}kg</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>$${flight.price}</span>
                </div>
            </div>
            
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
                A confirmation email has been sent to your inbox.
            </p>
            
            <button class="book-btn-large" onclick="closeModal()">Done</button>
        </div>
    `;
    
    document.body.appendChild(confirmation);
    setTimeout(() => confirmation.classList.add('show'), 10);
    
    // Add to search history
    userPreferences.searchHistory.push({
        flight: flight,
        date: new Date().toISOString()
    });
}

// Enhanced filter functionality
function applyFilters() {
    const maxPrice = parseInt(document.getElementById('priceRange').value);
    const directOnly = document.querySelector('input[type="checkbox"]').checked;
    
    let filtered = [...sampleFlights];
    
    // Price filter
    filtered = filtered.filter(f => f.price <= maxPrice);
    
    // Direct flights filter
    if (directOnly) {
        filtered = filtered.filter(f => f.stops === 'Direct');
    }
    
    // Apply mood filter if selected
    if (userPreferences.mood) {
        filtered = filterFlightsByMood(filtered, userPreferences.mood);
    }
    
    displayFilteredFlights(filtered);
}

function filterFlightsByMood(flights, mood) {
    switch(mood) {
        case 'eco':
            return flights.filter(f => f.ecoFriendly).sort((a, b) => a.co2 - b.co2);
        case 'budget':
            return flights.sort((a, b) => a.price - b.price);
        case 'luxury':
            return flights.filter(f => f.class === 'Business').sort((a, b) => b.price - a.price);
        case 'business':
            return flights.filter(f => f.stops === 'Direct').sort((a, b) => a.duration.localeCompare(b.duration));
        case 'adventure':
            return flights.filter(f => f.layoverActivity).sort((a, b) => b.price - a.price);
        default:
            return flights;
    }
}

function displayFilteredFlights(flights) {
    const flightsList = document.getElementById('flightsList');
    flightsList.innerHTML = '';
    
    if (flights.length === 0) {
        flightsList.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No flights match your filters. Try adjusting your criteria.</div>';
        return;
    }
    
    flights.forEach(flight => {
        const flightCard = createFlightCard(flight);
        flightsList.appendChild(flightCard);
    });
}

// Sort functionality
function sortFlights(sortBy) {
    let sorted = [...sampleFlights];
    
    switch(sortBy) {
        case 'cheapest':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'fastest':
            sorted.sort((a, b) => {
                const aDuration = parseDuration(a.duration);
                const bDuration = parseDuration(b.duration);
                return aDuration - bDuration;
            });
            break;
        case 'eco':
            sorted.sort((a, b) => a.co2 - b.co2);
            break;
        case 'best':
        default:
            // Best value: balance of price, duration, and CO2
            sorted.sort((a, b) => {
                const aScore = (a.price / 1000) + (parseDuration(a.duration) / 60) + (a.co2 / 1000);
                const bScore = (b.price / 1000) + (parseDuration(b.duration) / 60) + (b.co2 / 1000);
                return aScore - bScore;
            });
    }
    
    displayFilteredFlights(sorted);
}

function parseDuration(duration) {
    const match = duration.match(/(\d+)h\s*(\d+)m/);
    if (match) {
        return parseInt(match[1]) * 60 + parseInt(match[2]);
    }
    return 0;
}

// Autocomplete for location inputs
const airports = [
    { code: 'JFK', name: 'New York (JFK)', city: 'New York' },
    { code: 'LAX', name: 'Los Angeles (LAX)', city: 'Los Angeles' },
    { code: 'NRT', name: 'Tokyo (NRT)', city: 'Tokyo' },
    { code: 'CDG', name: 'Paris (CDG)', city: 'Paris' },
    { code: 'LHR', name: 'London (LHR)', city: 'London' },
    { code: 'DXB', name: 'Dubai (DXB)', city: 'Dubai' },
    { code: 'SIN', name: 'Singapore (SIN)', city: 'Singapore' },
    { code: 'HKG', name: 'Hong Kong (HKG)', city: 'Hong Kong' },
    { code: 'SYD', name: 'Sydney (SYD)', city: 'Sydney' },
    { code: 'BCN', name: 'Barcelona (BCN)', city: 'Barcelona' },
    { code: 'DPS', name: 'Bali (DPS)', city: 'Bali' },
    { code: 'SFO', name: 'San Francisco (SFO)', city: 'San Francisco' }
];

function setupAutocomplete() {
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    
    [fromInput, toInput].forEach(input => {
        input.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            if (value.length < 2) return;
            
            const matches = airports.filter(a => 
                a.name.toLowerCase().includes(value) || 
                a.code.toLowerCase().includes(value) ||
                a.city.toLowerCase().includes(value)
            );
            
            showAutocomplete(input, matches);
        });
    });
}

function showAutocomplete(input, matches) {
    // Remove existing autocomplete
    const existing = document.querySelector('.autocomplete-list');
    if (existing) existing.remove();
    
    if (matches.length === 0) return;
    
    const list = document.createElement('div');
    list.className = 'autocomplete-list';
    
    matches.slice(0, 5).forEach(airport => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.innerHTML = `
            <strong>${airport.code}</strong> - ${airport.city}
        `;
        item.addEventListener('click', () => {
            input.value = airport.name;
            list.remove();
        });
        list.appendChild(item);
    });
    
    input.parentElement.appendChild(list);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupAutocomplete();
    
    // Add filter listeners
    const filterChips = document.querySelectorAll('.chip');
    filterChips.forEach((chip, index) => {
        chip.addEventListener('click', () => {
            const sortTypes = ['best', 'fastest', 'cheapest', 'eco'];
            sortFlights(sortTypes[index]);
        });
    });
});

// Click outside to close autocomplete
document.addEventListener('click', (e) => {
    if (!e.target.closest('.input-group')) {
        const autocomplete = document.querySelector('.autocomplete-list');
        if (autocomplete) autocomplete.remove();
    }
});


// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (navLinks && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add loading state to search button
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        const originalContent = this.innerHTML;
        this.innerHTML = '<span class="loading"></span> Searching...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalContent;
            this.disabled = false;
        }, 1500);
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.background = type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#fff3cd';
    notification.style.color = type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#856404';
    notification.innerHTML = `
        <strong>${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</strong> ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Save search preferences
function saveSearchPreferences() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    
    if (from && to) {
        const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        searches.unshift({ from, to, date: new Date().toISOString() });
        localStorage.setItem('recentSearches', JSON.stringify(searches.slice(0, 5)));
    }
}

// Load recent searches
function loadRecentSearches() {
    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    if (searches.length > 0) {
        console.log('Recent searches:', searches);
        // Could display these in the UI
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    loadRecentSearches();
    
    // Check if coming from explore page with destination
    const destination = localStorage.getItem('searchDestination');
    if (destination) {
        document.getElementById('to').value = airports.find(a => a.code === destination)?.name || '';
        localStorage.removeItem('searchDestination');
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('from').focus();
    }
});

// Print functionality
function printTicket() {
    window.print();
}

// Share functionality
function shareTrip(tripDetails) {
    if (navigator.share) {
        navigator.share({
            title: 'My Trip',
            text: `Check out my trip: ${tripDetails}`,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        showNotification('Sharing not supported on this device', 'info');
    }
}

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log('Performance:', entry.name, entry.duration);
    }
});

if (typeof PerformanceObserver !== 'undefined') {
    perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
}

// Analytics placeholder (would integrate with real analytics)
function trackEvent(category, action, label) {
    console.log('Analytics:', { category, action, label });
    // Would send to analytics service
}

// Track search
document.querySelector('.search-btn')?.addEventListener('click', () => {
    trackEvent('Search', 'Flight Search', 'Main Search Form');
});
