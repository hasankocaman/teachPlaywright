const fs = require('fs');
const src = fs.readFileSync('./src/data/pythonData.js', 'utf8');

const lines = src.split('\n');
let s2Start = -1, s4Start = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('// ── 2. FOUNDATIONS') && s2Start === -1) s2Start = i;
  if (lines[i].includes('// ── 4. ADVANCED') && s4Start === -1) s4Start = i;
}
console.log(`Sections 2+3: lines ${s2Start+1}–${s4Start+1}`);

let fixCount = 0;

// Process each line in the new sections with a character-level state machine
for (let li = s2Start; li < s4Start; li++) {
  const line = lines[li];

  // Skip lines that are inside template literals (code blocks) or comments
  // Template literal lines: we track via multi-line state
  // For simplicity: only process lines that have JS string syntax (not pure Python code)

  let result = '';
  let i = 0;
  while (i < line.length) {
    // Check if we're at start of a single-quoted string value
    // (i.e., preceded by a value context: : ', { ', , ', [ ')
    // We'll process any single-quoted string on these lines

    if (line[i] === "'" && (i === 0 || line[i-1] !== '\\')) {
      // We're at the opening of a single-quoted string
      // Collect the string contents until closing unescaped '
      let inner = '';
      let j = i + 1;
      let hasProblematic = false;

      while (j < line.length) {
        if (line[j] === '\\' && j + 1 < line.length) {
          // Escaped character — keep as-is
          inner += line[j] + line[j+1];
          j += 2;
          continue;
        }
        if (line[j] === "'") {
          // End of single-quoted string
          break;
        }
        // Check for unescaped apostrophe-like patterns (but we're inside the string now)
        // An unescaped ' inside the string would be the problematic case
        // Since we're scanning char by char, any ' we find here IS the closing quote
        // So this never triggers — we always hit the closing ' first
        inner += line[j];
        j++;
      }

      if (j < line.length && line[j] === "'") {
        // Check if this string value contains apostrophes that need fixing
        // (inner contains the content between the quotes)
        // Re-scan the inner content for apostrophes
        if (inner.includes("'")) {
          // This string has content with apostrophes — but we already consumed it cleanly
          // The issue is that the 'closing' quote we found might actually be an internal one
          // We need to properly handle this case

          // Instead: find the REAL end of the string by doing a proper parse
          // Reset and do a proper scan
          let realInner = '';
          let k = i + 1;
          let depth = 0;
          while (k < line.length) {
            if (line[k] === '\\' && k + 1 < line.length) {
              realInner += line[k] + line[k+1];
              k += 2;
              continue;
            }
            if (line[k] === "'") {
              // Is this an internal apostrophe or the closing quote?
              // If followed by a word char (letter), it's an internal apostrophe (Turkish/English)
              // If followed by non-word or is the last meaningful char, it's the closing quote
              // This is inherently ambiguous...
              // Strategy: treat it as closing only if it's at a string boundary position
              // (i.e., not inside a word)

              const prevChar = k > 0 ? line[k-1] : '';
              const nextChar = k + 1 < line.length ? line[k+1] : '';

              // If prev AND next are both word chars: it's a contraction (it's, Java'da)
              // If it looks like string boundary (followed by , } ] : space): closing quote
              const isClosing = /[\s,}\]:]/.test(nextChar) || nextChar === '"' || nextChar === "'";

              if (isClosing) {
                j = k; // Found the real closing quote
                break;
              } else {
                // Internal apostrophe — include it
                realInner += line[k];
                k++;
              }
            } else {
              realInner += line[k];
              k++;
            }
          }
          // Use realInner as the actual content
          inner = realInner;
          j = k;
        }

        // Now convert to double-quoted string, escaping any " inside
        const doubleQuoted = '"' + inner.replace(/"/g, '\\"').replace(/\\'/g, "'") + '"';
        result += doubleQuoted;
        fixCount++;
        i = j + 1; // Skip past the closing quote
      } else {
        // Couldn't find closing quote — leave as-is
        result += "'";
        i++;
      }
    } else {
      result += line[i];
      i++;
    }
  }

  lines[li] = result;
}

fs.writeFileSync('./src/data/pythonData.js', lines.join('\n'));
console.log('Processed', fixCount, 'single-quoted strings → double-quoted');
