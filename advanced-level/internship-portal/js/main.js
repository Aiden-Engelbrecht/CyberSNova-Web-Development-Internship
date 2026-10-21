document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.contains("is-open");
            navLinks.classList.toggle("is-open", !isOpen);
            menuToggle.setAttribute("aria-expanded", !isOpen);
        });
    }

    // 2. Highlight Active Nav Link
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll(".nav-links a");
    
    links.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath || (currentPath === "" && href === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});