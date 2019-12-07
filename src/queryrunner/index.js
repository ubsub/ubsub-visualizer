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
  graph(items, xFunc, ...yFuncTraces) {
    const traces = _.map(yFuncTraces, yFunc => ({
      x: _.map(items, item => xFunc(item)),
      y: _.map(items, item => yFunc(item)),
      mode: 'lines+markers',
      type: 'scatter',
      name: `${yFunc}`,
    }));

    return {
      type: 'graph',
      traces,
    };
  },

  bar(items, xFunc, ...yFuncTraces) {
    const traces = _.map(yFuncTraces, yFunc => ({
      x: _.map(items, item => xFunc(item)),
      y: _.map(items, item => yFunc(item)),
      type: 'bar',
      name: `${yFunc}`,
    }));

    return {
      type: 'graph',
      traces,
    };
  },

  stacked(items, xFunc, ...yFuncTraces) {
    const traces = _.map(yFuncTraces, yFunc => ({
      x: _.map(items, item => xFunc(item)),
      y: _.map(items, item => yFunc(item)),
      type: 'bar',
      name: `${yFunc}`,
    }));

    return {
      type: 'graph',
      layout: {
        barmode: 'stack',
      },
      traces,
    };
  },

  histogram(items, ...xFuncTraces) {
    const traces = _.map(xFuncTraces, xFunc => ({
      x: _.map(items, xFunc),
      type: 'histogram',
      name: `${xFunc}`,
    }));
    return {
      type: 'graph',
      traces,
      layout: {
        bargap: 0.05,
      },
    };
  },

  histogramBy(items, byFunc, bucketFunc) {
    const traces = {};
    _.each(items, (item) => {
      const key = byFunc(item);
      if (!traces[key]) {
        traces[key] = {
          x: [],
          type: 'histogram',
          name: key,
        };
      }
      traces[key].x.push(bucketFunc(item));
    });
    return {
      type: 'graph',
      traces: _.values(traces),
      layout: {
        bargap: 0.05,
        barmode: 'stack',
      },
    };
  },

  piechart(items, labelFunc, ...valFuncTraces) {
    const traces = _.map(valFuncTraces, valFunc => ({
      labels: _.map(items, item => labelFunc(item)),
      values: _.map(items, item => valFunc(item)),
      type: 'pie',
      name: `${valFunc}`,
    }));

    return {
      type: 'graph',
      traces,
    };
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
