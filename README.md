# kschema-fs-read-config

> Read the `.env` file to locate schemas and configurations across your projects.

`kschema-fs-read-config` is a lightweight, configuration-driven utility designed to dynamically read environment configuration files, automatically resolve schema and data directory paths (supporting parent directory lookup), and parse configuration datasets.

---

## Features

- 🔍 **Automated `.env` Discovery**: Recursively searches parent directories for a `.env` file using `node-fs-parent`.
- ⚙️ **Config Ingestion**: Reads and parses all JSON files inside the configured `SchemaPath`.
- 📦 **Version-Isolated Runtimes**: Employs a dynamic runner system that loads the latest runtime version (currently `v6`).
- ⚡ **Consistent API**: Simple named exports to quickly access common configuration schemas, paths, and server ports.

---

## Installation

```bash
npm install kschema-fs-read-config
```

---

## Usage

### Programmatic API

Import the named helpers and invoke them:

```javascript
import { 
    getAllFilesContent, 
    getTableNames, 
    getPort, 
    getSchemasPath, 
    getDataPath 
} from "kschema-fs-read-config";

// Read and parse all JSON files inside the resolved SchemaPath
const filesContent = getAllFilesContent();
console.log(filesContent);

// Retrieve all table names mapped to their filenames
const tableNames = getTableNames();
console.log(tableNames); // e.g., [{ name: "doctors.json", tableName: "doctors" }]

// Retrieve specific config values from the loaded .env
const port = getPort();
const schemaPath = getSchemasPath();
const dataPath = getDataPath();
```

---

## Environment Variables

Ensure your `.env` contains the required keys:

```ini
SchemaPath=Config/Schemas
DataPath=Data
PORT=9012
```

---

## Local Development & Testing

Clone the repository:
```bash
git clone https://github.com/keshavsoft/kschema-fs-read-config.git
cd kschema-fs-read-config
npm install
```

To run the local validation tests:
```bash
node test/v5/getTableNames/test.js
```

---

## License

MIT
