<template>
  <div class="select">
    <select v-model="selected">
      <option v-for="opt in options" :value="opt.id" :key="opt.id">{{opt.name}} ({{opt.id || '*'}})</option>
    </select>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

export default {
  data() {
    return {
      topics: [],
      selected: null,
    };
  },
  computed: {
    options() {
      const ALL_TOPICS = {
        id: null,
        name: 'All',
      };
      return _.concat(ALL_TOPICS, _.sortBy(this.topics, x => x.name));
    },
  },
  watch: {
    selected() {
      this.$emit('input', this.selected);
    },
  },
  mounted() {
    axios.get('/api/topic')
      .then((resp) => {
        this.topics = resp.data;
      });
  },
};
</script>
