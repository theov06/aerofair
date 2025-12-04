// AirLabs API Configuration for Canadian Flights
const API_CONFIG = {
    AIRLABS_API_KEY: 'YOUR_API_KEY_HERE', // Replace with your actual API key
    AIRLABS_BASE_URL: 'https://airlabs.co/api/v9',
    CANADIAN_AIRLINES: {
        'AC': { name: 'Air Canada', logo: '🍁', iata: 'AC', icao: 'ACA' },
        'WS': { name: 'WestJet', logo: '🛫', iata: 'WS', icao: 'WJA' },
        'PD': { name: 'Porter Airlines', logo: '✈️', iata: 'PD', icao: 'POE' },
        'F8': { name: 'Flair Airlines', logo: '💰', iata: 'F8', icao: 'FLE' },
        'TS': { name: 'Air Transat', logo: '🌴', iata: 'TS', icao: 'TSC' }
    },
    CANADIAN_AIRPORTS: {
        'YYZ': { name: 'Toronto Pearson', city: 'Toronto', province: 'ON' },
        'YVR': { name: 'Vancouver International', city: 'Vancouver', province: 'BC' },
        'YUL': { name: 'Montreal-Trudeau', city: 'Montreal', province: 'QC' },
        'YYC': { name: 'Calgary International', city: 'Calgary', province: 'AB' },
        'YOW': { name: 'Ottawa International', city: 'Ottawa', province: 'ON' },
        'YEG': { name: 'Edmonton International', city: 'Edmonton', province: 'AB' },
        'YHZ': { name: 'Halifax Stanfield', city: 'Halifax', province: 'NS' },
        'YWG': { name: 'Winnipeg Richardson', city: 'Winnipeg', province: 'MB' },
        'YQB': { name: 'Quebec City Jean Lesage', city: 'Quebec City', province: 'QC' },
        'YYJ': { name: 'Victoria International', city: 'Victoria', province: 'BC' },
        'YXE': { name: 'Saskatoon John G. Diefenbaker', city: 'Saskatoon', province: 'SK' },
        'YQR': { name: 'Regina International', city: 'Regina', province: 'SK' },
        'YYT': { name: 'St. John\'s International', city: 'St. John\'s', province: 'NL' }
    }
};

