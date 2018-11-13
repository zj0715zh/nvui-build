<script>
 export default {
    data() {
      	return {
        	title: '这是测试',
        	showDialog: false
      	}
    },
    methods:{
      	clickBtn(){
        	this.showDialog = true
      	}
    }
  }
</script>
# Dialog  <a href='#/update?name=dialog'>编辑</a>
----
用于信息提示。

### 基本用法
点击下面按钮显示toast提示
<div class='dome-alert demo-block'>
	<a href='javascript:;' @click='clickBtn'>点击显示</a>
	<w-dialog :visible.sync='showDialog' :title='title'>
		<template slot='dialogBox'>
	        <div class='reg_roleChoose'>为了给您带来更好的体验，请选择您在网站中的角色</div>
	  	</template>
	</w-dialog>
</div>

::: demo
```html

<a href='javascript:;' @click='clickBtn'>点击显示</a>
<w-dialog :visible.sync='showDialog' :title='title'>
	<template slot='dialogBox'>
        <div class='reg_roleChoose'>为了给您带来更好的体验，请选择您在网站中的角色</div>
  	</template>
</w-dialog>

<script>
 export default {
    data() {
      	return {
        	title: '这是测试',
        	showDialog: false
      	}
    },
    methods:{
      	clickBtn(){
        	this.showDialog = true
      	}
    }
  }
</script>

```
:::

### Attributes
| 参数            |                说明                                 |     类型      |       可选值         | 默认值   |
|---------- |------------------------------------  |---------- |--------------------  |--------  |
|visible       |        是否显示 Dialog，支持 .sync 修饰符                   |  boolean   |        |     false    |
|title      |        Dialog 的标题，也可通过具名 slot （见下表）传入              |  string   |       ——           |    ——    |
|width     |            Dialog 的宽度                | string    |        ——         |   50%   |
|showMask     |            是否需要遮罩层                | boolean    |         ——        |   true   |
|height     |            Dialog 的高度                | string    |         ——        |   auto   |
|cancelBtn     |            取消按钮文字                | string    |         ——        |   取消   |
|confirmBtn     |           确定按钮文字                | string    |         ——        |   确定   |

### Attributes
| 参数            |                说明                                 |
|---------------- |------------------------------------  |
|title       |        Dialog 标题区的内容                  |
|dialogBox       |        Dialog 的中间区域内容                  |

### Event
| 事件名称      |          说明          | 回调参数   |
|-------------- |------------------------|----------  |
| onCancel       |         点击取消按钮时的回调        |   ——    |
| onConfirm       |         点击确定按钮时的回调        |   ——    |