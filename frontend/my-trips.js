const upcomingTrips = [
    {
        id: 1,
        from: "New York (JFK)",
        to: "Tokyo (NRT)",
        departure: "Dec 15, 2024",
        departTime: "10:30 AM",
        arrival: "Dec 16, 2024",
        arriveTime: "2:45 PM",
        airline: "SkyWings",
        logo: "✈️",
        bookingRef: "SKY123456",
        class: "Economy",
        co2: 1200,
        status: "Confirmed"
    },
    {
        id: 2,
        from: "Tokyo (NRT)",
        to: "New York (JFK)",
        departure: "Dec 25, 2024",
        departTime: "3:00 PM",
        arrival: "Dec 25, 2024",
        arriveTime: "2:30 PM",
        airline: "SkyWings",
        logo: "✈️",
        bookingRef: "SKY123457",
        class: "Economy",
        co2: 1200,
        status: "Confirmed"
    }
];

const pastTrips = [
    {
        id: 3,
        from: "New York (JFK)",
        to: "London (LHR)",
        departure: "Oct 10, 2024",
        airline: "Atlantic Air",
        logo: "🌊",
        class: "Business",
        co2: 950,
        rating: null
    },
    {
        id: 4,
        from: "Los Angeles (LAX)",
        to: "Paris (CDG)",
        departure: "Sep 5, 2024",
        airline: "Euro Express",
        logo: "🌍",
        class: "Economy",
        co2: 1100,
        rating: 5
    },
    {
        id: 5,
        from: "Miami (MIA)",
        to: "Barcelona (BCN)",
        departure: "Aug 20, 2024",
        airline: "Mediterranean Wings",
        logo: "🏖️",
        class: "Economy",
        co2: 880,
        rating: 4
    }
];

