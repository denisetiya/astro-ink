export interface ScrollspySection {
  id: string;
  link: HTMLAnchorElement;
  target: HTMLElement;
}

export function initScrollspy(nav: HTMLElement): () => void {
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[href^='#']"));
  const sections: ScrollspySection[] = [];
  for (const link of links) {
    const target = document.getElementById(link.hash.slice(1));
    if (target) sections.push({ id: link.hash.slice(1), link, target });
  }

  const setCurrent = (id: string | null) => {
    for (const s of sections) {
      if (s.id === id) s.link.setAttribute("aria-current", "true");
      else s.link.removeAttribute("aria-current");
    }
  };

  const onClick = (event: Event) => {
    const link = (event.target as HTMLElement).closest("a");
    if (!link) return;
    setCurrent(link.hash.slice(1));
  };
  nav.addEventListener("click", onClick);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      }
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  for (const s of sections) observer.observe(s.target);

  return () => {
    nav.removeEventListener("click", onClick);
    observer.disconnect();
  };
}
