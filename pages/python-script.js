function typeIntroMessage() {
  const introLines = [
    ">>> Welcome to the Python Interactive Shell",
    ">>> Type a command and press Enter or click 'Send Command'",
  ];
  const terminalOutput = document.querySelector(".py-terminal-output");
  terminalOutput.innerHTML = "";
  let lineIndex = 0;
  let charIndex = 0;
  function typeLine() {
    if (lineIndex < introLines.length) {
      let currentLine = introLines[lineIndex];
      if (charIndex < currentLine.length) {
        terminalOutput.innerHTML += currentLine[charIndex];
        charIndex++;
        setTimeout(typeLine, 50);
      } else {
        terminalOutput.innerHTML += "<br>";
        charIndex = 0;
        lineIndex++;
        setTimeout(typeLine, 300);
      }
    } else {
      terminalOutput.innerHTML += "<br>";
    }
  }
  typeLine();
}

typeIntroMessage();

document.addEventListener("Py-Terminal", () => {
  const terminalOutput = document.querySelector(".py-terminal-output");
  const commandLine = document.querySelector(".py-command-line");
  const sendButton = document.querySelector(".py-send-btn");
  let commandList = {};

  async function loadCommands() {
    try {
      const response = await fetch("commands.json");
      commandList = await response.json();
    } catch (error) {
      console.error("Error loading commands.json:", error);
    }
  }
  loadCommands();

  function handleCommand() {
    const input = commandLine.value.trim();
    commandLine.value = "";
    if (input !== "") {
      terminalOutput.innerHTML += `<p><span class="py-prompt">> </span>${input}</p>`;
      const outputText = commandList[input] || "SyntaxError: invalid syntax";
      // Apply error animation if command not found
      const errorClass = commandList[input] ? "" : "py-error";
      terminalOutput.innerHTML += `<p class="${errorClass}">${outputText}</p>`;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  }

  commandLine.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCommand();
    }
  });
  sendButton.addEventListener("click", handleCommand);
});