function loadUpcomingTrips() {
    const container = document.getElementById('upcomingTrips');
    
    if (upcomingTrips.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No upcoming trips. <a href="index.html" style="color: #667eea;">Book a flight</a></p>';
        return;
    }
    
    upcomingTrips.forEach(trip => {
        const card = document.createElement('div');
        card.style.cssText = `
            background: white;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            border-left: 5px solid #667eea;
        `;
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 25px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="font-size: 48px;">${trip.logo}</div>
                    <div>
                        <h3 style="font-size: 24px; margin-bottom: 5px;">${trip.from} → ${trip.to}</h3>
                        <p style="color: #666;">${trip.airline} • ${trip.class}</p>
                    </div>
                </div>
                <div style="text-align: right;">
                    <span style="background: #d4edda; color: #155724; padding: 8px 15px; border-radius: 20px; font-weight: 600; font-size: 14px;">
                        ${trip.status}
                    </span>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 25px; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                <div>
                    <div style="font-size: 12px; color: #999; margin-bottom: 5px;">DEPARTURE</div>
                    <div style="font-weight: 600; font-size: 16px;">${trip.departure}</div>
                    <div style="color: #667eea; font-size: 18px; font-weight: 700; margin-top: 5px;">${trip.departTime}</div>
                </div>
                <div>
                    <div style="font-size: 12px; color: #999; margin-bottom: 5px;">ARRIVAL</div>
                    <div style="font-weight: 600; font-size: 16px;">${trip.arrival}</div>
                    <div style="color: #667eea; font-size: 18px; font-weight: 700; margin-top: 5px;">${trip.arriveTime}</div>
                </div>
                <div>
                    <div style="font-size: 12px; color: #999; margin-bottom: 5px;">BOOKING REF</div>
                    <div style="font-weight: 600; font-size: 16px;">${trip.bookingRef}</div>
                </div>
                <div>
                    <div style="font-size: 12px; color: #999; margin-bottom: 5px;">CO₂ IMPACT</div>
                    <div style="font-weight: 600; font-size: 16px; color: #28a745;">${trip.co2}kg</div>
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button onclick="viewTicket(${trip.id})" style="flex: 1; min-width: 150px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 20px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                    View Ticket
                </button>
                <button onclick="checkIn(${trip.id})" style="flex: 1; min-width: 150px; background: white; color: #667eea; border: 2px solid #667eea; padding: 12px 20px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                    Check In
                </button>
                <button onclick="addToCalendar(${trip.id})" style="flex: 1; min-width: 150px; background: white; color: #667eea; border: 2px solid #667eea; padding: 12px 20px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                    Add to Calendar
                </button>
                <button onclick="manageTrip(${trip.id})" style="flex: 1; min-width: 150px; background: white; color: #666; border: 2px solid #e0e0e0; padding: 12px 20px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                    Manage
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function loadPastTrips() {
    const container = document.getElementById('pastTrips');
    
    pastTrips.forEach(trip => {
        const card = document.createElement('div');
        card.style.cssText = `
            background: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            transition: all 0.3s;
            cursor: pointer;
        `;
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 15px; flex: 1;">
                    <div style="font-size: 36px;">${trip.logo}</div>
                    <div style="flex: 1;">
                        <h3 style="font-size: 18px; margin-bottom: 5px;">${trip.from} → ${trip.to}</h3>
                        <p style="color: #666; font-size: 14px;">${trip.airline} • ${trip.departure}</p>
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="text-align: center;">
                        <div style="font-size: 12px; color: #999; margin-bottom: 5px;">CO₂</div>
                        <div style="font-weight: 600; color: #28a745;">${trip.co2}kg</div>
                    </div>
                    
                    ${trip.rating ? `
                        <div style="text-align: center;">
                            <div style="font-size: 12px; color: #999; margin-bottom: 5px;">Rating</div>
                            <div style="color: #ffc107;">${'⭐'.repeat(trip.rating)}</div>
                        </div>
                    ` : `
                        <button onclick="rateTrip(${trip.id})" style="background: #667eea; color: white; border: none; padding: 8px 20px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                            Rate Trip
                        </button>
                    `}
                </div>
            </div>
        `;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateX(5px)';
            card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateX(0)';
            card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        });
        
        container.appendChild(card);
    });
}

function viewTicket(tripId) {
    const trip = upcomingTrips.find(t => t.id === tripId);
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <span class="modal-close" onclick="closeModal()">&times;</span>
            
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="font-size: 64px; margin-bottom: 15px;">🎫</div>
                <h2>Boarding Pass</h2>
            </div>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 25px;">
                    <div>
                        <div style="font-size: 32px; font-weight: 700;">${trip.from.split('(')[1].replace(')', '')}</div>
                        <div style="opacity: 0.9; font-size: 14px;">${trip.from.split('(')[0]}</div>
                    </div>
                    <div style="font-size: 32px; align-self: center;">→</div>
                    <div style="text-align: right;">
                        <div style="font-size: 32px; font-weight: 700;">${trip.to.split('(')[1].replace(')', '')}</div>
                        <div style="opacity: 0.9; font-size: 14px;">${trip.to.split('(')[0]}</div>
                    </div>
                </div>
                
                <div style="border-top: 2px dashed rgba(255,255,255,0.3); padding-top: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                        <div>
                            <div style="opacity: 0.7; font-size: 12px; margin-bottom: 5px;">PASSENGER</div>
                            <div style="font-weight: 600;">John Doe</div>
                        </div>
                        <div>
                            <div style="opacity: 0.7; font-size: 12px; margin-bottom: 5px;">CLASS</div>
                            <div style="font-weight: 600;">${trip.class}</div>
                        </div>
                        <div>
                            <div style="opacity: 0.7; font-size: 12px; margin-bottom: 5px;">DATE</div>
                            <div style="font-weight: 600;">${trip.departure}</div>
                        </div>
                        <div>
                            <div style="opacity: 0.7; font-size: 12px; margin-bottom: 5px;">TIME</div>
                            <div style="font-weight: 600;">${trip.departTime}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                <div style="font-size: 12px; color: #999; margin-bottom: 10px;">BOOKING REFERENCE</div>
                <div style="font-size: 24px; font-weight: 700; letter-spacing: 2px; color: #667eea;">${trip.bookingRef}</div>
            </div>
            
            <button onclick="downloadTicket()" style="width: 100%; margin-top: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 16px;">
                Download PDF
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

function checkIn(tripId) {
    alert('Online check-in will be available 24 hours before departure.');
}

function addToCalendar(tripId) {
    alert('Trip added to your calendar!');
}

function manageTrip(tripId) {
    alert('Trip management options:\n- Change seat\n- Add baggage\n- Meal preferences\n- Cancel/Modify booking');
}

function rateTrip(tripId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px; text-align: center;">
            <span class="modal-close" onclick="closeModal()">&times;</span>
            <h2 style="margin-bottom: 20px;">Rate Your Trip</h2>
            <p style="color: #666; margin-bottom: 30px;">How was your experience?</p>
            
            <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; font-size: 40px;">
                <span onclick="submitRating(${tripId}, 1)" style="cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">⭐</span>
                <span onclick="submitRating(${tripId}, 2)" style="cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">⭐</span>
                <span onclick="submitRating(${tripId}, 3)" style="cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">⭐</span>
                <span onclick="submitRating(${tripId}, 4)" style="cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">⭐</span>
                <span onclick="submitRating(${tripId}, 5)" style="cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">⭐</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function submitRating(tripId, rating) {
    const trip = pastTrips.find(t => t.id === tripId);
    if (trip) {
        trip.rating = rating;
    }
    closeModal();
    alert(`Thank you for rating your trip ${rating} stars!`);
    loadPastTrips();
}

function downloadTicket() {
    alert('Boarding pass PDF downloaded!');
}

function offsetRemaining() {
    alert('Redirecting to carbon offset program...\n\nYou can offset 2.3 tons of CO₂ for $46.');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadUpcomingTrips();
    loadPastTrips();
});
