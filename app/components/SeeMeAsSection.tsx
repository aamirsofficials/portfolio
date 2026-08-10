"use client";

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex -- The named, focusable carousel region intentionally supports mouse dragging and arrow-key scrolling. */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

type SeeMeAsCard = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const seeMeAsCards: SeeMeAsCard[] = [
  {
    title: "Product Designer (UX/UI)",
    description: "I design end-to-end digital products that balance user needs, business goals, and technical feasibility.",
    image: "/images/see-me-as/product-designer.webp",
    imageAlt: "Laptop and smartphone displaying a refined responsive product interface in a modern design workspace",
  },
  {
    title: "UX Designer",
    description: "I research, structure, and simplify complex problems into intuitive experiences that people can understand and use.",
    image: "/images/see-me-as/ux-designer.webp",
    imageAlt: "UX journey maps, mobile wireframes, and sticky notes arranged across a research workspace",
  },
  {
    title: "UI Designer",
    description: "I craft clear, consistent, and visually refined interfaces that make digital products easier and more enjoyable to use.",
    image: "/images/see-me-as/ui-designer.webp",
    imageAlt: "Tablet displaying interface screens, components, color swatches, and a polished design system",
  },
  {
    title: "Branding Specialist",
    description: "I build cohesive brand identities that communicate a clear personality, purpose, and point of view.",
    image: "/images/see-me-as/branding-specialist.webp",
    imageAlt: "Premium brand identity presentation with stationery, packaging, color samples, and brand guidelines",
  },
  {
    title: "Logo Designer",
    description: "I create distinctive and memorable logos that give brands a clear visual identity and lasting recognition.",
    image: "/images/see-me-as/logo-designer.webp",
    imageAlt: "Geometric logo sketches, construction grids, drawing tools, and a refined embossed identity mark",
  },
  {
    title: "Digital Media Designer",
    description: "I create engaging digital visuals for websites, social media, campaigns, advertisements, and online experiences.",
    image: "/images/see-me-as/digital-media-designer.webp",
    imageAlt: "Smartphone and tablet presenting a cohesive collection of premium digital campaign visuals",
  },
  {
    title: "Print Media Designer",
    description: "I design polished print materials that communicate clearly across brochures, packaging, stationery, and marketing collateral.",
    image: "/images/see-me-as/print-media-designer.webp",
    imageAlt: "Open editorial magazine, folded brochure, packaging, and tactile paper samples in a print studio",
  },
];

export function SeeMeAsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, pointerId: -1, startX: 0, scrollLeft: 0 });
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const updateControls = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const end = carousel.scrollWidth - carousel.clientWidth;
    setCanGoBack(carousel.scrollLeft > 4);
    setCanGoForward(carousel.scrollLeft < end - 4);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const frame = window.requestAnimationFrame(updateControls);
    const resizeObserver = new ResizeObserver(updateControls);
    resizeObserver.observe(carousel);
    carousel.addEventListener("scroll", updateControls, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      carousel.removeEventListener("scroll", updateControls);
    };
  }, [updateControls]);

  const moveCarousel = useCallback((direction: -1 | 1) => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector<HTMLElement>("[data-see-me-as-card]");
    if (!carousel || !card) return;

    const gap = Number.parseFloat(window.getComputedStyle(card.parentElement as HTMLElement).columnGap) || 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    carousel.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveCarousel(event.key === "ArrowLeft" ? -1 : 1);
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      carouselRef.current?.scrollTo({
        left: event.key === "Home" ? 0 : carouselRef.current.scrollWidth,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.currentTarget.scrollLeft = dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX);
  };

  const endPointerDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) return;
    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <section className="see-me-as reveal" aria-labelledby="see-me-as-title">
      <div className="see-me-as-heading section-shell">
        <div>
          <span className="eyebrow">Design breadth</span>
          <h2 id="see-me-as-title">See me as<span className="accent-dot">.</span></h2>
          <p>Different lenses. Same mindset &mdash; solve problems, create clarity, deliver impact.</p>
        </div>
        <div className="see-me-as-controls" aria-label="Carousel navigation">
          <button type="button" onClick={() => moveCarousel(-1)} disabled={!canGoBack} aria-controls="see-me-as-carousel" aria-label="View previous design discipline">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => moveCarousel(1)} disabled={!canGoForward} aria-controls="see-me-as-carousel" aria-label="View next design discipline">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        className={`see-me-as-carousel${isDragging ? " is-dragging" : ""}`}
        id="see-me-as-carousel"
        ref={carouselRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Design disciplines"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointerDrag}
        onPointerCancel={endPointerDrag}
      >
        <ul className="see-me-as-list">
          {seeMeAsCards.map((card, index) => (
            <li className="see-me-as-card" data-see-me-as-card key={card.title}>
              <article>
                <span className="see-me-as-index">{String(index + 1).padStart(2, "0")} / {String(seeMeAsCards.length).padStart(2, "0")}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="see-me-as-image">
                  <Image src={card.image} alt={card.imageAlt} fill sizes="(max-width: 560px) 86vw, (max-width: 900px) 62vw, 35vw" loading="lazy" draggable={false} />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
