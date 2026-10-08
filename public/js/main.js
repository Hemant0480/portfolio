

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive components
  initThemeToggle();
  initMobileMenu();
  initTypingEffect();
  initScrollSpy();
  initSkillFilters();
  initProjectModals();
  initContactForm();
  fetchPortfolioData();
});

/* --- 1. Theme Toggle (Dark / Light Mode) --- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Read saved theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    showToast(`Switched to ${newTheme.toUpperCase()} theme`, 'info');
  });
}

/* --- 2. Mobile Navigation Menu --- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

/* --- 3. Typing Effect in Hero --- */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Full Stack Developer',
    'Backend Developer (Node.js/Express)',
    'MERN Stack Engineer',
    'Data Analytics Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --- 4. ScrollSpy & Active Navbar Highlight --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --- 5. Skill Category Filters --- */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 6. Project Modal Window --- */
let globalProjects = [
  {
    id: "myntra-clone",
    title: "Myntra E-Commerce Clone",
    category: "Frontend Development",
    tools: ["HTML5", "CSS3", "JavaScript (ES6)", "Chrome DevTools", "Flexbox"],
    summary: "A responsive e-commerce homepage inspired by Myntra built with semantic HTML5, modern CSS Flexbox layout, and interactive JavaScript DOM manipulation.",
    highlights: [
      "Designed responsive grid and navbar search UI matching real-world e-commerce standards.",
      "Implemented interactive filtering, product cards, and dynamic UI states using Vanilla JS.",
      "Tested across mobile, tablet, and desktop viewports using Chrome DevTools."
    ],
    keyLearnings: [
      "Mastery of modern responsive CSS Flexbox layout.",
      "Advanced DOM manipulation and event handling in JavaScript.",
      "Writing clean, reusable, modular front-end code."
    ],
    github: "https://github.com/Hemant0480/nm.git"
  },
  {
    id: "mern-backend",
    title: "MERN Stack Web Application",
    category: "Full Stack / Backend",
    tools: ["Node.js", "Express.js", "MongoDB", "React.js", "REST API"],
    summary: "Scalable web solutions built during Techiguru.in internship featuring secure MongoDB schemas, Express backend routes, and React front-end integration.",
    highlights: [
      "Designed structured NoSQL document models for fast data retrieval.",
      "Created RESTful endpoints for CRUD operations and user actions.",
      "Fixed UI glitches and optimized client-server request handling."
    ],
    keyLearnings: [
      "Backend architecture design in Express.js.",
      "Database query optimization in MongoDB.",
      "Full-stack MERN integration patterns."
    ],
    github: "https://github.com/Hemant0480"
  },
  {
    id: "powerbi-analytics",
    title: "Sales & Business Data Dashboard",
    category: "Data Analytics",
    tools: ["Power BI", "DAX", "Python", "Data Visualization"],
    summary: "Real-world data analytics project using Power BI and DAX queries to turn raw business data into actionable visual insights.",
    highlights: [
      "Cleaned and transformed complex datasets using Python and Power Query.",
      "Authored custom DAX measures for real-time KPI tracking.",
      "Built executive interactive dashboard reports."
    ],
    keyLearnings: [
      "DAX formula formulation and performance tuning.",
      "Data storytelling and dashboard design principles."
    ],
    github: "https://github.com/Hemant0480"
  }
];

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  document.addEventListener('click', async (e) => {
    if (e.target.closest('.open-modal-btn')) {
      const btn = e.target.closest('.open-modal-btn');
      const projectId = btn.getAttribute('data-project');

      let project = globalProjects.find(p => p.id === projectId);

      // Try fetching updated project data from Express API
      try {
        const res = await fetch(`/api/projects?id=${projectId}`);
        const data = await res.json();
        if (data.success && data.project) {
          project = data.project;
        }
      } catch (err) {
        console.warn('Using local project data fallback:', err);
      }

      if (project) {
        renderModalContent(project);
        modalOverlay.classList.add('active');
      }
    }
  });

  modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
}

