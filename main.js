// Hustle House Main Logic

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initSearch();
    initContactForm();

    const urlParams = new URL(window.location.href).searchParams;
    const initialFilter = urlParams.get('filter');

    // If we are on the talent page, fetch data
    if (document.getElementById('talent-grid')) {
        fetchTalent(initialFilter);
    }
});

// Helper to generate a URL-safe slug from name
function generateSlug(name) {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

// 1. Fetch & Render Accepted Talent from Supabase
async function fetchTalent(initialFilter = 'all') {
    const grid = document.getElementById('talent-grid');
    const loading = document.getElementById('loading-state');

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
            photo_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${app.full_name}`
        }));

        const onboardingSlugs = new Set(acceptedOnboarding.map(p => p.slug));

        // Filter profiles from HH_profiles that are NOT already in onboarding
        const uniqueProfiles = profiles.filter(p => !onboardingSlugs.has(p.slug));

        // Combine them, preferring onboarding
        const combinedData = [...acceptedOnboarding, ...uniqueProfiles];

        // Explicitly exclude Rahul and any legacy 'Sayak' record that clutters the list
        const data = combinedData.filter(member => {
            const isRahul = member.slug === 'rahul';
            const isDuplicateSayak = (member.full_name.toLowerCase().includes('sayak')) && !member.is_from_onboarding;
            return !isRahul && !isDuplicateSayak;
        });

        loading.style.display = 'none';

        if (data.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem;"><h3>The network is in stealth mode.</h3></div>';
            return;
        }

        grid.innerHTML = data.map(member => {
            const specialties = (member.skills || member.role || '').toLowerCase().split(',').map(s => s.trim());
            const initials = member.full_name.split(' ').map(n => n[0]).join('').toUpperCase();

            // Result-based tagline logic
            let tagline = member.bio_tagline || member.bio || `Scaled products to ${member.delivered_projects || 'global'} benchmarks.`;
            if (tagline === 'null' || !tagline) {
                tagline = `IIT KGP Specialist delivering high-precision ${member.role || 'technical'} solutions.`;
            }

            const activeFilter = initialFilter || 'all';
            const isVisible = activeFilter === 'all' || specialties.includes(activeFilter.toLowerCase());
            const displayStyle = isVisible ? 'block' : 'none';

            return `
            <a href="/talent/${member.slug}" class="talent-card-link" style="display: ${displayStyle}; text-decoration: none; color: inherit;">
                <div class="talent-card" data-expertise="${specialties.join(',')}" data-filter="${specialties.join(',')}">
                    <div class="card-header-visual" style="position: relative; margin-bottom: 1.5rem;">
                        <img src="${member.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.full_name}`}" alt="${member.full_name}" class="avatar-img" style="width: 70px; height: 70px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03);">
                        <div class="availability-status" style="position: absolute; top: 0; right: 0; background: rgba(34, 197, 94, 0.1); color: #22c55e; padding: 4px 12px; border-radius: 100px; font-size: 0.65rem; font-weight: 800; display: flex; align-items: center; gap: 6px; letter-spacing: 1px;">
                            <span class="pulse-dot" style="width: 6px; height: 6px; background: #22c55e; border-radius: 50%;"></span>
                            AVAILABLE
                        </div>
                    </div>
                    
                    <div class="talent-info">
                        <div class="talent-role-tag" style="font-size: 0.65rem; color: var(--primary); font-weight: 800; letter-spacing: 2px; margin-bottom: 0.5rem; text-transform: uppercase;">
                            IIT KHARAGPUR · VETTED
                        </div>
                        <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.75rem; letter-spacing: -0.5px;">${member.full_name}</h3>
                        <p class="talent-tagline" style="font-size: 0.9rem; opacity: 0.6; line-height: 1.5; margin-bottom: 1.5rem; min-height: 2.8rem;">
                            ${tagline.length > 100 ? tagline.substring(0, 97) + '...' : tagline}
                        </p>
                        
                        <div class="skill-tags" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
                            ${specialties.slice(0, 3).map(s => `<span class="mini-tag" style="font-size: 0.6rem; padding: 4px 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; font-family: 'JetBrains Mono', monospace; opacity: 0.8; color: var(--text-secondary);">${s.toUpperCase()}</span>`).join('')}
                        </div>

                        <div class="card-cta-v2" style="display: flex; align-items: center; justify-content: space-between; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.05);">
                            <span class="cta-arrow" style="font-size: 0.85rem; font-weight: 700; color: var(--primary); transition: transform 0.3s ease;">View Profile →</span>
                        </div>
                    </div>
                </div>
            </a>
            `;
        }).join('');

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


// 4. Cursor Glow
document.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.cursor-glow');
    if (glow) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    }
});

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
