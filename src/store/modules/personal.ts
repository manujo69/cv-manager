import type { Commit } from 'vuex'
import type { PersonalInfo } from '../../models'

interface PersonalState {
  personalInfo: PersonalInfo | null
}

export default {
  namespaced: true,
  state: (): PersonalState => ({
    personalInfo: null,
  }),
  getters: {
    getPersonalInfo: (state: PersonalState) => state.personalInfo,
  },
  mutations: {
    setPersonalInfo(state: PersonalState, info: PersonalInfo) {
      state.personalInfo = info
    },
  },
  actions: {
    loadPersonalInfo({ commit }: { commit: Commit }) {
      // In a real app, this would be an API call
      const savedInfo = localStorage.getItem('personalInfo')
      if (savedInfo) {
        commit('setPersonalInfo', JSON.parse(savedInfo))
      }
    },
    savePersonalInfo({ commit }: { commit: Commit }, info: PersonalInfo) {
      // In a real app, this would be an API call
      localStorage.setItem('personalInfo', JSON.stringify(info))
      commit('setPersonalInfo', info)
    },
  },
}
