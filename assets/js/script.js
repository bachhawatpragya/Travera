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

});
