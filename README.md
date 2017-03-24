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
``` bash
  npm install font-awesome --save-dev
```
2. import
``` bash
  // main.js
  import 'font-awesome/css/font-awesome.min.css'
```

## HandleMenu Usage
1. import
```
  import handleMenu from '../components/HandleMenu'
```
2. register
```
  components: {
    'menu': handleMenu
  }
```
    Tip: if the component is registered globally, just skipping the above steps.

3. put in your template
```
  <menu :e="eventObj"
    v-on:menuEvent="handleBtnEvent"
    :menudata="menuForBtn"
    ref="menu">
  </menu>
```

4. pass the menu data
```
  // data
  eventObj: null,
  menuForBtn: [{
    name: '编辑',
    eventkey: 1,
    iconname: 'edit'
  }, {
    name: '删除',
    eventkey: 2,
    iconname: 'trash'
  }, {
    name: '向左偏移',
    eventkey: 3,
    iconname: 'arrow-left'
  }, {
    name: '向右偏移',
    eventkey: 4,
    iconname: 'arrow-right'
  }]
```
    iconnames come from [font-awesome](http://fontawesome.io/icons/)

5. define the callback function
```
  // methods
  handleBtnEvent (eventkey) {
    switch (eventkey) {
      case 1:
        // edit btn
        break;
      case 2:
        // delete btn
        break;
      case 3:
        // moveLeft
        break;
      case 4:
        // moveRight
    }
```

6. show menu
```
  // methods
  showMenu () {
    this.$refs.menu.show = true;
  }
```