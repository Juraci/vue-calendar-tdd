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
          { id: 8947, details: "Get Groceries", edit: true },
          { id: 368, details: "Carpool", edit: false }
        ],
        active: true
      },
      {
        id: 2,
        abbvTitle: "Tue",
        fullTitle: "Tuesday",
        events: [{ id: 716, details: "Yoga/Gym", edit: false }],
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
      expect(store.getActiveDay().events[2].details).to.equal("Learn Vue 3.0");
      expect(store.getActiveDay().events[2].edit).to.equal(false);
      expect(store.getActiveDay().events[2].id).to.not.equal(null);
    });
  });

  describe("editEvent", () => {
    before(() => resetStore());

    it("modifies the event edit to true", () => {
      store.editEvent(1, { id: 8947, details: "Learn Vue 3.0" });

      expect(store.getActiveDay().events[0].edit).to.equal(true);
    });

    context("when the event does not exist", () => {
      before(() => resetStore());

      it("does nothing", () => {
        store.editEvent(1, { id: 666, details: "Learn Vue 3.0" });

        expect(store.getActiveDay().events).to.deep.equal([
          { id: 8947, details: "Get Groceries", edit: false },
          { id: 368, details: "Carpool", edit: false }
        ]);
      });
    });
  });

  describe("updateEvent", () => {
    before(() => resetStore());

    it("updates the event with new event details", () => {
      store.updateEvent(
        1,
        { id: 8947, details: "Get Groceries", edit: false },
        "updated details"
      );

      expect(store.getActiveDay().events[0].details).to.equal(
        "updated details"
      );
      expect(store.getActiveDay().events[0].edit).to.equal(false);
    });
  });

  describe("resetEditOfAllEvents", () => {
    before(() => resetStore());

    it("resets the state off all events", () => {
      store.resetEditOfAllEvents();
      store.state.seedData.map(day => {
        day.events.map(evt => {
          expect(evt.edit).to.equal(false);
        });
      });
    });
  });

  describe("deleteEvent", () => {
    before(() => resetStore());

    it("deletes the selected event", () => {
      store.deleteEvent(1, { id: 8947, details: "Get Groceries", edit: false });
      expect(store.getActiveDay().events.length).to.equal(1);
      expect(store.getActiveDay().events[0].id).to.equal(368);
    });
  });
});
