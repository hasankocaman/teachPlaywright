// Fix nested template literals in editor/code defaultCode blocks
const fs = require('fs');
let src = fs.readFileSync('./src/data/typescriptData.js', 'utf8');

// Find the new Intermediate section (lines added by transform_ts3.cjs)
// We need to escape inner backticks in defaultCode/code template literal values
// within the TypeScript intermediate section only

// Strategy: parse char by char, track when we're inside a template literal value
// (preceded by defaultCode: ` or code: `), and escape any inner ` that starts
// nested template literals

let result = '';
let i = 0;
let inTemplateLiteralValue = false;
let depth = 0; // tracks ${...} interpolation depth within template literal

// Find the Intermediate section start and Advanced section start
const tsStart = src.indexOf('"Intermediate TypeScript"');
const tsEnd = src.indexOf('"Advanced TypeScript"');
console.log(`Processing chars ${tsStart}–${tsEnd}`);

const before = src.slice(0, tsStart);
const section = src.slice(tsStart, tsEnd);
const after = src.slice(tsEnd);

// In the section, fix nested template literals within defaultCode: `...` values
// by escaping inner backticks as \`
let fixed = section;

// Find all template literal values that are defaultCode/code block content
// These start after: defaultCode: ` or code: `
// and end at the matching closing backtick

function fixTemplateBody(str) {
  // str is the content inside a template literal (without outer backticks)
  // We need to escape any backtick that would start a nested template literal
  // (i.e., backticks in the TypeScript code that's inside the string)

  let out = '';
  let j = 0;
  while (j < str.length) {
    if (str[j] === '`') {
      // This is an unescaped backtick inside the template literal body
      // We need to escape it
      out += '\\`';
      j++;
    } else if (str[j] === '\\' && j + 1 < str.length && str[j+1] === '`') {
      // Already escaped backtick — keep as-is
      out += '\\`';
      j += 2;
    } else {
      out += str[j];
      j++;
    }
  }
  return out;
}

// Process the section to find template literal values and fix inner backticks
// We look for: `: ` followed by content ending at matching `
let fixedSection = '';
let pos = 0;

while (pos < section.length) {
  // Look for the start of a template literal value
  // Pattern: `: \`` or `Code: \`` type
  const patterns = ['defaultCode: `', 'code: `'];
  let found = false;

  for (const pat of patterns) {
    if (section.startsWith(pat, pos)) {
      // Found start of a template literal value
      const startPos = pos + pat.length; // position after the opening backtick

      // Find the matching closing backtick (accounting for ${...} depth)
      let endPos = startPos;
      let dollarDepth = 0;
      let content = '';

      while (endPos < section.length) {
        const ch = section[endPos];
        if (ch === '\\' && endPos + 1 < section.length) {
          // Escape sequence — skip both chars
          content += ch + section[endPos + 1];
          endPos += 2;
          continue;
        }
        if (ch === '$' && endPos + 1 < section.length && section[endPos + 1] === '{') {
          dollarDepth++;
          content += '${';
          endPos += 2;
          continue;
        }
        if (ch === '}' && dollarDepth > 0) {
          dollarDepth--;
          content += ch;
          endPos++;
          continue;
        }
        if (ch === '`' && dollarDepth === 0) {
          // Found the closing backtick
          break;
        }
        content += ch;
        endPos++;
      }

      // Fix inner backticks in content (those used in TypeScript code)
      // But we need to be careful: only fix backticks at depth 0 that aren't already escaped
      let fixedContent = '';
      let k = 0;
      while (k < content.length) {
        if (content[k] === '\\' && k + 1 < content.length) {
          fixedContent += content[k] + content[k+1];
          k += 2;
          continue;
        }
        if (content[k] === '`') {
          fixedContent += '\\`';
          k++;
          continue;
        }
        fixedContent += content[k];
        k++;
      }

      fixedSection += pat + fixedContent + '`';
      pos = endPos + 1; // skip past the closing backtick
      found = true;
      break;
    }
  }

  if (!found) {
    fixedSection += section[pos];
    pos++;
  }
}

const newContent = before + fixedSection + after;
fs.writeFileSync('./src/data/typescriptData.js', newContent);
console.log('Fixed nested template literals in Intermediate section');
