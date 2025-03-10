document.addEventListener("DOMContentLoaded", () => {
  initializeTerminal();
  initializeEditor();
  loadCommands();
});

async function loadCommands() {
  try {
    const response = await fetch("python_commands.json");
    window.commandList = await response.json();
  } catch (error) {
    console.error("Error loading commands:", error);
  }
}

function initializeTerminal() {
  const terminalOutput = document.querySelector(".py-terminal-output");
  const commandLine = document.querySelector(".py-command-line");
  const sendButton = document.querySelector(".py-send-btn");

  function addOutput(text, isError = false) {
    const outputClass = isError ? "py-error" : "";
    terminalOutput.insertAdjacentHTML("beforeend", `<p class="${outputClass}">${text}</p>`);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function handleCommand() {
    let input = commandLine.value.trim();
    if (!input) return;
    commandLine.value = "";

    terminalOutput.insertAdjacentHTML("beforeend", `<p><span class="py-prompt">>>> </span>${input}</p>`);

    if (window.commandList[input]) {
      let response = window.commandList[input];
      addOutput(`Function: ${response.function}<br>Alias: ${response.alias}<br>Help: ${response.help}<br>Syntax: ${response.syntax}`);
    } else if (input.startsWith("admin_add_new_command")) {
      const args = input.match(/-function '(.+?)' -alias '(.+?)' -help '(.+?)' -syntax '(.+?)'/);
      if (args) {
        const newCommand = {
          function: args[1],
          alias: args[2],
          help: args[3],
          syntax: args[4]
        };
        window.commandList[args[2]] = newCommand;
        addOutput(`New command added: ${args[2]}`);
      } else {
        addOutput("Error: Invalid command format.", true);
      }
    } else {
      addOutput("Error: Command not found.", true);
    }
  }

  commandLine.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCommand();
    }
  });

  sendButton.addEventListener("click", handleCommand);
}

function initializeEditor() {
  document.querySelectorAll(".py-tabs button").forEach((button) => {
    button.addEventListener("click", function () {
      switchTab(this.getAttribute("data-tab"));
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll(".py-editor").forEach((editor) => editor.classList.add("hidden"));
  document.getElementById(tabId).classList.remove("hidden");

  document.querySelectorAll(".py-tabs button").forEach((btn) => btn.classList.remove("active"));
  document.querySelector(`.py-tabs button[data-tab="${tabId}"]`).classList.add("active");
}
