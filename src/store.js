import { seedData } from "./seed.js";

export const store = {
  state: {
    seedData
  },
  load(initialData = null) {
    this.state.seedData = initialData || seedData;
    return this.state;
  },
  getActiveDay() {
    return this.state.seedData.find(day => day.active);
  },
  setActiveDay({ dayId }) {
    this.state.seedData.map(day => {
      day.id === dayId ? (day.active = true) : (day.active = false);
    });
  },
  submitEvent(details) {
    const activeDay = this.getActiveDay();
    activeDay.events.push({
      id: Math.floor(Math.random() * 100000),
      details,
      edit: false
    });
  },
  getEventObj(dayId, eventId) {
    const activeDay = this.state.seedData.find(day => day.id === dayId);
    return activeDay.events.find(evt => evt.id === eventId);
  },
  editEvent(dayId, { id, details }) {
    this.resetEditOfAllEvents();
    const event = this.getEventObj(dayId, id);
    if (!event) return;
    event.details = details;
    event.edit = true;
  },
  updateEvent(dayId, { id }, newDetails) {
    const event = this.getEventObj(dayId, id);
    if (!event) return;
    event.details = newDetails;
    event.edit = false;
  },
  deleteEvent(dayId, { id }) {
    const event = this.getEventObj(dayId, id);
    const activeDay = this.state.seedData.find(day => day.id === dayId);
    const index = activeDay.events.indexOf(event);
    activeDay.events.splice(index, 1);
  },
  resetEditOfAllEvents() {
    this.state.seedData.map(day => {
      day.events.map(event => {
        event.edit = false;
      });
    });
  }
};
