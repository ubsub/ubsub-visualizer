<template>
  <div id="app">
    <QueryBuilder @query="execQuery" :disabled="running" />
    <div class="box error" v-if="error">{{error}}</div>
    <div class="box" v-if="running">
      <i class="fas fa-spin fa-cog"></i> Received {{resultCount}} events... <a href="#" @click="cancelQuery">Cancel</a>
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
      resultCount: 0,
      running: false,
      cancel: false,
    };
  },
  methods: {
    async execQuery(query) {
      this.error = null;
      this.resultCount = 0;
      this.running = true;
      this.cancel = false;
      try {
        await queryrunner.fetchDataBatch(async (eventsSoFar) => {
          if (this.cancel) throw new Error('Canceled');
          this.results = await queryrunner.executeQuery(eventsSoFar, query.query);
          this.resultCount = eventsSoFar.length;
        }, query.filter);
      } catch (err) {
        this.error = `${err}`;
      } finally {
        this.running = false;
        this.cancel = false;
      }
    },
    cancelQuery() {
      if (this.running) {
        this.cancel = true;
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
