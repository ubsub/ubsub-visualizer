<template>
  <div class="querybuilder">
    <div class="subele source">
      <span>Source Data: </span>
      <TopicSelector v-model="selectedTopic" />
      <DatePicker placeholder="After Date" v-model="after" />
      <DatePicker placeholder="Before Date" v-model="before" />
    </div>
    <div class="subele query">
      <span>Query: </span>
      <input type="text" ref="queryinput" :disabled="!!disabled"
        placeholder="Input query here..." v-model="query" @keyup.enter="RunQuery" />
      <button @click="RunQuery" :disabled="!!disabled">Query</button>
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

<style scoped lang="less">
  .querybuilder {
    border: 1px solid #ddd;
    padding: 16px;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);

    div.subele {
      padding: 8px;
    }

    div.query {
      input {
        width: 90%;
      }
    }
  }
</style>
