<template>
  <transition name="fade">
    <section class="nvui_toast" @touchmove="preventMove()" v-if="visible">
      <div class="mask" v-show="showMask"></div>
      <div class="text" v-html="message"></div>
    </section>
  </transition>
</template>

<script>
  
  export default {
    name: 'WToast',
    data(){
      return {
        visible:true,
        showMask:true,
        onClose: null,
        closed: false,
        timer: null,
        message: '',
        duration:5000
      }
    },
    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
          this.$el.addEventListener('transitionend', this.destroyElement);
        }
      }
    },
    created(){
      
    },
    methods:{
      preventMove(){
        event.preventDefault();
        event.stopPropagation();
      },
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      close() {
        this.closed = true;
        this.$parent.$data.tipText = ''
        // if (typeof this.afterClose === 'function') {
          this.$emit('afterClose');
        // }
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
      }
    },
    mounted() {
      this.startTimer();
    }
  }

</script>

<style rel="stylesheet/css" lang="css" scoped>
  @import './toast.css'
</style>
