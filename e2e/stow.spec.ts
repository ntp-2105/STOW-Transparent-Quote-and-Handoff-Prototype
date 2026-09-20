import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function reachQuote(page: Page) {
  await page.getByRole("button", { name: "Báo giá lưu trữ giúp em" }).click();
  await page.getByRole("button", { name: "Đúng, dùng danh sách này" }).click();
  await page.getByRole("button", { name: "Chọn kho trọn gói 3 m³" }).click();
  await expect(page.getByTestId("quote-card")).toBeVisible();
}

test("completes the successful guided quote handoff without external requests", async ({ page }) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) externalRequests.push(request.url());
  });
  await page.goto("/");
  await reachQuote(page);
  await expect(page.getByText("3.102.000 VND")).toBeVisible();
  await expect(page.getByText("3.687.000 VND")).toBeVisible();
  await expect(page.getByText("Chờ xác minh", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Tiếp tục yêu cầu báo giá" }).click();
  await page.getByRole("button", { name: "Gửi yêu cầu báo giá" }).click();
  await expect(page.getByRole("heading", { name: "Đã gửi yêu cầu báo giá" })).toBeVisible();
  await expect(page.getByText("Đây chưa phải là xác nhận đặt kho.")).toBeVisible();
  expect(externalRequests).toEqual([]);
});

test("validates contact details and moves focus to the first invalid field", async ({ page }) => {
  await page.goto("/");
  await reachQuote(page);
  await page.getByRole("button", { name: "Tiếp tục yêu cầu báo giá" }).click();
  await page.getByLabel("Họ và tên").fill("");
  await page.getByLabel("Email").fill("invalid");
  await page.getByRole("button", { name: "Gửi yêu cầu báo giá" }).click();
  await expect(page.getByLabel("Họ và tên")).toBeFocused();
  await expect(page.getByText("Vui lòng nhập địa chỉ email hợp lệ.")).toBeVisible();
});

test("switches the full guided experience to English", async ({ page }) => {
  await page.goto("/");
  const languageButton = page.getByRole("button", { name: "Switch to English" });
  await expect(languageButton.locator("img")).toHaveAttribute("src", "/flags/vn.svg");
  await languageButton.click();
  await expect(page.getByRole("button", { name: "Chuyển sang tiếng Việt" }).locator("img")).toHaveAttribute("src", "/flags/gb.svg");
  await expect(page.getByRole("heading", { name: /Hello — I’m STOW/ })).toBeVisible();
  await page.getByRole("button", { name: "Help me get a storage quote" }).click();
  await page.getByRole("button", { name: "Yes, use this inventory" }).click();
  await page.getByRole("button", { name: "Choose 3 m³ full service" }).click();
  await expect(page.getByRole("heading", { name: "Quote summary" })).toBeVisible();
  await expect(page.getByText("Known subtotal")).toBeVisible();
});

test("shows the deterministic failure and retry flow", async ({ page }) => {
  await page.goto("/?submit=error");
  await reachQuote(page);
  await page.getByRole("button", { name: "Tiếp tục yêu cầu báo giá" }).click();
  await page.getByRole("button", { name: "Gửi yêu cầu báo giá" }).click();
  await expect(page.getByRole("heading", { name: "Không thể gửi yêu cầu" })).toBeVisible();
  await page.getByRole("button", { name: "Thử lại" }).click();
  await expect(page.getByRole("button", { name: "Gửi yêu cầu báo giá" })).toBeVisible();
});

test("supports drawer keyboard dismissal and reset", async ({ page }) => {
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Mở menu STOW" });
  await menu.click();
  await expect(page.getByRole("dialog", { name: "STOW menu" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "STOW menu" })).toBeHidden();
  await expect(menu).toBeFocused();
});

test("has no serious accessibility violations on the quote screen", async ({ page }) => {
  await page.goto("/");
  await reachQuote(page);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
});

test("keeps visible mobile controls at least 44px tall", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const undersized = await page.locator(".stow-app button:visible").evaluateAll((buttons) =>
    buttons
      .map((button) => ({ label: button.getAttribute("aria-label") || button.textContent?.trim(), height: button.getBoundingClientRect().height }))
      .filter((button) => button.height < 44),
  );
  expect(undersized).toEqual([]);
});

for (const width of [320, 390, 768, 1440]) {
  test(`does not overflow horizontally at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await reachQuote(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
