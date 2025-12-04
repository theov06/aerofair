const allDestinations = [
    {
        name: "Vancouver, BC",
        code: "YVR",
        image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800",
        price: 285,
        description: "Mountains meet ocean in Canada's west coast gem",
        category: ["city", "adventure", "eco"],
        ecoFriendly: true,
        rating: 4.9,
        activities: ["Stanley Park", "Grouse Mountain", "Granville Island", "Skiing"]
    },
    {
        name: "Montreal, QC",
        code: "YUL",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800",
        price: 189,
        description: "European charm with French-Canadian culture",
        category: ["city", "culture"],
        ecoFriendly: true,
        rating: 4.8,
        activities: ["Old Montreal", "Mont Royal", "Poutine", "Festivals"]
    },
    {
        name: "Calgary, AB",
        code: "YYC",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800",
        price: 245,
        description: "Gateway to the Rockies and Stampede City",
        category: ["city", "adventure"],
        ecoFriendly: true,
        rating: 4.7,
        activities: ["Calgary Stampede", "Heritage Park", "Banff Day Trips", "Alberta Beef"]
    },
    {
        name: "Halifax, NS",
        code: "YHZ",
        image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800",
        price: 295,
        description: "Maritime charm on the Atlantic coast",
        category: ["city", "culture", "beach"],
        ecoFriendly: true,
        rating: 4.6,
        activities: ["Waterfront Boardwalk", "Peggy's Cove", "Seafood", "Citadel Hill"]
    },
    {
        name: "Ottawa, ON",
        code: "YOW",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800",
        price: 159,
        description: "Canada's capital with stunning Parliament buildings",
        category: ["city", "culture"],
        ecoFriendly: true,
        rating: 4.5,
        activities: ["Parliament Hill", "Rideau Canal", "Museums", "ByWard Market"]
    },
    {
        name: "Victoria, BC",
        code: "YYJ",
        image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800",
        price: 225,
        description: "British Columbia's charming capital city",
        category: ["city", "culture", "beach"],
        ecoFriendly: true,
        rating: 4.7,
        activities: ["Butchart Gardens", "Inner Harbour", "Whale Watching", "Tea Time"]
    },
    {
        name: "Edmonton, AB",
        code: "YEG",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800",
        price: 265,
        description: "Festival city with vibrant arts scene",
        category: ["city", "culture"],
        ecoFriendly: true,
        rating: 4.5,
        activities: ["West Edmonton Mall", "River Valley", "Festivals", "Northern Lights"]
    },
    {
        name: "Winnipeg, MB",
        code: "YWG",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800",
        price: 235,
        description: "Cultural crossroads of Canada",
        category: ["city", "culture"],
        ecoFriendly: true,
        rating: 4.4,
        activities: ["The Forks", "Canadian Museum for Human Rights", "Exchange District", "BeaverTails"]
    },
    {
        name: "Quebec City, QC",
        code: "YQB",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800",
        price: 215,
        description: "Old World charm in North America",
        category: ["city", "culture"],
        ecoFriendly: true,
        rating: 4.9,
        activities: ["Old Quebec", "Château Frontenac", "Winter Carnival", "French Cuisine"]
    },
    {
        name: "St. John's, NL",
        code: "YYT",
        image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800",
        price: 345,
        description: "Colorful houses and Atlantic hospitality",
        category: ["city", "culture", "beach"],
        ecoFriendly: true,
        rating: 4.6,
        activities: ["Signal Hill", "Jellybean Row", "Icebergs", "George Street"]
    },
    {
        name: "Saskatoon, SK",
        code: "YXE",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800",
        price: 255,
        description: "Paris of the Prairies with scenic river valley",
        category: ["city", "culture"],
        ecoFriendly: true,
        rating: 4.5,
        activities: ["Meewasin Valley", "Remai Modern", "Farmers Markets", "River Landing"]
    },
    {
        name: "Regina, SK",
        code: "YQR",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800",
        price: 245,
        description: "Saskatchewan's capital with prairie charm",
        category: ["city", "culture"],
        ecoFriendly: true,
        rating: 4.4,
        activities: ["Wascana Centre", "RCMP Heritage Centre", "Legislative Building", "Cathedral Village"]
    }
];

let currentFilter = 'all';

