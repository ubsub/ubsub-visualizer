<template>
  <input class="input is-rounded" type="text" ref="date" placeholder="Date" size="14" :value="value" @input="$emit('input', $event.target.value)" />
</template>

<script>
import flatPickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/dark.css';

export default {
  props: {
    enableTime: { default: false},
    value: null,
  },
  mounted() {
    flatPickr(this.$refs.date, {
      enableTime: this.enableTime,
      time_24hr: true,
    });
  },
};
</script>
