/* ── HAMBURGER MENU ────────────────────────────────────────── */
(function() {
  function initHam() {
    var btn = document.getElementById('navHam');
    var overlay = document.getElementById('navOverlay');
    if (!btn || !overlay) return;

    function openMenu() {
      btn.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      btn.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', function() {
      if (overlay.classList.contains('open')) closeMenu();
      else openMenu();
    });

    // Close on any link click inside overlay
    overlay.querySelectorAll('[data-link]').forEach(function(a) {
      a.addEventListener('click', closeMenu);
    });

    // Close on outside click
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeMenu();
    });
  }

  // Run on load and after every route render
  document.addEventListener('DOMContentLoaded', initHam);
  window.addEventListener('routeRendered', initHam);
})();

/* ── MAP RESIZE FIX ────────────────────────────────────────── */
// Force Leaflet to recalculate size when container becomes visible
(function() {
  var mapResizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(mapResizeTimer);
    mapResizeTimer = setTimeout(function() {
      if (window._atlasMap) {
        window._atlasMap.invalidateSize();
      }
    }, 200);
  });
})();

// ── DATA ──────────────────────────────────────────────────────────────────
const projects = [
  { id:'kano-epc', title:'Kano Industrial Power Plant', loc:'Kano, Nigeria', lat:12.0022, lng:8.5919, service:'EPC', status:'complete', capacity:'120 MW', value:'$340M', client:'Kano State Govt', year:'2021', tags:['EPC','Gas','Industrial'], desc:'Design, procurement and construction of a 120 MW combined-cycle gas power plant serving Kano State\'s industrial sector. Delivered 4 months ahead of schedule with zero LTIs.' },
  { id:'lagos-oam', title:'Lagos Grid Stabilisation', loc:'Lagos, Nigeria', lat:6.5244, lng:3.3792, service:'O&M', status:'active', capacity:'85 MW', value:'$22M/yr', client:'TCN', year:'2019–Present', tags:['O&M','Grid','Transmission'], desc:'Ongoing operations and maintenance contract for six 132/33kV substations across the Lagos metropolitan grid. Maintained 99.2% uptime over 5 years.' },
  { id:'abuja-boot', title:'Abuja Solar Hybrid BOOT', loc:'Abuja, Nigeria', lat:9.0765, lng:7.3986, service:'BOOT', status:'active', capacity:'45 MW', value:'$180M', client:'AEDC', year:'2022', tags:['BOOT','Solar','Hybrid'], desc:'Build, Own, Operate and Transfer of a 45 MW solar-diesel hybrid plant under a 25-year concession agreement with Abuja Electricity Distribution Company.' },
  { id:'ph-energy', title:'Port Harcourt Captive Power', loc:'Port Harcourt, Nigeria', lat:4.8156, lng:7.0498, service:'Energy', status:'active', capacity:'60 MW', value:'$210M', client:'Shell Nigeria', year:'2020', tags:['Captive','Gas','Energy'], desc:'Bespoke captive power solution for Shell\'s Port Harcourt facility, comprising two 30 MW gas gensets with 72-hour fuel storage and automated load management.' },
  { id:'ghana-epc', title:'Accra West Substation', loc:'Accra, Ghana', lat:5.6037, lng:-0.1870, service:'EPC', status:'complete', capacity:'330/161 kV', value:'$95M', client:'GRIDCo', year:'2022', tags:['EPC','Transmission','Substation'], desc:'Full EPC of a 330/161 kV bulk supply substation including civil works, equipment supply, HV testing and SCADA commissioning.' },
  { id:'kenya-consult', title:'East Africa Grid Study', loc:'Nairobi, Kenya', lat:-1.2921, lng:36.8219, service:'Consulting', status:'complete', capacity:'N/A', value:'$8M', client:'AfDB', year:'2023', tags:['Consulting','Advisory','Master Plan'], desc:'Comprehensive 18-month grid expansion study for the African Development Bank covering Kenya, Uganda and Tanzania transmission infrastructure needs to 2040.' },
  { id:'kaduna-boot', title:'Kaduna Mini-Grid Portfolio', loc:'Kaduna, Nigeria', lat:10.5264, lng:7.4379, service:'BOOT', status:'pipeline', capacity:'12 MW', value:'$45M', client:'REA Nigeria', year:'2025', tags:['BOOT','Mini-Grid','Rural'], desc:'Portfolio of 8 solar mini-grids serving rural communities in Kaduna State under Nigeria\'s Rural Electrification Agency framework. Financial close expected Q1 2025.' },
  { id:'senegal-epc', title:'Dakar LNG Terminal', loc:'Dakar, Senegal', lat:14.7167, lng:-17.4677, service:'EPC', status:'active', capacity:'500 MMSCFD', value:'$620M', client:'Petrosen', year:'2023', tags:['EPC','LNG','Upstream'], desc:'Engineering, procurement and construction of Senegal\'s first LNG receiving terminal, enabling gas-to-power infrastructure for the greater Dakar region.' },
  { id:'tanzania-oam', title:'Dar es Salaam Distribution', loc:'Dar es Salaam, Tanzania', lat:-6.7924, lng:39.2083, service:'O&M', status:'active', capacity:'Multi-site', value:'$15M/yr', client:'TANESCO', year:'2022–Present', tags:['O&M','Distribution','HV'], desc:'O&M framework contract for TANESCO covering 12 primary substations and 340km of 33kV distribution network in the Dar es Salaam urban area.' },
  { id:'abidjan-energy', title:'Abidjan Gas-to-Power', loc:'Abidjan, Côte d\'Ivoire', lat:5.3600, lng:-4.0083, service:'Energy', status:'pipeline', capacity:'200 MW', value:'$580M', client:'CIE', year:'2026', tags:['Gas','Energy','IPP'], desc:'Independent Power Project supplying 200 MW to the Ivorian national grid under a 20-year PPA. Currently in final ESIA and lender due diligence phase.' },
];

