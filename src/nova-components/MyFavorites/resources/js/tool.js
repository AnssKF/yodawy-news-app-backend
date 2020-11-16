import { registerStoreModules } from './store'

Nova.booting((Vue, router, store) => {
  registerStoreModules(store);

  router.addRoutes([
    {
      name: 'my-favorites',
      path: '/my-favorites',
      component: require('./components/Tool'),
    },
  ])
})
