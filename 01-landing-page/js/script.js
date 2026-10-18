// js/script.js — Mobile navigation + Smooth Scrollspy

const menuButton = document.querySelector(".menu-button");
const navLinks = document.getElementById("navigation-links");
const sections = document.querySelectorAll("section[id]");
// Select all nav links EXCEPT the "Get started" button
const navAnchors = document.querySelectorAll(".nav-links a:not(.nav-button)"); 
const navButton = document.querySelector(".nav-button");

// --- 1. Mobile Menu Toggle ---
menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("is-open", !isOpen);
});

// Close menu when a link is clicked
navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a") && navLinks.classList.contains("is-open")) {
        menuButton.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
    }
});

// --- 2. Creative Scrollspy (Sliding Pill) ---
function updateActiveLink() {
    let currentSection = "";
    // Trigger the highlight when the section is 1/3 down the screen
    const scrollPosition = window.scrollY + (window.innerHeight / 3);

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    // If we are at the very bottom of the page, highlight the Get Started button instead
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        currentSection = "get-started"; 
    }

    // Update standard links
    navAnchors.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });

    // Update the button separately so it gets the special button active style
    if (currentSection === "get-started") {
        navButton.classList.add("active");
    } else {
        navButton.classList.remove("active");
    }
}

// Listen for scroll and run on page load
window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);