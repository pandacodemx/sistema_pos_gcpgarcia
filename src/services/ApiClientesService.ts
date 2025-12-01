import api from '@/services/api'

export default {
  getClientes() {
    return api.get('/ApiClientes/getClientes')
  },

  buscarClientes(term: string) {
    return api.get(`/ApiClientes/buscarCliente?term=${encodeURIComponent(term)}`)
  },

  getClienteById(idCliente: number) {
    return api.get(`/ApiClientes/getCliente/${idCliente}`)
  },

  async getCreditoActual(id: number) {
    return await api.get(`/ApiClientes/getCreditoActual/${id}`)
  },
}
