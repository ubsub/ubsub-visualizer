<template>
  <select v-model="selected">
    <option v-for="opt in options" :value="opt.id" :key="opt.id">{{opt.name}} ({{opt.id || '*'}})</option>
  </select>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      topics: [],
      selected: null,
    };
  },
  computed: {
    options() {
      return [{
        id: null,
        name: 'All',
      }].concat(this.topics);
    },
  },
  watch: {
    selected() {
      this.$emit('input', this.selected);
    },
  },
  mounted() {
    axios.get('/api/topic')
      .then(resp => {
        this.topics = resp.data;
      });
  },
};
</script>
