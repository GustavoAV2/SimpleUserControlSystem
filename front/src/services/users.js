import {http} from '../services/config'

export default{
    login(user){
        return http.post('/users/login', user)
    },
    create(user){
        return http.post('/users', user)
    },
    list(token){
        return http.get('/users', {headers: {"Autorizathion": "Bearer "+ token}} )
    },
    update(user, id, token){
        return http.put('/users/' + id, user, {headers: {"Autorizathion": "Bearer "+ token}} )
    }
}