"use client";

import { useEffect } from "react";
import {
  createClawdComputeWebMCPTools,
  createSolanaWebMCPTools,
  createSolGPTWebMCPTools,
  createX402WebMCPTools,
  registerWebMCPTools,
  type ClawdAdapters,
} from "@clawd/webmcp";

export function SolanaWebMCPBridge({ adapters }: { adapters: ClawdAdapters }) {
  useEffect(() => {
    let dispose: undefined | (() => void);

    const tools = [
      ...createSolanaWebMCPTools(adapters),
      ...createSolGPTWebMCPTools(adapters),
      ...createClawdComputeWebMCPTools(adapters),
      ...createX402WebMCPTools(adapters),
    ];

    registerWebMCPTools(tools).then((cleanup) => {
      dispose = cleanup;
    });

    return () => dispose?.();
  }, [adapters]);

  return null;
}
