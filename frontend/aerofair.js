// AeroFair AI + DeFi Integration

let walletConnected = false;
let walletAddress = null;
let aiConversation = [];

// AI Agent Responses
const aiResponses = {
    greetings: [
        "I'll help you find the fairest price for that flight!",
        "Great choice! Let me search for the best deals.",
        "I'm on it! Analyzing prices across all airlines..."
    ],
    analyzing: [
        "🔍 Scanning 50+ airlines and OTAs...",
        "🤖 AI analyzing historical price data...",
        "💡 Detecting price patterns...",
        "✅ Found the fairest price!"
    ],
    results: {
        cheap: "Great news! I found a flight ${price} below market average. This is a fair deal!",
        expensive: "⚠️ Warning: Current prices are ${percent}% above average. I recommend waiting or using our escrow for automatic rebate.",
        fair: "✅ This price is fair based on historical data. Safe to book!"
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkWalletConnection();
    loadNFTRebates();
    loadEscrows();
});

// AI Chat Functions
function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Simulate AI processing
    setTimeout(() => {
        processAIRequest(message);
    }, 1000);
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'ai-message';
    messageDiv.style.marginBottom = '20px';
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div style="display: flex; align-items: start; gap: 15px; justify-content: flex-end;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 20px; border-radius: 15px; max-width: 70%;">
                    <p style="margin: 0; line-height: 1.6;">${text}</p>
                </div>
                <div style="width: 40px; height: 40px; background: #e0e0e0; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    👤
                </div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div style="display: flex; align-items: start; gap: 15px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    🤖
                </div>
                <div style="background: white; padding: 15px 20px; border-radius: 15px; max-width: 70%;">
                    <p style="margin: 0; line-height: 1.6;">${text}</p>
                </div>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processAIRequest(message) {
    const lowerMessage = message.toLowerCase();
    
    // Extract intent
    let response = '';
    
    if (lowerMessage.includes('cheap') || lowerMessage.includes('budget')) {
        response = aiResponses.greetings[0];
        setTimeout(() => {
            addMessage(aiResponses.analyzing[0], 'ai');
            setTimeout(() => {
                addMessage(aiResponses.analyzing[1], 'ai');
                setTimeout(() => {
                    showFlightResults('budget');
                }, 1500);
            }, 1500);
        }, 1000);
    } else if (lowerMessage.includes('eco') || lowerMessage.includes('green')) {
        response = "Perfect! I'll prioritize eco-friendly flights with low CO2 emissions.";
        setTimeout(() => {
            showFlightResults('eco');
        }, 2000);
    } else if (lowerMessage.includes('business') || lowerMessage.includes('luxury')) {
        response = "Looking for premium options with the best value...";
        setTimeout(() => {
            showFlightResults('business');
        }, 2000);
    } else {
        response = "I'll search for the fairest prices across all airlines. One moment...";
        setTimeout(() => {
            showFlightResults('general');
        }, 2000);
    }
    
    addMessage(response, 'ai');
}

