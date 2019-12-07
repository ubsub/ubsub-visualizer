<template>
  <div class="modal" :class="{ 'is-active': visible }">
    <div class="modal-background" @click="hide"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Help</p>
        <button class="delete" aria-label="close" @click="hide"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <p>
            <strong>UbSub visualizer</strong> is based on a <strong>lodash stream</strong>.  You can read more about
            lodash and the various methods they provide to manipulate data <a href="https://lodash.com/docs/4.17.15" target="_blank">on their website</a>. It
            executes the javascript directly in your browser to manpiulate and display the data.
          </p>
          <p>
            Visualizer provides the default variable <code>events</code> which is a lodash stream that contains all events
            retrieved for the given query.  If you enter only <code>events</code> and run the query, you can see the raw output.
          </p>
          <p>
            Once you have manipulated the data to look like you want, you have access to a few different graphing functions:
            <ul>
              <li><code>.graph(xFunc, ...yFunc)</code>: Graphs a line-chart. The first arg is a lambda that gets the X value of the data, and all following arguments provide a y value. If more than one y-func is provided, there will be multiple data series.</li>
              <li><code>.bar(xFunc, ...yFunc)</code>: Same as the line graph above, except will output as bar-graph</li>
              <li><code>.stacked(xFunc, ...yFunc)</code>: The same as above, except the results are stacked.</li>
              <li><code>.histogram(...xFunc)</code>: Will create a histogram where the x-values are counted (rather than providing the y value)</li>
              <li><code>.piechart(labelFunc, ...valFunc)</code>: Generate pie chart(s) given a label function, and a function to retrieve a value</li>
            </ul>
          </p>
          <p>
            In addition, the following helper functions are provided:

            <ul>
              <li><code>parseDate</code>: Parses string to a js date object</li>
            </ul>
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="hide">Thanks!</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  }
};
</script>
