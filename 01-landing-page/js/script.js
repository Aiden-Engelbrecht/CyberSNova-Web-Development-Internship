// js/script.js — Mobile navigation toggle

const menuButton = document.querySelector(".menu-button");
const navLinks = document.getElementById("navigation-links");

// Toggle menu open/close
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