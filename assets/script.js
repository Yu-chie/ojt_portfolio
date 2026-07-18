// ==================================================================
// 1. FILTER SYSTEM ENGINE (TAB MECHANICS)
// ==================================================================
const filterButtons = document.querySelectorAll('.tab-btn:not(#admin-login-btn)');
const documentCards = document.querySelectorAll('.document-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const selectedFilter = button.getAttribute('data-filter');
        
        documentCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (selectedFilter === 'all' || selectedFilter === cardCategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ==================================================================
// 2. ADMINISTRATIVE INLINE REDIRECT INTERACTION
// ==================================================================
const adminLoginBtn = document.getElementById('admin-login-btn');
const cancelLoginBtn = document.getElementById('cancel-login-btn');
const adminLoginSection = document.getElementById('admin-login-section');
const heroSection = document.getElementById('overview');
const mainContainer = document.getElementById('documents');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('admin-password');

// Redirect from dashboard layout to login panel view layout
adminLoginBtn.addEventListener('click', () => {
    heroSection.style.display = 'none';
    mainContainer.style.display = 'none';
    adminLoginSection.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Return safely to main portfolio workspace view layout
cancelLoginBtn.addEventListener('click', () => {
    adminLoginSection.style.display = 'none';
    heroSection.style.display = 'flex';
    mainContainer.style.display = 'block';
    passwordInput.value = '';
});

// Handle password submission checking event triggers
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Placeholder authentication key evaluation checker logic
    if (passwordInput.value === '@ShimajirouTenma17') {
        alert('Authentication successful! Management mode enabled.');
        
        // Show all administrative upload interface action controllers
        document.querySelectorAll('.admin-upload-btn, .admin-weekly-uploads').forEach(el => {
            el.style.display = 'flex';
        });
        
        // Close form panel layer views and restore presentation components
        cancelLoginBtn.click();
    } else {
        alert('Invalid administrative passphrase key pattern.');
        passwordInput.value = '';
    }
});