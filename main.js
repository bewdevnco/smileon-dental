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

  // --- 2. Light & Dark Theme Toggle System ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleIcon = document.getElementById('themeToggleIcon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('smileon-theme', theme);

    if (themeToggleIcon) {
      if (theme === 'light') {
        themeToggleIcon.className = 'fa-solid fa-moon';
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      } else {
        themeToggleIcon.className = 'fa-solid fa-sun';
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      }
    }
  }

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('smileon-theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // --- 3. Scroll & Intersection Observer Text Reveal Animations ---
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
    if (href === currentPath || (href.endsWith('index.html') && (currentPath === '/' || currentPath === '')) || (currentPath.endsWith(href))) {
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
      window.location.href = '/index.html';
    });
  }

  // --- 11. Notification Toast Helper ---
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

});
