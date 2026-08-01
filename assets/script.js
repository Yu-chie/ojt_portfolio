// ==================================================================
// SUPABASE CONFIGURATION CONFIG (PASTE YOUR KEYS HERE)
// ==================================================================
const SUPABASE_URL = "https://llvemwugtoimbghualtr.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdmVtd3VndG9pbWJnaHVhbHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzODMwNDgsImV4cCI6MjA5OTk1OTA0OH0.URCoD2Geq05czrpIbxgGDh-OiUxP9HfCZNmCPxwBEgY"; // Put your copied anon public key string here
const BUCKET_NAME = "ojt-documents";

// ==================================================================
// 1. FILTER SYSTEM ENGINE (TAB MECHANICS)
// ==================================================================
const filterButtons = document.querySelectorAll('.tab-btn:not(#admin-login-btn):not(#user-view-btn):not(#save-profile-btn)');
const documentCards = document.querySelectorAll('.document-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const selectedFilter = button.getAttribute('data-filter');
        
        documentCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (selectedFilter === 'all' || selectedFilter === cardCategory) {
                card.style.display = 'grid';
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
const userViewBtn = document.getElementById('user-view-btn');
const cancelLoginBtn = document.getElementById('cancel-login-btn');
const adminLoginSection = document.getElementById('admin-login-section');
const heroSection = document.getElementById('overview');
const mainContainer = document.getElementById('documents');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('admin-password');

const displayCompany = document.getElementById('display-company');
const displayRole = document.getElementById('display-role');
const displayHours = document.getElementById('display-hours');
const adminCvUpload = document.getElementById('admin-cv-upload');
const adminSaveBar = document.getElementById('admin-save-bar');
const saveProfileBtn = document.getElementById('save-profile-btn');

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
    passwordInput.style.borderColor = ''; 
});

// Enable Admin Mode Controls
function enableAdminMode() {
    adminLoginBtn.style.display = 'none';
    userViewBtn.style.display = 'inline-block';
    if (adminSaveBar) adminSaveBar.style.display = 'block';

    document.querySelectorAll('.admin-upload-btn, .admin-weekly-uploads').forEach(el => {
        if (el.classList.contains('admin-weekly-uploads')) {
            el.style.display = 'flex';
        } else {
            el.style.display = 'inline-block';
        }
    });

    if (adminCvUpload) adminCvUpload.style.display = 'inline-block';
    
    [displayCompany, displayRole, displayHours].forEach(el => {
        if (el) {
            el.contentEditable = "true";
            el.style.background = "rgba(100, 255, 218, 0.1)";
            el.style.borderBottom = "1px dashed var(--accent-cyan)";
        }
    });

    activateUploadListeners();
}

// Exit Admin Mode back to Read-Only User View
function disableAdminMode() {
    adminLoginBtn.style.display = 'inline-block';
    userViewBtn.style.display = 'none';
    if (adminSaveBar) adminSaveBar.style.display = 'none';

    document.querySelectorAll('.admin-upload-btn, .admin-weekly-uploads').forEach(el => {
        el.style.display = 'none';
    });

    if (adminCvUpload) adminCvUpload.style.display = 'none';

    [displayCompany, displayRole, displayHours].forEach(el => {
        if (el) {
            el.contentEditable = "false";
            el.style.background = "transparent";
            el.style.borderBottom = "none";
        }
    });
}

userViewBtn.addEventListener('click', disableAdminMode);

// Manual Save Button Logic
if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => {
        if (displayCompany) localStorage.setItem('profile_company', displayCompany.innerText);
        if (displayRole) localStorage.setItem('profile_role', displayRole.innerText);
        if (displayHours) localStorage.setItem('profile_hours', displayHours.innerText);

        const originalText = saveProfileBtn.innerHTML;
        saveProfileBtn.innerHTML = `<i class="fa-solid fa-check"></i> Saved!`;
        saveProfileBtn.style.borderColor = '#2ecc71';
        saveProfileBtn.style.color = '#2ecc71';

        setTimeout(() => {
            saveProfileBtn.innerHTML = originalText;
            saveProfileBtn.style.borderColor = 'var(--accent-cyan)';
            saveProfileBtn.style.color = 'var(--accent-cyan)';
        }, 2000);
    });
}

