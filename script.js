// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation
                updateActiveNav(this);
            }
        });
    });
    
    // Update active navigation item
    function updateActiveNav(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    // Scroll spy functionality
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const activeNavLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);
                if (activeNavLink) {
                    updateActiveNav(activeNavLink);
                }
            }
        });
    });
    
    // Add fade-in animation to cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all chapter cards
    const chapterCards = document.querySelectorAll('.chapter-card');
    chapterCards.forEach(card => {
        observer.observe(card);
    });
    
    // Mobile menu toggle (for future mobile optimization)
    const createMobileMenu = () => {
        const nav = document.querySelector('.main-nav');
        const navList = nav.querySelector('ul');
        
        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.display = 'none';
        
        nav.insertBefore(hamburger, navList);
        
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('mobile-open');
        });
        
        // Show/hide hamburger based on screen size
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'block';
            } else {
                hamburger.style.display = 'none';
                navList.classList.remove('mobile-open');
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    };
    
    createMobileMenu();
    
    // Add click tracking for analytics (placeholder)
    const trackChapterClick = (chapterName) => {
        console.log(`Chapter clicked: ${chapterName}`);
        // Add analytics tracking here if needed
    };
    
    // Add click handlers to chapter links
    const chapterLinks = document.querySelectorAll('.chapter-card a');
    chapterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const chapterName = this.textContent;
            trackChapterClick(chapterName);
            
            // Check if this is the ch1-1.html link (which now exists)
            if (this.getAttribute('href') === 'chapters/ch1-1.html') {
                // Allow normal navigation for existing chapter
                return true;
            }
            
            // For other chapters, prevent navigation and show placeholder
            e.preventDefault();
            alert(`เนื้อหา "${chapterName}" จะเพิ่มในขั้นตอนถัดไป`);
        });
    });
    
    // Add search functionality (basic)
    const addSearchBox = () => {
        const header = document.querySelector('header .container');
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.marginTop = '1rem';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'ค้นหาเนื้อหา...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 25px;
            width: 300px;
            max-width: 100%;
            font-size: 1rem;
            outline: none;
        `;
        
        searchContainer.appendChild(searchInput);
        header.appendChild(searchContainer);
        
        // Basic search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const chapterCards = document.querySelectorAll('.chapter-card');
            
            chapterCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = searchTerm === '' ? 'block' : 'none';
                }
            });
        });
    };
    
    addSearchBox();
});