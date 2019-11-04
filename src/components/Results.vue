<template>
  <div id="results">
    <Graph v-if="results.type == 'graph'" :data="results.rows" />
    <code v-for="event in results">
      <pre>{{JSON.stringify(event, null, 2)}}</pre>
    </code>
  </div>
</template>

<script>
import Graph from './Graph.vue';

export default {
  components: {
    Graph,
  },
  props: {
    results: null,
  },
};
</script>

<style lang="less" scoped>
  #results {
    border: 1px solid #ddd;
    padding: 16px;
    margin: 8px 0;
  }
</style>
