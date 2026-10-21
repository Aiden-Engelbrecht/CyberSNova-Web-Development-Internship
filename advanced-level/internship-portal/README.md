# CyberSNova Internship Portal

## Project Information

- **Internship domain:** Web Development
- **Difficulty level:** Advanced
- **Project:** CyberSNova Internship Portal
- **Author:** Aiden Engelbrecht
- **Internship period:** October 2026

## Project Overview

The CyberSNova Internship Portal is a responsive, multi-page frontend application designed to manage the internship application process. Students can browse available domains, view specific project requirements, read guidelines, and submit an online registration form.

The application features dynamic routing, live search filtering, and form draft auto-saving. It uses browser local storage to preserve registration progress and a simulated email preview to confirm successful submissions, all within a polished, editorial-style user interface.

## Project Objectives

The objectives of this project were to:

- Create a professional, multi-page portal architecture.
- Allow users to browse and search internship domains.
- Dynamically display unique task lists based on the selected domain.
- Provide a responsive registration form with strict validation.
- Preserve user input using browser storage.
- Simulate a professional post-submission confirmation experience.
- Present internship guidelines and frequently asked questions clearly.
- Ensure navigation is consistent and accessible across desktop and mobile devices.

## Features

- Shared sticky navigation with active page highlighting
- Mobile-responsive slide-down navigation menu
- Homepage with hero section and feature overview
- Dynamic domain browser with live search filtering
- Unique, domain-specific task lists (Beginner, Intermediate, Advanced)
- Sidebar level filtering on the tasks page
- Multi-page registration form
- Real-time validation for names, email, phone, and password
- 4-stage password strength meter
- Auto-saving registration drafts using `localStorage`
- Dynamic domain dropdown population
- Mock email inbox preview upon successful submission
- Collapsible FAQ accordion on the guidelines page
- Fully responsive desktop, tablet and mobile layouts

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript
- Browser Local Storage
- URL Search Parameters
- Google Fonts
- Visual Studio Code
- Git
- GitHub

The interface uses the **Inter** and **Fraunces** typefaces from Google Fonts to achieve a high-contrast, editorial design.

## Project Structure

```text
internship-portal/
├── index.html
├── domains.html
├── tasks.html
├── register.html
├── guidelines.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── domains.js
│   ├── tasks.js
│   └── registration.js
├── assets/
└── README.md