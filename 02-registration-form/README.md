# StudyCircle Responsive Registration Form

## Project Information

**Internship domain:** Web Development
- **Difficulty level:** Beginner
- **Project:** Responsive Registration Form
- **Author:** Aiden Engelbrecht
- **Internship period:** October 2026

## Project Overview

StudyCircle is a fictional online learning community designed to help
students connect with other students, organise study sessions and
share academic resources.

This project provides a responsive student registration form with
client-side validation. The form checks the information entered by
the user and displays clear feedback when information is missing or
incorrect.

## Project Objectives

The objectives of this project were to:

- Build a responsive registration form using HTML and CSS.
- Validate user information using JavaScript.
- Provide clear and helpful validation messages.
- Check email addresses and South African phone numbers.
- Evaluate password strength.
- Confirm that both password fields match.
- Create a layout that works on desktop, tablet and mobile screens.

## Main Features

- First-name and last-name fields
- Email-address validation
- South African phone-number validation
- Area-of-study selection
- Password and password-confirmation fields
- Live password-strength indicator
- Show and hide password controls
- Terms and conditions checkbox
- Field-specific validation messages
- Valid and invalid field styling
- Successful-registration confirmation
- Responsive desktop and mobile layouts

## Validation Rules

The registration form applies the following rules:

### Names

- First and last names are required.
- Names must contain at least two characters.
- Invalid characters and numbers are rejected.

### Email Address

- An email address is required.
- The address must follow a valid email format, such as
  `name@example.com`.

### Phone Number

- The form uses the South African `+27` country code.
- The user must enter exactly nine digits.
- The first zero must be excluded.
- The number must begin with 6, 7 or 8.
- Non-numeric characters are removed from the input.

### Area of Study

- The user must select an area of study from the provided list.

### Password

The password must:

- Contain at least eight characters
- Include at least one uppercase letter
- Include at least one lowercase letter
- Include at least one number
- Include at least one special character

The password-strength indicator displays one of the following levels:

- Weak
- Fair
- Good
- Strong

### Password Confirmation

- The confirmation field is required.
- The confirmed password must match the original password.

### Terms and Conditions

- The user must accept the terms and conditions before submitting
  the form.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Google Fonts
- Visual Studio Code
- Git
- GitHub

The interface uses the **Fraunces** and **Inter** typefaces from
Google Fonts.

## Project Structure

```text
02-registration-form/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── validation.js
└── README.md