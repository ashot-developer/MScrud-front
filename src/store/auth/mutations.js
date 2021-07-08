export function login(state, payload){
    state.isLogged = payload
    state.user = payload
}

export function logout(state, payload){
    localStorage.removeItem('token');
    state.isLogged = false
    state.user= []
    state.formErrors = ''
}

export function addErrorMessage(state, payload){
    state.formErrors = payload;
}

export function setUser(state, payload) {
    state.user = payload
    state.isLogged = localStorage.getItem('token')
    state.formErrors = ''
}

export function reset(state, payload) {
    console.log(payload);
    state.user = payload;

}