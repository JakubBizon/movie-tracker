import { describe, expect, it } from "vitest";
import { extractIdFromSlug } from "./extractIdFromSlug";

describe("extractIdFromSlug", () => {
  it("extracts id from slug", () => {
    expect(extractIdFromSlug("123-avatar-2026")).toBe(123);
  });

  it("works for id only", () => {
    expect(extractIdFromSlug("4")).toBe(4);
  });

  it("returns null when the slug does not start with a number", () => {
    expect(extractIdFromSlug("avatar-123")).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(extractIdFromSlug("")).toBeNull();
  });
});
