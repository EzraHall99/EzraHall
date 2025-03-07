document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("nav-menu");
  const hamburger = document.querySelector(".hamburger");
  const themeToggle = document.querySelector(".theme-toggle");

  // 🌙 Light/Dark Mode Toggle (Fix)
  window.toggleTheme = function () {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");

    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.textContent = isLight ? "🌞" : "🌙"; // Change icon dynamically
  };

  // Apply stored theme on load
  const currentTheme = localStorage.getItem("theme") || "dark";
  if (currentTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "🌞"; // Light mode icon
  }

  // ☰ Mobile Menu Toggle (Fix)
  window.toggleMenu = function () {
    if (window.innerWidth <= 768) {
      menu.classList.toggle("active");
      menu.style.display = menu.classList.contains("active") ? "flex" : "none";
    }
  };

  // Ensure the menu reappears when resizing back to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      menu.style.display = "flex"; // Always show menu on desktop
    } else if (!menu.classList.contains("active")) {
      menu.style.display = "none"; // Keep hidden on mobile unless opened
    }
  });
  // Only close menu on mobile when clicking outside
  document.addEventListener("click", (event) => {
    if (window.innerWidth <= 768) {
      // Only run this for mobile views
      if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove("active");
        menu.style.display = "none";
      }
    }
  });

  // Ensure menu closes when clicking a link (only on mobile)
  document.querySelectorAll("#nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        menu.classList.remove("active");
        menu.style.display = "none";
      }
    });
  });
});

// ✨ Terminal Effect Fix
const terminal = document.getElementById("terminal");
const cursor = document.createElement("span");
cursor.classList.add("cursor");
cursor.textContent = "█";
terminal.appendChild(cursor);

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
    cursor.style.animation = "blink 1s infinite";
    return;
  }

  let currentLine = lines[lineIndex];
  let displayText = terminal.textContent.replace(/█$/, "");

  if (!isDeleting) {
    displayText += currentLine[charIndex];
    charIndex++;

    if (charIndex === currentLine.length) {
      if (currentLine.includes("<backspace>") && !errorTyped) {
        errorTyped = true;
        isDeleting = true;
        setTimeout(typeEffect, 500);
        return;
      }
      charIndex = 0;
      lineIndex++;
      displayText += "\n";
    }
  } else {
    displayText = displayText.slice(0, -1);
    charIndex--;

    if (charIndex === 14) {
      isDeleting = false;
      charIndex++;
      displayText += "error...";
    }
  }

  terminal.textContent = displayText;
  terminal.appendChild(cursor);
  setTimeout(typeEffect, isDeleting ? 50 : 80);
}
typeEffect();

// ✅ Chatbot Integration
document
  .getElementById("chatInput")
  .addEventListener("keypress", async function (e) {
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
        let response = await fetch(
          "https://webpage-bot.ezrajhall0.workers.dev",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
          }
        );

        let data = await response.json();
        botDiv.textContent =
          data.choices?.[0]?.message?.content || "⚠️ No response from AI.";
      } catch (error) {
        botDiv.textContent = "❌ Network Error. Try again later.";
        console.error("Chatbot Fetch Error:", error);
      }
    }
  });
