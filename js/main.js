// Homepage — Render projects grid and handle interest modal

const grid = document.getElementById('projectsGrid');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalProjectName = document.getElementById('modalProjectName');
const interestForm = document.getElementById('interestForm');
const phoneInput = document.getElementById('phoneInput');

let activeProject = null;

function statusClass(status) {
    return status === 'new' ? 'new' : status === 'ongoing' ? 'ongoing' : 'sold';
}

function statusLabel(status) {
    return status === 'new' ? 'New Launch' : status === 'ongoing' ? 'Ongoing' : 'Sold Out';
}

function renderProjects() {
    grid.innerHTML = PROJECTS.map(p => `
        <div class="project-card">
            <div class="card-image">
                <div class="card-image-placeholder">${p.media[0].icon}</div>
                <span class="card-status ${statusClass(p.status)}">${statusLabel(p.status)}</span>
            </div>
            <div class="card-body">
                <div class="card-type">${p.type}</div>
                <div class="card-title">${p.name}</div>
                <div class="card-location">📍 ${p.location}</div>
                <div class="card-amenities">
                    ${p.amenities.slice(0, 4).map(a => `<span class="amenity-tag">${a.icon} ${a.label}</span>`).join('')}
                    ${p.amenities.length > 4 ? `<span class="amenity-tag">+${p.amenities.length - 4} more</span>` : ''}
                </div>
                <div class="card-cta">
                    <a href="${p.id}.html" class="btn-primary">View Details</a>
                    <button class="btn-secondary" onclick="openModal('${p.id}', event)">Express Interest</button>
                </div>
            </div>
        </div>
    `).join('');
}

function openModal(projectId, e) {
    if (e) e.preventDefault();
    activeProject = PROJECTS.find(p => p.id === projectId);
    if (!activeProject) return;
    modalProjectName.textContent = activeProject.name + ' — ' + activeProject.location;
    phoneInput.value = '';
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => phoneInput.focus(), 300);
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function showToast(msg) {
    let toast = document.getElementById('mainToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'mainToast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// Events
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

interestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = phoneInput.value.trim();
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
        phoneInput.style.borderColor = 'red';
        setTimeout(() => phoneInput.style.borderColor = '', 1500);
        return;
    }
    // Here you'd send to your backend/form service
    console.log(`Interest: ${activeProject?.name} | Phone: +91${phone}`);
    closeModal();
    showToast('✓ Thank you! We\'ll call you back shortly.');
});

// Init
renderProjects();
