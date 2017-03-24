# ixiu

> A simple H5 generator based on Vue.js and Vue-router, build with Vue-cli

## Docs you may need

* [Vue](https://cn.vuejs.org/v2/guide/)
* [Vue-router](http://router.vuejs.org/zh-cn/essentials/getting-started.html)
* [Vue-cli](http://vuejs-templates.github.io/webpack/index.html)
* [vue-loader](http://vuejs.github.io/vue-loader)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Project Structure
``` bash
src
 |--assets
 |--components
       |--HandleMemnu.vue
       |--Pagination.vue
       |--PromptBox.vue
 |--directives
       |--index.js
 |--filters
       |--index.js
 |--methods
       |--index.js
 |--pages
       |--dashboard.vue
       |--editor.vue
 |--router
       |--index.js
 |--App.vue
 |--main.js
```

## Integrating Font-awesome
1. download
    npm install font-awesome --save-dev
2. import
    // main.js
    import 'font-awesome/css/font-awesome.min.css'
