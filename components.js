/**
 * Hustle House Shared Components
 * This script injects the shared Header and Footer into pages.
 */

const headerHTML = `
    <nav class="navbar">
        <div class="logo">
            <a href="/" style="text-decoration: none;">
                <span class="logo-hustle">HUSTLE</span><span class="logo-house">HOUSE</span>
            </a>
        </div>
        <div class="nav-links">
            <a href="/talent">Find Talent</a>
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
            <a href="/how-it-works">How it Works</a>
            <a href="/contact" class="join-btn">Hire Us</a>
        </div>
        <button class="hamburger" id="hamburger-btn">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
        <a href="/talent">Find Talent</a>
        <a href="/services">Services</a>
        <a href="/how-it-works">How it Works</a>
        <a href="/onboarding" class="join-btn">Join Network</a>
        <a href="/contact" class="join-btn" style="background: white; color: black !important; margin-top: 1rem;">Hire Us</a>
    </div>
`;

const footerHTML = `
    <footer class="fat-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="logo small">
                        <span class="logo-hustle">HUSTLE</span><span class="logo-house">HOUSE</span>
                    </div>
                    <p>The elite IIT Kharagpur creator community. We build, grow, and automate for global businesses.</p>
                </div>
                <div class="footer-column">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="/services/web-development">Web Development</a></li>
                        <li><a href="/services/seo">SEO & Growth</a></li>
                        <li><a href="/services/ai-automation">AI Automation</a></li>
                        <li><a href="/services/design">Design & UI/UX</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Talent</h4>
                    <ul>
                        <li><a href="/talent">Browse Talent</a></li>
                        <li><a href="/talent/sayak">SEO Expert</a></li>
                        <li><a href="/talent/rahul">Web Dev Expert</a></li>
                        <li><a href="/onboarding">Join Network</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/how-it-works">How it Works</a></li>
                        <li><a href="/pricing">Pricing</a></li>
                        <li><a href="/privacy">Privacy</a> | <a href="/terms">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Hustle House. Built for the ambitious students of IIT Kharagpur.</p>
                <div class="footer-links">
                    <a href="/contact" style="margin-left: 20px;">Support</a>
                </div>
            </div>
        </div>
    </footer>
`;

function injectComponents() {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');

    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;

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
