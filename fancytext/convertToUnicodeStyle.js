const unicodeStyles = {
  bold: {
    offsetLower: 0x1D41A, // 'a' to 'z'
    offsetUpper: 0x1D400, // 'A' to 'Z'
    offsetDigit: 0x1D7CE  // '0' to '9'
  },
  italic: {
    offsetLower: 0x1D44E,
    offsetUpper: 0x1D434,
    offsetDigit: null
  },
  bold_italic: {
    offsetLower: 0x1D482,
    offsetUpper: 0x1D468,
    offsetDigit: null
  },
  script: {
    offsetLower: 0x1D4B6,
    offsetUpper: 0x1D49C,
    offsetDigit: null,
    exceptions: {
      B: 'ℬ', E: 'ℰ', F: 'ℱ', H: 'ℋ', I: 'ℐ', L: 'ℒ',
      M: 'ℳ', R: 'ℛ', e: 'ℯ', g: 'ℊ', o: 'ℴ'
    }
  },
  bold_script: {
    offsetLower: 0x1D4EA,
    offsetUpper: 0x1D4D0,
    offsetDigit: null
  },
  fraktur: {
    offsetLower: 0x1D51E,
    offsetUpper: 0x1D504,
    offsetDigit: null,
    exceptions: {
      C: 'ℭ', H: 'ℌ', I: 'ℑ', R: 'ℜ', Z: 'ℨ'
    }
  },
  double_struck: {
    offsetLower: 0x1D552,
    offsetUpper: 0x1D538,
    offsetDigit: 0x1D7D8,
    exceptions: {
      C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ'
    }
  },
  sans: {
    offsetLower: 0x1D5BA,
    offsetUpper: 0x1D5A0,
    offsetDigit: 0x1D7E2
  },
  sans_bold: {
    offsetLower: 0x1D5EE,
    offsetUpper: 0x1D5D4,
    offsetDigit: 0x1D7EC
  },
  sans_italic: {
    offsetLower: 0x1D622,
    offsetUpper: 0x1D608,
    offsetDigit: null
  },
  monospace: {
    offsetLower: 0x1D68A,
    offsetUpper: 0x1D670,
    offsetDigit: 0x1D7F6
  }
};

const availableStyles = Object.keys(unicodeStyles);
/*
[
  "bold",
  "italic",
  "bold_italic",
  "script",
  "bold_script",
  "fraktur",
  "double_struck",
  "sans",
  "sans_bold",
  "sans_italic",
  "monospace"
]
*/

function convertToUnicodeStyle(text, styleName) {
  const style = unicodeStyles[styleName];
  if (!style) throw new Error(`Unknown style: ${styleName}`);

  const result = [...text].map(char => {
    const code = char.charCodeAt(0);

    if (style.exceptions && style.exceptions[char]) {
      return style.exceptions[char];
    }

    // Lowercase a-z
    if (code >= 0x61 && code <= 0x7A && style.offsetLower) {
      return String.fromCodePoint(style.offsetLower + (code - 0x61));
    }

    // Uppercase A-Z
    if (code >= 0x41 && code <= 0x5A && style.offsetUpper) {
      return String.fromCodePoint(style.offsetUpper + (code - 0x41));
    }

    // Digits 0-9
    if (code >= 0x30 && code <= 0x39 && style.offsetDigit) {
      return String.fromCodePoint(style.offsetDigit + (code - 0x30));
    }

    // Leave unchanged
    return char;
  });

  return result.join('');
}
