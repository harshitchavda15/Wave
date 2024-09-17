import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [backgroundSVG, setBackgroundSVG] = useState('');

  useEffect(() => {
    fetch('./img/LoginBackGround.svg')
      .then((response) => response.text())
      .then((data) => {
        setBackgroundSVG(data);

        // Add GSAP animations as before
        gsap.fromTo(
          "#wave1",
          { y: 0 },
          {
            y: 110,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          "#wave2",
          { y: 50 },
          {
            y: 80,
            duration: 5.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );

        gsap.to("#wave1 path", {
          duration: 2.5,
          x: 50,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.1,
        });

        gsap.to("#wave2 path", {
          duration: 2.7,
          x: 55,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.1,
        });

        // Music Notes Animations
        gsap.fromTo(
          ["#note1", "#note2", "#note3", "#note4"],
          {
            y: 0,
            opacity: 0.7,
          },
          {
            y: (i, target) => (i % 2 === 0 ? -30 : -40),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.3,
            duration: 4,
            opacity: 1,
            rotation: (i, target) => (i % 2 === 0 ? 5 : -5),
          }
        );

        // Letters Animations
        gsap.fromTo(
          ["#letter1", "#letter2", "#letter3", "#letter4"],
          {
            y: 0,
            scale: 1,
          },
          {
            y: (i, target) => (i % 2 === 0 ? -40 : -50),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.2,
            duration: 5,
            scale: 1.1,
            x: (i, target) => (i % 2 === 0 ? 5 : -5),
          }
        );

        // Color transitions for music notes
        gsap.to(["#note1", "#note2", "#note3", "#note4"], {
          duration: 3,
          fill: "#FDCB9E",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Subtle rotation and scaling for letters
        gsap.to(["#letter1", "#letter2", "#letter3", "#letter4"], {
          duration: 6,
          rotation: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = {
      username: signupUsername,
      password: signupPassword,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: loginEmail,
      password: loginPassword,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <nav className="sideBar">
        <div className="logo">
          <a href="#">
            <h1 className="WAVE">WAVE</h1>
          </a>
        </div>
      </nav>

      <div className="border-container">
        <div className="container" id="container">
          {/* Sign-Up Form */}
          <div className="form-container sign-up-container">
            <form id="signupForm">
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <div className="infield">
                <input
                  type="text"
                  placeholder="Name"
                  id="signupUsername"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  required
                />
              </div>
              <div className="infield">
                <input
                  type="email"
                  placeholder="Email"
                  id="signupEmail"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div className="infield">
                <input
                  type="password"
                  placeholder="Password"
                  id="signupPassword"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
 <button type="button" onClick={handleSignup}>
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign-In Form */}
          <div className="form-container sign-in-container">
            <form id="loginForm">
              <h1>Log In</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your account</span>
              <div className="infield">
                <input
                  type="email"
                  placeholder="Email"
                  id="loginEmail"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="infield">
                <input
                  type="password"
                  placeholder="Password"
                  id="loginPassword"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <a href="#" className="forgot">
                Forgot your password?
              </a>
              <button type="button" onClick={handleLogin}>
                Log In
              </button>
            </form>
          </div>

          {/* Overlay Panels */}
          <div className="overlay-container" id="overlayCon">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>
                  Welcome Back!
                  <h4 style={{ color: "black" }}>Let's WAVE</h4>
                </h1>
                <p style={{ fontWeight: 700 }}>Miss us? We miss you!!</p>
                <button id="overlayBtnLogIn">Log In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>
                  Hello, Friend!
                  <h4 style={{ color: "black" }}>Ready To WAVE?</h4>
                </h1>
                <p style={{ fontWeight: 700 }}>
                  Join WAVE and Elevate Your Music Experience
                </p>
                <button id="overlayBtnSignUp">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="backgroundSVG" dangerouslySetInnerHTML={{ __html: backgroundSVG }} />
    </div>
  );
};

export default Login;