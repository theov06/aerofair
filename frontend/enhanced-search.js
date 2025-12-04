// Enhanced Search Features for SkyVibe

// Enhanced Airport Autocomplete with API
async function setupEnhancedAutocomplete() {
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    
    if (!fromInput || !toInput) return;
    
    [fromInput, toInput].forEach(input => {
        let debounceTimer;
        
        input.addEventListener('input', async (e) => {
            const value = e.target.value.trim();
            
            // Clear previous timer
            clearTimeout(debounceTimer);
            
            if (value.length < 2) {
                hideAutocomplete(input);
                return;
            }
            
            // Debounce API calls
            debounceTimer = setTimeout(async () => {
                await searchAirportsWithAPI(input, value);
            }, 300);
        });
        
        // Close autocomplete when clicking outside
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target)) {
                hideAutocomplete(input);
            }
        });
    });
}

async function searchAirportsWithAPI(input, query) {
    try {
        // Try API search first
        if (typeof airLabsService !== 'undefined' && airLabsService) {
            const apiResults = await airLabsService.searchAirports(query);
            
            if (apiResults && apiResults.length > 0) {
                showEnhancedAutocomplete(input, apiResults, 'api');
                return;
            }
        }
    } catch (error) {
        console.log('API search failed, using local data');
    }
    
    // Fallback to local search
    const localResults = searchLocalAirports(query);
    showEnhancedAutocomplete(input, localResults, 'local');
}

