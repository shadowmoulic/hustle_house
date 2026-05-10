// Hustle House Main Logic

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initSearch();
    initContactForm();
    initCinematicInteractions();

    const urlParams = new URL(window.location.href).searchParams;
    const initialFilter = urlParams.get('filter');

    // If we are on the talent page, fetch data
    if (document.getElementById('talent-grid')) {
        fetchTalent(initialFilter, 'talent-grid');
    }
    // Homepage preview
    if (document.getElementById('talent-grid-preview')) {
        fetchTalent('all', 'talent-grid-preview', 3);
    }
});

function initCinematicInteractions() {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animate = () => {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animate);
    };
    animate();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .talent-card, .step-card, .wa-bubble');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Reveal on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .talent-card, .process-steps > div').forEach(el => {
        revealObserver.observe(el);
    });
}

// Helper to generate a URL-safe slug from name
function generateSlug(name) {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

// 1. Fetch & Render Accepted Talent from Supabase
async function fetchTalent(initialFilter = 'all', targetGridId = 'talent-grid', limit = null) {
    const grid = document.getElementById(targetGridId);
    const loadingId = targetGridId === 'talent-grid-preview' ? 'loading-state-home' : 'loading-state';
    const loading = document.getElementById(loadingId);

    try {
        // Fetch from both main profiles and accepted onboarding entries
        const [profilesRes, onboardingRes] = await Promise.all([
            db.from('hh_profiles').select('*').order('rating', { ascending: false }),
            db.from('hh_onboarding').select('*').eq('status', 'accepted')
        ]);

        if (profilesRes.error) console.error('Error fetching profiles:', profilesRes.error);
        if (onboardingRes.error) console.error('Error fetching onboarding:', onboardingRes.error);

        const profiles = profilesRes.data || [];
        const acceptedOnboarding = (onboardingRes.data || []).map(app => ({
            id: app.id,
            full_name: app.full_name,
            slug: (app.custom_subdomain || generateSlug(app.full_name)).trim(),
            skills: app.expertise,
            role: app.expertise ? app.expertise.split(',')[0].replace('-', ' ').toUpperCase() : 'Specialist',
            bio: app.bio,
            bio_tagline: app.bio_tagline || app.bio,
            rating: 5.0,
            projects_count: 1, // Default for new accepted members
            is_from_onboarding: true,
            primary_color: app.primary_color || '#6250FF',
            photo_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(app.full_name)}&top=shortHair,fro,frizzle,shaggy,shaggyMullet&hairColor=2c1b18,4a312c`
        }));

        const onboardingSlugs = new Set(acceptedOnboarding.map(p => p.slug));

        // Filter profiles from HH_profiles that are NOT already in onboarding
        const uniqueProfiles = profiles.filter(p => !onboardingSlugs.has(p.slug));

        // Combine them, preferring onboarding
        const combinedData = [...acceptedOnboarding, ...uniqueProfiles];

        // Explicitly exclude Rahul and any legacy 'Sayak' record that clutters the list
        let data = combinedData.filter(member => {
            const isRahul = member.slug === 'rahul';
            const isDuplicateSayak = (member.full_name.toLowerCase().includes('sayak')) && !member.is_from_onboarding;
            return !isRahul && !isDuplicateSayak;
        });

        // Limit data if needed
        if (limit) {
            data = data.slice(0, limit);
        }

        loading.style.display = 'none';

        if (data.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem;"><h3>The network is in stealth mode.</h3></div>';
            return;
        }

        grid.innerHTML = data.map(member => {
            const specialties = (member.skills || member.role || '').toLowerCase().split(',').map(s => s.trim());
            const initials = member.full_name.split(' ').map(n => n[0]).join('').toUpperCase();

            let tagline = member.bio_tagline || member.bio || `Vetted specialist delivering precision ${member.role || 'technical'} execution.`;
            if (tagline === 'null' || !tagline) {
                tagline = `IIT KGP Specialist scaling global products through technical excellence.`;
            }

            const activeFilter = initialFilter || 'all';
            const isVisible = activeFilter === 'all' || specialties.includes(activeFilter.toLowerCase());
            const displayStyle = isVisible ? 'flex' : 'none';

            return `
            <a href="/talent/${member.slug}" class="talent-card-link fade-in" style="display: ${displayStyle}; width: 100%; text-decoration: none; color: inherit;">
                <div class="talent-card" data-expertise="${specialties.join(',')}" data-filter="${specialties.join(',')}">
                    <div class="card-left">
                        <div class="avatar-wrapper">
                            ${member.photo_url ? `
                                <img src="${member.photo_url}" class="avatar-initials" style="object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                <div class="avatar-initials" style="display: none;">${initials}</div>
                            ` : `<div class="avatar-initials">${initials}</div>`}
                            <div class="availability-pill">AVAILABLE</div>
                        </div>
                    </div>
                    
                    <div class="card-center">
                        <div class="talent-header-row">
                            <h3>${member.full_name}</h3>
                            <span class="talent-role-badge">IIT KGP · ${member.role}</span>
                        </div>
                        <p class="talent-one-liner">
                            ${tagline.length > 120 ? tagline.substring(0, 117) + '...' : tagline}
                        </p>
                        <div class="skill-pills">
                            ${specialties.slice(0, 4).map(s => `<span class="skill-pill">${s}</span>`).join('')}
                        </div>
                    </div>
 
                    <div class="card-right">
                        <div class="view-profile-btn-v3">View Proof →</div>
                    </div>
                </div>
            </a>
            `;;
        }).join('');

        // 4. Global Mouse Tracking for Spotlights (Cards & Hero)
        document.addEventListener('mousemove', (e) => {
            const spotlightElements = document.querySelectorAll('.talent-card, .premium-hero');
            spotlightElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                el.style.setProperty('--mouse-x', `${x}px`);
                el.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // Highlight active filter pill
        if (initialFilter !== 'all') {
            document.querySelectorAll('.filter-pill').forEach(p => {
                p.classList.toggle('active', p.getAttribute('data-filter') === initialFilter);
            });
        }

    } catch (err) {
        console.error('Fetch Talent error:', err);
        loading.innerHTML = '<span>Failed to assemble the elite. System interference detected.</span>';
    }
}

// 2. Portfolio/Talent Filtering Logic (Supports Multi-Specialty)
function initFilters() {
    const pills = document.querySelectorAll('.filter-pill');

    pills.forEach(pill => {
        const newPill = pill.cloneNode(true);
        pill.parentNode.replaceChild(newPill, pill);

        newPill.addEventListener('click', () => {
            document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            newPill.classList.add('active');

            const filter = newPill.getAttribute('data-filter');
            const cards = document.querySelectorAll('.talent-card');

            cards.forEach(card => {
                const cardExpertiseString = card.getAttribute('data-expertise') || '';
                const specialties = cardExpertiseString.split(',');

                if (filter === 'all' || specialties.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        if (card.style.opacity === '0') card.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}

// 3. Contact Form Connection
async function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const urlParams = new URL(window.location.href).searchParams;
    const talentName = urlParams.get('talent');
    const serviceType = urlParams.get('service');
    const planType = urlParams.get('plan');

    if (contactForm) {
        if (talentName) {
            const msgField = contactForm.querySelector('textarea');
            if (msgField) msgField.value = `I'm interested in working with ${talentName}. My project goal is...`;
        }
        if (serviceType) {
            const selectField = contactForm.querySelector('select');
            if (selectField) selectField.value = serviceType;
        }
        if (planType) {
            const msgField = contactForm.querySelector('textarea');
            if (msgField) msgField.value = `Interested in the "${planType}" plan. We are looking to...`;
        }
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Transmitting...';
        btn.disabled = true;

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const { error } = await db.from('hh_leads').insert([data]);
            if (error) throw error;
            alert('Signal received. We will contact you on WhatsApp shortly.');
            contactForm.reset();
        } catch (err) {
            console.error('Submission error:', err);
            alert('System interference. Check logs.');
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}


// 4. Advanced Cursor & Spotlight System
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Track spotlights immediately for responsiveness
    const spotlightElements = document.querySelectorAll('.talent-card, .premium-hero');
    spotlightElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
    });
});

