import { registerStoreModules } from './store';
import { registerComponents } from './components';

Nova.booting((Vue, router, store) => {
  registerStoreModules(store);
  registerComponents(Vue)

  router.addRoutes([
    {
      name: 'my-favorites',
      path: '/my-favorites',
      component: require('./components/Tool'),
    },
  ])
})
