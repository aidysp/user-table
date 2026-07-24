import { describe, it, expect, vi } from "vitest";
import { getUsers } from "./users";

describe("getUsers", () => {
  it("returns data on success", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ users: [], total: 0, skip: 0, limit: 20 }),
      })
    ) as any;

    const data = await getUsers({});
    expect(data?.total).toBe(0);
  });

  it("handles HTTP error", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({ ok: false, status: 500 })
    ) as any;

    const data = await getUsers({});
    expect(data).toBeUndefined();
  });
});
