# Publish Checklist

## Pre-Publish

1. **Check npm name availability:**
   ```bash
   npm view cursorrules
   ```
   If taken, rename to `cursor-rules-gen` in package.json (name, repo URLs, README).

2. **Login to npm:**
   ```bash
   npm login
   ```

3. **Verify everything looks right:**
   ```bash
   npm pack --dry-run
   ```

## Publish

```bash
cd /Users/zak/.openclaw/workspace/cursor-rules-cli
npm publish --access public
```

## Post-Publish

1. **Verify it works via npx:**
   ```bash
   npx cursorrules list
   npx cursorrules --help
   ```

2. **Create GitHub repo:**
   ```bash
   cd /Users/zak/.openclaw/workspace/cursor-rules-cli
   git init
   git add .
   git commit -m "v1.0.0 — initial release"
   gh repo create zacharylyonstx/cursorrules --public --source=. --push
   ```

3. **Create a GitHub release:**
   ```bash
   gh release create v1.0.0 --title "v1.0.0" --notes "Initial release — 23 framework/language presets, auto-detection, smart merging."
   ```

4. **Enable GitHub Sponsors** at https://github.com/sponsors/zacharylyonstx

## If Name Is Taken

Update these in `package.json`:
- `"name": "cursor-rules-gen"`

Update `bin` entry:
- `"cursor-rules-gen": "bin/cursorrules.js"` (or keep `cursorrules` as the bin name)

Update README badges and URLs accordingly.

## Version Bumps

```bash
npm version patch   # 1.0.0 → 1.0.1 (bug fixes)
npm version minor   # 1.0.0 → 1.1.0 (new presets)
npm version major   # 1.0.0 → 2.0.0 (breaking changes)
npm publish
```
