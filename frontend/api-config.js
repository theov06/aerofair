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
        // Ontario
        'YYZ': { name: 'Toronto Pearson', city: 'Toronto', province: 'ON' },
        'YTZ': { name: 'Billy Bishop Toronto City', city: 'Toronto', province: 'ON' },
        'YOW': { name: 'Ottawa Macdonald-Cartier', city: 'Ottawa', province: 'ON' },
        'YHM': { name: 'John C. Munro Hamilton', city: 'Hamilton', province: 'ON' },
        'YXU': { name: 'London International', city: 'London', province: 'ON' },
        'YKF': { name: 'Region of Waterloo', city: 'Kitchener', province: 'ON' },
        'YQG': { name: 'Windsor International', city: 'Windsor', province: 'ON' },
        'YSB': { name: 'Sudbury', city: 'Sudbury', province: 'ON' },
        'YTS': { name: 'Timmins Victor M. Power', city: 'Timmins', province: 'ON' },
        'YQT': { name: 'Thunder Bay', city: 'Thunder Bay', province: 'ON' },
        'YOO': { name: 'Oshawa Executive', city: 'Oshawa', province: 'ON' },
        'YZR': { name: 'Sarnia Chris Hadfield', city: 'Sarnia', province: 'ON' },
        'YPQ': { name: 'Peterborough', city: 'Peterborough', province: 'ON' },
        'YNO': { name: 'North Bay Jack Garland', city: 'North Bay', province: 'ON' },
        'YSS': { name: 'Sault Ste. Marie', city: 'Sault Ste. Marie', province: 'ON' },
        'YXL': { name: 'Sioux Lookout', city: 'Sioux Lookout', province: 'ON' },
        
        // Quebec
        'YUL': { name: 'Montreal-Trudeau', city: 'Montreal', province: 'QC' },
        'YQB': { name: 'Quebec City Jean Lesage', city: 'Quebec City', province: 'QC' },
        'YHU': { name: 'Montreal Saint-Hubert', city: 'Montreal', province: 'QC' },
        'YMX': { name: 'Montreal-Mirabel', city: 'Montreal', province: 'QC' },
        'YVO': { name: 'Val-d\'Or', city: 'Val-d\'Or', province: 'QC' },
        'YBG': { name: 'Bagotville', city: 'Saguenay', province: 'QC' },
        'YRJ': { name: 'Roberval', city: 'Roberval', province: 'QC' },
        'YGP': { name: 'Gaspé', city: 'Gaspé', province: 'QC' },
        'YIF': { name: 'Pakuashipi', city: 'St-Augustin', province: 'QC' },
        'YMT': { name: 'Chibougamau/Chapais', city: 'Chibougamau', province: 'QC' },
        'YGL': { name: 'La Grande Rivière', city: 'Radisson', province: 'QC' },
        
        // British Columbia
        'YVR': { name: 'Vancouver International', city: 'Vancouver', province: 'BC' },
        'YYJ': { name: 'Victoria International', city: 'Victoria', province: 'BC' },
        'YLW': { name: 'Kelowna International', city: 'Kelowna', province: 'BC' },
        'YXX': { name: 'Abbotsford International', city: 'Abbotsford', province: 'BC' },
        'YKA': { name: 'Kamloops', city: 'Kamloops', province: 'BC' },
        'YXS': { name: 'Prince George', city: 'Prince George', province: 'BC' },
        'YCD': { name: 'Nanaimo', city: 'Nanaimo', province: 'BC' },
        'YQQ': { name: 'Comox Valley', city: 'Comox', province: 'BC' },
        'YPR': { name: 'Prince Rupert', city: 'Prince Rupert', province: 'BC' },
        'YXT': { name: 'Terrace-Kitimat', city: 'Terrace', province: 'BC' },
        'YWL': { name: 'Williams Lake', city: 'Williams Lake', province: 'BC' },
        'YYD': { name: 'Smithers', city: 'Smithers', province: 'BC' },
        'YXC': { name: 'Cranbrook', city: 'Cranbrook', province: 'BC' },
        'YCG': { name: 'Castlegar', city: 'Castlegar', province: 'BC' },
        'YDQ': { name: 'Dawson Creek', city: 'Dawson Creek', province: 'BC' },
        'YXJ': { name: 'Fort St. John', city: 'Fort St. John', province: 'BC' },
        
        // Alberta
        'YYC': { name: 'Calgary International', city: 'Calgary', province: 'AB' },
        'YEG': { name: 'Edmonton International', city: 'Edmonton', province: 'AB' },
        'YMM': { name: 'Fort McMurray', city: 'Fort McMurray', province: 'AB' },
        'YQL': { name: 'Lethbridge', city: 'Lethbridge', province: 'AB' },
        'YXH': { name: 'Medicine Hat', city: 'Medicine Hat', province: 'AB' },
        'YZH': { name: 'Slave Lake', city: 'Slave Lake', province: 'AB' },
        'YQU': { name: 'Grande Prairie', city: 'Grande Prairie', province: 'AB' },
        'YOJ': { name: 'High Level', city: 'High Level', province: 'AB' },
        
        // Saskatchewan
        'YXE': { name: 'Saskatoon John G. Diefenbaker', city: 'Saskatoon', province: 'SK' },
        'YQR': { name: 'Regina International', city: 'Regina', province: 'SK' },
        'YPA': { name: 'Prince Albert Glass Field', city: 'Prince Albert', province: 'SK' },
        'YQV': { name: 'Yorkton', city: 'Yorkton', province: 'SK' },
        'YLJ': { name: 'Meadow Lake', city: 'Meadow Lake', province: 'SK' },
        
        // Manitoba
        'YWG': { name: 'Winnipeg Richardson', city: 'Winnipeg', province: 'MB' },
        'YBR': { name: 'Brandon Municipal', city: 'Brandon', province: 'MB' },
        'YTH': { name: 'Thompson', city: 'Thompson', province: 'MB' },
        'YQD': { name: 'The Pas', city: 'The Pas', province: 'MB' },
        
        // Nova Scotia
        'YHZ': { name: 'Halifax Stanfield', city: 'Halifax', province: 'NS' },
        'YQY': { name: 'Sydney J.A. Douglas McCurdy', city: 'Sydney', province: 'NS' },
        'YQI': { name: 'Yarmouth', city: 'Yarmouth', province: 'NS' },
        'YAW': { name: 'Shearwater', city: 'Shearwater', province: 'NS' },
        
        // New Brunswick
        'YFC': { name: 'Fredericton International', city: 'Fredericton', province: 'NB' },
        'YSJ': { name: 'Saint John', city: 'Saint John', province: 'NB' },
        'YQM': { name: 'Greater Moncton Roméo LeBlanc', city: 'Moncton', province: 'NB' },
        'YCL': { name: 'Charlo', city: 'Charlo', province: 'NB' },
        
        // Prince Edward Island
        'YYG': { name: 'Charlottetown', city: 'Charlottetown', province: 'PE' },
        
        // Newfoundland and Labrador
        'YYT': { name: 'St. John\'s International', city: 'St. John\'s', province: 'NL' },
        'YDF': { name: 'Deer Lake Regional', city: 'Deer Lake', province: 'NL' },
        'YQX': { name: 'Gander International', city: 'Gander', province: 'NL' },
        'YYR': { name: 'Goose Bay', city: 'Happy Valley-Goose Bay', province: 'NL' },
        'YAY': { name: 'St. Anthony', city: 'St. Anthony', province: 'NL' },
        'YHA': { name: 'Port Hope Simpson', city: 'Port Hope Simpson', province: 'NL' },
        
        // Yukon
        'YXY': { name: 'Whitehorse International', city: 'Whitehorse', province: 'YT' },
        'YDA': { name: 'Dawson City', city: 'Dawson City', province: 'YT' },
        
        // Northwest Territories
        'YZF': { name: 'Yellowknife', city: 'Yellowknife', province: 'NT' },
        'YHY': { name: 'Hay River', city: 'Hay River', province: 'NT' },
        'YEV': { name: 'Inuvik Mike Zubko', city: 'Inuvik', province: 'NT' },
        'YFS': { name: 'Fort Simpson', city: 'Fort Simpson', province: 'NT' },
        
        // Nunavut
        'YFB': { name: 'Iqaluit', city: 'Iqaluit', province: 'NU' },
        'YRT': { name: 'Rankin Inlet', city: 'Rankin Inlet', province: 'NU' },
        'YCB': { name: 'Cambridge Bay', city: 'Cambridge Bay', province: 'NU' },
        'YTE': { name: 'Cape Dorset', city: 'Cape Dorset', province: 'NU' },
        'YGZ': { name: 'Grise Fiord', city: 'Grise Fiord', province: 'NU' }
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
