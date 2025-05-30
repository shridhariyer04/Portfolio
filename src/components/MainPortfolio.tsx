import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/MainPortfolio.css";
import Photo from "../assets/Photo.jpeg";
import { motion } from "framer-motion";
import GitaGPT from "../assets/GitaGPT.png";
import Vetra from "../assets/Vetra .png";
import womenapp from "../assets/womenapp.jpeg";
import { Link } from "react-router-dom";
import {
  SiJavascript,
  SiDocker,
  SiNodedotjs,
  SiPython,
  SiTypescript,
  SiDjango,
  SiReact,
  SiHtml5,
  SiCss3,
  SiSupabase,
  SiNextdotjs,
  SiExpo,
} from "react-icons/si";

interface ExtendedHTMLDivElement extends HTMLDivElement {
  _initialized?: boolean;
}

const TechStack = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const technologies = [
    {
      name: "JavaScript",
      icon: <SiJavascript className="text-white text-5xl" />,
    },
    { name: "Docker", icon: <SiDocker className="text-white text-5xl" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-white text-5xl" /> },
    { name: "Python", icon: <SiPython className="text-white text-5xl" /> },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-white text-5xl" />,
    },
    { name: "Django", icon: <SiDjango className="text-white text-5xl" /> },
  ];

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current && !isHovered) {
        scrollRef.current.scrollLeft += 1;
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameRef.current = requestAnimationFrame(scroll);
    };
    animationFrameRef.current = requestAnimationFrame(scroll);
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isHovered]);

  return (
    <div
      className="w-full bg-black py-4 overflow-hidden tech-stack-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-12 whitespace-nowrap overflow-x-auto scroll-smooth no-scrollbar tech-stack-scroll"
        >
          {[...technologies, ...technologies].map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              className="flex items-center justify-center bg-black rounded-none w-[90px] h-[90px] shadow-md tech-stack-item"
            >
              {tech.icon}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Move GSAP registration outside component
gsap.registerPlugin(ScrollTrigger);

const MainPortfolio = () => {
  const bioSectionRef = useRef<ExtendedHTMLDivElement>(null);
  const workContainerRef = useRef<ExtendedHTMLDivElement>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [inWorkView, setInWorkView] = useState<boolean>(false);
  const headerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "Vetra",
      description:
        "A platform designed to inspire developers and help them quickly turn ideas into reality—like Pinterest, but for devs. Browse, save, and execute ideas effortlessly to enhance your projects. Simplifying innovation, one idea at a time",
      image: Vetra,
      technologies: [
        { name: "React", icon: SiReact },
        { name: "TypeScript", icon: SiTypescript },
        { name: "Nextjs", icon: SiNextdotjs },
        { name: "CSS3", icon: SiCss3 },
        { name: "Supabase", icon: SiSupabase },
      ],
    },
    {
      title: "GitaGPT",
      description:
        "A website that applies the wisdom of the Bhagavad Gita to real-life challenges. It engages in conversations, offering insights and relevant verses to guide you. Find clarity and inspiration through AI-driven spiritual wisdom.",
      image: GitaGPT,
      technologies: [
        { name: "Html", icon: SiHtml5 },
        { name: "Python", icon: SiPython },
        { name: "Javascript", icon: SiJavascript },
        { name: "Css", icon: SiCss3 },
      ],
    },
    {
      title: "Women Safety App",
      description:
        "An app built for women's safety while traveling. It detects threats, shares live location with emergency contacts, and records surrounding audio for added security. Designed to provide quick assistance in critical situations.",
      image: womenapp,
      technologies: [
        { name: "Supabase", icon: SiSupabase },
        { name: "Css", icon: SiCss3 },
        { name: "Typescript", icon: SiTypescript },
        { name: "React", icon: SiReact },
        { name: "Expo", icon: SiExpo },
      ],
    },
  ];

  useEffect(() => {
    const initializeScroll = () => {
      if (
        !workContainerRef.current ||
        !bioSectionRef.current ||
        !mainContainerRef.current
      ) {
        console.log("Missing refs, exiting");
        return;
      }

      // Kill any existing ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Set initial states
      gsap.set(workContainerRef.current, {
        display: "block",
        y: "100%",
        backgroundColor: "#000000",
        opacity: 1,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 10,
        visibility: "visible",
      });

      // Ensure bio section is visible
      gsap.set(bioSectionRef.current, {
        opacity: 1,
        visibility: "visible",
      });

      // Set up ScrollTrigger
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress % 0.1 < 0.01) {
              console.log("ScrollTrigger progress:", self.progress.toFixed(2));
            }
          },
          onLeave: () => {
            console.log("ScrollTrigger onLeave: Entering work view");
            mainTl.eventCallback("onComplete", () => {
              console.log("Timeline complete, setting inWorkView = true");
              setInWorkView(true);
              setActiveSection(0);
            });
          },
        },
      });

      mainTl
        .to(workContainerRef.current, {
          y: "0%",
          duration: 1,
          ease: "power3.inOut",
          onStart: () => console.log("Work container slide up started"),
          onComplete: () => {
            console.log("Work container slide up finished");
            if (sectionRefs.current[0]) {
              gsap.to(sectionRefs.current[0], {
                opacity: 1,
                y: "0%",
                duration: 0.3,
                ease: "power2.out",
              });
            }
          },
        })
        .to(
          bioSectionRef.current,
          {
            opacity: 0.5,
            filter: "blur(1px)",
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.8"
        );

      // Refresh ScrollTrigger after setup
      setTimeout(() => {
        ScrollTrigger.refresh();
        console.log("ScrollTrigger refreshed");
      }, 100);
    };

    // Run initialization
    if (document.readyState === "complete") {
      initializeScroll();
    } else {
      window.addEventListener("load", initializeScroll);
    }

    return () => {
      window.removeEventListener("load", initializeScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    console.log(
      "Second useEffect: Running with inWorkView =",
      inWorkView,
      "activeSection =",
      activeSection
    );
    if (!inWorkView || !workContainerRef.current) {
      console.log(
        "Second useEffect: Exiting due to !inWorkView or missing workContainerRef"
      );
      return;
    }

    console.log("Setting up work section navigation");
    gsap.set(workContainerRef.current, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      y: "0%",
    });
    gsap.set(bioSectionRef.current, { opacity: 0 });

    const isFirstEntry = !workContainerRef.current._initialized;

    if (isFirstEntry) {
      console.log("First time entering work view, initializing sections");
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        if (index !== activeSection) {
          gsap.set(section, { display: "none", opacity: 0 });
        }
      });

      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        if (index === activeSection) {
          gsap.set(section, {
            display: "block",
            opacity: 1,
            height: "100vh",
            position: "absolute",
            top: 0,
            width: "100%",
            y: "0%",
          });
          if (contentRefs.current[index])
            gsap.set(contentRefs.current[index], {
              opacity: 1,
              height: "auto",
              y: 0,
            });
          if (headerRefs.current[index])
            gsap.set(headerRefs.current[index], { opacity: 1, y: 0 });
        } else if (index === activeSection - 1 || index === activeSection + 1) {
          const direction = index > activeSection ? 1 : -1;
          gsap.set(section, {
            display: "block",
            opacity: 0,
            height: "100vh",
            position: "absolute",
            top: 0,
            width: "100%",
            y: `${direction * 100}%`,
          });
          if (contentRefs.current[index])
            gsap.set(contentRefs.current[index], { opacity: 0, height: 0 });
          if (headerRefs.current[index])
            gsap.set(headerRefs.current[index], {
              opacity: 0.7,
              y: direction > 0 ? 60 : -60,
            });
        }
      });

      workContainerRef.current._initialized = true;
      console.log("Work container initialized for the first time");
    } else {
      if (sectionRefs.current[activeSection]) {
        gsap.set(sectionRefs.current[activeSection], {
          display: "block",
          opacity: 1,
          y: "0%",
        });
      }
    }

    let isTransitioning = false;
    let lastScrollTime = 0;
    const TRANSITION_COOLDOWN = 700;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (isTransitioning || now - lastScrollTime < TRANSITION_COOLDOWN) return;
      if (Math.abs(e.deltaY) < 15) return;
      lastScrollTime = now;
      isTransitioning = true;
      requestAnimationFrame(() => {
        if (e.deltaY > 0 && activeSection < sectionRefs.current.length - 1) {
          transitionToSection(activeSection + 1);
        } else if (e.deltaY < 0 && activeSection > 0) {
          transitionToSection(activeSection - 1);
        } else if (e.deltaY < 0 && activeSection === 0) {
          transitionToBioSection();
        }
        isTransitioning = false;
      });
    };

    let touchStartY = 0;
    let touchStartX = 0;
    let touchThreshold = 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY || isTransitioning) return;
      const touchEndY = e.touches[0].clientY;
      const touchEndX = e.touches[0].clientX;
      const diffY = touchStartY - touchEndY;
      const diffX = Math.abs(touchStartX - touchEndX);
      if (Math.abs(diffY) > touchThreshold && Math.abs(diffY) > diffX * 1.5) {
        e.preventDefault();
        isTransitioning = true;
        touchStartY = 0;
        touchStartX = 0;
        requestAnimationFrame(() => {
          if (diffY > 0 && activeSection < sectionRefs.current.length - 1) {
            console.log("Touch: Scrolling down to section", activeSection + 1);
            transitionToSection(activeSection + 1);
          } else if (diffY < 0 && activeSection > 0) {
            console.log("Touch: Scrolling up to section", activeSection - 1);
            transitionToSection(activeSection - 1);
          } else if (diffY < 0 && activeSection === 0) {
            console.log("Touch: Transitioning back to bio section");
            transitionToBioSection();
          }
        });
        setTimeout(() => {
          isTransitioning = false;
        }, TRANSITION_COOLDOWN);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      isTransitioning = true;
      requestAnimationFrame(() => {
        if (
          (e.key === "ArrowDown" || e.key === "PageDown") &&
          activeSection < sectionRefs.current.length - 1
        ) {
          console.log("Key: Scrolling down to section", activeSection + 1);
          transitionToSection(activeSection + 1);
        } else if (
          (e.key === "ArrowUp" || e.key === "PageUp") &&
          activeSection > 0
        ) {
          console.log("Key: Scrolling up to section", activeSection - 1);
          transitionToSection(activeSection - 1);
        } else if (
          (e.key === "ArrowUp" || e.key === "PageUp") &&
          activeSection === 0
        ) {
          console.log("Key: Transitioning back to bio section");
          transitionToBioSection();
        } else {
          isTransitioning = false;
          return;
        }
      });
      setTimeout(() => {
        isTransitioning = false;
      }, TRANSITION_COOLDOWN);
    };

    document.addEventListener("keydown", handleKeyDown);
    if (workContainerRef.current) {
      workContainerRef.current.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      workContainerRef.current.addEventListener(
        "touchstart",
        handleTouchStart,
        { passive: true }
      );
      workContainerRef.current.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }

    return () => {
      console.log("Second useEffect cleanup: Removing listeners");
      document.removeEventListener("keydown", handleKeyDown);
      if (workContainerRef.current) {
        workContainerRef.current.removeEventListener("wheel", handleWheel);
        workContainerRef.current.removeEventListener(
          "touchstart",
          handleTouchStart
        );
        workContainerRef.current.removeEventListener(
          "touchmove",
          handleTouchMove
        );
      }
      if (!inWorkView) {
        gsap.set(workContainerRef.current, { position: "absolute", y: "100%" });
        gsap.set(bioSectionRef.current, { opacity: 1 });
      }
    };
  }, [inWorkView, activeSection]);

  const transitionToSection = (index: number) => {
    console.log(
      `Transitioning from section ${activeSection} to section ${index}`
    );
    const currentSection = sectionRefs.current[activeSection];
    const targetSection = sectionRefs.current[index];
    const currentHeader = headerRefs.current[activeSection];
    const currentContent = contentRefs.current[activeSection];
    const targetHeader = headerRefs.current[index];
    const targetContent = contentRefs.current[index];

    if (
      !currentSection ||
      !targetSection ||
      !currentHeader ||
      !currentContent ||
      !targetHeader ||
      !targetContent
    ) {
      console.error("Missing refs for transition:", {
        currentSection: !!currentSection,
        targetSection: !!targetSection,
        currentHeader: !!currentHeader,
        currentContent: !!currentContent,
        targetHeader: !!targetHeader,
        targetContent: !!targetContent,
      });
      return;
    }

    const isMovingDown = index > activeSection;
    console.log("Direction:", isMovingDown ? "down" : "up");

    // Prevent any ongoing animations
    gsap.killTweensOf([
      currentSection,
      targetSection,
      currentHeader,
      currentContent,
      targetHeader,
      targetContent,
    ]);

    // Make sure target section is visible and positioned correctly
    gsap.set(targetSection, {
      display: "block",
      y: isMovingDown ? "100%" : "-100%",
      opacity: 1,
      height: "100vh",
    });

    // Ensure content is already at full height to prevent reflow
    gsap.set(targetContent, {
      height: "auto",
      opacity: 0,
    });

    const tl = gsap.timeline({
      onStart: () => {
        console.log("Starting transition animation");
        document.body.style.overflow = "hidden";
      },
      onComplete: () => {
        console.log("Transition complete, setting activeSection =", index);
        setActiveSection(index);
        sectionRefs.current.forEach((section, i) => {
          if (i !== index && i !== index - 1 && i !== index + 1) {
            gsap.set(section, { display: "none" });
          }
        });
        document.body.style.overflow = "";
      },
    });

    tl.to(currentContent, {
      opacity: 0,
      height: 0,
      duration: 0.35,
      ease: "power2.inOut",
    });
    tl.to(
      currentHeader,
      {
        y: isMovingDown ? -60 : 60,
        opacity: 0.7,
        duration: 0.35,
        ease: "power2.inOut",
      },
      "-=0.2"
    );
    tl.to(
      currentSection,
      {
        y: isMovingDown ? "-100%" : "100%",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.1"
    );
    tl.to(
      targetSection,
      { y: "0%", duration: 0.5, ease: "power2.inOut" },
      "-=0.5"
    );
    tl.to(
      targetHeader,
      { y: 0, opacity: 1, duration: 0.35, ease: "power2.inOut" },
      "-=0.2"
    );
    tl.to(
      targetContent,
      { opacity: 1, duration: 0.35, ease: "power2.inOut" },
      "-=0.2"
    );
    tl.fromTo(
      targetSection,
      { scale: 0.98 },
      { scale: 1, duration: 0.3, ease: "power2.out" },
      "-=0.3"
    );
  };

  const transitionToBioSection = () => {
    console.log("transitionToBioSection: Starting transition back to bio");
    if (!workContainerRef.current || !bioSectionRef.current) {
      console.log("transitionToBioSection: Missing refs, aborting");
      return;
    }

    const tl = gsap.timeline({
      onStart: () => {
        console.log("transitionToBioSection: Animation started");
      },
      onComplete: () => {
        console.log(
          "transitionToBioSection: Completed, setting inWorkView = false, activeSection = 0"
        );
        setInWorkView(false);
        setActiveSection(0);
        document.body.style.overflow = "auto";
        if (bioSectionRef.current) {
          bioSectionRef.current.scrollIntoView({ behavior: "auto" });
        }
        sectionRefs.current.forEach((section, index) => {
          if (section) {
            if (index === 0) {
              gsap.set(section, { display: "block", opacity: 1, y: "0%" });
            } else {
              gsap.set(section, { display: "none", opacity: 0, y: "100%" });
            }
          }
        });
      },
    });

    tl.to(workContainerRef.current, {
      y: "100%",
      duration: 0.6,
      ease: "power2.inOut",
    }).to(
      bioSectionRef.current,
      { opacity: 1, filter: "blur(0px)", duration: 0.4 },
      "-=0.3"
    );
  };

  useEffect(() => {
    const workNavLink = document.querySelector('nav a[href="#work"]');
    if (workNavLink) {
      workNavLink.addEventListener("click", (e) => {
        e.preventDefault();
        setInWorkView(true);
        gsap.to(workContainerRef.current, {
          y: "0%",
          duration: 0.5,
          ease: "power1.inOut",
        });
        gsap.to(bioSectionRef.current, {
          opacity: 0.85,
          filter: "blur(0.5px)",
          duration: 0.4,
        });
      });
    }

    return () => {
      if (workNavLink) {
        workNavLink.removeEventListener("click", () => {});
      }
    };
  }, []);

  return (
    <div className="main-container" ref={mainContainerRef}>
      <div ref={bioSectionRef} className="portfolio-container">
        <header>
          <nav>
            <a href="#bio">BIO</a>
            <a href="#work">WORK</a>
            <Link to="/contact">CONTACT</Link>
          </nav>
        </header>
        <div className="content-wrapper">
          <h1 className="heading" id="greetingText">
            Hey!<span className="smiley">:)</span>
          </h1>
          <div className="center-image">
            <img src={Photo} alt="Profile Photo" className="profile-image" />
          </div>
          <p className="left-text">
            Engineered by <strong>Shridhar</strong>, a full-stack and mobile
            developer driven to build scalable solutions that tackle real-world
            challenges
          </p>
          <div className="right-text">
            <div className="righttext-social-links">
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
            <a href="/resume.pdf" download className="resume-button">
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* Work Container */}
      <div ref={workContainerRef} className="work-container">
  <div className="work-content">
    <div className="work-section-wrapper">
      {/* Web Development Section */}
      <div
        ref={(el) => {
          if (el) sectionRefs.current[0] = el;
        }}
        className={`work-section ${activeSection === 0 ? "active" : "inactive"}`}
        id="webDev"
      >
        <div className="star">✦</div>
        <div
          className="section-header"
          ref={(el) => {
            if (el) headerRefs.current[0] = el;
          }}
          onClick={() => activeSection !== 0 && transitionToSection(0)}
        >
          <div className="section-number">(01)</div>
          <h1 className="section-title" data-text="Web Development">
            Web Development
          </h1>
        </div>
        <div
          className="section-content-wrapper"
          ref={(el) => {
            if (el) contentRefs.current[0] = el;
          }}
        >
          <div className="section-content">
            <p className="text-lg leading-relaxed mb-6">
              I'm a passionate backend engineer. Currently expanding my expertise in frontend development to build seamless full-stack applications. I have experience working with cutting-edge technologies, including Next.js, FastAPI, and cloud infrastructure.
            </p>
            <div className="subsections grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all">
                <div className="subsection-number mr-4 text-2xl">01</div>
                <div>
                  <div className="subsection-title font-semibold">Frontend Excellence</div>
                  <p className="text-sm text-gray-400">React, TypeScript, and modern UI/UX</p>
                </div>
              </div>
              <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all">
                <div className="subsection-number mr-4 text-2xl">02</div>
                <div>
                  <div className="subsection-title font-semibold">Backend Systems</div>
                  <p className="text-sm text-gray-400">Node.js, Django, and APIs</p>
                </div>
              </div>
              <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all">
                <div className="subsection-number mr-4 text-2xl">03</div>
                <div>
                  <div className="subsection-title font-semibold">Performance</div>
                  <p className="text-sm text-gray-400">Optimization and scalability</p>
                </div>
              </div>
              <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all">
                <div className="subsection-number mr-4 text-2xl">04</div>
                <div>
                  <div className="subsection-title font-semibold">Animations</div>
                  <p className="text-sm text-gray-400">GSAP and interactive motion</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="scroll-indicator flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            onClick={() => transitionToSection(1)}
          >
            <span>Next: Advanced Solutions</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Mobile Development Section */}
      <div
        ref={(el) => {
          if (el) sectionRefs.current[1] = el;
        }}
        className={`work-section ${activeSection === 1 ? "active" : "inactive"}`}
        id="advanced"
      >
        <div className="blob">⬣</div>
        <div
          className="section-header"
          ref={(el) => {
            if (el) headerRefs.current[1] = el;
          }}
          onClick={() => activeSection !== 1 && transitionToSection(1)}
        >
          <div className="section-number">(02)</div>
          <h1 className="section-title" data-text="Mobile Development">
            Mobile Development
          </h1>
        </div>
        <div
          className="section-content-wrapper"
          ref={(el) => {
            if (el) contentRefs.current[1] = el;
          }}
        >
          <div className="section-content">
            <p className="text-lg leading-relaxed mb-6">
              Currently exploring mobile development with React Native. Built a women's safety app and learning to create smooth, high-performance mobile experiences. Focused on writing clean code and improving app efficiency.
            </p>
            <div className="subsections grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all">
                <div className="subsection-number mr-4 text-2xl">01</div>
                <div>
                  <div className="subsection-title font-semibold">Progressive Web Apps</div>
                  <p className="text-sm text-gray-400">Offline-capable, app-like experiences</p>
                </div>
              </div>
              <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all">
                <div className="subsection-number mr-4 text-2xl">02</div>
                <div>
                  <div className="subsection-title font-semibold">System Integrations</div>
                  <p className="text-sm text-gray-400">APIs, microservices, and third-party systems</p>
                </div>
              </div>
              <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all">
                <div className="subsection-number mr-4 text-2xl">03</div>
                <div>
                  <div className="subsection-title font-semibold">Cloud Solutions</div>
                  <p className="text-sm text-gray-400">AWS, Docker, and scalable infrastructure</p>
                </div>
              </div>
              <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all">
                <div className="subsection-number mr-4 text-2xl">04</div>
                <div>
                  <div className="subsection-title font-semibold">Real-time Features</div>
                  <p className="text-sm text-gray-400">WebSockets and live data updates</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="scroll-indicator flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            onClick={() => transitionToSection(2)}
          >
            <span>Next: Tech Stack</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div
        ref={(el) => {
          if (el) sectionRefs.current[2] = el;
        }}
        className={`work-section ${activeSection === 2 ? "active" : "inactive"}`}
        id="techStack"
      >
        <div className="star">⚡</div>
        <div
          className="section-header"
          ref={(el) => {
            if (el) headerRefs.current[2] = el;
          }}
          onClick={() => activeSection !== 2 && transitionToSection(2)}
        >
          <div className="section-number">(03)</div>
          <h1 className="section-title" data-text="Tech Stack">
            Tech Stack
          </h1>
        </div>
        <div
          className="section-content-wrapper"
          ref={(el) => {
            if (el) contentRefs.current[2] = el;
          }}
        >
          <div className="section-content">
            <p className="text-lg leading-relaxed mb-6">
              I use a diverse range of modern technologies to create robust, scalable, and performant applications. Here's a look at the tools and frameworks I'm proficient with:
            </p>
            <TechStack />
          </div>
          <div
            className="scroll-indicator flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            onClick={() => transitionToSection(3)}
          >
            <span>Next: Projects</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Project Sections */}
      {projects.map((project, index) => {
        const projectIndex = 3 + index;
        return (
          <div
            key={projectIndex}
            ref={(el) => {
              if (el) sectionRefs.current[projectIndex] = el;
            }}
            className={`work-section ${activeSection === projectIndex ? "active" : "inactive"}`}
            id={`project-${index}`}
          >
            <div className="star">★</div>
            <div
              className="section-header"
              ref={(el) => {
                if (el) headerRefs.current[projectIndex] = el;
              }}
              onClick={() => activeSection !== projectIndex && transitionToSection(projectIndex)}
            >
              <div className="section-number">({String(projectIndex - 2).padStart(2, "0")})</div>
              <h1 className="section-title" data-text={project.title}>
                {project.title}
              </h1>
            </div>
            <div
              className="section-content-wrapper"
              ref={(el) => {
                if (el) contentRefs.current[projectIndex] = el;
              }}
            >
              <div className="section-content">
                <div className="project-layout">
                  <div
                    style={{
                      width: "80%",
                      height: "40vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "0 auto",
                      marginBottom: "2rem",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        maxHeight: "100%",
                      }}
                    />
                  </div>
                  <div className="project-details">
                    <p>{project.description}</p>
                    <div className="tech-container">
                      <h3>Technologies Used</h3>
                      <div className="tech-icons">
                        {project.technologies.map((tech, techIndex) => (
                          <tech.icon
                            key={techIndex}
                            className="tech-icon"
                            title={tech.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="scroll-indicator flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                onClick={() => projectIndex < 5 ? transitionToSection(projectIndex + 1) : transitionToSection(0)}
              >
                <span>{projectIndex < 5 ? "Next Project" : "Back to Start"}</span>
                <span>→</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>
</div>
  );
};

export default MainPortfolio;
