import { registerComponents } from './components'

Nova.booting((Vue, router, store) => {
  registerComponents(Vue)
  Vue.component('component-ui', require('./components/Tool'))
})
