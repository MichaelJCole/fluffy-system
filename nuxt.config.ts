import { prerenderRoutes } from "./drivers/githubdeluxe.mjs";
import { pathToFileURL } from "url";
import { resolve } from "pathe";

const pathToDriver = resolve(__dirname, "drivers", "githubdeluxe.mjs")

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Example nitro plugin
  nitro: {
    plugins: ["~/nitro/frontMatter"],
  },

  components: {
    dirs: [
      {
        path: resolve(__dirname, "./components"),
        global: true,
      },
      {
        path: resolve(__dirname, "./content"),
        global: true,
        pathPrefix: false,
        prefix: "",
      },
    ],
  },

  modules: ["@nuxt/content", "./modules/example"],

  // Example custom hook
  //https://github.com/nuxt/nuxt/issues/13949#issuecomment-1397322945
  hooks: {
    async "prerender:routes"(ctx) {
      console.log('prerender:routes', ctx)
      // if (nitroConfig.dev) { return }
      // ..Async logic..
      const routes = await prerenderRoutes() as string[]
      console.log('routes', routes, "<----------------- this shouldn't be empty")
      routes.forEach(route => ctx.routes.add(route))
    },
  },
  
  content: {
    sources: {
      githubdeluxe: {
        prefix: "/",
        driver:
          process.env.NODE_ENV === "development"
            ? pathToFileURL(pathToDriver).href
            : pathToDriver,
        repo: "nuxt/content",
        branch: "main",
        dir: "/test/fixtures/basic/content",
      },
    },
    ignores: [".*\\.vue"],
    navigation: {
      fields: ["icon"],
    },
  },
});
