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

if (contactForm) {

    const submitBtn = contactForm.querySelector(".btn-submit");

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
        const email = emailInput.value.trim();

        if (!email || !emailRegex.test(email)) {
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

        if (hasErrors) {
            return;
        }

        // Disable button while sending
        submitBtn.disabled = true;
        formSpinner.style.display = "inline-block";

        const paperPlaneIcon = submitBtn.querySelector(".send-icon");

        if (paperPlaneIcon) {
            paperPlaneIcon.style.display = "none";
        }

        const contactData = {
            name: nameInput.value.trim(),
            email: email,
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };

        try {

            const response = await fetch(
                "https://portfolio-backend-9t1n.onrender.com/api/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(contactData)
                }
            );

            if (response.ok) {

                formStatus.style.display = "block";
                formStatus.className = "form-status success";

                formStatus.innerHTML =
                    '<i class="fa-solid fa-circle-check"></i> Message sent successfully!';

                contactForm.reset();

            } else {

                const errorText = await response.text();

                console.error("Backend error:", errorText);

                formStatus.style.display = "block";
                formStatus.className = "form-status error";

                formStatus.innerHTML =
                    '<i class="fa-solid fa-circle-xmark"></i> Failed to send message.';

            }

        } catch (error) {

            console.error("Request failed:", error);

            formStatus.style.display = "block";
            formStatus.className = "form-status error";

            formStatus.innerHTML =
                '<i class="fa-solid fa-circle-xmark"></i> Unable to connect to server.';

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

        formGroups.forEach(group => {
            group.classList.remove("has-error");
        });

        formStatus.style.display = "none";
    }
}