// Global Interceptor for Placeholder Clicks (Generates a dynamic Deep Ocean styled notice page)
document.addEventListener('click', (e) => {
    const target = e.target.closest('.target-link, .weekly-link, #view-cv-btn');
    if (target && (target.getAttribute('href') === '#' || target.hasAttribute('data-placeholder'))) {
        e.preventDefault();
        
        // Find document title dynamically
        const card = target.closest('.document-card');
        const docName = card ? (card.querySelector('.card-title')?.innerText || 'Document') : 'Curriculum Vitae';
        
        const placeholderHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${docName} - Pending Document</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                <style>
                    body {
                        margin: 0; padding: 0; min-height: 100vh;
                        background: radial-gradient(ellipse at 50% 115%, #38bdf8 0%, #227093 10%, #112d4e 35%, #0a192f 70%, #020c1b 100%);
                        color: #e6f1ff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        display: flex; justify-content: center; align-items: center; text-align: center;
                    }
                    .box {
                        background-color: #112240; border: 1px solid rgba(100, 255, 218, 0.2);
                        padding: 40px; border-radius: 12px; max-width: 480px; width: 90%;
                        box-shadow: 0 20px 40px -15px rgba(2, 12, 27, 0.7);
                    }
                    i { font-size: 48px; color: #64ffda; margin-bottom: 20px; }
                    h1 { font-size: 22px; margin-bottom: 12px; font-weight: 600; color: #e6f1ff; }
                    p { font-size: 14px; color: #8892b0; line-height: 1.6; margin-bottom: 24px; }
                    .badge {
                        display: inline-block; background-color: rgba(241, 196, 15, 0.1);
                        color: #f1c40f; border: 1px solid rgba(241, 196, 15, 0.2);
                        padding: 6px 14px; border-radius: 50px; font-size: 12px; font-weight: 600;
                        text-transform: uppercase; letter-spacing: 0.5px;
                    }
                </style>
            </head>
            <body>
                <div class="box">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <h1>${docName}</h1>
                    <span class="badge">Status: Processing</span>
                    <p style="margin-top: 20px;">This academic document is currently undergoing verification or formatting. It will be made publicly accessible once uploaded.</p>
                </div>
            </body>
            </html>
        `;

        const blob = new Blob([placeholderHTML], { type: 'text/html' });
        const placeholderURL = URL.createObjectURL(blob);
        window.open(placeholderURL, '_blank');
    }
});

// Handle password submission checking event triggers
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (passwordInput.value === '@ShimajirouTenma17') {
        enableAdminMode();
        cancelLoginBtn.click();
    } else {
        passwordInput.style.borderColor = '#ff4a5a';
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
                } else {
                    console.error('Cloud rejected upload processing routines with status:', response.status);
                }
            } catch (err) {
                console.error('Network or Upload Error:', err);
            } finally {
                uploadLabel.innerHTML = originalText;
            }
        });
    });

    // Dynamic CV Storage Handler
    const cvInput = document.getElementById('secure-cv-input');
    if (cvInput) {
        cvInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const originalText = adminCvUpload.innerHTML;
            adminCvUpload.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Uploading CV...`;

            const storagePath = `curriculum_vitae.pdf`;
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
                    localStorage.setItem('url_cv', publicUrl);
                    const viewCvBtn = document.getElementById('view-cv-btn');
                    if (viewCvBtn) {
                        viewCvBtn.href = publicUrl;
                        viewCvBtn.removeAttribute('data-placeholder');
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                adminCvUpload.innerHTML = originalText;
            }
        });
    }

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
                    
                    const weekLink = card.querySelector(`.w-link[data-week="${weekNum}"]`);
                    if (weekLink) {
                        weekLink.href = publicUrl;
                        weekLink.removeAttribute('data-placeholder');
                    }
                } else {
                    console.error('Weekly upload rejected with status:', response.status);
                }
            } catch (err) {
                console.error('Network or Upload Error:', err);
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
        targetLink.removeAttribute('data-placeholder');
    }
}

// Scan and recover document values when portfolio loads up
function restorePersistedState() {
    // Restore profile configuration parameters
    const savedCompany = localStorage.getItem('profile_company');
    if (savedCompany && displayCompany) displayCompany.innerText = savedCompany;

    const savedRole = localStorage.getItem('profile_role');
    if (savedRole && displayRole) displayRole.innerText = savedRole;

    const savedHours = localStorage.getItem('profile_hours');
    if (savedHours && displayHours) displayHours.innerText = savedHours;

    const savedCvUrl = localStorage.getItem('url_cv');
    const viewCvBtn = document.getElementById('view-cv-btn');
    if (savedCvUrl && viewCvBtn) {
        viewCvBtn.href = savedCvUrl;
        viewCvBtn.removeAttribute('data-placeholder');
    }

    documentCards.forEach(card => {
        const cardId = card.getAttribute('data-id');
        const savedUrl = localStorage.getItem(`url_${cardId}`);
        if (savedUrl) {
            updateCardUI(card, savedUrl);
        }

        // Check nested week item nodes inside monthly cards
        const weekLinks = card.querySelectorAll('.w-link');
        let standardVerified = false;
        
        weekLinks.forEach(link => {
            const wNum = link.getAttribute('data-week');
            const savedWeekUrl = localStorage.getItem(`url_week_${wNum}`);
            if (savedWeekUrl) {
                link.href = savedWeekUrl;
                link.removeAttribute('data-placeholder');
                standardVerified = true;
            }
        });

        if (standardVerified && card.querySelector('.card-status')) {
            card.querySelector('.card-status').className = "card-status status-verified";
            card.querySelector('.card-status').innerText = "Verified";
        }
    });
}

restorePersistedState();