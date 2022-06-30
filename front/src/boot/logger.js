import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.config.globalProperties.$log = console.log.bind(console)
})
