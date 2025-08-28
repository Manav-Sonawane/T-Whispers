/**
 * T-WHISPERS JAVASCRIPT - ENHANCED WITH CENTERED LAYOUTS
 * Author: Manav-Sonawane
 * Created: 2025-08-08
 * Updated: 2025-08-08 22:06:40 UTC
 * Description: Complete functionality for T-Whispers with improved centering
 */

// ========================================
// GLOBAL VARIABLES AND DATA
// ========================================

// Enhanced sample confessions data with metadata
const sampleConfessions = [
  {
    text: "I still haven't told my parents I changed my major from engineering to art. They think I'm going to be an engineer 😅 Sometimes I practice telling them in the mirror.",
    timestamp: Date.now() - 86400000,
    reactions: { laugh: 5, heart: 3, thumbs_up: 2 },
  },
  {
    text: "I have a huge crush on my lab partner but I'm too shy to say anything. We've been working together for 3 months now and I look forward to those sessions more than anything else.",
    timestamp: Date.now() - 172800000,
    reactions: { heart: 8, cry: 2, surprised: 1 },
  },
  {
    text: "I copied my friend's assignment once and got a better grade than them. I still feel guilty about it and want to confess, but I'm scared it might ruin our friendship.",
    timestamp: Date.now() - 259200000,
    reactions: { cry: 4, thumbs_up: 1, surprised: 2 },
  },
  {
    text: "I pretend to understand everything in advanced calculus but I'm completely lost. Too embarrassed to ask for help because everyone else seems to get it so easily.",
    timestamp: Date.now() - 345600000,
    reactions: { laugh: 6, cry: 8, thumbs_up: 4 },
  },
  {
    text: "I eat lunch alone in the library because I'm too anxious to sit in the cafeteria with other people. But honestly, I've started to enjoy the peaceful solitude.",
    timestamp: Date.now() - 432000000,
    reactions: { heart: 5, cry: 3, thumbs_up: 7 },
  },
  {
    text: "My roommate doesn't know that I can hear them singing in the shower every morning. They're actually really good and it's become my favorite way to wake up!",
    timestamp: Date.now() - 518400000,
    reactions: { laugh: 12, heart: 6, surprised: 2 },
  },
  {
    text: "I've been lying about having experience with coding languages on my resume. Now I'm panicking about interviews and frantically trying to learn everything overnight.",
    timestamp: Date.now() - 604800000,
    reactions: { laugh: 3, cry: 5, surprised: 4 },
  },
  {
    text: "I have a secret TikTok account where I dance and it has more followers than I have friends in real life. It's the only place where I feel truly confident.",
    timestamp: Date.now() - 691200000,
    reactions: { heart: 9, thumbs_up: 6, surprised: 3 },
  },
  {
    text: "I still sleep with a stuffed animal and I'm 20 years old. My college friends don't know and I'm terrified they'll find out during sleepovers.",
    timestamp: Date.now() - 777600000,
    reactions: { heart: 11, laugh: 2, thumbs_up: 5 },
  },
  {
    text: "I applied to our college as a backup but now I love it here more than my first choice. Sometimes the best things come from unexpected places.",
    timestamp: Date.now() - 864000000,
    reactions: { heart: 15, thumbs_up: 8, surprised: 1 },
  },
];

// Application state
let confessions = [...sampleConfessions];
let currentSortOrder = "newest";
let currentTheme = "dark";

// Enhanced reaction system
const reactions = [
  { emoji: "😂", name: "laugh", label: "Funny" },
  { emoji: "😢", name: "cry", label: "Sad" },
  { emoji: "😠", name: "anger", label: "Angry" },
  { emoji: "👍", name: "thumbs_up", label: "Like" },
  { emoji: "❤️", name: "heart", label: "Love" },
  { emoji: "😮", name: "surprised", label: "Wow" },
];

// ========================================
// STAR BACKGROUND FUNCTIONALITY
// ========================================

/**
 * Creates animated stars in the background with different sizes
 */
