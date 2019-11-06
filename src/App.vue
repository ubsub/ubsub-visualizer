<template>
  <div id="app">
    <QueryBuilder @query="execQuery" />
    <div class="error" v-if="error">{{error}}</div>
    <Results :results="results" />
  </div>
</template>

<script>
import QueryBuilder from './components/QueryBuilder.vue';
import Results from './components/Results.vue';
import queryrunner from './queryrunner';

export default {
  name: 'app',
  components: {
    QueryBuilder,
    Results,
  },
  data() {
    return {
      error: null,
      results: [],
    };
  },
  methods: {
    async execQuery(query) {
      this.error = null;
      try {
        await queryrunner.fetchDataBatch(async (eventsSoFar) => {
          this.results = await queryrunner.executeQuery(eventsSoFar, query);
        });
      } catch (err) {
        this.error = `${err}`;
      }
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.error {
  padding: 8px;
  margin: 8px;
  border: 1px solid maroon;
}
</style>
