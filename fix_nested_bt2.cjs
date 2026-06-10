// Fix nested template literals in the TypeScript data file
// All unescaped backticks inside defaultCode/code template literal values need escaping
const fs = require('fs');
const src = fs.readFileSync('./src/data/typescriptData.js', 'utf8');

// Find the range we need to fix: TypeScript Intermediate + Advanced sections
const tsIntermediateStart = src.indexOf('"Intermediate TypeScript"');
const tsEndMarker = src.indexOf('"QA Use Cases"');
console.log(`Fixing chars ${tsIntermediateStart}–${tsEndMarker}`);

const prefix = src.slice(0, tsIntermediateStart);
const toFix = src.slice(tsIntermediateStart, tsEndMarker);
const suffix = src.slice(tsEndMarker);

// Process toFix: find template literal values (after defaultCode: ` or code: `)
// and escape inner backticks

let result = '';
let i = 0;

while (i < toFix.length) {
  // Check for start of a template literal value
  // Patterns: "defaultCode: `" or "code: `" (the backtick is the actual char, not escaped)
  let isTemplateValueStart = false;
  let skipLen = 0;

  if (toFix.slice(i, i + 13) === 'defaultCode: ') {
    skipLen = 13;
    if (i + 13 < toFix.length && toFix[i + 13] === '`') {
      isTemplateValueStart = true;
    }
  } else if (toFix.slice(i, i + 6) === 'code: ') {
    skipLen = 6;
    if (i + 6 < toFix.length && toFix[i + 6] === '`') {
      isTemplateValueStart = true;
    }
  }

  if (isTemplateValueStart) {
    // Write the key part and the opening backtick
    result += toFix.slice(i, i + skipLen + 1); // e.g. "defaultCode: `"
    i += skipLen + 1; // now i points to first char after the opening backtick

    // Now parse until the matching closing backtick (depth 0)
    // Inside, we need to escape any unescaped backtick
    let dollarDepth = 0; // depth of ${...} interpolation nesting

    while (i < toFix.length) {
      const ch = toFix[i];

      // Check for escaped char (\X)
      if (ch === '\\' && i + 1 < toFix.length) {
        result += ch + toFix[i + 1];
        i += 2;
        continue;
      }

      // Check for start of interpolation ${
      if (ch === '$' && i + 1 < toFix.length && toFix[i + 1] === '{') {
        dollarDepth++;
        result += '${';
        i += 2;
        continue;
      }

      // Check for end of interpolation }
      if (ch === '}' && dollarDepth > 0) {
        dollarDepth--;
        result += '}';
        i++;
        continue;
      }

      // Check for backtick
      if (ch === '`') {
        if (dollarDepth === 0) {
          // This is the closing backtick of the template literal value
          result += '`';
          i++;
          break; // exit inner loop — template literal value is done
        } else {
          // Backtick inside ${...} — this would start a nested template literal
          // This is valid JS, but we should escape it to prevent issues
          // Actually at this depth, the backtick IS valid (starts inner template literal)
          // We need to escape it to produce the correct string value
          result += '\\`';
          i++;
          continue;
        }
      }

      result += ch;
      i++;
    }
  } else {
    result += toFix[i];
    i++;
  }
}

const newContent = prefix + result + suffix;
fs.writeFileSync('./src/data/typescriptData.js', newContent);
console.log('Done! Fixed nested template literals.');
