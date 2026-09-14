import { createMcpHandler } from "@modelcontextprotocol/server";
import type { ClawdAdapters, X402Adapters } from "../shared/adapters.js";
import { buildSolGPTMcpServer } from "./buildSolGPTServer.js";
import { buildX402McpServer } from "./buildX402Server.js";

export function createSolGPTMcpHandler(adapters: ClawdAdapters) {
  return createMcpHandler(() => buildSolGPTMcpServer(adapters));
}

export function createX402McpHandler(adapters: X402Adapters) {
  return createMcpHandler(() => buildX402McpServer(adapters));
}
