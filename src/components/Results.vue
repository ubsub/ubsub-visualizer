<template>
  <div class="box">
    <Graph v-if="type == 'graph'" :traces="results.traces" :layout="results.layout" />
    <!-- Raw output -->
    <div v-if="type == 'raw'" class="rows">
      <code v-for="event in results" :key="event.id">
        <pre>{{JSON.stringify(event, null, 2)}}</pre>
      </code>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Graph from './Graph.vue';

export default {
  components: {
    Graph,
  },
  props: {
    results: null,
  },
  data() {
    return {
      type: 'raw',
    };
  },
  watch: {
    results() {
      if (!this.results) return;
      if (_.isArray(this.results)) {
        this.type = 'raw';
      } else if (this.results.type === 'graph') {
        this.type = 'graph';
      } else {
        this.type = 'raw';
      }
    },
  },
};
</script>
