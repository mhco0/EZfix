import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@fortawesome/fontawesome-free/css/all.css";

import EzfixLogo from '@/assets/icons/EzfixLogo.vue'
import HouseClean from '@/assets/icons/HouseClean.vue'
import Plumbing from '@/assets/icons/Plumbing.vue'

Vue.use(Vuetify);

const MY_ICONS = {
  ezfix_logo: { component: EzfixLogo },
  houseCleanIcon: { component: HouseClean },
  plumbing: { component: Plumbing }
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
