gsap.from(".wave-text", {
  duration: 1, // Duration of the animation
  y: 80, // Vertical movement for a more noticeable wave
  opacity: 0,
  stagger: {
    amount: 1, // Total time for the stagger effect
    ease: "power2.out", // Smooth easing function
    start: 0.5, // Start stagger effect with a slight delay for a smoother wave
    from: "start"
  },
  delay: function(index) {
    return index * 0.1; // Creates a wave effect by delaying each element
  },
  ease: "power2.out" // Ensures smooth easing for the whole animation
});