const services = [
  { code:'SVC-01', title:'Engineering, Procurement & Construction', abbr:'EPC', desc:'Full-cycle EPC delivery for power generation, transmission and distribution infrastructure. From FEED through commissioning, ATLAS delivers on time and on budget — backed by a 100% project completion record across 23 countries.', tags:['Power Generation','Transmission','Distribution','Civil Works','Commissioning'], img:'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80' },
  { code:'SVC-02', title:'Operations & Maintenance', abbr:'O&M', desc:'Long-term O&M contracts for power plants, substations and network assets. Our in-country teams maintain asset availability above 98% through preventive maintenance regimes and 24/7 response capability.', tags:['Preventive Maintenance','Emergency Response','SCADA','Asset Management'], img:'Operations%20%26%20Maintenance.jpg' },
  { code:'SVC-03', title:'Build, Own, Operate & Transfer', abbr:'BOOT', desc:'We structure and deliver BOOT and PPP arrangements for power infrastructure — mobilising private capital, managing project risk and operating assets under long-term offtake agreements before transfer to public ownership.', tags:['Project Finance','PPP','Concession','Offtake Agreements'], img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80' },
  { code:'SVC-04', title:'Energy Solutions', abbr:'Energy', desc:'Bespoke captive power, hybrid energy systems and distributed generation for industrial and commercial clients. We design, supply and operate systems that guarantee reliable power independent of the national grid.', tags:['Captive Power','Solar Hybrid','Gas Gensets','Battery Storage'], img:'Energy%20Solutions.jpg' },
  { code:'SVC-05', title:'Advisory & Consulting', abbr:'Consulting', desc:'Technical, financial and regulatory advisory for energy sector stakeholders — from grid master planning and feasibility studies to transaction advisory and lender\'s engineer mandates.', tags:['Feasibility Studies','Grid Planning','Transaction Advisory','Due Diligence'], img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80' },
];

const news = [
  { id:'kano-completion', cat:'Project Update', title:'ATLAS Completes 120 MW Kano Power Plant Ahead of Schedule', date:'Jan 2025', author:'ATLAS Communications', img:'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80', excerpt:'The Kano Industrial Power Plant has been successfully commissioned four months ahead of contractual deadline, delivering reliable electricity to over 1.2 million residents.', content:`<p>ATLAS Infrastructure Group is pleased to announce the successful commissioning of the 120 MW Kano Industrial Power Plant, marking a significant milestone in Nigeria\'s ongoing power sector reform. The project, executed under a full EPC contract with Kano State Government, was delivered four months ahead of the contractual completion date and within the approved project budget.</p><p>The plant — a combined-cycle gas facility combining two Frame 6 gas turbines with a single steam recovery unit — will supply power to Kano\'s industrial corridor, where acute electricity shortfalls have constrained manufacturing output for over a decade.</p><h2>Technical scope</h2><p>ATLAS managed all aspects of the project from detailed engineering through to commissioning and performance testing. Procurement was coordinated from our Lagos and Dubai supply chain hubs, with over 60% of construction labour and 40% of materials sourced in-country — creating more than 2,400 direct and indirect jobs during the construction phase.</p><blockquote><p>This project demonstrates what is possible when public clients and private contractors share a genuine commitment to delivery.</p></blockquote><p>The facility includes a 132kV switchyard and 18km transmission line connecting the plant to the Kano metropolitan grid. SCADA systems are integrated with the TCN national control centre, enabling real-time monitoring and dispatch optimisation.</p>` },
  { id:'dakar-lng', cat:'Project Award', title:'ATLAS Awarded $620M Dakar LNG Terminal EPC Contract', date:'Nov 2024', author:'ATLAS Communications', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80', excerpt:'Senegal\'s state oil company Petrosen has selected ATLAS to lead engineering, procurement and construction of the country\'s first LNG receiving terminal.', content:`<p>ATLAS Infrastructure Group has been awarded the engineering, procurement and construction contract for Senegal's first LNG receiving terminal by state energy company Petrosen. The contract, valued at $620 million, positions ATLAS as the lead constructor for one of West Africa's most significant energy infrastructure projects of the decade.</p><p>The terminal will receive LNG vessels of up to 174,000 cubic metres, with regasification capacity of 500 MMSCFD — sufficient to supply gas to 2,500 MW of new power generation capacity currently under development by the Government of Senegal.</p><h2>Strategic importance</h2><p>Senegal's offshore gas discoveries at Sangomar and Greater Tortue have catalysed a major restructuring of the country's energy sector. The LNG terminal is the critical enabling infrastructure — without it, neither domestic gas monetisation nor the planned gas-to-power programme can proceed.</p><blockquote><p>Winning this mandate confirms ATLAS as the leading EPC contractor for complex energy infrastructure across West Africa.</p></blockquote>` },
  { id:'africa-grid', cat:'Insight', title:'Why Sub-Saharan Africa Needs a New Approach to Grid Investment', date:'Oct 2024', author:'Dr. Emeka Nwosu, Head of Advisory', img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80', excerpt:'Traditional grid expansion models are failing African utilities. A distributed, data-driven approach to transmission planning is the only viable path to universal access by 2040.', content:`<p>Sub-Saharan Africa has more than 600 million people without access to reliable electricity. The gap between installed generation capacity and actual delivered power — the so-called "dark megawatt" problem — is not primarily a generation problem. It is a transmission and distribution problem, compounded by chronically underinvested grid infrastructure and utilities operating without adequate planning tools.</p><p>The traditional response to this challenge — expanding the high-voltage backbone grid radially from central generating stations — made economic sense in the 20th century. It no longer does. The declining cost of distributed generation, battery storage and smart metering technology has fundamentally altered the economics of electrification. A village 200km from the nearest transmission line is now cheaper to electrify with a solar-battery mini-grid than with a grid extension project that will take seven years to finance and build.</p><h2>What the data tells us</h2><p>ATLAS's advisory team has modelled electrification pathways for 14 African countries over the past four years. In every case, the least-cost scenario for universal access by 2040 involves a hybrid approach: reinforcing the transmission backbone in high-density corridors, while deploying mini-grids and standalone systems in dispersed rural areas.</p><blockquote><p>The technology question is settled. The financing and policy question is not — and that is where the work needs to happen.</p></blockquote>` },
  { id:'abuja-solar', cat:'Project Update', title:'Abuja Solar Hybrid Achieves First Year Performance Targets', date:'Sep 2024', author:'ATLAS Communications', img:'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=900&q=80', excerpt:'The 45 MW Abuja Solar Hybrid BOOT project has exceeded first-year generation targets by 8%, with diesel displacement rates outperforming the base case by a significant margin.', content:`<p>The 45 MW Abuja Solar Hybrid BOOT facility has completed its first full year of commercial operation, reporting generation performance that exceeds contractual targets by 8% and diesel displacement rates that outperform the agreed base case by 23 percentage points.</p><p>The facility — structured under a 25-year Build, Own, Operate and Transfer agreement with Abuja Electricity Distribution Company — combines 35 MW of ground-mounted solar PV with a 10 MW battery energy storage system and a 10 MW diesel backup capability. Intelligent dispatch logic developed by ATLAS's energy management team optimises the generation mix in real-time, minimising diesel consumption while maintaining grid stability during periods of low solar irradiance.</p>` },
  { id:'kaduna-mini-grid', cat:'Project Award', title:'ATLAS Secures Kaduna Mini-Grid Framework with REA', date:'Aug 2024', author:'ATLAS Communications', img:'https://images.unsplash.com/photo-1509390145686-b8c5aed7df14?w=900&q=80', excerpt:'Nigeria\'s Rural Electrification Agency has selected ATLAS to develop, finance and operate a portfolio of solar mini-grids serving eight communities in Kaduna State.', content:`<p>ATLAS Infrastructure Group has entered into a Framework Agreement with Nigeria's Rural Electrification Agency for the development, financing, construction and operation of a portfolio of solar mini-grids across eight rural communities in Kaduna State.</p><p>The portfolio — with total installed capacity of 12 MW across sites ranging from 800 kW to 2.5 MW — will connect approximately 45,000 households and 2,800 small businesses that currently have no access to grid electricity. Financial close is targeted for Q1 2025, with construction commencement scheduled for Q2 2025.</p>` },
];

// ── ROUTER ─────────────────────────────────────────────────────────────────
let mapInstance = null;

function router() {
  const hash = location.hash || '#/';
  const path = hash.slice(1);
  const app = document.getElementById('app');
  let html = '';

  if (path === '/' || path === '') html = homePage();
  else if (path === '/about') html = aboutPage();
  else if (path === '/services') html = servicesPage();
  else if (path === '/solutions') html = solutionsPage();
  else if (path === '/projects') html = projectsPage();
  else if (path === '/why-us') html = whyUsPage();
  else if (path === '/news') html = newsPage();
  else if (path.startsWith('/article/')) html = articlePage(path.split('/article/')[1]);
  else if (path === '/contact') html = contactPage();
  else html = notFound();

  // Destroy existing map
  if (mapInstance) { mapInstance.remove(); mapInstance = null; }

  app.innerHTML = `<div class="page">${html}${path !== '/projects' ? footerHTML() : ''}</div>`;
  window.scrollTo(0,0);
  bindEvents();
  updateNav(path);

  if (path === '/projects') initMap();
}

function updateNav(path) {
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href').slice(1);
    if (href === path || (path.startsWith('/article/') && href === '/news')) a.classList.add('active');
  });
}

function bindEvents() {
  document.querySelectorAll('a,button,.fp-card,.news-card,.news-featured,.news-side-card,.service-card,.map-project-item,.leader-card,.post-related-item,.tech-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
  });
  document.querySelectorAll('.meridian-form,.atlas-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const msg = form.parentElement.querySelector('.success-msg');
      if (msg) { msg.style.display = 'block'; form.style.display = 'none'; }
    });
  });
  document.querySelectorAll('.map-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProjects(btn.dataset.filter || 'all');
    });
  });
  document.querySelectorAll('.footer-scroll').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); });
  });
}

