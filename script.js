const body = document.body;
const modeToggle = document.getElementById("modeToggle");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".main-nav a");
const pageLoader = document.getElementById("pageLoader");
const backToTop = document.getElementById("backToTop");

const setTheme = (mode) => {
  const isDark = mode === "dark";
  body.classList.toggle("dark-mode", isDark);
  if (modeToggle) {
    const nextModeLabel = isDark ? "Switch to light mode" : "Switch to dark mode";
    modeToggle.setAttribute("aria-label", nextModeLabel);
    modeToggle.setAttribute("title", nextModeLabel);
  }
  localStorage.setItem("theme", mode);
};

setTheme(localStorage.getItem("theme") || "light");

if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    const isDark = body.classList.contains("dark-mode");
    setTheme(isDark ? "light" : "dark");
  });
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mainNav) mainNav.classList.remove("open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  });
});

const homeLinks = document.querySelectorAll('a[href="#home"], a[href="index.html#home"]');
homeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const isSamePageHome = link.getAttribute("href") === "#home";
    if (isSamePageHome) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
});

if (backToTop) {
  const toggleBackToTop = () => {
    const isVisible = window.scrollY > 420;
    backToTop.classList.toggle("visible", isVisible);
  };

  toggleBackToTop();
  window.addEventListener("scroll", toggleBackToTop);

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const slides = Array.from(document.querySelectorAll(".slide"));
const dotsWrap = document.getElementById("sliderDots");
const prevBtn = document.getElementById("prevTestimonial");
const nextBtn = document.getElementById("nextTestimonial");
let currentSlide = 0;
let sliderInterval;

const createDots = () => {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index));
    dotsWrap.appendChild(dot);
  });
};

const showSlide = (index) => {
  slides[currentSlide].classList.remove("active");
  dotsWrap.children[currentSlide].classList.remove("active");

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add("active");
  dotsWrap.children[currentSlide].classList.add("active");
};

const nextSlide = () => showSlide(currentSlide + 1);
const prevSlide = () => showSlide(currentSlide - 1);

const startSlider = () => {
  stopSlider();
  sliderInterval = setInterval(nextSlide, 5000);
};

const stopSlider = () => {
  if (sliderInterval) clearInterval(sliderInterval);
};

if (slides.length > 0 && dotsWrap && prevBtn && nextBtn) {
  createDots();
  showSlide(0);
  startSlider();

  nextBtn.addEventListener("click", () => {
    nextSlide();
    startSlider();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    startSlider();
  });

  const slider = document.querySelector(".testimonial-slider");
  if (slider) {
    slider.addEventListener("mouseenter", stopSlider);
    slider.addEventListener("mouseleave", startSlider);
  }
}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please complete all fields.";
      formStatus.style.color = "#d64545";
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      formStatus.textContent = "Please enter a valid email address.";
      formStatus.style.color = "#d64545";
      return;
    }

    formStatus.textContent = "Message sent successfully. We will contact you soon.";
    formStatus.style.color = "#0ea170";
    contactForm.reset();
  });
}

const rippleButtons = document.querySelectorAll(".ripple");
rippleButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const wave = document.createElement("span");
    wave.className = "ripple-wave";

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    wave.style.width = `${size}px`;
    wave.style.height = `${size}px`;
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;

    button.appendChild(wave);
    setTimeout(() => wave.remove(), 550);
  });
});

window.addEventListener("load", () => {
  if (pageLoader) {
    pageLoader.classList.add("hide");
    setTimeout(() => pageLoader.remove(), 500);
  }
});
