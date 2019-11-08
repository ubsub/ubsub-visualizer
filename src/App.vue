<template>
  <div id="app">
    <QueryBuilder @query="execQuery" />
    <div class="box error" v-if="error">{{error}}</div>
    <div class="box" v-if="resultCount > 0">
      <i class="fas fa-spin fa-cog"></i> Received {{resultCount}} events...
    </div>
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
      resultCount: -1,
    };
  },
  methods: {
    async execQuery(query) {
      this.error = null;
      this.resultCount = -1;
      try {
        await queryrunner.fetchDataBatch(async (eventsSoFar) => {
          if (this.cancelQuery) throw new Error('Canceled');
          this.results = await queryrunner.executeQuery(eventsSoFar, query.query);
          this.resultCount = eventsSoFar.length;
        }, query.filter);
      } catch (err) {
        this.error = `${err}`;
      } finally {
        this.resultCount = -1;
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

div.box {
  padding: 8px;
  margin: 8px;

  &.error {
    border: 1px solid maroon;
  }
}
</style>
