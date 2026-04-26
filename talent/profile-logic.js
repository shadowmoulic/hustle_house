/**
 * Hustle House Profile Logic
 * Fetches and populates member profile data from Supabase.
 */

async function initProfile() {
    // 1. Get slug from URL (e.g., ?s=sayak or from path)
    const urlParams = new URLSearchParams(window.location.search);
    let slug = urlParams.get('s');

    // Fallback: try to detect from path if no query param
    if (!slug) {
        const pathParts = window.location.pathname.split('/');
        // If path is /talent/sayak/index.html or /talent/sayak
        slug = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
        if (slug === 'index.html' || slug === 'profile.html') {
            slug = pathParts[pathParts.length - 2];
        }
    }

    if (!slug || slug === 'talent') {
        console.error('No slug detected. Redirecting to talent list.');
        // window.location.href = '/talent';
        return;
    }

    try {
        // 2. Fetch Profile Data
        const { data: profile, error: profileError } = await db
            .from('hh_profiles')
            .select('*')
            .eq('slug', slug)
            .single();

        if (profileError || !profile) throw profileError || new Error('Profile not found');

        // 3. Fetch Portfolio Data
        const { data: portfolio, error: portfolioError } = await db
            .from('hh_portfolio')
            .select('*')
            .eq('profile_id', profile.id)
            .order('created_at', { ascending: false });

        // 4. Populate Header & Basic Info
        const initials = profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
        document.getElementById('member-initials').innerText = initials;
        document.getElementById('member-name').innerText = profile.full_name;
        document.getElementById('member-role-line').innerText = `${profile.role.toUpperCase()} · IIT KHARAGPUR`;

        // One liner (max 12 words)
        const bioWords = profile.bio.split(' ');
        const oneLiner = bioWords.slice(0, 12).join(' ') + (bioWords.length > 12 ? '...' : '');
        document.getElementById('member-one-liner').innerText = oneLiner;
        document.getElementById('member-full-bio').innerText = profile.bio;

        document.getElementById('member-projects-count').innerText = `${profile.projects_count || 0} projects delivered`;

        // Status & CTA Logic
        const statusEl = document.getElementById('member-status');
        const ctaBtn = document.getElementById('member-cta-button');
        const isAvailable = profile.availability !== 'busy'; // Assuming 'availability' column exists

        if (isAvailable) {
            statusEl.className = 'status-indicator status-available';
            statusEl.querySelector('span').innerText = 'Available';
            ctaBtn.innerText = 'Book Your Call →';
            ctaBtn.href = profile.cal_link || '#';
        } else {
            statusEl.className = 'status-indicator status-busy';
            statusEl.querySelector('span').innerText = 'Busy';
            ctaBtn.innerText = 'Join Waitlist';
            ctaBtn.classList.remove('glow-button');
            ctaBtn.style.background = 'rgba(255,255,255,0.05)';
            ctaBtn.style.color = 'white';
            ctaBtn.onclick = (e) => {
                e.preventDefault();
                const email = prompt("I'm currently at capacity. Enter your email to join the waitlist:");
                if (email) {
                    // Logic to send to Notion/Pipeline
                    alert("You've been added to the queue. I'll reach out once a spot opens up.");
                }
            };
        }

        // CTA Section specific names
        document.getElementById('member-cta-title').innerText = `Free 20-min scoping call with ${profile.full_name.split(' ')[0]}`;
        document.getElementById('member-cta-subtitle').innerText = `${profile.role} · IIT Kharagpur`;
        document.getElementById('member-price').innerText = `Typical projects from $${profile.min_project_price || 200}`;

        // 5. Populate Tags (Skills)
        const tagsContainer = document.getElementById('member-tags');
        const topSkills = (profile.skills || '').split(',').slice(0, 3);
        tagsContainer.innerHTML = topSkills.map(skill => `<span class="mono-tag">${skill.trim()}</span>`).join('');

        // 6. Populate Tools
        const toolsContainer = document.getElementById('member-tools');
        const tools = (profile.tools || 'Figma, VS Code, Notion').split(',');
        toolsContainer.innerHTML = tools.map(tool => `<span class="mono-tag">${tool.trim()}</span>`).join('');

        // 7. Populate Proof (Portfolio)
        const proofContainer = document.getElementById('member-proof');
        if (portfolio && portfolio.length > 0) {
            proofContainer.innerHTML = portfolio.map(item => `
                <div class="proof-card">
                    <span class="proof-client">${item.client_type || 'Tech Startup / SaaS'}</span>
                    <h3 class="proof-title">${item.title}</h3>
                    
                    <span class="proof-label">What I did:</span>
                    <p class="proof-content">${item.description}</p>
                    
                    <span class="proof-label">Result:</span>
                    <div class="proof-result">${item.result_metric || 'Successful Delivery'}</div>
                    <p class="proof-result-desc">${item.result_detail || 'Completed within scope and deadline.'}</p>
                    
                    <a href="${item.proof_link || '#'}" target="_blank" class="proof-link">View proof ↗</a>
                </div>
            `).join('');
        } else {
            proofContainer.innerHTML = `<p style="color: var(--text-secondary); grid-column: 1/-1;">Case studies coming soon. Every project listed here is verified for measurable impact.</p>`;
        }

        // Update Page Title
        document.title = `${profile.full_name} | ${profile.role} | Hustle House · KGP`;

    } catch (err) {
        console.error('Profile init error:', err);
        document.getElementById('member-name').innerText = 'Member Not Found';
    }
}

document.addEventListener('DOMContentLoaded', initProfile);
