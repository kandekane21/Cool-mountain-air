const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent =
      "Thanks for reaching out. Your message is ready to connect to email or a backend whenever you are.";
    contactForm.reset();
  });
}

const reviewCarousel = document.querySelector("[data-review-carousel]");

if (reviewCarousel) {
  const reviewTrack = reviewCarousel.querySelector("[data-review-track]");
  const prevButton = reviewCarousel.querySelector("[data-review-prev]");
  const nextButton = reviewCarousel.querySelector("[data-review-next]");
  const reviewCards = Array.from(reviewTrack?.children ?? []);
  let reviewIndex = 0;

  const getVisibleCards = () => (window.innerWidth <= 900 ? 1 : 2);

  const updateReviewCarousel = () => {
    if (!reviewTrack || reviewCards.length === 0) {
      return;
    }

    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, reviewCards.length - visibleCards);
    reviewIndex = Math.min(Math.max(reviewIndex, 0), maxIndex);

    const cardWidth = reviewCards[0].getBoundingClientRect().width;
    const gap = 16;
    const offset = reviewIndex * (cardWidth + gap);
    reviewTrack.style.transform = `translateX(-${offset}px)`;

    if (prevButton) {
      prevButton.disabled = reviewIndex === 0;
    }

    if (nextButton) {
      nextButton.disabled = reviewIndex === maxIndex;
    }
  };

  prevButton?.addEventListener("click", () => {
    reviewIndex = Math.max(0, reviewIndex - 1);
    updateReviewCarousel();
  });

  nextButton?.addEventListener("click", () => {
    reviewIndex = Math.min(reviewCards.length - 1, reviewIndex + 1);
    updateReviewCarousel();
  });

  window.addEventListener("resize", updateReviewCarousel);
  updateReviewCarousel();
}
