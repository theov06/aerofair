function addMessage(message, isUser = false) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessage(message, true);
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const responses = [
            "I can help you find the best flight deals! What's your destination?",
            "Let me check current prices for you...",
            "I've detected potential price gouging. Would you like me to negotiate?",
            "Your funds are secured in our USDC escrow. Booking confirmed!",
            "I found a better price! Saving you $50 on this route."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse);
    }, 1000);
}

// Welcome message
window.onload = function() {
    addMessage("Hello! I'm your AeroFair assistant. I can help you find fair flight prices and protect you from price gouging. How can I help you today?");
};