// GSAP animations
document.addEventListener('DOMContentLoaded', () => {
  // Animate navigation items
  gsap.from("nav ul li", {
    opacity: 0,
    y: -20,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
  });

  // Animate sections when they become visible
  gsap.utils.toArray('.admin-section').forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%", // Start animation when the section comes into view
        toggleActions: "play none none none"
      }
    });
  });

  // SVG animation
  gsap.fromTo("#animated-svg polygon", 
    { drawSVG: "0%" }, 
    { drawSVG: "100%", duration: 2, ease: "power1.inOut", repeat: -1, yoyo: true }
  );
});

// Show modal with GSAP animation
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';
  gsap.fromTo(
    modal.querySelector(".modal-content"),
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.75)" }
  );
}

// Hide modal with GSAP animation
function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  gsap.to(modal.querySelector(".modal-content"), {
    scale: 0,
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => (modal.style.display = 'none'),
  });
}

// Button hover animations
const buttons = document.querySelectorAll('.admin-section button');
buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    gsap.to(button, { scale: 1.1, duration: 0.3, ease: "power2.out" });
  });
  button.addEventListener('mouseleave', () => {
    gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.in" });
  });
});

// Toast notification animation
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  gsap.to(toast, {
    visibility: "visible",
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
  });
  setTimeout(() => {
    gsap.to(toast, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => (toast.style.visibility = "hidden"),
    });
  }, 3000);
}
