document.addEventListener("DOMContentLoaded", () => {
  /******** GLOBAL SCRIPTS ********/
  const themeToggle = document.querySelector(".theme-toggle");
  window.toggleTheme = function () {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.textContent = isLight ? "🌞" : "🌙";
  };

  const currentTheme = localStorage.getItem("theme") || "dark";
  if (currentTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "🌞";
  }

  // Sticky Header
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  // Global Chatbot
  const chatInput = document.getElementById("chatInput");
  chatInput.addEventListener("keypress", async function (e) {
    if (e.key === "Enter") {
      let userMessage = this.value;
      this.value = "";
      const chatbox = document.getElementById("chatbox");
      const userDiv = document.createElement("div");
      userDiv.classList.add("user-message");
      userDiv.textContent = userMessage;
      chatbox.appendChild(userDiv);
      const botDiv = document.createElement("div");
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

  /******** MOBILE-SPECIFIC SCRIPTS ********/
  const menu = document.getElementById("nav-menu");
  const hamburger = document.querySelector(".hamburger");
  const skillsDropdown = document.getElementById("skillsDropdown");

  // Toggle the mobile nav menu via the hamburger
  window.toggleMenu = function () {
    if (window.innerWidth <= 768) {
      menu.classList.toggle("active");
      hamburger.classList.toggle("active");
    }
  };
  hamburger.addEventListener("click", window.toggleMenu);

  // Toggle "My Skills" dropdown on click
  skillsDropdown.addEventListener("click", (event) => {
    if (window.innerWidth <= 768) {
      event.preventDefault();
      // Prevent any other click handlers (like the document one) from undoing this toggle:
      event.stopImmediatePropagation();
      const dropdownParent = event.currentTarget.parentElement;
      dropdownParent.classList.toggle("active");
    }
  });

  // Document click: if clicking outside the nav or dropdowns, close them
  document.addEventListener("click", (event) => {
    if (window.innerWidth <= 768) {
      // If the click is outside the nav menu and hamburger, close the nav
      if (
        !event.target.closest("#nav-menu") &&
        !event.target.closest(".hamburger")
      ) {
        menu.classList.remove("active");
        hamburger.classList.remove("active");
      }
      // If the click is outside any dropdown container, close any open dropdowns
      if (!event.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown.active").forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
      }
    }
  });

  // Close nav menu when clicking on any nav link (except the dropdown toggle)
  document.querySelectorAll("#nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && link.id !== "skillsDropdown") {
        menu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  });

  /******** FULL-SIZE (DESKTOP) SCRIPTS ********/
  // Define desktop hover handlers
  function desktopHoverIn() {
    this.classList.add("active");
  }
  function desktopHoverOut() {
    this.classList.remove("active");
  }
  function setupDesktopMenu() {
    if (window.innerWidth > 768) {
      menu.style.display = "flex";
      document.querySelectorAll("#nav-menu .dropdown").forEach((dropdown) => {
        dropdown.addEventListener("mouseenter", desktopHoverIn);
        dropdown.addEventListener("mouseleave", desktopHoverOut);
      });
    } else {
      // Remove desktop hover listeners when switching to mobile
      document.querySelectorAll("#nav-menu .dropdown").forEach((dropdown) => {
        dropdown.removeEventListener("mouseenter", desktopHoverIn);
        dropdown.removeEventListener("mouseleave", desktopHoverOut);
      });
      // Also reset menu inline style
      menu.style.display = "";
    }
  }
  // Run on load and on resize
  setupDesktopMenu();
  window.addEventListener("resize", setupDesktopMenu);
});

/******** TERMINAL TYPE EFFECT (GLOBAL) ********/
const terminal = document.getElementById("terminal");
const cursor = document.createElement("span");
cursor.classList.add("cursor");
cursor.textContent = "|";
terminal.appendChild(cursor);

const lines = [
  " ",
  "C:\\> Welcome to Ezra's Portfolio...",
  "C:\\> Software Developer | Power Platform Specialist",
  "C:\\> ",
  "C:\\> Type 'help' for more info.",
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
  let displayText = terminal.innerHTML.replace(cursor.outerHTML, "");

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
      if (lineIndex !== lines.length) {
        displayText += "<br>";
      }
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
  terminal.innerHTML = displayText;
  terminal.appendChild(cursor);
  setTimeout(typeEffect, isDeleting ? 50 : 80);
}

typeEffect();

/******** CHATBOT UI TOGGLE (GLOBAL) ********/
document.addEventListener("DOMContentLoaded", () => {
  const chatbot = document.getElementById("chatbot");
  const chatIcon = document.getElementById("chatIcon");
  const closeChatbot = document.getElementById("closeChatbot");
  const chatInput = document.getElementById("chatInput");
  const sendChat = document.getElementById("sendChat");

  closeChatbot.addEventListener("click", () => {
    chatbot.classList.add("hidden");
    chatIcon.classList.remove("hidden");
  });

  chatIcon.addEventListener("click", () => {
    chatbot.classList.remove("hidden");
    chatIcon.classList.add("hidden");
  });

  chatInput.addEventListener("input", () => {
    if (chatInput.value.trim() !== "") {
      sendChat.classList.add("visible");
    } else {
      sendChat.classList.remove("visible");
    }
  });

  function sendMessage() {
    if (chatInput.value.trim() === "") return;

    let userMessage = chatInput.value.trim();
    chatInput.value = "";
    sendChat.classList.remove("visible");

    let chatbox = document.getElementById("chatbox");
    let userDiv = document.createElement("div");
    userDiv.classList.add("user-message");
    userDiv.textContent = userMessage;
    chatbox.appendChild(userDiv);

    let botDiv = document.createElement("div");
    botDiv.classList.add("bot-message");
    botDiv.textContent = "Thinking...";
    chatbox.appendChild(botDiv);

    fetch("https://webpage-bot.ezrajhall0.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        botDiv.textContent =
          data.choices?.[0]?.message?.content || "⚠️ No response from AI.";
      })
      .catch(() => {
        botDiv.textContent = "❌ Network Error. Try again later.";
      });
  }

  sendChat.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});
