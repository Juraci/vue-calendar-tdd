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
  }
};