function createStars() {
  const starsContainer = document.getElementById("stars");
  starsContainer.innerHTML = ""; // Clear existing stars
  const numStars = 300;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    const size = Math.random();

    if (size < 0.7) {
      star.className = "star small";
    } else if (size < 0.9) {
      star.className = "star medium";
    } else {
      star.className = "star large";
    }

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = 2 + Math.random() * 2 + "s";
    starsContainer.appendChild(star);
  }
}

// ========================================
// THEME FUNCTIONALITY
// ========================================

/**
 * Toggles between light and dark themes
 */
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("themeIcon");

  if (currentTheme === "dark") {
    currentTheme = "light";
    body.setAttribute("data-theme", "light");
    themeIcon.textContent = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    currentTheme = "dark";
    body.setAttribute("data-theme", "dark");
    themeIcon.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }

  // Recreate stars for theme change
  createStars();
}

/**
 * Loads the saved theme from localStorage
 */
function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  currentTheme = savedTheme;
  document.body.setAttribute("data-theme", savedTheme);
  document.getElementById("themeIcon").textContent =
    savedTheme === "dark" ? "🌙" : "☀️";
}

// ========================================
// MODAL FUNCTIONALITY
// ========================================

/**
 * Opens the confession submission modal
 */
function openConfessionModal() {
  document.getElementById("confessionModal").showModal();
}

/**
 * Closes the confession modal and resets the form
 */
function closeConfessionModal() {
  document.getElementById("confessionModal").close();
  // Clear form
  document.getElementById("confessionText").value = "";
  document.getElementById("charCount").textContent = "0";
  document.getElementById("charCount").style.color = "";
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Converts timestamp to human-readable time ago format
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Human-readable time difference
 */
function getTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "Just now";
}

/**
 * Updates the statistics display (total confessions and reactions)
 */
function updateStatistics() {
  const totalConfessions = confessions.length;
  const totalReactions = confessions.reduce((sum, confession) => {
    return (
      sum +
      Object.values(confession.reactions || {}).reduce(
        (reactionSum, count) => reactionSum + count,
        0
      )
    );
  }, 0);

  // Update header stats (check if elements exist)
  const headerConfessions = document.getElementById("totalConfessions");
  const headerReactions = document.getElementById("totalReactions");
  
  if (headerConfessions) headerConfessions.textContent = totalConfessions;
  if (headerReactions) headerReactions.textContent = totalReactions;

  // Update footer stats
  const footerConfessions = document.getElementById("footerConfessions");
  const footerReactions = document.getElementById("footerReactions");

  if (footerConfessions) footerConfessions.textContent = totalConfessions;
  if (footerReactions) footerReactions.textContent = totalReactions;
}

/**
 * Shows a toast notification
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error, etc.)
 */
function showToast(title, message, type = "success") {
  const toast = document.createElement("div");
  toast.className = "toast toast-top toast-center z-50";
  toast.innerHTML = `
        <div class="alert bg-gradient-to-r from-orange-600 to-orange-500 text-white border-none shadow-xl">
            <div class="flex items-center gap-3">
                <span class="text-xl">✨</span>
                <div class="text-center">
                    <div class="font-semibold">${title}</div>
                    <div class="text-sm opacity-90">${message}</div>
                </div>
            </div>
        </div>
    `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "all 0.3s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-20px)";
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

// ========================================
// CONFESSION CARD FUNCTIONALITY
// ========================================

/**
 * Creates a confession card HTML element with centered layout
 * @param {object} confession - Confession object
 * @param {number} index - Card index
 * @returns {string} HTML string for the confession card
 */
function createConfessionCard(confession, index) {
  const minHeight = 220;
  const maxHeight = 350;
  const randomHeight = Math.random() * (maxHeight - minHeight) + minHeight;

  const totalReactions = Object.values(confession.reactions || {}).reduce(
    (sum, count) => sum + count,
    0
  );
  const timeAgo = getTimeAgo(confession.timestamp);

  return `
        <div class="masonry-item floating confession-card p-8 shadow-2xl center-content"
             style="min-height: ${randomHeight}px; animation-delay: ${
    index * 0.1
  }s;"
             data-index="${index}">
            <div class="flex justify-between items-start mb-4 w-full">
                <div class="text-xs opacity-50">${timeAgo}</div>
                <div class="text-xs opacity-50">#${index + 1}</div>
            </div>
            <div class="confession-quote w-full">
                <p class="confession-text">
                    "${confession.text || confession}"
                </p>
            </div>
            <div class="flex flex-wrap gap-3 justify-center pt-4 border-t border-orange-400/20 w-full">
                ${reactions
                  .map((reaction) => {
                    const count =
                      (confession.reactions &&
                        confession.reactions[reaction.name]) ||
                      0;
                    return `
                        <button class="reaction-btn group relative"
                                onclick="reactToConfession(this, '${
                                  reaction.name
                                }', ${index})"
                                title="${reaction.label}">
                            <span class="text-lg">${reaction.emoji}</span>
                            ${
                              count > 0
                                ? `<span class="reaction-counter" id="counter-${index}-${reaction.name}">${count}</span>`
                                : `<span class="reaction-counter hidden" id="counter-${index}-${reaction.name}">0</span>`
                            }
                        </button>
                    `;
                  })
                  .join("")}
            </div>
            ${
              totalReactions > 0
                ? `<div class="text-center mt-2 text-xs opacity-50 w-full">${totalReactions} reaction${
                    totalReactions !== 1 ? "s" : ""
                  }</div>`
                : ""
            }
        </div>
    `;
}

