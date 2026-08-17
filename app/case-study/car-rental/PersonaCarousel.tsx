"use client";

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex -- The focusable carousel region intentionally supports dragging and keyboard scrolling. */

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

type Persona = {
  readonly tone: string;
  readonly initials: string;
  readonly name: string;
  readonly role: string;
  readonly quote: string;
  readonly about: readonly (readonly [string, string])[];
  readonly traits: readonly string[];
  readonly motivation: string;
  readonly goals: readonly string[];
  readonly painPoints: readonly string[];
};

export function PersonaCarousel({ personas }: { personas: readonly Persona[] }) {
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
    const card = carousel?.querySelector<HTMLElement>("[data-persona-card]");
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
    <section className="car-personas" aria-labelledby="car-personas-title">
      <div className="car-persona-heading-row">
        <header className="car-research-subheading">
          <span>Research artifact</span>
          <h3 id="car-personas-title">Personas<span>.</span></h3>
          <p>Two working personas representing professional and leisure rental contexts.</p>
        </header>
        <div className="car-persona-controls" aria-label="Persona carousel navigation">
          <button type="button" onClick={() => moveCarousel(-1)} disabled={!canGoBack} aria-controls="car-persona-carousel" aria-label="View previous persona">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => moveCarousel(1)} disabled={!canGoForward} aria-controls="car-persona-carousel" aria-label="View next persona">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        className={`car-persona-carousel${isDragging ? " is-dragging" : ""}`}
        id="car-persona-carousel"
        ref={carouselRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="User personas"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointerDrag}
        onPointerCancel={endPointerDrag}
      >
        <ul className="car-persona-list">
          {personas.map((persona, index) => (
            <li className="car-persona-slide" data-persona-card key={persona.name}>
              <article className={`car-persona-card car-persona-${persona.tone}`}>
                <div className="car-persona-profile">
                  <span className="car-persona-number">0{index + 1}</span>
                  <div className="car-persona-avatar" aria-hidden="true"><span>{persona.initials}</span></div>
                  <h4>{persona.name}</h4>
                  <p className="car-persona-role">{persona.role}</p>
                  <blockquote>{persona.quote}</blockquote>
                  <dl>
                    {persona.about.map(([label, value]) => (
                      <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                    ))}
                  </dl>
                  <ul className="car-persona-traits" aria-label={`${persona.name} traits`}>
                    {persona.traits.map((trait) => <li key={trait}>{trait}</li>)}
                  </ul>
                </div>

                <div className="car-persona-details">
                  <section>
                    <h5>Motivation</h5>
                    <p>{persona.motivation}</p>
                  </section>
                  <section>
                    <h5>Goals</h5>
                    <ul>{persona.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
                  </section>
                  <section>
                    <h5>Pain points</h5>
                    <ul>{persona.painPoints.map((painPoint) => <li key={painPoint}>{painPoint}</li>)}</ul>
                  </section>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
