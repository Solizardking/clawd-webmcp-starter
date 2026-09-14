# @clawd/webmcp

Shared WebMCP + MCP starter kit for the Clawd Solana agent network.

## Surfaces

- **solgpt.us** — consumer Solana AI / trading agent
- **clawdcompute.us** — compute, models, inference, verification
- **x402.life** — x402 payment + agent-commerce interface
- **x402.life/mcp** — x402 MCP endpoint
- **solgpt.us/mcp** — canonical SOLGPT MCP endpoint
- **solgpt.us/mc** — human-facing connection hub
- **Cheshire Terminal** — advanced trading + portfolio surface

## Design rule

The agent may inspect, resolve, quote, simulate, compare, and stage. The starter kit deliberately does **not** expose seed/private-key access or silent transaction signing/broadcasting. Final Solana authorization belongs to the user's wallet and your normal application confirmation flow.

## Install

```bash
npm install
npm run build
```

The code targets the current MCP TypeScript SDK v2 package split:

```bash
npm install @modelcontextprotocol/server zod
```

## WebMCP

Create the tools from your existing app logic and register them in the **top-level page**:

```ts
import {
  createSolanaWebMCPTools,
  createSolGPTWebMCPTools,
  createClawdComputeWebMCPTools,
  createX402WebMCPTools,
  registerWebMCPTools,
} from "@clawd/webmcp";

const tools = [
  ...createSolanaWebMCPTools(adapters),
  ...createSolGPTWebMCPTools(adapters),
  ...createClawdComputeWebMCPTools(adapters),
  ...createX402WebMCPTools(adapters),
];

const dispose = await registerWebMCPTools(tools);
```

### Initial WebMCP tool set

```text
solana.get_wallet_context
solana.resolve_token
solana.get_swap_quote
solana.stage_swap
solana.simulate_transaction   # when adapter supplied
solana.inspect_transaction    # when adapter supplied

solgpt.ask

clawd.get_models
clawd.run_inference

x402.get_payment_quote
x402.stage_payment
x402.get_receipt              # when adapter supplied
```

## MCP

Two server factories are provided:

```ts
import {
  createSolGPTMcpHandler,
  createX402McpHandler,
} from "@clawd/webmcp/mcp";

const solgpt = createSolGPTMcpHandler(adapters);
const x402 = createX402McpHandler(adapters);
```

Expose them as Streamable HTTP endpoints:

```text
https://solgpt.us/mcp
https://x402.life/mcp
```

The SDK's `createMcpHandler()` is Web-standard, so the same handler can be wrapped for Vercel, Cloudflare-compatible runtimes, Node middleware, or other Fetch-style servers.

## Adapter boundary

This package intentionally does not duplicate your existing trading or payment logic. Implement `ClawdAdapters` using the exact functions already powering the human UI:

- wallet context
- token resolution
- Jupiter/Raydium/ClawdRouter quote
- swap-ticket staging
- Solana simulation/inspection
- x402 quote/staging/receipts
- clawdcompute.us model routing
- SOLGPT intelligence

That keeps WebMCP and MCP as controlled agent interfaces over the same application permissions and validation the human interface already uses.

## Production routing

See [`deploy/domain-map.md`](./deploy/domain-map.md).

## Next integration step

Replace `examples/nextjs/lib/adapters.ts` placeholders with your real SOLGPT/Cheshire/x402/Clawd Compute functions. In particular, wire `stageSwap()` to the same state/store action used by the visible swap ticket so a WebMCP call visibly updates the page for user review.
