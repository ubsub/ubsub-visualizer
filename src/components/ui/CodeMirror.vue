<template>
  <textarea ref="sourcetext" v-model="value"></textarea>
</template>

<script>
export default {
  props: {
    lang: { default: 'javascript' },
    lineNumbers: { default: false },
    disabled: { default: false },
    value: null,
  },
  watch: {
    disabled() {
      this.codemirror.readonly = this.disabled;
    },
  },
  methods: {
    focus() {
      this.codemirror.focus();
    },
  },
  mounted() {
    this.codemirror = CodeMirror.fromTextArea(this.$refs.sourcetext, {
      lineNumbers: this.lineNumbers,
      mode: this.lang,
      gutters: ["CodeMirror-lint-markers"],
        lint: {
          options: {
            esversion: 6,
          },
        },
        matchBrackets: true,
    });
    this.codemirror.on('changes', (cm) => {
      this.$emit('input', cm.getValue());
    });
  },
  beforeDestroy() {
    this.codemirror.toTextArea();
  },
}
</script>

<style lang="less">
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}
</style>