// ── SHARED ─────────────────────────────────────────────────────────────────
const tickerHTML = () => `<div class="ticker"><div class="ticker-track">${
  ['EPC Delivery','O&M Excellence','BOOT Structuring','Energy Solutions','Advisory Services','23 Countries','$4.2B Portfolio','1,200+ MW Delivered','EPC Delivery','O&M Excellence','BOOT Structuring','Energy Solutions','Advisory Services','23 Countries','$4.2B Portfolio','1,200+ MW Delivered']
  .map(t=>`<span class="ticker-item"><span class="sep"></span>${t}</span>`).join('')
}</div></div>`;

const statusBarHTML = () => `<div class="status-bar">
  <div class="status-item"><span class="status-dot"></span>10 Active Projects</div>
  <div class="status-item"><span class="status-dot amber"></span>3 In Pipeline</div>
  <div class="status-item">// Present in 23 Countries</div>
  <div class="status-item">// $4.2B Total Portfolio</div>
</div>`;

const footerHTML = () => `<footer>
  <div class="footer-top">
    <div>
      <div class="footer-brand-name">ATLAS Infrastructure</div>
      <div class="footer-brand-sub">Group · Est. 2005</div>
      <p class="footer-desc">Africa's leading independent infrastructure contractor — delivering power, energy and engineering solutions across Sub-Saharan Africa and beyond.</p>
    </div>
    <div>
      <div class="footer-col-title">Navigate</div>
      <ul class="footer-links">
        <li><a href="#/about" data-link>About Us</a></li>
        <li><a href="#/services" data-link>Services</a></li>
        <li><a href="#/projects" data-link>Projects</a></li>
        <li><a href="#/why-us" data-link>Why ATLAS</a></li>
        <li><a href="#/news" data-link>News & Insights</a></li>
      </ul>
    </div>
    <div>
      <div class="footer-col-title">Offices</div>
      <ul class="footer-links">
        <li><a href="#/contact" data-link>Lagos, Nigeria</a></li>
        <li><a href="#/contact" data-link>Abuja, Nigeria</a></li>
        <li><a href="#/contact" data-link>Accra, Ghana</a></li>
        <li><a href="#/contact" data-link>Nairobi, Kenya</a></li>
        <li><a href="#/contact" data-link>Dubai, UAE</a></li>
      </ul>
    </div>
    <div>
      <div class="footer-col-title">Contact</div>
      <ul class="footer-links">
        <li><a href="#/contact" data-link>info@atlasinfra.com</a></li>
        <li><a href="#/contact" data-link>+234 (0) 800 285 271</a></li>
        <li><a href="#/news" data-link>Newsroom</a></li>
        <li><a href="#/contact" data-link>Careers</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span class="footer-copy">© 2025 ATLAS Infrastructure Group. All rights reserved.</span>
    <span class="footer-coords">6.5244° N, 3.3792° E // Lagos HQ</span>
  </div>
</footer>`;

// ── PAGES ──────────────────────────────────────────────────────────────────

