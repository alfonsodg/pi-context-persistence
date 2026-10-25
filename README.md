# pi-context-persistence

Pi coding agent extension that re-injects `AGENTS.md` context after compaction.

## Problem

Long Pi sessions compact older conversation into a summary. Project rules in
`AGENTS.md` can be dropped, causing the agent to forget mandates.

## Solution

This extension hooks into `session_before_compact` and injects `AGENTS.md`
content into the compaction summary.

## Installation

Place in `~/.pi/agent/extensions/` or reference via `pi install`.

## License

MIT
