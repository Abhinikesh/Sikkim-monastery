// DOM Elements
const navbar = document.getElementById("navbar")
const mobileMenu = document.getElementById("mobile-menu")
const navMenu = document.getElementById("nav-menu")
const darkModeToggle = document.getElementById("dark-mode-toggle")

// Mobile Menu Toggle
mobileMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  mobileMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    mobileMenu.classList.remove("active")
  })
})

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode")
  const isDarkMode = document.body.classList.contains("dark-mode")

  // Update icon with animation
  const icon = darkModeToggle.querySelector("i")
  darkModeToggle.style.transform = "scale(0.8) rotateZ(180deg)"

  setTimeout(() => {
    icon.className = isDarkMode ? "fas fa-sun" : "fas fa-moon"
    darkModeToggle.style.transform = "scale(1) rotateZ(0deg)"
  }, 150)

  // Save preference
  localStorage.setItem("darkMode", isDarkMode)
})

// Load Dark Mode Preference
document.addEventListener("DOMContentLoaded", () => {
  const savedDarkMode = localStorage.getItem("darkMode") === "true"
  if (savedDarkMode) {
    document.body.classList.add("dark-mode")
    darkModeToggle.querySelector("i").className = "fas fa-sun"
  }
})

// Enhanced Parallax Effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxImage = document.querySelector(".parallax-image")
  if (parallaxImage) {
    const speed = scrolled * 0.5
    parallaxImage.style.transform = `translateY(${speed}px)`
  }

  // Parallax effect for hero content
  const heroContent = document.querySelector(".hero-content")
  if (heroContent && scrolled < window.innerHeight) {
    const heroSpeed = scrolled * 0.3
    heroContent.style.transform = `translateY(${heroSpeed}px)`
  }
})

// Enhanced Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      // Special handling for different elements
      if (entry.target.classList.contains("timeline-item")) {
        // Stagger timeline animations
        const items = entry.target.parentElement.querySelectorAll(".timeline-item")
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("animate")
          }, index * 200)
        })
      }

      if (entry.target.tagName === "SECTION") {
        // Animate section elements
        const cards = entry.target.querySelectorAll(".monastery-card, .info-card, .gallery-item")
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.animationDelay = `${index * 0.1}s`
            card.classList.add("animate")
          }, index * 100)
        })
      }
    }
  })
}, observerOptions)

// Observe elements for animations
document.addEventListener("DOMContentLoaded", () => {
  // Observe sections
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => observer.observe(section))

  // Observe timeline items
  const timelineItems = document.querySelectorAll(".timeline-item")
  timelineItems.forEach((item) => observer.observe(item))
})

// Mouse movement parallax effect
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth
  const mouseY = e.clientY / window.innerHeight

  // Subtle parallax for hero elements
  const heroTitle = document.querySelector(".hero-title")
  const heroSubtitle = document.querySelector(".hero-subtitle")

  if (heroTitle && window.scrollY < window.innerHeight) {
    const moveX = (mouseX - 0.5) * 20
    const moveY = (mouseY - 0.5) * 20
    heroTitle.style.transform = `translate(${moveX}px, ${moveY}px)`
    heroSubtitle.style.transform = `translate(${-moveX * 0.5}px, ${-moveY * 0.5}px)`
  }
})

// API Placeholder Functions
async function loadMonasteries() {
  const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      description:
        "The largest monastery in Sikkim, known for its golden stupa and rich Tibetan architecture. Home to the Karmapa lineage.",
      image: "./public/rumtek1.jpg",
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      description:
        "One of the oldest monasteries in Sikkim, offering breathtaking views of Kanchenjunga. A perfect blend of spirituality and nature.",
      image: "./public/spiritual-spots-in-pelling-popular.jpeg",
    },
    {
      id: 3,
      name: "Enchey Monastery",
      description:
        "A 200-year-old monastery known for its annual Cham dance performances and traditional Tibetan Buddhist practices.",
      image: "./public/Enchey_Monastery_in_Gangtok_district,_East_Sikkim.jpg",
    },
  ]

  const grid = document.getElementById("monasteries-grid")
  grid.innerHTML = monasteries
    .map(
      (monastery) => `
    <div class="monastery-card">
      <div class="monastery-image" style="background-image: url('${monastery.image}')"></div>
      <div class="monastery-content">
        <h3 class="monastery-title">${monastery.name}</h3>
        <p class="monastery-description">${monastery.description}</p>
        <button class="learn-more-btn" onclick="viewMonastery(${monastery.id})">Learn More</button>
      </div>
    </div>
  `,
    )
    .join("")
}

