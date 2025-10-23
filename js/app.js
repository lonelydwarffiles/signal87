// Signal 87 - Application JavaScript

// Configuration - Replace with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwFsIz-HVEvx4avJ2ssGhjucqYp3oqsCBxfZDH75m-VUgXwrApgFI05bsodzRTC-_oW/exec';

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitButton = document.getElementById('submitButton');
    const messageDiv = document.getElementById('formMessage');
    
    // Disable button during submission
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    messageDiv.style.display = 'none';
    messageDiv.className = 'form-message';
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value,
        introduction: document.getElementById('introduction').value,
        portfolio: document.getElementById('portfolio').value,
        timestamp: new Date().toISOString()
    };
    
    try {
        // Send to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires this
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Show success message
        showMessage('success', 'Application submitted successfully! We\'ll be in touch soon.');
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showMessage('error', 'There was an error submitting your application. Please try again or email us directly.');
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Application';
    }
}

function showMessage(type, message) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// Optional: Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
