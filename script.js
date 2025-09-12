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
function viewMonastery(id) {
  // Enhanced monastery detail view with animation
  const button = event.target
  button.style.transform = "scale(0.95)"
  button.innerHTML = "Loading..."

  setTimeout(() => {
    button.style.transform = "scale(1)"
    button.innerHTML = "Learn More"
    console.log(`Viewing monastery with ID: ${id}`)
    alert(`Opening detailed view for monastery ${id}`)
  }, 500)
}

function openGalleryItem(index) {
  // Enhanced gallery lightbox with animation
  const galleryItem = event.currentTarget
  galleryItem.style.transform = "scale(1.1)"

  setTimeout(() => {
    galleryItem.style.transform = "scale(1.05)"
    console.log(`Opening gallery item: ${index}`)
    alert(`Opening gallery item ${index + 1}`)
  }, 200)
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