async function loadCulturalEvents() {
  const events = [
    {
      date: "March 2024",
      title: "Losar Festival",
      description:
        "Tibetan New Year celebration with traditional dances, butter sculptures, and monastery ceremonies across Sikkim",
    },
    {
      date: "May 2024",
      title: "Buddha Purnima",
      description:
        "Celebration of Buddha's birth with special prayers, meditation sessions, and colorful processions at all major monasteries",
    },
    {
      date: "August 2024",
      title: "Pang Lhabsol",
      description:
        "Guardian deity festival unique to Sikkim featuring spectacular masked dances and traditional warrior ceremonies",
    },
    {
      date: "November 2024",
      title: "Diwali Celebrations",
      description:
        "Festival of lights celebrated across all monasteries with butter lamps, prayers, and community gatherings",
    },
  ]

  const timeline = document.getElementById("timeline")
  timeline.innerHTML = events
    .map(
      (event, index) => `
    <div class="timeline-item">
      <div class="timeline-content">
        <h3><div class="timeline-date">${event.date}</div></h3>
        <h2 class="timeline-title">${event.title}</h2>
        <h3><p class="timeline-description">${event.description}</p></h3>
      </div>
    </div>
  `,
    )
    .join("")

  // Re-observe new timeline items
  const timelineItems = document.querySelectorAll(".timeline-item")
  timelineItems.forEach((item) => observer.observe(item))
}

async function loadGallery() {
  const galleryItems = [
    {
      type: "image",
      src: "public/rumtek1.jpg",
      alt: "Traditional Prayer Wheels",
    },
    {
      type: "video",
      src: "/placeholder.mp4",
      thumbnail: "/monks-chanting-ceremony.jpg",
      alt: "Monks Chanting Ceremony",
    },
    {
      type: "image",
      src: "/colorful-prayer-flags-mountains.jpg",
      alt: "Prayer Flags Against Mountains",
    },
    {
      type: "image",
      src: "/traditional-tibetan-architecture-monastery.jpg",
      alt: "Traditional Monastery Architecture",
    },
    {
      type: "video",
      src: "/placeholder.mp4",
      thumbnail: "/traditional-mask-dance-performance.jpg",
      alt: "Traditional Mask Dance Performance",
    },
    {
      type: "image",
      src: "/himalayan-sunrise-monastery-silhouette.jpg",
      alt: "Himalayan Sunrise with Monastery",
    },
  ]

  const gallery = document.getElementById("gallery-grid")
  gallery.innerHTML = galleryItems
    .map(
      (item, index) => `
    <div class="gallery-item" onclick="openGalleryItem(${index})">
      <div class="gallery-image" style="background-image: url('${item.type === "video" ? item.thumbnail : item.src}')"></div>
      <div class="gallery-overlay">
        <i class="gallery-play-btn ${item.type === "video" ? "fas fa-play" : "fas fa-expand"}"></i>
      </div>
    </div>
  `,
    )
    .join("")
}

// Enhanced Utility Functions
function viewMonastery(event, id) {
  const button = event.target;
  button.style.transform = "scale(0.95)";
  button.innerHTML = "Loading...";

  setTimeout(() => {
    button.style.transform = "scale(1)";
    button.innerHTML = "Learn More";
    alert(`Opening detailed view for monastery ${id}`);
  }, 500);
}

function openGalleryItem(event, index) {
  const galleryItem = event.currentTarget;
  galleryItem.style.transform = "scale(1.1)";

  setTimeout(() => {
    galleryItem.style.transform = "scale(1.05)";
    alert(`Opening gallery item ${index + 1}`);
  }, 200);
}


