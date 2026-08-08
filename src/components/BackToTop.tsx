import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 450);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return createPortal(
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-7 right-7 md:bottom-7 md:right-7 z-[1000001] flex items-center justify-center rounded-full transition-opacity duration-300 ease-out transform ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        bg-black/30 backdrop-blur-sm border border-cyan-400/40 hover:border-purple-400/60 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]
        w-12 h-12 md:w-12 md:h-12 sm:w-11 sm:h-11
        hover:bg-black/40
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
      `}
    >
      <ArrowUp className="w-5 h-5 text-cyan-300" />
    </button>,
    document.body
  );
}
