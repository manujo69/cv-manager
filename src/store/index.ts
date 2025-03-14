import { createStore } from 'vuex'

import auth from './modules/auth'
import education from './modules/education'
import experience from './modules/experience'
import jobs from './modules/jobs'
import personal from './modules/personal'

export default createStore({
  modules: {
    auth,
    experience,
    education,
    jobs,
    personal,
  },
})
