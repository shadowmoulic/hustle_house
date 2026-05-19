/**
 * Hustle House Shared Components
 * This script injects the shared Header and Footer into pages.
 */

const headerHTML = `
    <nav class="navbar">
        <div class="logo">
            <a href="/" class="nav-logo-link">
                <img src="/logo.png" alt="Hustle House Logo" style="height: 36px; width: auto; object-fit: contain;" />
                <span class="nav-logo-text">KGP HUSTLE HOUSE</span>
            </a>
        </div>
        <div class="nav-links">
            <a href="/talent">Talent</a>
            <a href="/mentor">Mentors</a>
            <div class="nav-item">
                <a href="/services">Services ▾</a>
                <div class="dropdown-menu">
                    <a href="/services/web-development">Web Development</a>
                    <a href="/services/seo">SEO & Growth</a>
                    <a href="/services/ai-automation">Ai Automation</a>
                    <a href="/services/design">Design & UI/UX</a>
                    <a href="/services/video-editing">Video Editing</a>
                    <a href="/services/digital-marketing">Digital Marketing</a>
                    <a href="/services/content-writing">Content Writing</a>
                </div>
            </div>
            <a href="/how-it-works">How It Works</a>
            <a href="/about">About</a>
            <a href="/scoper" class="scoper-pill-btn">Get Estimate</a>
            <a href="/contact" class="join-btn">Hire Us</a>
        </div>
        <button class="hamburger" id="hamburger-btn">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
        <a href="/talent">Talent</a>
        <a href="/mentor">Mentors</a>
        <a href="/services">Services</a>
        <a href="/how-it-works">How It Works</a>
        <a href="/about">About</a>
        <a href="/scoper">Get Estimate</a>
        <a href="/contact">Contact Us</a>
        <a href="/contact" class="join-btn">Hire Us</a>
    </div>
`;

const footerHTML = `
    <footer class="fat-footer section-glass-dark">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="logo" style="display: flex; align-items: center; gap: 10px; margin-bottom: 2rem;">
                        <img src="/logo.png" alt="Hustle House Logo" style="height: 40px; width: auto; object-fit: contain;" />
                        <span class="footer-logo-text">KGP HUSTLE HOUSE</span>
                    </div>
                    <p class="footer-desc">
                        The elite student talent network from IIT Kharagpur. We ship precision-engineered digital products for global innovators.
                    </p>
                    <div class="footer-contact-info">
                        <a href="tel:+919038315605" class="footer-contact-item">
                            <i class="fas fa-phone"></i> +91 90383 15605
                        </a>
                        <a href="https://maps.google.com/?q=IIT+Kharagpur,+West+Bengal,+India" target="_blank" class="footer-contact-item">
                            <i class="fas fa-map-marker-alt"></i> IIT Kharagpur, WB, India
                        </a>
                    </div>
                    <div class="footer-socials" style="margin-top: 2rem; display: flex; gap: 1.5rem;">
                        <a href="https://linkedin.com/company/hustlehouse" target="_blank"><i class="fab fa-linkedin"></i></a>
                        <a href="https://youtube.com/@sayakmoulic/" target="_blank"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                <div class="footer-column">
                    <h4 class="footer-header">Capabilities</h4>
                    <ul>
                        <li><a href="/services/web-development">Web Development</a></li>
                        <li><a href="/services/ai-automation">Ai Automation</a></li>
                        <li><a href="/services/seo">SEO & Growth</a></li>
                        <li><a href="/services/design">Design & UI/UX</a></li>
                        <li><a href="/services/video-editing">Video Editing</a></li>
                        <li><a href="/services/digital-marketing">Digital Marketing</a></li>
                        <li><a href="/services/content-writing">Content Writing</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4 class="footer-header">Network</h4>
                    <ul>
                        <li><a href="/talent">Specialists</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/scoper">Project Scoper</a></li>
                        <li><a href="/how-it-works">The Process</a></li>
                        <li><a href="/contact">Join Network</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4 class="footer-header">Connect</h4>
                    <ul>
                        <li><a href="https://wa.me/919038315605">Founder Direct</a></li>
                        <li><a href="/contact">Initiate Signal</a></li>
                        <li><a href="mailto:hello@hustlehouse.in">Official Mail</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p class="copyright">&copy; 2026 KGP Hustle House (kgphustlehouse.com) · Vetted IIT KGP Network</p>
                <div class="footer-legal">
                    <a href="/privacy">Privacy</a>
                    <a href="/terms">Terms</a>
                </div>
            </div>
        </div>
    </footer>
`;

