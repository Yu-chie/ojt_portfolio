// ==================================================================
// SUPABASE CONFIGURATION CONFIG (PASTE YOUR KEYS HERE)
// ==================================================================
const SUPABASE_URL = "https://llvemwugtoimbghualtr.supabase.co"; 
const SUPABASE_ANON_KEY = "YOUR_ANON_PUBLIC_KEY_HERE"; // Put your copied anon public key string here
const BUCKET_NAME = "ojt-documents";

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
            if (el.classList.contains('admin-weekly-uploads')) {
                el.style.display = 'flex';
            } else {
                el.style.display = 'inline-block';
            }
        });
        
        // Initialize the secure interactive upload listeners now that admin is verified
        activateUploadListeners();
        
        // Close form panel layer views and restore presentation components
        cancelLoginBtn.click();
    } else {
        alert('Invalid administrative passphrase key pattern.');
        passwordInput.value = '';
    }
});

// ==================================================================
// 3. CLOUD STORAGE UPLOAD & STATE PERSISTENCE ENGINE
// ==================================================================

// Setup file selection capture listeners on all hidden input elements
function activateUploadListeners() {
    // Single document cards upload handler
    document.querySelectorAll('.secure-file-input').forEach(input => {
        // Clear old event listeners to prevent duplicate uploads
        input.replaceWith(input.cloneNode(true));
    });

    document.querySelectorAll('.secure-file-input').forEach(input => {
        input.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const card = input.closest('.document-card');
            const cardId = card.getAttribute('data-id');
            const uploadLabel = input.closest('.admin-upload-btn');
            
            // Visual loading state updates
            const originalText = uploadLabel.innerHTML;
            uploadLabel.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Uploading...`;

            const fileExt = file.name.split('.').pop();
            const storagePath = `${cardId}.${fileExt}`;
            const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${storagePath}`;

            try {
                // Send standard binary file upload straight to the Supabase REST API
                const response = await fetch(uploadUrl, {
                    method: 'POST',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'x-upsert': 'true' // Automatically overwrites existing documents smoothly
                    },
                    body: file
                });

                if (response.ok) {
                    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${storagePath}`;
                    
                    // Update state variables locally so links load automatically next time
                    localStorage.setItem(`url_${cardId}`, publicUrl);
                    updateCardUI(card, publicUrl);
                    alert('Document saved securely in cloud storage bucket!');
                } else {
                    const err = await response.json();
                    alert(`Cloud rejected upload: ${err.message || response.statusText}`);
                }
            } catch (err) {
                console.error(err);
                alert('Connection tracking pipeline error occurred.');
            } finally {
                uploadLabel.innerHTML = originalText;
            }
        });
    });

    // Nested weekly reports upload handler
    document.querySelectorAll('.secure-week-input').forEach(input => {
        input.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const card = input.closest('.document-card');
            const weekNum = input.getAttribute('data-week');
            const fileExt = file.name.split('.').pop();
            const storagePath = `week_${weekNum}.${fileExt}`;
            const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${storagePath}`;

            try {
                const response = await fetch(uploadUrl, {
                    method: 'POST',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'x-upsert': 'true'
                    },
                    body: file
                });

                if (response.ok) {
                    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${storagePath}`;
                    localStorage.setItem(`url_week_${weekNum}`, publicUrl);
                    
                    // Display and link the target hidden nested weekly text anchor
                    const weekLink = card.querySelector(`.w-link[data-week="${weekNum}"]`);
                    if (weekLink) {
                        weekLink.href = publicUrl;
                        weekLink.style.display = 'flex';
                    }
                    alert(`Week ${weekNum} link synced successfully.`);
                }
            } catch (err) {
                console.error(err);
            }
        });
    });
}

// UI Modifier update logic states 
function updateCardUI(card, url) {
    const statusBadge = card.querySelector('.card-status');
    if (statusBadge) {
        statusBadge.className = "card-status status-verified";
        statusBadge.innerText = "Verified";
    }
    const targetLink = card.querySelector('.target-link');
    if (targetLink) {
        targetLink.href = url;
        targetLink.style.display = 'inline-flex';
    }
}

// Scan and recover document values when portfolio loads up
function restorePersistedState() {
    documentCards.forEach(card => {
        const cardId = card.getAttribute('data-id');
        const savedUrl = localStorage.getItem(`url_${cardId}`);
        if (savedUrl) {
            updateCardUI(card, savedUrl);
            // Hide processing badge since file is active
        }

        // Check nested week item nodes inside monthly cards
        const weekLinks = card.querySelectorAll('.w-link');
        let standardVerified = false;
        
        weekLinks.forEach(link => {
            const wNum = link.getAttribute('data-week');
            const savedWeekUrl = localStorage.getItem(`url_week_${wNum}`);
            if (savedWeekUrl) {
                link.href = savedWeekUrl;
                link.style.display = 'flex';
                standardVerified = true;
            }
        });

        if (standardVerified && card.querySelector('.card-status')) {
            card.querySelector('.card-status').className = "card-status status-verified";
            card.querySelector('.card-status').innerText = "Verified";
        }
    });
}

// Run state updates instantly on application generation entry points
restorePersistedState();