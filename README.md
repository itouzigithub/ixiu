# ixiu

> A simple H5 generator based on Vue.js and Vue-router, build with Vue-cli

> Use less as css pre-processor and font-awesome as icon-font

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
 |--global.less
 |--main.js

static
 |--base.css

shell-mobile.html
shell-pc.html
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

## Integrating less

1. download
``` bash
  npm install less less-loader --save-dev
```

2. mark up
``` bash
  <style lang="less">
    /* write less here */
  </style>
```

> Tip: IXIU has already integrated font-awesome and less. Just for illustration.


## Using HandleMenu

1. import
``` bash
  import handleMenu from '../components/HandleMenu'
```

2. register
``` bash
  components: {
    'menu': handleMenu
  }
```

> Tip: if the component is registered globally, just skipping the above steps.


3. put in your template

``` bash
  <menu :e="eventObj"
    v-on:menuEvent="handleBtnEvent"
    :menudata="menuForBtn"
    ref="menu">
  </menu>
```

4. pass the props data

``` bash
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

> iconnames come from [font-awesome](http://fontawesome.io/icons/)


5. define the callback function

``` bash
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

``` bash
  // methods
  showMenu () {
    this.$refs.menu.show = true;
  }
```

> By default, the menu widget will hide itself when mouse out


## Using Pagination

> import and register rules are just same as HandleMenu

1. put in your template

``` bash
  // this widget will only show when the totalPage is over 2
  <div class="page">
    <page :total="totalPage" @turnpage="turnpage"></page>
  </div>
```

2. define callback function

``` bash
  // methods
  turnPage (index) {
    // index represents page number
  }
```

## Using PromptBox

1. put in your template

``` bash
  // basic
  <promptbox title="删除提示" v-on:confirm="delete" ref="deletion" content="您确认删除该项目吗">
  </promptbox>

  // pass id
  <promptbox title="删除提示" v-on:confirm="delete" ref="deletion" content="您确认删除该项目吗" :id="id">
  </promptbox>

  // custom content
  <promptbox title="login" v-on:confirm="login" ref="login">
    <div>
      <p>Username</p>
      <input type="text" v-model="name">
      <p>Password</p>
      <input type="password" v-model="password">
    </div>
  </promptbox>
```

2. define callback function

``` bash
  // methods
  delete (id) {
    // id is undefined unless you pass it
  }
```

3. show promptbox

``` bash
  // methods
  showPrompt () {
    this.$refs.deletion.show = true;
  }
```

## Using tip

``` bash
  import { tip } from './methods'

  // the default value is '操作成功'
  tip(); // 操作成功
  tip('删除成功'); // 删除成功

  // warning
  tip('删除失败', false);
```

## Using directives

``` bash
  // you have to set the direction
  <span v-tip.top="提示内容">上方提示</span>
  <span v-tip.right="提示内容">右方提示</span>
  <span v-tip.bottom="提示内容">下方提示</span>
  <span v-tip.left="提示内容">左侧提示</span>
```