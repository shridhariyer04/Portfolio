import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/LoadingPage.css';

const LoadingPage = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          navigate('/portfolio');
        }
      });

      // Ensure elements are visible at start
      gsap.set(contentRef.current, { opacity: 1, y: 0 });

      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .to(pageRef.current, {
        y: '-100%',
        duration: 1,
        ease: 'power4.inOut',
        delay: 2
      });
    });

    return () => ctx.revert(); // This will clean up the animations
  }, [navigate]);

  return (
    <div className="page" ref={pageRef}>
      <div className="content" ref={contentRef}>
        <h1 className="title">Shridhar Iyer</h1>
        <span className="email">shreeiyer04@gmail.com</span>
      </div>
    </div>
  );
};

export default LoadingPage;