import { describe, expect, it } from "vitest";
import { copy } from "@/lib/content";

function paths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) return value.flatMap((item, index) => paths(item, `${prefix}[${index}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => paths(item, prefix ? `${prefix}.${key}` : key));
  }
  return [prefix];
}

function leaves(value: unknown): unknown[] {
  if (Array.isArray(value)) return value.flatMap(leaves);
  if (value && typeof value === "object") return Object.values(value).flatMap(leaves);
  return [value];
}

describe("translations", () => {
  it("keeps Vietnamese and English dictionaries structurally complete", () => {
    expect(paths(copy.en)).toEqual(paths(copy.vi));
  });

  it("does not leave empty strings", () => {
    const strings = [copy.vi, copy.en].flatMap(leaves);
    expect(strings.every((value) => typeof value === "string" && value.trim().length > 0)).toBe(true);
  });
});
