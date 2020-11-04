<template>
  <div class="day-event" :style="backgroundColor">
    <div>
      <div v-if="!dayEvent.edit">
        <span class="has-text-centered details">{{ dayEvent.details }}</span>
        <div class="has-text-centered icons">
          <i
            class="fa fa-pencil-square edit-icon"
            @click="editEvent(dayId, dayEvent)"
          >
          </i>
          <i class="fa fa-trash-o delete-icon"></i>
        </div>
      </div>
      <div v-if="dayEvent.edit">
        <input
          type="text"
          :placeholder="dayEvent.details"
          v-model="newDetails"
        />
        <div class="has-text-centered icons">
          <i
            class="fa fa-check"
            @click="updateEvent(dayId, dayEvent, newDetails)"
          >
          </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";
export default {
  name: "CalendarEvent",
  props: {
    dayId: {
      type: Number,
      default: 0
    },
    dayEvent: {
      type: Object,
      default() {
        return {
          id: Math.floor(Math.random() * 10),
          details: "default event",
          edit: false
        };
      }
    }
  },
  data() {
    return {
      colors: ["#FF9999", "#85D6FF", "#99FF99"],
      newDetails: ""
    };
  },
  computed: {
    backgroundColor() {
      return `background-color: ${this.randonColor}`;
    },
    randonColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
  },
  methods: {
    editEvent(dayId, dayEvent) {
      store.editEvent(dayId, dayEvent);
    },
    updateEvent(dayId, dayEvent, newDetails) {
      store.updateEvent(dayId, dayEvent, newDetails);
    }
  }
};
</script>

<style lang="scss">
.day-event {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
  color: #4c4c4c;
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
    border-bottom: 1px solid #fff;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>
