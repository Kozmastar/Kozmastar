// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const adminToggle = document.getElementById('admin-toggle');
    const loginModal = document.getElementById('login-modal');
    const loginClose = document.getElementById('login-close');
    const loginForm = document.getElementById('login-form');
    const adminPassword = document.getElementById('admin-password');
    const loginError = document.getElementById('login-error');
    const adminSection = document.getElementById('admin-section');
    const mainContent = document.getElementById('main-content');
    const adminLogout = document.getElementById('admin-logout');
    const publicProductsGrid = document.getElementById('public-products-grid');
    
    // Admin password
    const ADMIN_PASS = "user5";
    
    // Toggle login modal
    adminToggle.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });
    
    // Close modal
    loginClose.addEventListener('click', () => {
        loginModal.style.display = 'none';
        loginError.style.display = 'none';
    });
    
    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if(adminPassword.value === ADMIN_PASS) {
            // Successful login
            loginModal.style.display = 'none';
            mainContent.style.display = 'none';
            adminSection.style.display = 'block';
            adminPassword.value = '';
            loginError.style.display = 'none';
        } else {
            // Incorrect password
            loginError.style.display = 'block';
            adminPassword.value = '';
        }
    });
    
    // Logout functionality
    adminLogout.addEventListener('click', () => {
        adminSection.style.display = 'none';
        mainContent.style.display = 'block';
    });
    
    // Logo drag and drop functionality
    const logoDropArea = document.getElementById('admin-logo-drop');
    const logoImage = document.getElementById('logo-image');
    const adminLogoImage = document.getElementById('admin-logo-image');
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        logoDropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        logoDropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        logoDropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        logoDropArea.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.9)';
        logoDropArea.style.transform = 'scale(1.05)';
    }
    
    function unhighlight() {
        logoDropArea.style.boxShadow = '0 0 20px rgba(255, 126, 185, 0.6)';
        logoDropArea.style.transform = 'scale(1)';
    }
    
    // Handle dropped files
    logoDropArea.addEventListener('drop', handleLogoDrop, false);
    
    function handleLogoDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // Update both logo images (public and admin)
                    logoImage.src = e.target.result;
                    adminLogoImage.src = e.target.result;
                };
                
                reader.readAsDataURL(file);
            } else {
                alert('Please drop an image file!');
            }
        }
    }
    
    // Click to upload functionality for logo
    logoDropArea.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // Update both logo images (public and admin)
                    logoImage.src = e.target.result;
                    adminLogoImage.src = e.target.result;
                };
                
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });
    
    // Admin Products drag and drop functionality
    const adminDropArea = document.getElementById('admin-drop-area');
    const adminFileInput = document.getElementById('admin-file-input');
    const adminBrowseBtn = document.getElementById('admin-browse-btn');
    
    // Set up browse button
    adminBrowseBtn.addEventListener('click', () => {
        adminFileInput.click();
    });
    
    // Handle file selection
    adminFileInput.addEventListener('change', handleAdminFiles);
    
    // Set up drag and drop for products
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        adminDropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        adminDropArea.addEventListener(eventName, highlightAdminArea, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        adminDropArea.addEventListener(eventName, unhighlightAdminArea, false);
    });
    
    function highlightAdminArea() {
        adminDropArea.classList.add('active');
    }
    
    function unhighlightAdminArea() {
        adminDropArea.classList.remove('active');
    }
    
    adminDropArea.addEventListener('drop', handleAdminDrop, false);
    
    function handleAdminDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleAdminFiles({target: {files}});
    }
    
    function handleAdminFiles(e) {
        const files = e.target.files;
        
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // Add to public products grid
                        addProductToPublicGrid(e.target.result);
                    };
                    
                    reader.readAsDataURL(file);
                }
            }
        }
        
        // Reset file input to allow uploading same files again
        adminFileInput.value = '';
    }
    
    // Add product to public grid
    function addProductToPublicGrid(imageSrc) {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        
        const img = document.createElement('img');
        img.className = 'product-img';
        img.src = imageSrc;
        img.alt = 'Hair Accessory Product';
        
        productItem.appendChild(img);
        publicProductsGrid.appendChild(productItem);
    }
    
    // Add click functionality to admin drop area
    adminDropArea.addEventListener('click', function() {
        adminFileInput.click();
    });
});