function showFlightResults(type) {
    const results = {
        budget: {
            from: "Toronto",
            to: "Vancouver",
            price: 199,
            marketAvg: 385,
            savings: 186,
            fairness: "excellent"
        },
        eco: {
            from: "Toronto",
            to: "Montreal",
            price: 189,
            marketAvg: 220,
            co2: 125,
            fairness: "good"
        },
        business: {
            from: "Toronto",
            to: "Calgary",
            price: 685,
            marketAvg: 850,
            savings: 165,
            fairness: "excellent"
        },
        general: {
            from: "Montreal",
            to: "Halifax",
            price: 275,
            marketAvg: 320,
            savings: 45,
            fairness: "good"
        }
    };
    
    const result = results[type] || results.general;
    const savingsPercent = Math.round((result.savings / result.marketAvg) * 100);
    
    let message = `
        ✅ <strong>Found Fair Price!</strong><br><br>
        <strong>${result.from} → ${result.to}</strong><br>
        💰 Price: <strong>$${result.price}</strong><br>
        📊 Market Average: <span style="text-decoration: line-through;">$${result.marketAvg}</span><br>
        💚 Your Savings: <strong style="color: #28a745;">$${result.savings} (${savingsPercent}%)</strong><br>
        ${result.co2 ? `🌍 CO2: ${result.co2}kg (Low Impact)<br>` : ''}
        <br>
        <strong>Fairness Score: ${result.fairness === 'excellent' ? '⭐⭐⭐⭐⭐' : '⭐⭐⭐⭐'}</strong><br>
        <br>
        Would you like to book with DeFi escrow protection?
    `;
    
    addMessage(message, 'ai');
    
    // Add action buttons
    setTimeout(() => {
        const chatMessages = document.getElementById('chatMessages');
        const buttonDiv = document.createElement('div');
        buttonDiv.style.cssText = 'display: flex; gap: 10px; margin: 20px 0; padding-left: 55px;';
        buttonDiv.innerHTML = `
            <button onclick="bookWithEscrow(${result.price})" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 25px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                Book with Escrow
            </button>
            <button onclick="addMessage('Show me more options', 'user'); processAIRequest('more options')" style="background: white; color: #667eea; border: 2px solid #667eea; padding: 12px 25px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                More Options
            </button>
        `;
        chatMessages.appendChild(buttonDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
}

function quickPrompt(prompt) {
    document.getElementById('aiInput').value = prompt;
    sendAIMessage();
}

// Wallet Functions
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            walletAddress = accounts[0];
            walletConnected = true;
            
            updateWalletUI();
            showNotification('Wallet connected successfully!', 'success');
        } catch (error) {
            console.error('Error connecting wallet:', error);
            showNotification('Failed to connect wallet', 'error');
        }
    } else {
        // Simulate connection for demo
        walletAddress = '0x' + Math.random().toString(16).substr(2, 40);
        walletConnected = true;
        updateWalletUI();
        showNotification('Demo wallet connected! (Install MetaMask for real transactions)', 'info');
    }
}

function updateWalletUI() {
    const walletStatus = document.getElementById('walletStatus');
    const walletBalance = document.getElementById('walletBalance');
    
    if (walletConnected) {
        walletStatus.innerHTML = `
            <div style="padding: 20px; background: rgba(255,255,255,0.2); border-radius: 10px; backdrop-filter: blur(10px); margin-bottom: 20px;">
                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 5px;">Connected</div>
                <div style="font-family: monospace; font-size: 16px; font-weight: 600;">
                    ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}
                </div>
            </div>
            <button onclick="disconnectWallet()" style="width: 100%; background: rgba(255,255,255,0.2); color: white; border: 2px solid white; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer;">
                Disconnect
            </button>
        `;
        
        // Simulate balance
        const balance = (Math.random() * 5000 + 1000).toFixed(2);
        walletBalance.textContent = `${balance} USDC`;
    }
}

function disconnectWallet() {
    walletConnected = false;
    walletAddress = null;
    location.reload();
}

function checkWalletConnection() {
    // Check if wallet was previously connected
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
        walletAddress = savedAddress;
        walletConnected = true;
        updateWalletUI();
    }
}

