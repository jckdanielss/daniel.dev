import { describe, it, expect } from "vitest";
import { PROJECTS, shippedCount, liveCount } from "./projects.js";

describe("projects data", () => {
  it("shippedCount matches the number of listed projects", () => {
    expect(shippedCount).toBe(PROJECTS.length);
  });

  it("liveCount only counts projects with a real href", () => {
    const expected = PROJECTS.filter((p) => p.href).length;
    expect(liveCount).toBe(expected);
  });

  it("every project has a unique slug", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives every project an inline case file", () => {
    PROJECTS.forEach((project) => {
      expect(project.caseFile.problem).toBeTruthy();
      expect(project.caseFile.result).toBeTruthy();
      expect(project.caseFile.decisions.length).toBeGreaterThan(1);
      project.caseFile.screens?.forEach((screen) => {
        expect(screen.width).toBeGreaterThan(0);
        expect(screen.height).toBeGreaterThan(0);
      });
    });
  });
});
