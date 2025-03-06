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
