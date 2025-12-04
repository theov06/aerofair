// Sample flight data - Empty by default, will be populated by search
const sampleFlights = [];

// Trending Canadian Destinations
const destinations = [
    {
        name: "Vancouver, BC",
        code: "YVR",
        image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800",
        price: 285,
        description: "Mountains meet ocean in Canada's west coast gem",
        ecoFriendly: true,
        popular: true
    },
    {
        name: "Montreal, QC",
        code: "YUL",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800",
        price: 189,
        description: "European charm with North American energy",
        ecoFriendly: true,
        popular: true
    },
    {
        name: "Calgary, AB",
        code: "YYC",
        image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800",
        price: 245,
        description: "Gateway to the Rockies and Stampede City",
        ecoFriendly: true,
        popular: true
    },
    {
        name: "Halifax, NS",
        code: "YHZ",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        price: 310,
        description: "Maritime beauty and historic waterfront",
        ecoFriendly: true,
        popular: true
    },
    {
        name: "Victoria, BC",
        code: "YYJ",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        price: 225,
        description: "British Columbia's charming capital city",
        ecoFriendly: true,
        popular: true
    },
    {
        name: "Quebec City, QC",
        code: "YQB",
        image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800",
        price: 265,
        description: "Old World charm in North America",
        ecoFriendly: true,
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
    
    // Try to initialize AirLabs API if available
    if (typeof initializeAirLabsAPI !== 'undefined') {
        const apiKey = localStorage.getItem('airlabs_api_key') || API_CONFIG?.AIRLABS_API_KEY;
        if (apiKey && apiKey !== 'YOUR_API_KEY_HERE') {
            initializeAirLabsAPI(apiKey);
            console.log('AirLabs API initialized - Live flight data available');
        } else {
            console.log('Using sample data - Set API key to use live flights');
        }
    }
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

async function performSearch() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const departure = document.getElementById('departure').value;
    const returnDate = document.getElementById('return').value;
    
    // Validation
    if (!from || !to || !departure) {
        if (typeof showToast !== 'undefined') {
            showToast('Please fill in all required fields', 'error');
        } else {
            alert('Please fill in all required fields');
        }
        return;
    }
    
    // Extract airport codes from input (e.g., "Toronto (YYZ)" -> "YYZ")
    const fromCode = extractAirportCode(from);
    const toCode = extractAirportCode(to);
    
    // Check if same airport
    if (fromCode === toCode) {
        if (typeof showToast !== 'undefined') {
            showToast('Departure and destination cannot be the same', 'error');
        } else {
            alert('Departure and destination cannot be the same');
        }
        return;
    }
    
    console.log(`Search: ${fromCode} → ${toCode}`);
    
    // Show loading
    if (typeof showLoading !== 'undefined') {
        showLoading('Searching for flights...');
    }
    
    // Try to fetch live flights if API is available
    if (typeof fetchRouteFlights !== 'undefined' && fromCode && toCode) {
        showNotification('Searching live flights...', 'info');
        try {
            const liveFlights = await fetchRouteFlights(fromCode, toCode);
            console.log('Live flights response:', liveFlights);
            
            if (liveFlights && liveFlights.length > 0) {
                // Use live data
                console.log('Using live flight data');
                console.log('First flight object:', liveFlights[0]);
                console.log('Flight properties:', {
                    airline: liveFlights[0].airline,
                    from: liveFlights[0].from,
                    to: liveFlights[0].to,
                    departTime: liveFlights[0].departTime,
                    arriveTime: liveFlights[0].arriveTime,
                    duration: liveFlights[0].duration,
                    price: liveFlights[0].price,
                    logo: liveFlights[0].logo
                });
                displayFlights(liveFlights);
                showNotification(`Found ${liveFlights.length} live flights!`, 'success');
            } else {
                // Fallback to sample data filtered by route
                console.log('No live flights, using sample data');
                const filteredSampleFlights = filterSampleFlightsByRoute(fromCode, toCode);
                displayFlights(filteredSampleFlights);
                showNotification(`Showing sample flights for ${fromCode} → ${toCode}`, 'info');
            }
        } catch (error) {
            console.error('Error fetching live flights:', error);
            // Fallback to sample data
            const filteredSampleFlights = filterSampleFlightsByRoute(fromCode, toCode);
            displayFlights(filteredSampleFlights);
            showNotification(`Showing sample flights for ${fromCode} → ${toCode}`, 'info');
        }
    } else {
        // Use sample data filtered by route
        console.log('API not available, using sample data');
        const filteredSampleFlights = filterSampleFlightsByRoute(fromCode, toCode);
        displayFlights(filteredSampleFlights);
    }
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

// Filter sample flights by route or generate route-specific flights
function filterSampleFlightsByRoute(fromCode, toCode) {
    // If no codes provided, return default sample flights
    if (!fromCode || !toCode) {
        console.log('No airport codes provided, using default sample flights');
        return sampleFlights;
    }
    
    console.log(`Filtering flights for route: ${fromCode} → ${toCode}`);
    
    // Check if we have sample flights for this exact route
    const exactMatches = sampleFlights.filter(f => f.from === fromCode && f.to === toCode);
    
    if (exactMatches.length > 0) {
        console.log(`Found ${exactMatches.length} existing sample flights for this route`);
        return exactMatches;
    }
    
    // Generate sample flights for the searched route
    console.log('Generating new sample flights for this route');
    return generateSampleFlightsForRoute(fromCode, toCode);
}

// Generate sample flights for any route
function generateSampleFlightsForRoute(fromCode, toCode) {
    console.log(`Generating flights for: ${fromCode} → ${toCode}`);
    
    const airlines = [
        { name: 'Air Canada', logo: 'airlines/Air Canada.png', amenities: ['WiFi', 'Meals', 'Entertainment'] },
        { name: 'WestJet', logo: 'airlines/Westjet.png', amenities: ['WiFi', 'Snacks', 'Entertainment'] },
        { name: 'Porter Airlines', logo: 'airlines/Porter.svg', amenities: ['WiFi', 'Complimentary Snacks', 'Beer & Wine'] },
        { name: 'Flair Airlines', logo: 'airlines/Flair Airlines.png', amenities: ['Basic Seat'] },
        { name: 'Air Transat', logo: 'airlines/Air Transat.png', amenities: ['WiFi', 'Meals', 'Entertainment'] }
    ];
    
    const flights = [];
    const basePrice = 200 + Math.random() * 200;
    console.log(`Base price: ${basePrice}`);
    
    // Generate 3-5 flights for the route
    const numFlights = 3 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < numFlights; i++) {
        const airline = airlines[Math.floor(Math.random() * airlines.length)];
        const hour = 6 + Math.floor(Math.random() * 14); // 6 AM to 8 PM
        const minute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
        const duration = 2 + Math.floor(Math.random() * 4); // 2-6 hours
        const durationMinutes = Math.floor(Math.random() * 60);
        
        const departTime = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
        const arriveHour = (hour + duration) % 24;
        const arriveMinute = (minute + durationMinutes) % 60;
        const arriveTime = `${arriveHour % 12 || 12}:${arriveMinute.toString().padStart(2, '0')} ${arriveHour >= 12 ? 'PM' : 'AM'}`;
        
        const price = Math.round(basePrice + (Math.random() * 100 - 50));
        const co2 = Math.round(300 + duration * 50 + Math.random() * 100);
        const stops = Math.random() > 0.7 ? '1 stop' : 'Direct';
        
        flights.push({
            id: i + 1,
            airline: airline.name,
            logo: airline.logo,
            from: fromCode || 'YYZ',
            to: toCode || 'YVR',
            departTime: departTime,
            arriveTime: arriveTime,
            duration: `${duration}h ${durationMinutes}m`,
            stops: stops,
            price: isNaN(price) ? 250 : price,
            co2: co2,
            priceChange: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)],
            layoverActivity: stops === '1 stop' ? 'Layover activities available' : null,
            ecoFriendly: co2 < 400,
            class: 'Economy',
            seats: 5 + Math.floor(Math.random() * 20),
            amenities: airline.amenities
        });
    }
    
    return flights.sort((a, b) => a.price - b.price);
}

