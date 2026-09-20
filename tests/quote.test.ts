import { describe, expect, it } from "vitest";
import { calculateKnownSubtotal, demoQuote, formatVnd } from "@/lib/quote";

describe("quote calculations", () => {
  it("counts only confirmed and calculated charges", () => {
    expect(calculateKnownSubtotal(demoQuote.charges)).toBe(3_687_000);
  });

  it("keeps unknown charges distinct from zero", () => {
    const distance = demoQuote.charges.find((charge) => charge.id === "distance");
    const delivery = demoQuote.charges.find((charge) => charge.id === "delivery");
    expect(distance).toMatchObject({ status: "pending" });
    expect(delivery).toMatchObject({ status: "excluded" });
    expect(distance).not.toHaveProperty("amount");
    expect(delivery).not.toHaveProperty("amount");
  });

  it("formats VND consistently for each locale", () => {
    expect(formatVnd(3_687_000, "vi")).toBe("3.687.000 VND");
    expect(formatVnd(3_687_000, "en")).toBe("3,687,000 VND");
  });
});
