# Development Guide

This document explains the internal architecture and development workflow of `@keshavsoft/kschema-fs-read-config`.

---

# Introduction

`@keshavsoft/kschema-fs-read-config` is a version-isolated configurations loader library. Its main goal is to automatically locate environment variables and resolve configuration files on the local filesystem.

The architecture focuses on:

* Version isolation (independent runtime environments)
* Dynamic loading of the latest version at runtime
* Auto-export synchronization for ESM named exports compliance
* Robust parent folder resolution for environment files

---

# High-Level Architecture

```text
Consumer Application
    ↓
Imports kschema-fs-read-config (root index.js)
    ↓
Resolves the highest version folder (e.g. bin/v6/index.js)
    ↓
Dynamically imports the highest version module
    ↓
Statically maps and exports functions to satisfy ESM named export requirements
```

---

# Folder Structure

```text
bin/
 ├── core/
 │    └── syncExports.js      # Syncs root index.js ESM named exports to match version exports
 ├── v5/
 │    └── [Legacy version implementation]
 └── v6/
      ├── adventure/
      │    └── scout.js       # Game-themed scouting / directory scanners
      ├── getAllFilesContent.js
      ├── getConfig.js
      ├── getDataPath.js
      ├── getPort.js
      ├── getSchemasPath.js
      ├── getTableNames.js
      └── index.js            # Entry point for version 6 loading / env parsing
index.js                      # Dynamically imports and statically exports latest version
test/
 └── v5/
      └── getTableNames/
           ├── .env
           ├── Config/
           └── test.js
```

---

# Dynamic Version Resolution & ESM Constraints

In modern JavaScript **ES Modules (ESM)**, named exports must be statically resolvable before code execution. Since our library dynamically determines and loads the highest runtime version at import time, we cannot simply use runtime-evaluated dynamic exports.

### The Solution: Auto-Export Synchronization

1. **Static Declaration in `index.js`**:
   The root `index.js` destructures and exports functions directly from the dynamically loaded `latestModule`:
   ```javascript
   export const { getAllFilesContent, getDataPath, getPort, getSchemasPath, getTableNames } = latestModule;
   ```
2. **Synchronization Script (`bin/core/syncExports.js`)**:
   A standalone utility that compares the actual exports of the highest version entry point with the current static exports of the root `index.js`. If a mismatch is found, it automatically rewrites the root `index.js` to align them.
3. **Automated Publish Workflows**:
   The sync script runs automatically under the `prepublishOnly` npm script to ensure published npm builds are always 100% in sync and syntax-error free.

---

# Adding a New Version (e.g. v7)

To release a new version layout:
1. Create `bin/v7/index.js` and all associated helper files.
2. Ensure you export the required functions.
3. Run `npm run sync` to update the root `index.js` named exports automatically.
4. Add verification tests under `test/v7`.

---

# License

MIT
