(() => {
  const config = window.PORTFOLIO_CONFIG || {};
  const projects = Array.isArray(config.projects) ? config.projects : [];
  const services = Array.isArray(config.services) ? config.services : [];
  const marketNames = {
    usa: "USA",
    uk: "UK",
    canada: "Canada",
    "cross-market": "Buyer and seller research"
  };
  const toast = document.querySelector("#toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 4500);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  const navToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    nav.classList.toggle("is-open", !expanded);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  }));

  document.querySelector("#service-grid").innerHTML = services.map((service, index) => `
    <article class="service-card reveal">
      <span class="service-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="service-mark" aria-hidden="true">✳</span>
      <h3>${escapeHtml(service.title)}</h3>
      <p>${escapeHtml(service.description)}</p>
      <span class="service-arrow" aria-hidden="true">↗</span>
    </article>`).join("");

  const projectGrid = document.querySelector("#project-grid");
  const dialog = document.querySelector("#project-dialog");
  const dialogMedia = document.querySelector("#dialog-media");
  let revealObserver;

  function renderProjects(filter = "all") {
    const visibleProjects = projects.filter((project) => filter === "all" || project.market === filter);
    if (revealObserver) {
      projectGrid.querySelectorAll(".reveal").forEach((item) => revealObserver.unobserve(item));
    }
    projectGrid.innerHTML = visibleProjects.map((project, index) => `
      <article class="project-card reveal">
        <button class="project-open" type="button" data-project-id="${escapeHtml(project.id)}" aria-label="View demo brief: ${escapeHtml(project.title)}">
          <span class="project-photo">
            <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" loading="lazy" width="1200" height="900">
            <span class="demo-ribbon">DEMO · NOT A LISTING</span>
            <span class="project-index">0${index + 1}</span>
            <span class="project-open-icon" aria-hidden="true">↗</span>
          </span>
        </button>
        <div class="project-meta">
          <div><span class="project-label">${escapeHtml(project.label)} <i>· DEMO BRIEF</i></span><h3>${escapeHtml(project.title)}</h3></div>
          <button class="project-arrow" type="button" data-project-id="${escapeHtml(project.id)}" aria-label="Open ${escapeHtml(project.title)} demo brief">↗</button>
        </div>
      </article>`).join("");

    if (revealObserver) {
      projectGrid.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
    }
    projectGrid.querySelectorAll("[data-project-id]").forEach((button) => {
      button.addEventListener("click", () => openProject(button.dataset.projectId));
    });
    document.querySelectorAll("[data-count]").forEach((counter) => {
      const category = counter.dataset.count;
      const count = category === "all" ? projects.length : projects.filter((project) => project.market === category).length;
      counter.textContent = String(count).padStart(2, "0");
    });
  }

  function openProject(id) {
    const project = projects.find((item) => item.id === id);
    if (!project) return;
    document.querySelector("#dialog-market").textContent = `${project.label} · DEMO PROJECT BRIEF`;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-description").textContent = project.description;
    document.querySelector("#dialog-source").textContent = "Illustrative stock photography · Unsplash. No active property listing, client, lead data, or result is shown.";
    dialogMedia.innerHTML = `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}"><span class="dialog-demo-mark">DEMO IMAGE · NOT A LISTING</span>`;
    dialog.showModal();
  }

  renderProjects();
  document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderProjects(button.dataset.filter);
  }));
  document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => { dialogMedia.innerHTML = ""; });

  const email = String(config.email || "").trim();
  const emailButton = document.querySelector("#email-button");
  if (email) {
    emailButton.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
  } else {
    emailButton.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("Email contact is unavailable. Please use WhatsApp instead.");
    });
  }

  const whatsappNumber = String(config.whatsapp || "").replace(/\D/g, "");
  const whatsappButton = document.querySelector("#whatsapp-button");
  if (whatsappNumber) {
    whatsappButton.href = `https://wa.me/${whatsappNumber}`;
  } else {
    whatsappButton.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("WhatsApp contact is unavailable. Please use the email link instead.");
    });
  }

  const socialLinks = document.querySelector("#social-links");
  const socials = Array.isArray(config.socials) ? config.socials : [];
  const socialIcons = {
    Facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.4 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.6 1.5-1.6h1.7V3.7c-.3-.1-1.4-.2-2.6-.2-2.6 0-4.3 1.6-4.3 4.5v2H7V13h2.7v8z"/></svg>',
    Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="icon-dot" cx="17.5" cy="6.8" r="1"/></svg>',
    LinkedIn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.7H2.4V21h2.8zM3.8 7.1a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4M21.6 13.9c0-3.7-2-5.4-4.7-5.4a4.1 4.1 0 0 0-3.7 2v-1.8H10.4V21h2.8v-6.1c0-1.6.3-3.2 2.4-3.2s2.1 1.9 2.1 3.3V21h2.8z"/></svg>'
  };
  socialLinks.innerHTML = socials.map((social) => {
    const icon = socialIcons[social.name] || `<span class="social-letter" aria-hidden="true">${escapeHtml(social.name.slice(0, 1))}</span>`;
    return social.url
      ? `<a class="social-icon" href="${escapeHtml(social.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(social.name)}" title="${escapeHtml(social.name)}">${icon}</a>`
      : `<button class="social-icon is-unconfigured" type="button" data-social="${escapeHtml(social.name)}" aria-label="${escapeHtml(social.name)} profile link not configured" title="${escapeHtml(social.name)}">${icon}</button>`;
  }).join("");
  socialLinks.querySelectorAll("[data-social]").forEach((button) => {
    button.addEventListener("click", () => showToast(`Add your ${button.dataset.social} profile URL in portfolio-config.js to enable this icon.`));
  });

  document.querySelector("#current-year").textContent = String(new Date().getFullYear());
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
})();
