import axios from 'axios';
import _ from 'lodash';

export default {
  async executeQuery(rows, query) {
    console.log(`Running query: ${query}`);

    async function queryWrapper() {
      async function all(expr) { // eslint-disable-line no-unused-vars
        const resp = await axios.get('/api/events');
        return expr(_(resp.data).map(x => JSON.parse(x.payload)));
      }

      // eslint-disable-next-line no-eval
      return eval(query);
    }

    const results = await queryWrapper();
    return results.value();
  },
};
