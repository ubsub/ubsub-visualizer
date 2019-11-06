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
    }));

    return {
      type: 'graph',
      traces,
    };
  },

  piechart(items, labelFunc, ...valFuncTraces) {
    const traces = _.map(valFuncTraces, valFunc => ({
      labels: _.map(items, item => labelFunc(item)),
      values: _.map(items, item => valFunc(item)),
      type: 'pie',
    }));

    return {
      type: 'graph',
      traces,
    };
  },
});

function parseDate(d) {
  return moment(d).toDate();
}

export default {
  async executeQuery(query, params = { limit: 500 }) {
    console.log(`Running query: ${query}`);

    const resp = await axios.get('/api/events', {
      params,
    });

    const events = evalLodash(resp.data).map((x) => {
      // eslint-disable-next-line no-param-reassign
      x.payload = JSON.parse(x.payload);
      return x;
    });

    const filteredEvents = minivm(query, {
      events,
      parseDate,
    });

    return filteredEvents.value();
  },
};
