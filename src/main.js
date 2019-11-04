import Vue from 'vue';
import Cookies from 'js-cookie';
import App from './App.vue';

function redirectToAuth() {
  window.location = '/auth';
}

let auth;
try {
  auth = Cookies.getJSON('oidcState');
} catch (err) {
  console.log(err);
}

if (!auth || !auth.jwt) {
  redirectToAuth();
}

Vue.prototype.$user = {
  id: auth.jwt.sub,
  token: auth.access_token,
};

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
