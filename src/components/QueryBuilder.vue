<template>
  <div class="box has-background-light">
    <div class="columns">
      <div class="column is-1">Source Data:</div>
      <div class="column"><TopicSelector v-model="selectedTopic" /></div>
      <div class="column"><DatePicker placeholder="After Date" v-model="after" /></div>
      <div class="column"><DatePicker placeholder="Before Date" v-model="before" /></div>
    </div>
    <div class="columns">
      <div class="column is-1">Query:</div>
      <div class="column" @keyup.ctrl.enter="RunQuery">
        <CodeMirror ref="queryinput" placeholder="Input query here..." :disabled="!!disabled" v-model="query" />
      </div>
      <div class="column is-1">
        <button class="button is-primary" @click="RunQuery" :disabled="!!disabled">Query</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import TopicSelector from './TopicSelector.vue';
import DatePicker from './ui/DatePicker.vue';
import CodeMirror from './ui/CodeMirror.vue';

export default {
  components: {
    TopicSelector,
    DatePicker,
    CodeMirror,
  },
  props: {
    disabled: { default: false },
  },
  data() {
    return {
      query: 'events.groupBy(x => x.topic_id)\n  .map(x => ({topic_id: x[0].topic_id, count: x.length}))\n  .bar(x => x.topic_id, y => y.count)',
      selectedTopic: null,
      after: moment().subtract(30, 'd').format('Y-MM-DD'),
      before: moment().format('Y-MM-DD'),
    };
  },
  methods: {
    RunQuery() {
      this.$emit('query', {
        query: this.query,
        filter: {
          topic_id: this.selectedTopic,
          before: this.before,
          after: this.after,
        },
      });
    },
  },
  created() {
    this.$nextTick(() => this.$refs.queryinput.focus());
  },
};
</script>
