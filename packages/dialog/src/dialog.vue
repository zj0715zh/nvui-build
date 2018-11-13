<template>
  <section class="sdk_dialog" @touchmove="preventMove()" v-show="visible">
    <div class="mask" v-if="showMask"></div>
    <div class="content">
      <slot name="title">
        <div class="title">{{title}}</div>
      </slot>
      <div class="dialogBox"><slot name="dialogBox">这是默认的东西</slot></div>
      <div class="btn_group">
        <a href="javascript:;" class="cancel" @click="onCancel">{{cancelBtn}}</a>
        <a href="javascript:;" class="confirm" @click="onConfirm">{{confirmBtn}}</a>
      </div>
    </div>
  </section>
</template>

<script>
  
  export default {
    name: 'WDialog',
    props:{
      visible:{
        type:Boolean,
        default:false
      },
      showMask:{
        type:Boolean,
        default:true
      },
      title:{
        type:String,
        default:''
      },
      width:{
        type:String,
        default:'50%'
      },
      height:{
        type:String,
        default:'auto'
      },
      cancelBtn:{
        type:String,
        default:'取消'
      },
      confirmBtn:{
        type:String,
        default:'确定'
      }
    },
    data(){
      return {
        
      }
    },
    created(){
      
    },
    methods:{
      preventMove(){
        // let event = e || event;
        event.preventDefault();
        event.stopPropagation();
      },
      onCancel(){
        this.$emit('update:visible', false);
        this.$emit('onCancel')
      },
      onConfirm(){
        this.$emit('update:visible', false);//需要加修饰符.sync
        this.$emit('onConfirm')
      }
    },
    mounted(){
      let dialogDom = document.querySelector('.sdk_dialog .content')
      dialogDom.style.width = this.width
      dialogDom.style.height = this.height
    }
  }

</script>

<style rel="stylesheet/css" lang="css" scoped>
  @import './dialog.css'
</style>
