"use client";

import { useMemo } from "react";

export type ViviState =
  | "idle"
  | "hover"
  | "thinking"
  | "talking"
  | "celebrating"
  | "walking"
  | "waving";

type Input = {
  idle: boolean;
  hovering: boolean;
  thinking: boolean;
  celebrating: boolean;
  walking: boolean;
  waving: boolean;
};

/** Priority-based character state machine for VIVI's visual behavior. */
export function useViviState(input: Input): ViviState {
  return useMemo(() => {
    if (input.celebrating) return "celebrating";
    if (input.thinking) return "thinking";
    if (input.walking) return "walking";
    if (input.waving) return "waving";
    if (input.hovering) return "hover";
    return input.idle ? "idle" : "talking";
  }, [input.celebrating, input.hovering, input.idle, input.thinking, input.walking, input.waving]);
}
