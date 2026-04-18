// Project Detail Page — Load project by ?id= param

const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const project = PROJECTS.find(p => p.id === projectId);

if (!project) {
    window.location.href = 'index.html';
}

// Set page title
document.title = `${project.name} — Engistat`;

// Gallery
let activeThumb = 0;
const galleryMain = document.getElementById('galleryMain');
const galleryThumbs = document.getElementById('galleryThumbs');

function renderGallery() {
    // Main image
    const current = project.media[activeThumb];
    galleryMain.innerHTML = `<div class="gallery-placeholder-main">${current.icon}</div>`;

    // Thumbnails
    galleryThumbs.innerHTML = project.media.map((m, i) => `
        <div class="gallery-thumb ${i === activeThumb ? 'active' : ''}" onclick="setThumb(${i})">
            ${m.icon}
        </div>
    `).join('');
}

function setThumb(index) {
    activeThumb = index;
    renderGallery();
}

// Project Info
document.getElementById('projectType').textContent = project.type;
document.getElementById('projectTitle').textContent = project.name;
document.getElementById('projectLocation').textContent = project.location;
document.getElementById('projectAbout').textContent = project.about;

// CTA Card
document.getElementById('ctaProjectName').textContent = project.name;
document.getElementById('ctaLocation').innerHTML = `📍 ${project.location}`;

// Map
document.getElementById('mapEmbed').innerHTML = `
    <iframe
        src="${project.mapEmbed}"
        width="100%"
        height="320"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
    </iframe>
`;

// Amenities
document.getElementById('amenitiesGrid').innerHTML = project.amenities.map(a => `
    <div class="amenity-item">
        <span class="amenity-icon">${a.icon}</span>
        <span>${a.label}</span>
    </div>
`).join('');

// Toast helper
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// CTA Form
document.getElementById('ctaForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = document.getElementById('ctaPhone').value.trim();
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
        document.getElementById('ctaPhone').style.outline = '2px solid red';
        setTimeout(() => document.getElementById('ctaPhone').style.outline = '', 1500);
        return;
    }
    // Here you'd send to your backend/form service
    console.log(`Interest: ${project.name} | Phone: +91${phone}`);
    document.getElementById('ctaPhone').value = '';
    showToast('✓ Thank you! We\'ll call you back shortly.');
});

// Init
renderGallery();
