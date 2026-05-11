// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Skip if href was dynamically changed to an external URL or is just '#'
        if (!href || !href.startsWith('#') || href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(6, 8, 15, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(6, 8, 15, 0.75)';
        navbar.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.4)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Observe skill items
document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});


// Typing effect for hero section (optional enhancement)
const titles = ['Full Stack Developer', 'Web Developer', 'Mobile App Developer', 'Problem Solver'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const titleElement = document.querySelector('.title');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeTitle() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        titleElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        titleElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        setTimeout(() => isDeleting = true, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
    }
    
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeTitle, speed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeTitle, 1000);
});



// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.classList.add('scroll-top-btn');
document.body.appendChild(scrollTopBtn);

const scrollTopStyle = document.createElement('style');
scrollTopStyle.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #4f46e5 0%, #9333ea 100%);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    .scroll-top-btn.visible {
        opacity: 1;
        pointer-events: all;
    }
    
    .scroll-top-btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.5);
    }
`;
document.head.appendChild(scrollTopStyle);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Coding Panel Typing Animation — prints MOHAMED ALAA SHEBL
const codeLines = [
    '<span style="color:#c792ea">import</span> numpy <span style="color:#c792ea">as</span> np',
    '<span style="color:#546e7a"># ─── MO\'s Character Recognition Network ─────</span>',
    '',
    '<span style="color:#c792ea">class</span> <span style="color:#82aaff">MLP</span>:',
    '    <span style="color:#c792ea">def</span> <span style="color:#82aaff">forward</span>(self, X):',
    '        A = X',
    '        <span style="color:#c792ea">for</span> w, b <span style="color:#c792ea">in</span> zip(self.W, self.b):',
    '            A = np.maximum(<span style="color:#f78c6c">0</span>, w @ A + b)',
    '        <span style="color:#c792ea">return</span> A',
    '',
    '    <span style="color:#c792ea">def</span> <span style="color:#82aaff">print_name</span>(self):',
    '        <span style="color:#82aaff">print</span>(<span style="color:#4ade80">"MOHAMED ALAA SHEBL"</span>)',
    '',
    'model = <span style="color:#82aaff">MLP</span>([<span style="color:#f78c6c">784</span>, <span style="color:#f78c6c">256</span>, <span style="color:#f78c6c">128</span>, <span style="color:#f78c6c">26</span>])',
    'model.<span style="color:#82aaff">print_name</span>()',
    '<span style="color:#546e7a"># ✓ Accuracy: 78.15% — DONE</span>',
];

const codeContainer = document.getElementById('typing-code');
if (codeContainer) {
    let lineIdx = 0;
    let charIdx = 0;
    let currentLineText = '';
    function getPlainText(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || '';
    }
    function typeCode() {
        if (lineIdx < codeLines.length) {
            const plainLine = getPlainText(codeLines[lineIdx]);
            if (charIdx < plainLine.length) {
                charIdx++;
                // Render the full styled line up to charIdx characters
                currentLineText = plainLine.substring(0, charIdx);
                // Build display: all previous lines + current partial
                let display = '';
                for (let i = 0; i < lineIdx; i++) display += codeLines[i] + '\n';
                display += currentLineText;
                codeContainer.innerHTML = display;
                setTimeout(typeCode, 30 + Math.random() * 50);
            } else {
                lineIdx++;
                charIdx = 0;
                currentLineText = '';
                // Show all completed lines
                let display = '';
                for (let i = 0; i < lineIdx && i < codeLines.length; i++) display += codeLines[i] + '\n';
                codeContainer.innerHTML = display;
                setTimeout(typeCode, 150 + Math.random() * 200);
            }
        } else {
            // Typing finished. Run the code.
            setTimeout(runCode, 1000);
        }
    }

    const tabCode = document.getElementById('tab-code');
    const tabOutput = document.getElementById('tab-output');
    const codeView = document.getElementById('code-view');
    const outputView = document.getElementById('output-view');
    const outputText = document.getElementById('output-text');
    const outputCursor = document.getElementById('output-cursor');

    if (tabCode && tabOutput) {
        tabCode.addEventListener('click', () => {
            tabCode.classList.add('active');
            tabOutput.classList.remove('active');
            codeView.style.display = 'block';
            outputView.style.display = 'none';
        });

        tabOutput.addEventListener('click', () => {
            tabOutput.classList.add('active');
            tabCode.classList.remove('active');
            outputView.style.display = 'block';
            codeView.style.display = 'none';
        });
    }

    function runCode() {
        if (tabOutput) tabOutput.click(); // switch to output tab
        setTimeout(() => {
            if (outputText) outputText.style.display = 'block';
            if (outputCursor) outputCursor.style.display = 'block';
        }, 600); // simulate delay for code execution
    }

    const codeObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            setTimeout(typeCode, 500);
            codeObserver.disconnect();
        }
    });
    codeObserver.observe(document.querySelector('.coding-panel'));
}

// Project Modal Logic
const projectData = {
    'native': {
        title: 'Native Clothiers',
        subtitle: 'WEB-SITE',
        desc: 'A responsive and modern web application built using Next.js and TypeScript. The project was bootstrapped with create-next-app and focuses on clean design, performance optimization, and scalability. It incorporates CSS and JavaScript for enhanced interactivity and styling, and utilizes the next/font module to optimize font loading with the Geist font family.',
        tags: ['Next.js', 'TypeScript', 'JavaScript', 'CSS'],
        link: 'https://github.com/moashebl/Native',
        images: [
            'projects screenshots/Native/Screenshot 2025-08-21 201353.png',
            'projects screenshots/Native/Screenshot 2025-08-29 014309.png',
            'projects screenshots/Native/Screenshot 2025-08-30 173353.png',
            'projects screenshots/Native/Screenshot 2025-08-30 182942.png',
            'projects screenshots/Native/Screenshot 2025-08-30 214956.png',
            'projects screenshots/Native/Screenshot 2025-10-02 174356.png',
            'projects screenshots/Native/Screenshot 2025-10-18 235359.png'
        ]
    },
    'freshchain': {
        title: 'FreshChain',
        subtitle: 'Blockchain Supply Chain',
        desc: 'Architected and deployed a decentralized, tamper-proof food supply chain tracking system on Ethereum Sepolia testnet, ensuring end-to-end transparency and data immutability across multiple stakeholders. Engineered production-grade Smart Contracts in Solidity with granular Role-Based Access Control (RBAC).',
        tags: ['Solidity', 'Ethereum Sepolia', 'Hardhat', 'Ethers.js'],
        link: 'https://github.com/moashebl/FreshChain',
        images: [
            'projects screenshots/FreshChain/Screenshot 2025-12-11 010123.png',
            'projects screenshots/FreshChain/Screenshot 2025-12-11 193525.png',
            'projects screenshots/FreshChain/Screenshot 2025-12-12 034140.png',
            'projects screenshots/FreshChain/Screenshot 2025-12-12 034754.png',
            'projects screenshots/FreshChain/Screenshot 2025-12-12 192338.png'
        ]
    },
    'ann': {
        title: 'Neural Network Character Recognition',
        subtitle: 'Deep Learning & GUI App',
        desc: 'Engineered a from-scratch Multi-layer Perceptron (MLP) artificial neural network using NumPy for handwritten character recognition, implementing forward propagation, backpropagation, and customizable hyperparameters without external deep learning libraries. Developed an interactive desktop application using Tkinter.',
        tags: ['Python', 'NumPy', 'Tkinter', 'Deep Learning'],
        link: 'https://github.com/moashebl/Character-Recognition',
        images: [
            'projects screenshots/Character recognation/main gui.jpeg',
            'projects screenshots/Character recognation/drawing canvas.jpeg',
            'projects screenshots/Character recognation/archte.jpeg',
            'projects screenshots/Character recognation/loopiter.jpeg',
            'projects screenshots/Character recognation/probview.jpeg',
            'projects screenshots/Character recognation/training curves.jpeg',
            'projects screenshots/Character recognation/training metrcies.jpeg'
        ]
    },
    'student-performance': {
        title: 'Student Performance Prediction',
        subtitle: 'Machine Learning Analytics System',
        desc: 'Built an end-to-end predictive analytics system using ensemble learning (Random Forests) to forecast student academic outcomes with 92% accuracy, enabling early intervention strategies. Conducted comprehensive feature importance analysis.',
        tags: ['Python', 'Scikit-Learn', 'Random Forests', 'Pandas'],
        link: 'https://github.com/moashebl/Student_Performance_Prediction',
        images: [
            'projects screenshots/Student Performance Prediction/ml_dashboard.png'
        ]
    },
    'task-manager': {
        title: 'Task Manager',
        subtitle: 'Full-Stack Web Application',
        desc: 'A simple task management web application built with Node.js and Express.js. The project separates backend server logic with a backend server (server.js) and a frontend served through static files. It enables users to manage their tasks efficiently through a browser interface.',
        tags: ['Node.js', 'Express.js', 'HTML', 'CSS', 'JavaScript'],
        link: 'https://github.com/moashebl/Task-Manager',
        images: [
            'projects screenshots/Task Manager/dashboard.png'
        ]
    },
    'student-management': {
        title: 'Student Management System',
        subtitle: 'Console-Based Java Application',
        desc: 'A console-based application developed in Java to manage student records and their associated courses. The system supports full CRUD operations, persistent binary file storage, and adopts object-oriented design principles including inheritance and abstraction for flexible data handling.',
        tags: ['Java', 'OOP', 'File I/O', 'CRUD'],
        link: 'https://github.com/moashebl/Student-management-System',
        images: [
            'projects screenshots/Student Management System/cli.png'
        ]
    }
};

const projectModal = document.getElementById('project-modal');
if (projectModal) {
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalDesc = document.getElementById('modal-description');
    const modalTags = document.getElementById('modal-tags');
    const modalLink = document.getElementById('modal-link');
    const modalImgMain = document.getElementById('modal-img-main');
    const modalThumbnails = document.getElementById('modal-thumbnails');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if(e.target.closest('.project-link')) return; // Ignore link clicks
            const projId = card.getAttribute('data-project');
            if(projId && projectData[projId]) {
                const data = projectData[projId];
                modalTitle.textContent = data.title;
                modalSubtitle.textContent = data.subtitle;
                modalDesc.textContent = data.desc;
                modalLink.href = data.link;
                
                modalTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.textContent = tag;
                    modalTags.appendChild(span);
                });
                
                modalThumbnails.innerHTML = '';
                if (data.images && data.images.length > 0) {
                    modalImgMain.src = data.images[0];
                    modalImgMain.style.display = 'block';
                    
                    data.images.forEach((imgSrc, idx) => {
                        const thumb = document.createElement('img');
                        thumb.src = imgSrc;
                        if(idx === 0) thumb.classList.add('active');
                        thumb.addEventListener('click', () => {
                            modalImgMain.src = imgSrc;
                            document.querySelectorAll('.modal-thumbnails img').forEach(t => t.classList.remove('active'));
                            thumb.classList.add('active');
                        });
                        modalThumbnails.appendChild(thumb);
                    });
                } else {
                    modalImgMain.style.display = 'none';
                }
                
                projectModal.style.display = 'block';
            }
        });
    });

    closeModal.addEventListener('click', () => {
        projectModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });
}
// ─── CHANGE 2: Neural Network Canvas Background ───
(function () {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const CFG = {
    nodeCount: window.innerWidth < 768 ? 40 : 110, connectionRange: 220, mouseRadius: 200,
    mouseForce: 0.15, driftSpeed: 1.0, maxVel: 2.5,
    rMin: 1.5, rMax: 3, friction: 0.995, jitter: 0.05,
    bg: '#0B0D12',
    nodeActive: 'rgba(94,106,210,0.9)', nodeIdle: 'rgba(94,106,210,0.4)',
    glowActive: 'rgba(94,106,210,0.15)',
    nearThresh: 80, cursorColor: 'rgba(94,106,210,0.9)', cursorGlow: 'rgba(94,106,210,0.15)',
  };

  let W, H, nodes = [], mouse = { x: -999, y: -999 };

  function resize() {
    const r = canvas.getBoundingClientRect();
    W = canvas.width = r.width * devicePixelRatio;
    H = canvas.height = r.height * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    W /= devicePixelRatio; H /= devicePixelRatio;
  }

  function mkNode() {
    return { x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*CFG.driftSpeed, vy: (Math.random()-0.5)*CFG.driftSpeed,
      r: Math.random()*(CFG.rMax-CFG.rMin)+CFG.rMin, p: Math.random()*Math.PI*2 };
  }

  function init() { 
    CFG.nodeCount = window.innerWidth < 768 ? 40 : 110;
    resize(); 
    nodes = []; 
    for (let i=0;i<CFG.nodeCount;i++) nodes.push(mkNode()); 
  }

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX; mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  // Touch support for mobile devices
  window.addEventListener('touchstart', e => {
    if(e.touches.length > 0) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }
  }, { passive: true });
  window.addEventListener('touchmove', e => {
    if(e.touches.length > 0) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }
  }, { passive: true });
  window.addEventListener('touchend', () => { mouse.x = -999; mouse.y = -999; });
  window.addEventListener('resize', init);

  function draw() {
    const t = performance.now()/1000;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = CFG.bg; ctx.fillRect(0,0,W,H);

    for (const n of nodes) {
      const dx=mouse.x-n.x, dy=mouse.y-n.y, md=Math.sqrt(dx*dx+dy*dy);
      if (md<CFG.mouseRadius && md>0) {
        const f=(CFG.mouseRadius-md)/CFG.mouseRadius*CFG.mouseForce;
        n.vx+=(dx/md)*f; n.vy+=(dy/md)*f;
      }
      const v=Math.sqrt(n.vx*n.vx+n.vy*n.vy);
      if (v>CFG.maxVel) { n.vx=(n.vx/v)*CFG.maxVel; n.vy=(n.vy/v)*CFG.maxVel; }
      n.x+=n.vx; n.y+=n.vy;
      if(n.x<0){n.x=0;n.vx*=-1;} if(n.x>W){n.x=W;n.vx*=-1;}
      if(n.y<0){n.y=0;n.vy*=-1;} if(n.y>H){n.y=H;n.vy*=-1;}
      n.vx*=CFG.friction; n.vy*=CFG.friction;
      n.vx+=(Math.random()-0.5)*CFG.jitter; n.vy+=(Math.random()-0.5)*CFG.jitter;
    }

    // Edges
    for (let i=0;i<nodes.length;i++) {
      for (let j=i+1;j<nodes.length;j++) {
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if (d<CFG.connectionRange) {
          const a=(1-d/CFG.connectionRange)*0.55;
          const near=d<CFG.nearThresh;
          ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y);
          ctx.strokeStyle=near?`rgba(94,106,210,${a})`:`rgba(94,106,210,${a*0.4})`;
          ctx.lineWidth=near?1.0:0.5; ctx.stroke();
        }
      }
    }

    // Nodes
    for (const n of nodes) {
      const dx=mouse.x-n.x, dy=mouse.y-n.y, md=Math.sqrt(dx*dx+dy*dy);
      const active=md<CFG.mouseRadius;
      const r=active?n.r+Math.sin(t*4+n.p)*1.2:n.r;
      if (active) { ctx.beginPath(); ctx.arc(n.x,n.y,r+4,0,Math.PI*2); ctx.fillStyle=CFG.glowActive; ctx.fill(); }
      ctx.beginPath(); ctx.arc(n.x,n.y,r,0,Math.PI*2);
      ctx.fillStyle=active?CFG.nodeActive:CFG.nodeIdle; ctx.fill();
    }


    requestAnimationFrame(draw);
  }
  init(); draw();
})();

console.log('Portfolio loaded successfully! Welcome to Mohamed Alaa\'s Portfolio 🚀');

// Contact Form Submission (Formspree AJAX)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const data = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = "Thanks for reaching out! I'll get back to you soon.";
                formStatus.className = "success";
                contactForm.reset();
            } else {
                let errorData = await response.json();
                if (errorData.hasOwnProperty('errors')) {
                    formStatus.textContent = errorData.errors.map(error => error.message).join(", ");
                } else {
                    formStatus.textContent = "Oops! There was a problem submitting your form.";
                }
                formStatus.className = "error";
            }
        } catch (error) {
            formStatus.textContent = "Oops! There was a problem submitting your form.";
            formStatus.className = "error";
        }

        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
            formStatus.className = "";
        }, 5000);
    });
}