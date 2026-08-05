// ═══════ FLEET DATA ═══════
const fleet = [
  {
    name: "Maruti Suzuki Swift Dzire",
    type: "Sedan · Compact · AC",
    cat: "sedan",
    seats: 4, ac: "AC", bags: 2,
    price: "₹12", unit: "/km",
    badge: "POPULAR", badgeCls: "b-popular",
    img: "assets/swift-dzire.png"
  },
  {
    name: "Toyota Innova Crysta",
    type: "MUV · Premium · Spacious",
    cat: "muv",
    seats: 7, ac: "Dual AC", bags: 5,
    price: "₹20", unit: "/km",
    badge: "PREMIUM", badgeCls: "b-premium",
    img: "assets/innova-crysta.png"
  },
  {
    name: "Kia Carens",
    type: "MPV · Premium 3-row",
    cat: "muv",
    seats: 6, ac: "Dual AC", bags: 4,
    price: "₹18", unit: "/km",
    badge: "NEW", badgeCls: "b-new",
    img: "assets/kia-carens.png"
  },
  {
    name: "Maruti Suzuki Ertiga",
    type: "MPV · CNG · Economical",
    cat: "muv",
    seats: 7, ac: "AC", bags: 3,
    price: "₹15", unit: "/km",
    badge: "BUDGET", badgeCls: "b-budget",
    img: "assets/ertiga.png"
  },

  {
    name: "Hyundai Aura",
    type: "Sedan · Comfortable ride",
    cat: "sedan",
    seats: 4, ac: "AC", bags: 2,
    price: "₹12", unit: "/km",
    badge: "SEDAN", badgeCls: "b-sedan",
    img: "assets/hyundai-aura.png"
  }
];

// ═══════ DOM ═══════
const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const fleetGrid = document.getElementById("fleetGrid");
const fleetTabs = document.getElementById("fleetTabs");
const bookingForm = document.getElementById("bookingForm");

// ═══════ STICKY HEADER ═══════
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

// ═══════ MOBILE MENU ═══════
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mainNav.classList.toggle("open");
});
mainNav.querySelectorAll(".nav-item").forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    mainNav.classList.remove("open");
  });
});

// ═══════ ACTIVE NAV ON SCROLL ═══════
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const y = window.scrollY + 100;
  sections.forEach(s => {
    const link = document.querySelector(`.nav-item[href="#${s.id}"]`);
    if (link) link.classList.toggle("active", y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
  });
});

// ═══════ RENDER FLEET ═══════
function renderFleet(filter = "all") {
  const cars = filter === "all" ? fleet : fleet.filter(c => c.cat === filter);
  fleetGrid.innerHTML = cars.map(c => {
    let specs = `<span class="fleet-spec"><i class="ph ph-users"></i> ${c.seats} Seats</span>`;
    specs += `<span class="fleet-spec"><i class="ph ph-snowflake"></i> ${c.ac}</span>`;
    if (!c.noBags && c.bags > 0) specs += `<span class="fleet-spec"><i class="ph ph-suitcase-simple"></i> ${c.bags} Bags</span>`;
    if (c.noBags) specs += `<span class="fleet-spec"><i class="ph ph-flower-tulip"></i> Decorated</span>`;
    return `
      <div class="fleet-card reveal">
        <div class="fleet-thumb">
          <span class="fleet-badge ${c.badgeCls}">${c.badge}</span>
          <img src="${c.img}" alt="${c.name}" loading="lazy">
        </div>
        <div class="fleet-body">
          <h3>${c.name}</h3>
          <p class="fleet-type">${c.type}</p>
          <div class="fleet-specs">${specs}</div>
          <div class="fleet-foot">
            <span class="fleet-price">${c.price}<small>${c.unit}</small></span>
            <button class="btn-book" onclick="bookCar('${c.name}')">Book Now</button>
          </div>
        </div>
      </div>`;
  }).join("");
  // Re-trigger reveal for new cards
  initReveal();
}
renderFleet();

// ═══════ FLEET FILTER ═══════
fleetTabs.addEventListener("click", e => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  fleetTabs.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  tab.classList.add("active");
  renderFleet(tab.dataset.filter);
});

// ═══════ BOOK CAR (WhatsApp) ═══════
function bookCar(carName) {
  const msg = encodeURIComponent(`Hi, I'd like to book: ${carName}\nPlease share availability and pricing.`);
  window.open(`https://wa.me/919987618778?text=${msg}`, "_blank");
}

// ═══════ COUNTER ANIMATION ═══════
function animateCounters() {
  document.querySelectorAll(".metric-num").forEach(el => {
    const target = parseInt(el.dataset.count);
    const dur = 2000;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  });
}
const metricObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); metricObs.disconnect(); } });
}, { threshold: 0.3 });
const metrics = document.querySelector(".hero-metrics");
if (metrics) metricObs.observe(metrics);

// ═══════ SCROLL REVEAL ═══════
function initReveal() {
  document.querySelectorAll(".svc-card, .fleet-card, .why-card, .testi-card, .sec-head").forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
}
initReveal();

// ═══════ BOOKING FORM ═══════
if (bookingForm) {
  const dateInput = document.getElementById("pickupDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
    dateInput.min = today;
  }
  bookingForm.addEventListener("submit", e => {
    e.preventDefault();
    const trip = document.getElementById("tripType").value;
    const pickup = document.getElementById("pickupLoc").value;
    const drop = document.getElementById("dropLoc").value;
    const date = document.getElementById("pickupDate").value;
    const car = document.getElementById("carPref").value;
    const msg = `Hi Adarsh Tours!\n\nTrip: ${trip}\nPickup: ${pickup || "Not specified"}\nDrop: ${drop || "Not specified"}\nDate: ${date}\nCar: ${car}\n\nPlease confirm availability and fare.`;
    window.open(`https://wa.me/919987618778?text=${encodeURIComponent(msg)}`, "_blank");
  });
}

// ═══════ SMOOTH SCROLL ═══════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", function(e) {
    const t = document.querySelector(this.getAttribute("href"));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });
});
