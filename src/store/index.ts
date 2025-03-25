import { createStore } from 'vuex'

import auth from './modules/auth'
import education from './modules/education'
import experience from './modules/experience'
import job from './modules/jobs'
import personal from './modules/personal'
import curriculum from './modules/curriculum'

export default createStore({
  modules: {
    auth,
    experience,
    education,
    job,
    personal,
    curriculum,
  },
})