function searchLocalAirports(query) {
    const lowerQuery = query.toLowerCase();
    
    return airports.filter(airport => 
        airport.name.toLowerCase().includes(lowerQuery) ||
        airport.code.toLowerCase().includes(lowerQuery) ||
        airport.city.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
}

function showEnhancedAutocomplete(input, results, source) {
    hideAutocomplete(input);
    
    if (results.length === 0) return;
    
    const list = document.createElement('div');
    list.className = 'autocomplete-list-enhanced';
    list.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
        margin-top: 5px;
    `;
    
    results.forEach(airport => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item-enhanced';
        item.style.cssText = `
            padding: 12px 15px;
            cursor: pointer;
            border-bottom: 1px solid #f0f0f0;
            transition: background 0.2s;
        `;
        
        // Format based on source
        if (source === 'api') {
            item.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: 600; color: #333;">
                            ${airport.iata_code || airport.code} - ${airport.name}
                        </div>
                        <div style="font-size: 12px; color: #666;">
                            ${airport.city_name || airport.city}, ${airport.country_code}
                        </div>
                    </div>
                    <div style="font-size: 20px;">✈️</div>
                </div>
            `;
        } else {
            item.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: 600; color: #333;">
                            ${airport.code} - ${airport.city}
                        </div>
                        <div style="font-size: 12px; color: #666;">
                            ${airport.name}
                        </div>
                    </div>
                    <div style="font-size: 20px;">✈️</div>
                </div>
            `;
        }
        
        item.addEventListener('mouseenter', () => {
            item.style.background = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = 'white';
        });
        
        item.addEventListener('click', () => {
            const code = airport.iata_code || airport.code;
            const name = airport.city_name || airport.city;
            input.value = `${name} (${code})`;
            hideAutocomplete(input);
        });
        
        list.appendChild(item);
    });
    
    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(list);
}

function hideAutocomplete(input) {
    const existing = input.parentElement.querySelector('.autocomplete-list-enhanced');
    if (existing) {
        existing.remove();
    }
}

// Flight Status Checker
async function checkFlightStatus() {
    const flightNumber = prompt('Enter flight number (e.g., AC123, WS456):');
    
    if (!flightNumber) return;
    
    if (typeof showLoading !== 'undefined') {
        showLoading('Checking flight status...');
    }
    
    try {
        const status = await getFlightStatus(flightNumber.toUpperCase());
        
        if (typeof hideLoading !== 'undefined') {
            hideLoading();
        }
        
        if (status) {
            showFlightStatusModal(status);
        } else {
            if (typeof showToast !== 'undefined') {
                showToast('Flight not found or no data available', 'error');
            } else {
                alert('Flight not found');
            }
        }
    } catch (error) {
        if (typeof hideLoading !== 'undefined') {
            hideLoading();
        }
        if (typeof showToast !== 'undefined') {
            showToast('Error checking flight status', 'error');
        }
    }
}

function showFlightStatusModal(flight) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0;">Flight Status</h2>
                <button onclick="this.closest('.modal').remove()" style="
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #999;
                ">&times;</button>
            </div>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div>
                        <div style="font-size: 24px; font-weight: 700;">${flight.from}</div>
                        <div style="opacity: 0.9; font-size: 14px;">${flight.departTime}</div>
                    </div>
                    <div style="font-size: 24px;">→</div>
                    <div style="text-align: right;">
                        <div style="font-size: 24px; font-weight: 700;">${flight.to}</div>
                        <div style="opacity: 0.9; font-size: 14px;">${flight.arriveTime}</div>
                    </div>
                </div>
                <div style="text-align: center; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.3);">
                    <div style="font-size: 14px; opacity: 0.9;">Flight ${flight.flightNumber || 'N/A'}</div>
                    <div style="font-weight: 600; margin-top: 5px;">${flight.airline}</div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Status</div>
                    <div style="font-weight: 600; color: #28a745;">${flight.status || 'Scheduled'}</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Duration</div>
                    <div style="font-weight: 600;">${flight.duration}</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Aircraft</div>
                    <div style="font-weight: 600;">${flight.stops}</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <div style="font-size: 12px; color: #666; margin-bottom: 5px;">CO₂</div>
                    <div style="font-weight: 600; color: #28a745;">${flight.co2}kg</div>
                </div>
            </div>
            
            <button onclick="this.closest('.modal').remove()" style="
                width: 100%;
                margin-top: 20px;
                background: #667eea;
                color: white;
                border: none;
                padding: 15px;
                border-radius: 10px;
                font-weight: 600;
                cursor: pointer;
                font-size: 16px;
            ">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Airport Delays Checker
async function checkAirportDelaysUI(airportCode) {
    if (!airportCode) {
        airportCode = prompt('Enter airport code (e.g., YYZ, YVR):');
    }
    
    if (!airportCode) return;
    
    if (typeof showLoading !== 'undefined') {
        showLoading('Checking delays...');
    }
    
    try {
        const delays = await checkAirportDelays(airportCode.toUpperCase());
        
        if (typeof hideLoading !== 'undefined') {
            hideLoading();
        }
        
        if (delays && delays.length > 0) {
            showDelaysModal(airportCode, delays);
        } else {
            if (typeof showToast !== 'undefined') {
                showToast(`No significant delays at ${airportCode}`, 'success');
            } else {
                alert(`No delays at ${airportCode}`);
            }
        }
    } catch (error) {
        if (typeof hideLoading !== 'undefined') {
            hideLoading();
        }
        if (typeof showToast !== 'undefined') {
            showToast('Error checking delays', 'error');
        }
    }
}

function showDelaysModal(airportCode, delays) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        overflow-y: auto;
    `;
    
    const delaysList = delays.slice(0, 10).map(delay => `
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
            <div style="font-weight: 600; margin-bottom: 5px;">
                Flight ${delay.flight_iata || delay.flight_number}
            </div>
            <div style="font-size: 14px; color: #666;">
                ${delay.airline_iata || 'Unknown'} • Delayed ${delay.delayed || 'Unknown'} minutes
            </div>
        </div>
    `).join('');
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0;">Delays at ${airportCode}</h2>
                <button onclick="this.closest('.modal').remove()" style="
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #999;
                ">&times;</button>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
                <div style="font-size: 32px; font-weight: 700; color: #856404;">${delays.length}</div>
                <div style="color: #856404;">Delayed Flights</div>
            </div>
            
            ${delaysList}
            
            <button onclick="this.closest('.modal').remove()" style="
                width: 100%;
                margin-top: 20px;
                background: #667eea;
                color: white;
                border: none;
                padding: 15px;
                border-radius: 10px;
                font-weight: 600;
                cursor: pointer;
                font-size: 16px;
            ">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    setupEnhancedAutocomplete();
    
    // Add flight status checker button if on main page
    const navbar = document.querySelector('.nav-links');
    if (navbar && !document.getElementById('flightStatusBtn')) {
        const statusBtn = document.createElement('a');
        statusBtn.id = 'flightStatusBtn';
        statusBtn.href = '#';
        statusBtn.textContent = 'Flight Status';
        statusBtn.onclick = (e) => {
            e.preventDefault();
            checkFlightStatus();
        };
        navbar.appendChild(statusBtn);
    }
});

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupEnhancedAutocomplete,
        checkFlightStatus,
        checkAirportDelaysUI
    };
}
