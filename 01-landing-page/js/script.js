<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="description"
        content="FocusFlow helps students organise tasks, study sessions and academic deadlines."
    >

    <title>FocusFlow | Plan Better. Study Smarter.</title>

    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <header class="site-header">
        <nav class="navbar container" aria-label="Main navigation">
            <a href="#home" class="logo" aria-label="FocusFlow home">
                Focus<span>Flow</span>
            </a>

            <button
                class="menu-button"
                type="button"
                aria-label="Open navigation menu"
                aria-expanded="false"
                aria-controls="navigation-links"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul class="nav-links" id="navigation-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li>
                    <a href="#get-started" class="nav-button">
                        Get Started
                    </a>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="hero" id="home">
            <div class="container hero-layout">
                <div class="hero-content">
                    <p class="eyebrow">Productivity designed for students</p>

                    <h1>
                        Plan better.
                        <span>Study smarter.</span>
                    </h1>

                    <p class="hero-description">
                        FocusFlow brings your tasks, study sessions and
                        academic deadlines into one simple workspace.
                    </p>

                    <div class="hero-actions">
                        <a href="#get-started" class="button button-primary">
                            Start for free
                        </a>

                        <a href="#features" class="button button-secondary">
                            Explore features
                        </a>
                    </div>

                    <p class="hero-note">
                        Free to get started. No credit card required.
                    </p>
                </div>

                <div class="hero-preview" aria-label="FocusFlow dashboard preview">
                    <div class="preview-header">
                        <div>
                            <p class="preview-label">Today</p>
                            <h2>Good morning, Alex</h2>
                        </div>

                        <span class="status-badge">On track</span>
                    </div>

                    <div class="progress-card">
                        <div class="card-heading">
                            <span>Weekly progress</span>
                            <strong>72%</strong>
                        </div>

                        <div class="progress-track">
                            <div class="progress-value"></div>
                        </div>
                    </div>

                    <div class="task-list">
                        <article class="task-card">
                            <span class="task-check completed">✓</span>
                            <div>
                                <h3>Review lecture notes</h3>
                                <p>Information Systems</p>
                            </div>
                            <span class="task-time">09:00</span>
                        </article>

                        <article class="task-card">
                            <span class="task-check"></span>
                            <div>
                                <h3>Complete assignment draft</h3>
                                <p>Web Development</p>
                            </div>
                            <span class="task-time">13:30</span>
                        </article>

                        <article class="task-card">
                            <span class="task-check"></span>
                            <div>
                                <h3>Prepare for class test</h3>
                                <p>Network Security</p>
                            </div>
                            <span class="task-time">18:00</span>
                        </article>
                    </div>
                </div>
            </div>
        </section>

        <section class="features section" id="features">
            <div class="container">
                <div class="section-heading">
                    <p class="eyebrow">Everything in one place</p>
                    <h2>Tools that make studying feel manageable</h2>
                    <p>
                        Focus on your work instead of trying to remember
                        what needs to be done next.
                    </p>
                </div>

                <div class="feature-grid">
                    <article class="feature-card">
                        <span class="feature-number">01</span>
                        <h3>Task planning</h3>
                        <p>
                            Organise assignments and personal tasks using
                            clear priorities and due dates.
                        </p>
                    </article>

                    <article class="feature-card">
                        <span class="feature-number">02</span>
                        <h3>Study sessions</h3>
                        <p>
                            Break large subjects into focused sessions that
                            fit your available time.
                        </p>
                    </article>

                    <article class="feature-card">
                        <span class="feature-number">03</span>
                        <h3>Progress tracking</h3>
                        <p>
                            View completed work and identify the areas that
                            still need your attention.
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <section class="testimonials section" id="testimonials">
            <div class="container">
                <div class="section-heading">
                    <p class="eyebrow">Student experiences</p>
                    <h2>A calmer way to stay organised</h2>
                </div>

                <div class="testimonial-grid">
                    <article class="testimonial-card">
                        <p>
                            “FocusFlow helped me separate urgent assignments
                            from tasks that could wait. My week finally felt
                            manageable.”
                        </p>

                        <div class="student">
                            <span class="student-avatar">TM</span>
                            <div>
                                <h3>Thando M.</h3>
                                <p>Information Technology student</p>
                            </div>
                        </div>
                    </article>

                    <article class="testimonial-card">
                        <p>
                            “I can see my deadlines and study sessions without
                            jumping between several different applications.”
                        </p>

                        <div class="student">
                            <span class="student-avatar">LN</span>
                            <div>
                                <h3>Leah N.</h3>
                                <p>Business Management student</p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section class="pricing section" id="pricing">
            <div class="container">
                <div class="section-heading">
                    <p class="eyebrow">Simple pricing</p>
                    <h2>Choose what works for you</h2>
                </div>

                <div class="pricing-grid">
                    <article class="pricing-card">
                        <p class="plan-name">Starter</p>
                        <p class="price">Free</p>
                        <p class="plan-description">
                            Everything needed to organise your studies.
                        </p>

                        <ul>
                            <li>Up to 20 active tasks</li>
                            <li>Weekly study planner</li>
                            <li>Basic progress tracking</li>
                        </ul>

                        <a href="#get-started" class="button button-secondary">
                            Choose Starter
                        </a>
                    </article>

                    <article class="pricing-card featured-plan">
                        <span class="popular-label">Most popular</span>
                        <p class="plan-name">Focus Plus</p>
                        <p class="price">R49 <span>/ month</span></p>
                        <p class="plan-description">
                            Extra tools for demanding academic schedules.
                        </p>

                        <ul>
                            <li>Unlimited tasks</li>
                            <li>Advanced progress insights</li>
                            <li>Custom study reminders</li>
                        </ul>

                        <a href="#get-started" class="button button-primary">
                            Choose Focus Plus
                        </a>
                    </article>
                </div>
            </div>
        </section>

        <section class="call-to-action section" id="get-started">
            <div class="container call-to-action-content">
                <div>
                    <p class="eyebrow">Start today</p>
                    <h2>Make space for focused work.</h2>
                    <p>
                        Create your free workspace and organise your next
                        study week in minutes.
                    </p>
                </div>

                <a href="#" class="button button-light">
                    Create free account
                </a>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="container footer-layout">
            <div>
                <a href="#home" class="logo footer-logo">
                    Focus<span>Flow</span>
                </a>

                <p>
                    A simpler way for students to plan, focus and progress.
                </p>
            </div>

            <div class="footer-links">
                <a href="#features">Features</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#pricing">Pricing</a>
                <a href="mailto:hello@focusflow.example">Contact</a>
            </div>
        </div>

        <div class="container footer-bottom">
            <p>
                &copy; <span id="current-year">2026</span>
                FocusFlow. Student internship project.
            </p>
        </div>
    </footer>

    <script src="js/script.js"></script>
</body>
</html>