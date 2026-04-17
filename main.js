const projects = [
  {
    id: 1,
    title: "YouTube Video Script",
    tags: ["SCRIPT"],
    description: "A YouTube promotional script for Untangled",
    buttonText: "Explore the Script",
    image: "assets/Untangled Thumbnail.png",
    modalMedia: { type: "pdf", src: "assets/Untangle Video Script.pdf" },
    modalDescription: "I worked closely with the founder of Untangle, spending time in discussion to really understand what they wanted the video to communicate. We explored how the brand should feel, it had to feel safe, professional, and genuinely understanding. From there, I shaped the video to speak directly to viewers, encouraging them to see therapy as something empowering rather than intimidating. At the same time, we made sure to reflect the office space in a way that reinforces that sense of comfort and trust."
  },
  {
    id: 2,
    title: "Ramaiah College - Promo Video",
    tags: ["SCRIPT", "VOICE OVER", "SHOT-LISTING"],
    description: "Shot-listing, scripting, and voiceover execution",
    buttonText: "View Project",
    image: "assets/Ramaiah Thumbnail.png",
    modalMedia: { type: "youtube", src: "https://www.youtube.com/embed/eLJGq9HNtC0" },
    modalDescription: "I worked on a promotional video for Ramaiah College of Arts, Science and Commerce. I was responsible for scripting, shot listing, and voiceover. Alongside pre-production, I also assisted during the shoot, ensuring the visuals aligned with the intended story and tone."
  },
  {
    id: 3,
    title: "Visual Gallery",
    tags: ["GALLERY", "DESIGN"],
    description: "A collection of posters and reels",
    buttonText: "Enter Gallery",
    image: "assets/Visual Gallery.png",
    type: "creative-visuals"
  },
  {
    id: 4,
    title: "Instagram Reel Script",
    tags: ["SCRIPT"],
    description: "Short-form storytelling designed for speed, clarity, and engagement",
    buttonText: "Explore the Script",
    image: "assets/Instagram Reel Thumbnail.png",
    modalMedia: { type: "pdf", src: "assets/Instagram Reel Script.pdf" },
    modalDescription: "I worked across a range of short-form content, scripting Instagram reels for different brands and purposes. This included café ads, menu highlights, and event promotions, as well as pizzeria campaigns and brand-focused promotional content."
  },
  {
    id: 5,
    title: "Waste Management Documentary",
    tags: ["SCRIPT", "VOICE OVER"],
    description: "Scripting and voiceover for a waste management documentary",
    buttonText: "View Project",
    image: "assets/Documentary Thumbnail.png",
    modalMedia: { type: "gdrive", src: "https://drive.google.com/file/d/1QK7wNqDe9T8uV7nrLniw2GaulSWbP16k/preview" },
    modalDescription: "I worked on a documentary video on waste management alongside my classmates, where I was responsible for scripting and voiceover."
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery-grid');
  
  if(gallery) {
    // Render cards only on index.html
    function renderGallery(activeFilter = null) {
      gallery.innerHTML = ''; // clear grid
      
      const filtered = activeFilter 
        ? projects.filter(p => p.tags && p.tags.includes(activeFilter)) 
        : projects;
        
      filtered.forEach((proj) => {
      const card = document.createElement('div');
      card.className = 'card';
      if(proj.image) {
        card.style.setProperty('--bg-image', `url('${proj.image}')`);
      }

      const tagsHtml = proj.tags ? proj.tags.map(t => `<span class="tag">${t}</span>`).join('') : '';
      
      const imageHtml = proj.image ? 
        `<img src="${proj.image}" alt="${proj.title}" class="card-img" />` : 
        `<div style="width: 100%; height: 100%; background: #111;"></div>`;

      // if title is empty make it non-breaking space to retain height mostly
      const titleHtml = proj.title || '&nbsp;';

      card.innerHTML = `
        <div class="glow-blob"></div>
        <div class="card-inner">
          <div class="card-img-wrapper">
            ${imageHtml}
          </div>
          <div class="card-content">
            <div class="card-header">
              <h3 class="card-title">${titleHtml}</h3>
              <div class="card-tags">
                ${tagsHtml}
              </div>
            </div>
            ${proj.description ? `<p class="card-desc">${proj.description}</p>` : ''}
            ${proj.buttonText ? `<button class="card-btn">${proj.buttonText}</button>` : ''}
          </div>
        </div>
      `;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      // Entire card clickable, triggers openModal
      // Entire card clickable, triggers openModal or CV view
      if(proj.title) {
        card.addEventListener('click', () => {
          if (proj.type === 'creative-visuals') {
            openCreativeVisuals();
          } else {
            openModal(proj);
          }
        });
      }
      gallery.appendChild(card);
    });
    }

    renderGallery(); // Initial DOM hydration

    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalTag = document.getElementById('modal-tag');
    const modalDesc = document.getElementById('modal-desc');

    function openModal(project) {
      const mediaContainer = document.getElementById('modal-media-container');
      mediaContainer.innerHTML = ''; // clear previous media

      if (project.modalMedia && project.modalMedia.type === 'pdf') {
        // PDF viewer via iframe — toolbar hidden
        const iframe = document.createElement('iframe');
        iframe.src = project.modalMedia.src + '#toolbar=0';
        iframe.className = 'modal-pdf';
        mediaContainer.appendChild(iframe);
        mediaContainer.style.display = 'block';
        
      } else if (project.modalMedia && project.modalMedia.type === 'youtube') {
        const iframe = document.createElement('iframe');

        // Defensive: convert watch URL → embed URL if needed
        let url = project.modalMedia.src;
        if (url.includes("watch?v=")) {
          const videoId = url.split("v=")[1].split("&")[0];
          url = `https://www.youtube.com/embed/${videoId}`;
        }
        iframe.src = url + "?rel=0";

        iframe.className = 'modal-youtube';
        iframe.title = "YouTube video player";
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
        iframe.setAttribute("allowfullscreen", "true");
        mediaContainer.appendChild(iframe);
        mediaContainer.style.display = 'block';
        
      } else if (project.modalMedia && project.modalMedia.type === 'gdrive') {
        const iframe = document.createElement('iframe');
        iframe.src = project.modalMedia.src;
        iframe.className = 'modal-gdrive';
        iframe.title = "Google Drive video player";
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "autoplay; encrypted-media");
        iframe.setAttribute("allowfullscreen", "true");
        mediaContainer.appendChild(iframe);
        mediaContainer.style.display = 'block';
        
      } else if (project.modalMedia && project.modalMedia.type === 'local-video') {
        const video = document.createElement('video');
        video.src = project.modalMedia.src;
        video.className = 'modal-youtube'; // Reuse same aspect ratio container
        video.controls = true;
        video.autoplay = true;
        mediaContainer.appendChild(video);
        mediaContainer.style.display = 'block';
        
      } else if (project.image) {
        const img = document.createElement('img');
        img.src = project.image;
        img.alt = 'Project Cover';
        img.className = 'modal-cover';
        mediaContainer.appendChild(img);
        mediaContainer.style.display = 'block';
      } else {
        mediaContainer.style.display = 'none';
      }

      modalTitle.textContent = project.title;
      modalTag.innerHTML = project.tags ? project.tags.map(t => `<span class="tag">${t}</span>`).join('') : '';
      modalDesc.textContent = project.description;

      // Per-project modal description
      const extraContent = document.querySelector('.modal-extra-content p');
      if (project.modalDescription) {
        extraContent.textContent = project.modalDescription;
      } else {
        extraContent.textContent = '';
      }
      
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; 
    }

    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      // Stop video/media playback on close
      document.getElementById('modal-media-container').innerHTML = '';
    });

    modalOverlay.addEventListener('click', (e) => {
      if(e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        // Stop video/media playback on close
        document.getElementById('modal-media-container').innerHTML = '';
      }
    });
  }

  // Interactive words toggle filtering
  const words = document.querySelectorAll('.interactive-word');
  let currentFilter = null;
  
  if (gallery) {
    words.forEach(word => {
      word.addEventListener('click', () => {
        const filterStr = word.getAttribute('data-filter');
        
        if (currentFilter === filterStr) {
          currentFilter = null;
          words.forEach(w => w.classList.remove('active'));
        } else {
          currentFilter = filterStr;
          words.forEach(w => w.classList.remove('active'));
          word.classList.add('active');
        }
        
        gallery.style.animation = 'fadeOut 0.6s ease forwards';
        
        setTimeout(() => {
          renderGallery(currentFilter);
          gallery.style.animation = 'fadeIn 0.6s ease forwards';
        }, 600);
      });
    });
  }

  // Nav Scroll effect
  const navControls = document.querySelector('.nav-controls');

  // SPA Navigation Logic
  const tabHome = document.getElementById('tab-home');
  const tabAbout = document.getElementById('tab-about');
  const headlineView = document.getElementById('headline-view');
  
  window.addEventListener('scroll', () => {
    if (tabHome && tabHome.classList.contains('active')) {
      if (window.scrollY > 10) {
        if(navControls) navControls.classList.add('scrolled');
      } else {
        if(navControls) navControls.classList.remove('scrolled');
      }
    }
  });
  const galleryGrid = document.getElementById('gallery-grid');
  const resumeView = document.getElementById('resume-view');
  const dlResumeBtn = document.getElementById('dl-resume-btn');

  if(tabHome && tabAbout) {
    let isTransitioning = false;

    tabHome.addEventListener('click', (e) => {
      e.preventDefault();
      if(tabHome.classList.contains('active') || isTransitioning) return;
      
      tabAbout.classList.remove('active');
      tabHome.classList.add('active');
      isTransitioning = true;
      
      if(navControls && window.scrollY > 10) {
        navControls.classList.add('scrolled');
      }
      
      if(dlResumeBtn) {
        dlResumeBtn.style.opacity = '0';
        dlResumeBtn.style.pointerEvents = 'none';
      }
      
      resumeView.style.animation = 'fadeOut 0.8s ease forwards';
      
      setTimeout(() => {
        resumeView.style.display = 'none';
        
        headlineView.style.display = 'block';
        galleryGrid.style.display = 'grid';
        
        headlineView.style.animation = 'fadeIn 1.2s ease forwards';
        galleryGrid.style.animation = 'fadeIn 1.2s ease forwards';
        
        setTimeout(() => isTransitioning = false, 1200);
      }, 750);
    });

    tabAbout.addEventListener('click', (e) => {
      e.preventDefault();
      if(tabAbout.classList.contains('active') || isTransitioning) return;

      tabHome.classList.remove('active');
      tabAbout.classList.add('active');
      isTransitioning = true;
      
      if(navControls) navControls.classList.remove('scrolled');
      
      headlineView.style.animation = 'fadeOut 0.8s ease forwards';
      galleryGrid.style.animation = 'fadeOut 0.8s ease forwards';
      
      setTimeout(() => {
        headlineView.style.display = 'none';
        galleryGrid.style.display = 'none';
        if (creativeVisualsView) creativeVisualsView.style.display = 'none';
        
        resumeView.style.display = 'block';
        resumeView.style.animation = 'fadeIn 1.2s ease forwards';
        
        if(dlResumeBtn) {
          dlResumeBtn.style.opacity = '1';
          dlResumeBtn.style.pointerEvents = 'auto';
        }
        
        setTimeout(() => isTransitioning = false, 1200);
      }, 750);
    });
  }

  // Creative Visuals View Logic
  const creativeVisualsView = document.getElementById('creative-visuals-view');
  const cvCloseBtn = document.getElementById('cv-close-btn');

  function openCreativeVisuals() {
    if (tabHome && !tabHome.classList.contains('active')) {
      tabAbout.classList.remove('active');
      tabHome.classList.add('active');
    }
    
    headlineView.style.animation = 'fadeOut 0.8s ease forwards';
    galleryGrid.style.animation = 'fadeOut 0.8s ease forwards';
    if(dlResumeBtn) {
      dlResumeBtn.style.opacity = '0';
      dlResumeBtn.style.pointerEvents = 'none';
    }
    if (resumeView) {
      resumeView.style.animation = 'fadeOut 0.8s ease forwards';
    }
    
    setTimeout(() => {
      headlineView.style.display = 'none';
      galleryGrid.style.display = 'none';
      if(resumeView) resumeView.style.display = 'none';
      
      creativeVisualsView.style.display = 'block';
      creativeVisualsView.style.animation = 'fadeIn 1.2s ease forwards';
      
      // We manually dispatch a window resize so grid layouts apply cleanly if needed
      window.dispatchEvent(new Event('resize'));
    }, 750);
  }

  if (cvCloseBtn) {
    cvCloseBtn.addEventListener('click', () => {
      creativeVisualsView.style.animation = 'fadeOut 0.8s ease forwards';
      setTimeout(() => {
        creativeVisualsView.style.display = 'none';
        
        if (tabAbout && tabAbout.classList.contains('active')) {
          tabAbout.classList.remove('active');
          tabHome.classList.add('active');
        }
        
        headlineView.style.display = 'block';
        galleryGrid.style.display = 'grid';
        
        headlineView.style.animation = 'fadeIn 1.2s ease forwards';
        galleryGrid.style.animation = 'fadeIn 1.2s ease forwards';
      }, 750);
    });
  }

  // Creative Visuals Endless Zine Data
  const cvArtworks = [
    { type: 'image', src: 'assets/Visual Gallary/Poster 1.jpg', title: 'Poster for Magazine', story: 'Exploring time through shifting self-perception, inspired by Wanderer above the Sea of Fog.' },
    { type: 'video', src: 'assets/Visual Gallary/Reel 2.mp4', title: 'Brand Show Reel', story: 'Word-led showreel for Sukha Dukha Media.' },
    { type: 'image', src: 'assets/Visual Gallary/Poster 3.png', title: 'Poster Design', story: 'Designed for an online conference on breast cancer awareness.' },
    { type: 'video', src: 'assets/Visual Gallary/Reel 4.mp4', title: 'Pizza Chef AD', story: 'Advertisement video created for Pizza Chef.' },
    { type: 'video', src: 'assets/Visual Gallary/Reel 1.mp4', title: 'Team introduction', story: 'Introducing the team behind Sukha Dukha Media.' },
    { type: 'video', src: 'assets/Visual Gallary/Reel 5.mp4', title: 'Ramaiah Course Reel', story: 'Promoting undergraduate programs through short-form video.' },
    { type: 'image', src: 'assets/Visual Gallary/Poster 4.png', title: 'Website Magazine Header Design', story: 'Header design for an article featuring Arundhati Roy, Kamala Das, and Meena Kandasamy.' },
    { type: 'video', src: 'assets/Visual Gallary/Reel 3.mp4', title: 'Ramaiah Course Reel', story: 'Promoting postgraduate programs through short-form video.' },
    { type: 'image', src: 'assets/Visual Gallary/Poster 2.jpg', title: 'Book Cover Design', story: 'Conceptual redesign of The Indian National Congress: An Analytical Biography.' },
    { type: 'video', src: 'assets/Visual Gallary/Reel 6.mp4', title: 'Brand Show Reel', story: 'Cinematic showreel for Sukha Dukha Media.' }
  ];

  const cvGrid = document.getElementById('cv-grid');

  function renderCVBatch() {
    cvArtworks.forEach(art => {
      const card = document.createElement('div');
      card.className = 'cv-card';
      
      let frontMedia = '';
      if (art.type === 'video') {
        frontMedia = `<video src="${art.src}" loop muted autoplay playsinline></video>`;
      } else {
        frontMedia = `<img src="${art.src}" alt="${art.title}">`;
      }

      card.innerHTML = `
        <div class="cv-card-inner">
          <div class="cv-card-front">
            ${frontMedia}
          </div>
          <div class="cv-card-back">
            <h3 class="cv-card-title">${art.title}</h3>
            <p class="cv-card-story">${art.story}</p>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        if (art.type === 'video') {
          openModal({
            title: art.title,
            description: art.story,
            modalMedia: { type: 'local-video', src: art.src }
          });
        }
      });

      cvGrid.appendChild(card);
    });
  }

  if (cvGrid) {
    // Initial load only, no infinite scroll
    renderCVBatch();
  }

  // 2.5D Spatial Physics Engine
  const exhibitionContainer = document.getElementById('resume-view');
  const camera = document.getElementById('exhibition-camera');
  
  if (exhibitionContainer && camera) {
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    
    // Limits
    const minX = -1000, maxX = 1000;
    const minY = -1800, maxY = 500;

    let isDragging = false;
    let startX, startY;
    let initialTargetX, initialTargetY;

    // Mouse Wheel
    exhibitionContainer.addEventListener('wheel', (e) => {
      // e.preventDefault(); /* Prevents tab scrolling entirely while over canvas */
      targetX -= e.deltaX * 1.5;
      targetY -= e.deltaY * 1.5;
      clampTarget();
    }, { passive: false });

    // Dragging Logic
    exhibitionContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialTargetX = targetX;
      initialTargetY = targetY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      targetX = initialTargetX + dx * 1.8;
      targetY = initialTargetY + dy * 1.8;
      clampTarget();
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    window.addEventListener('mouseleave', () => {
      isDragging = false;
    });

    // Touch Support
    exhibitionContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      initialTargetX = targetX;
      initialTargetY = targetY;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      targetX = initialTargetX + dx * 1.8;
      targetY = initialTargetY + dy * 1.8;
      clampTarget();
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    function clampTarget() {
      // Soft Boundaries
      targetX = Math.max(minX, Math.min(maxX, targetX));
      targetY = Math.max(minY, Math.min(maxY, targetY));
    }

    // Animation Loop
    function updatePhysics() {
      // Linear Interpolation (lerp)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      
      // Apply translated properties back to CSS 
      camera.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px)`;
      
      requestAnimationFrame(updatePhysics);
    }
    
    updatePhysics();

    // Reset position when navigating back to tab
    const tabAboutInternal = document.getElementById('tab-about');
    if (tabAboutInternal) {
      tabAboutInternal.addEventListener('click', () => {
        targetX = 0;
        targetY = 0;
      });
    }

    // Interactive Poster Hover rotations
    const posters = document.querySelectorAll('.poster-block');
    posters.forEach(poster => {
      // Extended hitbox prevents flickering on edges
      poster.addEventListener('mousemove', (e) => {
        const rect = poster.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        poster.style.transform = `translate3d(calc(var(--tx) - 50%), calc(var(--ty) - 50%), var(--tz)) rotateY(${x * 0.03}deg) rotateX(${-y * 0.03}deg)`;
      });

      poster.addEventListener('mouseleave', () => {
        poster.style.transform = `translate3d(calc(var(--tx) - 50%), calc(var(--ty) - 50%), var(--tz)) rotateY(0deg) rotateX(0deg)`;
      });
    });
  }

  // Dot Scatter Background Logic
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let dots = [];
    const spacing = 35; // Increased density
    const mouse = { x: -1000, y: -1000, radius: 150 };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initDots();
    }

    function initDots() {
      dots = [];
      const hexHeight = spacing * 0.866; // Hexagonal vertical spacing
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / hexHeight) + 2;
      const offsetX = (width % spacing) / 2;
      const offsetY = (height % hexHeight) / 2;
      
      for (let j = -2; j <= rows; j++) {
        const rowOffsetX = (j % 2 === 0) ? 0 : spacing / 2;
        for (let i = -2; i <= cols; i++) {
          // Creating a subtle sine-wave pattern across the grid
          const patternVal = Math.sin(i * 0.4) * Math.cos(j * 0.4);
          
          dots.push({
            originX: offsetX + i * spacing + rowOffsetX,
            originY: offsetY + j * hexHeight,
            x: offsetX + i * spacing + rowOffsetX,
            y: offsetY + j * hexHeight,
            vx: 0,
            vy: 0,
            r: Math.max(0.5, 1.5 + patternVal * 1.0), // Size varies slightly
            o: 0.35 + patternVal * 0.15 // Opacity varies slightly
          });
        }
      }
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    function animateDots() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        
        let dx = mouse.x - dot.x;
        let dy = mouse.y - dot.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        // Repel from mouse
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * 5; // Reduced force for smoother scatter
          const pushY = Math.sin(angle) * force * 5;
          dot.vx -= pushX;
          dot.vy -= pushY;
        }

        // Return to origin (spring)
        dot.vx += (dot.originX - dot.x) * 0.05;
        dot.vy += (dot.originY - dot.y) * 0.05;

        // Friction
        dot.vx *= 0.8;
        dot.vy *= 0.8;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Draw dot
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.o})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(animateDots);
    }

    resize();
    animateDots();
  }
});