// API Service Class
class AirLabsService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = API_CONFIG.AIRLABS_BASE_URL;
    }

    // Fetch flights by airline (Canadian airlines)
    async getFlightsByAirline(airlineIATA) {
        try {
            const response = await fetch(
                `${this.baseUrl}/flights?airline_iata=${airlineIATA}&api_key=${this.apiKey}`
            );
            const data = await response.json();
            return this.filterCanadianDomestic(data.response);
        } catch (error) {
            console.error('Error fetching flights:', error);
            return [];
        }
    }

    // Fetch flights between specific airports
    async getFlightsByRoute(depIATA, arrIATA) {
        try {
            const response = await fetch(
                `${this.baseUrl}/flights?dep_iata=${depIATA}&arr_iata=${arrIATA}&api_key=${this.apiKey}`
            );
            const data = await response.json();
            return data.response || [];
        } catch (error) {
            console.error('Error fetching route flights:', error);
            return [];
        }
    }

    // Fetch schedules (for future flights)
    async getSchedules(depIATA, arrIATA) {
        try {
            const response = await fetch(
                `${this.baseUrl}/schedules?dep_iata=${depIATA}&arr_iata=${arrIATA}&api_key=${this.apiKey}`
            );
            const data = await response.json();
            return data.response || [];
        } catch (error) {
            console.error('Error fetching schedules:', error);
            return [];
        }
    }

    // Filter for Canadian domestic flights only
    filterCanadianDomestic(flights) {
        if (!flights) return [];
        
        return flights.filter(flight => {
            const depIATA = flight.dep_iata;
            const arrIATA = flight.arr_iata;
            
            // Check if both departure and arrival are Canadian airports
            return (
                depIATA && arrIATA &&
                API_CONFIG.CANADIAN_AIRPORTS[depIATA] &&
                API_CONFIG.CANADIAN_AIRPORTS[arrIATA]
            );
        });
    }

    // Convert API flight data to our app format
    convertToAppFormat(apiFlights) {
        return apiFlights.map((flight, index) => {
            const airline = API_CONFIG.CANADIAN_AIRLINES[flight.airline_iata] || {
                name: flight.airline_iata,
                logo: '✈️'
            };

            const depTime = new Date(flight.dep_time);
            const arrTime = new Date(flight.arr_time);
            const duration = flight.duration || this.calculateDuration(depTime, arrTime);

            // Calculate CO2 based on distance (rough estimate)
            const co2 = this.estimateCO2(flight.dep_iata, flight.arr_iata, duration);

            return {
                id: index + 1,
                airline: airline.name,
                logo: airline.logo,
                from: flight.dep_iata,
                to: flight.arr_iata,
                departTime: this.formatTime(depTime),
                arriveTime: this.formatTime(arrTime),
                duration: this.formatDuration(duration),
                stops: flight.dep_iata === flight.arr_iata ? '1 stop' : 'Direct',
                price: this.estimatePrice(flight.dep_iata, flight.arr_iata, duration),
                co2: co2,
                priceChange: this.randomPriceChange(),
                layoverActivity: null,
                ecoFriendly: co2 < 400,
                class: 'Economy',
                seats: Math.floor(Math.random() * 20) + 5,
                amenities: this.getAmenities(airline.name),
                flightNumber: flight.flight_iata,
                status: flight.status,
                delayed: flight.delayed
            };
        });
    }

    // Helper functions
    calculateDuration(depTime, arrTime) {
        return Math.floor((arrTime - depTime) / 60000); // minutes
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    }

    formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

    estimateCO2(depIATA, arrIATA, duration) {
        // Rough estimate: ~0.115 kg CO2 per km per passenger
        // Average speed: 800 km/h
        const distance = (duration / 60) * 800;
        return Math.round(distance * 0.115);
    }

    estimatePrice(depIATA, arrIATA, duration) {
        // Base price calculation
        const basePrice = 100;
        const perMinute = 0.5;
        const price = basePrice + (duration * perMinute);
        
        // Add randomness
        const variance = price * 0.2;
        return Math.round(price + (Math.random() * variance - variance / 2));
    }

    randomPriceChange() {
        const changes = ['up', 'down', 'stable'];
        return changes[Math.floor(Math.random() * changes.length)];
    }

    getAmenities(airlineName) {
        const amenitiesMap = {
            'Air Canada': ['WiFi', 'Meals', 'Entertainment', 'USB Power'],
            'WestJet': ['WiFi', 'Snacks', 'Entertainment'],
            'Porter Airlines': ['WiFi', 'Complimentary Snacks', 'Beer & Wine'],
            'Flair Airlines': ['Basic Seat'],
            'Air Transat': ['WiFi', 'Meals', 'Entertainment']
        };
        return amenitiesMap[airlineName] || ['WiFi', 'Snacks'];
    }
}

// Initialize service
let airLabsService = null;

function initializeAirLabsAPI(apiKey) {
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        console.warn('AirLabs API key not configured. Using sample data.');
        return null;
    }
    airLabsService = new AirLabsService(apiKey);
    return airLabsService;
}

// Fetch live Canadian flights
async function fetchLiveCanadianFlights() {
    if (!airLabsService) {
        console.log('Using sample data - API not configured');
        return null;
    }

    try {
        // Fetch flights from major Canadian airlines
        const airlines = ['AC', 'WS', 'PD', 'F8'];
        const allFlights = [];

        for (const airline of airlines) {
            const flights = await airLabsService.getFlightsByAirline(airline);
            allFlights.push(...flights);
        }

        // Convert to app format
        return airLabsService.convertToAppFormat(allFlights);
    } catch (error) {
        console.error('Error fetching live flights:', error);
        return null;
    }
}

// Fetch flights for specific route
async function fetchRouteFlights(from, to) {
    if (!airLabsService) {
        console.log('Using sample data - API not configured');
        return null;
    }

    try {
        const flights = await airLabsService.getFlightsByRoute(from, to);
        return airLabsService.convertToAppFormat(flights);
    } catch (error) {
        console.error('Error fetching route flights:', error);
        return null;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API_CONFIG,
        AirLabsService,
        initializeAirLabsAPI,
        fetchLiveCanadianFlights,
        fetchRouteFlights
    };
}
