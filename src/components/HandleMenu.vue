<!-- 工具菜单 -->
<template>
  <div class="list" 
    v-show="show" 
    :style="{left: corX - 10 + 'px', top: corY - 10 + 'px'}"
    @mouseleave="show = false">
    <ul>
      <li v-for="val in menudata">
        <div @click.stop="handle(val.eventkey)">
          <i :class="'fa fa-' + val.iconname"></i>
          <span class="pl10">{{ val.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['e', 'menudata'],
    data () {
      return {
        // 弹窗参数
        corY: null,
        corX: null,
        show: false
      }
    },
    methods: {
      handle (eventkey) {
        this.show = false;
        this.$emit('menuEvent', eventkey);
      }
    },
    // 显示状态
    watch: {
      "show": function (val) {
        if (val) {
          this.corY = this.e.pageY;
          this.corX = this.e.pageX;
          this.$nextTick(() => {
            var h = this.$el.getBoundingClientRect().height;
            if (window.innerWidth - this.corX <= 230) {
              this.corX -= 200;
            };
            if (window.innerHeight - this.corY <= h) {
              this.corY -= (h - 20);
            };
          })
        }
      }
    }
  }
</script>
<style scoped>
  .list {
    overflow: hidden;
    width: 220px;
    border-radius: 3px;
    box-shadow: 3px 3px 15px -3px rgba(0, 0, 0, .4);
    background-color: #fff;
    position: fixed;
    z-index: 9;
    top: 0;
  }
  ul {
    width: 100%;
    list-style: none;
  }
  li {
    font-size: 13px;
    line-height: 50px;
    cursor: pointer;
    padding: 0 15px;
    color: #666;
    border-left: 1px solid #f2f2f2;
  }
  li i {
    position: relative;
    top: -1px;
  }
  li a {
    display: block;
    color: inherit;
  }
  li:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
  li:first-child {
    border-top: 1px solid #f2f2f2;
  }
  li:hover {
    background-color: #FF5252;
    border-color: #FF5252;
    color: #fff;
  }
</style>