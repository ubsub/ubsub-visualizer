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
        <button class="button is-link is-small is-light" @click="$refs.helpModal.show()">Help</button>
      </div>
    </div>
    <HelpModal visible="showHelp" ref="helpModal" />
  </div>
</template>

<script>
import moment from 'moment';
import TopicSelector from './TopicSelector.vue';
import DatePicker from './ui/DatePicker.vue';
import CodeMirror from './ui/CodeMirror.vue';
import HelpModal from './HelpModal.vue';

export default {
  components: {
    TopicSelector,
    DatePicker,
    CodeMirror,
    HelpModal,
  },
  props: {
    disabled: { default: false },
  },
  data() {
    return {
      query: 'events.countBy(x => x.topic_id).barTrace((v, k) => k, v => v).graph()',
      selectedTopic: null,
      after: moment().subtract(30, 'd').format('Y-MM-DD'),
      before: moment().format('Y-MM-DD'),
    };
  },
  mounted() {
    if (localStorage.query) {
      this.query = localStorage.query;
      this.$refs.queryinput.overrideValue(this.query); // Hack for codemirror
    }
  },
  methods: {
    RunQuery() {
      localStorage.query = this.query;
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
