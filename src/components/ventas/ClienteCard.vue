<template>
    <div v-if="cliente"
        class="rounded-xl border border-gray-200 p-5 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03]">

        <div class="flex items-center justify-between">
            <h3 class="text-gray-800 font-semibold text-lg dark:text-white">
                Cliente seleccionado
            </h3>
            <Button size="sm" variant="primary" :startIcon="BoxIcon" @click="ventasStore.limpiarCliente()"> Cambiar
                cliente
            </Button>
        </div>

        <div v-if="ventasStore.cliente" class="mt-4 p-4 border rounded-lg shadow-sm  dark:text-white">
            <div class="flex items-center">
                <CircleUser color="black" :size="20" />
                <h3 class="font-bold text-lg ml-1">

                    {{ ventasStore.cliente.nombres }} {{ ventasStore.cliente.apellidos
                    }}
                </h3>
            </div>

            <div class="flex items-center mt-2">
                <FolderPen color="black" :size="15" />
                <p class="text-sm text-gray-600 ml-1  dark:text-white">{{ ventasStore.cliente.nombre_establecimiento }}
                </p>
            </div>
            <div class="flex items-center mt-2">
                <MapPinHouse color="black" :size="15" />
                <p class="text-xs text-gray-500 ml-1  dark:text-white">{{ ventasStore.cliente.direccion_establecimiento
                }}</p>
            </div>
            <div class="flex items-center">

                <p class="text-xs text-gray-500 ml-5  dark:text-white">{{ ventasStore.cliente.domiciliounion }}</p>
            </div>
            <div class="flex items-center mt-2">
                <PhoneCall color="black" :size="12" />
                <p class="text-xs  ml-1">Teléfono: {{ ventasStore.cliente.telefono }} / Celular: {{
                    ventasStore.cliente.celular }}</p>
            </div>
            <div class="flex items-center mt-2">
                <CircleDollarSign color="black" :size="12" />
                <p class="text-xs ml-1">Limite de Crédito: ${{ ventasStore.cliente.credito_limite }}</p>
            </div>

            <div class="flex items-center mt-2">
                <Landmark color="red" :size="12" />
                <p class="text-xs ml-1">Crédito Utilizado: ${{ ventasStore.creditoActual }}</p>
            </div>

            <div class="flex items-center mt-2">
                <CircleDollarSign color="green" :size="12" />
                <p class="text-xs ml-1">
                    Crédito Disponible: ${{ ventasStore.cliente.credito_limite - ventasStore.creditoActual }}
                </p>
            </div>
        </div>


    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useVentasStore } from '@/stores/ventas'
import Button from '../ui/Button.vue';
import { storeToRefs } from 'pinia'
import { CircleUser, PhoneCall, Landmark, MapPinHouse, FolderPen, CircleDollarSign } from 'lucide-vue-next';

const ventasStore = useVentasStore()
const { cliente } = storeToRefs(ventasStore)

onMounted(async () => {
    await ventasStore.inicializarCliente()
})
</script>
