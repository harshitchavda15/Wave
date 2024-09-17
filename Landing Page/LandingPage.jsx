import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Wave = () => {
  const [text, setText] = useState('');
  const [backgroundSVG, setBackgroundSVG] = useState('');

  useEffect(() => {
    const splitText = text.split(' ');
    const spans = splitText.map((word, index) => (
      <span key={index}>{word} </span>
    ));

    gsap.from(spans, {
      duration: 1,
      y: 80,
      opacity: 0,
      stagger: {
        amount: 1,
        ease: 'power2.out',
        start: 0.5,
        from: 'start',
      },
      delay: (index) => index * 0.1,
      ease: 'power2.out',
    });

    fetch('./img/LandingBackGround.svg')
      .then((response) => response.text())
      .then((data) => {
        setBackgroundSVG(data);

        const wave1 = document.getElementById('wave1');
        const wave2 = document.getElementById('wave2');
        const boat = document.getElementById('boat');

        gsap.fromTo(
          wave1,
          { y: 0 },
          {
            y: 110,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }
        );

        gsap.fromTo(
          wave2,
          { y: 50 },
          {
            y: 80,
            duration: 5.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }
        );

        gsap.to(wave1, {
          duration: 2.5,
          x: 50,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.1,
        });

        gsap.to(wave2, {
          duration: 2.7,
          x: 55,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.1,
        });

        gsap.fromTo(
          boat,
          {
            y: 870,
          },
          {
            y: 800,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }
        );

        gsap.fromTo(
          boat,
          {
            rotation: -7,
            x: 0,
          },
          {
            rotation: 7,
            x: 1950,
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            transformOrigin: '50% 50%',
          }
        );
      });
  }, []);

  return (
    <div>
      <nav className="topNav">
        <div className="logo">
          <a href="#">
            <h1 className="WAVE">WAVE</h1>
          </a>
        </div>
        <div className="links">
          <a href="Login.html">
            <h4>Login</h4>
          </a>
          <a href="SignUp.html">
            <h4>Sign Up</h4>
          </a>
          <h4>Buy Us A Coffee</h4>
          <h4>Let's Music</h4>
        </div>
      </nav>

      <div className="content">
        <p>
          {text.split(' ').map((word, index) => (
            <span key={index}>{word} </span>
          ))}
        </p>
      </div>

      <div id="backgroundSVG" dangerouslySetInnerHTML={{ __html: backgroundSVG }} />
    </div>
  );
};

export default Wave;