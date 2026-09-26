// ═══════════════════════════════════════════════════════════
// ADARSH TOURS & TRAVELS — DRIVEX ENGINE & FLEET SYSTEM
// ═══════════════════════════════════════════════════════════

// ─── FLEET DATA ───
const fleetData = [
  {
    id: "dzire",
    name: "Maruti Suzuki Dzire (2026)",
    category: "sedan",
    tag: "Economy Sedan",
    seats: 4,
    ac: "Chilled AC",
    bags: 2,
    price: "₹2,500",
    unit: "/day",
    img: "assets/swift-dzire.png",
    pkg: "8h / 80km (Toll & Parking Inc.)"
  },
  {
    id: "crysta",
    name: "Toyota Innova Crysta",
    category: "muv",
    tag: "Executive MUV",
    seats: 7,
    ac: "Dual AC",
    bags: 5,
    price: "₹3,500",
    unit: "/day",
    img: "assets/innova-crysta.png",
    pkg: "8h / 80km (Toll & Parking Inc.)"
  },
  {
    id: "hycross",
    name: "Toyota Innova Hycross",
    category: "suv",
    tag: "Hybrid Luxury",
    seats: 7,
    ac: "Dual AC",
    bags: 5,
    price: "₹3,500",
    unit: "/day",
    img: "assets/innova-hycross.jpg",
    pkg: "8h / 80km (Toll & Parking Inc.)"
  },
  {
    id: "carens",
    name: "Kia Carens",
    category: "muv",
    tag: "Premium MPV",
    seats: 6,
    ac: "Dual AC",
    bags: 4,
    price: "₹3,000",
    unit: "/day",
    img: "assets/kia-carens.png",
    pkg: "8h / 80km (Toll & Parking Inc.)"
  },
  {
    id: "ertiga",
    name: "Maruti Suzuki Ertiga",
    category: "muv",
    tag: "Family MUV",
    seats: 7,
    ac: "Front & Rear AC",
    bags: 3,
    price: "₹3,000",
    unit: "/day",
    img: "assets/ertiga.png",
    pkg: "8h / 80km (Toll & Parking Inc.)"
  },
  {
    id: "aura",
    name: "Hyundai Aura",
    category: "sedan",
    tag: "City Sedan",
    seats: 4,
    ac: "Chilled AC",
    bags: 2,
    price: "₹2,500",
    unit: "/day",
    img: "assets/hyundai-aura.png",
    pkg: "8h / 80km (Toll & Parking Inc.)"
  }
];

// Wishlist state
const wishlist = new Set();

// ─── DOM REFERENCES ───
const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const fleetGrid = document.getElementById("fleetGrid");
const fleetFilterTabs = document.getElementById("fleetFilterTabs");
const searchTabs = document.getElementById("searchTabs");
const searchFrom = document.getElementById("searchFrom");
const pickupLocationInput = document.getElementById("pickupLocationInput");
const pickupDateInput = document.getElementById("pickupDateInput");
const dropDateInput = document.getElementById("dropDateInput");
const viewAllCars = document.getElementById("viewAllCars");

let currentTripType = "Local";

// ─── INITIALIZE DATES ───
function initDates() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = d => d.toISOString().split("T")[0];

  if (pickupDateInput) {
    pickupDateInput.value = formatDate(today);
    pickupDateInput.min = formatDate(today);
  }
  if (dropDateInput) {
    dropDateInput.value = formatDate(tomorrow);
    dropDateInput.min = formatDate(today);
  }
}

