// browse.js — Browse Freelancers: live search + category filter

const freelancers = [
  { name: 'Tunde Adewale', role: 'Web Developer', category: 'Web Development', rating: 4.9, reviews: 112, price: 25000, tags: ['React', 'Node.js'], initials: 'TA', color: '#FF6B5B' },
  { name: 'Fatima Bello', role: 'Graphic Designer', category: 'Graphic Design', rating: 5.0, reviews: 87, price: 18000, tags: ['Branding', 'Figma'], initials: 'FB', color: '#FFC93C', dark: true },
  { name: 'Chinedu Okafor', role: 'Content Writer', category: 'Writing & Editing', rating: 4.8, reviews: 64, price: 12000, tags: ['SEO', 'Copywriting'], initials: 'CO', color: '#1B1F3B' },
  { name: 'Amaka Nwosu', role: 'Virtual Assistant', category: 'Virtual Assistance', rating: 4.7, reviews: 58, price: 15000, tags: ['Scheduling', 'Email'], initials: 'AN', color: '#6b7de0' },
  { name: 'Segun Balogun', role: 'Video Editor', category: 'Video Editing', rating: 4.9, reviews: 73, price: 22000, tags: ['Premiere Pro', 'Motion'], initials: 'SB', color: '#FF6B5B' },
  { name: 'Ngozi Umeh', role: 'Social Media Manager', category: 'Social Media', rating: 4.6, reviews: 45, price: 14000, tags: ['Instagram', 'Strategy'], initials: 'NU', color: '#FFC93C', dark: true },
  { name: 'Ibrahim Sagir', role: 'Full-Stack Developer', category: 'Web Development', rating: 4.8, reviews: 96, price: 30000, tags: ['Django', 'Vue'], initials: 'IS', color: '#1B1F3B' },
  { name: 'Bisi Ogundele', role: 'UI/UX Designer', category: 'Graphic Design', rating: 4.9, reviews: 102, price: 20000, tags: ['UI Design', 'Prototyping'], initials: 'BO', color: '#6b7de0' },
  { name: 'Emeka Chukwu', role: 'Copywriter', category: 'Writing & Editing', rating: 4.7, reviews: 51, price: 10000, tags: ['Ad Copy', 'Blogs'], initials: 'EC', color: '#FF6B5B' }
];

const grid = document.getElementById('freelancerGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const resultsCount = document.getElementById('resultsCount');

function renderFreelancers(list) {
  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state">No freelancers match your search. Try a different keyword or category.</div>`;
    resultsCount.textContent = 'Showing 0 freelancers';
    return;
  }

  grid.innerHTML = list.map(f => `
    <div class="freelancer-card">
      <div class="freelancer-top">
        <div class="fl-avatar" style="background:${f.color};${f.dark ? 'color:#1B1F3B;' : ''}">${f.initials}</div>
        <div><div class="fl-name">${f.name}</div><div class="fl-role">${f.role}</div></div>
      </div>
      <div class="fl-rating">★ ${f.rating.toFixed(1)} <span>(${f.reviews} reviews)</span></div>
      <div class="fl-tags">${f.tags.map(t => `<span class="fl-tag">${t}</span>`).join('')}</div>
      <div class="fl-footer">
        <div class="fl-price">₦${f.price.toLocaleString()} <span>/ project</span></div>
        <button class="fl-btn">View Profile</button>
      </div>
    </div>
  `).join('');

  resultsCount.textContent = `Showing ${list.length} freelancer${list.length === 1 ? '' : 's'}`;
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = freelancers.filter(f => {
    const matchesCategory = category === 'all' || f.category === category;
    const matchesQuery =
      query === '' ||
      f.name.toLowerCase().includes(query) ||
      f.role.toLowerCase().includes(query) ||
      f.tags.some(tag => tag.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  renderFreelancers(filtered);
}

searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);

// Initial render on page load
renderFreelancers(freelancers);
