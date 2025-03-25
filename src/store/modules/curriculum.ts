import type { Commit } from 'vuex'
import type { CVdata, Experience } from '../../models'

interface CurriculumState {
  cvs: CVdata[]
}

export default {
  namespaced: true,
  state: (): CurriculumState => ({
    cvs: [],
  }),
  getters: {
    getCvs: (state: CurriculumState) => state.cvs,
    getCvById: (state: CurriculumState) => (id: number) => {
      return state.cvs.find((cv) => cv.id === id)
    },
    getCvsByJobId: (state: CurriculumState) => (jobId: number) => {
      return state.cvs.filter((cv) => cv.jobID === jobId)
    },
  },
  mutations: {
    setCvs(state: CurriculumState, cvs: CVdata[]) {
      state.cvs = cvs
    },
    addCv(state: CurriculumState, cv: CVdata) {
      state.cvs.push(cv)
    },
    updateCv(state: CurriculumState, updatedCv: CVdata) {
      const index = state.cvs.findIndex((cv) => cv.id === updatedCv.id)
      if (index !== -1) {
        state.cvs[index] = updatedCv
      }
    },
    deleteCv(state: CurriculumState, id: number) {
      state.cvs = state.cvs.filter((cv) => cv.id !== id)
    },
  },
  actions: {
    loadCvs({ commit }: { commit: Commit }) {
      const savedCvs = localStorage.getItem('cvs')
      if (savedCvs) {
        commit('setCvs', JSON.parse(savedCvs))
      } else {
        commit('setCvs', [])
      }
    },
    saveCv({ commit, state }: { commit: Commit; state: CurriculumState }, cv: CVdata) {
      let newCv = cv
      if (!cv.id) {
        const maxId = state.cvs.reduce((max: number, cv: CVdata) => Math.max(max, cv.id), 0)
        newCv = { ...cv, id: maxId + 1 }
        commit('addCv', newCv)
      } else {
        commit('updateCv', newCv)
      }
      localStorage.setItem('cvs', JSON.stringify(state.cvs))
      return newCv
    },
    removeCv({ commit, state }: { commit: Commit; state: CurriculumState }, id: number) {
      commit('deleteCv', id)
      localStorage.setItem('cvs', JSON.stringify(state.cvs))
    },
    updateExperienceInCv(
      { commit, state }: { commit: Commit; state: CurriculumState },
      payload: { cvId: number; updatedExperience: Experience },
    ) {
      const { cvId, updatedExperience } = payload
      const cvIndex = state.cvs.findIndex((cv) => cv.id === cvId)
      if (cvIndex !== -1) {
        const experienceIndex = state.cvs[cvIndex].experienceIDS.findIndex(
          (exp) => exp.id === updatedExperience.id,
        )
        if (experienceIndex !== -1) {
          state.cvs[cvIndex].experienceIDS[experienceIndex].selected = true
          commit('updateCv', state.cvs[cvIndex])
          localStorage.setItem('cvs', JSON.stringify(state.cvs))
        }
      }
    },
    addExperienceInCv(
      { commit, state }: { commit: Commit; state: CurriculumState },
      payload: { cvId: number; newExperience: Experience },
    ) {
      const { cvId, newExperience } = payload
      const cvIndex = state.cvs.findIndex((cv) => cv.id === cvId)
      if (cvIndex !== -1) {
        state.cvs[cvIndex].experienceIDS.push({ id: newExperience.id, selected: true })
        commit('updateCv', state.cvs[cvIndex])
        localStorage.setItem('cvs', JSON.stringify(state.cvs))
      }
    },
    removeExperienceInCv(
      { commit, state }: { commit: Commit; state: CurriculumState },
      payload: { cvId: number; experienceId: number },
    ) {
      const { cvId, experienceId } = payload
      const cvIndex = state.cvs.findIndex((cv) => cv.id === cvId)
      if (cvIndex !== -1) {
        state.cvs[cvIndex].experienceIDS = state.cvs[cvIndex].experienceIDS.filter(
          (exp) => exp.id !== experienceId,
        )
        commit('updateCv', state.cvs[cvIndex])
        localStorage.setItem('cvs', JSON.stringify(state.cvs))
      }
    },
  },
}
