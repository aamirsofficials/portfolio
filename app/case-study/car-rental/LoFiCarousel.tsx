"use client";

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex -- Each focusable carousel region intentionally supports dragging and keyboard scrolling. */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

type WireframeScreen = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const discoveryScreens: WireframeScreen[] = [
  { src: "/case-studies/car-rental-lofi-search-home.png", alt: "Low-fidelity wireframe of the car rental search and home screen", width: 771, height: 2041 },
  { src: "/case-studies/car-rental-lofi-search-results.png", alt: "Low-fidelity wireframe of the car rental search results screen", width: 853, height: 1844 },
  { src: "/case-studies/car-rental-lofi-filters.png", alt: "Low-fidelity wireframe of the vehicle filters screen", width: 853, height: 1844 },
];

const bookingScreens: WireframeScreen[] = [
  { src: "/case-studies/car-rental-lofi-select-options.png", alt: "Low-fidelity wireframe of the rental options screen", width: 725, height: 2167 },
  { src: "/case-studies/car-rental-lofi-make-booking.png", alt: "Low-fidelity wireframe of the booking details form", width: 724, height: 2172 },
  { src: "/case-studies/car-rental-lofi-verify-card.png", alt: "Low-fidelity wireframe of the card verification screen", width: 852, height: 1846 },
  { src: "/case-studies/car-rental-lofi-booking-done.png", alt: "Low-fidelity wireframe of the booking request confirmation screen", width: 853, height: 1844 },
  { src: "/case-studies/car-rental-lofi-email-quote.png", alt: "Low-fidelity wireframe of the email quote form", width: 852, height: 1846 },
];

type WireframeStripProps = {
  title: string;
  carouselId: string;
  screens: WireframeScreen[];
};

function WireframeStrip({ title, carouselId, screens }: WireframeStripProps) {
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
    const card = carousel?.querySelector<HTMLElement>("[data-lofi-slide]");
    if (!carousel || !card) return;
    const gap = Number.parseFloat(window.getComputedStyle(card.parentElement as HTMLElement).columnGap) || 0;
    carousel.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
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
    dragRef.current = { active: true, pointerId: event.pointerId, startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft };
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
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  };

  return (
    <>
      <div className="car-lofi-strip-heading">
        <h3>{title}</h3>
        <div className="car-lofi-controls" aria-label={`${title} wireframe navigation`}>
          <button type="button" onClick={() => moveCarousel(-1)} disabled={!canGoBack} aria-controls={carouselId} aria-label={`View previous ${title.toLowerCase()} wireframe`}><span aria-hidden="true">&larr;</span></button>
          <button type="button" onClick={() => moveCarousel(1)} disabled={!canGoForward} aria-controls={carouselId} aria-label={`View next ${title.toLowerCase()} wireframe`}><span aria-hidden="true">&rarr;</span></button>
        </div>
      </div>

      <div
        className={`car-lofi-carousel${isDragging ? " is-dragging" : ""}`}
        id={carouselId}
        ref={carouselRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} low-fidelity mobile wireframes`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointerDrag}
        onPointerCancel={endPointerDrag}
      >
        <ul className="car-lofi-list">
          {screens.map((screen) => (
            <li className="car-lofi-slide" data-lofi-slide key={screen.src}>
              <article className="car-lofi-card">
                <div className="car-lofi-image">
                  <Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes="(max-width: 560px) calc(100vw - 54px), 460px" draggable={false} />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function LoFiCarousel() {
  return (
    <>
      <header className="car-ux-heading">
        <span>05 &middot; UX Design Process</span>
        <h2 id="car-lofi-designs-title">Lo-Fi Designs<span>.</span></h2>
        <p>Early wireframes established the search, results and filtering experience before visual design.</p>
      </header>

      <WireframeStrip title="Search & Discovery" carouselId="car-lofi-discovery-carousel" screens={discoveryScreens} />
      <WireframeStrip title="Booking" carouselId="car-lofi-booking-carousel" screens={bookingScreens} />
    </>
  );
}
