<template>
  <div class="w-input-box">
    <input
    class="w-input" 
    :type="type" 
    ref="input"
    :value="value"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    >
  </div>
</template>
<script>
export default {
  name: 'WInput',
  props: {
    type:{
        type:String,
        default(){
            return 'text';
        }
    },
    value:{
        type:String,
        default(){
            return '';
        }
    },
    placeholder:{
        type:String,
        default(){
            return '请输入内容';
        }
    },
  },
}
</script>