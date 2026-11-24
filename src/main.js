import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  /* === Theme Toggle === */
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.setAttribute('data-theme', 'dark');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
      body.removeAttribute('data-theme');
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    } else {
      body.setAttribute('data-theme', 'dark');
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    }
  });

  /* === Mobile Menu === */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when link clicked
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  /* === Header Scroll Effect === */
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* === Scroll Reveal Animations === */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: Stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll('.fade-up, .fade-in, .fade-right, .fade-left');
  hiddenElements.forEach(el => observer.observe(el));

  /* === Active Navigation Link Highlighting === */
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').includes(current)) {
        item.classList.add('active');
      }
    });
  });

  /* === Project Filtering === */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* === Contact Form Submission === */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic UI feedback for submission
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      btn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        btn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
        btn.classList.remove('btn-primary');
        btn.style.backgroundColor = 'var(--secondary)';
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.backgroundColor = '';
          btn.classList.add('btn-primary');
        }, 3000);
      }, 1500);
    });
  }

  /* === Project Modal Logic === */
  const projectDetailsData = {
    'hifz-quran': {
      title: 'Hifz-ul-Quran App',
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: '<p>A dedicated mobile application designed to assist students and Huffaz in Quran memorization (Hifz), regular revision cycles (Dorr), and recitation tracking.</p><p>Features structured Surah and Ayah navigation, bookmarking of challenging passages, revision schedules with progress analytics, and clear audio playback for pronunciation verification.</p>',
      tech: ['Flutter', 'Dart', 'SQLite', 'Audio API', 'Mobile UX'],
      github: 'https://github.com/HamzaMahfooz12/Al-Quran',
      download: '#'
    },
    'tajweed-institute': {
      title: 'Tajweed-ul-Quran Institutional Website',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: '<p>An institutional educational web portal designed and developed for a Quranic and Tajweed learning academy.</p><p>Features interactive course catalogs, structured Tajweed curriculum breakdowns, online student registration and inquiry workflows, faculty profiles, and responsive design tailored for smooth accessibility across desktop and mobile devices.</p>',
      tech: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Responsive UI'],
      github: 'https://github.com/HamzaMahfooz12/Tajweed-ul-Quran'
    },
    'helmet-detection': {
      title: 'AI Helmet Detection for Road Safety',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: '<p>A deep-learning computer vision system aimed at enhancing road safety and automating traffic law compliance monitoring.</p><p>Utilizes convolutional neural network models (YOLO / OpenCV) to process traffic camera video streams in real-time, detecting motorcycle riders and identifying helmet presence or absence with high precision for traffic safety logging.</p>',
      tech: ['Python', 'OpenCV', 'YOLOv8', 'PyTorch', 'Computer Vision'],
      status: 'coming_soon'
    },
    'ecommerce': {
      title: 'E-Commerce Web Application',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: '<p>Architected a fully responsive e-commerce platform with dynamic product listings, real-time shopping cart management, and multi-page navigation.</p><p>Engineered a library of reusable React components (product cards, cart, navigation bar), cutting redundant code by an estimated 40% and accelerating feature development cycles. Optimized rendering performance by applying React hooks strategically, minimizing unnecessary re-renders.</p>',
      tech: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Flexbox'],
      github: 'https://github.com/HamzaMahfooz12/Ecommerce-Web'
    },
    'bus': {
      title: 'University Bus Management System',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: '<p>Delivered a cross-platform transport management solution comprising a React.js web frontend and a Flutter mobile interface, enabling students to access real-time bus route, schedule, and stop data on both platforms.</p><p>Built dedicated Flutter screens for route browsing, schedule lookup, and stop filtering using native Flutter widgets, achieving a smooth, platform-consistent mobile experience. Maintained the full codebase with Git and GitHub using a structured feature-branch workflow.</p>',
      tech: ['React.js', 'Flutter', 'JavaScript', 'HTML5', 'CSS3'],
      github: '#'
    },
    'disaster': {
      title: 'Disaster Management System',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: '<p>Built an interactive emergency-response web application enabling real-time filtering of disaster reports by type, severity, and location — directly improving situational awareness and emergency-response usability.</p><p>Designed dynamic UI components for resource allocation coordination and disaster-information display, enabling actionable decision-making for emergency personnel. Applied CSS Grid and Flexbox to deliver a fully responsive interface across desktop and mobile devices.</p>',
      tech: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'CSS Grid'],
      github: 'https://github.com/HamzaMahfooz12/Disaster-Response-MIS'
    }
  };

  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalGithub = document.getElementById('modal-github');
  const modalDownload = document.getElementById('modal-download');
  const closeModalBtn = document.querySelector('.close-modal');
  const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

  viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent scroll to top
      const projectId = btn.getAttribute('data-id');
      const data = projectDetailsData[projectId];
      
      if(data) {
        modalImg.src = data.image;
        modalTitle.textContent = data.title;
        modalDesc.innerHTML = data.description;
        
        // Populate tech badges
        modalTech.innerHTML = '';
        data.tech.forEach(t => {
          const span = document.createElement('span');
          span.className = 'tech-badge';
          span.textContent = t;
          modalTech.appendChild(span);
        });

        // Update modal action buttons
        if (modalGithub) {
          if (data.status === 'coming_soon') {
            modalGithub.href = '#';
            modalGithub.className = 'btn btn-outline disabled';
            modalGithub.innerHTML = '<i class="fa-brands fa-github"></i> Coming Soon on GitHub';
            modalGithub.style.display = 'inline-flex';
          } else if (data.github && data.github !== '#') {
            modalGithub.href = data.github;
            modalGithub.className = 'btn btn-outline';
            modalGithub.innerHTML = '<i class="fa-brands fa-github"></i> View Repository';
            modalGithub.style.display = 'inline-flex';
          } else {
            modalGithub.style.display = 'none';
          }
        }

        if (modalDownload) {
          if (data.download) {
            modalDownload.href = data.download;
            modalDownload.style.display = 'inline-flex';
          } else {
            modalDownload.style.display = 'none';
          }
        }

        // Show modal and disable body scroll
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal functions
  const closeModal = () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  
  if(modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
      closeModal();
    }
  });
});
