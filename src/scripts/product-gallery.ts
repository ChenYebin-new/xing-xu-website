const gallery = document.querySelector<HTMLElement>(".hero-product");

if (gallery) {
  const images = Array.from(gallery.querySelectorAll<HTMLImageElement>("[data-gallery-image]"));
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-gallery-select]"));
  const caption = gallery.querySelector<HTMLElement>("[data-gallery-caption]");
  const reset = gallery.querySelector<HTMLButtonElement>("[data-gallery-reset]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let selection = 0;
  let transition: Animation | undefined;

  async function showImage(id: string, label: string) {
    const image = images.find((item) => item.dataset.galleryImage === id);
    if (!image) return;
    const request = ++selection;
    if (!image.hidden) {
      gallery!.removeAttribute("aria-busy");
      return;
    }
    gallery!.setAttribute("aria-busy", "true");
    image.loading = "eager";
    try {
      await image.decode();
    } catch {
      if (request === selection) {
        gallery!.removeAttribute("aria-busy");
        if (caption) caption.textContent = "Image unavailable. Please try again.";
      }
      return;
    }
    if (request !== selection) return;
    transition?.cancel();
    images.forEach((item) => { item.hidden = item !== image; });
    links.forEach((link) => {
      if (link.dataset.gallerySelect === id) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    if (caption) caption.textContent = label;
    if (reset) reset.disabled = id === "overview";
    gallery!.removeAttribute("aria-busy");
    if (window.matchMedia("(max-width: 900px)").matches && gallery!.getBoundingClientRect().top < 74) {
      gallery!.scrollIntoView({ block: "start", behavior: reducedMotion.matches ? "instant" : "smooth" });
    }
    if (!reducedMotion.matches && image.animate) {
      transition = image.animate([{ opacity: 0.35 }, { opacity: 1 }], {
        duration: 220, easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
    }
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      // Modified clicks keep the original full-image link behavior.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      void showImage(link.dataset.gallerySelect!, link.dataset.galleryLabel!);
    });
  });
  if (reset) {
    reset.hidden = false;
    reset.addEventListener("click", () => { void showImage("overview", "Centrifugal fan · Overview"); });
  }
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) transition?.cancel();
  });
}
