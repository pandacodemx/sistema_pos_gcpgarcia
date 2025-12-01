<template>
    <admin-layout>


        <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">


            <!-- GRID PRINCIPAL -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">


                <!-- PANEL IZQUIERDO / CLIENTE -->
                <div class="lg:col-span-1 space-y-4">
                    <!-- Datos del Cliente -->
                    <div class="rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                        <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm">
                            Cliente
                        </h4>

                        <div class="space-y-3">
                            <BuscarCliente
                                class="w-full px-3 py-2 rounded-lg border dark:bg-gray-800 dark:text-white" />

                            <button class="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm">
                                Nuevo Cliente
                            </button>

                            <div v-if="clienteSeleccionado" class="text-sm mt-2">
                                <p class="font-medium text-gray-700 dark:text-gray-300">
                                    {{ clienteSeleccionado.nombre }}
                                </p>
                                <p class="text-gray-500 dark:text-gray-400">{{ clienteSeleccionado.telefono }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Totales / Resumen -->
                    <div class="rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                        <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm">
                            Resumen
                        </h4>

                        <div class="flex justify-between text-sm mb-1">
                            <span class="text-gray-600 dark:text-gray-400">Subtotal:</span>
                            <span class="font-medium text-gray-800 dark:text-gray-200">$0.00</span>
                        </div>

                        <div class="flex justify-between text-sm mb-1">
                            <span class="text-gray-600 dark:text-gray-400">IVA:</span>
                            <span class="font-medium text-gray-800 dark:text-gray-200">$0.00</span>
                        </div>

                        <div class="flex justify-between text-base font-semibold mt-2">
                            <span class="text-gray-700 dark:text-gray-300">Total:</span>
                            <span class="text-gray-900 dark:text-white">$0.00</span>
                        </div>
                        <button class="w-full mt-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium">
                            Limpiar Venta
                        </button>

                        <button
                            class="w-full mt-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium">
                            Generar Venta
                        </button>
                    </div>
                </div>

                <!-- PANEL DERECHO / PRODUCTOS -->
                <div class="lg:col-span-3 space-y-5">
                    <ClienteCard />

                    <!-- Buscador de productos -->
                    <div class="rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                        <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm">
                            Buscar Productos
                        </h4>

                        <input v-model="productoBusqueda" type="text"
                            placeholder="Buscar productos por nombre o código..."
                            class="w-full px-3 py-2 rounded-lg border dark:bg-gray-800 dark:text-white" />
                    </div>

                    <!-- Tabla de detalles -->
                    <div class="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                        <table class="w-full text-sm">
                            <thead class="bg-gray-100 dark:bg-white/5">
                                <tr>
                                    <th class="p-3 text-left">Producto</th>
                                    <th class="p-3 text-center">Cantidad</th>
                                    <th class="p-3 text-center">Precio</th>
                                    <th class="p-3 text-center">Importe</th>
                                    <th class="p-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Ejemplo de fila -->
                                <tr>
                                    <td class="p-3">Nombre del producto</td>
                                    <td class="p-3 text-center">1</td>
                                    <td class="p-3 text-center">$100.00</td>
                                    <td class="p-3 text-center">$100.00</td>
                                    <td class="p-3 text-center">
                                        <button class="text-red-500 hover:underline text-xs">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>

                                <tr v-if="false">
                                    <td colspan="5" class="p-4 text-center text-gray-500">
                                        No hay productos agregados
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>


    </admin-layout>
</template>


<script setup>
import BuscarCliente from '@/components/ventas/BuscarCliente.vue';
import ClienteCard from '@/components/ventas/ClienteCard.vue';
import ClientesService from '@/services/ApiClientesService';
import AdminLayout from '../../components/layout/AdminLayout.vue'
import { ref, onMounted } from 'vue'

const clientes = ref([]);
const loadingClientes = ref(false);

onMounted(async () => {
    loadingClientes.value = true;
    const { data } = await ClientesService.getClientes();
    clientes.value = data.data;
    loadingClientes.value = false;
});

// Cliente
const clienteBusqueda = ref('')
const clienteSeleccionado = ref(null)

// Productos
const productoBusqueda = ref('')
</script>
