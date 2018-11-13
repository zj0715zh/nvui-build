<style>
progress{
  margin:20px 40px;
}
</style>
<script>
 export default {
    methods: {
      hello() {
        alert('Hello World!');
      }
    }
  }
</script>
# Progress 进度条
----
用于页面中展示重要的提示信息。

### 基本用法
页面中的非浮层元素，不会自动消失。
<progress id='myProgress' value='75' max='100'>
</progress>

::: demo
```html

<progress id='myProgress' value='75' max='100'>
</progress>

```
:::