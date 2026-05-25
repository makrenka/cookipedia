import { hasPermission, canEditRecipe } from "./can";

describe("can", () => {
  it("hasPermission returns true for user with this permission", () => {
    expect(
      hasPermission(
        { permissions: ["BLOCK_RECIPIES"], id: "x" },
        "BLOCK_RECIPIES",
      ),
    ).toBe(true);
  });

  it("hasPermission returns false for user without this permission", () => {
    expect(hasPermission({ permissions: [], id: "x" }, "BLOCK_RECIPIES")).toBe(
      false,
    );
  });

  it('hasPermission returns true for user with "ALL" permission', () => {
    expect(
      hasPermission({ permissions: ["ALL"], id: "x" }, "BLOCK_RECIPIES"),
    ).toBe(true);
  });

  it("only author can edit his recipe", () => {
    expect(canEditRecipe({ permissions: [], id: "x" }, { authorId: "x" })).toBe(
      true,
    );
    expect(
      canEditRecipe({ permissions: [], id: "hacker" }, { authorId: "x" }),
    ).toBe(false);
  });
});