// Initialize content when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadMonasteries()
  loadCulturalEvents()
  loadGallery()

  // Add loading animation
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})

// Hero CTA Button Action with enhanced animation
document.addEventListener("DOMContentLoaded", () => {
  const ctaButton = document.querySelector(".cta-button")
  if (ctaButton) {
    ctaButton.addEventListener("click", () => {
      ctaButton.style.transform = "scale(0.95)"
      setTimeout(() => {
        ctaButton.style.transform = "scale(1)"
        document.querySelector("#monasteries").scrollIntoView({
          behavior: "smooth",
        })
      }, 150)
    })
  }
})

// Add scroll-triggered animations for better performance
let ticking = false

function updateAnimations() {
  const scrollTop = window.pageYOffset

  // Update parallax elements
  const parallaxElements = document.querySelectorAll(".parallax-image")
  parallaxElements.forEach((element) => {
    const speed = scrollTop * 0.5
    element.style.transform = `translateY(${speed}px)`
  })

  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateAnimations)
    ticking = true
  }
})

// Initialize map on page load
function initMap() {

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  return map;
}


fetch("http://localhost:3001/monasteries")
  .then(res => res.json())
  .then(data => {
    console.log("Monasteries:", data);
    // Example: add monastery names to a div
    const container = document.getElementById("monastery-list");
    data.forEach(m => {
      const div = document.createElement("div");
      div.textContent = `${m.name} - ${m.location}`;
      container.appendChild(div);
    });
  })
  .catch(err => console.error(err));

  // Initialize Leaflet map centered on Sikkim
const map = L.map('map').setView([27.533, 88.512], 8); // lat, lng, zoom

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Famous monasteries in Sikkim
const monasteries = [
  { name: "Rumtek Monastery", lat: 27.332, lng: 88.613 },
  { name: "Pemayangtse Monastery", lat: 27.299, lng: 88.239 },
  { name: "Tashiding Monastery", lat: 27.322, lng: 88.327 },
  { name: "Enchey Monastery", lat: 27.339, lng: 88.605 },
  { name: "Ralong Monastery", lat: 27.095, lng: 88.401 }
];

// Add markers
monasteries.forEach(m => {
  L.marker([m.lat, m.lng])
    .addTo(map)
    .bindPopup(`<b>${m.name}</b>`);
});



const track = document.getElementById('carousel-track');
const carousel = document.getElementById('carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
const visibleCards = 3;
const originalCards = [...track.children];
const cardWidth = track.children[0].offsetWidth + 20; // width + margin

for (let i = 0; i < visibleCards; i++) {
  track.appendChild(originalCards[i].cloneNode(true));
  track.prepend(originalCards[originalCards.length - 1 - i].cloneNode(true));
}

track.style.transform = `translateX(-${cardWidth * visibleCards}px)`;

let interval;

function moveNext() {
  index++;
  track.style.transition = "transform 0.6s ease-in-out";
  track.style.transform = `translateX(-${(visibleCards + index) * cardWidth}px)`;

  if (index >= originalCards.length) {
    setTimeout(() => {
      track.style.transition = "none";
      track.style.transform = `translateX(-${cardWidth * visibleCards}px)`;
      index = 0;
    }, 600);
  }
}

function movePrev() {
  index--;
  track.style.transition = "transform 0.6s ease-in-out";
  track.style.transform = `translateX(-${(visibleCards + index) * cardWidth}px)`;

  if (index < 0) {
    setTimeout(() => {
      track.style.transition = "none";
      track.style.transform = `translateX(-${cardWidth * (visibleCards + originalCards.length - 1)}px)`;
      index = originalCards.length - 1;
    }, 600);
  }
}

function startCarousel() {
  interval = setInterval(moveNext, 2500);
}

function stopCarousel() {
  clearInterval(interval);
}

nextBtn.addEventListener('click', moveNext);
prevBtn.addEventListener('click', movePrev);
carousel.addEventListener('mouseenter', stopCarousel);
carousel.addEventListener('mouseleave', startCarousel);

startCarousel();
