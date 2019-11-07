<template>
  <div class="querybuilder">
    <TopicSelector v-model="selectedTopic" />
    <input type="text" ref="queryinput"
      placeholder="Input query here..." v-model="query" @keyup.enter="RunQuery" />
    <button @click="RunQuery">Query</button>
  </div>
</template>

<script>
import TopicSelector from './TopicSelector.vue';

export default {
  components: {
    TopicSelector,
  },
  data() {
    return {
      query: 'events.groupBy(x => x.topic_id).map(x => ({topic_id: x[0].topic_id, count: x.length})).bar(x => x.topic_id, y => y.count)',
      selectedTopic: null,
    };
  },
  methods: {
    RunQuery() {
      this.$emit('query', {
        query: this.query,
        topicId: this.selectedTopic,
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
