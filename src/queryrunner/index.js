import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import minivm from './minivm';

/*
Lots and lots of ugly hacks to make things work with eval()

Probably want to use something like vm2 eventually
*/

const evalLodash = _.runInContext();
evalLodash.mixin({
  graph(traces, title = undefined, layout = {}) {
    return {
      type: 'graph',
      traces,
      title,
      layout,
    };
  },

  // Helper for graph() which assumes stacking
  graphStacked(items, title = undefined) {
    return this.graph(items, title, {
      barmode: 'stack',
      bargap: 0.05,
    });
  },

  trace(items, xFunc, ...yFuncTraces) {
    return _.map(yFuncTraces, yFunc => ({
      x: _.map(items, xFunc),
      y: _.map(items, yFunc),
      mode: 'lines+markers',
      type: 'scatter',
      name: `${yFunc}`,
    }));
  },

  barTrace(items, xFunc, ...yFuncTraces) {
    return _.map(yFuncTraces, yFunc => ({
      x: _.map(items, xFunc),
      y: _.map(items, yFunc),
      type: 'bar',
      name: `${yFunc}`,
    }));
  },

  pieTrace(items, labelFunc, ...valFuncTraces) {
    return _.map(valFuncTraces, valFunc => ({
      labels: _.map(items, labelFunc),
      values: _.map(items, valFunc),
      type: 'pie',
      name: `${valFunc}`,
    }));
  },

  pieMap(items) {
    return this.pieTrace(items, (v, k) => k, v => v);
  },

  groupTrace(items, xFunc, yFunc) {
    return _.map(items, (traceItems, traceId) => {
      return {
        x: _.map(traceItems, xFunc),
        y: _.map(traceItems, yFunc),
        mode: 'lines+markers',
        type: 'scatter',
        name: traceId,
      };
    });
  },

  // Group Trace, where it assumes the key is the x-axis, and val is y-axis
  mapTrace(items) {
    return this.trace(items, (v, k) => k, v => v);
  },

  groupMapTrace(items) {
    return this.groupTrace(items, (v, k) => k, v => v);
  },

  // Only specify x, which acts as the counter
  histogram(items, ...xFuncTraces) {
    return _.map(xFuncTraces, xFunc => ({
      x: _.map(items, xFunc),
      type: 'histogram',
      name: `${xFunc}`,
    }));
  },

  // Assumes k-v, where k is the group name
  groupHistogram(items, xFunc) {
    return _.map(items, (traceItems, traceId) => {
      return {
        x: _.map(traceItems, xFunc),
        type: 'histogram',
        name: traceId,
      };
    });
  },
});

const helpers = {
  moment,
  _,

  parseDate(d) {
    return moment(d).toDate();
  },

  // Shorthand for a coalescing lambda function
  at(path, defaultVal = undefined) {
    return obj => _.get(obj, path, defaultVal);
  },

  // Shorthand for date-only
  dateOf(val) {
    return moment(val).format('L');
  },

  // shorthand for startOf (truncation)
  startOf(val, unit) {
    return moment(val).startOf(unit).toDate();
  },
};

export default {
  async fetchDataBatch(cb, searchOpts = {}, offset = 0, results = []) {
    const BATCH_SIZE = 200;

    const resp = await axios.get('/api/events', {
      params: _.assign({
        limit: BATCH_SIZE,
        offset,
      }, searchOpts),
    });

    if (resp.data.length === 0) {
      return results;
    }

    const parsedEvents = _.map(resp.data, (event) => {
      return _.assign(event, {
        payload: JSON.parse(event.payload),
      });
    });

    const newResults = results.concat(parsedEvents);
    await cb(newResults);

    return this.fetchDataBatch(cb, searchOpts, offset + resp.data.length, newResults);
  },
  async executeQuery(events, query) {
    console.log(`Running query: ${query}`);

    const filteredEvents = minivm(query, _.assign({
      events: evalLodash(events),
    }, helpers));

    return filteredEvents.value();
  },
};
