<script>
 export default {
    data() {
      return {
        tipText: '这是提示',
        time: 3000
      }
    },
    methods:{
      clickBtn(){
        this.$toast({'message':this.tipText,'duration':this.time})
      }
    }
  }
</script>
# Toast信息提示  <a href='#/update?name=toast'>编辑</a>
----
用于信息提示。

### 基本用法
点击下面按钮显示toast提示
<div class='dome-alert demo-block'>
	<a href='javascript:;' @click='clickBtn'>点击显示</a>
</div>

::: demo
```html

<a href='javascript:;' @click='clickBtn'>点击显示</a>

<script>
 export default {
    data() {
      return {
        tipText: '这是提示',
        time: 3000
      }
    },
    methods:{
      clickBtn(){
        this.$toast({'message':this.tipText,'duration':this.time})
      }
    }
  }
</script>

```
:::

### Attributes
| 参数            |                说明                                 |     类型      |       可选值         | 默认值   |
|---------- |------------------------------------  |---------- |--------------------  |--------  |
|message       |        必选，信息提示文字                   |  string   |        |         |
|showMask      |        可选，是否展示蒙层                    |  Boolen   |        true or false           |    true    |
|duration     |            可选，信息提示停留的时间                | Number    |                 |      |

### Event
| 事件名称      |          说明          | 回调参数   |
|-------------- |------------------------|----------  |
| afterClose       |         信息提示消失后的回调        |       |