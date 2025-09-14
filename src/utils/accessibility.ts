import { useEffect, useRef } from "react";

// Focus trap utility for modal-like components
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Focus the first element when trap becomes active
    firstElement?.focus();

    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [isActive]);

  return containerRef;
};

// Announce changes to screen readers
export const announceToScreenReader = (
  message: string,
  priority: "polite" | "assertive" = "polite"
) => {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Generate unique IDs for form elements
export const generateId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Keyboard navigation helpers
export const handleArrowKeys = (
  event: React.KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  onIndexChange: (index: number) => void
) => {
  switch (event.key) {
    case "ArrowDown":
    case "ArrowRight":
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      onIndexChange(nextIndex);
      items[nextIndex]?.focus();
      break;
    case "ArrowUp":
    case "ArrowLeft":
      event.preventDefault();
      const prevIndex =
        currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      onIndexChange(prevIndex);
      items[prevIndex]?.focus();
      break;
    case "Home":
      event.preventDefault();
      onIndexChange(0);
      items[0]?.focus();
      break;
    case "End":
      event.preventDefault();
      onIndexChange(items.length - 1);
      items[items.length - 1]?.focus();
      break;
  }
};

// Validate ARIA attributes
export const validateAriaAttributes = (element: HTMLElement): string[] => {
  const errors: string[] = [];

  // Check for required ARIA attributes
  if (
    element.hasAttribute("aria-label") &&
    element.hasAttribute("aria-labelledby")
  ) {
    errors.push(
      "Element has both aria-label and aria-labelledby. Use only one."
    );
  }

  if (
    element.hasAttribute("aria-expanded") &&
    !["true", "false"].includes(element.getAttribute("aria-expanded") || "")
  ) {
    errors.push('aria-expanded must be "true" or "false".');
  }

  if (
    element.hasAttribute("aria-selected") &&
    !["true", "false"].includes(element.getAttribute("aria-selected") || "")
  ) {
    errors.push('aria-selected must be "true" or "false".');
  }

  if (
    element.hasAttribute("aria-checked") &&
    !["true", "false", "mixed"].includes(
      element.getAttribute("aria-checked") || ""
    )
  ) {
    errors.push('aria-checked must be "true", "false", or "mixed".');
  }

  return errors;
};

// Screen reader only class for visually hidden content
export const addScreenReaderOnlyStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
  document.head.appendChild(style);
};

// Initialize accessibility features
export const initializeAccessibility = () => {
  addScreenReaderOnlyStyles();

  // Add skip link if not present
  if (!document.querySelector(".skip-link")) {
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.className = "skip-link";
    skipLink.textContent = "Skip to main content";
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
};
