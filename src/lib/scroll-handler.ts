/**
 * Smoothly scrolls to an element with the specified ID
 * @param id - The ID of the element to scroll to (without the #)
 * @param options - Optional scroll behavior options
 * @param offset - Optional offset in pixels from the top of the viewport (default: 20)
 */

export const scrollToId = (
  id: string,
  options: ScrollIntoViewOptions = {
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  },
  offset: number = 20
): void => {
  // Guard for Server-Side Rendering (SSR)
  if (typeof window === "undefined") return;

  const scrollToElement = () => {
    const element = document.getElementById(id);
    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - offset;

      // Use ScrollToOptions which is compatible with window.scrollTo
      window.scrollTo({
        top: y,
        behavior: options.behavior,
      });
      return true;
    }
    return false;
  };

  // 1. First try to find and scroll to the element on current page
  if (scrollToElement()) return;

  // 2. If element not found, check if we need to navigate home
  if (window.location.pathname !== "/") {
    // Navigate to home page with a query parameter
    // This triggers a full page load in Astro, which is correct
    window.location.href = `/?scrollTo=${id}`;
  } else {
    console.warn(`No element found with ID: ${id} on the current page.`);
  }
};
