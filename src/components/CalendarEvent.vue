<template>
  <div class="day-event" :style="backgroundColor">
    <div>
      <span class="has-text-centered details">{{ dayEvent.details }}</span>
      <div v-if="dayEvent.edit" class="has-text-centered icons"><i class="fa fa-pencil-square edit-icon"></i>
        <i class="fa fa-trash-o delete-icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarEvent',
  props: {
    dayEvent: {
      type: Object,
      default() {
        return { details: 'default event', edit: true };
      },
    },
  },
  data() {
    return {
      colors: ['#FF9999', '#85D6FF', '#99FF99'],
    };
  },
  computed: {
    backgroundColor() { return `background-color: ${this.randonColor}`; },
    randonColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    },
  },
};
</script>

<style lang="scss">
.day-event {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
  color: #4C4C4C;
  padding: 5px;

  .details {
    display: block;
  }

  .icons .fa {
    padding: 0 2px;
  }

  input {
    background: none;
    border: 0;
    border-bottom: 1px solid #FFF;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>
