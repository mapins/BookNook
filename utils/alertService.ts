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
    })

    return confirmDelete
  },
  async successLogin() {
    const { value: successLogin } = await Swal.fire({
      title: 'Te has logeado correctamente!',
      icon: 'success',
    })

    return successLogin
  },
  async successSaveStatus() {
    const { value: successSaveStatus } = await Swal.fire({
      title: 'El estado del libro se ha guardado correctamente!',
      icon: 'success',
    })

    return successSaveStatus
  },
  async successRemoveStatus() {
    const { value: successRemoveStatus } = await Swal.fire({
      title: 'El estado del libro se ha eliminado correctamente!',
      icon: 'success',
    })

    return successRemoveStatus
  },

  async successSaveRating() {
    const { value: successSaveRating } = await Swal.fire({
      title: 'La valoración del libro se ha guardado correctamente!',
      icon: 'success',
    })

    return successSaveRating
  },
  async successRemoveRating() {
    const { value: successRemoveRating } = await Swal.fire({
      title: 'La valoración del libro se ha eliminado correctamente!',
      icon: 'success',
    })

    return successRemoveRating
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
