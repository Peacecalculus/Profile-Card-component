document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Tab Navigation Logic ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const cardSections = document.querySelectorAll('.card-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            // Get the target section ID (e.g., 'about', 'hobbies', 'contact')
            const targetId = button.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);

            // Hide all sections and deactivate all buttons
            cardSections.forEach(section => section.classList.remove('active'));
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Show the target section and activate the clicked button
            if (targetSection) {
                targetSection.classList.add('active');
                button.classList.add('active');
            }
        });
    });

    // --- 2. Real-Time Clock Logic ---
    const timeElement = document.getElementById('current-time-display');

    function updateTime() {
        const now = new Date();
        
        // Get the current day of the week (e.g., "Monday")
        const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
        
        // Get the current UTC time in milliseconds
        const currentTimeMs = now.getTime();
        
        // Set the text content: Day of Week, UTC Milliseconds
        timeElement.textContent = `${dayOfWeek}, ${currentTimeMs}`;
        
        // Update the datetime attribute for accessibility
        timeElement.setAttribute('datetime', now.toISOString());
    }

    // Update the time every second (1000ms)
    setInterval(updateTime, 1000); 
    
    // Run it once immediately on page load
    updateTime(); 
});