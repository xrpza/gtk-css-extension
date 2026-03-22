// @ts-check
'use strict';

/** @type {typeof import('path')} */
const path = require('path');

/**
 * Reads the optional @css-root directive from CSS text and returns the base
 * directory to use for resolving import paths.
 *
 * The directive is a comment in the form:
 *   /* @css-root: /absolute/or/relative/path * /
 *
 * If no directive is found, falls back to the directory of the current file.
 * Supports ~ expansion for the user's home directory.
 *
 * @param {string} text             CSS source text
 * @param {string} documentFsPath   absolute path of the current file
 * @returns {string}                base directory for import resolution
 */
function resolveImportBase(text, documentFsPath) {
  const match = text.match(/\/\*\s*@css-root:\s*(.+?)\s*\*\//);
  if (!match) return path.dirname(documentFsPath);

  // Expand leading ~ to the user's home directory
  const deployPath = match[1].trim().replace(/^~/, process.env.HOME || process.env.USERPROFILE || '~');

  // Support both absolute and relative (relative to the current file) paths
  if (path.isAbsolute(deployPath)) return deployPath;
  return path.resolve(path.dirname(documentFsPath), deployPath);
}

/**
 * Extracts all import statements from text and returns absolute paths.
 * @param {string} text
 * @param {string} documentFsPath  absolute path of the current file
 * @returns {string[]}
 */
function extractImports(text, documentFsPath) {
  const dir = resolveImportBase(text, documentFsPath);
  const result = [];
  // Supports: @import "file.css"; @import 'file.css'; @import url("file.css");
  const regex = /@import\s+(?:url\s*\(\s*)?['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const resolved = path.resolve(dir, match[1]);
    result.push(resolved);
  }
  return result;
}

module.exports = { resolveImportBase, extractImports };