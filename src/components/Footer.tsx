// import React, { useEffect, useState } from "react";

// const PortfolioFooter = () => {
//   const [localTime, setLocalTime] = useState(new Date());
  
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setLocalTime(new Date());
//     }, 1000);
    
//     return () => clearInterval(timer);
//   }, []);
  
//   const formatTime = (date:any) => {
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const seconds = date.getSeconds();
//     return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${hours >= 12 ? 'pm' : 'am'}`;
//   };
  
//   return (
//     <div className="footer-container bg-stone-100 text-stone-700 w-full py-12 px-8">
//       <div className="footer-content max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Menu Section */}
//         <div className="menu-section">
//           <h3 className="text-xl font-medium mb-4 border-b border-stone-300 pb-2">Menu</h3>
//           <ul className="space-y-3">
//             <li><a href="#" className="hover:text-stone-900 transition-colors">home</a></li>
//             <li><a href="#" className="hover:text-stone-900 transition-colors">services</a></li>
//             <li><a href="#" className="hover:text-stone-900 transition-colors">projects</a></li>
//             <li><a href="#" className="hover:text-stone-900 transition-colors">about</a></li>
//             <li><a href="#" className="hover:text-stone-900 transition-colors">testimonials</a></li>
//             <li><a href="#" className="hover:text-stone-900 transition-colors">contact</a></li>
//           </ul>
//         </div>
        
//         {/* Socials Section */}
//         <div className="socials-section">
//           <h3 className="text-xl font-medium mb-4 border-b border-stone-300 pb-2">Socials</h3>
//           <ul className="space-y-3">
//             <li><a href="#" className="hover:text-stone-900 transition-colors">x</a></li>
//             <li><a href="#" className="hover:text-stone-900 transition-colors">telegram</a></li>
//             <li><a href="#" className="hover:text-stone-900 transition-colors">github</a></li>
//             <li><a href="#" className="hover:text-stone-900 transition-colors">linkedin</a></li>
//           </ul>
//         </div>
        
//         {/* Resources Section */}
//         <div className="resources-section">
//           <h3 className="text-xl font-medium mb-4 border-b border-stone-300 pb-2">Resources</h3>
//           <ul className="space-y-3">
//             <li><a href="#" className="hover:text-stone-900 transition-colors">huy nguyen (the ui designer)</a></li>
//             <li><a href="#" className="hover:text-stone-900 transition-colors">pillarstack</a></li>
//             <li><a href="#" className="hover:text-stone-900 transition-colors">figma template</a></li>
//           </ul>
//         </div>
//       </div>
      
//       {/* Bottom section with copyright and time */}
//       <div className="footer-bottom mt-12 flex flex-col md:flex-row md:justify-between items-start md:items-center">
//         <div className="copyright">
//           <p className="text-2xl font-bold">&copy; 2025 Shridhar</p>
//           <p className="text-3xl font-bold">All rights reserved.</p>
//         </div>
        
//         <div className="time-section mt-6 md:mt-0">
//           <div className="your-time mb-2">
//             <p className="uppercase text-sm font-medium">SHRIDHAR'S LOCAL TIME</p>
//             <p className="text-lg">{formatTime(localTime)}</p>
//           </div>
//           <div className="visitor-time">
//             <p className="uppercase text-sm font-medium">YOUR LOCAL TIME</p>
//             <p className="text-lg">{formatTime(localTime)}</p>
//           </div>
//         </div>
//       </div>
      
//       {/* Scroll to top button */}
//       <div className="scroll-top flex justify-end mt-6">
//         <button 
//           className="w-12 h-12 bg-stone-300 rounded-full flex items-center justify-center hover:bg-stone-400 transition-colors"
//           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PortfolioFooter;