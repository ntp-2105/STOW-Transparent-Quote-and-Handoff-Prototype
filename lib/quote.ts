import type { Charge, Quote } from "./types";

export const demoQuote: Quote = {
  serviceType: "valet",
  volumeM3: 3,
  durationMonths: 3,
  currency: "VND",
  vatIncluded: true,
  charges: [
    { id: "storage", amount: 3_102_000, status: "confirmed" },
    { id: "handling", amount: 585_000, status: "calculated" },
    { id: "distance", status: "pending" },
    { id: "delivery", status: "excluded" },
  ],
};

export function calculateKnownSubtotal(charges: Charge[]): number {
  return charges.reduce((total, charge) => {
    if (charge.status !== "confirmed" && charge.status !== "calculated") return total;
    return total + (charge.amount ?? 0);
  }, 0);
}

export function formatVnd(amount: number, locale: "vi" | "en"): string {
  return `${new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US").format(amount)} VND`;
}
