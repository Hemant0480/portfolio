// =========================================================================
// SIMPLE JAVASCRIPT FOR HEMANT KUMAR PORTFOLIO
// =========================================================================

// Run script after page has fully loaded
document.addEventListener('DOMContentLoaded', function () {
  setupThemeToggle();
  setupMobileMenu();
  setupTypingEffect();
  setupSkillFilters();
  setupProjectModals();
  setupContactForm();
});

// -------------------------------------------------------------------------
// 1. SIMPLE THEME TOGGLE (Dark Mode / Light Mode)
// -------------------------------------------------------------------------
function setupThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  const htmlTag = document.documentElement;

  // Check saved theme in localStorage
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlTag.setAttribute('data-theme', savedTheme);

  // Toggle theme when button is clicked
  themeBtn.addEventListener('click', function () {
    const currentTheme = htmlTag.getAttribute('data-theme');
    let nextTheme = 'dark';

    if (currentTheme === 'dark') {
      nextTheme = 'light';
    } else {
      nextTheme = 'dark';
    }

    htmlTag.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    showSimpleToast('Switched to ' + nextTheme + ' mode');
  });
}

// -------------------------------------------------------------------------
// 2. SIMPLE MOBILE MENU TOGGLE
// -------------------------------------------------------------------------
function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
      });
    });
  }
}

// -------------------------------------------------------------------------
// 3. SIMPLE TYPING EFFECT FOR HERO TITLE
// -------------------------------------------------------------------------
function setupTypingEffect() {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;

  const roles = [
    'Full Stack Developer',
    'Backend Developer (Node.js & Express)',
    'MERN Stack Engineer',
    'Data Analytics Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      // Deleting text character by character
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Adding text character by character
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = 80;

    if (isDeleting) {
      speed = 40;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 2000; // Pause when word complete
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length; // Loop back to start
      speed = 300;
    }

    setTimeout(type, speed);
  }

  type();
}

// -------------------------------------------------------------------------
// 4. SIMPLE SKILL CATEGORY FILTERING
// -------------------------------------------------------------------------
function setupSkillFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Remove 'active' class from all buttons
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
      });

      // Add 'active' class to clicked button
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-filter');

      // Show or hide skill cards based on category
      skillCards.forEach(function (card) {
        const cardCategory = card.getAttribute('data-category');

        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// -------------------------------------------------------------------------
// 5. SIMPLE PROJECT MODAL POPUP
// -------------------------------------------------------------------------
const projectsData = [
  {
    id: "myntra-clone",
    title: "Myntra E-Commerce Clone",
    category: "Frontend Development",
    summary: "Responsive e-commerce homepage inspired by Myntra built with semantic HTML5, modern CSS Flexbox layout, and JavaScript DOM manipulation.",
    tools: ["HTML5", "CSS3", "JavaScript (ES6)", "Flexbox", "Chrome DevTools"],
    highlights: [
      "Designed responsive grid and navigation search UI.",
      "Implemented interactive product cards using JavaScript.",
      "Tested and debugged UI across mobile, tablet, and desktop screens."
    ],
    github: "https://github.com/Hemant0480/nm.git"
  },
  {
    id: "mern-backend",
    title: "MERN Stack Web Application",
    category: "Full Stack / Backend",
    summary: "Scalable web solutions built during Techiguru.in internship featuring secure MongoDB schemas, Express backend routes, and React front-end integration.",
    tools: ["Node.js", "Express.js", "MongoDB", "React.js", "REST API"],
    highlights: [
      "Designed structured NoSQL document models for fast data retrieval.",
      "Created RESTful endpoints for user operations.",
      "Identified, debugged, and resolved UI glitches."
    ],
    github: "https://github.com/Hemant0480"
  },
  {
    id: "powerbi-analytics",
    title: "Sales & Business Analytics Dashboard",
    category: "Data Analytics",
    summary: "Real-world data analytics project using Power BI and DAX queries to turn raw business data into actionable visual insights.",
    tools: ["Power BI", "DAX", "Python", "Data Analytics"],
    highlights: [
      "Cleaned and transformed complex datasets using Python.",
      "Authored custom DAX measures for KPI tracking.",
      "Created executive interactive dashboard reports."
    ],
    github: "https://github.com/Hemant0480"
  }
];

function setupProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  if (!modalOverlay) return;

  // Open modal when any 'Project Details' button is clicked
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.open-modal-btn');
    if (btn) {
      const projectId = btn.getAttribute('data-project');
      const project = projectsData.find(function (p) { return p.id === projectId; });

      if (project) {
        modalBody.innerHTML = `
          <span class="project-category"><i class="fa-solid fa-folder"></i> ${project.category}</span>
          <h2 style="font-size: 1.6rem; margin: 8px 0 16px 0;">${project.title}</h2>
          <p style="color: var(--text-secondary); margin-bottom: 20px;">${project.summary}</p>
          
          <h4 style="color: var(--accent-cyan); margin-bottom: 10px;">Project Highlights:</h4>
          <ul style="margin-bottom: 20px; padding-left: 20px;">
            ${project.highlights.map(function (h) { return `<li style="margin-bottom:6px; color:var(--text-secondary);">${h}</li>`; }).join('')}
          </ul>

          <h4 style="color: var(--text-muted); margin-bottom: 10px; font-size:0.9rem;">Technologies Used:</h4>
          <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom: 24px;">
            ${project.tools.map(function (t) { return `<span class="tag">${t}</span>`; }).join('')}
          </div>

          <a href="${project.github}" target="_blank" class="btn btn-gradient btn-full">
            <i class="fa-brands fa-github"></i> View GitHub Repository
          </a>
        `;
        modalOverlay.classList.add('active');
      }
    }
  });

  // Close modal when close button is clicked
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', function () {
      modalOverlay.classList.remove('active');
    });
  }

  // Close modal when background overlay is clicked
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
}

// -------------------------------------------------------------------------
// 6. SIMPLE CONTACT FORM HANDLING WITH EXPRESS API
// -------------------------------------------------------------------------
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const responseDiv = document.getElementById('form-response');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Stop page refresh

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
      responseDiv.textContent = 'Please fill in all required fields.';
      responseDiv.className = 'form-response error';
      responseDiv.classList.remove('hidden');
      return;
    }

    // Send HTTP POST request to Node.js Express server
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message
      })
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.success) {
          responseDiv.textContent = data.message;
          responseDiv.className = 'form-response success';
          responseDiv.classList.remove('hidden');
          form.reset(); // Clear form inputs
          showSimpleToast('Message sent successfully!');
        } else {
          responseDiv.textContent = data.message || 'Error sending message.';
          responseDiv.className = 'form-response error';
          responseDiv.classList.remove('hidden');
        }
      })
      .catch(function (error) {
        console.log('Contact form error:', error);
        responseDiv.textContent = 'Error connecting to server. Please try again.';
        responseDiv.className = 'form-response error';
        responseDiv.classList.remove('hidden');
      });
  });
}

// Helper toast alert message
function showSimpleToast(msg) {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = '<i class="fa-solid fa-circle-check" style="color:var(--accent-cyan)"></i> ' + msg;
  toastContainer.appendChild(toast);

  setTimeout(function () {
    toast.remove();
  }, 3000);
}
