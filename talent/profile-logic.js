/**
 * Hustle House Profile Logic
 * Fetches and populates member profile data from Supabase.
 */

async function initProfile() {
    // 1. Get identifier (slug or subdomain)
    const urlParams = new URLSearchParams(window.location.search);
    let identifier = urlParams.get('s');

    const hostname = window.location.hostname;
    const pathParts = window.location.pathname.split('/').filter(p => p !== "");
    let isSubdomainRequest = false;

    // Check for subdomain
    if (!identifier) {
        const parts = hostname.split('.');
        const rootDomain = "kgphustlehouse.com";
        const isLocal = hostname.includes('localhost');

        if (isLocal && parts.length > 1) {
            identifier = parts[0];
            isSubdomainRequest = true;
        } else if (!isLocal && hostname.includes(`.${rootDomain}`)) {
            identifier = parts[0];
            isSubdomainRequest = true;
        }

        if (identifier === "www" || identifier === "app") identifier = null;
    }

    // Fallback to path
    if (!identifier && pathParts.length >= 2 && pathParts[0] === 'talent') {
        identifier = pathParts[1];
    }

    if (!identifier || identifier === 'talent' || identifier === 'profile.html') {
        console.error('No profile identifier detected.');
        return;
    }

    try {
        // 2. Fetch Profile Data (Query by slug OR custom_subdomain)
        let query = db.from('hh_profiles').select('*');

        if (isSubdomainRequest) {
            query = query.or(`custom_subdomain.eq.${identifier},slug.eq.${identifier}`);
        } else {
            query = query.eq('slug', identifier);
        }

        const { data: profile, error: profileError } = await query.single();

        if (profileError || !profile) throw profileError || new Error('Profile not found');

        // 3. Fetch Portfolio Data
        const { data: portfolio, error: portfolioError } = await db
            .from('hh_portfolio')
            .select('*')
            .eq('profile_id', profile.id)
            .order('created_at', { ascending: false });

        // 4. Apply Custom Branding & Theme
        const theme = profile.theme_config || {};
        const accentColor = profile.primary_color || '#F5A623';

        // Inject dynamic styles
        const styleEl = document.getElementById('custom-theme-styles');
        styleEl.innerHTML = `
            :root {
                --member-accent: ${accentColor};
            }
            .premium-profile-theme {
                --primary: ${accentColor};
                --primary-glow: ${accentColor}4D; /* 30% opacity */
            }
            ${theme.font_style === 'serif' ? 'body { font-family: "Syne", serif; }' : ''}
            ${theme.variant === 'terminal' ? '.profile-container { border: 1px solid var(--member-accent); padding: 3rem; background: #000; }' : ''}
            /* Custom User Overrides */
            ${theme.custom_css || ''}
        `;

        if (theme.variant === 'terminal') {
            document.body.classList.add('terminal-variant');
        }

        // 5. Populate Basic Info
        const firstName = profile.full_name.split(' ')[0];
        document.getElementById('member-id-tag').innerHTML = `<span style="opacity: 0.5;">ID//</span> HH-${profile.id.substring(0, 4).toUpperCase()}`;

        // Handle result-driven headline (First sentence of bio or custom)
        const bioParts = profile.bio.split('. ');
        const headline = bioParts[0] + '.';
        const remainingBio = bioParts.slice(1).join('. ');

        document.getElementById('member-hero-headline').innerText = headline;
        document.getElementById('member-one-liner').innerText = `${profile.role} from IIT Kharagpur delivering global project outcomes.`;
        document.getElementById('member-price-anchor').innerText = `Typical Projects start at $${profile.min_project_price || 500}`;

        // Status & CTA Logic
        const statusEl = document.getElementById('member-status');
        const ctaBtn = document.getElementById('member-cta-button');
        const stickyBtn = document.getElementById('sticky-engage-btn');
        const isAvailable = profile.availability !== 'busy';

        if (isAvailable) {
            statusEl.querySelector('span').innerText = '● Available';
            ctaBtn.innerText = 'Book Strategy Call';
            ctaBtn.href = profile.cal_link || '#';
            stickyBtn.href = profile.cal_link || '#';
        } else {
            statusEl.querySelector('span').innerText = '● At Capacity';
            ctaBtn.innerText = 'Join Waitlist';
            stickyBtn.innerText = 'Join Waitlist';
        }

        // 8. Populate Proof (Portfolio)
        const proofContainer = document.getElementById('member-proof');
        if (portfolio && portfolio.length > 0) {
            proofContainer.innerHTML = portfolio.map(item => `
                <div class="case-study-card dot-grid">
                    <div class="case-grid">
                        <div class="case-content">
                            <span class="case-tag">// Case Study / ${item.client_type || 'B2B SaaS'}</span>
                            <h3 style="color: var(--text-primary); font-size: 2.2rem; margin-bottom: 1.5rem; letter-spacing: -1px;">${item.title}</h3>
                            
                            <div style="margin-bottom: 2.5rem;">
                                <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: var(--member-accent); display: block; margin-bottom: 0.5rem; text-transform: uppercase;">The Challenge</span>
                                <p style="color: var(--text-primary); font-size: 1.05rem; line-height: 1.6; font-weight: 500;">${item.description}</p>
                            </div>

                            <div class="case-result-box" style="background: var(--surface-lite); padding: 2rem; border-left: 4px solid var(--member-accent);">
                                <div class="case-metric" style="font-size: 3rem; font-weight: 900; color: var(--text-primary); letter-spacing: -2px; line-height: 1;">${item.result_metric || '100%'}</div>
                                <div class="case-metric-label" style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; margin-top: 0.5rem;">${item.result_detail || 'Success Rate'}</div>
                            </div>
                        </div>
                        <div class="mesh-highlight" style="background: rgba(0,0,0,0.02); min-height: 300px; display: flex; align-items: center; justify-content: center; position: relative; border: 1px solid var(--border);">
                            ${item.icon ? `<span style="font-size: 6rem; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));">${item.icon}</span>` : `<span style="font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 5rem; opacity: 0.05; letter-spacing: -5px;">PROOF//</span>`}
                            <a href="${item.proof_link || '#'}" target="_blank" class="glow-button" style="position: absolute; bottom: 20px; right: 20px; padding: 10px 20px; font-size: 0.7rem; border-radius: 4px;">Verify Proof ↗</a>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            proofContainer.innerHTML = `<p style="color: var(--text-secondary); text-align: center; padding: 4rem; border: 1px dashed var(--border);">Verified case studies pending synchronization.</p>`;
        }

        // Update Page Title & Metadata
        const pageTitle = `${profile.full_name} | ${profile.role} | HUSTLEHOUSE`;
        document.title = pageTitle;

        // Populate Hidden Form Field
        const specialistNameField = document.getElementById('query-specialist-name');
        if (specialistNameField) specialistNameField.value = profile.full_name;

        // Initialize Query Form Submission
        initQueryForm();

        // Add/Update Canonical Link for SEO
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', `https://kgphustlehouse.com/talent/${profile.slug}`);

    } catch (err) {
        console.error('Profile load error:', err);
        document.getElementById('member-hero-headline').innerText = 'Member Not Found';
    }
}

function initQueryForm() {
    const form = document.getElementById('profile-query-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('query-submit-btn');
        const originalText = btn.innerText;
        btn.innerText = 'Transmitting...';
        btn.disabled = true;

        const formData = new FormData(form);
        const contact = formData.get('contact');
        const isEmail = contact.includes('@');

        const payload = {
            name: formData.get('name'),
            message: formData.get('message'),
            specialist_name: formData.get('specialist_name'),
            [isEmail ? 'email' : 'whatsapp']: contact
        };

        try {
            const { error } = await db.from('hh_leads').insert([payload]);
            if (error) throw error;

            alert('Query transmited. The specialist or HH admin will reach out shortly.');
            form.reset();
        } catch (err) {
            console.error('Submission error:', err);
            alert('Transmission failed. Direct link: contact@kgphustlehouse.com');
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}

document.addEventListener('DOMContentLoaded', initProfile);
