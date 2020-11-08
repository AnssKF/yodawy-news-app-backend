Nova.booting((Vue, router, store) => {
  router.addRoutes([
    {
      name: 'fav-creation',
      path: '/fav-creation',
      component: require('./components/Tool'),
    },
  ])
})
