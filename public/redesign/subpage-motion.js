(() => {
  const main = document.querySelector('main');
  if (!main) return;
  const motionScriptUrl = document.currentScript?.src || document.baseURI;

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealTargets = [...main.querySelectorAll('[data-reveal="true"], .research-row')];
  // Keep velocity skew on type only; transforming full sections can change
  // sticky/anchor behavior and makes the page feel as if its scroll is drifting.
  const skewTargets = [...main.querySelectorAll('.editorial-hero h1, .editorial-section h2, .editorial-section h3')];

  // Evidence records are native dialogs. Keep the opener focus and let the
  // browser provide modal focus containment and Escape handling.
  main.querySelectorAll('.evidence-trigger').forEach((trigger) => {
    const row = trigger.closest('.evidence-row');
    const dialog = row?.querySelector('dialog.evidence-dialog');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    trigger.addEventListener('click', () => {
      if (dialog.open) return;
      dialog.showModal();
      dialog.querySelector('.drawer-close')?.focus();
    });

    dialog.querySelector('.drawer-close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => trigger.focus());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  // Keep browser-owned scrolling on editorial pages. The local Lenis build
  // intercepts wheel events and can stall when its RAF loop is not running.
  document.documentElement.classList.add('subpage-native-scroll');

  if (motionPreference.matches) return;

  const staggerGroups = new Map();
  revealTargets.forEach((element) => {
    if (element.matches('.principle')) {
      element.classList.remove('kf-reveal-init');
      element.style.removeProperty('transform');
    }

    const group = element.matches('.principle')
      ? element.closest('.principles-grid')
      : element.matches('.detail-card')
        ? element.closest('.detail-grid')
        : element.matches('.contact-list a')
          ? element.closest('.contact-list')
          : null;

    if (group) {
      const index = staggerGroups.get(group) || 0;
      element.dataset.motionIndex = String(index);
      staggerGroups.set(group, index + 1);
    }

    element.classList.add('subpage-reveal');
  });

  const revealWithoutGsap = () => {
    if (!revealTargets.length) return;

    // Fail open: content must remain readable even if IntersectionObserver is
    // unavailable or its setup fails.
    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    document.body.classList.add('subpage-motion-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

    revealTargets.forEach((element) => observer.observe(element));
  };

  const loadLocalScript = (file) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL(file, motionScriptUrl).href;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const initScrollSkew = () => {
    if (!skewTargets.length) return;

    const activeTargets = new Set();
    if ('IntersectionObserver' in window) {
      const targetObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activeTargets.add(entry.target);
          else {
            activeTargets.delete(entry.target);
            entry.target.style.removeProperty('transform');
          }
        });
      }, { rootMargin: '120px 0px' });
      skewTargets.forEach((element) => targetObserver.observe(element));
    } else {
      skewTargets.forEach((element) => activeTargets.add(element));
    }

    let currentSkew = 0;
    let targetSkew = 0;
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let frame = 0;
    const clearSkew = () => {
      activeTargets.forEach((element) => element.style.removeProperty('transform'));
      currentSkew = 0;
      targetSkew = 0;
      frame = 0;
    };

    const animateSkew = () => {
      if (motionPreference.matches) {
        clearSkew();
        return;
      }
      currentSkew += (targetSkew - currentSkew) * 0.12;
      targetSkew *= 0.88;

      if (Math.abs(currentSkew) > 0.005) {
        const transform = `skewY(${currentSkew.toFixed(3)}deg)`;
        activeTargets.forEach((element) => { element.style.transform = transform; });
      } else {
        activeTargets.forEach((element) => { element.style.removeProperty('transform'); });
        frame = 0;
        return;
      }

      frame = requestAnimationFrame(animateSkew);
    };

    window.addEventListener('scroll', () => {
      if (motionPreference.matches) return;
      const now = performance.now();
      const elapsed = Math.max(1, now - lastScrollTime);
      const velocity = ((window.scrollY - lastScrollY) / elapsed) * 10;
      targetSkew = Math.max(-12, Math.min(12, velocity)) * 0.28;
      lastScrollY = window.scrollY;
      lastScrollTime = now;

      if (!frame) frame = requestAnimationFrame(animateSkew);
    }, { passive: true });
    motionPreference.addEventListener?.('change', (event) => {
      if (event.matches) clearSkew();
    });
  };

  const initMotion = () => {
    if (!window.gsap || !window.ScrollTrigger) {
      revealWithoutGsap();
      initScrollSkew();
      return;
    }

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    document.body.classList.add('subpage-motion-ready', 'subpage-motion-gsap');

    revealTargets.forEach((element) => {
      const index = Number(element.dataset.motionIndex || 0);
      gsap.fromTo(element,
        { y: 42, opacity: 0, scale: 0.99 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.78,
          delay: Math.min(index * 0.055, 0.22),
          ease: 'power3.out',
          clearProps: 'willChange',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        });
    });

    initScrollSkew();

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh, { once: true });
    document.fonts?.ready?.then(refresh).catch(() => {});

    motionPreference.addEventListener?.('change', (event) => {
      if (!event.matches) return;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.set(revealTargets, { clearProps: 'all' });
    });
  };

  if (window.gsap && window.ScrollTrigger) {
    initMotion();
  } else {
    loadLocalScript('./gsap.min.js')
      .then(() => loadLocalScript('./ScrollTrigger.min.js'))
      .then(initMotion)
      .catch(() => {
        revealWithoutGsap();
        initScrollSkew();
      });
  }
})();