// Escrow Functions
function bookWithEscrow(price) {
    if (!walletConnected) {
        addMessage('Please connect your wallet first to use escrow protection.', 'ai');
        scrollToWallet();
        return;
    }
    
    addMessage(`Initiating escrow for $${price}...`, 'ai');
    
    setTimeout(() => {
        const escrowId = 'ESC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        addMessage(`
            ✅ <strong>Escrow Created!</strong><br><br>
            Escrow ID: <strong>${escrowId}</strong><br>
            Amount: <strong>$${price} USDC</strong><br>
            Status: <strong>Locked</strong><br>
            <br>
            Your funds are secured on Polygon blockchain. If a better price is found within 24 hours, you'll automatically receive an NFT rebate!
        `, 'ai');
        
        // Add to escrow list
        addEscrowToList(escrowId, price);
        showNotification('Escrow created successfully!', 'success');
    }, 2000);
}

function addEscrowToList(escrowId, amount) {
    const escrowList = document.getElementById('escrowList');
    
    if (escrowList.querySelector('.empty-state')) {
        escrowList.innerHTML = '';
    }
    
    const escrowItem = document.createElement('div');
    escrowItem.style.cssText = 'padding: 20px; background: #f8f9fa; border-radius: 10px; margin-bottom: 15px;';
    escrowItem.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <strong>${escrowId}</strong>
            <span style="background: #fff3cd; color: #856404; padding: 5px 12px; border-radius: 15px; font-size: 12px; font-weight: 600;">
                Locked
            </span>
        </div>
        <div style="display: flex; justify-content: space-between; color: #666; font-size: 14px;">
            <span>Amount:</span>
            <strong style="color: #333;">$${amount} USDC</strong>
        </div>
        <div style="display: flex; justify-content: space-between; color: #666; font-size: 14px; margin-top: 5px;">
            <span>Monitoring:</span>
            <strong style="color: #28a745;">Active</strong>
        </div>
    `;
    
    escrowList.appendChild(escrowItem);
}

function loadEscrows() {
    // Load saved escrows from localStorage
    const savedEscrows = JSON.parse(localStorage.getItem('escrows') || '[]');
    savedEscrows.forEach(escrow => {
        addEscrowToList(escrow.id, escrow.amount);
    });
}

// NFT Functions
function loadNFTRebates() {
    // Simulate loading NFTs
    const nftGallery = document.getElementById('nftGallery');
    
    // Sample NFT data
    const sampleNFTs = [
        { id: 1234, value: 45, flight: 'JFK → LHR', date: '2024-11-15' },
        { id: 5678, value: 32, flight: 'LAX → NRT', date: '2024-11-20' }
    ];
    
    // Add sample NFTs (commented out for empty state)
    // sampleNFTs.forEach(nft => addNFTCard(nft));
}

function addNFTCard(nft) {
    const nftGallery = document.getElementById('nftGallery');
    
    const card = document.createElement('div');
    card.style.cssText = 'background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);';
    card.innerHTML = `
        <div style="height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-size: 64px;">
            🎫
        </div>
        <div style="padding: 25px;">
            <h3 style="font-size: 18px; margin-bottom: 10px;">Rebate NFT #${nft.id}</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                <span style="color: #666;">Value:</span>
                <span style="font-weight: 700; color: #28a745;">$${nft.value} USDC</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                <span style="color: #666;">Flight:</span>
                <span style="font-weight: 600;">${nft.flight}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <span style="color: #666;">Date:</span>
                <span style="font-weight: 600;">${nft.date}</span>
            </div>
            <button onclick="redeemNFT(${nft.id})" style="width: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                Redeem Now
            </button>
        </div>
    `;
    
    nftGallery.insertBefore(card, nftGallery.lastElementChild);
}

function redeemNFT(nftId) {
    if (!walletConnected) {
        alert('Please connect your wallet to redeem NFTs');
        scrollToWallet();
        return;
    }
    
    if (confirm(`Redeem NFT #${nftId}? The USDC will be sent to your wallet.`)) {
        showNotification('NFT redeemed! USDC sent to your wallet.', 'success');
        // Remove NFT card
        event.target.closest('div[style*="background: white"]').remove();
    }
}

// Utility Functions
function scrollToAIAgent() {
    document.getElementById('aiAgent').scrollIntoView({ behavior: 'smooth' });
}

function scrollToWallet() {
    document.getElementById('wallet').scrollIntoView({ behavior: 'smooth' });
}

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

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Save wallet address
window.addEventListener('beforeunload', () => {
    if (walletConnected && walletAddress) {
        localStorage.setItem('walletAddress', walletAddress);
    }
});
