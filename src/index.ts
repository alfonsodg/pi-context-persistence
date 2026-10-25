import { readFileSync, existsSync } from "node:fs"
import { join } from "node:path"

interface ExtensionAPI {
  on(event: string, handler: (event: any, ctx: any) => void | Promise<void>): void
}

export default function (pi: ExtensionAPI) {
  pi.on("session_before_compact", async (event: any, ctx: any) => {
    const cwd = ctx?.cwd || process.cwd()
    const agentsPath = join(cwd, "AGENTS.md")
    try {
      if (existsSync(agentsPath)) {
        const content = readFileSync(agentsPath, "utf-8")
        const excerpt = content.slice(0, 4000)
        if (event.compactionSummary) {
          event.compactionSummary +=
            "\n\n## Re-injected AGENTS.md (context persistence)\n" + excerpt
        } else {
          event.compactionSummary = "## Re-injected AGENTS.md (context persistence)\n" + excerpt
        }
      }
    } catch {
      // ignore read errors
    }
  })
}
