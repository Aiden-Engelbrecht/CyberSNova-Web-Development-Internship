document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reg-form");
    const emailPreview = document.getElementById("email-preview");
    
    // Inputs
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const domainSelect = document.getElementById("domain");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const terms = document.getElementById("terms");
    
    // Pass meter
    const passStrength = document.getElementById("pass-strength");

    // 1. Populate Domains
    const domains = [
        { id: "web-development", title: "Web Development" },
        { id: "data-science", title: "Data Science" },
        { id: "cybersecurity", title: "Cybersecurity" },
        { id: "ui-ux-design", title: "UI/UX Design" },
        { id: "cloud-computing", title: "Cloud Computing" }
    ];

    domains.forEach(d => {
        const option = document.createElement("option");
        option.value = d.id;
        option.textContent = d.title;
        domainSelect.appendChild(option);
    });

    // 2. Restore Draft from LocalStorage
    const savedDraft = JSON.parse(localStorage.getItem("cybersnova-draft"));
    if (savedDraft) {
        firstName.value = savedDraft.firstName || "";
        lastName.value = savedDraft.lastName || "";
        email.value = savedDraft.email || "";
        phone.value = savedDraft.phone || "";
        domainSelect.value = savedDraft.domain || "";
    }

    // 3. Save Draft on Input
    const inputs = [firstName, lastName, email, phone, domainSelect];
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            const draft = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                phone: phone.value,
                domain: domainSelect.value
            };
            localStorage.setItem("cybersnova-draft", JSON.stringify(draft));
        });
    });

    // 4. Validation Helpers
    function showError(input, errorId, message) {
        const errorEl = document.getElementById(errorId);
        errorEl.textContent = message;
        errorEl.classList.add("visible");
        input.classList.add("input-error");
        input.classList.remove("input-valid");
    }

    function showValid(input, errorId) {
        const errorEl = document.getElementById(errorId);
        errorEl.classList.remove("visible");
        input.classList.remove("input-error");
        input.classList.add("input-valid");
    }

    // 5. Password Strength Meter
    password.addEventListener("input", () => {
        const val = password.value;
        passStrength.className = "password-strength"; // reset
        
        if (val.length === 0) return;

        const hasLower = /[a-z]/.test(val);
        const hasUpper = /[A-Z]/.test(val);
        const hasNumber = /[0-9]/.test(val);
        const hasSpecial = /[^a-zA-Z0-9]/.test(val);
        const isLong = val.length >= 8;

        const score = [hasLower, hasUpper, hasNumber, hasSpecial, isLong].filter(Boolean).length;

        if (score <= 2) passStrength.classList.add("weak");
        else if (score === 3) passStrength.classList.add("fair");
        else if (score === 4) passStrength.classList.add("good");
        else if (score === 5) passStrength.classList.add("strong");
    });

    // 6. Validation Logic
    function validateFirstName() {
        if (firstName.value.trim().length < 2) {
            showError(firstName, "first-name-error", "Please enter your first name.");
            return false;
        }
        showValid(firstName, "first-name-error");
        return true;
    }

    function validateLastName() {
        if (lastName.value.trim().length < 2) {
            showError(lastName, "last-name-error", "Please enter your last name.");
            return false;
        }
        showValid(lastName, "last-name-error");
        return true;
    }

    function validateEmail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!regex.test(email.value.trim())) {
            showError(email, "email-error", "Enter a valid email address.");
            return false;
        }
        showValid(email, "email-error");
        return true;
    }

    function validatePhone() {
        let val = phone.value.replace(/\D/g, "");
        if (val.startsWith("0")) val = val.substring(1);
        
        if (val.length !== 9 || !/^[6-8]/.test(val)) {
            showError(phone, "phone-error", "Enter a valid 9-digit SA number (e.g. 82 123 4567).");
            return false;
        }
        showValid(phone, "phone-error");
        return true;
    }

    function validateDomain() {
        if (domainSelect.value === "") {
            showError(domainSelect, "domain-error", "Please select an area of interest.");
            return false;
        }
        showValid(domainSelect, "domain-error");
        return true;
    }

    function validatePassword() {
        const val = password.value;
        if (val.length < 8 || !/[A-Z]/.test(val) || !/[a-z]/.test(val) || !/[0-9]/.test(val) || !/[^a-zA-Z0-9]/.test(val)) {
            showError(password, "password-error", "Must be 8+ chars with uppercase, lowercase, number, and symbol.");
            return false;
        }
        showValid(password, "password-error");
        return true;
    }

    function validateConfirmPassword() {
        if (confirmPassword.value !== password.value || confirmPassword.value === "") {
            showError(confirmPassword, "confirm-password-error", "Passwords do not match.");
            return false;
        }
        showValid(confirmPassword, "confirm-password-error");
        return true;
    }

    function validateTerms() {
        const errorEl = document.getElementById("terms-error");
        if (!terms.checked) {
            errorEl.textContent = "You must agree to the terms.";
            errorEl.classList.add("visible");
            return false;
        }
        errorEl.classList.remove("visible");
        return true;
    }

    // Real-time validation on blur
    firstName.addEventListener("blur", validateFirstName);
    lastName.addEventListener("blur", validateLastName);
    email.addEventListener("blur", validateEmail);
    phone.addEventListener("blur", validatePhone);
    domainSelect.addEventListener("change", validateDomain);
    password.addEventListener("blur", validatePassword);
    confirmPassword.addEventListener("blur", validateConfirmPassword);
    terms.addEventListener("change", validateTerms);

    // 7. Submit Handler
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const isValid = [
            validateFirstName(),
            validateLastName(),
            validateEmail(),
            validatePhone(),
            validateDomain(),
            validatePassword(),
            validateConfirmPassword(),
            validateTerms()
        ].every(result => result);

        if (isValid) {
            // Hide form, show fake email
            form.style.display = "none";
            emailPreview.style.display = "block";
            
            // Populate the email with user data
            document.getElementById("email-name").textContent = firstName.value;
            document.getElementById("email-address").textContent = email.value;
            
            const selectedDomainText = domainSelect.options[domainSelect.selectedIndex].text;
            document.getElementById("email-domain").textContent = selectedDomainText;
            
            // Clear draft from local storage
            localStorage.removeItem("cybersnova-draft");
            
            // Scroll to top of email preview
            emailPreview.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            const firstError = form.querySelector(".input-error");
            if (firstError) firstError.focus();
        }
    });
});