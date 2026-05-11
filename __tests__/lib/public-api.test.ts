import {
  getPublicApiOrigin,
  getPublicApiPathPrefix,
  publicVersionedApiUrl,
  withApiVersionPath,
} from "@/lib/public-api";

const originalEnv = process.env;

describe("public-api", () => {
  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("withApiVersionPath prepends default /api/v1", () => {
    delete process.env.NEXT_PUBLIC_API_PATH_PREFIX;
    expect(withApiVersionPath("/waiting_list/join")).toBe(
      "/api/v1/waiting_list/join",
    );
  });

  it("withApiVersionPath does not double-prefix", () => {
    delete process.env.NEXT_PUBLIC_API_PATH_PREFIX;
    expect(withApiVersionPath("/api/v1/foo")).toBe("/api/v1/foo");
  });

  it("respects empty NEXT_PUBLIC_API_PATH_PREFIX", () => {
    process.env.NEXT_PUBLIC_API_PATH_PREFIX = "";
    expect(getPublicApiPathPrefix()).toBe("");
    expect(withApiVersionPath("/auth/token")).toBe("/auth/token");
  });

  it("publicVersionedApiUrl joins origin and versioned path", () => {
    process.env.NEXT_PUBLIC_API_URL = "https://dev.gamersarc.com";
    delete process.env.NEXT_PUBLIC_API_PATH_PREFIX;
    expect(publicVersionedApiUrl("/waiting_list/join-waiting-list")).toBe(
      "https://dev.gamersarc.com/api/v1/waiting_list/join-waiting-list",
    );
  });

  it("getPublicApiOrigin strips trailing slash", () => {
    process.env.NEXT_PUBLIC_API_URL = "https://api.example.com/";
    expect(getPublicApiOrigin()).toBe("https://api.example.com");
  });
});
