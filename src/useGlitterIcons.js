import gsap from 'gsap';
import { useEffect } from 'react';
import { GlitterBoard } from './glitterBoard';

export function useGlitterIcons(containerRef) {
  useEffect(() => {
    gsap.ticker.fps(12);
    const root = containerRef.current;
    if (!root) return undefined;
    const icons = root.querySelectorAll('.icon');
    const boards = [...icons].map((el) => new GlitterBoard(el));
    return () => boards.forEach((b) => b.destroy());
  }, [containerRef]);
}