function homePage() {
  const heroImage = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80';
  const homeGallery = [
    { title:'Combined-Cycle Commissioning', meta:'Kano, Nigeria', img:'Power%20Plant.jpg' },
    { title:'Solar Hybrid Deployment', meta:'Kaduna, Nigeria', img:'Solar%20Hybrid%20Deployment.jpg' },
    { title:'Transmission Upgrade', meta:'Accra, Ghana', img:'download%20(2).jpg' },
    { title:'LNG Terminal Works', meta:'Dakar, Senegal', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80' },
    { title:'Grid Planning Studio', meta:'Lagos, Nigeria', img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80' },
  ];
  return `
  <section class="simple-hero">
    <div class="simple-hero-content">
      <div class="tag">ATLAS Infrastructure</div>
      <h1 class="display-title">Powering growth<br><em>across Africa.</em></h1>
      <p class="simple-hero-text">We deliver EPC, O&amp;M, BOOT and energy solutions for public and private clients. From feasibility to long-term operations, ATLAS provides reliable infrastructure that keeps industry moving.</p>
      <div class="simple-hero-actions">
        <a href="#/projects" class="btn-primary" data-link>View Projects</a>
        <a href="#/contact" class="btn-outline" data-link>Get in Touch</a>
      </div>
      <div class="simple-stats">
        <div class="simple-stat">
          <div class="simple-stat-num">47</div>
          <div class="simple-stat-label">Projects Delivered</div>
        </div>
        <div class="simple-stat">
          <div class="simple-stat-num">23</div>
          <div class="simple-stat-label">Countries</div>
        </div>
        <div class="simple-stat">
          <div class="simple-stat-num">1,200</div>
          <div class="simple-stat-label">MW Delivered</div>
        </div>
      </div>
    </div>
    <div class="simple-hero-panel">
      <img class="simple-hero-photo" src="${heroImage}" alt="ATLAS infrastructure construction site" loading="lazy">
      <div class="simple-hero-card">
        <div class="mono-label">At a glance</div>
        <h3>End-to-end delivery</h3>
        <p>One partner for design, construction, commissioning and long-term operations across generation, transmission and distribution.</p>
        <ul class="simple-list">
          <li>EPC contracting</li>
          <li>Operations and maintenance</li>
          <li>BOOT and PPP structures</li>
          <li>Energy solutions</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="landing-gallery">
    <div class="landing-gallery-head">
      <div class="tag">In the Field</div>
      <h2 class="section-title">Project moments<br><em>in motion.</em></h2>
      <p class="body-text">A snapshot of the teams, assets and environments where ATLAS delivers. These images capture the scale of our work across generation, transmission and advisory mandates.</p>
    </div>
    <div class="landing-gallery-grid">
      ${homeGallery.map((g,i)=>`
      <figure class="gallery-card${i === 0 ? ' feature' : ''}">
        <img src="${g.img}" alt="${g.title}" loading="lazy">
        <figcaption>
          <div class="gallery-title">${g.title}</div>
          <div class="gallery-meta">${g.meta}</div>
        </figcaption>
      </figure>`).join('')}
    </div>
  </section>

  <section class="simple-services">
    <div class="simple-section-head">
      <div class="tag">Services</div>
      <a href="#/services" class="simple-link" data-link>All Services -></a>
    </div>
    <div class="simple-card-grid">
      ${services.slice(0,3).map(s => `
      <div class="simple-card">
        <img class="simple-card-img" src="${s.img}" alt="${s.title}" loading="lazy">
        <div class="mono-label">${s.abbr}</div>
        <div class="simple-card-title">${s.title}</div>
        <div class="simple-card-desc">${s.desc}</div>
      </div>`).join("")}
    </div>
  </section>

  <section class="simple-cta">
    <div class="simple-cta-inner">
      <h2 class="section-title">Have a project?</h2>
      <p>Share your requirements and we will outline the fastest path to delivery.</p>
    </div>
    <a href="#/contact" class="btn-primary" data-link>Start a Conversation</a>
  </section>
  `;
}

function aboutPage() {
  const leaders = [
    { name:'Chukwuemeka Obi', role:'CEO & Founder', bio:'Former MD at Julius Berger Nigeria. Founded ATLAS in 2005 with a conviction that Africa needed a home-grown infrastructure champion.', img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
    { name:'Dr. Amina Yusuf', role:'Chief Technical Officer', bio:'PhD Electrical Engineering, Imperial College London. 22 years in power systems design across Africa, the Middle East and Europe.', img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
    { name:'Kwame Asante', role:'CFO', bio:'Former VP at Standard Bank Infrastructure Finance. Structured over $2B in project finance transactions across 15 African markets.', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
    { name:'Fatima Al-Hassan', role:'COO', bio:'20 years in O&M operations across Nigeria, Ghana and East Africa. Oversees ATLAS\'s in-country operations teams in all 9 countries.', img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80' },
  ];
  return `
  <div class="page-banner" data-bg="ATLAS">
    <div class="tag">Who We Are</div>
    <h1 class="display-title">Africa's<br>infrastructure<br><em>partner.</em></h1>
    <p>ATLAS Infrastructure Group was founded in Lagos in 2005 with a single conviction: that Africa's infrastructure gap could only be closed by African-led contractors with the capability, capital and commitment to deliver world-class projects on the continent.</p>
  </div>
  <div class="about-intro">
    <div class="about-img"></div>
    <div class="about-text">
      <div class="tag" style="margin-bottom:1.5rem">Our Story</div>
      <h2>Twenty years of<br>building Africa.</h2>
      <p>CEO Chukwuemeka Obi founded ATLAS after fifteen years in the Nigerian construction industry, watching international contractors extract value while building limited local capacity. His vision was different: a contractor that would be genuinely African in ownership, management, workforce and supply chain — while meeting or exceeding international standards for quality, safety and delivery.</p>
      <p>That vision has produced a business with $4.2B in completed and active projects, operations in 23 countries, and a workforce of over 8,500 people — more than 85% of them African nationals. We have never missed a completion milestone. We have never had a Lost Time Injury in five years.</p>
      <a href="#/why-us" class="btn-primary" data-link style="margin-top:1rem">Why Choose ATLAS</a>
    </div>
  </div>
  <div class="section-pad-lg section-dark">
    <div class="tag" style="margin-bottom:1.5rem">Our Values</div>
    <h2 class="section-title" style="margin-bottom:0">What we<br><em>stand for.</em></h2>
    <div class="values-grid-full">
      ${[['01','Delivery First','We judge ourselves — and each other — by results. Promises are a starting point. Delivery is the only measure that matters.'],['02','African Ownership','We believe infrastructure built by Africans, for Africans, transfers skills, builds institutions and creates lasting value in a way that imported solutions cannot.'],['03','Safety Without Compromise','Our zero-LTI record is the result of genuine commitment, not compliance. Every worker goes home safely. This is not negotiable.'],['04','Technical Excellence','We invest in our people, our systems and our equipment because the quality of our work is the only sustainable competitive advantage.'],['05','Long-term Partnership','Our best client relationships span decades. We invest in understanding our clients\' businesses because their success is our success.'],['06','Financial Integrity','We structure transactions honestly, manage costs transparently and deliver what we price. No surprises.']].map(([n,t,d])=>`
      <div class="value-card-full"><div class="vcf-num">// ${n}</div><div class="vcf-title">${t}</div><div class="vcf-desc">${d}</div></div>`).join('')}
    </div>
  </div>
  <div class="section-pad-lg">
    <div class="tag" style="margin-bottom:1.5rem">Leadership</div>
    <h2 class="section-title" style="margin-bottom:3rem">The team behind<br><em>ATLAS.</em></h2>
    <div class="leadership-grid">
      ${leaders.map(l=>`
      <div class="leader-card">
        <div class="leader-photo" style="background-image:url('${l.img}')"></div>
        <div class="leader-body">
          <div class="leader-name">${l.name}</div>
          <div class="leader-role">${l.role}</div>
          <div class="leader-bio">${l.bio}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
  <div class="cta-strip">
    <div><h2>Join the ATLAS team.</h2><p>We are always looking for exceptional engineers, project managers and commercial professionals across our African and Middle East offices.</p></div>
    <a href="#/contact" class="btn-navy" data-link>View Opportunities</a>
  </div>`;
}

function servicesPage() {
  return `
  <div class="page-banner" data-bg="SVC">
    <div class="tag">Our Capabilities</div>
    <h1 class="display-title">Five services.<br><em>End to end.</em></h1>
    <p>From initial feasibility through to multi-decade operations, ATLAS provides every capability a major infrastructure project requires — under one roof, with single-point accountability.</p>
  </div>
  <div class="services-full">
    ${services.map((s,i)=>`
    <div class="service-full-item">
      <div class="sfi-num">${String(i+1).padStart(2,'0')}</div>
      <div class="sfi-content">
        <div class="mono-label" style="margin-bottom:0.5rem">${s.code}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <p style="font-size:0.82rem;line-height:1.8;color:var(--slate-dim)">ATLAS has delivered ${['23','18','7','14','31'][i]} ${s.abbr} engagements to date, spanning power generation, transmission, distribution and upstream energy infrastructure across Sub-Saharan Africa, North Africa and the Middle East.</p>
        <div class="sfi-tags">${s.tags.map(t=>`<span class="sfi-tag">${t}</span>`).join('')}</div>
        <div style="margin-top:1.5rem"><a href="#/contact" class="btn-primary" data-link>Discuss a Project</a></div>
      </div>
      <div class="sfi-visual" style="background:url('${s.img}') center/cover no-repeat"></div>
    </div>`).join('')}
  </div>`;
}

function solutionsPage() {
  const solutions = [
    { title:'Captive Power', sub:'Industrial & Commercial', desc:'Guaranteed power for industrial facilities, manufacturing plants and commercial campuses — independent of the national grid. We design, build, finance and operate systems from 1 MW to 200 MW, integrating gas, diesel, solar, battery and grid connection as the economics dictate.', metrics:[['1 MW–200 MW','Capacity range'],['<72 hrs','Emergency deployment'],['99.5%','Uptime guarantee'],['25 yrs','Maximum contract term']], img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80' },
    { title:'Solar Hybrid', sub:'Clean & Reliable', desc:'Solar PV with battery storage and thermal backup — optimised by intelligent energy management systems to minimise fuel costs while guaranteeing supply continuity. Our systems reduce diesel consumption by 60–80% versus standalone genset solutions.', metrics:[['60-80%','Diesel reduction'],['25 yrs','Panel warranty'],['4 hr','Battery autonomy'],['<12 mo','Typical build time']], img:'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=900&q=80' },
    { title:'Grid Reinforcement', sub:'Transmission & Distribution', desc:'Turnkey upgrades to transmission and distribution infrastructure — from 11 kV distribution rehabilitation to 330 kV backbone reinforcement. We manage civil works, equipment supply, protection and control systems, and grid code compliance testing.', metrics:[['11–330 kV','Voltage range'],['340 km','Largest network O&M'],['48 hr','Typical fault response'],['100%','Grid code compliance']], img:'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80' },
  ];
  return `
  <div class="page-banner" data-bg="SOL">
    <div class="tag">Our Solutions</div>
    <h1 class="display-title">Power when<br>it matters. <em>Always.</em></h1>
    <p>Every energy challenge is different. ATLAS configures its capabilities around your specific requirement — whether that's guaranteed captive power, a clean energy transition, or grid infrastructure that actually works.</p>
  </div>
  ${solutions.map((sol,i)=>`
  <div class="solution-band${i%2===0?'':' reverse'}">
    <div class="solution-panel${i===0?'':' navy-3'}">
      <div class="tag" style="margin-bottom:1rem">${sol.sub}</div>
      <h2 class="section-title" style="margin-bottom:1.5rem">${sol.title}</h2>
      <p class="body-text" style="margin-bottom:2rem">${sol.desc}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(14,165,233,0.1);margin-bottom:2rem">
        ${sol.metrics.map(([v,l])=>`<div style="background:var(--navy);padding:1.25rem 1rem"><div style="font-family:'Barlow Condensed',sans-serif;font-size:1.6rem;font-weight:700;color:var(--white)">${v}</div><div class="mono-label" style="margin-top:0.25rem">${l}</div></div>`).join('')}
      </div>
      <a href="#/contact" class="btn-primary" data-link>Enquire Now</a>
    </div>
    <div class="solution-media" style="background-image:url('${sol.img}')"></div>
  </div>`).join('')}
  <div class="cta-strip">
    <div><h2>Not sure which solution fits?</h2><p>Our advisory team will model your energy requirement and present the least-cost, most reliable solution for your context.</p></div>
    <a href="#/contact" class="btn-navy" data-link>Get a Free Assessment</a>
  </div>`;
}

function projectsPage() {
  const listHTML = projects.map(p=>`
  <div class="map-project-item" data-id="${p.id}" onclick="selectProject('${p.id}')">
    <div class="mpi-header">
      <div class="mpi-title">${p.title}</div>
      <span class="mpi-status ${p.status}">${p.status.toUpperCase()}</span>
    </div>
    <div class="mpi-loc">📍 ${p.loc}</div>
    <div class="mpi-tags">${p.tags.map(t=>`<span class="mpi-tag">${t}</span>`).join('')}</div>
  </div>`).join('');

  return `
  <div class="map-page">
    <div class="map-sidebar">
      <div class="map-sidebar-header">
        <div class="map-sidebar-title">Project Footprint</div>
        <div class="map-sidebar-sub">// ${projects.length} projects · 10 countries</div>
      </div>
      <div class="map-filters">
        <button class="map-filter active" data-filter="all">All</button>
        <button class="map-filter" data-filter="EPC">EPC</button>
        <button class="map-filter" data-filter="O&M">O&M</button>
        <button class="map-filter" data-filter="BOOT">BOOT</button>
        <button class="map-filter" data-filter="Energy">Energy</button>
        <button class="map-filter" data-filter="Consulting">Consulting</button>
      </div>
      <div class="map-project-list" id="project-list">${listHTML}</div>
    </div>
    <div class="map-container">
      <div id="leaflet-map"></div>
      <div class="map-detail-panel" id="detail-panel">
        <button class="mdp-close" onclick="closePanel()">✕</button>
        <div id="detail-content"></div>
        <a href="#/contact" class="btn-primary" data-link style="width:100%;justify-content:center;margin-top:0.5rem">Enquire About This Project</a>
      </div>
      <div class="map-coords-bar">
        <span id="map-coords">// Move cursor over map</span>
        <span>ATLAS INFRASTRUCTURE · PROJECT FOOTPRINT</span>
      </div>
    </div>
  </div>`;
}

function initMap() {
  setTimeout(() => {
    const mapEl = document.getElementById('leaflet-map');
    if (!mapEl) return;
    const isMobile = window.innerWidth < 720;
    const baseZoom = isMobile ? 4.5 : 4;
    const markerSize = isMobile ? 10 : 14;
    const map = L.map('leaflet-map', {
      center: [8, 15],
      zoom: baseZoom,
      zoomControl: true,
      attributionControl: false,
    });
  window._atlasMap = map;
    mapInstance = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap © CARTO'
    }).addTo(map);

    // Coords bar
    map.on('mousemove', e => {
      const el = document.getElementById('map-coords');
      if (el) el.textContent = `// ${e.latlng.lat.toFixed(4)}° N, ${e.latlng.lng.toFixed(4)}° E`;
    });

    // Markers
    projects.forEach(p => {
      const cls = p.status === 'active' ? 'active-m' : p.status === 'complete' ? 'complete-m' : 'pipeline-m';
      const icon = L.divIcon({
        className: '',
        html: `<div class="custom-marker ${cls}" data-id="${p.id}" style="--marker-size:${markerSize}px"></div>`,
        iconSize: [markerSize, markerSize],
        iconAnchor: [markerSize / 2, markerSize / 2],
      });
      const marker = L.marker([p.lat, p.lng], {icon}).addTo(map);
      marker.on('click', () => selectProject(p.id, map));
    });

    // Re-bind link events after map init
    document.querySelectorAll('[data-link]').forEach(el => {
      el.addEventListener('click', () => setTimeout(bindEvents, 100));
    });
  }, 300);
}

window.selectProject = function(id, mapRef) {
  const p = projects.find(x => x.id === id);
  if (!p) return;

  document.querySelectorAll('.map-project-item').forEach(el => el.classList.remove('active'));
  const listItem = document.querySelector(`.map-project-item[data-id="${id}"]`);
  if (listItem) { listItem.classList.add('active'); listItem.scrollIntoView({behavior:'smooth',block:'nearest'}); }

  const panel = document.getElementById('detail-panel');
  const content = document.getElementById('detail-content');
  if (!panel || !content) return;

  content.innerHTML = `
    <div class="mdp-tag">${p.service} · ${p.tags.join(' · ')}</div>
    <div class="mdp-title">${p.title}</div>
    <div class="mdp-loc">📍 ${p.loc}</div>
    <div class="mdp-desc">${p.desc}</div>
    <div class="mdp-specs">
      <div><div class="mdp-spec-label">Capacity</div><div class="mdp-spec-val">${p.capacity}</div></div>
      <div><div class="mdp-spec-label">Value</div><div class="mdp-spec-val">${p.value}</div></div>
      <div><div class="mdp-spec-label">Client</div><div class="mdp-spec-val">${p.client}</div></div>
      <div><div class="mdp-spec-label">Year</div><div class="mdp-spec-val">${p.year}</div></div>
    </div>
    <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem">
      <span class="mpi-status ${p.status}" style="font-size:0.55rem;padding:0.2rem 0.5rem;border:1px solid;${p.status==='active'?'color:var(--blue);border-color:var(--blue)':p.status==='complete'?'color:var(--amber);border-color:var(--amber)':'color:var(--slate-dim);border-color:var(--slate-dim)'}">${p.status.toUpperCase()}</span>
    </div>`;
  panel.classList.add('open');

  if (mapInstance) {
    const focusZoom = window.innerWidth < 720 ? 5.2 : 6;
    mapInstance.flyTo([p.lat, p.lng], focusZoom, {duration: 1});
  }
};

window.closePanel = function() {
  const panel = document.getElementById('detail-panel');
  if (panel) panel.classList.remove('open');
  document.querySelectorAll('.map-project-item').forEach(el => el.classList.remove('active'));
};

window.filterProjects = function(filter) {
  document.querySelectorAll('.map-project-item').forEach(el => {
    const id = el.dataset.id;
    const p = projects.find(x => x.id === id);
    el.style.display = (filter === 'all' || p.service === filter) ? '' : 'none';
  });
};

function whyUsPage() {
  return `
  <div class="page-banner" data-bg="WHY">
    <div class="tag">Our Differentiators</div>
    <h1 class="display-title">Why<br><em>ATLAS.</em></h1>
    <p>Dozens of contractors operate in African infrastructure. Very few have ATLAS's combination of technical capability, financial strength, in-country presence and twenty-year track record. Here is why it matters.</p>
  </div>
  <div class="why-hero">
    <div class="why-hero-left">
      <div class="tag" style="margin-bottom:1.5rem">Performance Metrics</div>
      <h2 class="section-title" style="margin-bottom:1rem">Numbers that<br><em>speak.</em></h2>
      <p class="body-text">Every metric below is audited, verified and available to any client or lender on request. We believe transparency is the foundation of trust.</p>
    </div>
    <div class="why-hero-right">
      <div class="tag" style="margin-bottom:1rem">Track Record</div>
      <p class="body-text">100% project completion rate. No arbitrations. No significant claims. $4.2B delivered, on time and within budget, across 23 countries and five service lines.</p>
    </div>
  </div>
  <div class="metrics-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(14,165,233,0.1);padding:0 0">
    ${[['100%','Completion Rate','Every project ATLAS has contracted has been completed. No exceptions.'],['98.7%','O&M Uptime','5-year average across all operated assets. Industry benchmark is 94%.'],['0','LTIs (5 Years)','Zero Lost Time Injuries across all sites globally since 2020.'],['$4.2B','Total Portfolio','Completed and active project value across 23 countries.']].map(([v,l,d])=>`
    <div class="metric-card" data-val="${v}">
      <div class="metric-label">${l}</div>
      <div class="metric-val">${v}</div>
      <div class="metric-desc">${d}</div>
    </div>`).join('')}
  </div>
  <div class="tech-section">
    <div class="tag" style="margin-bottom:1.5rem">Technology & Process</div>
    <h2 class="section-title" style="margin-bottom:0">Process<br><em>efficiency.</em></h2>
    <div class="tech-grid">
      ${[['AI','AI-Assisted Planning','Machine learning models optimise project scheduling, resource allocation and risk identification — reducing programme overruns by 35% versus industry average.'],['SCADA','Real-Time SCADA','Proprietary SCADA platform monitors all operated assets from our Lagos control centre, enabling predictive maintenance and same-day fault resolution.'],['HSE','Digital HSE System','Every worker, every site, every day. Our digital safety management system tracks exposure hours, near-misses and corrective actions in real time.'],['BIM','BIM & Digital Twin','Full Building Information Modelling for all EPC projects. Digital twins maintained for all operated assets, enabling simulation-based maintenance planning.'],['ERP','Integrated ERP','Single enterprise platform covering procurement, contracts, finance and HR — eliminating data silos and enabling real-time project performance reporting.'],['QA','ISO-Certified QA','ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 certified. Independent third-party audits conducted annually at every operating location.']].map(([code,t,d])=>`
      <div class="tech-card">
        <div class="tech-card-icon">${code}</div>
        <div class="tech-card-title">${t}</div>
        <div class="tech-card-desc">${d}</div>
      </div>`).join('')}
    </div>
  </div>
  <div class="section-pad-lg">
    <div class="tag" style="margin-bottom:1.5rem">Client Trust</div>
    <h2 class="section-title" style="margin-bottom:3rem">Trusted by Africa's<br><em>leading organisations.</em></h2>
    <div class="trust-strip">
      ${[['TCN','Transmission Company of Nigeria'],['GRIDCo','Ghana Grid Company'],['TANESCO','Tanzania Electric Supply'],['AfDB','African Development Bank'],['Shell Nigeria','Upstream Operator'],['AEDC','Abuja Electricity Dist.'],['REA Nigeria','Rural Electrification'],['Petrosen','Senegal State Energy']].map(([n,d])=>`
      <div class="trust-item"><div class="trust-client">${n}</div><div class="trust-desc">${d}</div></div>`).join('')}
    </div>
  </div>
  <div class="cta-strip">
    <div><h2>Ready to work with us?</h2><p>Our business development team is available for a no-obligation conversation about your project or procurement requirement.</p></div>
    <a href="#/contact" class="btn-navy" data-link>Start a Conversation</a>
  </div>`;
}

function newsPage() {
  return `
  <div class="page-banner" data-bg="NEWS">
    <div class="tag">Newsroom & Insights</div>
    <h1 class="display-title">News &<br><em>Insights.</em></h1>
    <p>Project updates, sector analysis and thought leadership from ATLAS Infrastructure Group.</p>
  </div>
  <div class="news-grid">
    <div class="news-featured" onclick="location.hash='/article/${news[0].id}'">
      <div class="news-feat-img" style="background:url('${news[0].img}') center/cover no-repeat"></div>
      <div class="news-feat-body">
        <div class="news-cat">${news[0].cat}</div>
        <div class="news-feat-title">${news[0].title}</div>
        <div class="news-feat-excerpt">${news[0].excerpt}</div>
        <div class="news-feat-meta">${news[0].author} · ${news[0].date}</div>
      </div>
    </div>
    <div class="news-sidebar">
      ${news.slice(1,4).map(n=>`
      <div class="news-side-card" onclick="location.hash='/article/${n.id}'">
        <div class="news-side-img" style="background:url('${n.img}') center/cover no-repeat"></div>
        <div>
          <div class="news-side-cat">${n.cat}</div>
          <div class="news-side-title">${n.title}</div>
          <div class="news-side-date">${n.date}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
  <div class="news-all">
    <div class="news-all-title">// All Articles</div>
    <div class="news-list">
      ${news.map(n=>`
      <div class="news-card" onclick="location.hash='/article/${n.id}'">
        <div class="news-card-img" style="background:url('${n.img}') center/cover no-repeat"></div>
        <div class="news-card-body">
          <div class="news-card-cat">${n.cat}</div>
          <div class="news-card-title">${n.title}</div>
          <div class="news-card-date">${n.date}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

function articlePage(id) {
  const article = news.find(n => n.id === id);
  if (!article) return notFound();
  const related = news.filter(n => n.id !== id).slice(0,3);
  return `
  <div class="post-banner">
    <div class="post-banner-img" style="background-image:url('${article.img}')"></div>
    <div class="post-banner-overlay"></div>
    <div class="post-banner-content">
      <div class="post-banner-cat">${article.cat}</div>
      <div class="post-banner-title">${article.title}</div>
    </div>
  </div>
  <div class="post-body-wrap">
    <div class="post-content">
      <p style="font-family:'Barlow Condensed',sans-serif;font-size:1.2rem;font-style:italic;color:var(--slate);margin-bottom:2rem;line-height:1.5">${article.excerpt}</p>
      ${article.content}
      <div style="margin-top:3rem;padding-top:2rem;border-top:1px solid rgba(14,165,233,0.1);display:flex;gap:1rem">
        <a href="#/news" class="btn-outline-blue" data-link>← Back to News</a>
        <a href="#/contact" class="btn-primary" data-link>Discuss with Us</a>
      </div>
    </div>
    <div class="post-meta-col">
      <div class="post-author-block">
        <div class="post-author-img" style="background-image:url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80')"></div>
        <div>
          <div class="post-author-name">${article.author}</div>
          <div class="post-author-role">ATLAS Infrastructure Group</div>
        </div>
      </div>
      <div class="post-meta-date">${article.date}</div>
      <div class="post-meta-cat">${article.cat}</div>
      <div class="post-related-title">// Related</div>
      ${related.map(r=>`
      <div class="post-related-item" onclick="location.hash='/article/${r.id}'">
        <div class="post-related-item-title">${r.title}</div>
        <div class="post-related-item-date">${r.date}</div>
      </div>`).join('')}
    </div>
  </div>`;
}

function contactPage() {
  return `
  <div class="page-banner" data-bg="CONTACT">
    <div class="tag">Get in Touch</div>
    <h1 class="display-title">Let's build<br><em>together.</em></h1>
    <p>Whether you have a project brief, a procurement requirement, or simply want to understand what ATLAS can do for you — our team is ready to respond.</p>
  </div>
  <div class="contact-layout">
    <div class="contact-info-col">
      <h2>We respond within one business day.</h2>
      <p>Every enquiry reaches a senior member of our business development team directly. We do not use contact forms as a delay mechanism — we use them to ensure we have the right information before we call.</p>
      <div class="contact-details-list">
        <div class="cdl-item"><div class="cdl-label">HQ — Lagos</div><div class="cdl-val">ATLAS House, Plot 1021<br>Adeola Odeku Street, Victoria Island<br>Lagos, Nigeria<br>+234 (0) 800 285 271</div></div>
        <div class="cdl-item"><div class="cdl-label">General Enquiries</div><div class="cdl-val">info@atlasinfra.com</div></div>
        <div class="cdl-item"><div class="cdl-label">New Projects</div><div class="cdl-val">projects@atlasinfra.com</div></div>
        <div class="cdl-item"><div class="cdl-label">Press & Media</div><div class="cdl-val">media@atlasinfra.com</div></div>
      </div>
    </div>
    <div class="contact-form-col">
      <h3>Send us a message</h3>
      <p class="form-sub">We respond to every enquiry within one business day.</p>
      <form class="atlas-form">
        <div class="form-row">
          <div class="form-group"><label>First Name</label><input type="text" placeholder="Chidi"></div>
          <div class="form-group"><label>Last Name</label><input type="text" placeholder="Nwosu"></div>
        </div>
        <div class="form-group"><label>Organisation</label><input type="text" placeholder="Company name"></div>
        <div class="form-group"><label>Email</label><input type="email" placeholder="you@company.com"></div>
        <div class="form-group"><label>Enquiry Type</label>
          <select><option>EPC Project</option><option>O&M Contract</option><option>BOOT / PPP</option><option>Energy Solution</option><option>Advisory</option><option>Careers</option><option>General</option></select>
        </div>
        <div class="form-group"><label>Project Country</label><input type="text" placeholder="Nigeria, Ghana, Kenya..."></div>
        <div class="form-group"><label>Message</label><textarea placeholder="Tell us about your project or requirement..."></textarea></div>
        <button type="submit" class="btn-primary" style="width:100%;justify-content:center;padding:1rem">Send Message</button>
      </form>
      <div class="success-msg">Thank you. A member of our business development team will be in touch within one business day.</div>
    </div>
  </div>
  <div class="section-pad-lg section-dark">
    <div class="tag" style="margin-bottom:1.5rem">Our Offices</div>
    <h2 class="section-title" style="margin-bottom:3rem">Present across<br><em>Africa.</em></h2>
    <div class="offices-grid">
      ${[['Lagos','Nigeria · Principal HQ','ATLAS House, Plot 1021 Adeola Odeku Street, Victoria Island','+234 (0) 800 285 271'],['Abuja','Nigeria · Government Affairs','Suite 4, NICON Luxury Hotel Complex, Central Business District','+234 (0) 800 285 272'],['Accra','Ghana · West Africa Hub','6th Floor, Accra Financial Centre, Independence Avenue','+ 233 30 274 9100'],['Nairobi','Kenya · East Africa Hub','Upperhill, Longonot Road, Kenya Re Towers, 14th Floor','+ 254 20 386 5200'],['Dubai','UAE · Middle East & Finance','DIFC, Gate Village Building 3, Level 5','+ 971 4 305 7300'],['Dakar','Senegal · Project Office','Rue de Thiong, Plateau, Dakar, Senegal','+ 221 33 889 3800']].map(([c,s,a,p])=>`
      <div class="office-card"><div class="office-city">${c}</div><div class="office-country">${s}</div><div class="office-detail">${a}</div><div class="office-detail">${p}</div></div>`).join('')}
    </div>
  </div>`;
}

function notFound() {
  return `<div class="not-found"><div class="not-found-num">404</div><h2>Page Not Found</h2><p>This page does not exist or has been moved.</p><a href="#/" class="btn-primary" data-link>Return Home</a></div>`;
}

// ── INIT ────────────────────────────────────────────────────────────────────
window.addEventListener('hashchange', router);
router();

// ── SCROLL ANIMATIONS ───────────────────────────────────────────────────────
const scrollCSS = document.createElement('style');
scrollCSS.textContent = `
  .sa { opacity: 0; transition: opacity 0.7s ease, transform 0.7s ease; }
  .sa-up    { transform: translateY(40px); }
  .sa-left  { transform: translateX(-40px); }
  .sa-right { transform: translateX(40px); }
  .sa-scale { transform: scale(0.94); }
  .sa-fade  { transform: none; }
  .sa.in    { opacity: 1 !important; transform: none !important; }

  /* Stagger delays */
  .sa-d1 { transition-delay: 0.05s; }
  .sa-d2 { transition-delay: 0.12s; }
  .sa-d3 { transition-delay: 0.19s; }
  .sa-d4 { transition-delay: 0.26s; }
  .sa-d5 { transition-delay: 0.33s; }

  /* Number counter flash */
  @keyframes countUp {
    from { opacity: 0.2; transform: translateY(6px); }
    to   { opacity: 1;   transform: translateY(0); }
  }
  .sa-num.in { animation: countUp 0.5s ease both; }

  /* Underline wipe */
  .sa-line {
    position: relative;
    display: inline-block;
  }
  .sa-line::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    height: 1px;
    width: 0;
    background: var(--blue);
    transition: width 0.6s ease 0.3s;
  }
  .sa-line.in::after { width: 100%; }

  /* Blue border left reveal */
  .sa-border {
    border-left: 2px solid transparent;
    padding-left: 1rem;
    transition: border-color 0.5s ease 0.2s, opacity 0.7s ease, transform 0.7s ease;
  }
  .sa-border.in { border-color: var(--blue) !important; }
`;
document.head.appendChild(scrollCSS);

function initScrollAnimations() {
  // Assign animation classes to elements throughout the page
  const targets = [
    // Tags / eyebrows
    ['.tag', 'sa sa-up sa-d1'],
    ['.section-title', 'sa sa-up sa-d1'],
    ['.display-title', 'sa sa-up sa-d1'],
    ['.mono-label', 'sa sa-fade sa-d1'],

    // Stats / numbers
    ['.ops-num', 'sa sa-num sa-up sa-d2'],
    ['.stat-cell-num', 'sa sa-num sa-up sa-d2'],
    ['.metric-val', 'sa sa-num sa-up sa-d2'],
    ['.ch-hud-val', 'sa sa-num sa-up sa-d3'],

    // Cards — stagger by position
    ['.ops-cell', 'sa sa-up'],
    ['.svc-row', 'sa sa-up'],
    ['.service-card', 'sa sa-up'],
    ['.mag-side-card', 'sa sa-left'],
    ['.mag-main', 'sa sa-scale'],
    ['.news-card', 'sa sa-up'],
    ['.news-side-card', 'sa sa-left'],
    ['.value-card-full', 'sa sa-up'],
    ['.vcf-num', 'sa sa-fade'],
    ['.vcf-title', 'sa sa-up'],
    ['.leader-card', 'sa sa-scale'],
    ['.metric-card', 'sa sa-up'],
    ['.tech-card', 'sa sa-up'],
    ['.trust-item', 'sa sa-up'],
    ['.timeline-item', 'sa sa-left'],
    ['.office-card', 'sa sa-up'],
    ['.service-full-item', 'sa sa-up'],
    ['.manifesto-item', 'sa sa-left'],
    ['.sfi-visual', 'sa sa-right'],
    ['.fp-card', 'sa sa-up'],
    ['.news-featured', 'sa sa-up'],

    // Text blocks
    ['.body-text', 'sa sa-up sa-d2'],
    ['.ch-sub', 'sa sa-up sa-d2'],
    ['.ch-hud-panel', 'sa sa-right sa-d3'],
    ['.ch-actions', 'sa sa-up sa-d4'],
    ['.about-text h2', 'sa sa-up sa-d1'],
    ['.about-text p', 'sa sa-up sa-d2'],
    ['.post-content p', 'sa sa-up'],
    ['.post-content h2', 'sa sa-up'],
    ['.post-content blockquote', 'sa sa-left'],

    // Misc
    ['.fp-body', 'sa sa-up sa-d2'],
    ['.manifesto-quote', 'sa sa-up sa-d1'],
    ['.cta-strip h2', 'sa sa-up sa-d1'],
    ['.cta-strip p', 'sa sa-up sa-d2'],
    ['.page-banner h1', 'sa sa-up sa-d1'],
    ['.page-banner p', 'sa sa-up sa-d2'],
    ['.map-sidebar-title', 'sa sa-up'],
    ['.svc-list-header h2', 'sa sa-up sa-d1'],
    ['.mag-header h2', 'sa sa-up sa-d1'],
    ['.why-hero-left h2', 'sa sa-up sa-d1'],
    ['.contact-info-col h2', 'sa sa-up sa-d1'],
    ['.footer-brand-name', 'sa sa-up sa-d1'],
  ];

  // Add stagger to sibling groups
  const staggerGroups = [
    '.ops-cell', '.svc-row', '.value-card-full', '.leader-card',
    '.metric-card', '.tech-card', '.trust-item', '.office-card',
    '.news-card', '.manifesto-item', '.service-full-item', '.fp-card'
  ];

  targets.forEach(([sel, cls]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      // Don't double-add
      if (el.classList.contains('sa')) return;
      cls.split(' ').forEach(c => { if (c) el.classList.add(c); });
    });
  });

  // Add stagger delays to sibling groups
  staggerGroups.forEach(sel => {
    const els = document.querySelectorAll(sel);
    els.forEach((el, i) => {
      const delays = ['sa-d1','sa-d2','sa-d3','sa-d4','sa-d5'];
      // Remove any existing delay class
      delays.forEach(d => el.classList.remove(d));
      el.classList.add(delays[i % delays.length]);
    });
  });

  // Observe all .sa elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.sa').forEach(el => observer.observe(el));
}

// Re-run scroll init every time the page changes
const _origRouter = router;
window.addEventListener('hashchange', () => {
  setTimeout(initScrollAnimations, 80);
});
// Also on first load
setTimeout(initScrollAnimations, 120);


