import { readFileSync, writeFileSync, existsSync } from "fs";

/**
 * Load JSON data from a file.
 * If the file does not exist, it creates one with the default value.
 *
 * @param {string} filePath - Path to the JSON file
 * @param {Object|Array} defaultValue - Default data to use if file doesn't exist
 * @returns {Object|Array} - Parsed JSON content
 */
export function loadJson(filePath, defaultValue = {}) {
  if (existsSync(filePath)) {
    try {
      return JSON.parse(readFileSync(filePath, "utf-8"));
    } catch (err) {
      console.error(`❌ Failed to parse JSON at ${filePath}:`, err);
      return defaultValue;
    }
  }
  writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
  return defaultValue;
}

/**
 * Save JSON data to a file (pretty-printed).
 *
 * @param {string} filePath - Path to the JSON file
 * @param {Object|Array} data - Data to save
 */
export function saveJson(filePath, data) {
  try {
    writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`❌ Failed to write JSON at ${filePath}:`, err);
  }
}
