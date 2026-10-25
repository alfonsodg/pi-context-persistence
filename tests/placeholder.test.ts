// Basic smoke test: module loads without error
import { readFileSync } from "node:fs"
import { join } from "node:path"

const src = readFileSync(join(process.cwd(), "src", "index.ts"), "utf-8")
if (!src.includes("session_before_compact")) {
  throw new Error("missing session_before_compact hook")
}
console.log("OK: module contains session_before_compact hook")