function renderModalContent(project) {
  const modalBody = document.getElementById('modal-body');

  modalBody.innerHTML = `
    <div style="margin-bottom: 20px;">
      <span class="project-category"><i class="fa-solid fa-folder-open"></i> ${project.category}</span>
      <h2 style="font-size: 1.8rem; font-weight: 800; margin: 6px 0 16px 0;">${project.title}</h2>
      <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.6;">${project.summary}</p>
    </div>

    <div style="margin-bottom: 24px;">
      <h4 style="font-size: 1.1rem; margin-bottom: 10px; color: var(--accent-cyan);">Key Project Highlights</h4>
      <ul style="display: flex; flex-direction: column; gap: 10px;">
        ${(project.highlights || []).map(h => `<li style="display:flex; gap:10px; color:var(--text-secondary);"><i class="fa-solid fa-circle-check" style="color:var(--accent-emerald); margin-top:4px;"></i> <span>${h}</span></li>`).join('')}
      </ul>
    </div>

    ${project.keyLearnings ? `
      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1.1rem; margin-bottom: 10px; color: var(--accent-purple);">Key Technical Learnings</h4>
        <ul style="display: flex; flex-direction: column; gap: 8px;">
          ${project.keyLearnings.map(l => `<li style="display:flex; gap:10px; color:var(--text-secondary);"><i class="fa-solid fa-lightbulb" style="color:var(--accent-cyan); margin-top:4px;"></i> <span>${l}</span></li>`).join('')}
        </ul>
      </div>
    ` : ''}

    <div style="margin-bottom: 28px;">
      <h4 style="font-size: 0.9rem; text-transform:uppercase; color:var(--text-muted); margin-bottom: 10px;">Tech Stack Used</h4>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        ${(project.tools || []).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>

    <div style="display:flex; gap:14px; border-top:1px solid var(--border-color); padding-top:20px;">
      <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-gradient btn-full">
        <i class="fa-brands fa-github"></i> View Repository / Code
      </a>
    </div>
  `;
}

/* --- 7. Contact Form Handler with Express API Integration --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');
  const responseDiv = document.getElementById('form-response');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showFormResponse('Please fill in all required fields.', 'error');
      return;
    }

    // UI Loading state
    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');
    submitBtn.disabled = true;
    responseDiv.classList.add('hidden');

    try {
      // Send POST request to Node.js / Express backend route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showFormResponse(data.message, 'success');
        showToast('Message sent successfully!', 'success');
        form.reset();
      } else {
        showFormResponse(data.message || 'Error submitting message.', 'error');
        showToast(data.message || 'Error sending message', 'error');
      }
    } catch (error) {
      console.error('Contact Form Fetch Error:', error);
      showFormResponse('Network error. Unable to connect to Express backend server.', 'error');
      showToast('Network error while connecting to server.', 'error');
    } finally {
      btnText.classList.remove('hidden');
      btnSpinner.classList.add('hidden');
      submitBtn.disabled = false;
    }
  });

  function showFormResponse(msg, type) {
    responseDiv.textContent = msg;
    responseDiv.className = `form-response ${type}`;
    responseDiv.classList.remove('hidden');
  }
}

/* --- 8. Asynchronously Fetch Data from Express API --- */
async function fetchPortfolioData() {
  try {
    const res = await fetch('/api/all');
    if (!res.ok) return;
    const json = await res.json();
    if (json.success && json.data) {
      console.log('Successfully connected to Express Backend API!');
      if (json.data.projects) {
        globalProjects = json.data.projects;
      }
    }
  } catch (e) {
    console.log('Express API local connection check complete.');
  }
}

/* --- Toast Notification Helper --- */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-exclamation';

  toast.innerHTML = `<i class="fa-solid ${icon}" style="color:var(--accent-cyan)"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
