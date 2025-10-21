document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Real-Time Clock Logic (for index.html) ---
    const timeElement = document.getElementById('current-time-display');
    
    // Check if the time element exists on the current page
    if (timeElement) {
        function updateTime() {
            const now = new Date();
            
            // Get the current day of the week (e.g., "Tuesday")
            const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
            
            // Get the current UTC time in milliseconds
            const currentTimeMs = now.getTime();
            
            // Set the text content
            // We show only milliseconds for a cleaner look, as the day is very long
            timeElement.textContent = currentTimeMs;
            
            // Update the datetime attribute for accessibility
            timeElement.setAttribute('datetime', now.toISOString());
        }

        // Update the time every 50 milliseconds
        setInterval(updateTime, 50); 
        updateTime(); // Run it once immediately
    }

    // --- 2. LOGIC FOR THE CONTACT PAGE (contact.html) ---
    const contactForm = document.getElementById('contact-form');
    
    // Check if the contact form exists on the current page
    if (contactForm) {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const successMessage = document.getElementById('success-message');
        
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Stop the form from submitting normally
            let isFormValid = validateForm();
            
            if (isFormValid) {
                // On success, hide form and show success message
                successMessage.style.display = 'block';
                contactForm.style.display = 'none';
            }
        });

        function validateForm() {
            let isValid = true;
            
            // Clear all previous errors
            clearError(name);
            clearError(email);
            clearError(subject);
            clearError(message);

            // Name check
            if (name.value.trim() === '') {
                showError(name, 'Full name is required.');
                isValid = false;
            }

            // Email check
            if (email.value.trim() === '') {
                showError(email, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address.');
                isValid = false;
            }

            // Subject check
            if (subject.value.trim() === '') {
                showError(subject, 'Subject is required.');
                isValid = false;
            }
            
            // Message check (must be at least 10 chars)
            if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters long.');
                isValid = false;
            }

            return isValid;
        }

        function showError(inputElement, errorMessage) {
            inputElement.classList.add('invalid');
            const errorElement = document.getElementById('error-' + inputElement.id);
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }

        function clearError(inputElement) {
            inputElement.classList.remove('invalid');
          const errorElement = document.getElementById('error-' + inputElement.id);
            if(errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
            }
        }

        function isValidEmail(email) {
            // A simple regex for email validation
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    }
});