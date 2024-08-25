// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Animate the sidebar sliding in from the left
  gsap.from(".sideBar", {
    overflow:"hidden",
    duration: 1.5,
    x: "-100%",
    ease: "power2.out",
  });

  // Animate the header sliding down from the top
  gsap.from(".topNav", {
    overflow: "hidden",
    duration: 1,
    y: "-100%",
    ease: "power2.out",
    delay: 0.5,
    opacity: 0,
});

 

  // Animate the playlists section sliding in from the bottom
  gsap.from(".wavePlaylist h2, .list .item", {
    overflow: "hidden",
    duration: 1,
    y: "100%",
    opacity: 0,
    ease: "power2.out",
    stagger: 0.3,
    delay: 2,
  });

  // Animate the logo fading in
  gsap.from(".logo h1", {
    overflow: "hidden",
    duration: 1,
    opacity: 0,
    y: "-20px",
    ease: "power2.out",
    delay: 0.5,
  });

  // Animate the navigation links appearing with a delay
  gsap.from(".navLinks li", {
    overflow: "hidden",
    duration: 1,
    opacity: 0,
    y: "20px",
    ease: "power2.out",
    stagger: 0.2,
    delay: 0.5,
  });

  // Animate the policies section sliding in from the bottom
  gsap.from(".policies ul li", {
    overflow: "hidden",
    duration: 1,
    y: "50px",
    opacity: 0,
    ease: "power2.out",
    stagger: 0.2,
    delay: 0.7,
  });
});