// ─── RENDER VEHICLES GRID ───
function renderFleet(filter = "all") {
  if (!fleetGrid) return;

  const cars = filter === "all"
    ? fleetData
    : fleetData.filter(car => car.category === filter || (filter === "suv" && car.category === "suv"));

  fleetGrid.innerHTML = cars.map(car => {
    const isWished = wishlist.has(car.id);
    return `
      <article class="vehicle-card" data-id="${car.id}">
        <!-- Top Wishlist Heart -->
        <div class="card-top-action">
          <button class="btn-wishlist ${isWished ? 'active' : ''}" 
                  onclick="toggleWishlist('${car.id}', this)" 
                  aria-label="Save to Wishlist">
            <i class="${isWished ? 'ph-fill ph-heart' : 'ph ph-heart'}"></i>
          </button>
        </div>

        <!-- Car Image -->
        <div class="card-car-thumb">
          <img src="${car.img}" alt="${car.name}" class="card-car-img" loading="lazy">
        </div>

        <!-- Car Body -->
        <div class="card-car-body">
          <span class="card-car-category">${car.tag}</span>
          <h3 class="card-car-title">${car.name}</h3>

          <!-- Specs Row -->
          <div class="card-specs-row">
            <span class="spec-item"><i class="ph-bold ph-users"></i> ${car.seats} Seats</span>
            <span class="spec-item"><i class="ph-bold ph-snowflake"></i> ${car.ac}</span>
            <span class="spec-item"><i class="ph-bold ph-suitcase-simple"></i> ${car.bags} Bags</span>
          </div>

          <!-- Bottom Footer -->
          <div class="card-car-footer">
            <div class="price-box">
              <span class="price-val">${car.price}</span>
              <span class="price-unit">${car.unit}</span>
            </div>
            <button class="btn-card-book" onclick="bookCar('${car.name}', '${car.pkg}')">
              BOOK NOW
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// ─── TOGGLE WISHLIST ───
function toggleWishlist(carId, btn) {
  if (wishlist.has(carId)) {
    wishlist.delete(carId);
    btn.classList.remove("active");
    btn.querySelector("i").className = "ph ph-heart";
  } else {
    wishlist.add(carId);
    btn.classList.add("active");
    btn.querySelector("i").className = "ph-fill ph-heart";
  }
}

// ─── FLEET FILTER HANDLING ───
if (fleetFilterTabs) {
  fleetFilterTabs.addEventListener("click", e => {
    const btn = e.target.closest(".v-filter-btn");
    if (!btn) return;
    fleetFilterTabs.querySelectorAll(".v-filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderFleet(btn.dataset.filter);
  });
}

if (viewAllCars) {
  viewAllCars.addEventListener("click", () => {
    if (fleetFilterTabs) {
      fleetFilterTabs.querySelectorAll(".v-filter-btn").forEach(b => b.classList.remove("active"));
      fleetFilterTabs.querySelector('[data-filter="all"]')?.classList.add("active");
    }
    renderFleet("all");
  });
}

// ─── SEARCH WIDGET TAB SWITCHING ───
if (searchTabs) {
  searchTabs.addEventListener("click", e => {
    const tab = e.target.closest(".search-tab");
    if (!tab) return;
    searchTabs.querySelectorAll(".search-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentTripType = tab.dataset.type;

    // Update field cues based on selected tab
    if (currentTripType === "Local") {
      pickupLocationInput.placeholder = "Enter Mumbai pickup location";
    } else if (currentTripType === "Outstation") {
      pickupLocationInput.placeholder = "Enter pickup city & destination (e.g. Pune, Shirdi)";
    } else if (currentTripType === "Airport") {
      pickupLocationInput.placeholder = "Enter Airport Terminal (T1 / T2) or Address";
    }
  });
}

// ─── SEARCH FORM SUBMISSION (DIRECT WHATSAPP QUOTE) ───
if (searchForm) {
  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const loc = pickupLocationInput ? pickupLocationInput.value : "Mumbai";
    const pDate = pickupDateInput ? pickupDateInput.value : "Today";
    const pTime = document.getElementById("pickupTime")?.value || "10:00 AM";
    const dDate = dropDateInput ? dropDateInput.value : "Same Day";
    const dTime = document.getElementById("dropTime")?.value || "06:00 PM";

    const msg = `Hi Adarsh Tours & Travels! 👋\n\nI want to book / search for a car:\n` +
      `🚗 Trip Type: ${currentTripType}\n` +
      `📍 Location: ${loc}\n` +
      `📅 Pickup: ${pDate} at ${pTime}\n` +
      `🏁 Return/Drop: ${dDate} at ${dTime}\n\n` +
      `Please share available cars and best package rates!`;

    window.open(`https://wa.me/918767629236?text=${encodeURIComponent(msg)}`, "_blank");
  });
}

