// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "../styles/Work.css";

// gsap.registerPlugin(ScrollTrigger);

// const Work = ({ bioSectionRef, inWorkView, setInWorkView }: { 
//   bioSectionRef: React.RefObject<HTMLDivElement>, 
//   inWorkView: boolean, 
//   setInWorkView: (value: boolean) => void 
// }) => {
//   const workContainerRef = useRef<HTMLDivElement>(null);
//   const sectionRefs = useRef<HTMLDivElement[]>([]);
//   const [activeSection, setActiveSection] = useState<number>(0);
//   const headerRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // Bio to Work transition animation
//   useEffect(() => {
//     if (!workContainerRef.current || !bioSectionRef.current) return;

//     // Ensure work container is initially hidden below the viewport
//     gsap.set(workContainerRef.current, {
//       y: "100%",
//       opacity: 0, // Start fully transparent
//       backgroundColor: "#000000",
//     });

//     const mainTl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".main-container",
//         start: "top top",
//         end: "+=100%",
//         scrub: 0.8,
//         pin: true,
//         onUpdate: (self) => {
//           // Ensure visibility toggles smoothly with scroll progress
//           if (self.progress > 0.1 && !inWorkView) setInWorkView(true);
//           if (self.progress < 0.1 && inWorkView) setInWorkView(false);
//         },
//       },
//     });

//     mainTl
//       .to(workContainerRef.current, {
//         y: "0%",
//         opacity: 1, // Fade in smoothly
//         duration: 1,
//         ease: "power3.inOut",
//       })
//       .to(bioSectionRef.current, {
//         opacity: 0.9,
//         filter: "blur(2px)",
//         duration: 0.8,
//         ease: "power3.inOut",
//       }, "-=0.6");

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, [bioSectionRef, inWorkView, setInWorkView]);

//   // Carousel effect for work sections
//   useEffect(() => {
//     if (!inWorkView || !workContainerRef.current) return;

//     sectionRefs.current.forEach((section, index) => {
//       if (!section) return;

//       if (index === activeSection) {
//         gsap.set(section, { 
//           display: "block", 
//           opacity: 1, 
//           height: "100vh", 
//           position: "absolute",
//           top: 0,
//           width: "100%",
//           y: "0%"
//         });
//         gsap.set(contentRefs.current[index], { opacity: 1, height: "auto", y: 0 });
//         gsap.set(headerRefs.current[index], { opacity: 1, y: 0 });
//       } else {
//         const direction = index > activeSection ? 1 : -1;
//         gsap.set(section, { 
//           display: index === activeSection - 1 || index === activeSection + 1 ? "block" : "none", 
//           opacity: 0,
//           height: "auto",
//           position: "absolute",
//           top: 0,
//           width: "100%",
//           y: `${direction * 100}%`
//         });
//         gsap.set(contentRefs.current[index], { opacity: 0, height: 0 });
//         if (index === activeSection - 1 || index === activeSection + 1) {
//           gsap.set(headerRefs.current[index], { opacity: 0.7, y: direction > 0 ? 80 : -80 });
//         }
//       }
//     });

//     const handleWheel = (e: WheelEvent) => {
//       e.preventDefault();
//       if (e.deltaY > 0 && activeSection < sectionRefs.current.length - 1) {
//         transitionToSection(activeSection + 1);
//       } else if (e.deltaY < 0 && activeSection > 0) {
//         transitionToSection(activeSection - 1);
//       }
//     };

//     let touchStartY = 0;
//     const handleTouchStart = (e: TouchEvent) => {
//       touchStartY = e.touches[0].clientY;
//     };

//     const handleTouchMove = (e: TouchEvent) => {
//       if (!touchStartY) return;
//       const touchEndY = e.touches[0].clientY;
//       const diff = touchStartY - touchEndY;
//       if (Math.abs(diff) > 50) {
//         if (diff > 0 && activeSection < sectionRefs.current.length - 1) {
//           transitionToSection(activeSection + 1);
//         } else if (diff < 0 && activeSection > 0) {
//           transitionToSection(activeSection - 1);
//         }
//         touchStartY = 0;
//       }
//       e.preventDefault();
//     };

//     if (workContainerRef.current) {
//       workContainerRef.current.addEventListener("wheel", handleWheel, { passive: false });
//       workContainerRef.current.addEventListener("touchstart", handleTouchStart, { passive: false });
//       workContainerRef.current.addEventListener("touchmove", handleTouchMove, { passive: false });
//     }

//     return () => {
//       if (workContainerRef.current) {
//         workContainerRef.current.removeEventListener("wheel", handleWheel);
//         workContainerRef.current.removeEventListener("touchstart", handleTouchStart);
//         workContainerRef.current.removeEventListener("touchmove", handleTouchMove);
//       }
//     };
//   }, [inWorkView, activeSection]);

