import axios from 'axios'



const api = axios.create({
    baseURL: '/api/auth',
})

export function loginUser(userData) {
    return api.post('/login', userData)



}

export function registerUser(userData) {
    return api.post('/register', userData)

}