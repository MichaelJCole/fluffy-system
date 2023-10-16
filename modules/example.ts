import { defineNuxtModule } from '@nuxt/kit'

const virtualPages: { [key: string]: string } = {
  'about.md': '# About Page\nThis is the virtual about page.',
  'hello.md': '# Hello Page\nHello from the virtual world!',
  'index.md': '# Index Page\nWelcome to the virtual index page.'
};

export default defineNuxtModule({
  meta: {
    // Usually the npm package name of your module
    name: '@nuxtjs/example',
    // The key in `nuxt.config` that holds your module options
    configKey: 'sample',
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.0'
    }
  },
  // Default configuration options for your module, can also be a function returning those
  defaults: {},
  // Shorthand sugar to register Nuxt hooks
  hooks: {},
  // The function holding your module logic, it can be asynchronous
  setup(moduleOptions, nuxt) {
    // ...
    console.log('example Nuxt module setup')
  }
})