function animateGlow() {
    // Smoother following (Lerp)
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;

    const glow = document.querySelector('.cursor-glow');
    if (glow) {
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';

        // Add a subtle "pulse" or scale based on velocity
        const dx = mouseX - glowX;
        const dy = mouseY - glowY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        const scale = 1 + Math.min(speed / 1000, 0.2);
        glow.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    requestAnimationFrame(animateGlow);
}
animateGlow();

// 4. Search Filter
function initSearch() {
    const searchInput = document.getElementById('talent-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.talent-card');
        const activeFilter = document.querySelector('.filter-pill.active')?.getAttribute('data-filter') || 'all';

        cards.forEach(card => {
            const name = card.querySelector('h3')?.innerText.toLowerCase() || '';
            const role = card.querySelector('.talent-role')?.innerText.toLowerCase() || '';
            const bio = card.querySelector('p')?.innerText.toLowerCase() || '';
            const expertise = (card.getAttribute('data-expertise') || card.getAttribute('data-filter') || '').toLowerCase();

            const matchesSearch = name.includes(query) || role.includes(query) || bio.includes(query);

            // Re-apply skill filter as well
            const specialties = expertise.split(',').map(s => s.trim());
            const matchesFilter = activeFilter === 'all' || specialties.includes(activeFilter.toLowerCase());

            const isVisible = matchesSearch && matchesFilter;

            const cardContainer = card.closest('.talent-card-link') || card;
            cardContainer.style.display = isVisible ? 'block' : 'none';
        });
    });
}
