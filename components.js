/**
 * Hustle House Shared Components
 * This script injects the shared Header and Footer into pages.
 */

const headerHTML = `
    <nav class="navbar">
        <div class="logo">
            <a href="/" style="text-decoration: none; display: flex; align-items: center; gap: 10px;">
                <img src="/logo.png" alt="Hustle House Logo" style="height: 36px; width: auto; object-fit: contain;" />
                <span class="silver-text" style="font-family: 'Outfit', sans-serif; font-size: 1.4rem; letter-spacing: -0.5px; padding-top: 4px;">HUSTLE HOUSE</span>
            </a>
        </div>
        <div class="nav-links">
            <a href="/talent">Talent</a>
            <div class="nav-item">
                <a href="/services">Services ▾</a>
                <div class="dropdown-menu">
                    <a href="/services/web-development">Web Development</a>
                    <a href="/services/seo">SEO & Growth</a>
                    <a href="/services/ai-automation">AI Automation</a>
                    <a href="/services/design">Design & UI/UX</a>
                    <a href="/services/video-editing">Video Editing</a>
                    <a href="/services/digital-marketing">Digital Marketing</a>
                    <a href="/services/content-writing">Content Writing</a>
                </div>
            </div>
            <a href="/how-it-works">How It Works</a>
            <a href="/scoper" style="font-weight: 700; color: var(--primary);">Get Estimate</a>
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
        <a href="/services">Services</a>
        <a href="/how-it-works">How It Works</a>
        <a href="/scoper">Get Estimate</a>
        <a href="/contact">Contact Us</a>
        <a href="/contact" class="join-btn">Hire Us</a>
    </div>
`;

const footerHTML = `
    <footer class="fat-footer section-glass-dark" style="margin-top: 8rem; padding: 8rem 0 4rem;">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="logo" style="display: flex; align-items: center; gap: 10px; margin-bottom: 2rem;">
                        <img src="/logo.png" alt="Hustle House Logo" style="height: 40px; width: auto; object-fit: contain;" />
                        <span class="silver-text" style="font-family: 'Squada One', cursive; font-size: 2rem; letter-spacing: 1px; white-space: nowrap;">HUSTLE HOUSE</span>
                    </div>
                    <p class="footer-desc" style="max-width: 320px; opacity: 0.6; line-height: 1.7; font-size: 0.95rem;">
                        The elite student talent network from IIT Kharagpur. We ship precision-engineered digital products for global innovators.
                    </p>
                    <div class="footer-socials" style="margin-top: 2rem; display: flex; gap: 1.5rem;">
                        <a href="#" style="color: white; opacity: 0.5; transition: 0.3s;"><i class="fab fa-twitter"></i></a>
                        <a href="#" style="color: white; opacity: 0.5; transition: 0.3s;"><i class="fab fa-linkedin"></i></a>
                        <a href="#" style="color: white; opacity: 0.5; transition: 0.3s;"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="footer-column">
                    <h4 class="footer-header" style="color: white; font-weight: 800; font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 2rem; opacity: 0.4;">Capabilities</h4>
                    <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem;">
                        <li><a href="/services/web-development" style="color: white; text-decoration: none; opacity: 0.6; font-size: 0.95rem; transition: 0.3s;">Web Platforms</a></li>
                        <li><a href="/services/ai-automation" style="color: white; text-decoration: none; opacity: 0.6; font-size: 0.95rem; transition: 0.3s;">AI Orchestration</a></li>
                        <li><a href="/services/seo" style="color: white; text-decoration: none; opacity: 0.6; font-size: 0.95rem; transition: 0.3s;">Growth Engines</a></li>
                        <li><a href="/services/design" style="color: white; text-decoration: none; opacity: 0.6; font-size: 0.95rem; transition: 0.3s;">UI/UX Design</a></li>
                        <li><a href="/services/video-editing" style="color: white; text-decoration: none; opacity: 0.6; font-size: 0.95rem; transition: 0.3s;">Cinematic Motion</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4 class="footer-header" style="color: white; font-weight: 800; font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 2rem; opacity: 0.4;">Network</h4>
                    <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem;">
                        <li><a href="/talent" style="color: white; text-decoration: none; opacity: 0.6; font-size: 0.95rem; transition: 0.3s;">Specialists</a></li>
                        <li><a href="/scoper" style="color: white; text-decoration: none; opacity: 0.6; font-size: 0.95rem; transition: 0.3s;">Project Scoper</a></li>
                        <li><a href="/how-it-works" style="color: white; text-decoration: none; opacity: 0.6; font-size: 0.95rem; transition: 0.3s;">The Process</a></li>
                        <li><a href="/contact" style="color: white; text-decoration: none; opacity: 0.6; font-size: 0.95rem; transition: 0.3s;">Join Network</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4 class="footer-header" style="color: white; font-weight: 800; font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 2rem; opacity: 0.4;">Connect</h4>
                    <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem;">
                        <li><a href="https://wa.me/919038315605" style="color: white; text-decoration: none; opacity: 0.6; font-size: 0.95rem; transition: 0.3s;">Founder Direct</a></li>
                        <li><a href="/contact" style="color: white; text-decoration: none; opacity: 0.6; font-size: 0.95rem; transition: 0.3s;">Initiate Signal</a></li>
                        <li><a href="mailto:hello@hustlehouse.in" style="color: white; text-decoration: none; opacity: 0.6; font-size: 0.95rem; transition: 0.3s;">Official Mail</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom" style="margin-top: 6rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 2rem;">
                <p class="copyright" style="opacity: 0.4; font-size: 0.85rem;">&copy; 2026 Hustle House · Vetted IIT KGP Network</p>
                <div class="footer-legal" style="display: flex; gap: 2rem; font-size: 0.85rem; opacity: 0.4;">
                    <a href="/privacy" style="color: white; text-decoration: none;">Privacy</a>
                    <a href="/terms" style="color: white; text-decoration: none;">Terms</a>
                </div>
            </div>
        </div>
    </footer>
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
                        <span class="silver-text nav-logo-text" style="font-family: 'Squada One', cursive; font-size: 1.8rem; letter-spacing: 1px; padding-top: 4px; white-space: nowrap;">HUSTLE HOUSE</span>
                    </a>
                </div>
                <div class="nav-links">
                    <a href="/talent">Talent</a>
                    <div class="nav-item">
                        <a href="/services">Services ▾</a>
                        <div class="dropdown-menu">
                            <a href="/services/web-development">Web Development</a>
                            <a href="/services/seo">SEO & Growth</a>
                            <a href="/services/ai-automation">AI Automation</a>
                            <a href="/services/design">Design & UI/UX</a>
                            <a href="/services/video-editing">Video Editing</a>
                            <a href="/services/digital-marketing">Digital Marketing</a>
                            <a href="/services/content-writing">Content Writing</a>
                        </div>
                    </div>
                    <a href="/how-it-works">How It Works</a>
                    <a href="/scoper" class="scoper-pill-btn">Get Estimate</a>
                    <a href="/contact" class="join-btn" style="margin-left: 1rem;">Hire Us</a>
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
                <a href="/services">Services</a>
                <a href="/scoper">Get Estimate</a>
                <a href="/how-it-works">How It Works</a>
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
