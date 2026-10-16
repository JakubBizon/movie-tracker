import { describe, expect, it } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
  it("creates a link slug", () => {
    expect(slugify("Matchbox the Movie", 122)).toBe("122-matchbox-the-movie");
  });

  it("lowercases the title", () => {
    expect(slugify("AVATAR", 1)).toBe("1-avatar");
  });

  it("trims spaces", () => {
    expect(slugify("   avatar  ", 1)).toBe("1-avatar");
  });

  it("collapses multiple spaces", () => {
    expect(slugify("Matchbox   the     Movie", 122)).toBe(
      "122-matchbox-the-movie",
    );
  });

  it("removes special characters", () => {
    expect(slugify("@The Odyssey!!", 13412)).toBe("13412-the-odyssey");
  });

  it("collapses repeated dashes", () => {
    expect(slugify("Mission: Impossible - Fallout", 5)).toBe(
      "5-mission-impossible-fallout",
    );
  });

  it("keeps numbers in the title", () => {
    expect(slugify("6ix", 6)).toBe("6-6ix");
  });
});