const whatsappWidgetHTML = `
    <div class="whatsapp-widget">
        <a href="https://wa.me/919038315605?text=Hi%20Sayak,%20I'm%20interested%20in%20Hustle%20House." target="_blank" class="wa-bubble">
            <div class="wa-label">Contact Founder</div>
            <div class="wa-icon">
                <svg viewBox="0 0 448 512" width="24" height="24" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.4-8.6-44.6-27.6-16.5-14.7-27.6-32.8-30.8-38.4-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.6 5.6-9.3 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
            </div>
        </a>
    </div>
`;

// Theme Logic - Global Helper
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';

    if (isLight) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }

    // Header specific UI
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const sun = themeBtn.querySelector('.sun-icon');
        const moon = themeBtn.querySelector('.moon-icon');
        if (isLight) {
            if (sun) sun.style.display = 'block';
            if (moon) moon.style.display = 'none';
        } else {
            if (sun) sun.style.display = 'none';
            if (moon) moon.style.display = 'block';
        }
    }
}

function injectComponents() {
    // Initial theme apply
    applyTheme();

    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');

    if (headerContainer) {
        headerContainer.innerHTML = `
            <nav class="navbar">
                <div class="logo">
                    <a href="/" class="logo-container" style="text-decoration: none; display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                        <img src="/logo.png" alt="Hustle House Logo" class="nav-logo-img" style="height: 36px; width: auto; object-fit: contain;" />
                        <span class="silver-text nav-logo-text" style="font-family: 'Squada One', cursive; font-size: 1.8rem; letter-spacing: 1px; padding-top: 4px; white-space: nowrap;">KGP HUSTLE HOUSE</span>
                    </a>
                </div>
                <div class="nav-links">
                    <a href="/talent">Talent</a>
                    <a href="/mentor">Mentors</a>
                    <div class="nav-item">
                        <a href="/services">Services ▾</a>
                        <div class="dropdown-menu">
                            <a href="/services/web-development">Web Development</a>
                            <a href="/services/seo">SEO & Growth</a>
                            <a href="/services/ai-automation">Ai Automation</a>
                            <a href="/services/design">Design & UI/UX</a>
                            <a href="/services/video-editing">Video Editing</a>
                            <a href="/services/digital-marketing">Digital Marketing</a>
                            <a href="/services/content-writing">Content Writing</a>
                        </div>
                    </div>
                    <a href="/how-it-works">How It Works</a>
                    <a href="/about">About</a>
                    <a href="/scoper" class="scoper-pill-btn">Get Estimate</a>
                    <a href="/contact" class="join-btn">Hire Us</a>
                </div>

                <div class="nav-actions" style="display: flex; align-items: center; gap: 15px;">
                    <button id="theme-toggle" class="theme-toggle-btn" style="background: none; border: none; cursor: pointer; padding: 5px; display: flex; align-items: center; color: #fff; opacity: 0.8;">
                        <svg class="sun-icon" style="display: none;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                        <svg class="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                    </button>
                    <button class="hamburger" id="hamburger-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
            <div class="mobile-menu" id="mobile-menu">
                <a href="/talent">Talent</a>
                <a href="/mentor">Mentors</a>
                <a href="/services">Services</a>
                <a href="/how-it-works">How It Works</a>
                <a href="/about">About</a>
                <a href="/scoper">Get Estimate</a>
                <a href="/contact">Contact Us</a>
                <a href="/contact" class="join-btn">Hire Us</a>
            </div>
        `;

        // Re-apply theme UI to update buttons inside header
        applyTheme();

        const themeBtn = document.getElementById('theme-toggle');
        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.contains('light-mode');
            if (isLight) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            applyTheme();
        });

        // Hamburger Logic
        const btn = document.getElementById('hamburger-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                menu.classList.toggle('active');
            });
        }
    }

    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }

    // Inject WhatsApp Widget
    const waContainer = document.createElement('div');
    waContainer.innerHTML = whatsappWidgetHTML;
    document.body.appendChild(waContainer);

    // Highlight active link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Run Component Injection
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
} else {
    injectComponents();
}
