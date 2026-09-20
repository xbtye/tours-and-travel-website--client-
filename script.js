// ═══════ FLEET DATA ═══════
const fleet = [
  {
    name: "Maruti Suzuki Dzire (2026)",
    type: "Sedan · Modern Comfort · AC",
    cat: "sedan",
    seats: 4, ac: "AC", bags: 2,
    price: "₹2,500", unit: " onwards",
    badge: "NEW 2026", badgeCls: "b-popular",
    img: "assets/swift-dzire-2026.jpg"
  },
  {
    name: "Toyota Innova Crysta",
    type: "MUV · Executive Class · Spacious",
    cat: "muv",
    seats: 7, ac: "Dual AC", bags: 5,
    price: "₹3,500", unit: " onwards",
    badge: "PREMIUM", badgeCls: "b-premium",
    img: "assets/innova-crysta.png"
  },
  {
    name: "Toyota Innova Hycross",
    type: "Hybrid MUV / SUV · Ultra Luxury",
    cat: ["muv", "suv"],
    seats: 7, ac: "Dual AC", bags: 5,
    price: "₹3,500", unit: " onwards",
    badge: "HYBRID", badgeCls: "b-hybrid",
    img: "assets/innova-hycross.jpg"
  },
  {
    name: "Kia Carens",
    type: "MPV / SUV · Premium 3-row",
    cat: ["muv", "suv"],
    seats: 6, ac: "Dual AC", bags: 4,
    price: "₹3,000", unit: " onwards",
    badge: "LUXURY", badgeCls: "b-new",
    img: "assets/kia-carens.png"
  },
  {
    name: "Maruti Suzuki Ertiga",
    type: "MPV · Economical · Spacious",
    cat: "muv",
    seats: 7, ac: "AC", bags: 3,
    price: "₹3,000", unit: " onwards",
    badge: "BUDGET", badgeCls: "b-budget",
    img: "assets/ertiga.png"
  },
  {
    name: "Hyundai Aura",
    type: "Sedan · Smooth City Ride · AC",
    cat: "sedan",
    seats: 4, ac: "AC", bags: 2,
    price: "₹2,500", unit: " onwards",
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
  const cars = filter === "all" 
    ? fleet 
    : fleet.filter(c => Array.isArray(c.cat) ? c.cat.includes(filter) : c.cat === filter);
  fleetGrid.innerHTML = cars.map(c => {
    let specs = `<span class="fleet-spec"><i class="ph ph-users"></i> ${c.seats} Seats</span>`;
    specs += `<span class="fleet-spec"><i class="ph ph-snowflake"></i> ${c.ac}</span>`;
    if (!c.noBags && c.bags > 0) specs += `<span class="fleet-spec"><i class="ph ph-suitcase-simple"></i> ${c.bags} Bags</span>`;
    if (c.noBags) specs += `<span class="fleet-spec"><i class="ph ph-flower-tulip"></i> Decorated</span>`;
    return `
      <div class="fleet-card visible">
        <div class="fleet-thumb">
          <span class="fleet-badge ${c.badgeCls}">${c.badge}</span>
          <img src="${c.img}" alt="${c.name}">
        </div>
        <div class="fleet-body">
          <h3>${c.name}</h3>
          <p class="fleet-type">${c.type}</p>
          <div class="fleet-specs">${specs}</div>
          <div class="fleet-foot">
            <div class="fleet-price-col">
              <span class="fleet-price">${c.price}<small>${c.unit}</small></span>
              <span class="fleet-pkg-sub">1 Day (8h / 80km)</span>
            </div>
            <button class="btn-book" onclick="bookCar('${c.name}')">Book Now</button>
          </div>
        </div>
      </div>`;
  }).join("");
  // Re-bind Framer Motion mouse effects
  initFramerEffects();
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
  const msg = encodeURIComponent(`Hi Adarsh Tours, I'd like to book: ${carName}\nPackage: One Day (8 Hours / 80 Kms - Toll & Parking Included)\nPlease confirm availability.`);
  window.open(`https://wa.me/918767629236?text=${msg}`, "_blank");
}

// ═══════ BOOK SERVICE (WhatsApp) ═══════
function bookService(serviceName) {
  const msg = encodeURIComponent(`Hi Adarsh Tours, I'd like to book / inquire about: ${serviceName}.\nPlease share pricing and availability.`);
  window.open(`https://wa.me/918767629236?text=${msg}`, "_blank");
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

// ═══════ SCROLL REVEAL (FRAMER MOTION STAGGERED SPRING) ═══════
function initReveal() {
  document.querySelectorAll(".testi-card, .sec-head").forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 4) * 0.09}s`;
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { 
      if (e.isIntersecting) { 
        e.target.classList.add("visible"); 
        obs.unobserve(e.target); 
      } 
    });
  }, { threshold: 0.05, rootMargin: "150px 0px 150px 0px" });
  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
  
  // Immediately show all elements if in full-page screenshot mode
  if (window.innerHeight > 2500) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
  }
  
  // Re-bind Framer Motion mouse effects
  initFramerEffects();
}

// ═══════ FRAMER MOTION 3D TILT EFFECT & MAGNETIC BUTTONS ═══════
function initFramerEffects() {
  // Magnetic Buttons Effect
  document.querySelectorAll('.btn-cta:not(.btn-submit), .btn-ghost, .fab').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0) scale(1.03)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // 3D Card Tilt Effect (Removed .booking-card and .hero-poster-card to keep them stable and fixed)
  document.querySelectorAll('.svc-card, .fleet-card, .why-card, .benefit-card, .testi-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
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
    window.open(`https://wa.me/918767629236?text=${encodeURIComponent(msg)}`, "_blank");
  });
}

