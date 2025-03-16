// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const AnimatedPortfolio = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const loadingRef = useRef(null);
//   const portfolioRef = useRef(null);
//   const workRef = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // Initial loading animation
//     const tl = gsap.timeline();
    
//     if (isLoading) {
//       tl.to(loadingRef.current, {
//         duration: 3,
//         opacity: 1,
//         ease: "power2.inOut"
//       }).to(loadingRef.current, {
//         duration: 1,
//         yPercent: -100,
//         ease: "power4.inOut",
//         onComplete: () => setIsLoading(false)
//       });
//     }

//     // Portfolio section reveal
//     if (!isLoading && portfolioRef.current) {
//       gsap.from(portfolioRef.current, {
//         yPercent: 100,
//         duration: 1,
//         ease: "power4.out"
//       });
//     }

//     // Work section scroll animation
//     if (!isLoading && workRef.current) {
//       ScrollTrigger.create({
//         trigger: workRef.current,
//         start: "top bottom",
//         end: "top top",
//         scrub: 1,
//         pin: false,
//         animation: gsap.from(workRef.current, {
//           yPercent: 100,
//           ease: "none"
//         })
//       });
//     }

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, [isLoading]);

//   return (
//     <div ref={containerRef} className="h-screen overflow-y-auto">
//       {/* Loading Section */}
//       <section 
//         ref={loadingRef}
//         className="fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center"
//         style={{ zIndex: isLoading ? 50 : -1 }}
//       >
//         <h1 className="text-4xl font-bold mb-4">Shridhar Iyer</h1>
//         <p className="text-xl">shreeiyer04@gmail.com</p>
//       </section>

//       {/* Portfolio/Bio Section */}
//       <section 
//         ref={portfolioRef}
//         className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8"
//       >
//         <nav className="fixed top-0 w-full flex justify-between p-6 bg-transparent">
//           <div>
//             <a href="#bio" className="mx-4">BIO</a>
//             <a href="#work" className="mx-4">WORK</a>
//           </div>
//           <a href="#contact" className="mx-4">CONTACT</a>
//         </nav>
        
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-6xl mb-8">Hey! :)</h1>
//           <img 
//             src="/path-to-your-photo.jpg" 
//             alt="Profile" 
//             className="w-48 h-48 rounded-full mx-auto mb-8"
//           />
//           <div className="grid grid-cols-2 gap-8 text-left">
//             <p>Design by <strong>Shridhar</strong>, a designer based in Mumbai, 
//             currently part of the design team at <em>@SIES</em>.</p>
//             <p>I am a UI/UX designer with over 6 years of experience...</p>
//           </div>
//         </div>
//       </section>

//       {/* Work Section */}
//       <section 
//         ref={workRef}
//         className="min-h-screen bg-black text-white p-8"
//       >
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-5xl font-bold mb-8">WHAT I DO /</h2>
//           <p className="text-xl">
//             User-friendly interfaces don't happen by chance, they are built with
//             intention. I code intuitive responsive solutions that make your users'
//             journey effortless.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AnimatedPortfolio;