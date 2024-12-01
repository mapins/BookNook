import Swal from 'sweetalert2'
import '@sweetalert2/theme-dark/dark.css'

export const alertService = {
  async confirmDelete() {
    const { value: confirmDelete } = await Swal.fire({
      title: '¿Estás seguro de que quieres eliminar tu cuenta?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar!',
      customClass: {
        popup: 'dark',
      },
    })

    return confirmDelete
  },

  showSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
    })
  },

  showError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    })
  },
}