// ─── CAR BOOKING TRIGGER ───
function bookCar(carName, pkg = "8h / 80km Package") {
  const msg = `Hi Adarsh Tours & Travels! 👋\n\nI want to book: *${carName}*\nPackage: ${pkg}\n\nPlease confirm availability and driver pickup details.`;
  window.open(`https://wa.me/918767629236?text=${encodeURIComponent(msg)}`, "_blank");
}

// ─── SERVICE BOOKING TRIGGER ───
function bookServiceDirect(serviceName) {
  const msg = `Hi Adarsh Tours & Travels! 👋\n\nI would like to inquire / book: *${serviceName}*.\nPlease share tariff details and availability.`;
  window.open(`https://wa.me/918767629236?text=${encodeURIComponent(msg)}`, "_blank");
}

// ─── PROMO DISCOUNT CLAIM TRIGGER ───
function claimDiscount() {
  const msg = `Hi Adarsh Tours & Travels! 👋\n\nI'd like to claim the *20% OFF* promotional discount on my car booking.\nPlease share available offers!`;
  window.open(`https://wa.me/918767629236?text=${encodeURIComponent(msg)}`, "_blank");
}

// ─── ICONIC PLACE TOUR BOOKING TRIGGER ───
function bookTourForPlace(placeName) {
  const msg = `Hi Adarsh Tours & Travels! 👋\n\nI want to book the *1-Day Mumbai Sight Seeing By Air Cool Car Package* (24 Hours Service).\n\nSelected Spot / Landmark:\n📍 *${placeName}*\n\nPlease share available AC car options and best rates!`;
  window.open(`https://wa.me/918767629236?text=${encodeURIComponent(msg)}`, "_blank");
}

// ─── NEWSLETTER HANDLING ───
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector("input[type='email']");
  if (input && input.value) {
    alert("Thank you for subscribing to Adarsh Tours & Travels! You'll receive our best festive travel offers.");
    input.value = "";
  }
}

// ─── STICKY HEADER & ACTIVE NAV LINKS ───
window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }

  // Active section spy
  const sections = document.querySelectorAll("section[id], footer[id]");
  const scrollY = window.scrollY + 120;

  sections.forEach(sec => {
    const id = sec.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
});

// ─── MOBILE MENU TOGGLE ───
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.className = mainNav.classList.contains("open") ? "ph ph-x" : "ph ph-list";
    }
  });

  mainNav.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      const icon = menuToggle.querySelector("i");
      if (icon) icon.className = "ph ph-list";
    });
  });
}

// ─── INTERACTIVE DRAGGABLE & SWIPEABLE ANNOUNCEMENT TICKER ───
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
    } catch (err) { }
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
      } catch (err) { }
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

// ─── ICONIC PLACES FILTER TABS ───
function initPlacesFilter() {
  const tabsContainer = document.getElementById("placesFilterTabs");
  const grid = document.getElementById("placesGrid");
  if (!tabsContainer || !grid) return;

  const cards = grid.querySelectorAll(".place-card");

  tabsContainer.addEventListener("click", e => {
    const btn = e.target.closest(".place-filter-btn");
    if (!btn) return;

    tabsContainer.querySelectorAll(".place-filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.placeFilter;

    cards.forEach(card => {
      const category = card.dataset.category;
      if (filter === "all" || category === filter) {
        card.style.display = "flex";
        card.style.opacity = "0";
        card.style.transform = "translateY(15px)";
        setTimeout(() => {
          card.style.transition = "opacity 0.35s ease, transform 0.35s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 30);
      } else {
        card.style.display = "none";
      }
    });
  });
}

// ─── POLICY & LEGAL MODAL SYSTEM ───
function openPolicyModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePolicyModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function closeAllPolicyModals() {
  document.querySelectorAll(".policy-modal-overlay").forEach(modal => {
    modal.classList.remove("active");
  });
  document.body.style.overflow = "";
}

// Close modal when clicking dark backdrop overlay
document.addEventListener("click", e => {
  if (e.target.classList.contains("policy-modal-overlay")) {
    closeAllPolicyModals();
  }
});

// Close modal when pressing ESC key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeAllPolicyModals();
  }
});

// ─── INITIALIZATION ───
document.addEventListener("DOMContentLoaded", () => {
  initDates();
  renderFleet();
  initAnnounceTicker();
  initPlacesFilter();
});
