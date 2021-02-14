import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        'Authorization': {
            toString() {
                return `Bearer ${localStorage.getItem('token')}`
            }
        }
    }
})
