'use strict';

const fs = require('fs');
const path = require('path');
const { bold, green, yellow, blue, cyan, magenta, red, gray, dim, CHECK, CROSS, ARROW, STAR, SPARKLE, BOLT, DOT, WARN } = require('./colors');
const { detectProject } = require('./detector');
const { mergeRules, mergeIntoExisting } = require('./merger');
const { loadPresets, getPreset, listPresets } = require('./presets');

const VERSION = require('../package.json').version;

function run(args) {
  const command = args[0];

  switch (command) {
    case 'init':
      return cmdInit(args.slice(1));
    case 'add':
      return cmdAdd(args.slice(1));
    case 'list':
      return cmdList(args.slice(1));
    case 'version':
    case '--version':
    case '-v':
      return cmdVersion();
    case 'help':
    case '--help':
    case '-h':
    case undefined:
      return cmdHelp();
    default:
      console.log(`\n${red(CROSS)} Unknown command: ${bold(command)}`);
      console.log(`Run ${cyan('cursorrules help')} for available commands.\n`);
      process.exitCode = 1;
  }
}

function cmdInit(args) {
  const cwd = process.cwd();
  const force = args.includes('--force') || args.includes('-f');
  const cursorrulePath = path.join(cwd, '.cursorrules');

  console.log('');
  console.log(bold(`${BOLT} cursorrules v${VERSION}`));
  console.log(gray('  Generating optimal .cursorrules for your project...\n'));

  // Check for existing file
  if (fs.existsSync(cursorrulePath) && !force) {
    console.log(`${yellow(WARN)} ${bold('.cursorrules')} already exists.`);
    console.log(`  Use ${cyan('cursorrules init --force')} to overwrite.`);
    console.log(`  Use ${cyan('cursorrules add <preset>')} to add rules to the existing file.\n`);
    return;
  }

  // Detect project
  console.log(`${blue(DOT)} Scanning project...`);
  const detected = detectProject(cwd);

  if (detected.length === 0) {
    console.log(`${yellow(WARN)} No recognizable frameworks or languages detected.`);
    console.log(`  Generating generic coding rules...\n`);
    detected.push('nodejs'); // fallback
  }

  // Show detections
  console.log(`${green(CHECK)} Detected:`);
  const presets = loadPresets();
  const matched = [];

  for (const key of detected) {
    const preset = presets.get(key);
    if (preset) {
      console.log(`  ${cyan(ARROW)} ${bold(preset.name)} ${gray(`(${preset.description})`)}`);
      matched.push(preset);
    }
  }

  if (matched.length === 0) {
    console.log(`  ${gray('No matching presets found.')}`);
    return;
  }

  // Merge rules
  console.log(`\n${blue(DOT)} Merging ${matched.length} presets...`);
  const projectName = getProjectName(cwd);
  const content = mergeRules(matched.map(p => p.rules), projectName);

  // Write file
  fs.writeFileSync(cursorrulePath, content, 'utf8');

  const lineCount = content.split('\n').length;
  console.log(`${green(CHECK)} Generated ${bold('.cursorrules')} (${lineCount} lines)`);
  console.log('');
  printProTip();
  console.log('');
}

function cmdAdd(args) {
  const presetName = args[0];

  if (!presetName) {
    console.log(`\n${red(CROSS)} Missing preset name.`);
    console.log(`  Usage: ${cyan('cursorrules add <preset>')}`);
    console.log(`  Run ${cyan('cursorrules list')} to see available presets.\n`);
    process.exitCode = 1;
    return;
  }

  const cwd = process.cwd();
  const cursorrulePath = path.join(cwd, '.cursorrules');

  console.log('');
  console.log(bold(`${BOLT} cursorrules v${VERSION}`));
  console.log('');

  // Find preset (case-insensitive)
  const presets = loadPresets();
  const key = findPresetKey(presets, presetName);

  if (!key) {
    console.log(`${red(CROSS)} Unknown preset: ${bold(presetName)}`);
    console.log(`  Run ${cyan('cursorrules list')} to see available presets.\n`);

    // Suggest close matches
    const suggestions = fuzzyMatch(presetName, Array.from(presets.keys()));
    if (suggestions.length > 0) {
      console.log(`  Did you mean: ${suggestions.map(s => cyan(s)).join(', ')}?\n`);
    }

    process.exitCode = 1;
    return;
  }

  const preset = presets.get(key);
  console.log(`${blue(DOT)} Adding ${bold(preset.name)} rules...`);

  if (fs.existsSync(cursorrulePath)) {
    // Merge into existing
    const result = mergeIntoExisting(cursorrulePath, preset.rules);
    if (result === null) {
      console.log(`${yellow(WARN)} ${bold(preset.name)} rules are already present in .cursorrules\n`);
      return;
    }
    fs.writeFileSync(cursorrulePath, result, 'utf8');
    console.log(`${green(CHECK)} Merged ${bold(preset.name)} rules into existing .cursorrules`);
  } else {
    // Create new file
    const projectName = getProjectName(cwd);
    const content = mergeRules([preset.rules], projectName);
    fs.writeFileSync(cursorrulePath, content, 'utf8');
    console.log(`${green(CHECK)} Created .cursorrules with ${bold(preset.name)} rules`);
  }

  console.log('');
  printProTip();
  console.log('');
}

