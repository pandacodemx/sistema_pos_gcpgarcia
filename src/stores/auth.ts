import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    isAuthenticated: false,
    token: localStorage.getItem('tokenVue') || null,
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)

        const { data } = await api.post('/ApiAuth/Login', formData)

        if (data.status) {
          this.isAuthenticated = true
          this.user = { ...data.user, avatar: data.user.avatar || '/images/user/icon_user.png' }
          this.token = data.token

          localStorage.setItem('tokenVue', data.token)
          localStorage.setItem('auth', JSON.stringify(this.$state))

          return true
        } else {
          return false
        }
      } catch (error) {
        console.error('Error en login:', error)
        return false
      }
    },

    loadFromStorage() {
      const saved = localStorage.getItem('auth')
      if (saved) {
        const parsed = JSON.parse(saved)
        this.user = parsed.user
        this.isAuthenticated = parsed.isAuthenticated
        this.token = parsed.token
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      this.token = null

      localStorage.removeItem('auth')
      localStorage.removeItem('tokenVue')
    },
  },
})
