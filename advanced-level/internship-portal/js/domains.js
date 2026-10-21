document.addEventListener("DOMContentLoaded", () => {
    const domainGrid = document.getElementById("domain-grid");
    const searchInput = document.getElementById("domain-search");

    // Unique data for each domain
    const domains = [
        {
            id: "web-development",
            title: "Web Development",
            icon: "🌐",
            description: "Architect and build interactive, responsive frontend interfaces and robust backend servers.",
            tags: "HTML • CSS • JavaScript • React • Node.js",
            type: "Software Engineering"
        },
        {
            id: "data-science",
            title: "Data Science",
            icon: "📊",
            description: "Clean complex datasets, build predictive machine learning models, and extract actionable business insights.",
            tags: "Python • Pandas • Scikit-Learn • Matplotlib",
            type: "Analytics & AI"
        },
        {
            id: "cybersecurity",
            title: "Cybersecurity",
            icon: "🛡️",
            description: "Identify vulnerabilities, secure network infrastructure, and learn ethical hacking methodologies.",
            tags: "Networking • Linux • OWASP • Cryptography",
            type: "Information Security"
        },
        {
            id: "ui-ux-design",
            title: "UI/UX Design",
            icon: "🎨",
            description: "Design intuitive user interfaces, map user journeys, and build interactive prototypes.",
            tags: "Figma • Wireframing • User Research • Prototyping",
            type: "Product Design"
        },
        {
            id: "cloud-computing",
            title: "Cloud Computing",
            icon: "☁️",
            description: "Deploy scalable applications, manage virtual infrastructure, and optimise cloud costs.",
            tags: "AWS • Docker • Kubernetes • CI/CD",
            type: "Infrastructure"
        }
    ];

    function renderDomains(filterText = "") {
        domainGrid.innerHTML = "";
        
        const filtered = domains.filter(d => 
            d.title.toLowerCase().includes(filterText.toLowerCase()) || 
            d.description.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filtered.length === 0) {
            domainGrid.innerHTML = `<p style="padding: 3rem; border: 1px dashed var(--ink-muted); text-align: center; color: var(--ink-muted);">No domains found matching "${filterText}".</p>`;
            return;
        }

        filtered.forEach(domain => {
            const row = document.createElement("a");
            row.href = `tasks.html?domain=${domain.id}`;
            row.className = "domain-row";
            row.dataset.domain = domain.id; // Used for the unique top border color
            
            row.innerHTML = `
                <div class="domain-icon-box">${domain.icon}</div>
                <div class="domain-info">
                    <h3>${domain.title}</h3>
                    <p>${domain.description}</p>
                    <div style="margin-top: 1rem; font-size: 0.8125rem; font-weight: 600; color: var(--ink-muted); letter-spacing: 0.05em;">
                        ${domain.tags}
                    </div>
                </div>
                <div class="domain-action">
                    <div class="domain-tag">${domain.type}</div>
                    <span style="font-weight: 600; color: var(--accent); font-size: 1.1rem;">View Tasks &rarr;</span>
                </div>
            `;
            domainGrid.appendChild(row);
        });
    }

    renderDomains();

    searchInput.addEventListener("input", (e) => {
        renderDomains(e.target.value);
    });
});