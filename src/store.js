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
  }
};
