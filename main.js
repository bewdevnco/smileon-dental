/* ==========================================================================
   SmileOn Complete Dental Care - Interactive Application Engine
   Updated with Structured WhatsApp Form Dispatch (08123253455)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Hamburger Drawer Toggle ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinksContainer.classList.toggle('mobile-active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (navLinksContainer.classList.contains('mobile-active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close menu when tapping any link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });

    // Close menu when tapping outside
    document.addEventListener('click', (e) => {
      if (!navLinksContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinksContainer.classList.remove('mobile-active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // --- 2. Scroll & Intersection Observer Text Reveal Animations ---
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll(
      '.reveal-text, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-tilt, .reveal-flip'
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // Trigger reveal animations on active page elements
  function triggerActiveViewReveals() {
    const activeView = document.querySelector('.page-view.active-view') || document.querySelector('.page-view');
    if (activeView) {
      const elements = activeView.querySelectorAll(
        '.reveal-text, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-tilt, .reveal-flip'
      );
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('revealed');
        }, index * 80);
      });
    }
  }

  // Initial trigger
  initRevealAnimations();
  triggerActiveViewReveals();

  // --- 4. Navigation & URL Parameter Pre-fill System ---
  const currentPath = window.location.pathname.toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (href === currentPath || ((href === '/' || href.endsWith('index.html')) && (currentPath === '/' || currentPath === '' || currentPath.endsWith('index.html'))) || (href !== '/' && currentPath.endsWith(href))) {
      link.classList.add('active');
    }
  });

  // Pre-fill URL Query Parameters on Booking Page
  const urlParams = new URLSearchParams(window.location.search);
  const paramDoctor = urlParams.get('doctor');
  const paramService = urlParams.get('service');

  if (paramDoctor) {
    const selectEl = document.getElementById('bookDoctorSelect');
    if (selectEl) {
      for (let i = 0; i < selectEl.options.length; i++) {
        if (selectEl.options[i].value.toLowerCase().includes(paramDoctor.toLowerCase())) {
          selectEl.selectedIndex = i;
          break;
        }
      }
    }
  }

  if (paramService) {
    const selectEl = document.getElementById('bookServiceSelect');
    if (selectEl) {
      for (let i = 0; i < selectEl.options.length; i++) {
        if (selectEl.options[i].value.toLowerCase().includes(paramService.toLowerCase())) {
          selectEl.selectedIndex = i;
          break;
        }
      }
    }
  }

  // --- 5. Interactive Before & After Smile Slider ---
  const baSlider = document.getElementById('baSlider');
  const baBeforeImage = document.getElementById('baBeforeImage');
  const baHandle = document.getElementById('baHandle');

  if (baSlider && baBeforeImage && baHandle) {
    let isDragging = false;

    function updateSliderPosition(x) {
      const rect = baSlider.getBoundingClientRect();
      let offsetX = x - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      baBeforeImage.style.width = `${percentage}%`;
      baHandle.style.left = `${percentage}%`;
    }

    baSlider.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for mobile responsiveness
    baSlider.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // --- 6. Services Category Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
          card.classList.add('revealed');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 7. Interactive Cost Estimator ---
  const calcTreatment = document.getElementById('calcTreatment');
  const calcUnits = document.getElementById('calcUnits');
  const calcDiscount = document.getElementById('calcDiscount');
  const calcTotalDisplay = document.getElementById('calcTotalDisplay');

  function calculateEstimate() {
    if (!calcTreatment || !calcUnits || !calcDiscount || !calcTotalDisplay) return;

    const basePrice = parseFloat(calcTreatment.value) || 0;
    const units = parseInt(calcUnits.value, 10) || 1;
    const discount = parseFloat(calcDiscount.value) || 0;

    const subtotal = basePrice * units;
    const finalTotal = subtotal * (1 - discount / 100);

    calcTotalDisplay.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
  }

  if (calcTreatment && calcUnits && calcDiscount) {
    calcTreatment.addEventListener('change', calculateEstimate);
    calcUnits.addEventListener('input', calculateEstimate);
    calcDiscount.addEventListener('change', calculateEstimate);
    calculateEstimate(); // Initial calculation
  }

  // --- 8. Quick Doctor & Procedure Pre-fill to Booking ---
  document.querySelectorAll('.book-doc-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const docName = btn.getAttribute('data-doctor');
      if (docName && !window.location.pathname.endsWith('booking.html')) {
        e.preventDefault();
        window.location.href = `/booking.html?doctor=${encodeURIComponent(docName)}`;
      }
    });
  });

  document.querySelectorAll('.book-proc-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service');
      if (serviceName && !window.location.pathname.endsWith('booking.html')) {
        e.preventDefault();
        window.location.href = `/booking.html?service=${encodeURIComponent(serviceName)}`;
      }
    });
  });

  // --- 9. Multi-Step Booking Wizard ---
  const stepNode1 = document.getElementById('stepNode1');
  const stepNode2 = document.getElementById('stepNode2');
  const stepNode3 = document.getElementById('stepNode3');

  const stepContent1 = document.getElementById('stepContent1');
  const stepContent2 = document.getElementById('stepContent2');
  const stepContent3 = document.getElementById('stepContent3');

  const gotoStep2 = document.getElementById('gotoStep2');
  const gotoStep3 = document.getElementById('gotoStep3');
  const backtoStep1 = document.getElementById('backtoStep1');
  const backtoStep2 = document.getElementById('backtoStep2');

  function showStep(stepNumber) {
    stepContent1.classList.remove('active-step');
    stepContent2.classList.remove('active-step');
    stepContent3.classList.remove('active-step');

    stepNode1.className = 'wizard-step-node';
    stepNode2.className = 'wizard-step-node';
    stepNode3.className = 'wizard-step-node';

    if (stepNumber === 1) {
      stepContent1.classList.add('active-step');
      stepNode1.classList.add('active');
    } else if (stepNumber === 2) {
      stepContent2.classList.add('active-step');
      stepNode1.classList.add('completed');
      stepNode2.classList.add('active');
    } else if (stepNumber === 3) {
      stepContent3.classList.add('active-step');
      stepNode1.classList.add('completed');
      stepNode2.classList.add('completed');
      stepNode3.classList.add('active');
    }
  }

  if (gotoStep2) {
    gotoStep2.addEventListener('click', () => {
      const service = document.getElementById('bookServiceSelect').value;
      if (!service) {
        showToast('Please select a dental treatment first', 'warning');
        return;
      }
      showStep(2);
    });
  }

  if (gotoStep3) {
    gotoStep3.addEventListener('click', () => {
      const date = document.getElementById('bookDateInput').value;
      if (!date) {
        showToast('Please choose a consultation date', 'warning');
        return;
      }
      showStep(3);
    });
  }

  if (backtoStep1) backtoStep1.addEventListener('click', () => showStep(1));
  if (backtoStep2) backtoStep2.addEventListener('click', () => showStep(2));

  // Default Today's Date in Date Input
  const dateInput = document.getElementById('bookDateInput');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }

  // Time Slot Selector
  const slotBtns = document.querySelectorAll('.slot-btn');
  slotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      slotBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // --- 10. Booking Form Submission & WhatsApp Automated Message Dispatch ---
  const bookingWizardForm = document.getElementById('bookingWizardForm');
  const bookingSuccessModal = document.getElementById('bookingSuccessModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalPatientText = document.getElementById('modalPatientText');
  const bookingCodeDisplay = document.getElementById('bookingCodeDisplay');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

  if (bookingWizardForm) {
    bookingWizardForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('patientName').value.trim();
      const phone = document.getElementById('patientPhone').value.trim();
      const email = document.getElementById('patientEmail').value.trim();
      const notes = document.getElementById('patientNotes').value.trim();
      const doctor = document.getElementById('bookDoctorSelect').value;
      const service = document.getElementById('bookServiceSelect').value;
      const date = document.getElementById('bookDateInput').value;

      const selectedSlotBtn = document.querySelector('.slot-btn.selected');
      const timeSlot = selectedSlotBtn ? selectedSlotBtn.textContent.trim() : '10:00 AM';

      const randomCode = 'REF-SMILE-' + Math.floor(1000 + Math.random() * 9000);

      // Build Premade Structured WhatsApp Message
      let waMessage = `Hello SmileOn Dental Care, I would like to confirm my appointment:\n\n` +
        `📌 *APPOINTMENT SUMMARY*\n` +
        `• *Reference Code:* ${randomCode}\n` +
        `• *Patient Name:* ${name}\n` +
        `• *Phone Number:* ${phone}\n` +
        (email ? `• *Email:* ${email}\n` : '') +
        `• *Doctor Specialist:* ${doctor}\n` +
        `• *Treatment Requested:* ${service}\n` +
        `• *Date:* ${date}\n` +
        `• *Time Slot:* ${timeSlot}\n` +
        (notes ? `• *Special Notes/Symptoms:* ${notes}\n` : '') +
        `\nPlease confirm my appointment slot. Thank you!`;

      const encodedMsg = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/918123253455?text=${encodedMsg}`;

      if (modalPatientText) {
        modalPatientText.innerHTML = `Thank you <strong>${name}</strong>! Your appointment summary for <em>${service}</em> with <strong>${doctor}</strong> is ready. Click below to send it via WhatsApp.`;
      }
      if (bookingCodeDisplay) {
        bookingCodeDisplay.textContent = randomCode;
      }
      if (modalWhatsAppBtn) {
        modalWhatsAppBtn.href = waUrl;
      }

      bookingSuccessModal.classList.add('active');

      // Auto-trigger WhatsApp link in a new tab/window
      window.open(waUrl, '_blank');
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      bookingSuccessModal.classList.remove('active');
      if (bookingWizardForm) bookingWizardForm.reset();
      if (typeof showStep === 'function') showStep(1);
      window.location.href = '/';
    });
  }

  // --- 11. Blog & FAQ Topic Filter, Expand & Deep-Link Interaction ---
  const blogFilterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  if (blogCards.length > 0) {
    function setCategoryFilter(filterCategory) {
      if (blogFilterBtns.length > 0) {
        blogFilterBtns.forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-filter') === filterCategory);
        });
      }
      blogCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterCategory === 'all' || category === filterCategory) {
          card.style.display = 'block';
          card.classList.add('revealed');
        } else {
          card.style.display = 'none';
        }
      });
    }

    if (blogFilterBtns.length > 0) {
      blogFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-filter') || 'all';
          setCategoryFilter(filter);
        });
      });
    }

    function expandCard(card, expand = true) {
      const expandBtn = card.querySelector('.blog-expand-btn');
      const span = expandBtn ? expandBtn.querySelector('span') : null;
      if (expand) {
        card.classList.add('is-expanded');
        if (expandBtn) expandBtn.setAttribute('aria-expanded', 'true');
        if (span) span.textContent = 'Close Details';
      } else {
        card.classList.remove('is-expanded');
        if (expandBtn) expandBtn.setAttribute('aria-expanded', 'false');
        if (span) span.textContent = 'Read Details & Doctor Advice';
      }
    }

    function toggleCard(card) {
      const isExpanded = card.classList.contains('is-expanded');
      expandCard(card, !isExpanded);
    }

    // Helper: copy question link to clipboard
    async function copyQuestionLink(anchorId) {
      const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(url);
        } else {
          const tempInput = document.createElement('input');
          tempInput.value = url;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        showToast('Question link copied to clipboard!', 'success');
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', `#${anchorId}`);
        }
      } catch (err) {
        console.error('Failed to copy link:', err);
        showToast('Link copied: ' + url, 'info');
      }
    }

    // Handle initial hash or hash changes for deep linking
    function handleHashNavigation(smoothScroll = true) {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) return;
      const targetCard = document.getElementById(hash);
      if (targetCard && targetCard.classList.contains('blog-card')) {
        // Ensure card is visible even if filtered out
        const category = targetCard.getAttribute('data-category');
        const activeBtn = document.querySelector('.blog-filter-btn.active');
        const currentFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
        if (currentFilter !== 'all' && currentFilter !== category) {
          setCategoryFilter('all');
        }
        expandCard(targetCard, true);
        if (smoothScroll) {
          setTimeout(() => {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    }

    blogCards.forEach(card => {
      const expandBtn = card.querySelector('.blog-expand-btn');
      const questionLink = card.querySelector('.blog-question-link');
      const copyBtn = card.querySelector('.blog-copy-link-btn');
      const shareBtn = card.querySelector('.blog-share-trigger');
      const cardId = card.id;

      if (expandBtn) {
        expandBtn.addEventListener('click', (e) => {
          e.preventDefault();
          toggleCard(card);
        });
      }

      if (questionLink) {
        questionLink.addEventListener('click', (e) => {
          e.preventDefault();
          toggleCard(card);
          if (cardId) {
            if (window.history && window.history.pushState) {
              window.history.pushState(null, '', `#${cardId}`);
            } else {
              window.location.hash = cardId;
            }
          }
        });
      }

      if (copyBtn) {
        copyBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const anchor = copyBtn.getAttribute('data-anchor') || cardId;
          expandCard(card, true);
          copyQuestionLink(anchor);
        });
      }

      if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const anchor = shareBtn.getAttribute('data-anchor') || cardId;
          expandCard(card, true);
          copyQuestionLink(anchor);
        });
      }
    });

    // Quick Directory jump links
    const dirLinks = document.querySelectorAll('.faq-dir-link');
    dirLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetCard = document.getElementById(targetId);
          if (targetCard) {
            e.preventDefault();
            setCategoryFilter('all');
            expandCard(targetCard, true);
            if (window.history && window.history.pushState) {
              window.history.pushState(null, '', href);
            } else {
              window.location.hash = targetId;
            }
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Run on initial page load if hash present
    if (window.location.hash) {
      setTimeout(() => handleHashNavigation(true), 250);
    }

    // Listen to hash changes (e.g. browser back/forward or external link jumps)
    window.addEventListener('hashchange', () => {
      handleHashNavigation(true);
    });
  }

  // --- 12. Notification Toast Helper ---
  function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'glass-toast';
    const iconClass = type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-check';
    const iconColor = type === 'warning' ? 'var(--accent-gold)' : 'var(--accent-mint)';

    toast.innerHTML = `<i class="fa-solid ${iconClass}" style="color:${iconColor}; font-size:1.2rem;"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // --- 13. Mobile Hero Stats Single Stationary Box Dynamic Rotation ---
  function initMobileHeroStats() {
    const statsGrid = document.querySelector('.hero-stats-grid');
    if (!statsGrid) return;

    // Remove any previously created clone elements
    const existingClones = statsGrid.querySelectorAll('.stat-clone');
    existingClones.forEach(el => el.remove());

    const statBoxes = Array.from(statsGrid.querySelectorAll('.stat-box'));
    if (!statBoxes.length) return;

    // Create micro-indicators inside the box for mobile rotation
    let indicatorContainer = statsGrid.querySelector('.hero-stats-indicators');
    if (!indicatorContainer) {
      indicatorContainer = document.createElement('div');
      indicatorContainer.className = 'hero-stats-indicators';
      statBoxes.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = `hero-stats-dot ${i === 0 ? 'active' : ''}`;
        indicatorContainer.appendChild(dot);
      });
      statsGrid.appendChild(indicatorContainer);
    }

    const dots = indicatorContainer.querySelectorAll('.hero-stats-dot');
    let currentIndex = 0;
    let rotateTimer = null;
    const ROTATION_INTERVAL = 2800; // 2.8s per stat

    function showStat(index, isManual = false) {
      currentIndex = ((index % statBoxes.length) + statBoxes.length) % statBoxes.length;

      statBoxes.forEach((box, i) => {
        if (i === currentIndex) {
          box.classList.add('stat-active');
        } else {
          box.classList.remove('stat-active');
        }
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });

      if (isManual) {
        scheduleNext(ROTATION_INTERVAL + 1200);
      }
    }

    function scheduleNext(delay = ROTATION_INTERVAL) {
      clearTimeout(rotateTimer);
      rotateTimer = setTimeout(() => {
        if (window.innerWidth <= 850) {
          showStat(currentIndex + 1);
          scheduleNext(ROTATION_INTERVAL);
        }
      }, delay);
    }

    function startRotation() {
      clearTimeout(rotateTimer);
      showStat(0);
      scheduleNext(ROTATION_INTERVAL);
    }

    function stopRotation() {
      clearTimeout(rotateTimer);
      statBoxes.forEach(box => {
        box.classList.remove('stat-active');
      });
    }

    // Tap to jump immediately to the next stat on mobile
    statsGrid.addEventListener('click', () => {
      if (window.innerWidth <= 850) {
        showStat(currentIndex + 1, true);
      }
    });

    // Touch swipe left/right support on the stationary box
    let touchStartX = 0;
    statsGrid.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    statsGrid.addEventListener('touchend', (e) => {
      if (window.innerWidth > 850) return;
      if (e.changedTouches && e.changedTouches[0]) {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 35) {
          if (diff < 0) {
            showStat(currentIndex + 1, true);
          } else {
            showStat(currentIndex - 1, true);
          }
        }
      }
    }, { passive: true });

    function handleResize() {
      if (window.innerWidth <= 850) {
        startRotation();
      } else {
        stopRotation();
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
  }

  initMobileHeroStats();
});