function cmdList() {
  const presets = loadPresets();

  console.log('');
  console.log(bold(`${BOLT} cursorrules v${VERSION}`));
  console.log(bold(`\n${STAR} Available Presets:\n`));

  // Group presets by category
  const categories = {
    'Frontend Frameworks': ['react', 'nextjs', 'vue', 'svelte', 'angular'],
    'Backend Frameworks': ['express', 'fastapi', 'django', 'flask', 'laravel'],
    'Languages': ['typescript', 'python', 'go', 'rust', 'java', 'ruby', 'php', 'swift', 'nodejs'],
    'Tools & Infrastructure': ['tailwind', 'prisma', 'docker', 'testing', 'monorepo'],
  };

  for (const [category, keys] of Object.entries(categories)) {
    console.log(`  ${bold(magenta(category))}`);
    for (const key of keys) {
      const preset = presets.get(key);
      if (preset) {
        const lines = preset.rules.split('\n').length;
        console.log(`    ${cyan(key.padEnd(14))} ${preset.name.padEnd(20)} ${gray(`${lines} rules`)}`);
      }
    }
    console.log('');
  }

  console.log(`  ${dim('Usage:')}`);
  console.log(`    ${cyan('cursorrules init')}          ${gray('Auto-detect and generate rules')}`);
  console.log(`    ${cyan('cursorrules add react')}     ${gray('Add a specific preset')}`);
  console.log(`    ${cyan('cursorrules add tailwind')}  ${gray('Add Tailwind CSS rules')}`);
  console.log('');
  printProTip();
  console.log('');
}

function cmdVersion() {
  console.log(`cursorrules v${VERSION}`);
}

function cmdHelp() {
  console.log('');
  console.log(bold(`${BOLT} cursorrules v${VERSION}`));
  console.log(gray('  Generate optimal .cursorrules files for any project\n'));

  console.log(bold('  Commands:\n'));
  console.log(`    ${cyan('init')}            Scan project and generate .cursorrules`);
  console.log(`    ${cyan('init --force')}    Overwrite existing .cursorrules`);
  console.log(`    ${cyan('add <preset>')}    Add a specific preset to .cursorrules`);
  console.log(`    ${cyan('list')}            Show all available presets`);
  console.log(`    ${cyan('version')}         Show version`);
  console.log(`    ${cyan('help')}            Show this help message`);

  console.log(bold('\n  Examples:\n'));
  console.log(`    ${gray('$')} npx cursorrules init`);
  console.log(`    ${gray('$')} npx cursorrules add react`);
  console.log(`    ${gray('$')} npx cursorrules add tailwind`);
  console.log(`    ${gray('$')} npx cursorrules list`);

  console.log(bold('\n  How It Works:\n'));
  console.log(`    ${green(CHECK)} Scans your project (package.json, file structure, dependencies)`);
  console.log(`    ${green(CHECK)} Detects frameworks, languages, and tools`);
  console.log(`    ${green(CHECK)} Generates tailored .cursorrules with best practices`);
  console.log(`    ${green(CHECK)} Merges intelligently — no duplicate rules`);

  console.log('');
  console.log(`  ${gray('GitHub:')} ${cyan('https://github.com/zacharylyonstx/cursorrules')}`);
  console.log('');
}

// --- Helpers ---

function getProjectName(dir) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
    return pkg.name || path.basename(dir);
  } catch {
    return path.basename(dir);
  }
}

function findPresetKey(presets, input) {
  const lower = input.toLowerCase();
  // Exact match
  if (presets.has(lower)) return lower;
  // Try common aliases
  const aliases = {
    'next': 'nextjs',
    'next.js': 'nextjs',
    'node': 'nodejs',
    'node.js': 'nodejs',
    'ts': 'typescript',
    'py': 'python',
    'rb': 'ruby',
    'rails': 'ruby',
    'spring': 'java',
    'springboot': 'java',
    'spring-boot': 'java',
    'ios': 'swift',
    'swiftui': 'swift',
    'css': 'tailwind',
    'tw': 'tailwind',
    'drf': 'django',
    'postgres': 'prisma',
    'db': 'prisma',
    'orm': 'prisma',
    'api': 'express',
    'rest': 'express',
    'fastify': 'express',
    'koa': 'express',
    'vuejs': 'vue',
    'vue.js': 'vue',
    'sveltejs': 'svelte',
    'sveltekit': 'svelte',
    'nuxt': 'vue',
    'nuxtjs': 'vue',
    'jest': 'testing',
    'vitest': 'testing',
    'playwright': 'testing',
    'cypress': 'testing',
    'test': 'testing',
    'tests': 'testing',
    'turborepo': 'monorepo',
    'turbo': 'monorepo',
    'nx': 'monorepo',
    'lerna': 'monorepo',
    'workspace': 'monorepo',
    'workspaces': 'monorepo',
    'container': 'docker',
    'containers': 'docker',
    'dockerfile': 'docker',
    'compose': 'docker',
  };
  if (aliases[lower] && presets.has(aliases[lower])) return aliases[lower];
  // Partial match
  for (const [key] of presets) {
    if (key.includes(lower) || lower.includes(key)) return key;
  }
  return null;
}

function fuzzyMatch(input, keys) {
  const lower = input.toLowerCase();
  return keys.filter(k => {
    const distance = levenshtein(lower, k);
    return distance <= 3;
  }).slice(0, 3);
}

function levenshtein(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function printProTip() {
  console.log(`  ${magenta(SPARKLE)} ${bold('Pro Rules Pack:')} Get 50+ advanced presets with architecture patterns,`);
  console.log(`     security rules, performance optimization, and team conventions.`);
  console.log(`     ${cyan('https://github.com/zacharylyonstx/cursorrules#pro-rules')}`);
}

module.exports = { run };
