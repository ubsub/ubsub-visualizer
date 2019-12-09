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
              <li><code>.trace(xFunc, ...yFunc)</code>: Graphs a line-chart. The first arg is a lambda that gets the X value of the data, and all following arguments provide a y value. If more than one y-func is provided, there will be multiple data series.</li>
              <li><code>.barTrace(xFunc, ...yFunc)</code>: Same as the line graph above, except will output as bar-graph</li>
              <li><code>.pieTrace(labelFunc, ...valFunc)</code>: Generate pie chart(s) given a label function, and a function to retrieve a value</li>
              <li><code>.mapTrace()</code>: Takes in a map and assumes the key is the x value, and the value is the y</li>
              <li><code>.groupMapTrace()</code>: Same as .mapTrace(), but assumes the top-level object specifies a group</li>
              <li><code>.groupTrace(xFunc, yFunc)</code>: Assumes that it takes in a map, and that each key in the map is the name of a trace.  Then builds x and y given xFunc and yFunc for each trace</li>
              <li><code>.histogram(...xFunc)</code>: Will create a histogram where the x-values are counted (rather than providing the y value)</li>
              <li><code>.groupHistogram(xFunc)</code>: Assumes input is a map, and the key is the name of the trace.  Will build a histogram for each trace in the map</li>
            </ul>
          </p>
          <p>
            Then, once the traces are formed, simply call <code>.graph()</code>
            <ul>
              <li><code>.graph([title], [layout])</code> Graph with optional title or layout options</li>
              <li><code>.graphStacked([title])</code> Helper to call .graph() assuming layout is stacked</li>
            </ul>
          </p>
          <p>
            In addition, the following helper functions are provided:

            <ul>
              <li><code>parseDate(str)</code>: Parses string to a js date object</li>
              <li><code>dateOf(date)</code>: Returns the date-part of a date-like object</li>
              <li><code>startOf(date, unit)</code>: Shorthand to moment startOf, to truncate a time to a unit</li>
              <li><code>at(path, [default])</code>: Shorthand to access a undefined-safe value. Returns a lambda to access a value, or return default</li>
            </ul>
          </p>
          <p>
            The following raw libraries are exposed:
            <ul>
              <li><code>_</code>: Reference to <a href="https://lodash.com/docs/4.17.15" target="_blank">lodash</a></li>
              <li><code>moment</code>: Reference to <a href="https://momentjs.com/docs/" target="_blank">moment</a></li>
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
