import {http} from '../services/config'

export default{
    login(user){
        return http.post('/users/login', user)
    },
    create(user){
        return http.post('/users', user)
    },
    list(){
        return http.get('/users')
    },
    update(user, id){
        return http.put('/users/' + id, user)
    },
    delete(id){
        return http.delete('/users/delete/' + id)
    }
}