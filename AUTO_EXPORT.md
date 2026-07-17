# Automated ES Module Exports Sync

This document explains the architecture and implementation details of the automated export synchronization system used in `@keshavsoft/kschema-fs-read-config`.

---

## 1. The Core Challenge: Static ESM Constraints

In modern JavaScript **ES Modules (ESM)**, the runtime requires all named exports to be **statically resolved** during the linking phase, which occurs *before* any code execution:
- Syntax like `import { func } from "module"` is validated by Node.js at parse time.
- If the exported name is not statically declared in the target file, Node.js throws a `SyntaxError` and aborts execution immediately.
- As a result, standard dynamic exports (e.g. exporting a list of names evaluated at runtime) are impossible in pure ESM.

### The Conflict in this Project
1. **Dynamic Versioning**: The root `index.js` automatically resolves and dynamically imports the highest version directory (`v3`, `v4`, etc.) under `bin/`.
2. **Named Exports**: Consumers want to import functions directly and cleanly (e.g. `import { getAllFilesContent } from "kschema-fs-read-config"`).
3. **The Problem**: If a developer adds a new version or function and tries to import it, it causes a `SyntaxError` before the dynamic loader inside `index.js` can execute and determine the new exports.

---

## 2. The Solution: Dynamic Versioning + Automated Generation

To bridge this gap, we implemented a hybrid approach that preserves dynamic version resolution while satisfying ESM's static verification requirements:

1. **Static Declaration in `index.js`**: We destructure and export functions directly from the dynamically loaded `latestModule`:
   ```javascript
   export const { getAllFilesContent, getTableNames } = latestModule;
   ```
2. **Automated Export Code Generator**: A synchronization script parses the resolved latest version, extracts all its export names, and updates the static export line in the root `index.js` automatically.

---

## 3. Implementation Details

We set up three complementary mechanisms to make this completely transparent:

### A. The Sync Script (`bin/core/syncExports.js`)
A standalone utility that compares the actual exports of the highest version's entry point with the current static exports of the root `index.js`. If a mismatch is found, it automatically rewrites the root file:
```javascript
// Automatically syncs index.js exports line to match the highest version
const latestModule = await import(pathToFileURL(latestModulePath).href + "?t=" + Date.now());
const exportKeys = Object.keys(latestModule).filter(key => key !== "default").sort();
const expectedExportLine = `export const { ${exportKeys.join(", ")} } = latestModule;`;
```

### B. Automated npm Workflows (`package.json`)
We registered the sync script under `package.json` scripts:
- **`npm run sync`**: Manual invocation to sync exports.
- **`prepublishOnly`**: Triggers automatically before publishing the npm package, ensuring the published version is always perfectly synchronized and free of import errors.
```json
"scripts": {
  "sync": "node bin/core/syncExports.js",
  "prepublishOnly": "npm run sync"
}
```

### C. Live File Watcher (Development Harness)
During development, a background file watcher monitors the version folders. Whenever you write/save code in the active version's `index.js` file:
1. The watcher instantly re-runs the synchronization logic in milliseconds.
2. The root `index.js` is updated in the background.
3. When you switch to the terminal to run `node test`, the new exports are already present, avoiding any `SyntaxError`.

---

## 4. How it Behaves in Action

### Scenario: Creating a New Version & Function
1. You create a new highest version directory: `bin/v4/index.js`.
2. Inside `v4/index.js`, you write and export:
   ```javascript
   export const myNewFunc = () => {};
   ```
3. **The Watcher** (or `npm run sync`) immediately:
   - Detects the new highest version `v4`.
   - Reads its exports: `['myNewFunc']`.
   - Rewrites the root `index.js` export line:
     ```javascript
     export const { myNewFunc } = latestModule;
     ```
4. You can immediately import `myNewFunc` statically from the root!