// ═══════ SMOOTH SCROLL ═══════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", function (e) {
    const t = document.querySelector(this.getAttribute("href"));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });
});

// ═══════ INTERACTIVE DRAGGABLE & SWIPEABLE ANNOUNCEMENT TICKER ═══════
function initAnnounceTicker() {
  const bar = document.querySelector(".announce-bar");
  const track = document.querySelector(".announce-ticker-track");
  if (!bar || !track) return;

  // Disable CSS static animation so JS controls movement
  track.style.animation = "none";

  // Ensure at least 4 identical blocks for seamless infinite 360 wrap
  while (track.children.length < 4) {
    const clone = track.children[0].cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  }

  let singleWidth = track.children[0].offsetWidth;
  window.addEventListener("resize", () => {
    if (track.children[0]) {
      singleWidth = track.children[0].offsetWidth;
    }
  });

  // Start in middle block
  let currentX = -singleWidth;
  let isDragging = false;
  let hasDragged = false;
  let startX = 0;
  let dragStartX = 0;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let currentVelocity = -45; // Default auto-scroll speed (px/s)
  const defaultSpeed = -45;
  let isHovered = false;

  // Prevent native browser link drag
  bar.addEventListener("dragstart", e => e.preventDefault());

  // Mouse hover pause (Desktop)
  bar.addEventListener("mouseenter", () => {
    isHovered = true;
  });
  bar.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  // Pointer Down (Windows Mouse Click or Mobile Finger Touch)
  bar.addEventListener("pointerdown", e => {
    isDragging = true;
    hasDragged = false;
    startX = e.clientX;
    dragStartX = currentX;
    lastX = e.clientX;
    lastTime = performance.now();
    velocity = 0;
    bar.classList.add("grabbing");
    try {
      bar.setPointerCapture(e.pointerId);
    } catch (err) {}
  });

  // Pointer Move (Mouse Drag or Finger Slide)
  bar.addEventListener("pointermove", e => {
    if (!isDragging) return;

    const diff = e.clientX - startX;
    if (Math.abs(diff) > 4) {
      hasDragged = true;
    }

    currentX = dragStartX + diff;

    // Track velocity for flick momentum
    const now = performance.now();
    const dt = (now - lastTime) / 1000;
    if (dt > 0.008) {
      velocity = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastTime = now;
    }

    // Seamless infinite wrap in both directions
    while (singleWidth > 0 && currentX > -singleWidth) currentX -= singleWidth;
    while (singleWidth > 0 && currentX < -2 * singleWidth) currentX += singleWidth;

    track.style.transform = `translate3d(${currentX}px, 0, 0)`;
  });

  // Pointer Up / Cancel (Release Mouse or Lift Finger)
  const onPointerEnd = e => {
    if (!isDragging) return;
    isDragging = false;
    bar.classList.remove("grabbing");

    if (bar.hasPointerCapture && bar.hasPointerCapture(e.pointerId)) {
      try {
        bar.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }

    // Clamp flick velocity
    currentVelocity = Math.max(-900, Math.min(900, velocity));

    setTimeout(() => {
      hasDragged = false;
    }, 80);
  };

  bar.addEventListener("pointerup", onPointerEnd);
  bar.addEventListener("pointercancel", onPointerEnd);

  // Prevent link navigation if user was dragging/sliding
  track.addEventListener(
    "click",
    e => {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );

  // Animation Loop: Auto-scroll & smooth inertia
  let lastFrameTime = performance.now();
  function tick(now) {
    const dt = Math.min((now - lastFrameTime) / 1000, 0.1);
    lastFrameTime = now;

    if (!isDragging) {
      const targetSpeed = isHovered ? 0 : defaultSpeed;

      // Smooth deceleration / transition to targetSpeed
      if (Math.abs(currentVelocity - targetSpeed) > 1) {
        currentVelocity += (targetSpeed - currentVelocity) * Math.min(dt * 3.5, 0.18);
      } else {
        currentVelocity = targetSpeed;
      }

      currentX += currentVelocity * dt;

      // Infinite wrap seamlessly in both directions
      while (singleWidth > 0 && currentX > -singleWidth) currentX -= singleWidth;
      while (singleWidth > 0 && currentX < -2 * singleWidth) currentX += singleWidth;

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// Start ticker
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnnounceTicker);
} else {
  initAnnounceTicker();
}