function loadDestinations() {
    const grid = document.getElementById('destinationsGrid');
    const filtered = currentFilter === 'all' 
        ? allDestinations 
        : allDestinations.filter(d => d.category.includes(currentFilter));
    
    grid.innerHTML = '';
    
    filtered.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'destination-card';
        card.style.backgroundImage = `url('${dest.image}')`;
        card.style.cursor = 'pointer';
        card.onclick = () => showDestinationDetails(dest);
        
        card.innerHTML = `
            <div class="destination-overlay">
                <h3>${dest.name}</h3>
                <p>From $${dest.price}</p>
                <div style="display: flex; gap: 5px; margin-top: 10px; flex-wrap: wrap;">
                    ${dest.ecoFriendly ? '<span class="eco-badge">🌱 Eco-Friendly</span>' : ''}
                    <span style="background: rgba(255,255,255,0.3); padding: 5px 10px; border-radius: 15px; font-size: 12px;">
                        ⭐ ${dest.rating}
                    </span>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function filterDestinations(category) {
    currentFilter = category;
    
    // Update active chip
    document.querySelectorAll('.explore-filters .chip').forEach(chip => {
        chip.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadDestinations();
}

function showDestinationDetails(dest) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <span class="modal-close" onclick="closeModal()">&times;</span>
            
            <div style="width: 100%; height: 300px; background-image: url('${dest.image}'); background-size: cover; background-position: center; border-radius: 15px; margin-bottom: 30px;"></div>
            
            <h2>${dest.name}</h2>
            <div style="display: flex; align-items: center; gap: 15px; margin: 15px 0;">
                <span style="font-size: 24px; color: #667eea; font-weight: 700;">From $${dest.price}</span>
                <span style="background: #f0f0f0; padding: 5px 15px; border-radius: 20px;">⭐ ${dest.rating}</span>
                ${dest.ecoFriendly ? '<span class="eco-badge">🌱 Eco-Friendly</span>' : ''}
            </div>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 20px 0;">${dest.description}</p>
            
            <div style="margin: 30px 0;">
                <h3 style="margin-bottom: 15px;">Popular Activities</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${dest.activities.map(activity => `
                        <span style="background: #e8f5e9; color: #2e7d32; padding: 8px 15px; border-radius: 20px; font-size: 14px;">
                            ${activity}
                        </span>
                    `).join('')}
                </div>
            </div>
            
            <div style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 15px;">
                <h3 style="margin-bottom: 15px;">Why Visit ${dest.name.split(',')[0]}?</h3>
                <ul style="color: #666; line-height: 2;">
                    <li>Unique cultural experiences</li>
                    <li>World-class attractions</li>
                    <li>Amazing local cuisine</li>
                    <li>Friendly locals and safe environment</li>
                </ul>
            </div>
            
            <button class="book-btn-large" onclick="searchFlights('${dest.code}')">
                Search Flights to ${dest.name.split(',')[0]}
            </button>
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

function searchFlights(destinationCode) {
    localStorage.setItem('searchDestination', destinationCode);
    window.location.href = 'index.html';
}

function calculateCarbon() {
    const distance = parseFloat(document.getElementById('distance').value);
    const passengers = parseInt(document.getElementById('passengers').value);
    
    if (!distance || distance <= 0) {
        alert('Please enter a valid distance');
        return;
    }
    
    // Average CO2 per km per passenger for flights
    const co2PerKm = 0.115; // kg
    const totalCO2 = (distance * co2PerKm * passengers).toFixed(2);
    
    // Equivalences
    const treesNeeded = Math.ceil(totalCO2 / 21); // One tree absorbs ~21kg CO2/year
    const carKm = Math.round(totalCO2 / 0.12); // Average car emissions
    
    document.getElementById('co2Amount').textContent = `${totalCO2} kg CO₂`;
    document.getElementById('equivalence').innerHTML = `
        That's equivalent to:<br>
        🚗 Driving ${carKm} km in a car<br>
        🌳 ${treesNeeded} trees needed for 1 year to offset
    `;
    
    document.getElementById('carbonResult').style.display = 'block';
}

function offsetCarbon() {
    alert('Thank you for choosing to offset your carbon footprint! You will be redirected to our carbon offset partner.');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadDestinations();
});

// Add inspiration card styles
const style = document.createElement('style');
style.textContent = `
    .inspiration-card {
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        transition: all 0.3s;
    }
    
    .inspiration-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }
`;
document.head.appendChild(style);
