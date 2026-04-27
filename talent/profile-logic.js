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
        const initials = profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
        document.getElementById('member-initials').innerText = initials;
        document.getElementById('member-name').innerText = profile.full_name;
        document.getElementById('member-role-line').innerText = `${profile.role.toUpperCase()} · IIT KHARAGPUR`;
        document.getElementById('member-id-tag').innerText = `ID: HH-${profile.id.substring(0, 4).toUpperCase()}`;

        // Bio & Stats
        document.getElementById('member-one-liner').innerText = profile.bio.split('. ')[0] + '.';
        document.getElementById('member-full-bio').innerText = profile.bio;
        document.getElementById('member-projects-count').innerText = profile.projects_count || 0;
        document.getElementById('member-rating').innerText = parseFloat(profile.rating || 5.0).toFixed(1);

        if (theme.show_rating === false) {
            document.getElementById('rating-stat').style.display = 'none';
        }

        // Status & CTA Logic
        const statusEl = document.getElementById('member-status');
        const ctaBtn = document.getElementById('member-cta-button');
        const isAvailable = profile.availability !== 'busy';

        if (isAvailable) {
            statusEl.className = 'status-indicator status-available';
            statusEl.querySelector('span').innerText = 'Available';
            ctaBtn.innerText = 'Engage Specialist →';
            ctaBtn.href = profile.cal_link || '#';
        } else {
            statusEl.className = 'status-indicator status-busy';
            statusEl.querySelector('span').innerText = 'At Capacity';
            ctaBtn.innerText = 'Join Waitlist';
            ctaBtn.onclick = (e) => {
                e.preventDefault();
                const email = prompt("Specialist is at capacity. Enter your email to join the waitlist:");
                if (email) alert("Added to queue. We will notify you once a slot opens.");
            };
        }

        // CTA Section Branding
        document.getElementById('member-cta-title').innerText = `Scoping call with ${profile.full_name.split(' ')[0]}`;
        document.getElementById('member-cta-subtitle').innerText = `${profile.role} · IIT Kharagpur`;
        document.getElementById('member-price').innerText = `Minimal project size: $${profile.min_project_price || 200}`;

        // 6. Populate Tags (Skills)
        const tagsContainer = document.getElementById('member-tags');
        const topSkills = (profile.skills || '').split(',').slice(0, 4);
        tagsContainer.innerHTML = topSkills.map(skill => `<span class="mono-tag">${skill.trim()}</span>`).join('');

        // 7. Populate Tools
        const toolsContainer = document.getElementById('member-tools');
        const tools = (profile.tools || '').split(',');
        toolsContainer.innerHTML = tools.map(tool => `<span class="mono-tag accent">${tool.trim()}</span>`).join('');

        // 8. Populate Proof (Portfolio)
        const proofContainer = document.getElementById('member-proof');
        if (portfolio && portfolio.length > 0) {
            proofContainer.innerHTML = portfolio.map(item => `
                <div class="proof-card premium-card">
                    <span class="proof-client">${item.client_type || 'B2B / SaaS'}</span>
                    <h3 class="proof-title">${item.title}</h3>
                    
                    <span class="proof-label">// INTENT</span>
                    <p class="proof-content">${item.description}</p>
                    
                    <span class="proof-label">// OUTCOME</span>
                    <div class="proof-result accent-text">${item.result_metric || 'Successful'}</div>
                    <p class="proof-result-desc">${item.result_detail || ''}</p>
                    
                    <a href="${item.proof_link || '#'}" target="_blank" class="proof-link">VERIFY PROOF ↗</a>
                </div>
            `).join('');
        } else {
            proofContainer.innerHTML = `<p style="color: var(--text-secondary); grid-column: 1/-1; opacity: 0.5;">Verified case studies pending synchronization.</p>`;
        }

        // Update Page Title & Metadata
        const pageTitle = `${profile.full_name} | ${profile.role} | Hustle House · KGP`;
        document.title = pageTitle;

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
        document.getElementById('member-name').innerText = 'Member Not Found';
    }
}

document.addEventListener('DOMContentLoaded', initProfile);
