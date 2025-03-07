const menu = document.getElementById("nav-menu");

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("DOMContentLoaded", () => {
    let e = document.querySelector(".hero h1");
    (e.style.opacity = "0"),
      (e.style.transform = "translateY(20px)"),
      setTimeout(() => {
        (e.style.transition = "all 0.8s ease-in-out"),
          (e.style.opacity = "1"),
          (e.style.transform = "translateY(0)");
      }, 500);
  }),
    document.addEventListener("DOMContentLoaded", () => {
      let e = document.getElementById("resumeFrame"),
        t = document.getElementById("error-message");
      e.onerror = function () {
        (e.style.display = "none"), t.classList.remove("hidden");
      };
    }),
    document.addEventListener("DOMContentLoaded", () => {
      let e = document.getElementById("contact-form"),
        t = document.getElementById("form-status");
      e.addEventListener("submit", async (s) => {
        s.preventDefault();
        let n = new FormData(e);
        try {
          let r = await fetch(e.action, { method: "POST", body: n });
          r.ok
            ? ((t.textContent = "✅ Message sent successfully!"),
              t.classList.add("success"),
              e.reset())
            : ((t.textContent = "❌ Error sending message. Try again later."),
              t.classList.add("error"));
        } catch (a) {
          (t.textContent = "❌ Network error. Please check your connection."),
            t.classList.add("error");
        }
        t.classList.remove("hidden");
      });
    });
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("nav-menu");
    const hamburger = document.querySelector(".hamburger");

    // Toggle menu visibility (Only for Mobile)
    window.toggleMenu = function () {
      if (window.innerWidth <= 768) {
        // Only toggle if screen is mobile
        menu.classList.toggle("active");
        menu.style.display = menu.classList.contains("active")
          ? "flex"
          : "none";
      }
    };

    // Close menu when clicking a link (Only for Mobile)
    document.querySelectorAll("#nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          // Prevents hiding on desktop
          menu.classList.remove("active");
          menu.style.display = "none";
        }
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove("active");
      menu.style.display = "none";
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector(".theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "dark";

    // Apply stored theme
    if (currentTheme === "light") {
      document.body.classList.add("light-theme");
      themeToggle.textContent = "🌞"; // Sun icon for light mode
    }

    // Toggle theme function
    window.toggleTheme = function () {
      document.body.classList.toggle("light-theme");

      // Save preference to localStorage
      if (document.body.classList.contains("light-theme")) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌞"; // Change icon
      } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "🌙";
      }
    };
  });
  document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal");
    const cursor = document.querySelector(".cursor");

    const lines = [
      "> Welcome to Ezra's Portfolio...",
      "> Software Developer | Power Platform Specialist",
      "> Typing errror... <backspace><backspace><backspace>or...",
      "> Type 'help' for more info.",
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let errorTyped = false;

    function typeEffect() {
      if (lineIndex >= lines.length) {
        cursor.style.animation = "blink 1s infinite"; // Make cursor blink after finishing
        return;
      }

      let currentLine = lines[lineIndex];
      let displayText = terminal.innerHTML.replace(/█$/, ""); // Remove cursor before updating

      if (!isDeleting) {
        displayText += currentLine[charIndex];
        charIndex++;

        if (charIndex === currentLine.length) {
          if (currentLine.includes("<backspace>") && !errorTyped) {
            errorTyped = true;
            isDeleting = true;
            setTimeout(typeEffect, 500); // Pause before deleting
            return;
          }
          charIndex = 0;
          lineIndex++;
          displayText += "<br/>";
        }
      } else {
        displayText = displayText.slice(0, -1);
        charIndex--;

        if (charIndex === 14) {
          // Stop deleting at this index
          isDeleting = false;
          charIndex++;
          displayText += "error...";
        }
      }

      terminal.innerHTML = displayText + "█"; // Add cursor back
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    typeEffect();
  });
  document
    .getElementById("testimonial-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      let name = document.getElementById("name").value;
      let message = document.getElementById("message").value;

      let testimonial = document.createElement("p");
      testimonial.innerHTML = `<strong>${name}</strong>: ${message}`;

      document.getElementById("testimonial-list").appendChild(testimonial);

      // Clear form
      this.reset();
    });
    document.getElementById("chatInput").addEventListener("keypress", async function (e) {
      if (e.key === "Enter") {
        let userMessage = this.value;
        this.value = "";
    
        let chatbox = document.getElementById("chatbox");
        let userDiv = document.createElement("div");
        userDiv.classList.add("user-message");
        userDiv.textContent = userMessage;
        chatbox.appendChild(userDiv);
    
        let botDiv = document.createElement("div");
        botDiv.classList.add("bot-message");
        botDiv.textContent = "Thinking...";
        chatbox.appendChild(botDiv);
    
        try {
          let response = await fetch("https://webpage-bot.ezrajhall0.workers.dev", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
          });
    
          let data = await response.json();
          if (data.choices && data.choices[0] && data.choices[0].message) {
            botDiv.textContent = data.choices[0].message.content;
          } else {
            botDiv.textContent = "⚠️ No response from AI.";
          }
        } catch (error) {
          botDiv.textContent = "❌ Network Error. Try again later.";
          console.error("Chatbot Fetch Error:", error);
        }
      }
    });
    
});
