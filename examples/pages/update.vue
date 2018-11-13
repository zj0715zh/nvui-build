<template>
  <div  class="add_component">
    <h2>组件编辑</h2>
    <form role="form">
      <div class="form-group">
        <label for="name">组件名称</label>
        <input type="text" class="form-control" v-model="name" placeholder="请输入名称">
      </div>
      <div class="form-group">
        <label for="name">组件描述</label>
        <input type="text" class="form-control" v-model="desc" placeholder="请输入描述">
      </div>
      <div class="form-group">
        <label for="name">组件路由</label>
        <input type="text" class="form-control" v-model="path" placeholder="请输入描述">
      </div>
      <div class="form-group">
        <label for="name">选择组件类型</label>
        <select class="form-control" v-model="compType_id" placeholder="请选择组件类型" @change="getComponentByType">
          <option value="">请选择组件类型</option>
          <option value="0">开发指南</option>
          <option value="1">基础组件</option>
          <option value="2">视图组件</option>
        </select>
      </div>
      <div class="form-group">
        <label for="name">选择显示位置</label>
        <select class="form-control" v-model="component_id" placeholder="请选择组件类型">
          <option value="">最后</option>
          <template v-for="item in component_list">
            <option :value="item.component_id">{{item.c_desc}}</option>
          </template>
        </select>
      </div>
      <div class="form-group">
        <label for="name">用户名</label>
        <input type="text" class="form-control" v-model="developer" placeholder="请输入您的邮箱">
      </div>
      <div class="form-group">
        <label for="name">用户工号</label>
        <input type="number" class="form-control" v-model="developer_gh" placeholder="请输入您的工号">
      </div>
      <div class="form-group">
        <label for="name">组件MD文档</label>
        <!-- <textarea class="form-control" rows="3" v-model="md"></textarea> -->
        <div id="test-editormd"><textarea style="display:none;" v-model="md"></textarea></div>
      </div>
      <a href="javascript:;" class="addBtn" @click="update_component">提交</a>
    </form>
  </div>
</template>

<script>
  let componentName = window.location.href.split('name=').pop()
  var mdDemo
  export default{
    name: 'add_component',
    data () {
      return {
        name: '',
        desc: '',
        path: '',
        compType_id: '',
        md: '',
        developer: '',
        developer_gh: '',
        component_id: '',
        component_list: []
      }
    },
    created () {
      this.getComponentByName()
    },
    methods: {
      update_component () {
        var vm = this
        var postData = vm.postData()
        this.$ajax.post('/updateComponent', postData)
        .then(response => {
          var data = response.data
          if (data.code === 0) {
            alert(data.msg)
            window.location.reload()
          } else {
            alert('插入失败')
          }
        })
      },
      postData () {
        var vm = this
        return {
          name: vm.name,
          desc: vm.desc,
          path: vm.path,
          compType_id: vm.compType_id,
          // md: vm.md,
          md: mdDemo.getMarkdown(),
          developer: vm.developer,
          developer_gh: vm.developer_gh,
          component_id: vm.component_id
        }
      },
      getComponentByType () {
        this.$ajax.post('/getComponentByType', {compType_id: this.compType_id})
        .then(response => {
          var data = response.data
          if (data.code === 0) {
            this.component_list = data.content
            console.log(data.content)
          }
        })
      },
      getComponentByName () {
        var vm = this
        vm.$ajax.post('/getComponentByName', {name: componentName})
        .then(response => {
          var data = response.data
          if (data.code === 0) {
            vm.name = data.content[0].c_name
            vm.desc = data.content[0].c_desc
            vm.path = data.content[0].c_path
            vm.compType_id = data.content[0].compType_id
            vm.md = data.content[0].c_md
            vm.developer = data.content[0].developer
            vm.developer_gh = data.content[0].developer_gh
            vm.component_id = data.content[0].component_id
            // 初始化markdown
            setTimeout(() => {
              var editormd = window.editormd
              mdDemo = editormd('test-editormd', {
                width: '100%',
                height: 640,
                syncScrolling: 'single',
                path: '/static/editor_md/lib/'
              })
            }, 200)
          }
        })
      }
    },
    mounted () {}
  }
</script>
<style type="text/less" lang="less">
  .add_component{
    h2{
      text-align: center;
      font-size: 22px;
      line-height: 50px;
      color: #666;
    }
    form{
      width: 80%;
      margin: 0 auto;
    }
    .form-group{
      line-height:60px;
      label{
        width: 135px;
        display: inline-block;
        vertical-align: top;
      }
      input,select{
        line-height: 35px;
        height: 35px;
        width: 75%;
        padding-left: 10px;
        border-radius: 5px;
        border: 1px solid #999;
      }
      textarea{
        height: 300px;
        width: 550px;
      }
    }
    .addBtn{
      display: block;
      color: #fff;
      background: #0abfff;
      text-align: center;
      line-height: 45px;
      font-size: 18px;
      width: 300px;
      margin: 45px auto;
    }
  }
</style>
