<template>
  <div class="querybuilder">
    <input type="text" ref="queryinput" v-model="query" @keyup.enter="RunQuery" />
    <button @click="RunQuery">Query</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: 'all(x => x.filter(row => !!row.state))',
    };
  },
  methods: {
    RunQuery() {
      this.$emit('query', this.query);
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
