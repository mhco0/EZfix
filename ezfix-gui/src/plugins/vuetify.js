import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@fortawesome/fontawesome-free/css/all.css";

import EzfixLogo from '@/assets/icons/EzfixLogo.vue'

Vue.use(Vuetify);

const MY_ICONS = {
  ezfix_logo:{component: EzfixLogo},
}

export default new Vuetify({
  icons: {
    iconfont: "fa",
    values: MY_ICONS,
  },
  theme: {
    themes: {
      light: {
        primary: "#2178B7",
      },
    },
  },
});
