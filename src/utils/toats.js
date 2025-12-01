import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3500,
  timerProgressBar: true,
})
