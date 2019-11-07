<template>
  <div class="querybuilder">
    <TopicSelector v-model="selectedTopic" />
    <DatePicker placeholder="After Date" v-model="after" />
    <DatePicker placeholder="Before Date" v-model="before" />
    <input type="text" ref="queryinput"
      placeholder="Input query here..." v-model="query" @keyup.enter="RunQuery" />
    <button @click="RunQuery">Query</button>
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

    input {
      width: 90%;
    }
  }
</style>
