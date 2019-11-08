<template>
  <div id="app" class="container" @keyup.esc="cancelQuery">
    <QueryBuilder @query="execQuery" :disabled="running" />
    <div class="notification is-danger" v-if="error">{{error}}</div>
    <div class="notification is-info" v-if="running">
      <i class="fas fa-spin fa-cog"></i> Received {{resultCount}} events... <a href="#" @click="cancelQuery">Cancel</a>
    </div>
    <Results :results="results" />
  </div>
</template>

<script>
import QueryBuilder from './components/QueryBuilder.vue';
import Results from './components/Results.vue';
import queryrunner from './queryrunner';
import 'bulma/css/bulma.css';

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
      if (this.running) {
        return;
      }
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
