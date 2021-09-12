import Vue from 'vue'
import Vuex from 'vuex'
import simulator from './modules/simulator';
import user from './modules/user';
import chapter from './modules/chapter';
import page from './modules/page';
import course from './modules/course';
import comments from "./modules/comments";
import notifications from './modules/notifications';
import theory from "./modules/theory";
import utility from "./modules/utility";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    comments,
    simulator,
    course,
    utility,
    user,
    page,
    chapter,
    notifications,
    theory
  }
})
