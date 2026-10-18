// ==========================================================
// StudyCircle Registration Form Validation
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const registrationForm = document.getElementById("registration-form");
    const successMessage = document.getElementById("success-message");

    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const studyAreaInput = document.getElementById("study-area");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const termsInput = document.getElementById("terms");

    const passwordStrength = document.getElementById("password-strength");
    const strengthLabel = passwordStrength.querySelector(".strength-label");
    const passwordToggleButtons = document.querySelectorAll(".password-toggle");

    // Validation patterns
    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordPattern = {
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /\d/,
        specialCharacter: /[^A-Za-z0-9]/
    };

    // --- Error Handling Functions ---
    
    function showError(input, message) {
        // If input is inside a wrapper (like phone), style the wrapper
        const target = input.closest(".phone-input-wrapper") ? input.closest(".phone-input-wrapper") : input;
        const errorElement = document.getElementById(`${input.id}-error`);

        target.classList.add("input-error");
        target.classList.remove("input-valid");
        input.setAttribute("aria-invalid", "true");

        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function showValid(input) {
        const target = input.closest(".phone-input-wrapper") ? input.closest(".phone-input-wrapper") : input;
        const errorElement = document.getElementById(`${input.id}-error`);

        target.classList.remove("input-error");
        target.classList.add("input-valid");
        input.setAttribute("aria-invalid", "false");

        if (errorElement) {
            errorElement.textContent = "";
        }
    }

    function clearValidation(input) {
        const target = input.closest(".phone-input-wrapper") ? input.closest(".phone-input-wrapper") : input;
        const errorElement = document.getElementById(`${input.id}-error`);

        target.classList.remove("input-error", "input-valid");
        input.removeAttribute("aria-invalid");

        if (errorElement) {
            errorElement.textContent = "";
        }
    }

    // --- Individual Field Validations ---

    function validateFirstName() {
        const val = firstNameInput.value.trim();
        if (val === "") {
            showError(firstNameInput, "Please enter your first name.");
            return false;
        }
        if (val.length < 2) {
            showError(firstNameInput, "Must be at least two characters.");
            return false;
        }
        if (!namePattern.test(val)) {
            showError(firstNameInput, "Only letters, spaces, apostrophes or hyphens allowed.");
            return false;
        }
        showValid(firstNameInput);
        return true;
    }

    function validateLastName() {
        const val = lastNameInput.value.trim();
        if (val === "") {
            showError(lastNameInput, "Please enter your last name.");
            return false;
        }
        if (val.length < 2) {
            showError(lastNameInput, "Must be at least two characters.");
            return false;
        }
        if (!namePattern.test(val)) {
            showError(lastNameInput, "Only letters, spaces, apostrophes or hyphens allowed.");
            return false;
        }
        showValid(lastNameInput);
        return true;
    }

    function validateEmail() {
        const val = emailInput.value.trim();
        if (val === "") {
            showError(emailInput, "Please enter your email address.");
            return false;
        }
        if (!emailPattern.test(val)) {
            showError(emailInput, "Enter a valid email, such as name@example.com.");
            return false;
        }
        showValid(emailInput);
        return true;
    }

    function validatePhone() {
        // Strip all non-numeric characters
        let val = phoneInput.value.replace(/\D/g, "");
        
        // Remove leading zero if they pasted it (SA format)
        if (val.startsWith("0")) {
            val = val.substring(1);
            phoneInput.value = val; // update input visually
        }

        if (val === "") {
            showError(phoneInput, "Please enter your phone number.");
            return false;
        }
        if (val.length !== 9) {
            showError(phoneInput, "Must be exactly 9 digits (excluding the +27).");
            return false;
        }
        if (!/^[6-8]/.test(val)) {
            showError(phoneInput, "Must start with 6, 7 or 8.");
            return false;
        }
        showValid(phoneInput);
        return true;
    }

    function validateStudyArea() {
        if (studyAreaInput.value === "") {
            showError(studyAreaInput, "Please select your area of study.");
            return false;
        }
        showValid(studyAreaInput);
        return true;
    }

    function passwordMeetsRequirements(password) {
        return (
            password.length >= 8 &&
            passwordPattern.uppercase.test(password) &&
            passwordPattern.lowercase.test(password) &&
            passwordPattern.number.test(password) &&
            passwordPattern.specialCharacter.test(password)
        );
    }

    function validatePassword() {
        const val = passwordInput.value;
        if (val === "") {
            showError(passwordInput, "Please create a password.");
            return false;
        }
        if (val.length < 8) {
            showError(passwordInput, "Must contain at least eight characters.");
            return false;
        }
        if (!passwordPattern.uppercase.test(val)) {
            showError(passwordInput, "Add at least one uppercase letter.");
            return false;
        }
        if (!passwordPattern.lowercase.test(val)) {
            showError(passwordInput, "Add at least one lowercase letter.");
            return false;
        }
        if (!passwordPattern.number.test(val)) {
            showError(passwordInput, "Add at least one number.");
            return false;
        }
        if (!passwordPattern.specialCharacter.test(val)) {
            showError(passwordInput, "Add at least one special character.");
            return false;
        }
        showValid(passwordInput);
        return true;
    }

    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmed = confirmPasswordInput.value;

        if (confirmed === "") {
            showError(confirmPasswordInput, "Please confirm your password.");
            return false;
        }
        if (confirmed !== password) {
            showError(confirmPasswordInput, "Passwords do not match.");
            return false;
        }
        showValid(confirmPasswordInput);
        return true;
    }

    function validateTerms() {
        const termsError = document.getElementById("terms-error");
        if (!termsInput.checked) {
            termsInput.setAttribute("aria-invalid", "true");
            termsError.textContent = "You must accept the terms.";
            return false;
        }
        termsInput.setAttribute("aria-invalid", "false");
        termsError.textContent = "";
        return true;
    }

    // --- Password Strength Indicator ---

    function calculatePasswordScore(password) {
        let score = 0;
        if (password.length >= 8) score += 1;
        if (passwordPattern.uppercase.test(password) && passwordPattern.lowercase.test(password)) score += 1;
        if (passwordPattern.number.test(password)) score += 1;
        if (passwordPattern.specialCharacter.test(password)) score += 1;
        return score;
    }

    function updatePasswordStrength() {
        const password = passwordInput.value;
        const score = calculatePasswordScore(password);

        passwordStrength.classList.remove("weak", "fair", "good", "strong");

        if (password === "") {
            strengthLabel.textContent = "No password entered";
            return;
        }

        if (score <= 1) {
            passwordStrength.classList.add("weak");
            strengthLabel.textContent = "Weak password";
        } else if (score === 2) {
            passwordStrength.classList.add("fair");
            strengthLabel.textContent = "Fair password";
        } else if (score === 3) {
            passwordStrength.classList.add("good");
            strengthLabel.textContent = "Good password";
        } else if (score === 4) {
            passwordStrength.classList.add("strong");
            strengthLabel.textContent = "Strong password";
        }
    }

    // --- Show / Hide Passwords ---
    
    passwordToggleButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.dataset.passwordTarget;
            const targetInput = document.getElementById(targetId);
            const isHidden = targetInput.type === "password";

            targetInput.type = isHidden ? "text" : "password";
            btn.textContent = isHidden ? "Hide" : "Show";
            btn.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
        });
    });

    // --- Real-time Input Restrictions ---

    // Prevent typing numbers/symbols in names
    firstNameInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g, "");
        if (firstNameInput.classList.contains("input-error")) validateFirstName();
    });

    lastNameInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g, "");
        if (lastNameInput.classList.contains("input-error")) validateLastName();
    });

    // Prevent typing letters in phone
    phoneInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^\d\s-]/g, "");
        if (phoneInput.classList.contains("input-error")) validatePhone();
    });

    passwordInput.addEventListener("input", () => {
        updatePasswordStrength();
        if (passwordInput.classList.contains("input-error")) validatePassword();
        if (confirmPasswordInput.value !== "") validateConfirmPassword();
    });

    emailInput.addEventListener("input", () => {
        if (emailInput.classList.contains("input-error")) validateEmail();
    });

    confirmPasswordInput.addEventListener("input", () => {
        if (confirmPasswordInput.classList.contains("input-error")) validateConfirmPassword();
    });

    // --- Blur (Click Away) Validation ---

    firstNameInput.addEventListener("blur", validateFirstName);
    lastNameInput.addEventListener("blur", validateLastName);
    emailInput.addEventListener("blur", validateEmail);
    phoneInput.addEventListener("blur", validatePhone);
    studyAreaInput.addEventListener("change", validateStudyArea);
    passwordInput.addEventListener("blur", validatePassword);
    confirmPasswordInput.addEventListener("blur", validateConfirmPassword);
    termsInput.addEventListener("change", validateTerms);

    // --- Form Submission ---

    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        successMessage.hidden = true;

        const isValid = [
            validateFirstName(),
            validateLastName(),
            validateEmail(),
            validatePhone(),
            validateStudyArea(),
            validatePassword(),
            validateConfirmPassword(),
            validateTerms()
        ].every(result => result);

        if (!isValid) {
            const firstInvalid = registrationForm.querySelector('[aria-invalid="true"]');
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // Success
        successMessage.hidden = false;
        registrationForm.reset();

        // Clear all visual states
        [firstNameInput, lastNameInput, emailInput, phoneInput, studyAreaInput, passwordInput, confirmPasswordInput].forEach(clearValidation);
        termsInput.removeAttribute("aria-invalid");
        document.getElementById("terms-error").textContent = "";

        // Reset password meter
        passwordStrength.classList.remove("weak", "fair", "good", "strong");
        strengthLabel.textContent = "No password entered";

        // Reset password toggles
        passwordToggleButtons.forEach((btn) => {
            const targetInput = document.getElementById(btn.dataset.passwordTarget);
            targetInput.type = "password";
            btn.textContent = "Show";
        });

        successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    });
});