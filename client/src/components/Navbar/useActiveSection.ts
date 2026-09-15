import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view, so the navbar can highlight it.
 * IntersectionObserver is used instead of a scroll listener because it does
 * not run work on every scroll frame.
 */
export const useActiveSection = (sectionIds: string[]): string => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveId(visible.target.id);
      },
      // Ignore the sticky navbar's strip at the top when deciding "in view".
      { rootMargin: '-80px 0px -55% 0px', threshold: [0.1, 0.25, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
};

export default useActiveSection;
