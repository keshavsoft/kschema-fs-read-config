# kschema-fs-ui-alter-config

> Find JSON files in your UI directory structure and inject/alter their column configurations automatically.

`kschema-fs-ui-alter-config` is a lightweight, configuration-driven utility designed to synchronize table column configurations (`columnsConfig`) from a master schema JSON to target UI configuration files (specifically matching `**/configs/showAll.json`).

---

## Features

- 🔍 **Automated Discovery**: Recursively searches the workspace to locate `showAll.json` files within `configs/` folders.
- ⚙️ **Config Ingestion**: Extracts column definitions from a master JSON configuration file.
- ⚡ **Seamless Mutation**: Updates target JSON configuration files in-place with the retrieved column configuration.
- 📦 **Version-Isolated Runtimes**: Employs a dynamic runner system that loads the latest runtime version (currently `v3`).
- 📖 **Story-Driven Architecture**: The latest execution engine (`v3`) is structured as a clear narrative using concepts of a Scout, an Oracle, and a Blacksmith for self-documenting code.

---

## Installation

```bash
npm install kschema-fs-ui-alter-config
```

---

## Usage

### Programmatic API

Import the default function and invoke it with target options:

```javascript
import load from "kschema-fs-ui-alter-config";
import path from "node:path";

load({
    // The directory tree containing UI json configurations to alter
    toPath: path.join(process.cwd(), "ui", "doctors"),
    
    // Path to the master JSON configuration schema containing the columnsConfig
    configPath: path.join(process.cwd(), "Config", "Schemas", "doctors.json"),
    
    // The action to perform (currently supports "Crud")
    inAction: "Crud"
});
```

---

## Architecture & Code Story (v3)

In version 3, the codebase behaves like an adventure quest rather than standard dry modules:

1. **The Scout** (`scout.js`): Recursively searches the specified realm (`toPath`) to locate target gems (`showAll.json` under `configs/` subdirectories).
2. **The Oracle** (`oracle.js`): Consults the ancient scrolls (`configPath`) to fetch the master `columnsConfig`.
3. **The Blacksmith** (`blacksmith.js`): Transmutes/forges the target files in-place by infusing them with the columns configuration.
4. **The Chronicle** (`index.js`): Directs the journey, orchestrating the steps from scouting to transmuting.

---

## Local Development & Testing

Clone the repository:
```bash
git clone https://github.com/keshavsoft/kschema-fs-ui-alter-config.git
cd kschema-fs-ui-alter-config
npm install
```

To run the local validation tests:
```bash
cd test/v3
node test.js
```

---

## License

MIT
