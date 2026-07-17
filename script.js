/**
 * Vignesh | Portfolio Website Script
 * Interactive features, theme toggle, and page layout handling.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       Dark / Light Theme State Management
       ========================================================================== */
    const themeToggleBtn = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    const currentTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    
    // Set theme initial state
    htmlElement.setAttribute("data-theme", currentTheme);
    updateThemeIcon(currentTheme);

    themeToggleBtn.addEventListener("click", () => {
        const activeTheme = htmlElement.getAttribute("data-theme");
        const newTheme = activeTheme === "dark" ? "light" : "dark";
        
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector("i");
        if (theme === "dark") {
            icon.className = "fa-solid fa-sun";
        } else {
            icon.className = "fa-solid fa-moon";
        }
    }

    /* ==========================================================================
       Mobile Navigation Menu
       ========================================================================== */
    const mobileToggleBtn = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    mobileToggleBtn.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        const icon = mobileToggleBtn.querySelector("i");
        
        if (isOpen) {
            icon.className = "fa-solid fa-xmark";
            mobileToggleBtn.setAttribute("aria-label", "Close menu");
        } else {
            icon.className = "fa-solid fa-bars";
            mobileToggleBtn.setAttribute("aria-label", "Open menu");
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("open")) {
                navMenu.classList.remove("open");
                const icon = mobileToggleBtn.querySelector("i");
                icon.className = "fa-solid fa-bars";
                mobileToggleBtn.setAttribute("aria-label", "Open menu");
            }
        });
    });

    /* ==========================================================================
       Header Scroll Dynamics
       ========================================================================== */
    const header = document.querySelector(".header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    /* ==========================================================================
       Active Link Highlighter on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll("section");
    
    const navObserverOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px", // Detect active section inside viewport center
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute("id");
                
                navLinks.forEach(link => {
                    if (link.getAttribute("href") === `#${activeId}`) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    /* ==========================================================================
       Typing Animation
       ========================================================================== */
    const typedTextSpan = document.getElementById("typed-role");
    const roles = [
        "Java Backend Developer",
        "Spring Boot Expert",
        "REST API Architect",
        "MySQL Administrator"
    ];
    
    const typingDelay = 100;
    const erasingDelay = 60;
    const newRoleDelay = 2000; // Pause between roles
    let roleIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < roles[roleIndex].length) {
            typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newRoleDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            roleIndex++;
            if (roleIndex >= roles.length) roleIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }

    // Start the typing animation
    if (roles.length) setTimeout(type, 1000);

    /* ==========================================================================
       Skills Progress Bar Animation on Scroll
       ========================================================================== */
    const skillsSection = document.getElementById("skills");
    const progressBars = document.querySelectorAll(".skill-bar-fill");

    const skillsObserverOptions = {
        root: null,
        threshold: 0.15 // Trigger when 15% of the section is visible
    };

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const widthValue = bar.getAttribute("data-progress");
                    bar.style.width = widthValue;
                });
                // Unobserve once animation runs
                observer.unobserve(entry.target);
            }
        });
    }, skillsObserverOptions);

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    /* ==========================================================================
       Scroll Entrance Animations (Generic Reveal)
       ========================================================================== */
    const revealElements = document.querySelectorAll(".glass-card, .timeline-item, .section-header");
    
    const revealObserverOptions = {
        root: null,
        rootMargin: "0px 0px -80px 0px",
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
            }
        });
    }, revealObserverOptions);

    // Apply reveal class and observer
    revealElements.forEach(el => {
        el.classList.add("reveal");
        revealObserver.observe(el);
    });

    // Write supporting CSS styles dynamically for scroll reveals
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    /* ==========================================================================
       Scroll-To-Top Button
       ========================================================================== */
    const scrollTopBtn = document.getElementById("scroll-top-btn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    /* ==========================================================================
       Contact Form Validation & Submission
       ========================================================================== */
    const contactForm = document.getElementById("contact-form");
    const nameInput = document.getElementById("form-name");
    const emailInput = document.getElementById("form-email");
    const subjectInput = document.getElementById("form-subject");
    const messageInput = document.getElementById("form-message");
    const formSpinner = document.getElementById("form-spinner");
    const formStatus = document.getElementById("form-status");
    const submitBtn = contactForm.querySelector(".btn-submit");

    // Regular Expression for Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let hasErrors = false;
    resetFormValidation();

    // Validate Name
    if (!nameInput.value.trim()) {
        showInputError(nameInput);
        hasErrors = true;
    }

    // Validate Email
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showInputError(emailInput);
        hasErrors = true;
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
        showInputError(subjectInput);
        hasErrors = true;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
        showInputError(messageInput);
        hasErrors = true;
    }

    if (hasErrors) return;

    submitBtn.disabled = true;
    formSpinner.style.display = "inline-block";

    const paperPlaneIcon = submitBtn.querySelector(".send-icon");
    if (paperPlaneIcon) paperPlaneIcon.style.display = "none";

    const contactData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
    };

    try {

        const response = await fetch("http://localhost:8080/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactData)
        });

        if (response.ok) {

            formStatus.style.display = "block";
            formStatus.className = "form-status success";
            formStatus.innerHTML =
                '<i class="fa-solid fa-circle-check"></i> Message sent successfully!';

            contactForm.reset();

        } else {

            formStatus.style.display = "block";
            formStatus.className = "form-status error";
            formStatus.innerHTML =
                '<i class="fa-solid fa-circle-xmark"></i> Failed to send message.';

        }

    } catch (error) {

        formStatus.style.display = "block";
        formStatus.className = "form-status error";
        formStatus.innerHTML =
            '<i class="fa-solid fa-circle-xmark"></i> Server not running.';

        console.error(error);

    } finally {

        submitBtn.disabled = false;
        formSpinner.style.display = "none";

        if (paperPlaneIcon) {
            paperPlaneIcon.style.display = "inline-block";
        }

    }
});

   function showInputError(inputEl) {
    inputEl.parentElement.classList.add("has-error");
}
    function resetFormValidation() {
        const formGroups = document.querySelectorAll(".form-group");
        formGroups.forEach(group => group.classList.remove("has-error"));
        formStatus.style.display = "none";
    }
});
