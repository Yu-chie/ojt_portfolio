// STEP 1: DOM ELEMENT INITIALIZATION
// Select all interactive filter tab buttons from the document layout
// Select all document profile cards resting inside the grid container

// STEP 2: EVENT LISTENER REGISTRATION
// Loop through each tab button and attach a click event trigger mechanism

// STEP 3: LOGIC EXECUTION FUNCTION
// Inside the click handler:
// A. Manage UI States: Remove the 'active' highlight class from the previous button 
//    and apply it instantly to the currently clicked button.
// B. Read Filters: Capture the value of the 'data-filter' attribute from the selected button.
// C. Filter Grid Cards: Loop through all 16 document cards and read their 'data-category'.
//    - If the selected filter is 'all', show every card instantly.
//    - If the filter matches the card's specific category, show the card.
//    - Otherwise, hide the card from the display view seamlessly.