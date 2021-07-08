export default function () {
    return {
        isLogged: localStorage.getItem('token'),
        user: {
            userName: '',
            email: '',
            avatar: '',
            password: ''
        },
        formErrors: '',
    }
  }