import type { ExtensionAPI } from "@mariozechner/pi-coding-agent"

export default function (pi: ExtensionAPI) {
  pi.on("session_before_compact", async (event, ctx) => {
    // Re-inject AGENTS.md context after compaction
    const fs = await import("node:fs")
    const path = await import("node:path")
    const agentsPath = path.join(ctx.cwd, "AGENTS.md")
    try {
      if (fs.existsSync(agentsPath)) {
        const content = fs.readFileSync(agentsPath, "utf-8")
        ctx.ui.notify("Re-injecting AGENTS.md context after compaction", "info")
        // The extension can append to the compaction summary
        event.compactionSummary = (event.compactionSummary || "") +
          "\n\n## Re-injected AGENTS.md\n" + content.slice(0, 2000)
      }
    } catch {
      // ignore
    }
  })
}
