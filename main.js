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
            .from('hh_onboarding')
            .select('*')
            .eq('status', 'accepted')
            .order('created_at', { ascending: false });

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
            const specialties = (member.expertise || '').split(',');
            const mainSpecialty = specialties[0] || 'hacker';
            const slug = generateSlug(member.full_name);
            const initials = member.full_name.split(' ').map(n => n[0]).join('').toUpperCase();

            return `
            <div class="talent-card glass fade-in" data-expertise="${member.expertise}" style="padding: 0; overflow: hidden;">
                <a href="/talent/${slug}" style="text-decoration: none; color: inherit; display: block;">
                    <div class="card-header-visual" style="height: 120px; background: linear-gradient(135deg, #1a1a1a, #333); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 700; color: rgba(255,255,255,0.05); border-bottom: 1px solid var(--glass-border);">
                        ${initials}
                    </div>
                </a>
                <div class="talent-info" style="padding: 2rem;">
                    <div style="display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 0.5rem;">
                        ${specialties.map(s => `<span style="color: var(--primary); font-weight: 800; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px;">#${s.trim().replace('-', '')}</span>`).join(' ')}
                    </div>
                    <a href="/talent/${slug}" style="text-decoration: none; color: inherit;">
                        <h3 style="font-size: 1.5rem; margin: 0.5rem 0; color: white;">${member.full_name}</h3>
                    </a>
                    <div class="talent-role" style="font-size: 0.75rem; color: var(--primary); letter-spacing: 1px; font-weight: 700; margin-bottom: 1rem; text-transform: uppercase;">Technical Specialist · IIT KGP</div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem; height: 3.2em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${member.bio}</p>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.05);">
                         <div style="display: flex; gap: 1rem;">
                            <a href="${member.portfolio}" target="_blank" style="color: white; opacity: 0.6; transition: 0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6" title="Portfolio">🌐</a>
                            <a href="${member.linkedin_url}" target="_blank" style="color: white; opacity: 0.6; transition: 0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6" title="LinkedIn">🔗</a>
                        </div>
                        <a href="/talent/${slug}" style="color: white; text-decoration: none; font-weight: 600; font-size: 0.9rem;">View Profile →</a>
                    </div>
                </div>
            </div>
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
