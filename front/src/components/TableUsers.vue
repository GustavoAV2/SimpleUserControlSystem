<template>
  <div class="container">

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Deleted</th>
          <th scope="col">ID</th>
          <th scope="col">Email</th>
          <th scope="col">Active</th>
          <th>
            <svg @click="refresh()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td><button class="btn btn-danger" @click="deleteUser(user.id)">Delete</button></td>
          <td>{{user.id}}</td>
          <td>{{user.email}}</td>
          <td>{{user.active | active}}</td> <!-- Usando filtro  -->
          
          <div v-if="user.active" class="delete">
            <a @click="changeState(user)" class="delete">Deactivate</a>
          </div>
          <div v-else class="active">
            <a @click="changeState(user)" class="active">Activate</a>
          </div>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import Users from '@/services/users'
import { mapActions } from 'vuex'

export default {    
  // Definindo filtro
  filters:{
    active(value){
      return value ? 'True' : 'False'
    }
  },

  data(){
    return{
      users: Array(),
    }
  },

  methods:{
    ...mapActions(['setNewLog']), // Mapeia as actions da Store

    refresh(){
      Users.list().then(response => {
        this.users = response.data
      })
    },
    
    changeState(user){
      Users.update({'active': !user.active}, user.id).then(() =>{
        const msg = `User ${user.email} had his status changed to ${!user.active}!`
        this.setNewLog({'email': user.email,'active': !user.active, 'msg':msg})
        this.refresh()
      })
    },

    deleteUser(user_id){
      Users.delete(user_id).then(user =>{
        const msg = `The user ${user.data.email} has been deleted!`
        this.setNewLog({'email': user.email,'active': false, 'msg': msg})
        this.refresh()
      })
    }
  },

  created(){
    Users.list().then(response => {
      this.users = response.data
    })
  }
}
</script>

<style scoped>
.table{
  text-align: center;
  margin: none;
  margin-top: 5px;
  width: 100%; 
  border: black 2px solid;
}
.delete{
  color: red;
  cursor: pointer;
  text-align: center;
  margin-top: 8px;
}
.active{
  color: green;
  cursor: pointer;
  text-align: center;
  margin-top: 8px;
}
.btn-danger{
  padding: 5px;
  font-size: 12px;
}
.bi{
  color: white;
  cursor: pointer;
}

/* Animação */
.bi:hover{
  color: #5fa8d3;
  cursor: pointer;
}
</style>