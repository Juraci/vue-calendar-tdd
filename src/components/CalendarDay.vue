<template>
  <div class="day column">
    <div class="day-banner has-text-white has-text-centered">{{ day.abbvTitle }}</div>
    <div class="day-details">
      <div class="day-number">{{ day.id }}</div>
      <CalendarEvent v-for="(dayEvent, index) in day.events" :dayEvent="dayEvent" :key="index"/>
    </div>
  </div>
</template>

<script>
import CalendarEvent from './CalendarEvent.vue';
export default {
  name: 'CalendarDay',
  components: {
    CalendarEvent,
  },
  props: {
    day: {
      type: Object,
      default() {
        return {
          id: Math.floor(Math.random() * 10),
          abbvTitle: 'Default',
          fullTitle: 'Default',
          events: [
            { details: 'Default Event', edit: true },
          ],
          active: true,
        };
      },
    },
  },
};
</script>

<style lang="scss">
.day {
  background-color: #4A4A4A;
  color: #FFF;
  border-left: 1px solid #8F8F8F;
  border-bottom: 1px solid #8F8F8F;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: darken(#4A4A4A,3%);
  }

  .day-banner {
    background-color: #333333;
    color: #FFF;
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
    border-right: 1px solid #8F8F8F;
  }
}
</style>
