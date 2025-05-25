const convert = document.getElementById("convert");
const decode = document.getElementById("decode");
const copy = document.getElementById("copy");
const reset = document.getElementById("reset");
const text = document.getElementById("text");
const code = document.getElementById("code");

// Morse code mapping
const charToMorse = {
  "A": "•⁃", "B": "⁃•••", "C": "⁃•⁃•", "D": "⁃••", "E": "•", 
  "F": "••⁃•", "G": "⁃⁃•", "H": "••••", "I": "••", "J": "•⁃⁃⁃", 
  "K": "⁃•⁃", "L": "•⁃••", "M": "⁃⁃", "N": "⁃•", "O": "⁃⁃⁃", 
  "P": "•⁃⁃•", "Q": "⁃⁃•⁃", "R": "•⁃•", "S": "•••", "T": "⁃", 
  "U": "••⁃", "V": "•••⁃", "W": "•⁃⁃", "X": "⁃••⁃", "Y": "⁃•⁃⁃", 
  "Z": "⁃⁃••", "1": "•⁃⁃⁃⁃", "2": "••⁃⁃⁃", "3": "•••⁃⁃", 
  "4": "••••⁃", "5": "•••••", "6": "⁃••••", "7": "⁃⁃•••", 
  "8": "⁃⁃⁃••", "9": "⁃⁃⁃⁃•", "0": "⁃⁃⁃⁃⁃", " ": "/"
};

// Reverse mapping for decoding
const morseToChar = Object.fromEntries(
  Object.entries(charToMorse).map(([key, value]) => [value, key])
);

// Convert text to Morse code
function textToMorse(inputText) {
  return inputText.toUpperCase().split("").map(char => 
    charToMorse[char] || char
  ).join(" ");
}

// Convert Morse code to text
function morseToText(morseCode) {
  return morseCode.split(" ").map(symbol => 
    morseToChar[symbol] || symbol
  ).join("");
}

// Update output and save to localStorage
function updateOutput() {
  const inputText = text.value;
  const morseCode = textToMorse(inputText);
  
  code.innerText = morseCode;
  localStorage.setItem("text", inputText);
  localStorage.setItem("code", morseCode);
}

// Decode Morse code
function decodeMorse() {
  const morseCode = code.innerText;
  const decodedText = morseToText(morseCode);
  
  text.value = decodedText;
  localStorage.setItem("text", decodedText);
}

// Copy Morse code to clipboard
function copyToClipboard() {
  navigator.clipboard.writeText(code.innerText)
    .then(() => {
      copy.textContent = "Copied!";
      setTimeout(() => {
        copy.textContent = "Copy";
      }, 2000);
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
}

// Event listeners
text.addEventListener("input", updateOutput);

convert.addEventListener("click", () => {
  updateOutput();
  text.focus();
});

decode.addEventListener("click", () => {
  decodeMorse();
  text.focus();
});

copy.addEventListener("click", copyToClipboard);

reset.addEventListener("click", () => {
  text.value = "";
  code.innerText = "";
  localStorage.removeItem("text");
  localStorage.removeItem("code");
  text.focus();
});

// Initialize from localStorage
window.addEventListener("load", () => {
  text.value = localStorage.getItem("text") || "";
  code.innerText = localStorage.getItem("code") || "";
  text.focus();
});
