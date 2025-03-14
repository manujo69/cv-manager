import type { Commit } from 'vuex'
import type { User } from '../../models'

interface AuthState {
  user: User | null
}

export default {
  namespaced: true,
  state: (): AuthState => ({
    user: null,
  }),
  getters: {
    getUser: (state: AuthState) => state.user,
    isAuthenticated: (state: AuthState) => state.user !== null,
  },
  mutations: {
    setUser(state: AuthState, user: User | null) {
      state.user = user
    },
  },
  actions: {
    login({ commit }: { commit: Commit }, userData: { email: string; password: string }) {
      return new Promise<User>((resolve) => {
        // Simulate API call
        setTimeout(() => {
          const user: User = {
            id: 1,
            name: 'Usuario Demo',
            email: userData.email,
          }

          localStorage.setItem('user', JSON.stringify(user))
          commit('setUser', user)
          resolve(user)
        }, 1000)
      })
    },
    logout({ commit }: { commit: Commit }) {
      localStorage.removeItem('user')
      commit('setUser', null)
    },
    checkAuth({ commit }: { commit: Commit }) {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        commit('setUser', JSON.parse(userStr))
      }
    },
  },
}
