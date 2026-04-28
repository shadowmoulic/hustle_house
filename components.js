/**
 * Hustle House Shared Components
 * This script injects the shared Header and Footer into pages.
 */

const headerHTML = `
    <nav class="navbar">
        <div class="logo">
            <a href="/" style="text-decoration: none;">
                <span class="logo-hustle">HUSTLEHOUSE</span>
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
                </div>
            </div>
            <a href="/how-it-works">How It Works</a>
            <a href="/onboarding">Join Network</a>
            <a href="/contact" class="join-btn">Hire Us →</a>
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
        <a href="/onboarding">Join Network</a>
        <a href="/contact" class="join-btn">Hire Us →</a>
    </div>
`;

const footerHTML = `
    <footer class="fat-footer" style="background: #000; border-top: 1px solid rgba(255,255,255,0.03); padding-top: 8rem;">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="logo small">
                        <span class="logo-hustle silver-text" style="font-size: 2rem; letter-spacing: 4px;">HUSTLEHOUSE</span>
                    </div>
                    <p style="color: rgba(255,255,255,0.4); font-size: 1rem; margin-top: 1.5rem; max-width: 300px;">Built by IIT Kharagpur students. Delivering high-precision solutions for global innovators.</p>
                </div>
                <div class="footer-column">
                    <h4 class="footer-silver-header">Services</h4>
                    <ul>
                        <li><a href="/services/web-development">Web Development</a></li>
                        <li><a href="/services/seo">SEO & Growth</a></li>
                        <li><a href="/services/ai-automation">AI Automation</a></li>
                        <li><a href="/services/design">Design & UI/UX</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4 class="footer-silver-header">Talent</h4>
                    <ul>
                        <li><a href="/talent">Browse Talent</a></li>
                        <li><a href="/onboarding">Join Network</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4 class="footer-silver-header">Company</h4>
                    <ul>
                        <li><a href="/about">About</a></li>
                        <li><a href="/how-it-works">How It Works</a></li>
                        <li><a href="/pricing">Pricing</a></li>
                        <li><a href="/privacy">Privacy · Terms</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom" style="margin-top: 8rem; border-top: 1px solid rgba(255,255,255,0.03); padding: 4rem 0;">
                <p style="color: rgba(255,255,255,0.3); font-size: 0.9rem;">&copy; 2026 KGP Hustle House. All rights reserved.</p>
                <div class="footer-links">
                    <a href="/contact" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.9rem; font-weight: 600;">Support / Contact</a>
                </div>
            </div>
        </div>
    </footer>
`;


function injectComponents() {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');

    if (headerContainer) {
        headerContainer.innerHTML = `
            <nav class="navbar">
                <div class="logo">
                    <a href="/" style="text-decoration: none;">
                        <span class="logo-hustle silver-text">HUSTLEHOUSE</span>
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
                        </div>
                    </div>
                    <a href="/how-it-works">How It Works</a>
                    <a href="/onboarding">Join Network</a>
                    
                    <button id="theme-toggle" class="theme-toggle-btn" style="background: none; border: none; cursor: pointer; padding: 5px; margin-left: 15px; display: flex; align-items: center; color: #fff; opacity: 0.8;">
                        <svg class="sun-icon" style="display: none;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                        <svg class="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                    </button>

                    <a href="/contact" class="join-btn">Hire Us →</a>
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
                <a href="/onboarding">Join Network</a>
                <a href="/contact" class="join-btn">Hire Us →</a>
            </div>
        `;

        // Theme Toggle Logic
        const themeBtn = document.getElementById('theme-toggle');
        const sun = themeBtn.querySelector('.sun-icon');
        const moon = themeBtn.querySelector('.moon-icon');

        const updateThemeUI = (isLight) => {
            if (isLight) {
                document.body.classList.add('light-mode');
                sun.style.display = 'block';
                moon.style.display = 'none';
            } else {
                document.body.classList.remove('light-mode');
                sun.style.display = 'none';
                moon.style.display = 'block';
            }
        };

        // Default to light or saved preference
        let isLight = localStorage.getItem('theme') !== 'dark';
        updateThemeUI(isLight);

        themeBtn.addEventListener('click', () => {
            isLight = !document.body.classList.contains('light-mode');
            updateThemeUI(isLight);
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
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

// Run on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
} else {
    injectComponents();
}
