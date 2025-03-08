function typeIntroMessage() {
  const introLines = [
    ">>> Welcome to the Python Interactive Shell",
    ">>> Type a command and press Enter or click 'Send Command'",
  ];

  const terminalOutput = document.querySelector(".py-terminal-output");
  terminalOutput.innerHTML = ""; // Clear existing text

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
      terminalOutput.innerHTML += "<br>"; // Ensure space after typing
    }
  }

  typeLine();
}

typeIntroMessage(); // Call it on page load

document.addEventListener("DOMContentLoaded", () => {
  const terminalOutput = document.querySelector(".py-terminal-output");
  const commandLine = document.querySelector(".py-command-line");
  const sendButton = document.querySelector(".py-send-btn");

  /*   function readKeyInput() {
      document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          console.log("Enter Pressed");
        } else if (event.key !== "Enter" && event.key !== "") {
          console.log(event.key);
        }
      });
    }
    readKeyInput();
   */
  if (!terminalOutput || !commandLine || !sendButton) return; // Ensure elements exist

  // Load predefined Python commands once and store them in memory
  let commandList = {};
  async function loadCommands() {
    try {
      const response = await fetch("commands.json");
      commandList = await response.json();
    } catch (error) {
      console.error("⚠️ Error loading commands.json:", error);
    }
  }
  loadCommands(); // Load commands when the page loads

  function handleCommand() {
    const input = commandLine.value.trim();
    commandLine.value = ""; // Clear input after enter

    if (input !== "") {
      // Display user input
      terminalOutput.innerHTML += `<p><span class="py-prompt">> </span>${input}</p>`;

      // Get response from stored commands
      const output = commandList[input] || `SyntaxError: invalid syntax`;
      terminalOutput.innerHTML += `<p>${output}</p>`;

      // Auto-scroll to latest entry
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  }

  // Handle Enter key press
  commandLine.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCommand();
    }
  });

  // Handle Click on "Send Command" Button
  sendButton.addEventListener("click", handleCommand);
});