//   const transitionToSection = (index: number) => {
//     const currentSection = sectionRefs.current[activeSection];
//     const targetSection = sectionRefs.current[index];
//     const currentHeader = headerRefs.current[activeSection];
//     const currentContent = contentRefs.current[activeSection];
//     const targetHeader = headerRefs.current[index];
//     const targetContent = contentRefs.current[index];

//     if (!currentSection || !targetSection || !currentHeader || !currentContent || !targetHeader || !targetContent) return;

//     const isMovingDown = index > activeSection;

//     gsap.set(targetSection, { 
//       display: "block",
//       y: isMovingDown ? "100%" : "-100%", 
//       opacity: 1,
//       height: "100vh"
//     });

//     const tl = gsap.timeline({
//       onComplete: () => {
//         setActiveSection(index);
//         sectionRefs.current.forEach((section, i) => {
//           if (i !== index && i !== index - 1 && i !== index + 1) {
//             gsap.set(section, { display: "none" });
//           }
//         });
//       }
//     });

//     tl
//       .to(currentContent, { 
//         opacity: 0, 
//         height: 0, 
//         duration: 0.6, 
//         ease: "power3.inOut" 
//       })
//       .to(currentHeader, { 
//         y: isMovingDown ? -80 : 80, 
//         opacity: 0.7, 
//         duration: 0.6, 
//         ease: "power3.inOut" 
//       }, "-=0.4")
//       .to(currentSection, { 
//         y: isMovingDown ? "-100%" : "100%", 
//         duration: 0.8, 
//         ease: "power3.inOut" 
//       }, "-=0.2")
//       .to(targetSection, { 
//         y: "0%", 
//         duration: 0.8, 
//         ease: "power3.inOut" 
//       }, "-=0.7")
//       .to(targetHeader, { 
//         y: 0, 
//         opacity: 1, 
//         duration: 0.6, 
//         ease: "power3.inOut" 
//       }, "-=0.5")
//       .to(targetContent, { 
//         opacity: 1, 
//         height: "auto", 
//         duration: 0.6, 
//         ease: "power3.inOut" 
//       }, "-=0.4")
//       .fromTo(targetSection, 
//         { scale: 0.98 }, 
//         { scale: 1, duration: 0.4, ease: "power3.out" }, 
//         "-=0.3"
//       );
//   };

//   return (
//     <div className="main-container" style={{ display: inWorkView ? "block" : "none" }}>
//       <div ref={workContainerRef} className="work-container">
//         <div className="work-content">
//           <div className="work-section-wrapper">
//             <div 
//               ref={el => sectionRefs.current[0] = el as HTMLDivElement}
//               className={`work-section ${activeSection === 0 ? "active" : "inactive"}`}
//               id="webDev"
//             >
//               <div className="star">✦</div>
//               <div className="section-header" ref={el => headerRefs.current[0] = el}>
//                 <div className="section-number">(01)</div>
//                 <h1 className="section-title">Web Development</h1>
//               </div>
//               <div className="section-content-wrapper" ref={el => contentRefs.current[0] = el}>
//                 <p className="section-content">
//                   I create custom-coded websites specifically for your brand. I focus on making sure they are scalable, fast, accessible, and have engaging animations to provide a memorable experience for users.
//                 </p>
//                 <div className="subsections">
//                   <div className="subsection"><div className="subsection-number">01</div><div className="subsection-title">Modern Websites</div></div>
//                   <div className="subsection"><div className="subsection-number">02</div><div className="subsection-title">Motion & Animations</div></div>
//                   <div className="subsection"><div className="subsection-number">03</div><div className="subsection-title">Scalability</div></div>
//                 </div>
//                 <div className="scroll-indicator" onClick={() => transitionToSection(1)}>Scroll for more</div>
//               </div>
//             </div>

//             <div 
//               ref={el => sectionRefs.current[1] = el as HTMLDivElement}
//               className={`work-section ${activeSection === 1 ? "active" : "inactive"}`}
//               id="advanced"
//             >
//               <div className="blob">⬣</div>
//               <div className="section-header" ref={el => headerRefs.current[1] = el} onClick={() => activeSection !== 1 && transitionToSection(1)}>
//                 <div className="section-number">(02)</div>
//                 <h1 className="section-title" data-text="Advanced Solutions">Advanced Solutions</h1>
//               </div>
//               <div className="section-content-wrapper" ref={el => contentRefs.current[1] = el}>
//                 <p className="section-content">
//                   I specialize in developing advanced web applications that redefine the possibilities of online platforms, crafting progressive web apps and integrating complex systems.
//                 </p>
//                 <div className="subsections">
//                   <div className="subsection"><div className="subsection-number">01</div><div className="subsection-title">Progressive Web Apps</div></div>
//                   <div className="subsection"><div className="subsection-number">02</div><div className="subsection-title">Complex Integrations</div></div>
//                   <div className="subsection"><div className="subsection-number">03</div><div className="subsection-title">Innovative Tech Solutions</div></div>
//                 </div>
//                 <div className="scroll-indicator" onClick={() => transitionToSection(0)}>Back to Web Development</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Work;