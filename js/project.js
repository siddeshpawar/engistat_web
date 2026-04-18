// Project Detail Page — Load project by ?id= param

const params = new URLSearchParams(window.location.search);
const projectId = window.PROJECT_ID || params.get('id');
const project = PROJECTS.find(p => p.id === projectId);

if (!project) { window.location.href = 'index.html'; }

document.title = `${project.name} — Engistat`;

// ── Gallery ──
let activeThumb = 0;

function renderGallery() {
    const current = project.media[activeThumb];
    const mainContent = current.type === 'image'
        ? `<img src="${current.src}" alt="${current.label}">`
        : `<div class="gallery-placeholder-main">${current.icon}</div>`;
    document.getElementById('galleryMain').innerHTML = mainContent;

    document.getElementById('galleryThumbs').innerHTML = project.media.map((m, i) => {
        const inner = m.type === 'image'
            ? `<img src="${m.src}" alt="${m.label}">`
            : m.icon;
        return `<div class="gallery-thumb ${i === activeThumb ? 'active' : ''}" onclick="setThumb(${i})">${inner}</div>`;
    }).join('');
}

function setThumb(index) {
    activeThumb = index;
    renderGallery();
}

// ── Hero Banner ──
document.getElementById('projectType').textContent = project.type;
document.getElementById('projectTitle').textContent = project.name;
document.getElementById('projectLocation').innerHTML = `📍 ${project.location}`;
document.getElementById('projectPrice').textContent = project.priceRange;
document.getElementById('projectConfigs').innerHTML = project.configs
    .map(c => `<span class="config-tag">${c}</span>`).join('');

// ── Highlights ──
document.getElementById('highlightsGrid').innerHTML = project.highlights.map(h => `
    <div class="highlight-item">
        <div class="highlight-icon">${h.icon}</div>
        <div class="highlight-value">${h.value}</div>
        <div class="highlight-unit">${h.unit}</div>
    </div>
`).join('');

// ── Description ──
document.getElementById('projectTagline').textContent = project.tagline;
document.getElementById('projectDescription').innerHTML = project.description
    .map(p => `<p class="desc-para">${p}</p>`).join('');

// ── Amenities ──
document.getElementById('amenitiesGrid').innerHTML = project.amenities.map(a => `
    <div class="amenity-item">
        <span class="amenity-icon">${a.icon}</span>
        <span>${a.label}</span>
    </div>
`).join('');

// ── Floor Plans ──
let activePlan = 0;
function renderPlans() {
    document.getElementById('planTabs').innerHTML = project.floorPlans.map((p, i) => `
        <button class="plan-tab ${i === activePlan ? 'active' : ''}" onclick="setPlan(${i})">${p.label}</button>
    `).join('');

    const plan = project.floorPlans[activePlan];
    document.getElementById('planCards').innerHTML = `
        <div class="plan-card">
            <div class="plan-icon">${plan.icon}</div>
            <div class="plan-info">
                <div class="plan-name">${plan.name}</div>
                <div class="plan-area">${plan.area}</div>
            </div>
            <button class="plan-cta" onclick="document.getElementById('ctaForm').scrollIntoView({behavior:'smooth'})">Get Floor Plan</button>
        </div>
    `;
}
function setPlan(i) { activePlan = i; renderPlans(); }

// ── Neighbourhood ──
document.getElementById('neighbourhoodIntro').innerHTML =
    `${project.name} is located at ${project.location}, offering excellent connectivity to key landmarks.`;
document.getElementById('neighbourhoodGrid').innerHTML = project.neighbourhood.map(n => `
    <div class="neighbour-item">
        <div class="neighbour-place">📍 ${n.place}</div>
        <div class="neighbour-time">${n.time}</div>
    </div>
`).join('');

// ── Map ──
document.getElementById('mapEmbed').innerHTML = `
    <iframe src="${project.mapEmbed}" width="100%" height="360"
        style="border:0;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
`;

// ── FAQ ──
document.getElementById('faqList').innerHTML = project.faq.map((item, i) => `
    <div class="faq-item" onclick="toggleFaq(${i})">
        <div class="faq-question">
            <span>${item.q}</span>
            <span class="faq-arrow" id="faqArrow${i}">&#8595;</span>
        </div>
        <div class="faq-answer" id="faqAnswer${i}">${item.a}</div>
    </div>
`).join('');

function toggleFaq(i) {
    const answer = document.getElementById(`faqAnswer${i}`);
    const arrow = document.getElementById(`faqArrow${i}`);
    const isOpen = answer.classList.toggle('open');
    arrow.innerHTML = isOpen ? '&#8593;' : '&#8595;';
}

// ── CTA Card ──
document.getElementById('ctaProjectName').textContent = project.name;
document.getElementById('ctaLocation').innerHTML = `📍 ${project.location}`;

// ── Toast ──
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── CTA Form ──
const WEB3FORMS_KEY = '7ff0227a-86f5-447d-bdf9-742c89bf5ddd';

document.getElementById('ctaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const phoneEl = document.getElementById('ctaPhone');
    const phone = phoneEl.value.trim();
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
        phoneEl.style.outline = '2px solid red';
        setTimeout(() => phoneEl.style.outline = '', 1500);
        return;
    }

    const submitBtn = document.getElementById('ctaForm').querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject: `Callback Request: ${project.name}`,
                from_name: 'Engistat Website',
                message: `Callback request received!\n\nProject: ${project.name}\nLocation: ${project.location}\nPhone: +91${phone}\nTime: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
            })
        });
        const data = await res.json();
        if (data.success) {
            phoneEl.value = '';
            showToast('✓ Thank you! We\'ll call you back shortly.');
        } else {
            showToast('Something went wrong. Please try again.');
        }
    } catch {
        showToast('Something went wrong. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request a Callback';
    }
});

// ── Init ──
renderGallery();
renderPlans();