/**
 * Renders all confessions to the grid with enhanced centering
 */
function renderConfessions() {
  const grid = document.getElementById("confessionsGrid");
  const loadingState = document.getElementById("loadingState");
  const emptyState = document.getElementById("emptyState");

  // Hide loading state
  loadingState.style.display = "none";

  if (confessions.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  grid.innerHTML = confessions
    .map((confession, index) => createConfessionCard(confession, index))
    .join("");

  updateStatistics();

  // Re-observe for scroll animations
  setTimeout(() => {
    document.querySelectorAll(".confession-card").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      if (window.scrollObserver) {
        window.scrollObserver.observe(card);
      }
    });
  }, 100);
}

// ========================================
// REACTION FUNCTIONALITY
// ========================================

/**
 * Handles reaction button clicks
 * @param {HTMLElement} button - The clicked reaction button
 * @param {string} reactionType - Type of reaction
 * @param {number} confessionIndex - Index of the confession
 */
function reactToConfession(button, reactionType, confessionIndex) {
  button.classList.add("clicked");

  // Initialize reactions object if it doesn't exist
  if (!confessions[confessionIndex].reactions) {
    confessions[confessionIndex].reactions = {};
  }

  // Increment the reaction count
  confessions[confessionIndex].reactions[reactionType] =
    (confessions[confessionIndex].reactions[reactionType] || 0) + 1;

  // Update counter
  const counter = document.getElementById(
    `counter-${confessionIndex}-${reactionType}`
  );
  if (counter) {
    counter.textContent = confessions[confessionIndex].reactions[reactionType];
    counter.classList.remove("hidden");

    // Add pop animation
    counter.style.animation = "none";
    setTimeout(() => {
      counter.style.animation = "pop 0.3s ease-out";
    }, 10);
  }

  // Update statistics
  updateStatistics();

  setTimeout(() => {
    button.classList.remove("clicked");
  }, 800);
}

// ========================================
// SORTING AND FILTERING
// ========================================

/**
 * Sorts confessions based on selected criteria
 */
function sortConfessions() {
  const sortOrder = document.getElementById("sortOrder").value;
  currentSortOrder = sortOrder;

  switch (sortOrder) {
    case "newest":
      confessions.sort(
        (a, b) => (b.timestamp || Date.now()) - (a.timestamp || Date.now())
      );
      break;
    case "oldest":
      confessions.sort(
        (a, b) => (a.timestamp || Date.now()) - (b.timestamp || Date.now())
      );
      break;
    case "popular":
      confessions.sort((a, b) => {
        const aReactions = Object.values(a.reactions || {}).reduce(
          (sum, count) => sum + count,
          0
        );
        const bReactions = Object.values(b.reactions || {}).reduce(
          (sum, count) => sum + count,
          0
        );
        return bReactions - aReactions;
      });
      break;
  }

  renderConfessions();
}

