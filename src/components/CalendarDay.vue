<template>
  <div class="day column" @click="setActiveDay(day.id)">
    <div class="day-banner has-text-white has-text-centered">
      {{ day.abbvTitle }}
    </div>
    <div class="day-details">
      <div class="day-number">{{ day.id }}</div>
      <CalendarEvent
        v-for="(dayEvent, index) in day.events"
        :dayId="day.id"
        :dayEvent="dayEvent"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";
import CalendarEvent from "./CalendarEvent.vue";
export default {
  name: "CalendarDay",
  components: {
    CalendarEvent
  },
  props: {
    day: {
      type: Object,
      default() {
        return {
          id: Math.floor(Math.random() * 10),
          abbvTitle: "Default",
          fullTitle: "Default",
          events: [{ details: "Default Event", edit: true }],
          active: true
        };
      }
    }
  },
  methods: {
    setActiveDay(dayId) {
      store.setActiveDay({ dayId });
    }
  }
};
</script>

<style lang="scss">
.day {
  background-color: #4a4a4a;
  color: #fff;
  border-left: 1px solid #8f8f8f;
  border-bottom: 1px solid #8f8f8f;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: darken(#4a4a4a, 3%);
  }

  .day-banner {
    background-color: #333333;
    color: #fff;
    padding: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 12px;
    font-weight: 600;
  }

  .day-details {
    padding: 10px;
  }

  &:last-child {
    border-right: 1px solid #8f8f8f;
  }
}
</style>
