"use client";

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex -- The focusable carousel region intentionally supports dragging and keyboard scrolling. */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

type HiFiScreen = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const screens: HiFiScreen[] = [
  { src: "/case-studies/car-rental-hifi-landing.png", alt: "High-fidelity landing screen for the car rental app", width: 1284, height: 2778 },
  { src: "/case-studies/car-rental-hifi-login.png", alt: "High-fidelity account login screen", width: 1284, height: 2778 },
  { src: "/case-studies/car-rental-hifi-search-home.png", alt: "High-fidelity car search and home screen", width: 1284, height: 4323 },
  { src: "/case-studies/car-rental-hifi-search-results.png", alt: "High-fidelity vehicle search results screen", width: 1284, height: 2778 },
  { src: "/case-studies/car-rental-hifi-filters.png", alt: "High-fidelity vehicle filters screen", width: 1284, height: 2778 },
  { src: "/case-studies/car-rental-hifi-select-options.png", alt: "High-fidelity rental options selection screen", width: 1284, height: 4689 },
  { src: "/case-studies/car-rental-hifi-make-booking.png", alt: "High-fidelity booking details form", width: 1284, height: 4689 },
  { src: "/case-studies/car-rental-hifi-email-quote.png", alt: "High-fidelity email quote request form", width: 1284, height: 2778 },
  { src: "/case-studies/car-rental-hifi-verify-card.png", alt: "High-fidelity card verification screen", width: 1284, height: 3039 },
  { src: "/case-studies/car-rental-hifi-done.png", alt: "High-fidelity booking request confirmation screen", width: 1284, height: 2778 },
  { src: "/case-studies/car-rental-hifi-bookings.png", alt: "High-fidelity bookings list screen", width: 1284, height: 2778 },
  { src: "/case-studies/car-rental-hifi-upcoming.png", alt: "High-fidelity upcoming booking details screen", width: 1284, height: 3399 },
  { src: "/case-studies/car-rental-hifi-self-service.png", alt: "High-fidelity booking self-service menu", width: 1284, height: 3399 },
  { src: "/case-studies/car-rental-hifi-extension.png", alt: "High-fidelity booking extension request screen", width: 1284, height: 2778 },
  { src: "/case-studies/car-rental-hifi-completed.png", alt: "High-fidelity completed booking details screen", width: 1284, height: 3399 },
  { src: "/case-studies/car-rental-hifi-profile.png", alt: "High-fidelity customer profile screen", width: 1284, height: 2778 },
];

export function HiFiCarousel() {
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
    const card = carousel?.querySelector<HTMLElement>("[data-hifi-slide]");
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
      <header className="car-ux-heading">
        <span>06 &middot; UX Design Process</span>
        <h2 id="car-hifi-designs-title">Hi-Fi Designs<span>.</span></h2>
        <p>Final screens bring the complete search, booking and account experience together.</p>
      </header>

      <div className="car-lofi-strip-heading">
        <h3>Complete Experience</h3>
        <div className="car-lofi-controls" aria-label="High-fidelity screen navigation">
          <button type="button" onClick={() => moveCarousel(-1)} disabled={!canGoBack} aria-controls="car-hifi-carousel" aria-label="View previous high-fidelity screen"><span aria-hidden="true">&larr;</span></button>
          <button type="button" onClick={() => moveCarousel(1)} disabled={!canGoForward} aria-controls="car-hifi-carousel" aria-label="View next high-fidelity screen"><span aria-hidden="true">&rarr;</span></button>
        </div>
      </div>

      <div
        className={`car-lofi-carousel car-hifi-carousel${isDragging ? " is-dragging" : ""}`}
        id="car-hifi-carousel"
        ref={carouselRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="High-fidelity car rental mobile screens"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointerDrag}
        onPointerCancel={endPointerDrag}
      >
        <ul className="car-lofi-list">
          {screens.map((screen) => (
            <li className="car-lofi-slide" data-hifi-slide key={screen.src}>
              <article className="car-lofi-card car-hifi-card">
                <div className="car-lofi-image">
                  <Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes="(max-width: 560px) calc(100vw - 54px), 372px" draggable={false} />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <div className="car-hifi-footer">
        <a className="car-hifi-figma-link" href="https://www.figma.com/design/Do5FjTTuVFpmfzj8SJIgH4/Car-Rental-UI?node-id=0-1&t=XibqPPoNZyvJjU3o-1" target="_blank" rel="noreferrer">
          <span className="car-hifi-figma-mark" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span>View Complete UI</span>
          <span className="car-hifi-link-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </>
  );
}
