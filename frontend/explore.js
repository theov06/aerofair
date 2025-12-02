const allDestinations = [
    {
        name: "Tokyo, Japan",
        code: "NRT",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
        price: 650,
        description: "Experience the perfect blend of tradition and technology",
        category: ["city", "culture"],
        ecoFriendly: true,
        rating: 4.8,
        activities: ["Temples", "Food Tours", "Shopping", "Cherry Blossoms"]
    },
    {
        name: "Paris, France",
        code: "CDG",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        price: 520,
        description: "The city of lights and romance",
        category: ["city", "culture"],
        ecoFriendly: false,
        rating: 4.7,
        activities: ["Museums", "Cafes", "Architecture", "Wine Tasting"]
    },
    {
        name: "Dubai, UAE",
        code: "DXB",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        price: 780,
        description: "Luxury and innovation in the desert",
        category: ["city", "luxury"],
        ecoFriendly: false,
        rating: 4.6,
        activities: ["Shopping", "Desert Safari", "Skyscrapers", "Beach Clubs"]
    },
    {
        name: "Bali, Indonesia",
        code: "DPS",
        image: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=800",
        price: 890,
        description: "Tropical paradise with stunning beaches",
        category: ["beach", "adventure"],
        ecoFriendly: true,
        rating: 4.9,
        activities: ["Surfing", "Temples", "Yoga", "Rice Terraces"]
    },
    {
        name: "London, UK",
        code: "LHR",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
        price: 480,
        description: "Historic charm meets modern culture",
        category: ["city", "culture"],
        ecoFriendly: false,
        rating: 4.5,
        activities: ["Museums", "Theater", "Pubs", "Royal Palaces"]
    },
    {
        name: "Barcelona, Spain",
        code: "BCN",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800",
        price: 550,
        description: "Art, architecture, and Mediterranean vibes",
        category: ["city", "beach", "culture"],
        ecoFriendly: false,
        rating: 4.7,
        activities: ["Gaudi Architecture", "Beaches", "Tapas", "Nightlife"]
    },
    {
        name: "Reykjavik, Iceland",
        code: "KEF",
        image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800",
        price: 620,
        description: "Northern lights and natural wonders",
        category: ["adventure", "eco"],
        ecoFriendly: true,
        rating: 4.8,
        activities: ["Northern Lights", "Hot Springs", "Glaciers", "Waterfalls"]
    },
    {
        name: "Maldives",
        code: "MLE",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
        price: 1200,
        description: "Ultimate luxury beach paradise",
        category: ["beach", "luxury"],
        ecoFriendly: true,
        rating: 4.9,
        activities: ["Diving", "Snorkeling", "Spa", "Water Villas"]
    },
    {
        name: "New Zealand",
        code: "AKL",
        image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800",
        price: 950,
        description: "Adventure capital of the world",
        category: ["adventure", "eco"],
        ecoFriendly: true,
        rating: 4.9,
        activities: ["Hiking", "Bungee Jumping", "Lord of the Rings Tours", "Fjords"]
    },
    {
        name: "Santorini, Greece",
        code: "JTR",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
        price: 680,
        description: "Iconic white buildings and blue domes",
        category: ["beach", "culture"],
        ecoFriendly: false,
        rating: 4.8,
        activities: ["Sunset Views", "Wine Tasting", "Beaches", "Photography"]
    },
    {
        name: "Costa Rica",
        code: "SJO",
        image: "https://images.unsplash.com/photo-1621894864909-c2fe9f8f3f8e?w=800",
        price: 720,
        description: "Eco-tourism paradise with rich biodiversity",
        category: ["adventure", "eco", "beach"],
        ecoFriendly: true,
        rating: 4.8,
        activities: ["Rainforest", "Zip-lining", "Wildlife", "Beaches"]
    },
    {
        name: "Singapore",
        code: "SIN",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
        price: 750,
        description: "Futuristic city-state with amazing food",
        category: ["city"],
        ecoFriendly: true,
        rating: 4.7,
        activities: ["Gardens by the Bay", "Food", "Shopping", "Marina Bay"]
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
