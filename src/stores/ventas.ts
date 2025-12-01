import { defineStore } from 'pinia'
import ApiClientesService from '@/services/ApiClientesService'

export const useVentasStore = defineStore('ventas', {
  state: () => ({
    cliente: JSON.parse(localStorage.getItem('cliente')) || null,
    creditoActual: 0,
  }),

  actions: {
    async buscarClientes(term: string) {
      if (!term || term.length < 2) return []
      const { data } = await ApiClientesService.buscarClientes(term)
      return data.data || []
    },

    async seleccionarCliente(idpersona: number) {
      const { data } = await ApiClientesService.getClienteById(idpersona)
      this.cliente = data.data
      localStorage.setItem('cliente', JSON.stringify(this.cliente))

      await this.cargarCreditoActual(idpersona)
    },

    async cargarCreditoActual(idpersona?: number) {
      const personId = idpersona || this.cliente?.idpersona
      if (!personId) return
      const { data } = await ApiClientesService.getCreditoActual(personId)
      this.creditoActual = data.credito || 0
    },

    inicializarCliente: async function () {
      if (this.cliente) {
        await this.cargarCreditoActual(this.cliente.idpersona)
      }
    },

    limpiarCliente() {
      this.cliente = null
      this.creditoActual = 0
      localStorage.removeItem('cliente')
    },
  },
})
