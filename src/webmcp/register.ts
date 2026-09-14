import type { WebMCPTool } from "./types.js";

export interface RegisterWebMCPOptions {
  exposedTo?: string[];
  signal?: AbortSignal;
}

export async function registerWebMCPTools(
  tools: WebMCPTool[],
  options: RegisterWebMCPOptions = {},
): Promise<() => void> {
  if (typeof document === "undefined") return () => {};

  const modelContext = document.modelContext;
  if (typeof modelContext?.registerTool !== "function") return () => {};

  const controller = new AbortController();
  const signal = options.signal ?? controller.signal;

  for (const tool of tools) {
    await modelContext.registerTool(tool, {
      signal,
      exposedTo: options.exposedTo,
    });
  }

  return () => controller.abort();
}
