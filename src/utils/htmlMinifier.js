/**
 * Minifies HTML by removing unnecessary whitespace and line breaks
 * while preserving the structure and functionality of the HTML
 *
 * @param {string} html - The HTML string to minify
 * @returns {string} - The minified HTML string
 */
export const minifyHTML = (html) => {
  return html
    // Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Remove whitespace between tags
    .replace(/>\s+</g, '><')
    // Remove leading/trailing whitespace
    .trim()
    // Collapse multiple spaces into one (but preserve spaces in text content)
    .replace(/\s{2,}/g, ' ');
};
