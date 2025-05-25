document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const textInput = document.getElementById('text-input');
  const convertBtn = document.getElementById('convert-btn');
  const resetBtn = document.getElementById('reset-btn');
  const codeOutput = document.getElementById('code-output');

  // Morse Code Mapping
  const morseCodeMap = {
    "A": "•⁃", "B": "⁃•••", "C": "⁃•⁃•", "D": "⁃••", "E": "•", 
    "F": "••⁃•", "G": "⁃⁃•", "H": "••••", "I": "••", "J": "•⁃⁃⁃", 
    "K": "⁃•⁃", "L": "•⁃••", "M": "⁃⁃", "N": "⁃•", "O": "⁃⁃⁃", 
    "P": "•⁃⁃•", "Q": "⁃⁃•⁃", "R": "•⁃•", "S": "•••", "T": "⁃", 
    "U": "••⁃", "V": "•••⁃", "W": "•⁃⁃", "X": "⁃••⁃", "Y": "⁃•⁃⁃", 
    "Z": "⁃⁃••", "1": "•⁃⁃⁃⁃", "2": "••⁃⁃⁃", "3": "•••⁃⁃", 
    "4": "••••⁃", "5": "•••••", "6": "⁃••••", "7": "⁃⁃•••", 
    "8": "⁃⁃⁃••", "9": "⁃⁃⁃⁃•", "0": "⁃⁃⁃⁃⁃", " ": "/"
  };

  // Convert text to Morse code
  const convertToMorse = (text) => {
    return text.toUpperCase().split('').map(char => 
      morseCodeMap[char] || char
    ).join(' ');
  };

  // Update output and save to localStorage
  const updateOutput = () => {
    const text = textInput.value;
    const morseCode = convertToMorse(text);
    
    codeOutput.textContent = morseCode;
    localStorage.setItem('morseConverterText', text);
    localStorage.setItem('morseConverterCode', morseCode);
  };

  // Event Listeners
  textInput.addEventListener('input', updateOutput);
  
  convertBtn.addEventListener('click', () => {
    updateOutput();
    textInput.focus();
  });
  
  resetBtn.addEventListener('click', () => {
    textInput.value = '';
    codeOutput.textContent = '';
    localStorage.removeItem('morseConverterText');
    localStorage.removeItem('morseConverterCode');
    textInput.focus();
  });

  // Initialize from localStorage
  const initFromStorage = () => {
    textInput.value = localStorage.getItem('morseConverterText') || '';
    codeOutput.textContent = localStorage.getItem('morseConverterCode') || '';
    textInput.focus();
  };

  initFromStorage();
});
