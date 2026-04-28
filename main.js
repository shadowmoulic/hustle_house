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
        const { data, error } = await db.from('hh_profiles').select('*').order('rating', { ascending: false });
        if (error) throw error;

        loading.style.display = 'none';

        if (data.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem;"><h3>The network is in stealth mode.</h3></div>';
            return;
        }

        grid.innerHTML = data.map(member => {
            const specialties = (member.skills || member.role || '').toLowerCase().split(',').map(s => s.trim());
            const initials = member.full_name.split(' ').map(n => n[0]).join('').toUpperCase();

            // Result-based tagline logic (simplified for now, can be expanded)
            const tagline = member.bio_tagline || `Scaled products to ${member.delivered_projects || 'global'} benchmarks.`;

            const activeFilter = initialFilter || 'all';
            const isVisible = activeFilter === 'all' || specialties.includes(activeFilter.toLowerCase());
            const displayStyle = isVisible ? 'block' : 'none';

            return `
            <a href="/talent/${member.slug}" class="talent-card-link" style="display: ${displayStyle};">
                <div class="talent-card" data-expertise="${specialties.join(',')}" data-filter="${specialties.join(',')}">
                    <div class="card-header-visual">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${member.full_name}" alt="${member.full_name}" class="avatar-img">
                        <div class="availability-status">
                            <span class="pulse-dot"></span> Available
                        </div>
                    </div>
                    <div class="talent-info">
                        <h3>${member.full_name}</h3>
                        <div class="talent-role-tag">IIT KHARAGPUR</div>
                        <div class="talent-tagline">${tagline}</div>
                        
                        <div class="skill-tags">
                            ${specialties.slice(0, 3).map(s => `<span class="mini-tag">${s}</span>`).join('')}
                        </div>
                        
                        <div class="card-cta-v2">
                            <span class="cta-arrow">View Profile →</span>
                        </div>
                    </div>
                </div>
            </a>`;
        }).join('');

        // Highlight active filter pill
        if (initialFilter !== 'all') {
            document.querySelectorAll('.filter-pill').forEach(p => {
                p.classList.toggle('active', p.getAttribute('data-filter') === initialFilter);
            });
        }

    } catch (err) { console.error(err); }
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
