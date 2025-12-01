<template>
  <FullScreenLayout>
    <div class="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900">
        <div class="flex flex-col flex-1 w-full lg:w-1/2">
          <div class="w-full max-w-md pt-10 mx-auto">
            <a href="https://gcpgarcia.com/"
              class="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <svg class="stroke-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                fill="none">
                <path d="M12.7083 5L7.5 10.2083L12.7083 15.4167" stroke="" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              Regresar a la tienda</a>
          </div>
          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div class="mb-5 sm:mb-8">
                <h1 class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                  Iniciar Sesión
                </h1>
                <p class="text-sm text-gray-800 dark:text-gray-400 mb-1.5">
                  ¡Bienvenido! Un gusto verte de nuevo vendedor 💼
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Ingresa tus credenciales para acceder
                </p>
              </div>
              <div>
                <form @submit.prevent="onSubmit" class="mt-6 space-y-4">

                  <div>
                    <label class="block text-sm font-medium">Correo</label>
                    <input v-model="email" type="email" placeholder="Ingresa tu correo electrónico"
                      class="w-full px-4 py-3 text-sm border rounded-lg dark:bg-gray-800 dark:text-white"
                      @input="validateEmail" />

                    <p v-if="emailError" class="text-red-500 text-xs mt-1">
                      {{ emailError }}
                    </p>
                  </div>

                  <!-- Password -->
                  <div class="relative">
                    <label class="block text-sm font-medium">Contraseña</label>

                    <input :type="showPassword ? 'text' : 'password'" v-model="password"
                      placeholder="Ingresa tu contraseña"
                      class="w-full px-4 py-3 text-sm border rounded-lg dark:bg-gray-800 dark:text-white"
                      @input="validatePassword" />

                    <!-- Botón para mostrar / ocultar -->
                    <button type="button" class="absolute text-sm right-3 top-8 text-gray-500 hover:text-gray-700"
                      @click="showPassword = !showPassword">
                      <span v-if="showPassword">Ocultar</span>
                      <span v-else>Mostrar</span>
                    </button>

                    <p v-if="passwordError" class="text-red-500 text-xs mt-1">
                      {{ passwordError }}
                    </p>
                  </div>

                  <button
                    class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Iniciar Sesión
                  </button>


                </form>

                <div class="mt-5">
                  <p class="text-xs font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                    Problemas para iniciar sesión? Comunicate a soporte
                    <a href="https://wa.me/523531015780"
                      class="text-brand-500 hover:text-brand-700 dark:text-brand-400">📱 Contactar Ahora</a>
                  </p>



                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="relative items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div class="flex items-center justify-center z-1">
            <common-grid-shape />
            <div class="flex flex-col items-center max-w-xs">
              <router-link to="/" class="block mb-4">
                <img width="{231}" height="{48}" src="/images/logo/auth_logo.png" alt="Logo" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FullScreenLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommonGridShape from '@/components/common/CommonGridShape.vue'
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import { Toast } from '@/utils/toats.js'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const emailError = ref('')
const passwordError = ref('')
const loading = ref(false)
const errorMessage = ref('')

const auth = useAuthStore()
const router = useRouter()


const validateEmail = () => {
  if (!email.value) {
    emailError.value = 'El correo es obligatorio'
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    emailError.value = 'Formato de correo inválido'
  } else {
    emailError.value = ''
  }
}

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'La contraseña es obligatoria'
  } else {
    passwordError.value = ''
  }
}

const onSubmit = async () => {
  validateEmail()
  validatePassword()

  if (emailError.value || passwordError.value) {
    Toast.fire({
      icon: 'warning',
      title: 'Corrige los errores del formulario'
    })
    return
  }
  errorMessage.value = ''
  loading.value = true

  try {
    const success = await auth.login(email.value, password.value)

    if (success) {
      Toast.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso'
      })
      router.push('/')
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Credenciales incorrectas'
      })
      errorMessage.value = 'Credenciales incorrectas'
    }

  } catch (err: any) {
    Toast.fire({
      icon: 'error',
      title: 'Error al iniciar sesión'
    })
    errorMessage.value = err.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>
