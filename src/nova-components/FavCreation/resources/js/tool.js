import FavCreationForm from './components/Fav/FavCreationForm.vue';
import FormField from './components/custom/FormField/FormField.vue';

import { registerStoreModules } from './store'

Nova.booting((Vue, router, store) => {
  registerComponents(Vue);
  registerStoreModules(store);

  router.addRoutes([
    {
      name: 'fav-creation',
      path: '/fav-creation',
      component: require('./components/Tool'),
    },
  ])
})

function registerComponents(Vue) {
  Vue.component('FavCreationForm', FavCreationForm);
  Vue.component('FormField', FormField);
}