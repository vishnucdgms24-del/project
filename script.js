const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
const navItems = document.querySelectorAll(".nav-link");
const skillsGrid = document.querySelector(".skills-grid");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isOpen);
});

navItems.forEach((link) => {
  const isCurrentPage = new URL(link.href).pathname === window.location.pathname;
  link.classList.toggle("active", isCurrentPage);
  if (isCurrentPage) link.setAttribute("aria-current", "page");
  else link.removeAttribute("aria-current");

  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

if (skillsGrid && "IntersectionObserver" in window) {
  const skillsObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      skillsGrid.classList.add("is-visible");
      skillsObserver.disconnect();
    }
  }, { threshold: 0.2 });
  skillsObserver.observe(skillsGrid);
} else if (skillsGrid) {
  skillsGrid.classList.add("is-visible");
}

if (contactForm) contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.classList.remove("error");

  if (!contactForm.reportValidity()) {
    formStatus.textContent = "Please check your details and enter a valid email address.";
    formStatus.classList.add("error");
    return;
  }

  formStatus.textContent = "Looks good! This demo does not send messages—connect a form service to receive them.";
});
