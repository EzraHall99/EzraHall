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
      menu.style.display = menu.classList.contains("active") ? "flex" : "none";
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
