'use strict';

const fs = require('fs');
const path = require('path');

const PRESETS_DIR = __dirname;

/**
 * Load all presets from this directory.
 * Each preset is a .js file exporting { name, description, rules }.
 */
function loadPresets() {
  const presets = new Map();
  const files = fs.readdirSync(PRESETS_DIR).filter(f => f.endsWith('.js') && f !== 'index.js');

  for (const file of files) {
    const preset = require(path.join(PRESETS_DIR, file));
    const key = file.replace('.js', '');
    presets.set(key, preset);
  }

  return presets;
}

function getPreset(key) {
  const presets = loadPresets();
  return presets.get(key) || null;
}

function listPresets() {
  return loadPresets();
}

module.exports = { loadPresets, getPreset, listPresets };
