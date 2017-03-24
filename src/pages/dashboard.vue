<template>
  <div>
    <div class="nav">
      <div class="content">
        <img src="../assets/ixiu.jpg" width="50px" class="mt10">
        <i class="fa fa-plus r pointer newH5" @click="showH5Editor()"></i>
      </div>
    </div>
    <div class="content">
      <div class="list">
        <table class='table-style'>
          <tr>
            <th with="10%">编号</th>
            <th with="10%">名称</th>
            <th with="10%">url后缀</th>
            <th with="10%">负责人</th>
            <th with="10%">浏览量</th>
            <th with="10%">启动日期</th>
            <th with="10%">截止日期</th>
            <th with="10%">状态</th>
            <th with="10%">操作</th>
          </tr>
          <tr v-for="val in list">
            <td width="10%">{{ val.identifier }}</td>
            <td width="20%">{{ val.name }}</td>
            <td width="10%">{{ val.url }}</td>
            <td width="10%">{{ val.person }}</td>
            <td width="10%">{{ val.view }}</td>
            <td width="10%">{{ val.startTime }}</td>
            <td width="10%">{{ val.endTime }}</td>
            <td width="10%">已结束</td>
            <td width="10%">
              <router-link to="/editor">
                <i class="fa fa-desktop mr10 pointer"></i>
              </router-link>
                <i class="fa fa-edit pointer" 
                  style="font-size: 14px"
                  @click="showH5Editor(val.id)"></i>
            </td>
          </tr>
        </table>
      </div>

      <!-- pagination | 分页 -->
      <div class="r mt30">
        <page :total="total" @turnpage="turnpage"></page>
      </div>
    </div>


    <!-- 添加/编辑活动 -->
    <promptbox title="H5活动信息" v-on:confirm="submit" ref="editH5">
      <div>
        <div class="mb10">
          <p class="f13 mb4">* 编号</p>
          <input type="text" v-model.trim="h5.identifier" class="ipt">
          <i class="fa fa-check ml10 green" v-show="h5.identifier != ''"></i>
        </div>
        <div class="mb10">
          <p class="f13 mb4">* 名称</p>
          <input type="text" v-model.trim="h5.name" class="ipt">
          <i class="fa fa-check ml10 green" v-show="h5.name != ''"></i>
        </div>
        <div class="mb10">
          <p class="f13 mb4">* url后缀</p>
          <input type="text" v-model.trim="h5.url" class="ipt">
          <i class="fa fa-check ml10 green" v-show="h5.url != ''"></i>
        </div>
        <div class="mb10">
          <p class="f13 mb4">* 负责人</p>
          <input type="text" v-model.trim="h5.person" class="ipt">
          <i class="fa fa-check ml10 green" v-show="h5.person != ''"></i>
        </div>
        <div class="mb10">
          <p class="f13 mb4">* 启动时间</p>
          <input type="date" v-model.trim="h5.startTime" class="ipt">
          <i class="fa fa-check ml10 green" v-show="h5.endTime != ''"></i>
        </div>
        <div class="mb10">
          <p class="f13 mb4">* 结束时间</p>
          <input type="date" v-model.trim="h5.endTime" class="ipt">
          <i class="fa fa-check ml10 green" v-show="h5.endTime != ''"></i>
        </div>
      </div>
    </promptbox>
  </div>
</template>

<script>
import promptbox from '../components/PromptBox'
import pagination from '../components/Pagination.vue'
import { tip } from '../methods'
export default {
  name: 'hello',
  data () {
    return {
      h5: {
        identifier: '',
        name: '',
        url: '',
        person: '',
        startTime: '',
        endTime: '',
      },
      list: [{
        id: 1,
        identifier: '201502-1',
        name: '拉新运营活动',
        url: 'newyear',
        person: 'kidney',
        view: 230,
        startTime: '',
        endTime: '2017-03-02'
      }],
      total: 10
    }
  },
  components: {
    'promptbox': promptbox,
    'page': pagination
  },
  methods: {
    showH5Editor (id) {
      if (id) {
        for (var i = this.list.length - 1; i >= 0; i--) {
          if (this.list[i].id == id) {
            for (var key in this.h5) {
              this.h5[key] = this.list[i][key];
            }
          }
        }
      } else {
        for (var key in this.h5) {
          this.h5[key] = '';
        }
      }
      this.$refs.editH5.show = true;
    },
    submit () {
      for (var key in this.h5) {
        if (this.h5[key] == '') {
          tip('请将信息填写完整', false);
          return;
        }
      }
      tip('保存成功');
      this.$refs.editH5.show = false;
    },
    turnpage (index) {
      console.log(index)
    }
  }
}
</script>
<style scoped lang='less'>
.nav {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  text-align: center;
}
.content {
  width: 1200px;
  margin: 0 auto;
}
.list {
  width: 100%;
  border: 1px solid #f2f2f2;
  margin-top: 50px;
}
.table-style {
  width: 100%;
  border-collapse: collapse;
  tr {
    cursor: default;
  }
  tr:not(:first-child):hover {
    background-color: #f2f2f2;
  }
  th, td {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    font-size: 13px;
    text-align: left;
    border-bottom: 1px solid #f2f2f2;
  }
  tr:last-child td {
    border-bottom: 1px solid #f2f2f2;
  }
  i {
    transition: all .2s;
  }
  i:hover {
    color: #FF5252;
  }
}
.newH5 {
  margin-top: 10px;
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #FF5252;
  border-radius: 50%;
  transition: all .2s;
}
.newH5:hover {
  background-color: #FF5252;
  color: #fff;
}
.ipt {
  width: 85%;
  height: 36px;
  border: 1px solid #ccc;
  padding-left: 5px;
  outline: none;
}
.ipt:focus {
  border-color: #FF5252;
}
.green {
  color: green;
}
</style>
