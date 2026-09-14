# Production domain map

## WebMCP surfaces

- `https://solgpt.us` — consumer Solana AI + live WebMCP tools
- `https://clawdcompute.us` — compute/model dashboard + live WebMCP tools
- `https://x402.life` — x402 routing/payment UI + live WebMCP tools
- Cheshire Terminal — advanced trading UI + live WebMCP tools

Register WebMCP tools in top-level page JavaScript. Do not hide the registration inside an iframe.

## MCP surfaces

- `https://x402.life/mcp` — canonical x402 MCP Streamable HTTP endpoint
- `https://solgpt.us/mcp` — canonical SOLGPT/Solana MCP Streamable HTTP endpoint
- `https://solgpt.us/mc` — branded human-facing connection hub; link or redirect to `/mcp`

## Recommended routing

`solgpt.us/mc` should render documentation / connection buttons for ChatGPT, Codex, and MCP Inspector.
It should not itself replace the protocol endpoint unless you intentionally support MCP traffic on both routes.
