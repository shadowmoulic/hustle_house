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

    // Initialize profile avatar if on a profile page
    initProfileAvatar();

    // Initialize Neutron Star background if present
    initNeutronStar();
    // Initialize scroll frame animation if on homepage
    if (document.getElementById('scroll-frame-canvas')) {
        initScrollFrameAnimation();
    }
});

function initScrollFrameAnimation() {
    const canvas = document.getElementById('scroll-frame-canvas');
    if (!canvas) return;
    const context = canvas.getContext('2d');

    const frameCount = 75;
    const currentFrame = index => (
        `ezgif-7fcd830f4f8a6892-jpg/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
    );

    const images = [];
    const airship = {
        frame: 0
    };

    console.log('Preloading 75 frames for scroll animation...');

    let loadedCount = 0;
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.onload = () => {
            loadedCount++;
            if (loadedCount === 1) render(); // Render first frame as soon as it's ready
            if (loadedCount === frameCount) console.log('All 75 frames loaded successfully.');
        };
        img.onerror = () => console.error(`Failed to load frame: ${currentFrame(i)}`);
        img.src = currentFrame(i);
        images.push(img);
    }

    const render = () => {
        const img = images[airship.frame];
        if (!img || !img.complete) return;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
        
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(scrollFraction * frameCount)
        );

        if (airship.frame !== frameIndex) {
            airship.frame = frameIndex;
            requestAnimationFrame(render);
        }
    });

    window.addEventListener('resize', render);
}

function initCinematicInteractions() {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Interactive Background Aura
        const xPct = (e.clientX / window.innerWidth) * 100;
        const yPct = (e.clientY / window.innerHeight) * 100;
        document.body.style.setProperty('--mouse-x', `${xPct}%`);
        document.body.style.setProperty('--mouse-y', `${yPct}%`);
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

// Helper to get local profile picture
function getProfilePic(fullName, slug) {
    const mapping = {
        'Arnav Shukla': '/profile-pics/arnav hustle house.png',
        'Arpit Chakladar': '/profile-pics/arpit hustle house.png',
        'Bishal Das': '/profile-pics/bishal hustle house.png',
        'Nihar Nayak': '/profile-pics/nihar hustle house.png',
        'Prayas Dey': '/profile-pics/prayas hustle house.png',
        'Sayak Moulic': '/profile-pics/sayak hustle house.png',
        'Skanda K M': '/profile-pics/skanda hustle house dp.png',
        'Somsubhra Mukherjee': '/profile-pics/somsubhro hustle house.png',
        'Sourasish Mukherjee': '/profile-pics/sourashish hustle house.png',
        'Suvam Ghosh': '/profile-pics/suvam-dev hustle house.png',
        // Slug-based fallback
        'arnavshukla': '/profile-pics/arnav hustle house.png',
        'arpitchakladar': '/profile-pics/arpit hustle house.png',
        'bishal': '/profile-pics/bishal hustle house.png',
        'nihar': '/profile-pics/nihar hustle house.png',
        'prayas': '/profile-pics/prayas hustle house.png',
        'sayak': '/profile-pics/sayak hustle house.png',
        'skandakm': '/profile-pics/skanda hustle house dp.png',
        'moon': '/profile-pics/somsubhro hustle house.png',
        'sun': '/profile-pics/sourashish hustle house.png',
        'suvam-dev': '/profile-pics/suvam-dev hustle house.png'
    };
    
    // Check by full name or slug
    return mapping[fullName] || mapping[slug] || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}&top=shortHair,fro,frizzle,shaggy,shaggyMullet&hairColor=2c1b18,4a312c`;
}

// Helper to initialize profile avatar on individual profile pages
function initProfileAvatar() {
    const header = document.querySelector('.profile-header');
    if (!header) return;

    const nameEl = document.querySelector('.profile-name');
    const avatarCircle = header.querySelector('.avatar-circle');
    
    if (nameEl && avatarCircle) {
        const name = nameEl.innerText.trim();
        // Get slug from URL path (last part)
        const pathParts = window.location.pathname.split('/').filter(p => p !== "");
        const slug = pathParts[pathParts.length - 1];
        
        const picUrl = getProfilePic(name, slug);
        
        // Only replace if it's a local picture (not Dicebear)
        if (picUrl && !picUrl.includes('dicebear')) {
            avatarCircle.innerHTML = `<img src="${picUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            avatarCircle.style.background = 'transparent';
            avatarCircle.style.border = '2px solid var(--member-accent)';
        }
    }
}

// Cinematic Neutron Star Logic
function initNeutronStar() {
    const bg = document.querySelector('.neutron-star-bg');
    if (!bg) return;

    const group = bg.querySelector('.lines-group');
    const magneticLines = bg.querySelector('.magnetic-lines');
    const core = bg.querySelector('.star-core');
    if (!group || !magneticLines || !core) return;

    // Generate 40 elliptical lines with varying rotations
    let linesHtml = '';
    for (let i = 0; i < 40; i++) {
        const rx = 200 + Math.random() * 300;
        const ry = 100 + Math.random() * 400;
        const rotate = (i / 40) * 180 + Math.random() * 20;
        
        linesHtml += `
            <ellipse class="magnetic-line-path" 
                     cx="500" cy="500" 
                     rx="${rx}" ry="${ry}" 
                     transform="rotate(${rotate} 500 500)" />
        `;
    }
    group.innerHTML = linesHtml;

    // Scroll-driven animation logic
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.05;
        
        // Multi-layered parallax: Scroll + Mouse
        const mouseXOffset = (mouseX / window.innerWidth - 0.5) * 20;
        const mouseYOffset = (mouseY / window.innerHeight - 0.5) * 20;

        magneticLines.style.transform = `translate(calc(-50% + ${mouseXOffset}px), calc(-50% + ${mouseYOffset}px)) rotateX(${rate * 0.1}deg) rotateY(${rate * 0.08}deg) rotateZ(${rate * 0.05}deg) scale(${1 + scrolled * 0.0001})`;
        
        core.style.transform = `translate(calc(-50% + ${mouseXOffset * 1.5}px), calc(-50% + ${scrolled * 0.05 + mouseYOffset * 1.5}px)) scale(${1 + scrolled * 0.0001})`;
    });

    // Also update on mouse move for real-time response even without scrolling
    document.addEventListener('mousemove', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.05;
        const mouseXOffset = (mouseX / window.innerWidth - 0.5) * 20;
        const mouseYOffset = (mouseY / window.innerHeight - 0.5) * 20;
        
        if (magneticLines) {
            magneticLines.style.transform = `translate(calc(-50% + ${mouseXOffset}px), calc(-50% + ${mouseYOffset}px)) rotateX(${rate * 0.1}deg) rotateY(${rate * 0.08}deg) rotateZ(${rate * 0.05}deg) scale(${1 + scrolled * 0.0001})`;
        }
        if (core) {
            core.style.transform = `translate(calc(-50% + ${mouseXOffset * 1.5}px), calc(-50% + ${scrolled * 0.05 + mouseYOffset * 1.5}px)) scale(${1 + scrolled * 0.0001})`;
        }
    });

    // Initial trigger
    bg.style.opacity = '1';
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
            photo_url: getProfilePic(app.full_name, (app.custom_subdomain || generateSlug(app.full_name)).trim())
        }));

        const onboardingSlugs = new Set(acceptedOnboarding.map(p => p.slug));

        // Filter profiles from HH_profiles that are NOT already in onboarding and assign photos
        const uniqueProfiles = (profiles || [])
            .filter(p => !onboardingSlugs.has(p.slug))
            .map(p => ({
                ...p,
                photo_url: p.photo_url || getProfilePic(p.full_name, p.slug)
            }));

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
                        
                        <div class="demo-work-preview" style="margin-top: 1rem; padding: 0.75rem; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                            <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--primary); text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 0.4rem;">// Demo Work / POC</span>
                            <div style="font-size: 0.85rem; font-weight: 600; color: white;">
                                ${member.full_name === 'Sayak Moulic' ? '10.2M+ Impressions Organic Scaling' : 
                                  member.full_name === 'Somsubhra Mukherjee' ? 'High-Performance Learning Systems' :
                                  member.full_name === 'Arnav Shukla' ? 'Viral Narrative Architecture' :
                                  'Industrial Grade Project Execution'}
                            </div>
                        </div>

                        <div class="skill-pills" style="margin-top: 1rem;">
                            ${specialties.slice(0, 4).map(s => `<span class="skill-pill">${s}</span>`).join('')}
                        </div>
                    </div>
 
                    <div class="card-right">
                        <div class="view-profile-btn-v3">View Proof →</div>
                    </div>
                </div>
            </a>
            `;
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
