"use client";

import { useEffect } from "react";

/**
 * DeferredFAQSchema
 *
 * Fetches the FAQ JSON-LD schema from the API route after the page becomes
 * interactive and injects it as a <script type="application/ld+json"> tag.
 *
 * This removes ~3.5 KB of FAQPage schema from the critical HTML payload
 * while still making it available to search engine crawlers that execute JS.
 */
export function DeferredFAQSchema() {
  useEffect(() => {
    // Use requestIdleCallback so we don't block any remaining user interactions
    const inject = () => {
      fetch("/api/schema/faq")
        .then((res) => res.json())
        .then((schema) => {
          const script = document.createElement("script");
          script.type = "application/ld+json";
          script.id = "faq-schema";
          script.text = JSON.stringify(schema);
          document.head.appendChild(script);
        })
        .catch(() => {
          // Silently fail — schema injection is non-critical
        });
    };

    if ("requestIdleCallback" in window) {
      (window as typeof window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(inject);
    } else {
      // Fallback: inject after 2s if requestIdleCallback is unavailable
      const timer = setTimeout(inject, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}
