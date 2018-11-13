/**
 * @author itzou
 * Date: 18/04/09
 */
import Dialog from './src/dialog.vue';

Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog);
};

export default Dialog;
