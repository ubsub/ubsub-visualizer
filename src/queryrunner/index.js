import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

/*
Lots and lots of ugly hacks to make things work with eval()

Probably want to use something like vm2 eventually
*/

_.mixin({
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
});

// eslint-disable-next-line no-unused-vars
function parseDate(d) {
  return moment(d).toDate();
}

export default {
  async executeQuery(query, params = { limit: 500 }) {
    console.log(`Running query: ${query}`);

    const resp = await axios.get('/api/events', {
      params,
    });

    // eslint-disable-next-line no-unused-vars
    const events = _(resp.data).map((x) => {
      // eslint-disable-next-line no-param-reassign
      x.payload = JSON.parse(x.payload);
      return x;
    });

    // eslint-disable-next-line no-eval
    const filteredEvents = eval(query);

    return filteredEvents.value();
  },
};
