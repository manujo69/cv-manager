import type { Commit } from 'vuex'
import type { Education } from '../../models'

interface EducationState {
  educations: Education[]
}

export default {
  namespaced: true,
  state: (): EducationState => ({
    educations: [],
  }),
  getters: {
    getEducations: (state: EducationState) => state.educations,
  },
  mutations: {
    setEducations(state: EducationState, educations: Education[]) {
      state.educations = educations
    },
    addEducation(state: EducationState, education: Education) {
      state.educations.push(education)
    },
    updateEducation(state: EducationState, updatedEducation: Education) {
      const index = state.educations.findIndex((edu) => edu.id === updatedEducation.id)
      if (index !== -1) {
        state.educations[index] = updatedEducation
      }
    },
    deleteEducation(state: EducationState, id: number) {
      state.educations = state.educations.filter((edu) => edu.id !== id)
    },
  },
  actions: {
    loadEducations({ commit }: { commit: Commit }) {
      const savedEducations = localStorage.getItem('educations')
      if (savedEducations) {
        commit('setEducations', JSON.parse(savedEducations))
      }
    },
    saveEducation(
      { commit, state }: { commit: Commit; state: EducationState },
      education: Education,
    ) {
      let newEducation = education

      // If it's a new education, generate an ID
      if (!education.id) {
        const maxId = state.educations.reduce((max, edu) => Math.max(max, edu.id), 0)
        newEducation = { ...education, id: maxId + 1 }
        commit('addEducation', newEducation)
      } else {
        commit('updateEducation', newEducation)
      }

      // Save to localStorage
      localStorage.setItem('educations', JSON.stringify(state.educations))
      return newEducation
    },
    removeEducation({ commit, state }: { commit: Commit; state: EducationState }, id: number) {
      commit('deleteEducation', id)
      localStorage.setItem('educations', JSON.stringify(state.educations))
    },
  },
}
