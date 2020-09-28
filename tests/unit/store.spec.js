import { expect } from "chai";
import { store } from "@/store.js";

describe("Store", () => {
  const resetStore = () => {
    store.load([
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
    ]);
  };

  describe("getActiveDay", () => {
    before(() => resetStore());

    it("returns the first active day", () => {
      expect(store.getActiveDay().fullTitle).to.equal("Monday");
    });
  });

  describe("setActiveDay", () => {
    before(() => resetStore());

    it("sets the active day", () => {
      store.setActiveDay({ dayId: 2 });
      expect(store.getActiveDay().fullTitle).to.equal("Tuesday");
    });
  });

  describe("submitEvent", () => {
    before(() => resetStore());

    it("submits a new event", () => {
      store.submitEvent("Learn Vue 3.0");

      expect(store.getActiveDay().events.length).to.equal(3);
      expect(store.getActiveDay().events[2]).to.deep.equal({
        details: "Learn Vue 3.0",
        edit: false
      });
    });
  });
});
