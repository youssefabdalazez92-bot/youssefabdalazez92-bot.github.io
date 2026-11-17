const projects = [
  {title:"Website Promotional Video",category:"Marketing & UGC",type:"Brand / Website Video",id:"17GrshMKTShKhRypMUbmisd5ACoeXHWMe"},
  {title:"Motion Graphics Showcase",category:"Marketing & UGC",type:"Motion Graphics",id:"1AC5g2gVyAzDTTNMeX5pozDOke_PpwOAQ"},
  {title:"Brand Marketing Video",category:"Marketing & UGC",type:"Marketing Video",id:"1PMs4ag3bWoUuD67SFjkXzpzLrrIT50Gt"},
  {title:"Marketing Campaign Video",category:"Marketing & UGC",type:"Marketing Video",id:"1ODjY8ti2oP5ukcFAgetpMdVCH5n3KeIo"},
  {title:"Commercial Campaign Edit",category:"Marketing & UGC",type:"Commercial Edit",id:"1uNroXhXzm9mBEhojqfpFiElzotSlkZuh"},
  {title:"Commercial Promotional Video",category:"Marketing & UGC",type:"Commercial Edit",id:"18H5ahyhk0mpRVglbJa2CTAIfZ0aVN-Rh"},
  {title:"BAIC Automotive Commercial",category:"Automotive",type:"Automotive Commercial",id:"1w3nQW4XlAAwfU43AK-vB9lOuRdWewh4N"},
  {title:"Automotive Storytelling Reel",category:"Automotive",type:"Automotive Reel",id:"1s2-d9taKbEjVim5l29E80HgwQSOwX_2N"},
  {title:"Physiotherapy – Clinic Introduction",category:"Medical & Lifestyle",type:"Medical Video",id:"18vcgeWGcvyt6OhSNdmyzXy6IJPPFSIvF"},
  {title:"Fitness Video Edit",category:"Medical & Lifestyle",type:"Fitness Video",id:"1VVsd3ou-KZEFamRKk26uYSsrPBK_owG8"}
];

const longFormVideos = [
  {title:"تحدي من 0$ إلى 100$ مليار في ساعة",category:"Gaming",id:"13gfZhSUuuY"},
  {title:"من نوب إلى محترف خلال ساعة فقط",category:"Gaming",id:"jb-Yt52J2RY"},
  {title:"عطني 13 دقيقة.. وبعلمك تبني بيزنس",category:"Business & AI",id:"SbE9lclAD4o"},
  {title:"بنيت مشروع منتجات رقمية باستخدام Genspark AI",category:"Business & AI",id:"d_MZZdnZ5XI"}
];

const categories = ["All work", ...new Set(projects.map(project => project.category))];
const filters = document.getElementById("filters");
const grid = document.getElementById("projects");
const featuredGrid = document.getElementById("featured-projects");
const longFormGrid = document.getElementById("long-form-projects");
const featuredIds = [
  "18vcgeWGcvyt6OhSNdmyzXy6IJPPFSIvF",
  "1w3nQW4XlAAwfU43AK-vB9lOuRdWewh4N",
  "1AC5g2gVyAzDTTNMeX5pozDOke_PpwOAQ"
];
const modal = document.getElementById("modal");
const player = document.getElementById("player");
let activeCategory = "All work";
let activeLongFormCategory = "All";

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}

function renderFilters() {
  filters.innerHTML = categories.map(category => `<button class="filter ${category === activeCategory ? "active" : ""}" data-category="${escapeHTML(category)}" type="button">${escapeHTML(category)}</button>`).join("");
  filters.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    renderFilters();
    renderProjects();
  }));
}

function projectCard(project, index, featured = false) {
  const safeTitle = escapeHTML(project.title);
  const isFeatured = featured || featuredIds.includes(project.id);
  const thumbnail = `https://drive.google.com/thumbnail?id=${encodeURIComponent(project.id)}&sz=w1200`;
  const orientation = "portrait";
  return `<article class="project">
    <button class="thumb" data-id="${project.id}" data-title="${safeTitle}" data-orientation="${orientation}" aria-label="Play ${safeTitle}" type="button">
      <img src="${thumbnail}" alt="${safeTitle} preview" loading="lazy" onerror="this.style.opacity='.15'">
      <span class="play" aria-hidden="true">▶</span>
    </button>
    <div class="project-meta"><div>${isFeatured ? '<span class="featured-tag">✳ Featured project</span>' : ''}<h3>${safeTitle}</h3><small>${escapeHTML(project.type)}</small></div><span class="project-num">${String(index + 1).padStart(2,"0")}</span></div>
  </article>`;
}
function attachDriveVideoHandlers(container) {
  container.querySelectorAll(".thumb[data-id]").forEach(button =>
    button.addEventListener("click", () =>
      openVideo(
        button.dataset.id,
        button.dataset.title,
        "drive",
        button.dataset.orientation || "landscape"
      )
    )
  );
}

