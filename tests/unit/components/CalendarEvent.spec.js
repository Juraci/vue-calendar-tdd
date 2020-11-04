import { expect } from "chai";
import { mount } from "@vue/test-utils";
import CalendarEvent from "@/components/CalendarEvent.vue";

describe("CalendarEvent.vue", () => {
  it("renders a default state", () => {
    const wrapper = mount(CalendarEvent, {});
    expect(wrapper.text()).to.include("default event");
  });

  it("renders props when passed", () => {
    const dayEvent = { details: "Carpool", edit: false };
    const wrapper = mount(CalendarEvent, {
      propsData: { dayEvent }
    });
    expect(wrapper.text()).to.include("Carpool");
  });

  context("When edit attribute is false", () => {
    it("renders the show state", () => {
      const dayEvent = { details: "Carpool", edit: false };
      const wrapper = mount(CalendarEvent, {
        propsData: { dayEvent }
      });
      expect(wrapper.find(".edit-icon").exists()).to.equal(true);
      expect(wrapper.find(".delete-icon").exists()).to.equal(true);
      expect(wrapper.find("input").exists()).to.equal(false);
      expect(wrapper.find(".fa-check").exists()).to.equal(false);
    });
  });

  context("When edit attribute is true", () => {
    it("renders the edit state", () => {
      const dayEvent = { details: "Carpool", edit: true };
      const wrapper = mount(CalendarEvent, {
        propsData: { dayEvent }
      });

      expect(wrapper.find(".edit-icon").exists()).to.equal(false);
      expect(wrapper.find(".delete-icon").exists()).to.equal(false);
      expect(wrapper.find("input").exists()).to.equal(true);
      expect(wrapper.find(".fa-check").exists()).to.equal(true);
    });
  });
});
