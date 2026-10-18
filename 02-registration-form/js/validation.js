document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");
    const successMessage = document.getElementById("success-message");
    
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const studyArea = document.getElementById("study-area");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const terms = document.getElementById("terms");

    const toggles = document.querySelectorAll(".password-toggle");
    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const targetId = toggle.getAttribute("data-password-target");
            const targetInput = document.getElementById(targetId);
            
            if (targetInput.type === "password") {
                targetInput.type = "text";
                toggle.textContent = "Hide";
            } else {
                targetInput.type = "password";
                toggle.textContent = "Show";
            }
        });
    });

    function showError(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        errorElement.classList.add("visible");
        
        if (input.id === "phone") {
            input.closest(".phone-input-wrapper").classList.add("input-error");
        } else {
            input.classList.add("input-error");
        }
    }

    function clearError(input, errorId) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = "";
        errorElement.classList.remove("visible");
        
        if (input.id === "phone") {
            input.closest(".phone-input-wrapper").classList.remove("input-error");
        } else {
            input.classList.remove("input-error");
        }
    }

    password.addEventListener("input", () => {
        const val = password.value;
        const bar = document.querySelector(".strength-bar");
        
        bar.className = "strength-bar";
        
        if (val.length === 0) return;

        const hasLower = /[a-z]/.test(val);
        const hasUpper = /[A-Z]/.test(val);
        const hasNumber = /[0-9]/.test(val);
        const hasSpecial = /[^a-zA-Z0-9]/.test(val);
        const isLongEnough = val.length >= 8;

        const criteriaMet = [hasLower, hasUpper, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;

        if (criteriaMet <= 2) {
            bar.classList.add("weak");
        } else if (criteriaMet === 3 || criteriaMet === 4) {
            bar.classList.add("medium");
        } else if (criteriaMet === 5) {
            bar.classList.add("strong");
        }
    });

    function validateFirstName() {
        const val = firstName.value.trim();
        if (val === "") {
            showError(firstName, "first-name-error", "Required.");
            return false;
        }
        clearError(firstName, "first-name-error");
        return true;
    }

    function validateLastName() {
        const val = lastName.value.trim();
        if (val === "") {
            showError(lastName, "last-name-error", "Required.");
            return false;
        }
        clearError(lastName, "last-name-error");
        return true;
    }

    function validateEmail() {
        const val = email.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (val === "") {
            showError(email, "email-error", "Required.");
            return false;
        }
        if (!regex.test(val)) {
            showError(email, "email-error", "Invalid email format.");
            return false;
        }
        clearError(email, "email-error");
        return true;
    }

    function validatePhone() {
        let val = phone.value.replace(/\D/g, "");
        if (val.startsWith("0")) val = val.substring(1);
        
        if (val === "") {
            showError(phone, "phone-error", "Required.");
            return false;
        }
        if (val.length !== 9) {
            showError(phone, "phone-error", "Must be 9 digits.");
            return false;
        }
        clearError(phone, "phone-error");
        return true;
    }

    function validateStudyArea() {
        if (studyArea.value === "") {
            showError(studyArea, "study-area-error", "Required.");
            return false;
        }
        clearError(studyArea, "study-area-error");
        return true;
    }

    function validatePassword() {
        const val = password.value;
        const hasLower = /[a-z]/.test(val);
        const hasUpper = /[A-Z]/.test(val);
        const hasNumber = /[0-9]/.test(val);
        const hasSpecial = /[^a-zA-Z0-9]/.test(val);
        
        if (val === "") {
            showError(password, "password-error", "Required.");
            return false;
        }
        if (val.length < 8 || !hasLower || !hasUpper || !hasNumber || !hasSpecial) {
            showError(password, "password-error", "Does not meet requirements.");
            return false;
        }
        clearError(password, "password-error");
        return true;
    }

    function validateConfirmPassword() {
        if (confirmPassword.value === "") {
            showError(confirmPassword, "confirm-password-error", "Required.");
            return false;
        }
        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, "confirm-password-error", "Passwords do not match.");
            return false;
        }
        clearError(confirmPassword, "confirm-password-error");
        return true;
    }

    function validateTerms() {
        if (!terms.checked) {
            showError(terms, "terms-error", "You must agree to the terms.");
            return false;
        }
        clearError(terms, "terms-error");
        return true;
    }

    firstName.addEventListener("blur", validateFirstName);
    lastName.addEventListener("blur", validateLastName);
    email.addEventListener("blur", validateEmail);
    phone.addEventListener("blur", validatePhone);
    studyArea.addEventListener("blur", validateStudyArea);
    password.addEventListener("blur", validatePassword);
    confirmPassword.addEventListener("blur", validateConfirmPassword);
    terms.addEventListener("change", validateTerms);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isStudyAreaValid = validateStudyArea();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsValid = validateTerms();

        if (isFirstNameValid && isLastNameValid && isEmailValid && 
            isPhoneValid && isStudyAreaValid && isPasswordValid && 
            isConfirmPasswordValid && isTermsValid) {
            
            successMessage.hidden = false;
            successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
            
            // Reset the form completely
            form.reset();
            
            // Explicitly reset the strength bar classes and color
            const bar = document.querySelector(".strength-bar");
            bar.className = "strength-bar";
            bar.style.width = "0%"; // Forces the width back to zero immediately
            
            // Clear all error red borders
            document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));
            document.querySelectorAll(".error-message").forEach(el => el.classList.remove("visible"));
        } else {
            const firstError = form.querySelector(".input-error");
            if (firstError) firstError.focus();
        }
    });
});