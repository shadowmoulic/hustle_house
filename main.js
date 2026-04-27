// Hustle House Main Logic

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initContactForm();

    // If we are on the talent page, fetch data
    if (document.getElementById('talent-grid')) {
        fetchTalent();
    }
});

// Helper to generate a URL-safe slug from name
function generateSlug(name) {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

// 1. Fetch & Render Accepted Talent from Supabase
async function fetchTalent() {
    const grid = document.getElementById('talent-grid');
    const loading = document.getElementById('loading-state');

    try {
        const { data, error } = await db
            .from('HH_profiles')
            .select('*')
            .order('rating', { ascending: false });

        if (error) throw error;

        loading.style.display = 'none';

        if (data.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                <h3 style="color: white; margin-bottom: 1rem;">The network is currently in stealth mode.</h3>
                <p style="color: var(--text-secondary);">New vetted members are being audited. Check back shortly.</p>
            </div>`;
            return;
        }

        grid.innerHTML = data.map(member => {
            const specialties = (member.skills || member.role || '').split(',');
            const initials = member.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
            const accentColor = member.primary_color || '#F5A623';
            const slug = member.slug;

            return `
            <a href="/talent/${slug}" class="talent-card-link" style="text-decoration: none; color: inherit; display: block; margin-bottom: 2.5rem;">
                <div class="talent-card fade-in" data-expertise="${member.skills || member.role}" 
                     style="background: #111; border: 1px solid #2A2A2A; padding: 0; overflow: hidden; transition: all 0.3s ease; position: relative; height: 100%;">
                    <div class="card-header-visual" style="height: 140px; background: #0A0A0A; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: 900; color: rgba(255,255,255,0.03); border-bottom: 1px solid #2A2A2A; position: relative;">
                        ${initials}
                        <div style="position: absolute; bottom: 10px; right: 15px; font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: #444;">ID/HH-${member.id.substring(0, 4)}</div>
                    </div>
                    <div class="talent-info" style="padding: 2rem;">
                        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1rem;">
                            ${specialties.slice(0, 3).map(s => `<span style="font-family: 'JetBrains Mono', monospace; color: ${accentColor}; font-weight: 700; font-size: 0.6rem; text-transform: uppercase; letter-spacing: 1px; border: 1px solid ${accentColor}33; padding: 2px 6px; background: ${accentColor}0D;">${s.trim()}</span>`).join('')}
                        </div>
                        <h3 style="font-size: 1.6rem; margin: 0.5rem 0; color: white; font-weight: 900; letter-spacing: -0.02em;">${member.full_name}</h3>
                        <div class="talent-role" style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #666; letter-spacing: 1px; font-weight: 600; margin-bottom: 1.5rem; text-transform: uppercase;">// ${member.role}</div>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 2rem; opacity: 0.8;">${member.bio || 'Vetted specialist ready for execution.'}</p>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid #2A2A2A;">
                            <div style="display: flex; flex-direction: column;">
                                <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: #444;">MIN PROJECT</span>
                                <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: white; font-weight: 700;">$${member.min_project_price || 200}</span>
                            </div>
                            <span style="color: ${accentColor}; font-weight: 800; font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; letter-spacing: 1px;">VIEW PROFILE →</span>
                        </div>
                    </div>
                </div>
            </a>
            `;
        }).join('');

        // Re-initialize filters
        initFilters();

    } catch (err) {
        console.error('Fetch error:', err);
        loading.innerHTML = `<p style="color: #ef4444;">HH connection lost. Check back shortly.</p>`;
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

    const urlParams = new URLSearchParams(window.location.search);
    const talentName = urlParams.get('talent');
    if (talentName) {
        const msgField = contactForm.querySelector('textarea');
        if (msgField) msgField.value = `I'm interested in working with ${talentName}. My project goal is...`;
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
