import { expect, test } from "vitest";
import { minutesToTime } from "./minutesToTime";

test("formats minutes as hours and minutes", () => {
  expect(minutesToTime(135)).toBe("2h 15min");
});
