<template>
  <div id="calendar-entry">
    <div class="calendar-entry-note">
      <input
        type="text"
        placeholder="New Event"
        v-model="inputEntry"
        @keyup.enter="submitEvent()"
        required
      />
      <p class="calendar-entry-day">
        Day of event: <span class="bold">{{ getTitle }}</span>
      </p>
      <a class="button is-primary is-small is-outlined" @click="submitEvent()">
        Submit
      </a>
    </div>
    <p
      class="error"
      style="color: red; font-size: 13px; text-align: center"
      v-if="error"
    >
      You should type something first!
    </p>
  </div>
</template>

<script>
import { store } from "../store.js";
export default {
  name: "CalendarEntry",
  data() {
    return {
      inputEntry: "",
      error: false
    };
  },
  computed: {
    getTitle() {
      return store.getActiveDay().fullTitle;
    }
  },
  methods: {
    submitEvent() {
      const inputDetails = this.inputEntry.trim();
      if (inputDetails === "") return (this.error = true);
      store.submitEvent(inputDetails);
      this.resetState();
    },
    resetState() {
      this.inputEntry = "";
      this.error = false;
    }
  }
};
</script>

<style lang="scss">
#calendar-entry {
  background: #fff;
  border: 1px solid #42b883;
  border-radius: 10px;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;

  .calendar-entry-note {
    input {
      width: 200px;
      font-weight: 600;
      border: 0;
      border-bottom: 1px solid #ccc;
      font-size: 15px;
      height: 30px;
      margin-bottom: 10px;

      &:focus {
        outline: none;
      }
    }

    .calendar-entry-day {
      color: #42b883;
      font-size: 12px;
      margin-bottom: 10px;
      padding-bottom: 5px;

      .bold {
        font-weight: 600;
      }
    }

    .submit {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
