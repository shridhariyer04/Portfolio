import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/MainPortfolio.css";
import Photo from '../assets/Photo.jpeg';
import { motion } from "framer-motion";
import GitaGPT from "../assets/GitaGPt.png"
import Vetra from '../assets/Vetra .png'// Adjust the path as needed
import womenapp from '../assets/womenapp.jpeg'
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
  SiExpo
} from "react-icons/si";

interface Greeting {
  text: string;
  lang: string;
}

// Add this interface at the top of the file, before the MainPortfolio component
interface ExtendedHTMLDivElement extends HTMLDivElement {
  _initialized?: boolean;
}

const TechStack = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const technologies = [
    { name: "JavaScript", icon: <SiJavascript className="text-white text-5xl" /> },
    { name: "Docker", icon: <SiDocker className="text-white text-5xl" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-white text-5xl" /> },
    { name: "Python", icon: <SiPython className="text-white text-5xl" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-white text-5xl" /> },
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
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
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

const MainPortfolio = () => {
  const navigate = useNavigate();
  const bioSectionRef = useRef<HTMLDivElement>(null);
  const workContainerRef = useRef<ExtendedHTMLDivElement>(null);
  const endSectionRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [inWorkView, setInWorkView] = useState<boolean>(false);
  const [showEndSection, setShowEndSection] = useState<boolean>(false);
  const headerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outroRef = useRef<HTMLDivElement>(null);
  const whiteScreenRef = useRef<HTMLDivElement>(null);
  const [showOutro, setShowOutro] = useState<boolean>(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
 // Calculate local and Shridhar's time
 const [localTime, setLocalTime] = useState('');
 const [shridharTime, setShridharTime] = useState('');
 const formRef = useRef(null);

  const projects = [
    {
      title: "Vetra",
      description:"A platform designed to inspire developers and help them quickly turn ideas into reality—like Pinterest, but for devs. Browse, save, and execute ideas effortlessly to enhance your projects. Simplifying innovation, one idea at a time",
      image: Vetra,
      technologies: [
        { name: "React", icon: SiReact },
        { name: "TypeScript", icon: SiTypescript },
        { name: "Nextjs", icon: SiNextdotjs },
        { name: "CSS3", icon: SiCss3 },
        { name: "Supabase", icon: SiSupabase }
      ]
    },
    {
      title: "GitaGPT",
      description: "A website that applies the wisdom of the Bhagavad Gita to real-life challenges. It engages in conversations, offering insights and relevant verses to guide you. Find clarity and inspiration through AI-driven spiritual wisdom.",
      image: GitaGPT,
      technologies: [
        { name: "Html", icon: SiHtml5 },
        { name: "Python", icon: SiPython },
        { name: "Javascript", icon: SiJavascript },
        { name: "Css", icon: SiCss3 },
      ]
    },
    {
      title: "Women Safety App",
      description: "An app built for women's safety while traveling. It detects threats, shares live location with emergency contacts, and records surrounding audio for added security. Designed to provide quick assistance in critical situations..",
      image:womenapp ,
      technologies: [
        { name: "Supabase", icon: SiSupabase },
        { name: "Css", icon: SiCss3},
        { name: "Typescript", icon: SiTypescript },
        { name: "React", icon: SiReact },
        { name:"Expo", icon:SiExpo}
      ]
    },
  ];

  const greetings: Greeting[] = [
    { text: "Hey!", lang: "English" },
    { text: "नमस्ते!", lang: "Hindi" },
    { text: "வணக்கம்!", lang: "Tamil" },
    { text: "Salut!", lang: "French" },
    { text: "नमस्कार!", lang: "Sanskrit" },
    { text: "Hola!", lang: "Spanish" },
    { text: "こんにちは!", lang: "Japanese" },
  ];

  useEffect(() => {
    console.log("First useEffect: Initializing ScrollTrigger");
    if (inWorkView) {
      console.log("Already in work view, skipping first useEffect");
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
  
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
    if (!workContainerRef.current || !bioSectionRef.current || !mainContainerRef.current) {
      console.log("First useEffect: Missing refs, exiting");
      return;
    }
  
    // Initial states
    gsap.set(workContainerRef.current, { y: "100%", backgroundColor: "#000000", opacity: 1 });
    gsap.set(bioSectionRef.current, { opacity: 1 });
    if (endSectionRef.current) gsap.set(endSectionRef.current, { y: "100%", opacity: 0 });
    if (footerRef.current) gsap.set(footerRef.current, { y: "100vh", opacity: 0 });
  
    // Pre-initialize the first section to prevent reloading
    if (sectionRefs.current[0]) {
      // Make sure the web development section is ready but hidden
      gsap.set(sectionRefs.current[0], {
        display: "block",
        opacity: 0,
        y: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        width: "100%"
      });
      
      // Pre-initialize content to prevent reloading
      if (contentRefs.current[0]) {
        gsap.set(contentRefs.current[0], { 
          opacity: 1, 
          height: "auto",
          y: 0
        });
      }
      
      if (headerRefs.current[0]) {
        gsap.set(headerRefs.current[0], { 
          opacity: 1, 
          y: 0
        });
      }
    }
  
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
        onLeave: (self) => {
          console.log("ScrollTrigger onLeave: Entering work view");
          mainTl.eventCallback("onComplete", () => {
            console.log("Timeline complete, setting inWorkView = true");
            
            // Prepare the first section before setting inWorkView
            if (sectionRefs.current[0]) {
              gsap.set(sectionRefs.current[0], {
                opacity: 1,
                y: "0%"
              });
            }
            
            setInWorkView(true); // Flip state only after animation
            setActiveSection(0);
            self.disable();
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
          // Ensure the first section is visible when the container reaches the top
          if (sectionRefs.current[0]) {
            gsap.to(sectionRefs.current[0], {
              opacity: 1,
              y: "0%",
              duration: 0.3,
              ease: "power2.out"
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
  
    let scrollTimeout: number;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const triggerPoint = mainContainerRef.current?.offsetHeight || 0;
        if (scrollTop > triggerPoint * 0.8 && !inWorkView) {
          console.log("Fallback scroll: Setting inWorkView = true");
          setInWorkView(true);
          setActiveSection(0);
        }
      }, 50);
    };
  
    window.addEventListener("scroll", handleScroll, { passive: true });
  
    return () => {
      console.log("First useEffect cleanup");
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      mainTl.kill();
    };
  }, [inWorkView]);
  
  useEffect(() => {
    console.log("Second useEffect: Running with inWorkView =", inWorkView, "activeSection =", activeSection);
    if (!inWorkView || !workContainerRef.current) {
      console.log("Second useEffect: Exiting due to !inWorkView or missing workContainerRef");
      return;
    }
  
    console.log("Setting up work section navigation");
    gsap.set(workContainerRef.current, { 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%", 
      height: "100vh", 
      y: "0%" 
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
          if (contentRefs.current[index]) gsap.set(contentRefs.current[index], { opacity: 1, height: "auto", y: 0 });
          if (headerRefs.current[index]) gsap.set(headerRefs.current[index], { opacity: 1, y: 0 });
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
          if (contentRefs.current[index]) gsap.set(contentRefs.current[index], { opacity: 0, height: 0 });
          if (headerRefs.current[index]) gsap.set(headerRefs.current[index], { opacity: 0.7, y: direction > 0 ? 60 : -60 });
        }
      });
  
      workContainerRef.current._initialized = true;
      console.log("Work container initialized for the first time");
    } else {
      if (sectionRefs.current[activeSection]) {
        gsap.set(sectionRefs.current[activeSection], {
          display: "block",
          opacity: 1,
          y: "0%"
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
      console.log("Wheel: Processing - deltaY =", e.deltaY.toFixed(2), "activeSection =", activeSection);
  
      requestAnimationFrame(() => {
        if (e.deltaY > 0 && activeSection < sectionRefs.current.length - 1) {
          console.log("Wheel: Scrolling down to section", activeSection + 1);
          transitionToSection(activeSection + 1);
        } else if (e.deltaY < 0 && activeSection > 0) {
          console.log("Wheel: Scrolling up to section", activeSection - 1);
          transitionToSection(activeSection - 1);
        } else if (e.deltaY > 0 && activeSection === sectionRefs.current.length - 1) {
          console.log("Wheel: Transitioning to end section");
          transitionToEndSection();
        } else if (e.deltaY < 0 && activeSection === 0) {
          console.log("Wheel: Transitioning back to bio section");
          transitionToBioSection();
        } else if (e.deltaY < 0 && activeSection === 6) { // Assuming footer is index 6
          console.log("Wheel: Scrolling up from footer to third project");
          transitionToSection(5); // Go back to Women Safety App
        }
      });
  
      setTimeout(() => { isTransitioning = false; }, TRANSITION_COOLDOWN);
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
          } else if (diffY > 0 && activeSection === sectionRefs.current.length - 1) {
            console.log("Touch: Transitioning to end section");
            transitionToEndSection();
          } else if (diffY < 0 && activeSection === 0) {
            console.log("Touch: Transitioning back to bio section");
            transitionToBioSection();
          } else if (diffY < 0 && activeSection === 6) { // Assuming footer is index 6
            console.log("Touch: Scrolling up from footer to third project");
            transitionToSection(5); // Go back to Women Safety App
          }
        });
  
        setTimeout(() => { isTransitioning = false; }, TRANSITION_COOLDOWN);
      }
    };
  
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
  
      isTransitioning = true;
      
      requestAnimationFrame(() => {
        if ((e.key === 'ArrowDown' || e.key === 'PageDown') && activeSection < sectionRefs.current.length - 1) {
          console.log("Key: Scrolling down to section", activeSection + 1);
          transitionToSection(activeSection + 1);
        } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && activeSection > 0) {
          console.log("Key: Scrolling up to section", activeSection - 1);
          transitionToSection(activeSection - 1);
        } else if ((e.key === 'ArrowDown' || e.key === 'PageDown') && activeSection === sectionRefs.current.length - 1) {
          console.log("Key: Transitioning to end section");
          transitionToEndSection();
        } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && activeSection === 0) {
          console.log("Key: Transitioning back to bio section");
          transitionToBioSection();
        } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && activeSection === 6) { // Assuming footer is index 6
          console.log("Key: Scrolling up from footer to third project");
          transitionToSection(5); // Go back to Women Safety App
        } else {
          isTransitioning = false;
          return;
        }
      });
  
      setTimeout(() => { isTransitioning = false; }, TRANSITION_COOLDOWN);
    };
  
    document.addEventListener('keydown', handleKeyDown);
    if (workContainerRef.current) {
      workContainerRef.current.addEventListener("wheel", handleWheel, { passive: false });
      workContainerRef.current.addEventListener("touchstart", handleTouchStart, { passive: true });
      workContainerRef.current.addEventListener("touchmove", handleTouchMove, { passive: false });
    }
  
    return () => {
      console.log("Second useEffect cleanup: Removing listeners");
      document.removeEventListener('keydown', handleKeyDown);
      if (workContainerRef.current) {
        workContainerRef.current.removeEventListener("wheel", handleWheel);
        workContainerRef.current.removeEventListener("touchstart", handleTouchStart);
        workContainerRef.current.removeEventListener("touchmove", handleTouchMove);
      }
  
      if (!inWorkView) {
        gsap.set(workContainerRef.current, { position: "absolute", y: "100%" });
        gsap.set(bioSectionRef.current, { opacity: 1 });
      }
    };
  }, [inWorkView, activeSection]);
  
  
  const transitionToSection = (index: number) => {
    console.log(`Transitioning from section ${activeSection} to section ${index}`);
    const currentSection = sectionRefs.current[activeSection];
    const targetSection = sectionRefs.current[index];
    const currentHeader = headerRefs.current[activeSection];
    const currentContent = contentRefs.current[activeSection];
    const targetHeader = headerRefs.current[index];
    const targetContent = contentRefs.current[index];

    if (!currentSection || !targetSection || !currentHeader || !currentContent || !targetHeader || !targetContent) {
      console.error("Missing refs for transition:", {
        currentSection: !!currentSection,
        targetSection: !!targetSection,
        currentHeader: !!currentHeader,
        currentContent: !!currentContent,
        targetHeader: !!targetHeader,
        targetContent: !!targetContent
      });
      return;
    }

    const isMovingDown = index > activeSection;
    console.log("Direction:", isMovingDown ? "down" : "up");

    // Prevent any ongoing animations
    gsap.killTweensOf([currentSection, targetSection, currentHeader, currentContent, targetHeader, targetContent]);

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
      opacity: 0
    });

    const tl = gsap.timeline({
      onStart: () => {
        console.log("Starting transition animation");
        // Disable wheel events during transition
        document.body.style.overflow = "hidden";
      },
      onComplete: () => {
        console.log("Transition complete, setting activeSection =", index);
        setActiveSection(index);
        // Hide sections that are not adjacent to the current one
        sectionRefs.current.forEach((section, i) => {
          if (i !== index && i !== index - 1 && i !== index + 1) {
            gsap.set(section, { display: "none" });
          }
        });
        // Re-enable wheel events
        document.body.style.overflow = "";
      },
    });

    // Animate out current section
    tl.to(currentContent, { opacity: 0, height: 0, duration: 0.35, ease: "power2.inOut" });
    tl.to(currentHeader, { y: isMovingDown ? -60 : 60, opacity: 0.7, duration: 0.35, ease: "power2.inOut" }, "-=0.2");
    tl.to(currentSection, { y: isMovingDown ? "-100%" : "100%", duration: 0.5, ease: "power2.inOut" }, "-=0.1");
    
    // Animate in target section
    tl.to(targetSection, { y: "0%", duration: 0.5, ease: "power2.inOut" }, "-=0.5");
    tl.to(targetHeader, { y: 0, opacity: 1, duration: 0.35, ease: "power2.inOut" }, "-=0.2");
    tl.to(targetContent, { opacity: 1, duration: 0.35, ease: "power2.inOut" }, "-=0.2");
    tl.fromTo(targetSection, { scale: 0.98 }, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.3");
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
        console.log("transitionToBioSection: Completed, setting inWorkView = false, activeSection = 0");
        setInWorkView(false);
        setActiveSection(0);
        document.body.style.overflow = 'auto';
        if (bioSectionRef.current) {
          bioSectionRef.current.scrollIntoView({ behavior: 'auto' });
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
  
    tl.to(workContainerRef.current, { y: "100%", duration: 0.6, ease: "power2.inOut" })
      .to(bioSectionRef.current, { opacity: 1, filter: "blur(0px)", duration: 0.4 }, "-=0.3");
  };
  
  const transitionToEndSection = () => {
    console.log("Starting transition to footer section");
    
    if (!workContainerRef.current || !footerRef.current || !bioSectionRef.current) {
      console.log('Missing refs:', { 
        workContainerRef: !!workContainerRef.current, 
        footerRef: !!footerRef.current,
        bioSectionRef: !!bioSectionRef.current
      });
      return;
    }
  
    // Lock scrolling and prevent further downward navigation
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  
    const tl = gsap.timeline({
      onStart: () => {
        console.log('Footer transition started');
        if (footerRef.current) {
          footerRef.current.classList.add('active');
          gsap.set(footerRef.current, { 
            display: 'block',
            opacity: 0,
            y: '50vh'
          });
        }
      },
      onComplete: () => {
        console.log("Footer transition complete");
        setInWorkView(false);
        setActiveSection(5); // Set to third project index as default for upward navigation
        // Keep body locked to prevent scrolling past footer
        document.body.style.overflow = 'hidden';
        document.body.style.position = '';
        document.body.style.width = '';
  
        // Scroll to footer after a slight delay
        setTimeout(() => {
          if (footerRef.current) {
            footerRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      },
    });
  
    tl.to(workContainerRef.current, { 
      y: "-100%", 
      opacity: 0, 
      duration: 0.7, 
      ease: "power2.inOut" 
    })
    .to(bioSectionRef.current, { 
      opacity: 0, 
      duration: 0.4 
    }, "-=0.5")
    .to(footerRef.current, {
      opacity: 1,
      y: "0",
      duration: 0.7,
      ease: "power2.inOut"
    }, "-=0.3");
  };
  
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    
    // Show the footer (it's initially hidden with display: none)
    footer.style.display = 'block';
    
    const animateOnScroll = () => {
      // Get footer position relative to viewport
      const footerRect = footer.getBoundingClientRect();
      const isInView = footerRect.top < window.innerHeight;
      console.log("Footer in view:", isInView); // Debug log
      
      if (isInView) {
        // Add animation classes
        const footerHeading = footer.querySelector('.footer-heading');
        const footerLinks = footer.querySelector('.footer-links');
        const footerContact = footer.querySelector('.footer-contact');
        const footerDivider = footer.querySelector('.footer-divider');
        const footerBottom = footer.querySelector('.footer-bottom');
        
        if (footerHeading) footerHeading.classList.add('animated');
        if (footerLinks) footerLinks.classList.add('animated');
        if (footerContact) footerContact.classList.add('animated');
        if (footerDivider) footerDivider.classList.add('animated');
        if (footerBottom) footerBottom.classList.add('animated');
        
        // Remove scroll listener once animation is triggered
        window.removeEventListener('scroll', animateOnScroll);
      }
    };
    
    // Add scroll listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Check if footer is already in view when page loads
    animateOnScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, [footerRef]);
  
  const navigateToFooter = () => {
    console.log("Navigating directly to footer");
    
    if (!footerRef.current) {
      console.log("Footer ref missing, cannot navigate");
      return;
    }
    
    // Make sure the footer is visible
    if (footerRef.current) {
      footerRef.current.classList.add('active');
      footerRef.current.style.display = 'block';
      footerRef.current.style.opacity = '1';
      footerRef.current.style.transform = 'translateY(0)';
      
      // Scroll to the footer
      setTimeout(() => {
        footerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    
    // Reset work view state if needed
    if (inWorkView) {
      setInWorkView(false);
      setActiveSection(0);
    }
  };
  
  // Add nav click handlers to open work section
  useEffect(() => {
    const workNavLink = document.querySelector('nav a[href="#work"]');
    if (workNavLink) {
      workNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        setInWorkView(true);
        gsap.to(workContainerRef.current, { y: "0%", duration: 0.5, ease: "power1.inOut" });
        gsap.to(bioSectionRef.current, { opacity: 0.85, filter: "blur(0.5px)", duration: 0.4 });
      });
    }
    
    // Add handlers for back/forward navigation buttons if you have them
    const backButton = document.querySelector('.back-button'); // Adjust selector as needed
    const forwardButton = document.querySelector('.forward-button'); // Adjust selector as needed
    
    if (backButton) {
      backButton.addEventListener('click', () => {
        if (activeSection > 0) {
          transitionToSection(activeSection - 1);
        } else if (activeSection === 0 && inWorkView) {
          transitionToBioSection();
        }
      });
    }
    
    if (forwardButton) {
      forwardButton.addEventListener('click', () => {
        if (activeSection < sectionRefs.current.length - 1) {
          transitionToSection(activeSection + 1);
        } else if (activeSection === sectionRefs.current.length - 1) {
          transitionToEndSection();
        }
      });
    }
    
    return () => {
      if (workNavLink) {
        workNavLink.removeEventListener('click', () => {});
      }
      if (backButton) {
        backButton.removeEventListener('click', () => {});
      }
      if (forwardButton) {
        forwardButton.removeEventListener('click', () => {});
      }
    };
  }, [activeSection, inWorkView]);
  
  // Add this useEffect to handle navigation links
  useEffect(() => {
    // Handle work nav link
    const workNavLink = document.querySelector('nav a[href="#work"]');
    if (workNavLink) {
      workNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        setInWorkView(true);
        gsap.to(workContainerRef.current, { y: "0%", duration: 0.5, ease: "power1.inOut" });
        gsap.to(bioSectionRef.current, { opacity: 0.85, filter: "blur(0.5px)", duration: 0.4 });
      });
    }
    
    // Handle contact nav link
    const contactNavLink = document.querySelector('a.contact[href="#contact"]');
    if (contactNavLink) {
      contactNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToFooter();
      });
    }
    
    return () => {
      if (workNavLink) {
        workNavLink.removeEventListener('click', () => {});
      }
      if (contactNavLink) {
        contactNavLink.removeEventListener('click', () => {});
      }
    };
  }, []);
  
  useEffect(() => {
    // Update times every second
    const updateTimes = () => {
      const now = new Date();
      
      // Local time
      setLocalTime(now.toLocaleTimeString());
      
      // Assuming Shridhar is in IST (UTC+5:30)
      const shridharDate = new Date(now.getTime() + (5.5 * 60 * 60 * 1000 - now.getTimezoneOffset() * 60 * 1000));
      setShridharTime(shridharDate.toLocaleTimeString());
    };
    
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    
    // Intersection Observer for animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('footer-entered');
          
          // Make the form visible immediately instead of using setTimeout
          const form = document.querySelector('.contact-card');
          const links = document.querySelector('.footer-links');
          const bottom = document.querySelector('.footer-bottom');
          
          if (form) {
            form.classList.add('form-visible');
            console.log('Added form-visible class to contact card'); // Debug line
          }
          if (links) links.classList.add('animated');
          if (bottom) bottom.classList.add('animated');
        }
      },
      { threshold: 0.1 }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      clearInterval(interval);
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset submit message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500); 
  };
  
  
  
  // Define endSectionRef if it doesn't exist in your original code


  return (
    <div className="main-container" ref={mainContainerRef}>
      <div ref={bioSectionRef} className="portfolio-container">
        <header>
          <nav>
            <a href="#bio">BIO</a>
            <a href="#work">WORK</a>
          </nav>
          <a href="#contact" className="contact">CONTACT</a>
        </header>
        <div className="content-wrapper">
  <h1 className="heading" id="greetingText">Hey!<span className="smiley">:)</span></h1>
  <div className="center-image">
    <img src={Photo} alt="Profile Photo" className="profile-image" />
  </div>
  <p className="left-text">
    Engineered by <strong>Shridhar</strong>, a full-stack and mobile developer driven to build scalable solutions that tackle real-world challenges
  </p>
  <div className="right-text">
    <div className="righttext-social-links">
      <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">Twitter</a>
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
            <div 
              ref={(el) => { if (el) sectionRefs.current[0] = el; }} 
              className={`work-section ${activeSection === 0 ? "active" : "inactive"}`} 
              id="webDev"
            >
              <div className="star">✦</div>
              <div 
                className="section-header" 
                ref={(el) => { if (el) headerRefs.current[0] = el; }} 
                onClick={() => activeSection !== 0 && transitionToSection(0)}
              >
                <div className="section-number">(01)</div>
                <h1 className="section-title" data-text="Web Development">Web Development</h1>
              </div>
              <div 
                className="section-content-wrapper" 
                ref={(el) => { if (el) contentRefs.current[0] = el; }}
              >
                <div className="section-content">
                  <p className="text-lg leading-relaxed mb-6">
                  I'm a passionate backend engineer. Currently expanding my expertise in frontend development to build seamless full-stack applications. I have experience working with cutting-edge technologies, including Next.js, FastAPI, and cloud infrastructure.
                  </p>
                  <div className="subsections grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all" style={{'--index': 1} as React.CSSProperties}>
                      <div className="subsection-number mr-4 text-2xl">01</div>
                      <div>
                        <div className="subsection-title font-semibold">Frontend Excellence</div>
                        <p className="text-sm text-gray-400">React, TypeScript, and modern UI/UX</p>
                      </div>
                    </div>
                    <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all" style={{'--index': 2} as React.CSSProperties}>
                      <div className="subsection-number mr-4 text-2xl">02</div>
                      <div>
                        <div className="subsection-title font-semibold">Backend Systems</div>
                        <p className="text-sm text-gray-400">Node.js, Django, and APIs</p>
                      </div>
                    </div>
                    <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all" style={{'--index': 3} as React.CSSProperties}>
                      <div className="subsection-number mr-4 text-2xl">03</div>
                      <div>
                        <div className="subsection-title font-semibold">Performance</div>
                        <p className="text-sm text-gray-400">Optimization and scalability</p>
                      </div>
                    </div>
                    <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all" style={{'--index': 4} as React.CSSProperties}>
                      <div className="subsection-number mr-4 text-2xl">04</div>
                      <div>
                        <div className="subsection-title font-semibold">Animations</div>
                        <p className="text-sm text-gray-400">GSAP and interactive motion</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="scroll-indicator flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer" onClick={() => transitionToSection(1)}>
                  <span>Next: Advanced Solutions</span>
                  <span>→</span>
                </div>
              </div>
            </div>
            
            {/* Rest of sections remain the same */}
            <div 
              ref={(el) => { if (el) sectionRefs.current[1] = el; }} 
              className={`work-section ${activeSection === 1 ? "active" : "inactive"}`} 
              id="advanced"
            >
              <div className="blob">⬣</div>
              <div 
                className="section-header" 
                ref={(el) => { if (el) headerRefs.current[1] = el; }} 
                onClick={() => activeSection !== 1 && transitionToSection(1)}
              >
                <div className="section-number">(02)</div>
                <h1 className="section-title" data-text="Advanced Solutions">Mobile Development</h1>
              </div>
              <div 
                className="section-content-wrapper" 
                ref={(el) => { if (el) contentRefs.current[1] = el; }}
              >
                <div className="section-content">
                  <p className="text-lg leading-relaxed mb-6">Currently exploring mobile development with React Native. Built a women's safety app and learning to create smooth, high-performance mobile experiences. Focused on writing clean code and improving app efficiency  
                  </p>
                  <div className="subsections grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all" style={{'--index': 1} as React.CSSProperties}>
                      <div className="subsection-number mr-4 text-2xl">01</div>
                      <div>
                        <div className="subsection-title font-semibold">Progressive Web Apps</div>
                        <p className="text-sm text-gray-400">Offline-capable, app-like experiences</p>
                      </div>
                    </div>
                    <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all" style={{'--index': 2} as React.CSSProperties}>
                      <div className="subsection-number mr-4 text-2xl">02</div>
                      <div>
                        <div className="subsection-title font-semibold">System Integrations</div>
                        <p className="text-sm text-gray-400">APIs, microservices, and third-party systems</p>
                      </div>
                    </div>
                    <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all" style={{'--index': 3} as React.CSSProperties}>
                      <div className="subsection-number mr-4 text-2xl">03</div>
                      <div>
                        <div className="subsection-title font-semibold">Cloud Solutions</div>
                        <p className="text-sm text-gray-400">AWS, Docker, and scalable infrastructure</p>
                      </div>
                    </div>
                    <div className="subsection flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all" style={{'--index': 4} as React.CSSProperties}>
                      <div className="subsection-number mr-4 text-2xl">04</div>
                      <div>
                        <div className="subsection-title font-semibold">Real-time Features</div>
                        <p className="text-sm text-gray-400">WebSockets and live data updates</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="scroll-indicator flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer" onClick={() => transitionToSection(2)}>
                  <span>Next: Tech Stack</span>
                  <span>→</span>
                </div>
              </div>
            </div>
            <div 
              ref={(el) => { if (el) sectionRefs.current[2] = el; }} 
              className={`work-section ${activeSection === 2 ? "active" : "inactive"}`} 
              id="techStack"
            >
              <div className="star">⚡</div>
              <div 
                className="section-header" 
                ref={(el) => { if (el) headerRefs.current[2] = el; }} 
                onClick={() => activeSection !== 2 && transitionToSection(2)}
              >
                <div className="section-number">(03)</div>
                <h1 className="section-title" data-text="Tech Stack">Tech Stack</h1>
              </div>
              <div 
                className="section-content-wrapper" 
                ref={(el) => { if (el) contentRefs.current[2] = el; }}
              >
                <p className="section-content">
                  I use a diverse range of modern technologies to create robust, scalable, and performant applications. Here's a look at the tools and frameworks I'm proficient with:
                </p>
                <TechStack />
                <div className="scroll-indicator" onClick={() => transitionToSection(3)}>Scroll for more</div>
              </div>
            </div>
            {projects.map((project, index) => {
  const projectIndex = 3 + index;
  return (
    <div
      key={projectIndex}
      ref={(el) => { if (el) sectionRefs.current[projectIndex] = el; }}
      className={`work-section ${activeSection === projectIndex ? "active" : "inactive"}`}
      id={`project-${index}`}
    >
      <div className="star">★</div>
      <div
        className="section-header"
        ref={(el) => { if (el) headerRefs.current[projectIndex] = el; }}
        onClick={() => activeSection !== projectIndex && transitionToSection(projectIndex)}
      >
        <div className="section-number">({String(projectIndex - 2).padStart(2, '0')})</div>
        <h1 className="section-title" data-text={project.title}>{project.title}</h1>
      </div>
      <div
        className="section-content-wrapper"
        ref={(el) => { if (el) contentRefs.current[projectIndex] = el; }}
      >
        <div className="section-content">
          <div className="project-layout">
            <div 
              style={{
                width: '80%',
                height: '40vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
                marginBottom: '2rem',
                overflow: 'hidden'
              }}
            >
              <img 
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  maxHeight: '100%'
                }}
              />
            </div>
            <div className="project-details">
              <p>{project.description}</p>
              <div className="tech-container">
                <h3>Technologies Used</h3>
                <div className="tech-icons">
                  {project.technologies.map((tech, techIndex) => (
                    <tech.icon key={techIndex} className="tech-icon" title={tech.name} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="scroll-indicator flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
          onClick={() => {
            console.log(`Clicked scroll indicator for project ${projectIndex}`);
            if (projectIndex === 3 + projects.length - 1) {
              console.log("Last project clicked, calling transitionToEndSection");
              transitionToEndSection();
            } else {
              transitionToSection(projectIndex + 1);
            }
          }}
        >
          <span>{projectIndex === 3 + projects.length - 1 ? "View Contact" : "Next Project"}</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
})}
          </div>
        </div>
      </div>
      
      {/* Added the missing end section div */}

      <div ref={footerRef} className="portfolio-footer">
      <div className="footer-container">
        <div className="footer-top-divider"></div>
        
        <div className="footer-header">
          <h2 className="footer-tagline">Stay Connected</h2>
          <p className="footer-subtitle">Feel free to reach out for collaborations or just a friendly hello</p>
        </div>
        
        <div className="footer-content">
          {/* Contact Form Section */}
          <div className="contact-form-section">
            {/* Using inline styles to ensure visibility */}
            <div className="contact-card form-visible" style={{opacity: 1, transform: 'translateY(0)'}}>
              <div className="card-glow"></div>
              <h3 className="contact-form-heading">Write a Message</h3>
              <div className="heading-underline"></div>
              
              {submitted ? (
                <div className="form-success-message">
                  <div className="success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p>Message sent successfully!</p>
                </div>
              ) : (
                <form ref={formRef} className="contact-form" onSubmit={handleSubmit} style={{color: 'white'}}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Hello! I'd like to discuss..."
                      rows={3}
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="spinner">
                        <span className="spinner-inner"></span>
                      </span>
                    ) : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
            
            <div className="form-decoration left-decoration">
              <div className="decoration-circle"></div>
              <div className="decoration-line"></div>
              <div className="decoration-square"></div>
            </div>
            
            <div className="form-decoration right-decoration">
              <div className="decoration-square"></div>
              <div className="decoration-line"></div>
              <div className="decoration-circle"></div>
            </div>
          </div>
          
          <div className="footer-grid">
            <div className="footer-links">
              <div className="footer-section">
                <h3 className="footer-heading">Menu</h3>
                <ul className="footer-list">
                  <li><a href="#home" className="footer-link">Home</a></li>
                  <li><a href="#services" className="footer-link">Services</a></li>
                  <li><a href="#projects" className="footer-link">Projects</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-heading">Socials</h3>
                <ul className="footer-list">
                  <li><a href="https://x.com/shridhar0405" target="_blank" rel="noopener noreferrer" className="footer-link">X</a></li>
                  <li><a href="https://github.com/shree42003" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a></li>
                  <li><a href="www.linkedin.com/in/shridhar-iyer-94a526272" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-heading">Resources</h3>
                <ul className="footer-list">
                  <li><a href="https://ijsrem.com/download/from-traditional-to-digital-evaluating-the-role-of-spirituality-in-mental-health-and-therapy/" target="_blank" rel="noopener noreferrer" className="footer-link">Paper Published</a></li>
                </ul>
              </div>
            </div>
            
            <div className="time-card">
              <div className="time-card-inner">
                <div className="time-entry">
                  <p className="time-label">Shridhar's Local Time</p>
                  <p className="time-value">{shridharTime}</p>
                </div>
                <div className="time-divider"></div>
                <div className="time-entry">
                  <p className="time-label">Your Local Time</p>
                  <p className="time-value">{localTime}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="copyright">
              <span>© {new Date().getFullYear()} Shridhar</span>
              <span>All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-background">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
      
      <a href="#top" className="back-to-top">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
        </svg>
      </a>
    </div>
    </div>
  );
};


export default MainPortfolio;