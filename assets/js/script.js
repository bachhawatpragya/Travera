'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /**
   * navbar toggle
   */

  const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
  const header = document.querySelector("[data-header]");

  if (navToggleBtn && header) {
    navToggleBtn.addEventListener("click", function () {
      this.classList.toggle("active");
      header.classList.toggle("active");
    });
  }


  /**
   * show go top btn when scroll window to 500px
   */

  const goTopBtn = document.querySelector("[data-go-top]");

  if (goTopBtn) {
    window.addEventListener("scroll", function () {
      window.scrollY >= 500 ? goTopBtn.classList.add("active")
        : goTopBtn.classList.remove("active");
    });
  }


  /**
   * destination modal (mini wiki popup)
   */

  const modal = document.getElementById("destinationModal");
  const closeBtn = document.getElementById("closeModal");
  const cards = document.querySelectorAll(".destination-card");

  let destinationData = {};

  // load destination data
  fetch("./assets/json/destination.json")
    .then(res => res.json())
    .then(data => {
      destinationData = data;
    }).catch(err => {
      console.error('Failed to load destination data', err);
    });

  function openModal(placeKey) {
    const info = destinationData[placeKey];
    if (!info || !modal) return;

    const titleEl = document.getElementById("modalTitle");
    const currencyEl = document.getElementById("modalCurrency");
    const foodEl = document.getElementById("modalFood");
    const traditionEl = document.getElementById("modalTradition");
    const spotsEl = document.getElementById("modalSpots");

    if (titleEl) titleEl.textContent = info.title;
    if (currencyEl) currencyEl.textContent = info.currency;
    if (foodEl) foodEl.textContent = info.food;
    if (traditionEl) traditionEl.textContent = info.tradition;

    if (spotsEl) {
      spotsEl.innerHTML = "";
      info.spots.forEach(spot => {
        const li = document.createElement("li");
        li.textContent = spot;
        spotsEl.appendChild(li);
      });
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // open when destination clicked
  if (cards && cards.length) {
    cards.forEach(card => {
      card.addEventListener("click", e => {
        e.preventDefault();
        openModal(card.dataset.place);
      });
    });
  }

  // close events
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  /* Terms & Conditions modal */
  const termsLink = document.getElementById('termsLink');
  const termsModal = document.getElementById('termsModal');
  const closeTerms = document.getElementById('closeTerms');

  console.debug('Terms elements:', { termsLink, termsModal, closeTerms });

  if (termsLink && termsModal && closeTerms) {
    termsLink.addEventListener('click', e => {
      e.preventDefault();
      console.debug('termsLink clicked — opening modal');
      termsModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeTerms.addEventListener('click', () => {
      termsModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    termsModal.addEventListener('click', e => {
      if (e.target === termsModal) {
        termsModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && termsModal.classList.contains('active')) {
        termsModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* Packing & Quick Guide modal */
  const guideLink = document.getElementById('guideLink');
  const guideModal = document.getElementById('guideModal');
  const closeGuide = document.getElementById('closeGuide');

  if (guideLink && guideModal && closeGuide) {
    guideLink.addEventListener('click', e => {
      e.preventDefault();
      guideModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeGuide.addEventListener('click', () => {
      guideModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    guideModal.addEventListener('click', e => {
      if (e.target === guideModal) {
        guideModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && guideModal.classList.contains('active')) {
        guideModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }


  /* Hero "Learn More" expandable panel */
  const learnMoreBtn = document.getElementById('learnMoreBtn');
  const hero = document.querySelector('.hero');
  const heroExtend = document.getElementById('heroExtend');

  if (learnMoreBtn && hero && heroExtend) {
    const originalBtns = document.querySelector('.hero-content .btn-group');
    const extendedBtns = document.getElementById('btnGroupExtended');
    const learnMoreClone = document.getElementById('learnMoreBtnClone');

    const isLarge = () => window.matchMedia('(min-width: 768px)').matches;

    // clone handler (collapse) — attach once
    if (learnMoreClone) {
      learnMoreClone.addEventListener('click', ev => {
        ev.preventDefault();
        hero.classList.remove('expanded');
        learnMoreBtn.textContent = 'Learn More';
        learnMoreBtn.setAttribute('aria-expanded', false);
        heroExtend.setAttribute('aria-hidden', true);
        if (originalBtns && extendedBtns && !isLarge()) {
          originalBtns.style.display = '';
          extendedBtns.style.display = 'none';
        }
        if (!isLarge()) {
          hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    learnMoreBtn.addEventListener('click', e => {
      e.preventDefault();
      const expanded = hero.classList.toggle('expanded');
      learnMoreBtn.textContent = expanded ? 'Show Less' : 'Learn More';
      learnMoreBtn.setAttribute('aria-expanded', expanded);
      heroExtend.setAttribute('aria-hidden', !expanded);

      // only swap button groups on small/medium screens
      if (originalBtns && extendedBtns) {
        if (!isLarge()) {
          originalBtns.style.display = expanded ? 'none' : '';
          extendedBtns.style.display = expanded ? 'flex' : 'none';
        } else {
          // ensure on large screens original buttons remain visible and clone stays hidden
          originalBtns.style.display = '';
          extendedBtns.style.display = 'none';
        }
      }

      if (!isLarge()) {
        if (expanded) {
          heroExtend.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });

    // Handle breakpoint changes so buttons stay in the correct place
    window.addEventListener('resize', () => {
      if (!(originalBtns && extendedBtns)) return;
      const large = isLarge();
      if (large) {
        // on large screens always keep original buttons visible
        originalBtns.style.display = '';
        extendedBtns.style.display = 'none';
      } else {
        // on small screens, if panel is expanded show extended buttons below
        if (hero.classList.contains('expanded')) {
          originalBtns.style.display = 'none';
          extendedBtns.style.display = 'flex';
        } else {
          originalBtns.style.display = '';
          extendedBtns.style.display = 'none';
        }
      }
    });
  }

  /* Inline blog "Read more" toggles (prevents jumping to top) */
  const readMoreLinks = document.querySelectorAll('.blog-list .read-more');
  if (readMoreLinks && readMoreLinks.length) {
    readMoreLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const card = link.closest('.blog-card');
        if (!card) return;
        const expanded = card.classList.toggle('expanded');
        link.setAttribute('aria-expanded', expanded);
        const more = card.querySelector('.blog-more');
        if (more) more.setAttribute('aria-hidden', !expanded);
        const label = link.querySelector('span');
        if (label) label.textContent = expanded ? 'Show Less' : 'Read More';
        // avoid auto-scrolling on small screens which causes undesired page movement
        if (expanded && !window.matchMedia('(max-width: 767px)').matches) {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }

  /* ==========================================================================
     DYNAMIC UPGRADES & INTERACTIVE UX LOGIC
     ========================================================================== */

  // 2. Booking Modal and Calculation Logic
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingBtn = document.getElementById('closeBookingBtn');
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccessView = document.getElementById('bookingSuccessView');
  const successCloseBtn = document.getElementById('successCloseBtn');
  const bookingDestinationSelect = document.getElementById('bookingDestination');
  const bookingGuestsInput = document.getElementById('bookingGuests');
  const bookingStartDateInput = document.getElementById('bookingStartDate');
  const bookingEndDateInput = document.getElementById('bookingEndDate');
  const bookingTotalEstimate = document.getElementById('bookingTotalEstimate');
  const bookingBadge = document.getElementById('bookingBadge');

  let bookingIdToCancel = null;
  const confirmCancelModal = document.getElementById('confirmCancelModal');
  const confirmCancelNo = document.getElementById('confirmCancelNo');
  const confirmCancelYes = document.getElementById('confirmCancelYes');


  const destPrices = {
    maldives: 499,
    malta: 349,
    iceland: 599,
    andorra: 299,
    indonesia: 399,
    switzerland: 1299,
    morocco: 699
  };

  const destNames = {
    maldives: 'Maldives',
    malta: 'Malta',
    iceland: 'Iceland',
    andorra: 'Andorra',
    indonesia: 'Indonesia',
    switzerland: 'Switzerland',
    morocco: 'Morocco'
  };

  function updateBookingEstimate() {
    const dest = bookingDestinationSelect.value;
    const guests = parseInt(bookingGuestsInput.value) || 1;
    const startDateVal = bookingStartDateInput.value;
    const endDateVal = bookingEndDateInput.value;

    if (!dest || !destPrices[dest]) {
      bookingTotalEstimate.textContent = '$0.00';
      return;
    }

    let days = 1;
    if (startDateVal && endDateVal) {
      const start = new Date(startDateVal);
      const end = new Date(endDateVal);
      if (end >= start) {
        days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
      }
    }

    const total = destPrices[dest] * guests * days;
    bookingTotalEstimate.textContent = `$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  if (bookingDestinationSelect) bookingDestinationSelect.addEventListener('change', updateBookingEstimate);
  if (bookingGuestsInput) bookingGuestsInput.addEventListener('input', updateBookingEstimate);
  if (bookingStartDateInput) bookingStartDateInput.addEventListener('change', updateBookingEstimate);
  if (bookingEndDateInput) bookingEndDateInput.addEventListener('change', updateBookingEstimate);

  function openBookingModal(prefilledDest = '') {
    if (!bookingModal) return;
    bookingForm.style.display = 'block';
    bookingSuccessView.style.display = 'none';
    bookingForm.reset();
    
    // Set default dates (today and 7 days later)
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    if (bookingStartDateInput) bookingStartDateInput.value = today.toISOString().split('T')[0];
    if (bookingEndDateInput) bookingEndDateInput.value = nextWeek.toISOString().split('T')[0];
    
    if (prefilledDest && bookingDestinationSelect) {
      bookingDestinationSelect.value = prefilledDest;
    }
    
    updateBookingEstimate();
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBookingBtn) closeBookingBtn.addEventListener('click', closeBookingModal);
  if (successCloseBtn) successCloseBtn.addEventListener('click', closeBookingModal);

  // Wire up all Book triggers
  const bookingBtnHeader = document.getElementById('bookingBtnHeader');
  if (bookingBtnHeader) {
    bookingBtnHeader.addEventListener('click', () => openBookingModal());
  }

  const bookYourTripBtn = document.querySelector('.about .btn-primary');
  if (bookYourTripBtn) {
    bookYourTripBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal();
    });
  }

  // Wire up card buttons via event delegation or direct selection (since list might get reordered)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.card-book-btn');
    if (btn) {
      e.stopPropagation();
      openBookingModal(btn.dataset.destKey);
    }
  });

  // LocalStorage Helpers for Bookings
  function getBookings() {
    return JSON.parse(localStorage.getItem('travera_bookings') || '[]');
  }

  function saveBooking(booking) {
    const bookings = getBookings();
    bookings.push(booking);
    localStorage.setItem('travera_bookings', JSON.stringify(bookings));
    updateBookingBadge();
  }

  function deleteBooking(id) {
    let bookings = getBookings();
    bookings = bookings.filter(b => b.id !== id);
    localStorage.setItem('travera_bookings', JSON.stringify(bookings));
    updateBookingBadge();
    renderBookingsList();
  }

  function updateBookingBadge() {
    if (!bookingBadge) return;
    const count = getBookings().length;
    if (count > 0) {
      bookingBadge.textContent = count;
      bookingBadge.style.display = 'inline-block';
    } else {
      bookingBadge.style.display = 'none';
    }
  }

  // Initial badge update
  updateBookingBadge();

  // Booking Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const dest = bookingDestinationSelect.value;
      const guests = parseInt(bookingGuestsInput.value) || 1;
      const startDateVal = bookingStartDateInput.value;
      const endDateVal = bookingEndDateInput.value;
      const name = document.getElementById('bookingName').value;
      const email = document.getElementById('bookingEmail').value;
      
      const start = new Date(startDateVal);
      const end = new Date(endDateVal);
      const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
      const totalCost = destPrices[dest] * guests * days;
      const refCode = 'TRV-' + Math.floor(100000 + Math.random() * 900000);
      
      const newBooking = {
        id: refCode,
        dest: dest,
        destName: destNames[dest],
        guests: guests,
        startDate: startDateVal,
        endDate: endDateVal,
        days: days,
        name: name,
        email: email,
        totalCost: totalCost
      };
      
      saveBooking(newBooking);
      
      // Populate Success ticket
      document.getElementById('passDestName').textContent = destNames[dest];
      document.getElementById('passCodeTo').textContent = dest.substring(0, 4).toUpperCase();
      document.getElementById('passTravelerName').textContent = name;
      document.getElementById('passRefCode').textContent = refCode;
      document.getElementById('passDates').textContent = `${startDateVal} to ${endDateVal}`;
      document.getElementById('passGuestsCount').textContent = guests;
      document.getElementById('passTotalCost').textContent = `$${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      
      // Transition to Success screen
      bookingForm.style.display = 'none';
      bookingSuccessView.style.display = 'block';
    });
  }

  // 3. My Bookings Dashboard Modal
  const myBookingsBtn = document.getElementById('myBookingsBtn');
  const myBookingsModal = document.getElementById('myBookingsModal');
  const closeMyBookingsBtn = document.getElementById('closeMyBookingsBtn');
  const bookingsListContainer = document.getElementById('bookingsListContainer');

  function renderBookingsList() {
    if (!bookingsListContainer) return;
    const bookings = getBookings();
    if (bookings.length === 0) {
      bookingsListContainer.innerHTML = `
        <div class="no-bookings">
          <ion-icon name="calendar-outline"></ion-icon>
          <p>No bookings found. Start exploring and book a trip today!</p>
        </div>
      `;
      return;
    }

    bookingsListContainer.innerHTML = bookings.map(b => `
      <div class="booking-item-card">
        <div class="booking-item-details">
          <h4>${b.destName}</h4>
          <p><strong>Dates:</strong> ${b.startDate} to ${b.endDate} (${b.days} days)</p>
          <p><strong>Guests:</strong> ${b.guests} | <strong>Total paid:</strong> $${b.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p><strong>Ref:</strong> ${b.id}</p>
        </div>
        <div class="booking-item-actions">
          <button type="button" class="btn btn-outline cancel-booking-btn" data-id="${b.id}" style="padding: 6px 12px; font-size: 1.2rem; border-color: #ef4444; color: #ef4444;">Cancel</button>
        </div>
      </div>
    `).join('');

    // Attach cancel click handlers
    const cancelBtns = bookingsListContainer.querySelectorAll('.cancel-booking-btn');
    cancelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        bookingIdToCancel = btn.dataset.id;
        if (confirmCancelModal) {
          confirmCancelModal.classList.add('active');
        }
      });
    });
  }

  if (confirmCancelNo) {
    confirmCancelNo.addEventListener('click', () => {
      if (confirmCancelModal) confirmCancelModal.classList.remove('active');
      bookingIdToCancel = null;
    });
  }

  if (confirmCancelYes) {
    confirmCancelYes.addEventListener('click', () => {
      if (bookingIdToCancel) {
        deleteBooking(bookingIdToCancel);
      }
      if (confirmCancelModal) confirmCancelModal.classList.remove('active');
      bookingIdToCancel = null;
    });
  }

  if (myBookingsBtn) {
    myBookingsBtn.addEventListener('click', () => {
      renderBookingsList();
      if (myBookingsModal) {
        myBookingsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  function closeMyBookingsModal() {
    if (!myBookingsModal) return;
    myBookingsModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeMyBookingsBtn) closeMyBookingsBtn.addEventListener('click', closeMyBookingsModal);

  // Close modals on outside click
  window.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeBookingModal();
    if (e.target === myBookingsModal) closeMyBookingsModal();
    if (e.target === confirmCancelModal) {
      confirmCancelModal.classList.remove('active');
      bookingIdToCancel = null;
    }
  });

  // 4. Travel Match Quiz Logic
  const quizModal = document.getElementById('quizModal');
  const quizTriggerBtn = document.getElementById('quizTriggerBtn');
  const closeQuizBtn = document.getElementById('closeQuizBtn');
  const quizPrevBtns = document.querySelectorAll('.quiz-prev-btn');
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizBookBtn = document.getElementById('quizBookBtn');
  const quizRetakeBtn = document.getElementById('quizRetakeBtn');
  
  let quizAnswers = { 1: '', 2: '', 3: '' };
  let currentQuizStep = 1;

  function setQuizStep(step) {
    currentQuizStep = step;
    const panels = document.querySelectorAll('.quiz-question-panel');
    panels.forEach(p => p.classList.remove('active'));
    
    if (step === 'result') {
      document.getElementById('quizResultPanel').classList.add('active');
      evaluateQuizResult();
    } else {
      const panel = document.querySelector(`.quiz-question-panel[data-q="${step}"]`);
      if (panel) panel.classList.add('active');
    }
  }

  function evaluateQuizResult() {
    const environment = quizAnswers[1];
    let recommendedKey = environment;
    
    // Fallback or specific mapping
    if (!recommendedKey) recommendedKey = 'maldives';
    
    const resultTitleEl = document.getElementById('quizResultTitle');
    const resultTextEl = document.getElementById('quizResultText');
    
    if (resultTitleEl) resultTitleEl.textContent = destNames[recommendedKey];
    
    if (resultTextEl) {
      if (recommendedKey === 'maldives') {
        resultTextEl.textContent = 'We recommend the Maldives! Perfect for a slow, relaxing tropical beach holiday with crystal waters.';
      } else if (recommendedKey === 'iceland') {
        resultTextEl.textContent = 'We recommend Iceland! Witness northern lights, massive glaciers, and geothermal hot springs.';
      } else if (recommendedKey === 'switzerland') {
        resultTextEl.textContent = 'We recommend Switzerland! Perfect for snow sports, skiing down alpine slopes, and cozy village retreats.';
      } else {
        resultTextEl.textContent = 'We recommend Indonesia! Explore beautiful Bali beaches, local culture, and amazing sightseeing paths.';
      }
    }
    
    if (quizBookBtn) {
      quizBookBtn.setAttribute('data-dest-key', recommendedKey);
    }
  }

  if (quizTriggerBtn) {
    quizTriggerBtn.addEventListener('click', () => {
      quizAnswers = { 1: '', 2: '', 3: '' };
      setQuizStep(1);
      if (quizModal) {
        quizModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  function closeQuizModal() {
    if (!quizModal) return;
    quizModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeQuizBtn) closeQuizBtn.addEventListener('click', closeQuizModal);

  quizOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const panel = opt.closest('.quiz-question-panel');
      const questionNum = parseInt(panel.dataset.q);
      const val = opt.dataset.val;
      
      quizAnswers[questionNum] = val;
      
      if (questionNum < 3) {
        setQuizStep(questionNum + 1);
      } else {
        setQuizStep('result');
      }
    });
  });

  quizPrevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentQuizStep > 1) {
        setQuizStep(currentQuizStep - 1);
      }
    });
  });

  if (quizRetakeBtn) {
    quizRetakeBtn.addEventListener('click', () => {
      quizAnswers = { 1: '', 2: '', 3: '' };
      setQuizStep(1);
    });
  }

  if (quizBookBtn) {
    quizBookBtn.addEventListener('click', () => {
      const destKey = quizBookBtn.getAttribute('data-dest-key');
      closeQuizModal();
      openBookingModal(destKey);
    });
  }

  // 5. Tours Real-Time Search, Filter & Sort
  const toursSearchInput = document.getElementById('toursSearchInput');
  const toursDurationFilter = document.getElementById('toursDurationFilter');
  const toursSortSelect = document.getElementById('toursSortSelect');
  const toursList = document.getElementById('toursList');

  function filterAndSortTours() {
    if (!toursList) return;
    
    const searchVal = toursSearchInput.value.toLowerCase().trim();
    const durationVal = toursDurationFilter.value;
    const sortVal = toursSortSelect.value;
    
    const items = Array.from(toursList.querySelectorAll('.tour-item'));
    
    // Filter items
    items.forEach(item => {
      const name = item.dataset.name.toLowerCase();
      const location = item.dataset.location.toLowerCase();
      const duration = parseInt(item.dataset.duration);
      
      let matchesSearch = !searchVal || name.includes(searchVal) || location.includes(searchVal);
      let matchesDuration = true;
      
      if (durationVal === 'short') {
        matchesDuration = duration < 7;
      } else if (durationVal === 'medium') {
        matchesDuration = duration >= 7 && duration <= 9;
      } else if (durationVal === 'long') {
        matchesDuration = duration >= 10;
      }
      
      if (matchesSearch && matchesDuration) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
    
    // Sort items
    if (sortVal !== 'default') {
      const visibleItems = items.filter(item => item.style.display !== 'none');
      const hiddenItems = items.filter(item => item.style.display === 'none');
      
      visibleItems.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);
        
        if (sortVal === 'price-low') {
          return priceA - priceB;
        } else if (sortVal === 'price-high') {
          return priceB - priceA;
        }
        return 0;
      });
      
      // Re-append items to DOM in sorted order
      toursList.innerHTML = '';
      visibleItems.forEach(item => toursList.appendChild(item));
      hiddenItems.forEach(item => toursList.appendChild(item));
    }
  }

  if (toursSearchInput) toursSearchInput.addEventListener('input', filterAndSortTours);
  if (toursDurationFilter) toursDurationFilter.addEventListener('change', filterAndSortTours);
  if (toursSortSelect) toursSortSelect.addEventListener('change', filterAndSortTours);

  // 6. Newsletter mock subscription
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      if (emailInput && emailInput.value) {
        emailInput.value = '';
      }
    });
  }

});
