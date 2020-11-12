import { registerComponents } from './components'

Nova.booting((Vue, router, store) => {
  registerComponents(Vue)
  router.addRoutes([
    {
      name: 'component-ui',
      path: '/component-ui',
      component: require('./components/Tool'),
    },
  ])
})
