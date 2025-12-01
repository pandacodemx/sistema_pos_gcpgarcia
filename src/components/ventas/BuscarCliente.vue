<template>
    <div class="relative">
        <input type="text" v-model="search" @input="onSearch"
            placeholder="Buscar cliente nombre ,apellido o establecimiento"
            class="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-blue-500" />

        <div v-if="showResults"
            class="absolute z-50 mt-1 w-full rounded-xl border bg-white shadow-lg max-h-60 overflow-y-auto">
            <div v-if="loading" class="p-3 text-gray-500 text-sm">
                Buscando...
            </div>

            <div v-for="cliente in results" :key="cliente.idpersona" class="cursor-pointer p-3 hover:bg-gray-100"
                @click="select(cliente)">
                <p class="font-medium text-gray-800 text-sm" v-html="highlight(cliente.nombre)"></p>


                <p class="text-sm text-gray-500">
                    {{ cliente.nombre_establecimiento }}
                </p>
                <p class="text-xs text-gray-500">
                    {{ cliente.domiciliounion }}
                </p>
            </div>


            <div v-if="results.length === 0 && !loading" class="p-3 text-gray-500 text-sm">
                No se encontraron clientes
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVentasStore } from '@/stores/ventas'

const ventasStore = useVentasStore()

const search = ref('')
const results = ref([])
const showResults = ref(false)
const loading = ref(false)

let timeout = null

const highlight = (text) => {
    const term = search.value.trim()
    if (!term) return text
    const regex = new RegExp(`(${term})`, 'gi')
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>')
}

const onSearch = () => {
    clearTimeout(timeout)

    if (search.value.length < 2) {
        results.value = []
        showResults.value = false
        return
    }

    timeout = setTimeout(async () => {
        loading.value = true
        const data = await ventasStore.buscarClientes(search.value)
        results.value = data
        loading.value = false
        showResults.value = true
    }, 350)
}

const select = async (cliente) => {
    await ventasStore.seleccionarCliente(cliente.idpersona)
    showResults.value = false
    search.value = `${cliente.nombre}`
}

</script>
