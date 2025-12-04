const flashDeals = [
    {
        from: "Toronto",
        to: "Vancouver",
        price: 199,
        originalPrice: 385,
        discount: 48,
        airline: "Air Canada",
        departure: "Dec 15",
        image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800",
        co2: 420,
        seats: 8
    },
    {
        from: "Montreal",
        to: "Calgary",
        price: 179,
        originalPrice: 340,
        discount: 47,
        airline: "WestJet",
        departure: "Dec 18",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800",
        co2: 385,
        seats: 5
    },
    {
        from: "Toronto",
        to: "Halifax",
        price: 149,
        originalPrice: 295,
        discount: 49,
        airline: "Air Canada",
        departure: "Dec 20",
        image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800",
        co2: 310,
        seats: 12
    }
];

const weekendDeals = [
    {
        from: "Toronto",
        to: "Montreal",
        price: 89,
        duration: "1h 20m",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800",
        rating: 4.5
    },
    {
        from: "Vancouver",
        to: "Victoria",
        price: 69,
        duration: "35m",
        image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800",
        rating: 4.6
    },
    {
        from: "Calgary",
        to: "Edmonton",
        price: 79,
        duration: "1h 10m",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800",
        rating: 4.7
    },
    {
        from: "Toronto",
        to: "Ottawa",
        price: 59,
        duration: "1h",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800",
        rating: 4.4
    }
];

const lastMinuteDeals = [
    {
        from: "Toronto",
        to: "Vancouver",
        price: 215,
        originalPrice: 385,
        departure: "Tomorrow",
        airline: "WestJet",
        image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800"
    },
    {
        from: "Montreal",
        to: "Halifax",
        price: 139,
        originalPrice: 275,
        departure: "Dec 3",
        airline: "Air Canada",
        image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800"
    },
    {
        from: "Calgary",
        to: "Toronto",
        price: 189,
        originalPrice: 350,
        departure: "Dec 4",
        airline: "Porter Airlines",
        image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800"
    }
];

function loadFlashDeals() {
    const container = document.getElementById('flashDeals');
    
    flashDeals.forEach(deal => {
        const card = document.createElement('div');
        card.style.cssText = `
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.3s;
            cursor: pointer;
            position: relative;
        `;
        
        card.innerHTML = `
            <div style="position: absolute; top: 15px; right: 15px; background: #dc3545; color: white; padding: 8px 15px; border-radius: 20px; font-weight: 600; font-size: 14px; z-index: 10;">
                ${deal.discount}% OFF
            </div>
            <div style="height: 200px; background-image: url('${deal.image}'); background-size: cover; background-position: center;"></div>
            <div style="padding: 25px;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <div>
                        <h3 style="font-size: 24px; margin-bottom: 5px;">${deal.from} → ${deal.to}</h3>
                        <p style="color: #666; font-size: 14px;">${deal.airline} • ${deal.departure}</p>
                    </div>
                </div>
                
                <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 15px;">
                    <span style="font-size: 32px; font-weight: 700; color: #667eea;">$${deal.price}</span>
                    <span style="font-size: 18px; color: #999; text-decoration: line-through;">$${deal.originalPrice}</span>
                </div>
                
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <span style="background: #e8f5e9; color: #2e7d32; padding: 5px 12px; border-radius: 15px; font-size: 12px;">
                        🌍 ${deal.co2}kg CO₂
                    </span>
                    <span style="background: #fff3cd; color: #856404; padding: 5px 12px; border-radius: 15px; font-size: 12px;">
                        ${deal.seats} seats left
                    </span>
                </div>
                
                <button onclick="bookDeal('${deal.from}', '${deal.to}')" style="width: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 16px;">
                    Book Now
                </button>
            </div>
        `;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
        
        container.appendChild(card);
    });
}

function loadWeekendDeals() {
    const container = document.getElementById('weekendDeals');
    
    weekendDeals.forEach(deal => {
        const card = document.createElement('div');
        card.style.cssText = `
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            transition: all 0.3s;
            cursor: pointer;
        `;
        
        card.innerHTML = `
            <div style="height: 180px; background-image: url('${deal.image}'); background-size: cover; background-position: center;"></div>
            <div style="padding: 20px;">
                <h3 style="font-size: 20px; margin-bottom: 10px;">${deal.from} → ${deal.to}</h3>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <span style="color: #666;">${deal.duration}</span>
                    <span style="background: #f0f0f0; padding: 5px 10px; border-radius: 15px; font-size: 12px;">
                        ⭐ ${deal.rating}
                    </span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 28px; font-weight: 700; color: #667eea;">$${deal.price}</span>
                    <button onclick="bookDeal('${deal.from}', '${deal.to}')" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        Book
                    </button>
                </div>
            </div>
        `;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        });
        
        container.appendChild(card);
    });
}

function loadLastMinuteDeals() {
    const container = document.getElementById('lastMinuteDeals');
    
    lastMinuteDeals.forEach(deal => {
        const card = document.createElement('div');
        card.style.cssText = `
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.3s;
            cursor: pointer;
        `;
        
        const savings = deal.originalPrice - deal.price;
        
        card.innerHTML = `
            <div style="height: 200px; background-image: url('${deal.image}'); background-size: cover; background-position: center; position: relative;">
                <div style="position: absolute; top: 15px; left: 15px; background: #ff6b6b; color: white; padding: 8px 15px; border-radius: 20px; font-weight: 600;">
                    ${deal.departure}
                </div>
            </div>
            <div style="padding: 25px;">
                <h3 style="font-size: 22px; margin-bottom: 5px;">${deal.from} → ${deal.to}</h3>
                <p style="color: #666; margin-bottom: 15px;">${deal.airline}</p>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="color: #666;">Regular Price:</span>
                        <span style="text-decoration: line-through; color: #999;">$${deal.originalPrice}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 18px; color: #28a745;">
                        <span>Last Minute Price:</span>
                        <span>$${deal.price}</span>
                    </div>
                    <div style="text-align: center; margin-top: 10px; color: #28a745; font-weight: 600;">
                        Save $${savings}!
                    </div>
                </div>
                
                <button onclick="bookDeal('${deal.from}', '${deal.to}')" style="width: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 16px;">
                    Book This Deal
                </button>
            </div>
        `;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
        
        container.appendChild(card);
    });
}

function bookDeal(from, to) {
    alert(`Booking flight from ${from} to ${to}!\n\nYou'll be redirected to the booking page.`);
    window.location.href = 'index.html';
}

function setPriceAlert() {
    alert('Price alert set! We\'ll notify you when prices drop on this route.');
}

// Countdown timer for flash deals
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const endTime = new Date().getTime() + (6 * 60 * 60 * 1000); // 6 hours from now
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `⏰ Expires in: ${hours}h ${minutes}m ${seconds}s`;
        
        if (distance < 0) {
            countdownElement.innerHTML = "EXPIRED";
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFlashDeals();
    loadWeekendDeals();
    loadLastMinuteDeals();
    startCountdown();
});
