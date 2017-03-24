<template>
  <div class="pagination-bar" v-if="total > 1">
    <ul>
      <li @click="prev" v-show="cur > 4">
        <i class="angle-left"></i>
      </li>
      <li v-for="val in pages" 
        :class="{'current': val == cur}" 
        @click='turn(val)'>
        {{ val }}
      </li>
      <li @click="next" v-show="cur < total - 3">
        <i class="angle-right"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['total'],					// 总页数
  data: function () {
    return {
      cur: 1 								// 当前页数
    }
  },

  methods: {
    next: function () {
      if (this.cur < this.total) this.cur++
    },
    prev: function () {
      if (this.cur > 1) this.cur--
    },
    turn: function (val) {
      if (typeof val == 'number') {
        this.cur = val
      }
    }
  },

  computed: {
    pages: function () {
      var arr = [];
      if (this.total <= 7) {
        for (var i = 0; i < this.total; i++) {
          arr[i] = i + 1;
        };
      } else if (this.total > 7) {
        if (this.cur <= 4) {
          arr = [1, 2, 3, 4, 5, 6, '…', this.total]
        }
        if (this.cur > 4 && this.cur <= this.total - 4) {
          arr = [1, '…', this.cur - 2, this.cur - 1, this.cur, this.cur + 1, this.cur + 2, '…', this.total]
        }
        if (this.cur > this.total - 4) {
          arr = [1, '…'];
          for (var i = 5; i >= 0; i--) {
            arr.push(this.total - i)
          };
        }
      }

      return arr
    }
  },
  watch: {
    'cur': function (val) {
      this.$emit('turnpage', val)
    }
  }
}
</script>

<style scoped lang="less">
.pagination-bar {
  border-left: 1px solid #f2f2f2;
  ul {
    display: block;
    background-color: #fff;
    font-size: 0;
    li {
      display: inline-block;  
      width:36px;
      height:36px;
      line-height: 36px;
      text-align: center;
      color:#666;
      vertical-align: middle;
      cursor: pointer;  
      font-size: 14px;  
      -webkit-user-select: none;
      -moz-user-select: none;
      -o-user-select: none;
      user-select: none;
      border-right: 1px solid #f2f2f2;  
      border-top: 1px solid #f2f2f2;  
      border-bottom: 1px solid #f2f2f2;        
      &:not(.current):hover{
        background-color: #eee;
      }
    }
    .current {
      background-color: #ddd;
    }
  }
}
.angle-right {
  display: inline-block;
  width: 10.5px;
  height: 10px;
  border-right: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  transform: rotate(-45deg);
}
.angle-left {
  display: inline-block;
  width: 10.5px;
  height: 10px;
  border-right: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  transform: rotate(135deg);
}
</style>
