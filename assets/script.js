// STEP 1: DOM ELEMENT INITIALIZATION
// Select all interactive filter tab buttons from the document layout
const filterButtons = document.querySelectorAll('.tab-btn');
// Select all document profile cards resting inside the grid container
const documentCards = document.querySelectorAll('.document-card');

// STEP 2: EVENT LISTENER REGISTRATION
// Loop through each tab button and attach a click event trigger mechanism
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        // STEP 3: LOGIC EXECUTION FUNCTION
        // Inside the click handler:
        
        // A. Manage UI States: Remove the 'active' highlight class from the previous button 
        //    and apply it instantly to the currently clicked button.
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // B. Read Filters: Capture the value of the 'data-filter' attribute from the selected button.
        const selectedFilter = button.getAttribute('data-filter');
        
        // C. Filter Grid Cards: Loop through all 16 document cards and read their 'data-category'.
        documentCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            // - If the selected filter is 'all', show every card instantly.
            // - If the filter matches the card's specific category, show the card.
            if (selectedFilter === 'all' || selectedFilter === cardCategory) {
                card.style.display = 'flex'; // Restores the grid's card layout flex direction
            } else {
                // - Otherwise, hide the card from the display view seamlessly.
                card.style.display = 'none';
            }
        });
    });
});