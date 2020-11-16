Nova.booting((Vue, router, store) => {
  router.addRoutes([
    {
      name: 'my-favorites',
      path: '/my-favorites',
      component: require('./components/Tool'),
    },
  ])
})
