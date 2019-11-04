<template>
  <div id="results">
    <code v-for="event in results">
      <pre>{{JSON.stringify(event, null, 2)}}</pre>
    </code>
  </div>
</template>

<script>
export default {
  props: {
    results: null,
  },
};
</script>

<style lang="less" scoped>
  #results {
    border: 1px solid #ddd;
    padding: 16px;
    margin: 8px 0;
  }
</style>