/**
 * Clears all filters and resets to default sorting
 */
function clearFilters() {
  document.getElementById("sortOrder").value = "newest";
  currentSortOrder = "newest";
  sortConfessions();
}

// ========================================
// CONFESSION SUBMISSION
// ========================================

/**
 * Submits a new confession
 */
function submitConfession() {
  const text = document.getElementById("confessionText").value.trim();
  if (text) {
    const newConfession = {
      text: text,
      timestamp: Date.now(),
      reactions: {},
    };

    confessions.unshift(newConfession);

    // Re-sort if needed
    if (currentSortOrder !== "newest") {
      sortConfessions();
    } else {
      renderConfessions();
    }

    // Close modal and reset form
    closeConfessionModal();

    // Show success message
    showToast(
      "✨ Confession shared successfully!",
      "Your voice has been heard anonymously",
      "success"
    );
  }
}

// ========================================
// CHARACTER COUNT FUNCTIONALITY
// ========================================

/**
 * Sets up character count functionality for the textarea
 */
function setupCharacterCount() {
  const textArea = document.getElementById("confessionText");
  if (textArea) {
    textArea.addEventListener("input", function () {
      const count = this.value.length;
      const charCountElement = document.getElementById("charCount");
      charCountElement.textContent = count;

      if (count > 450) {
        charCountElement.style.color = "var(--orange)";
        charCountElement.classList.add("font-bold");
      } else if (count > 400) {
        charCountElement.style.color = "var(--orange-light)";
        charCountElement.classList.remove("font-bold");
      } else {
        charCountElement.style.color = "";
        charCountElement.classList.remove("font-bold");
      }
    });
  }
}

// ========================================
// MOUSE INTERACTION EFFECTS
// ========================================

/**
 * Sets up mouse interaction effects for stars
 */
function setupMouseEffects() {
  document.addEventListener("mousemove", function (e) {
    const stars = document.querySelectorAll(".star");
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    stars.forEach((star, index) => {
      if (index % 15 === 0) {
        const speed = star.classList.contains("large") ? 1 : 0.5;
        const offsetX = (x - 0.5) * speed * 10;
        const offsetY = (y - 0.5) * speed * 10;
        star.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    });
  });
}

// ========================================
// EVENT LISTENERS
// ========================================

/**
 * Sets up all event listeners
 */
function setupEventListeners() {
  // Close modal when clicking outside
  document.addEventListener("click", function (e) {
    const modal = document.getElementById("confessionModal");
    if (e.target === modal) {
      closeConfessionModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const modal = document.getElementById("confessionModal");
      if (modal.open) {
        closeConfessionModal();
      }
    }
  });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

/**
 * Sets up scroll-based animations using Intersection Observer
 */
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  window.scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initializes the application with enhanced centering
 */
function initializeApp() {
  loadTheme();
  createStars();
  setupCharacterCount();
  setupMouseEffects();
  setupEventListeners();
  setupScrollAnimations();

  // Simulate loading
  setTimeout(() => {
    renderConfessions();
  }, 1000);
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);

/**
 * Development Information - UPDATED
 * ================================
 * Project: T-Whispers Anonymous Confession Platform
 * Developer: Manav-Sonawane
 * Date: 2025-08-08
 * Updated: 2025-08-08 22:06:40 UTC
 *
 * Latest Updates:
 * - Enhanced footer with comprehensive centering
 * - Improved content alignment throughout
 * - Better responsive centering for all elements
 * - Enhanced footer statistics and layout
 * - Centered modal actions and content
 *
 * Features:
 * - Anonymous confession sharing
 * - Emoji reaction system
 * - Light/Dark theme toggle
 * - Responsive masonry layout
 * - Real-time statistics
 * - Sorting and filtering
 * - Smooth animations
 * - Accessible design
 * - Comprehensive centering system
 *
 * Technologies:
 * - Vanilla JavaScript (ES6+)
 * - CSS3 with Flexbox/Grid centering
 * - HTML5 semantic structure
 * - Tailwind CSS framework
 * - DaisyUI components
 */
