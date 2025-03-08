document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("nav-menu");
  const hamburger = document.querySelector(".hamburger");
  const themeToggle = document.querySelector(".theme-toggle");
  const dropdown = document.querySelector(".dropdown");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const skillsDropdown = document.getElementById("skillsDropdown");

  // 🌙 Light/Dark Mode Toggle
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

  // ☰ Mobile Menu Toggle
  window.toggleMenu = function () {
    if (window.innerWidth <= 768) {
      menu.classList.toggle("active");
      menu.style.display = menu.classList.contains("active") ? "flex" : "none";
    }
  };

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      menu.style.display = "flex";
    } else if (!menu.classList.contains("active")) {
      menu.style.display = "none";
    }
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth <= 768) {
      if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove("active");
        menu.style.display = "none";
      }
    }
  });

  document.querySelectorAll("#nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        menu.classList.remove("active");
        menu.style.display = "none";
      }
    });
  });

  if (window.innerWidth <= 768) {
    skillsDropdown.addEventListener("click", (event) => {
      event.preventDefault(); // Prevents jumping to another section
      dropdown.classList.toggle("active");
      dropdownMenu.style.display = dropdown.classList.contains("active")
        ? "block"
        : "none";
    });

    document.addEventListener("click", (event) => {
      if (
        !dropdown.contains(event.target) &&
        !skillsDropdown.contains(event.target)
      ) {
        dropdown.classList.remove("active");
        dropdownMenu.style.display = "none";
      }
    });
  }
});

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
      if (!(lineIndex === lines.length)) {
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

  // Handle sending message
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

  // Send message when clicking the send button
  sendChat.addEventListener("click", sendMessage);

  // Send message when pressing Enter
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});
