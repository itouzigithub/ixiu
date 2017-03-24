# ixiu

> A simple H5 generator based on Vue.js and Vue-router, build with Vue-cli

> Use less as css pre-processor and font-awesome as icon-font

## Docs you may need

* [Vue](https://cn.vuejs.org/v2/guide/)
* [Vue-router](http://router.vuejs.org/zh-cn/essentials/getting-started.html)
* [Vue-cli](http://vuejs-templates.github.io/webpack/index.html)
* [Vue-loader](http://vuejs.github.io/vue-loader)

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

> Tip: iconnames come from [font-awesome](http://fontawesome.io/icons/)


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
}
```

6. show menu

``` bash
// template
<div @click="showMenu($event)">/div>

// methods
showMenu (e) {
  this.eventObj = e;
  this.$refs.menu.show = true;
}
```

> Tip: by default, the menu widget will show up where you click and hide itself when mouse out


## Using Pagination

> Tip: import and register rules are just same as HandleMenu

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
  // id is undefined unless you pass one
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

> Tip: don't use this directive on router-link


## Some notices

1. button size

``` bash
@media (-webkit-max-device-pixel-ratio: 1.5) {
  #main a {
    transform-origin: top center;
    transform: scale(.33);
  }
}
```

> Tip: don't use 'zoom', because firefox doesn't support it

<br>
2. CORS

&nbsp;&nbsp;&nbsp;&nbsp;[refrence](http://vuejs-templates.github.io/webpack/proxy.html)

``` bash
// config/index.js module.exports.dev
// add:
proxyTable: {
  '/api': {
    target: 'http://mms.itouzi.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/staticAct'
    }
  }
}
// when you write $.ajax('/api/index/publish'), your request will be proxied to 
// 'http://mms.itouzi.com/staticAct/index/publish'
```

<br>
3. Config the assets route

&nbsp;&nbsp;&nbsp;&nbsp;By default, static assets path is composed of

``` bash
// config/index.js module.exports.build:
assetsPublicPath + assetsSubDirectory
= '/' + 'static'
= '/static'
```

&nbsp;&nbsp;&nbsp;&nbsp;If you write:

``` bash
<image src="../assets/1.png">
or
.demo {
  backgound-image: url(../assets/1.png)
}
```

&nbsp;&nbsp;&nbsp;&nbsp;After build, you will get:

``` bash
// html
<image src="/static/img/1.png">

// css
.demo {
  backgound-image: url(/static/img/1.png)
}

// output
dist
  |--static
       |--css
       |--fonts
       |--img
       |--js
  |--index.html
```

&nbsp;&nbsp;&nbsp;&nbsp;If you put all the files under the dist in the root directory, everything will work fine. But if not, the output is probably not what you want.

&nbsp;&nbsp;&nbsp;&nbsp;For example, suppose your files will eventually go to:

```
http://mms.itouz.com/ixiu
```

&nbsp;&nbsp;&nbsp;&nbsp;So, you want the following path:

```
.demo {
  backgound-image: url(/ixiu/static/img/1.png)
}
```

&nbsp;&nbsp;&nbsp;&nbsp;Obviously, you should make some change to config/index.js:

```
assetsPublicPath: '/ixiu/'
```

<br>
4. Inline style: backgoundImage

&nbsp;&nbsp;&nbsp;&nbsp;In .vue files, if you set backgound-image in inline style, you might go wrong:

``` bash
// both won't work unless you use absolute path such as:
// http://static.itouzi.com/image/1.png
<template>
  <div>
    <div style="backgound-image: url(../assets/1.png)"></div>
    <div :style="{backgoundImage: 'url(' + url + ')'}"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        url: '../assets/1.png'
      }
    }
  }
</script>
```

&nbsp;&nbsp;&nbsp;&nbsp;To fix this, you have to write it in another way:

``` bash
<script>
  export default {
    data () {
      return {
        url: require('../assets/1.png')
      }
    }
  }
</script>
```