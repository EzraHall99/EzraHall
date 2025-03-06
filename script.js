document.addEventListener("DOMContentLoaded", () => {
  const heroText = document.querySelector(".hero h1");
  heroText.style.opacity = "0";
  heroText.style.transform = "translateY(20px)";
  setTimeout(() => {
    heroText.style.transition = "all 0.8s ease-in-out";
    heroText.style.opacity = "1";
    heroText.style.transform = "translateY(0)";
  }, 500);
});
document.addEventListener("DOMContentLoaded", () => {
  const resumeFrame = document.getElementById("resumeFrame");
  const errorMessage = document.getElementById("error-message");

  // If PDF fails to load, display error message
  resumeFrame.onerror = function () {
    resumeFrame.style.display = "none";
    errorMessage.classList.remove("hidden");
  };
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const statusMessage = document.getElementById("form-status");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                statusMessage.textContent = "✅ Message sent successfully!";
                statusMessage.classList.add("success");
                form.reset(); // Clear form fields
            } else {
                statusMessage.textContent = "❌ Error sending message. Try again later.";
                statusMessage.classList.add("error");
            }
        } catch (error) {
            statusMessage.textContent = "❌ Network error. Please check your connection.";
            statusMessage.classList.add("error");
        }

        statusMessage.classList.remove("hidden"); // Show message
    });
});

