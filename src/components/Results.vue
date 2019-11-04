<template>
  <div id="results">
    {{JSON.stringify(results)}}
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
