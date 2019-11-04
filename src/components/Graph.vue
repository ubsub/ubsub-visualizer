<template>
  <div ref="graph" id="graph">
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
  props: {
    traces: null,
  },
  watch: {
    traces() {
      this.updateGraph();
    },
  },
  mounted() {
    this.updateGraph();
  },
  methods: {
    updateGraph() {
      Plotly.newPlot(this.$refs.graph, this.traces);
    },
  },
};
</script>
