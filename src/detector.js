'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Detects frameworks, languages, and tools in a project directory.
 * Returns an array of matched preset keys.
 */
function detectProject(dir) {
  const detected = [];
  const pkg = readJSON(path.join(dir, 'package.json'));
  const allDeps = {
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {}),
  };

  const fileExists = (f) => fs.existsSync(path.join(dir, f));
  const dirExists = (d) => {
    try { return fs.statSync(path.join(dir, d)).isDirectory(); } catch { return false; }
  };

  // --- JavaScript/TypeScript ecosystem ---
  if (pkg.name) detected.push('nodejs');

  // TypeScript
  if (fileExists('tsconfig.json') || allDeps['typescript']) {
    detected.push('typescript');
  }

  // Next.js (must come before generic React)
  if (allDeps['next']) {
    detected.push('nextjs');
  }
  // React (but not if Next.js already covers it)
  else if (allDeps['react']) {
    detected.push('react');
  }

  // Vue
  if (allDeps['vue'] || allDeps['nuxt']) {
    detected.push('vue');
  }

  // Svelte
  if (allDeps['svelte'] || allDeps['@sveltejs/kit']) {
    detected.push('svelte');
  }

  // Angular
  if (allDeps['@angular/core']) {
    detected.push('angular');
  }

  // Express
  if (allDeps['express'] || allDeps['fastify'] || allDeps['koa']) {
    detected.push('express');
  }

  // Tailwind
  if (allDeps['tailwindcss'] || fileExists('tailwind.config.js') || fileExists('tailwind.config.ts')) {
    detected.push('tailwind');
  }

  // Prisma
  if (allDeps['prisma'] || allDeps['@prisma/client'] || fileExists('prisma/schema.prisma')) {
    detected.push('prisma');
  }

  // --- Python ---
  if (fileExists('requirements.txt') || fileExists('pyproject.toml') || fileExists('setup.py') || fileExists('Pipfile')) {
    detected.push('python');

    const reqContent = safeRead(path.join(dir, 'requirements.txt'));
    const pyproject = safeRead(path.join(dir, 'pyproject.toml'));
    const combined = reqContent + pyproject;

    if (combined.includes('fastapi')) detected.push('fastapi');
    if (combined.includes('django')) detected.push('django');
    if (combined.includes('flask')) detected.push('flask');
  }

  // --- Go ---
  if (fileExists('go.mod') || fileExists('go.sum')) {
    detected.push('go');
  }

  // --- Rust ---
  if (fileExists('Cargo.toml') || fileExists('Cargo.lock')) {
    detected.push('rust');
  }

  // --- Java/Kotlin ---
  if (fileExists('pom.xml') || fileExists('build.gradle') || fileExists('build.gradle.kts')) {
    detected.push('java');
  }

  // --- Ruby ---
  if (fileExists('Gemfile') || fileExists('Rakefile')) {
    detected.push('ruby');
  }

  // --- PHP/Laravel ---
  if (fileExists('composer.json')) {
    detected.push('php');
    const composer = readJSON(path.join(dir, 'composer.json'));
    const phpDeps = { ...(composer.require || {}), ...(composer['require-dev'] || {}) };
    if (phpDeps['laravel/framework']) detected.push('laravel');
  }

  // --- Swift ---
  if (fileExists('Package.swift') || findFiles(dir, '*.xcodeproj').length > 0 || findFiles(dir, '*.xcworkspace').length > 0) {
    detected.push('swift');
  }

  // --- Docker ---
  if (fileExists('Dockerfile') || fileExists('docker-compose.yml') || fileExists('docker-compose.yaml')) {
    detected.push('docker');
  }

  // --- Testing frameworks ---
  if (allDeps['jest'] || allDeps['vitest'] || allDeps['mocha'] || allDeps['cypress'] || allDeps['playwright']) {
    detected.push('testing');
  }

  // Monorepo detection
  if (fileExists('lerna.json') || fileExists('nx.json') || fileExists('turbo.json') || (pkg.workspaces)) {
    detected.push('monorepo');
  }

  return [...new Set(detected)];
}

function readJSON(filepath) {
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch {
    return {};
  }
}

function safeRead(filepath) {
  try {
    return fs.readFileSync(filepath, 'utf8');
  } catch {
    return '';
  }
}

function findFiles(dir, pattern) {
  try {
    const ext = pattern.replace('*', '');
    return fs.readdirSync(dir).filter(f => f.endsWith(ext));
  } catch {
    return [];
  }
}

module.exports = { detectProject };
