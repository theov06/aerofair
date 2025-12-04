// Utility Functions for SkyVibe

// Loading Spinner
function showLoading(message = 'Loading...') {
    let loader = document.getElementById('globalLoader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'globalLoader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        loader.innerHTML = `
            <div style="background: white; padding: 40px; border-radius: 20px; text-align: center;">
                <div class="spinner" style="
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #667eea;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                <p id="loaderMessage" style="color: #333; font-weight: 600; font-size: 16px;">${message}</p>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        document.body.appendChild(loader);
    } else {
        loader.style.display = 'flex';
        document.getElementById('loaderMessage').textContent = message;
    }
}

function hideLoading() {
    const loader = document.getElementById('globalLoader');
    if (loader) {
        loader.style.display = 'none';
    }
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const colors = {
        success: { bg: '#d4edda', text: '#155724', icon: '✓' },
        error: { bg: '#f8d7da', text: '#721c24', icon: '✗' },
        warning: { bg: '#fff3cd', text: '#856404', icon: '⚠' },
        info: { bg: '#d1ecf1', text: '#0c5460', icon: 'ℹ' }
    };
    
    const color = colors[type] || colors.info;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color.bg};
        color: ${color.text};
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    
    toast.innerHTML = `
        <span style="font-size: 20px;">${color.icon}</span>
        <span>${message}</span>
        <style>
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        </style>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateAirportCode(code) {
    return /^[A-Z]{3}$/.test(code);
}

function validateDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
}

function validateSearchForm(from, to, departure) {
    if (!from || !to) {
        showToast('Please select both departure and destination airports', 'error');
        return false;
    }
    
    if (from === to) {
        showToast('Departure and destination cannot be the same', 'error');
        return false;
    }
    
    if (!departure) {
        showToast('Please select a departure date', 'error');
        return false;
    }
    
    return true;
}

// Error Handler
function handleError(error, userMessage = 'Something went wrong. Please try again.') {
    console.error('Error:', error);
    showToast(userMessage, 'error');
    hideLoading();
}

// Confirmation Dialog
function showConfirmDialog(message, onConfirm, onCancel) {
    const dialog = document.createElement('div');
    dialog.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10002;
    `;
    
    dialog.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 400px; text-align: center;">
            <p style="font-size: 18px; margin-bottom: 25px; color: #333;">${message}</p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="confirmBtn" style="
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 16px;
                ">Confirm</button>
                <button id="cancelBtn" style="
                    background: #f0f0f0;
                    color: #333;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 16px;
                ">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    document.getElementById('confirmBtn').onclick = () => {
        dialog.remove();
        if (onConfirm) onConfirm();
    };
    
    document.getElementById('cancelBtn').onclick = () => {
        dialog.remove();
        if (onCancel) onCancel();
    };
}

// Format Currency
function formatCurrency(amount, currency = 'CAD') {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Format Date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-CA', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy', 'error');
    });
}

// Check if Mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Smooth Scroll
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showLoading,
        hideLoading,
        showToast,
        validateEmail,
        validateAirportCode,
        validateDate,
        validateSearchForm,
        handleError,
        showConfirmDialog,
        formatCurrency,
        formatDate,
        debounce,
        copyToClipboard,
        isMobile,
        smoothScrollTo
    };
}
