import type { Commit } from 'vuex'
import type { Experience } from '../../models'

interface ExperienceState {
  experiences: Experience[]
}

export default {
  namespaced: true,
  state: (): ExperienceState => ({
    experiences: [],
  }),
  getters: {
    getExperiences: (state: ExperienceState) => state.experiences,
  },
  mutations: {
    setExperiences(state: ExperienceState, experiences: Experience[]) {
      state.experiences = experiences
    },
    addExperience(state: ExperienceState, experience: Experience) {
      state.experiences.push(experience)
    },
    updateExperience(state: ExperienceState, updatedExperience: Experience) {
      const index = state.experiences.findIndex((exp) => exp.id === updatedExperience.id)
      if (index !== -1) {
        state.experiences[index] = updatedExperience
      }
    },
    deleteExperience(state: ExperienceState, id: number) {
      state.experiences = state.experiences.filter((exp) => exp.id !== id)
    },
  },
  actions: {
    loadExperiences({ commit }: { commit: Commit }) {
      const savedExperiences = localStorage.getItem('experiences')
      if (savedExperiences) {
        commit('setExperiences', JSON.parse(savedExperiences))
      }
    },
    saveExperience(
      { commit, state }: { commit: Commit; state: ExperienceState },
      experience: Experience,
    ) {
      let newExperience = experience
      debugger

      // If it's a new experience, generate an ID
      if (!experience.id) {
        const maxId = state.experiences.reduce(
          (max: number, exp: Experience) => Math.max(max, exp.id),
          0,
        )
        newExperience = { ...experience, id: maxId + 1 }
        commit('addExperience', newExperience)
      } else {
        commit('updateExperience', newExperience)
      }

      // Save to localStorage
      localStorage.setItem('experiences', JSON.stringify(state.experiences))
      return newExperience
    },
    removeExperience({ commit, state }: { commit: Commit; state: ExperienceState }, id: number) {
      commit('deleteExperience', id)
      localStorage.setItem('experiences', JSON.stringify(state.experiences))
    },
  },
}
