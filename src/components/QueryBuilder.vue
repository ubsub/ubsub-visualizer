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
      <div class="column">
        <input type="text" class="input" ref="queryinput" :disabled="!!disabled"
          placeholder="Input query here..." v-model="query" @keyup.enter="RunQuery" />
      </div>
      <div class="column is-1">
        <button class="button is-primary" @click="RunQuery" :disabled="!!disabled">Query</button>
      </div>
    </div>
  </div>
</template>

<script>
import TopicSelector from './TopicSelector.vue';
import DatePicker from './ui/DatePicker.vue';

export default {
  components: {
    TopicSelector,
    DatePicker,
  },
  props: {
    disabled: { default: false },
  },
  data() {
    return {
      query: 'events.groupBy(x => x.topic_id).map(x => ({topic_id: x[0].topic_id, count: x.length})).bar(x => x.topic_id, y => y.count)',
      selectedTopic: null,
      after: null,
      before: null,
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
