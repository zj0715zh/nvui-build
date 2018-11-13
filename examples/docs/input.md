<script>
 export default {
    data() {
      return {
        projectN: '',
        companyN: '',
        mechanismN: ''
      }
    },
  }
</script>
# Input输入框  <a href='#/update?name=input'>编辑</a>
----
用于信息录入。

### 基本用法
页面中的非浮层元素，不会自动消失。
<div class='dome-alert demo-block'>
  <w-input type='text' placeholder='创业项目名称' v-model='projectN'></w-input>
  <w-input type='text' placeholder='所属公司名称' v-model='companyN'></w-input>
  <w-input type='text' placeholder='所属投资机构名称' v-model='mechanismN'></w-input>
</div>

::: demo
```html

<div>
  <w-input type='text' placeholder='创业项目名称' v-model='projectN'></w-input>
  <w-input type='text' placeholder='所属公司名称' v-model='companyN'></w-input>
  <w-input type='text' placeholder='所属投资机构名称' v-model='mechanismN'></w-input>
</div>

<script>
 export default {
    data() {
      return {
        projectN: '',
        companyN: '',
        mechanismN: ''
      }
    },
  }
</script>

```
:::

### Attributes
| 参数      | 说明                                 | 类型      |   可选值             | 默认值   |
|---------- |------------------------------------  |---------- |--------------------  |--------  |
|type       | 可选，input类型                      |  string   |text,number,email等等 |   text   |
|value      | 可选，input默认值                    |  string   |         —            |    —     |
|placeholder| 可选，placeholder文字                | string    |         —            |    —     |

### Event
| 事件名称      |          说明          | 回调参数   |
|-------------- |------------------------|----------  |
| input         |输入框内容发生变化时触发|   value    |
| focus         |    输入框聚焦时触发    |     ——     |
| blur          |    输入框失焦时触发    |     ——     |