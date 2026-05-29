const loadBtn = document.getElementById('loadBtn');
const campaignsContainer = document.getElementById('campaignsContainer'); // updated to match HTML
const searchInput = document.getElementById('searchInput');

let campaignsData = [];

loadBtn.addEventListener('click', loadCampaigns);
searchInput.addEventListener('input', () => filterCampaigns(searchInput.value.trim()));

function loadCampaigns() {
  loadBtn.disabled = true;
  loadBtn.textContent = 'Loading...';

  fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(response => {
      if (!response.ok) throw new Error('Network response not ok');
      return response.json();
    })
    .then(data => {
      // Use your 9 custom campaigns with new image URLs
      campaignsData = [
        { id:1, title:"Library Renovation", description:"Help us renovate the college library with new furniture and books.", goal:8000, raised:3200, img:"https://images.stockcake.com/public/6/0/4/604c4435-d6b3-4c2d-bd39-8a8b64d31ed8_large/library-group-study-stockcake.jpg" },
        { id:2, title:"Sports Equipment Drive", description:"Fund new sports equipment for our underfunded athletics department.", goal:5000, raised:1500, img:"https://static.clubs.nfl.com/image/private/t_new_photo_album/buccaneers/yyichwstcftsdnlvaf1s.jpg" },
        { id:3, title:"Campus Garden Project", description:"Support our green campus initiative by funding a sustainable garden.", goal:6000, raised:2500, img:"https://www.robertlandscapes.com/wp-content/uploads/2023/11/Blog-image-Multi-Level-Garden-Design.jpg" },
        { id:4, title:"Tech Hackathon Sponsorship", description:"Support our college hackathon by funding snacks, prizes, and logistics.", goal:7000, raised:2500, img:"https://cdn.prod.website-files.com/5b3dd54182ecae4d1602962f/609e33e18c5000af6211f094_HR%20Hackathon%20-%20Section%202.jpg" },
        { id:5, title:"Drama Club Costumes", description:"Help the drama club get costumes and props for the annual stage play.", goal:4000, raised:1800, img:"https://bloomfieldcollegiate.org.uk/wp-content/uploads/2011/03/Annie-Cast-800x400.jpg" },
        { id:6, title:"Coding Bootcamp Scholarship", description:"Provide scholarships for underprivileged students to attend a coding bootcamp.", goal:10000, raised:3200, img:"https://fsa2-assets.imgix.net/assets/New-blog/iStock-1307433810.jpg?auto=compress%2Cformat&crop=focalpoint&domain=fsa2-assets.imgix.net&fit=crop&fp-x=0.5&fp-y=0.5&h=800&ixlib=php-3.3.0&w=1200" },
        { id:7, title:"Photography Club Exhibition", description:"Fund printing and frames for the campus photography exhibition.", goal:5000, raised:2200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEx0YBi9t13gK8AI_Fi_g_HZ1brVfAq66IfA&s" },
        { id:8, title:"Science Fair Materials", description:"Help students purchase materials for their innovative science fair projects.", goal:6000, raised:2700, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRprCH16CVOiAnI7wB1b8sa_9BUgEFpeArSRQ&s" },
        { id:9, title:"College Magazine Printing", description:"Support the printing of our annual college magazine featuring student work.", goal:3000, raised:1500, img:"https://cdn.britannica.com/92/191792-050-E1931160/Magazines-display-magazines-Canada-store-Toronto-Ontario.jpg" }
      ];

      campaignsData.forEach(c => c.percent = Math.round((c.raised / c.goal) * 100));
      renderCampaigns(campaignsData);
    })
    .catch(err => {
      console.error('Fetch error:', err);
      campaignsData = fallbackData();
      renderCampaigns(campaignsData);
    })
    .finally(() => {
      loadBtn.disabled = false;
      loadBtn.textContent = 'View Campaigns (GET request)';
    });
}

function renderCampaigns(list) {
  campaignsContainer.innerHTML = '';
  if (list.length === 0) {
    campaignsContainer.innerHTML = '<p>No campaigns found.</p>';
    return;
  }

  list.forEach(c => {
    const card = document.createElement('div');
    card.className = 'campaign';
    card.innerHTML = `
      <img src="${c.img}" alt="${c.title}">
      <h3>${c.title}</h3>
      <p class="short-desc">${c.description}</p>

      <div class="progress-row">
        <progress value="${c.percent}" max="100"></progress>
        <span class="percent-text">${c.percent}%</span>
      </div>

      <div class="amounts">₹${c.raised.toLocaleString()} raised of ₹${c.goal.toLocaleString()}</div>

      <div class="actions">
        <button class="more-btn">More Info</button>
        <button class="contribute-btn">Contribute Now</button>
      </div>

      <div class="details" style="display:none;">
        <p>${c.description}</p>
        <small>Campaign ID: ${c.id}</small>
      </div>
    `;
    campaignsContainer.appendChild(card);

    const moreBtn = card.querySelector('.more-btn');
    const details = card.querySelector('.details');
    moreBtn.addEventListener('click', () => {
      const isOpen = details.style.display === 'block';
      details.style.display = isOpen ? 'none' : 'block';
      moreBtn.textContent = isOpen ? 'More Info' : 'Hide Info';
    });

    const contributeBtn = card.querySelector('.contribute-btn');
    contributeBtn.addEventListener('click', () => {
      alert('Demo: This would open the payment flow and send a POST request to the backend.');
      console.log('Example POST payload:', { campaignId: c.id, amount: 500, userId: 123 });
    });
  });
}

function filterCampaigns(q) {
  if (!q) return renderCampaigns(campaignsData);
  const term = q.toLowerCase();
  const filtered = campaignsData.filter(c =>
    c.title.toLowerCase().includes(term) || c.description.toLowerCase().includes(term)
  );
  renderCampaigns(filtered);
}

function fallbackData() {
  return [
    { id: 101, title: 'Robotics kit', description: 'Help robotics lab buy motors.', goal: 12000, raised: 4000, percent: 33, img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=60" },
    { id: 102, title: 'Plant trees', description: 'Plant 200 trees in campus.', goal: 8000, raised: 2600, percent: 33, img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=60" },
    { id: 103, title: 'Open-mic night', description: 'Fund stage and mics for cultural night.', goal: 5000, raised: 2500, percent: 50, img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=600&q=60" }
  ];
}
function calculateRiskScore(filesChanged) {
    if (filesChanged > 10) {
        return "CRITICAL";
    } else if (filesChanged > 5) {
        return "HIGH";
    } else if (filesChanged > 2) {
        return "MEDIUM";
    }
    return "LOW";
}

console.log(calculateRiskScore(4));