function renderFeatured() {
  const featured = featuredIds.map(id => projects.find(project => project.id === id)).filter(Boolean);
  featuredGrid.innerHTML = featured.map(project => projectCard(project, projects.indexOf(project), true)).join("");
  attachDriveVideoHandlers(featuredGrid);
}

function renderProjects() {
  const visible = projects.filter(project => activeCategory === "All work" || project.category === activeCategory);
  grid.innerHTML = visible.map(project => projectCard(project, projects.indexOf(project), false)).join("");
  attachDriveVideoHandlers(grid);
}

function renderLongFormFilters() {
  document.querySelectorAll(".long-filter").forEach(button => {
    button.classList.toggle("active", button.dataset.longFilter === activeLongFormCategory);
  });
}

document.querySelector(".long-form-filters").addEventListener("click", event => {
  const button = event.target.closest(".long-filter");
  if (!button) return;
  activeLongFormCategory = button.dataset.longFilter;
  renderLongFormFilters();
  renderLongFormVideos();
});

function renderLongFormVideos() {
  const visible = longFormVideos.filter(video => activeLongFormCategory === "All" || video.category === activeLongFormCategory);
  longFormGrid.innerHTML = visible.map(video => {
    const title = escapeHTML(video.title);
    const thumbnail = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
    return `<article class="project">
      <button class="thumb" type="button" data-youtube-id="${video.id}" data-title="${title}" aria-label="Play ${title}">
        <img src="${thumbnail}" alt="${title} thumbnail" loading="lazy">
        <span class="play" aria-hidden="true">▶</span>
      </button>
      <div class="project-meta"><div><span class="project-category">${escapeHTML(video.category)}</span><h3>${title}</h3><small>Long-form video editing</small></div></div>
    </article>`;
  }).join("");
  longFormGrid.querySelectorAll("[data-youtube-id]").forEach(button => button.addEventListener("click", () => openVideo(button.dataset.youtubeId, button.dataset.title, "youtube")));
}

function openVideo(id, title, provider = "drive", orientation = "landscape") {
  document.getElementById("modalTitle").textContent = title;

  const modalInner = document.querySelector(".modal-inner");
  modalInner.classList.toggle("portrait", orientation === "portrait");

  player.src = provider === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`
    : `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeVideo() {
  modal.classList.remove("open");
  player.src = "";
  document.body.style.overflow = "";
}

document.getElementById("close").addEventListener("click", closeVideo);
modal.addEventListener("click", event => { if (event.target === modal) closeVideo(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeVideo(); });

// Keep the service icon in sync with each expandable card.
document.querySelectorAll(".service").forEach(service => service.addEventListener("toggle", () => {
  const mark = service.querySelector(".service-mark");
  if (mark) mark.textContent = service.open ? "×" : "+";
}));

// Contact form: JSON POST contract used by the existing Google Apps Script deployment.
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzSq1-ERRQfUkmbHfcg6zNCtza-ui3594q9DQ8M7lQFyBFh_ehDarXvzw-rjzCEdrg1/exec";
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitButton = contactForm.querySelector("button[type='submit']");

function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status visible ${type}`;
}

contactForm.addEventListener("submit", async event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  if (contactForm.elements.website.value.trim()) return;

  const payload = {
    name: contactForm.elements.name.value.trim(),
    email: contactForm.elements.email.value.trim(),
    service: contactForm.elements.service.value,
    message: contactForm.elements.message.value.trim()
  };

  if (!payload.name || !payload.email || !payload.service || !payload.message) {
    showFormStatus("Please complete all fields before sending.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.querySelector(".submit-label").textContent = "Sending...";
  formStatus.className = "form-status";

  try {
    // text/plain avoids a CORS preflight; Apps Script parses the JSON body in doPost(e).
    // no-cors returns an opaque response, so browser-side status cannot inspect the script body.
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    showFormStatus("Your request was sent from this browser. Delivery could not be confirmed automatically; if it is urgent, please contact me on WhatsApp.", "success");
    contactForm.reset();
  } catch (error) {
    console.error("Contact form submission failed:", error);
    showFormStatus("Something went wrong while sending your inquiry. Please try again or contact me on WhatsApp.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector(".submit-label").textContent = "Send inquiry";
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.getElementById("primary-navigation");
function setMobileMenu(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  primaryNavigation.classList.toggle("mobile-open", open);
}
menuToggle.addEventListener("click", () => {
  setMobileMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});
primaryNavigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMobileMenu(false)));
document.addEventListener("click", event => {
  if (!event.target.closest("nav")) setMobileMenu(false);
});

document.getElementById("year").textContent = new Date().getFullYear();
renderFeatured();
renderFilters();
renderProjects();
renderLongFormFilters();
renderLongFormVideos();