function extractAirportCode(input) {
    // Extract code from format like "Toronto (YYZ)" or just "YYZ"
    const match = input.match(/\(([A-Z]{3})\)/);
    if (match) return match[1];
    
    // Check if input is already a code
    if (/^[A-Z]{3}$/.test(input.trim())) return input.trim();
    
    // Try to find matching airport
    const airport = airports.find(a => 
        a.city.toLowerCase() === input.toLowerCase() ||
        a.name.toLowerCase().includes(input.toLowerCase())
    );
    return airport ? airport.code : null;
}

function displayFlights(flights = null) {
    const resultsSection = document.getElementById('results');
    const flightsList = document.getElementById('flightsList');
    
    resultsSection.style.display = 'block';
    flightsList.innerHTML = '';
    
    // Use provided flights or fall back to sample data
    const flightsToDisplay = flights || sampleFlights;
    
    // Store for use in flight details modal
    currentDisplayedFlights = flightsToDisplay;
    
    if (flightsToDisplay.length === 0) {
        flightsList.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No flights found for this route. Try different dates or airports.</div>';
        return;
    }
    
    // Add route header if we have flights
    if (flightsToDisplay.length > 0) {
        const routeHeader = document.createElement('div');
        routeHeader.style.cssText = 'margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 10px;';
        routeHeader.innerHTML = `
            <h3 style="margin: 0 0 5px 0; color: #333;">
                ${flightsToDisplay[0].from} → ${flightsToDisplay[0].to}
            </h3>
            <p style="margin: 0; color: #666; font-size: 14px;">
                Found ${flightsToDisplay.length} flight${flightsToDisplay.length > 1 ? 's' : ''} for your search
            </p>
        `;
        flightsList.appendChild(routeHeader);
    }
    
    flightsToDisplay.forEach(flight => {
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
                <div class="airline-logo">
                    <img src="${flight.logo}" alt="${flight.airline}" style="width: 50px; height: 50px; object-fit: contain;">
                </div>
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

// Store currently displayed flights globally
let currentDisplayedFlights = [];

function showFlightDetails(flightId) {
    // Look in currently displayed flights first, then fall back to sample flights
    const flight = currentDisplayedFlights.find(f => f.id === flightId) || 
                   sampleFlights.find(f => f.id === flightId);
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
                    <div class="airline-logo">
                        <img src="${flight.logo}" alt="${flight.airline}" style="width: 80px; height: 80px; object-fit: contain;">
                    </div>
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

function bookFlightSimple(flightId) {
    const flight = currentDisplayedFlights.find(f => f.id === flightId) || 
                   sampleFlights.find(f => f.id === flightId);
    if (!flight) return;
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
    
    // Set departure date
    departureDate = nextWeek.toISOString().split('T')[0];
    document.getElementById('departure').value = nextWeek.toLocaleDateString('en-US', { 
        weekday: 'short',
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    // Set return date
    returnDate = twoWeeks.toISOString().split('T')[0];
    document.getElementById('return').value = twoWeeks.toLocaleDateString('en-US', { 
        weekday: 'short',
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
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
    const flight = currentDisplayedFlights.find(f => f.id === flightId) || 
                   sampleFlights.find(f => f.id === flightId);
    if (!flight) return;
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

// Autocomplete for location inputs - All Canadian Airports
const airports = [
    // Ontario
    { code: 'YYZ', name: 'Toronto Pearson (YYZ)', city: 'Toronto', province: 'ON' },
    { code: 'YTZ', name: 'Billy Bishop Toronto City (YTZ)', city: 'Toronto', province: 'ON' },
    { code: 'YOW', name: 'Ottawa Macdonald-Cartier (YOW)', city: 'Ottawa', province: 'ON' },
    { code: 'YHM', name: 'John C. Munro Hamilton (YHM)', city: 'Hamilton', province: 'ON' },
    { code: 'YXU', name: 'London International (YXU)', city: 'London', province: 'ON' },
    { code: 'YKF', name: 'Region of Waterloo (YKF)', city: 'Kitchener', province: 'ON' },
    { code: 'YQG', name: 'Windsor International (YQG)', city: 'Windsor', province: 'ON' },
    { code: 'YSB', name: 'Sudbury (YSB)', city: 'Sudbury', province: 'ON' },
    { code: 'YTS', name: 'Timmins Victor M. Power (YTS)', city: 'Timmins', province: 'ON' },
    { code: 'YQT', name: 'Thunder Bay (YQT)', city: 'Thunder Bay', province: 'ON' },
    { code: 'YOO', name: 'Oshawa Executive (YOO)', city: 'Oshawa', province: 'ON' },
    { code: 'YZR', name: 'Sarnia Chris Hadfield (YZR)', city: 'Sarnia', province: 'ON' },
    { code: 'YPQ', name: 'Peterborough (YPQ)', city: 'Peterborough', province: 'ON' },
    { code: 'YNO', name: 'North Bay Jack Garland (YNO)', city: 'North Bay', province: 'ON' },
    { code: 'YSS', name: 'Sault Ste. Marie (YSS)', city: 'Sault Ste. Marie', province: 'ON' },
    
    // Quebec
    { code: 'YUL', name: 'Montreal-Trudeau (YUL)', city: 'Montreal', province: 'QC' },
    { code: 'YQB', name: 'Quebec City Jean Lesage (YQB)', city: 'Quebec City', province: 'QC' },
    { code: 'YHU', name: 'Montreal Saint-Hubert (YHU)', city: 'Montreal', province: 'QC' },
    { code: 'YMX', name: 'Montreal-Mirabel (YMX)', city: 'Montreal', province: 'QC' },
    { code: 'YQY', name: 'Sydney J.A. Douglas McCurdy (YQY)', city: 'Sydney', province: 'NS' },
    { code: 'YVO', name: 'Val-d\'Or (YVO)', city: 'Val-d\'Or', province: 'QC' },
    { code: 'YBG', name: 'Bagotville (YBG)', city: 'Saguenay', province: 'QC' },
    { code: 'YRJ', name: 'Roberval (YRJ)', city: 'Roberval', province: 'QC' },
    { code: 'YGP', name: 'Gaspé (YGP)', city: 'Gaspé', province: 'QC' },
    { code: 'YIF', name: 'Pakuashipi (YIF)', city: 'St-Augustin', province: 'QC' },
    { code: 'YMT', name: 'Chibougamau/Chapais (YMT)', city: 'Chibougamau', province: 'QC' },
    { code: 'YGL', name: 'La Grande Rivière (YGL)', city: 'Radisson', province: 'QC' },
    
    // British Columbia
    { code: 'YVR', name: 'Vancouver International (YVR)', city: 'Vancouver', province: 'BC' },
    { code: 'YYJ', name: 'Victoria International (YYJ)', city: 'Victoria', province: 'BC' },
    { code: 'YLW', name: 'Kelowna International (YLW)', city: 'Kelowna', province: 'BC' },
    { code: 'YXX', name: 'Abbotsford International (YXX)', city: 'Abbotsford', province: 'BC' },
    { code: 'YKA', name: 'Kamloops (YKA)', city: 'Kamloops', province: 'BC' },
    { code: 'YXS', name: 'Prince George (YXS)', city: 'Prince George', province: 'BC' },
    { code: 'YCD', name: 'Nanaimo (YCD)', city: 'Nanaimo', province: 'BC' },
    { code: 'YQQ', name: 'Comox Valley (YQQ)', city: 'Comox', province: 'BC' },
    { code: 'YPR', name: 'Prince Rupert (YPR)', city: 'Prince Rupert', province: 'BC' },
    { code: 'YXT', name: 'Terrace-Kitimat (YXT)', city: 'Terrace', province: 'BC' },
    { code: 'YWL', name: 'Williams Lake (YWL)', city: 'Williams Lake', province: 'BC' },
    { code: 'YYD', name: 'Smithers (YYD)', city: 'Smithers', province: 'BC' },
    { code: 'YXC', name: 'Cranbrook (YXC)', city: 'Cranbrook', province: 'BC' },
    { code: 'YCG', name: 'Castlegar (YCG)', city: 'Castlegar', province: 'BC' },
    { code: 'YDQ', name: 'Dawson Creek (YDQ)', city: 'Dawson Creek', province: 'BC' },
    { code: 'YXJ', name: 'Fort St. John (YXJ)', city: 'Fort St. John', province: 'BC' },
    
    // Alberta
    { code: 'YYC', name: 'Calgary International (YYC)', city: 'Calgary', province: 'AB' },
    { code: 'YEG', name: 'Edmonton International (YEG)', city: 'Edmonton', province: 'AB' },
    { code: 'YMM', name: 'Fort McMurray (YMM)', city: 'Fort McMurray', province: 'AB' },
    { code: 'YQL', name: 'Lethbridge (YQL)', city: 'Lethbridge', province: 'AB' },
    { code: 'YXH', name: 'Medicine Hat (YXH)', city: 'Medicine Hat', province: 'AB' },
    { code: 'YZH', name: 'Slave Lake (YZH)', city: 'Slave Lake', province: 'AB' },
    { code: 'YGP', name: 'Grande Prairie (YGP)', city: 'Grande Prairie', province: 'AB' },
    { code: 'YLJ', name: 'Meadow Lake (YLJ)', city: 'Meadow Lake', province: 'SK' },
    
    // Saskatchewan
    { code: 'YXE', name: 'Saskatoon John G. Diefenbaker (YXE)', city: 'Saskatoon', province: 'SK' },
    { code: 'YQR', name: 'Regina International (YQR)', city: 'Regina', province: 'SK' },
    { code: 'YPA', name: 'Prince Albert Glass Field (YPA)', city: 'Prince Albert', province: 'SK' },
    { code: 'YQU', name: 'Grande Prairie (YQU)', city: 'Grande Prairie', province: 'AB' },
    { code: 'YQV', name: 'Yorkton (YQV)', city: 'Yorkton', province: 'SK' },
    { code: 'YXL', name: 'Sioux Lookout (YXL)', city: 'Sioux Lookout', province: 'ON' },
    
    // Manitoba
    { code: 'YWG', name: 'Winnipeg Richardson (YWG)', city: 'Winnipeg', province: 'MB' },
    { code: 'YBR', name: 'Brandon Municipal (YBR)', city: 'Brandon', province: 'MB' },
    { code: 'YTH', name: 'Thompson (YTH)', city: 'Thompson', province: 'MB' },
    { code: 'YQD', name: 'The Pas (YQD)', city: 'The Pas', province: 'MB' },
    { code: 'YRT', name: 'Rankin Inlet (YRT)', city: 'Rankin Inlet', province: 'NU' },
    
    // Nova Scotia
    { code: 'YHZ', name: 'Halifax Stanfield (YHZ)', city: 'Halifax', province: 'NS' },
    { code: 'YQI', name: 'Yarmouth (YQI)', city: 'Yarmouth', province: 'NS' },
    { code: 'YAW', name: 'Shearwater (YAW)', city: 'Shearwater', province: 'NS' },
    
    // New Brunswick
    { code: 'YFC', name: 'Fredericton International (YFC)', city: 'Fredericton', province: 'NB' },
    { code: 'YSJ', name: 'Saint John (YSJ)', city: 'Saint John', province: 'NB' },
    { code: 'YQM', name: 'Greater Moncton Roméo LeBlanc (YQM)', city: 'Moncton', province: 'NB' },
    { code: 'YCL', name: 'Charlo (YCL)', city: 'Charlo', province: 'NB' },
    { code: 'YBG', name: 'Bagotville (YBG)', city: 'Bagotville', province: 'QC' },
    
    // Prince Edward Island
    { code: 'YYG', name: 'Charlottetown (YYG)', city: 'Charlottetown', province: 'PE' },
    
    // Newfoundland and Labrador
    { code: 'YYT', name: 'St. John\'s International (YYT)', city: 'St. John\'s', province: 'NL' },
    { code: 'YDF', name: 'Deer Lake Regional (YDF)', city: 'Deer Lake', province: 'NL' },
    { code: 'YQX', name: 'Gander International (YQX)', city: 'Gander', province: 'NL' },
    { code: 'YYR', name: 'Goose Bay (YYR)', city: 'Happy Valley-Goose Bay', province: 'NL' },
    { code: 'YAY', name: 'St. Anthony (YAY)', city: 'St. Anthony', province: 'NL' },
    { code: 'YHA', name: 'Port Hope Simpson (YHA)', city: 'Port Hope Simpson', province: 'NL' },
    
    // Yukon
    { code: 'YXY', name: 'Whitehorse International (YXY)', city: 'Whitehorse', province: 'YT' },
    { code: 'YDA', name: 'Dawson City (YDA)', city: 'Dawson City', province: 'YT' },
    { code: 'YOJ', name: 'High Level (YOJ)', city: 'High Level', province: 'AB' },
    
    // Northwest Territories
    { code: 'YZF', name: 'Yellowknife (YZF)', city: 'Yellowknife', province: 'NT' },
    { code: 'YHY', name: 'Hay River (YHY)', city: 'Hay River', province: 'NT' },
    { code: 'YFB', name: 'Iqaluit (YFB)', city: 'Iqaluit', province: 'NU' },
    { code: 'YEV', name: 'Inuvik Mike Zubko (YEV)', city: 'Inuvik', province: 'NT' },
    { code: 'YFS', name: 'Fort Simpson (YFS)', city: 'Fort Simpson', province: 'NT' },
    
    // Nunavut
    { code: 'YFB', name: 'Iqaluit (YFB)', city: 'Iqaluit', province: 'NU' },
    { code: 'YRT', name: 'Rankin Inlet (YRT)', city: 'Rankin Inlet', province: 'NU' },
    { code: 'YCB', name: 'Cambridge Bay (YCB)', city: 'Cambridge Bay', province: 'NU' },
    { code: 'YTE', name: 'Cape Dorset (YTE)', city: 'Cape Dorset', province: 'NU' },
    { code: 'YGZ', name: 'Grise Fiord (YGZ)', city: 'Grise Fiord', province: 'NU' }
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


// Calendar functionality
let currentCalendarDate = new Date();
let selectedDate = null;
let currentDateField = null;
let departureDate = null;
let returnDate = null;

// Sample price data for calendar (would come from API in production)
const flightPrices = {};

function generatePrices() {
    const today = new Date();
    for (let i = 0; i < 90; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Generate random prices with some pattern
        const basePrice = 200;
        const dayOfWeek = date.getDay();
        const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.3 : 1;
        const randomVariation = Math.random() * 100;
        
        flightPrices[dateStr] = Math.round((basePrice + randomVariation) * weekendMultiplier);
    }
}

function openCalendar(field) {
    currentDateField = field;
    const modal = document.getElementById('calendarModal');
    modal.style.display = 'flex';
    
    // Set current month to show
    if (field === 'return' && departureDate) {
        currentCalendarDate = new Date(departureDate);
    } else {
        currentCalendarDate = new Date();
    }
    
    renderCalendar();
}

function closeCalendar() {
    const modal = document.getElementById('calendarModal');
    modal.style.display = 'none';
}

function changeMonth(direction) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
    renderCalendar();
}

function renderCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Update header
    document.getElementById('calendarMonth').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarDays.appendChild(emptyDay);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split('T')[0];
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Check if date is in the past
        if (date < today) {
            dayElement.classList.add('disabled');
        }
        
        // Check if it's today
        if (date.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        // Check if date is selected
        if (currentDateField === 'departure' && departureDate && dateStr === departureDate) {
            dayElement.classList.add('selected');
        } else if (currentDateField === 'return' && returnDate && dateStr === returnDate) {
            dayElement.classList.add('selected');
        }
        
        // Check if date is in range (for return date selection)
        if (currentDateField === 'return' && departureDate) {
            const depDate = new Date(departureDate);
            if (date > depDate && returnDate) {
                const retDate = new Date(returnDate);
                if (date >= depDate && date <= retDate) {
                    dayElement.classList.add('in-range');
                }
            }
            
            // Disable dates before departure
            if (date <= depDate) {
                dayElement.classList.add('disabled');
            }
        }
        
        // Add price indicator
        const price = flightPrices[dateStr];
        if (price && date >= today) {
            const priceElement = document.createElement('div');
            priceElement.className = 'calendar-day-price';
            priceElement.textContent = `$${price}`;
            
            // Color code by price
            if (price < 250) {
                dayElement.classList.add('cheap');
            } else if (price < 300) {
                dayElement.classList.add('moderate');
            } else {
                dayElement.classList.add('expensive');
            }
            
            dayElement.appendChild(document.createTextNode(day));
            dayElement.appendChild(priceElement);
        } else {
            dayElement.textContent = day;
        }
        
        // Add click handler
        if (!dayElement.classList.contains('disabled')) {
            dayElement.onclick = () => selectDate(dateStr, dayElement);
        }
        
        calendarDays.appendChild(dayElement);
    }
}

function selectDate(dateStr, element) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    // Add selection to clicked day
    element.classList.add('selected');
    selectedDate = dateStr;
}

function confirmDate() {
    if (!selectedDate) {
        alert('Please select a date');
        return;
    }
    
    const date = new Date(selectedDate);
    const formattedDate = date.toLocaleDateString('en-US', { 
        weekday: 'short',
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    if (currentDateField === 'departure') {
        departureDate = selectedDate;
        document.getElementById('departure').value = formattedDate;
        
        // Clear return date if it's before new departure date
        if (returnDate && new Date(returnDate) <= date) {
            returnDate = null;
            document.getElementById('return').value = '';
        }
    } else if (currentDateField === 'return') {
        returnDate = selectedDate;
        document.getElementById('return').value = formattedDate;
    }
    
    closeCalendar();
    selectedDate = null;
}

// Close calendar when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('calendarModal');
    if (modal && e.target === modal) {
        closeCalendar();
    }
});

// Initialize prices on page load
if (Object.keys(flightPrices).length === 0) {
    generatePrices();
}
