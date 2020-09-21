import { expect } from "chai";
import { store } from "@/store.js";

describe("Store", () => {
  const sampleData = [
    {
      id: 1,
      abbvTitle: "Mon",
      fullTitle: "Monday",
      events: [
        { details: "Get Groceries", edit: true },
        { details: "Carpool", edit: false }
      ],
      active: true
    },
    {
      id: 2,
      abbvTitle: "Tue",
      fullTitle: "Tuesday",
      events: [{ details: "Yoga/Gym", edit: false }],
      active: false
    }
  ];

  before(() => {
    store.load(sampleData);
  });

  describe("getActiveDay", () => {
    it("returns the first active day", () => {
      expect(store.getActiveDay().fullTitle).to.equal("Monday");
    });
  });

  describe("setActiveDay", () => {
    it("sets the active day", () => {
      store.setActiveDay({ dayId: 2 });
      expect(store.getActiveDay().fullTitle).to.equal("Tuesday");
    });
  });
});
