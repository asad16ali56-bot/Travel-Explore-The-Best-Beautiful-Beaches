document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = hamburger.querySelector('i');
    const isOpen = navLinks.classList.contains('open');
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-xmark', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelector('i').classList.add('fa-bars');
      hamburger.querySelector('i').classList.remove('fa-xmark');
    });
  });

  /* ---------- Active link highlight on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let current = sections[0]?.id;
    const scrollPos = window.scrollY + 140;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) current = section.id;
    });
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.info__text, .info__images, .place-card, .section-title, .stats, .experience__images, .video-tour__frame, .choose-card, .newsletter__box'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Animated stat counters ---------- */
  const statEls = document.querySelectorAll('.stat h3[data-count]');

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => statObserver.observe(el));

  /* ---------- Video modal ---------- */
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const openTriggers = [document.getElementById('playVideo'), document.getElementById('playHero')];
  const closeBtn = document.getElementById('closeModal');

  const openModal = (e) => {
    e.preventDefault();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalVideo.play().catch(() => {});
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modalVideo.pause();
    modalVideo.currentTime = 0;
  };

  openTriggers.forEach(btn => btn && btn.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ---------- Newsletter form ---------- */
  const form = document.getElementById('newsletterForm');
  const msg = document.getElementById('newsletterMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input').value.trim();
    if (email) {
      msg.textContent = `Thanks! We'll send updates to ${email}.`;
      form.reset();
    }
  });

  /* ---------- Back to top ---------- */
  document.getElementById('toTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
