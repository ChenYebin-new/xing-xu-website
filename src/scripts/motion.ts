type Entrance = "rise" | "left" | "right" | "image" | "quiet";

function initMotion() {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (preference.matches || !("IntersectionObserver" in window) || !Element.prototype.animate) return;

  const compact = window.matchMedia("(max-width: 720px)").matches;
  const easing = "cubic-bezier(0.22, 0.68, 0.36, 1)";
  const pending = new Map<HTMLElement, { entrance: Entrance; delay: number }>();
  const active = new Map<HTMLElement, Animation>();

  function register(selector: string, entrance: Entrance = "rise", stagger = false) {
    const groups = new Map<Element | null, number>();
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      if (pending.has(element) || element.closest("form, [hidden]")) return;
      const index = groups.get(element.parentElement) ?? 0;
      groups.set(element.parentElement, index + 1);
      pending.set(element, { entrance, delay: stagger ? Math.min(index * 100, 300) : 0 });
      element.dataset.motion = entrance;
      element.dataset.motionState = "pending";
    });
  }

  // The opening introduces the supplier, then presents the fan in its display bay.
  register(".hero__copy > *", "left", true);
  register(".hero-product__frame img", "image");
  register(".hero-product figcaption, .evidence__heading, .evidence__note", "quiet");
  register(".evidence-slot, .capabilities > article", "rise", true);

  register(".interior-hero > div, .partner-hero > div:first-child, .about-hero > div:first-child, .contact-hero > div:first-child, .product-detail-hero__copy", "left");
  register(".partner-hero__brief, .about-hero__statement, .contact-hero__notice, .interior-hero__aside", "right");
  register(".product-detail-hero__visual", "image");

  register(".section-heading, .content-heading, .use-case-band > h2, .partner-needs > header, .workflow-section__heading");
  register(".product-card, .category-feature, .numbered-grid > article, .support-grid > div > article, .about-capabilities > div > article", "rise", true);
  register(".about-evidence__grid > figure", "image", true);
  register(".partner-needs > ul > li, .workflow-section > ol > li, .channel-status > ul > li", "rise", true);
  register(".fit-boundaries > article, .publication-boundary > div, .published-records > div, .replacement-checklist > div, .replacement-checklist > ul", "quiet", true);
  register(".scope-boundary, .action-panel > div", "rise", true);

  register(".audience-tabs, .audience-panels", "quiet");
  register(".rfq-rail__heading, .rfq-rail > .button, .contact-preview");
  register(".rfq-rail__list > li, .inquiry-prep > ol > li", "rise", true);
  register(".contact-whatsapp > div, .inquiry-prep > div", "left");
  register(".contact-whatsapp__image", "quiet");

  // Form controls, errors and the Turnstile widget remain immediately available.
  register(".rfq-hero > div, .rfq-hero > aside, .rfq-guidance > div", "quiet");
  register(".policy-page > header, .policy-page > section, .policy-page > footer, .status-page > div, .status-page > aside, .not-found > div", "quiet");
  register(".site-footer > div, .site-footer > nav", "quiet", true);

  function track(element: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) {
    const animation = element.animate(frames, options);
    active.set(element, animation);
    // No retained fill styles: the underlying HTML is always the visible final state.
    animation.onfinish = animation.oncancel = () => active.delete(element);
  }

  function enter(element: HTMLElement) {
    const item = pending.get(element);
    if (!item) return;
    pending.delete(element);
    observer.unobserve(element);
    element.dataset.motionState = "shown";

    if (preference.matches || document.hidden || element.contains(document.activeElement)) return;
    const card = element.matches(".product-card, .category-feature, .evidence-slot");
    const distance = card ? (compact ? 36 : 64) : (compact ? 22 : 40);
    const offset = item.entrance === "left" ? `${-distance}px 0`
      : item.entrance === "right" ? `${distance}px 0` : `0 ${distance}px`;
    const image = item.entrance === "image";
    const quiet = item.entrance === "quiet";
    const focal = element.matches(".hero-product__frame img");

    track(element, [
      { opacity: 0, translate: quiet ? "0 0" : offset, scale: image || card ? (compact ? "0.98" : "0.96") : "1" },
      { opacity: 1, translate: "0 0", scale: "1" },
    ], {
      duration: quiet ? 460 : focal ? (compact ? 850 : 1150) : compact ? 700 : 950,
      delay: focal ? 160 : item.delay,
      easing,
      fill: "backwards",
    });

    // One inspection sweep belongs to the fan presentation, including on mobile.
    if (focal) {
      const frame = element.closest<HTMLElement>(".hero-product__frame");
      const line = frame?.querySelector<HTMLElement>(".inspection-line");
      if (frame && line) {
        const end = `translateX(${frame.clientWidth}px)`;
        track(line, [
          { transform: "translateX(0)", opacity: 0 },
          { transform: `translateX(${frame.clientWidth * 0.12}px)`, opacity: 0.7, offset: 0.12 },
          { transform: `translateX(${frame.clientWidth * 0.88}px)`, opacity: 0.7, offset: 0.88 },
          { transform: end, opacity: 0 },
        ], { duration: 1250, delay: 320, easing: "linear", fill: "backwards" });
      }
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) enter(entry.target as HTMLElement);
    });
  }, { rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.1)}px 0px`, threshold: 0.01 });

  function showImmediately(target?: Element) {
    pending.forEach((_, element) => {
      if (target && !element.contains(target) && !target.contains(element)) return;
      pending.delete(element);
      observer.unobserve(element);
      element.dataset.motionState = "shown";
    });
    active.forEach((animation, element) => {
      if (!target || element.contains(target) || target.contains(element)) animation.cancel();
    });
  }

  function showHashTarget() {
    if (!window.location.hash) return;
    let id = window.location.hash.slice(1);
    try { id = decodeURIComponent(id); } catch { /* An incomplete URL escape is still a valid literal id. */ }
    const target = document.getElementById(id);
    if (target) showImmediately(target);
  }

  // Links never wait for an entrance, whether reached by keyboard, pointer or anchor.
  document.addEventListener("focusin", (event) => {
    if (event.target instanceof Element) showImmediately(event.target);
  });
  document.addEventListener("pointerdown", (event) => {
    if (event.target instanceof Element) showImmediately(event.target);
  }, { passive: true });
  window.addEventListener("hashchange", showHashTarget);
  window.addEventListener("beforeprint", () => showImmediately());
  window.addEventListener("pagehide", () => showImmediately());
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) showImmediately();
  });
  preference.addEventListener("change", () => {
    if (preference.matches) {
      showImmediately();
      observer.disconnect();
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) active.forEach((animation) => animation.cancel());
  });

  showHashTarget();
  pending.forEach((_, element) => observer.observe(element));
}

initMotion();
