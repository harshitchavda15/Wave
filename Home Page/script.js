  // GSAP animations
  gsap.from(".sideBar", { duration: 1, x: -220, ease: "power3.out" });
  gsap.from(".mainContainer", {
    duration: 1,
    opacity: 0,
    delay: 0.5,
    ease: "power3.out",
  });
  gsap.from(".topNav", {
    duration: 1,
    y: -100,
    delay: 0.8,
    ease: "power3.out",
  });
  gsap.from(".wavePlaylist .item", {
    duration: 1,
    opacity: 0,
    y: 100,
    stagger: 0.2,
    ease: "power3.out",
  });



 

  