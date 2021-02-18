<template>
  <div class="home">
    <nav class="navbar sticky-top navbar-dark bg-dark">
        <a class="navbar-brand">Admin manager</a>
        <button @click="logout()" class="btn btn-danger">Logout</button>
    </nav>

    <br>
    <div class="container">
      <table class="table">
        <thead class="thead-dark">
          <tr>
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
            <td>{{user.id}}</td>
            <td>{{user.email}}</td>
            <td>{{user.active}}</td>
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

    <a @click="clearLogs()" class="delete">Clear</a>
    
    <transition v-for="log in getUserLogs" :key="log.index" name="slide" mode="out-in" appear>
        <div :class="`alert alert-${log.status}`" role="alert">
          {{log.msg}}
        </div>
        <div v-if="message.content" :class="message.type" role="alert">
          {{message.content}}
        </div>
    </transition>

  </div>
</template>

<script>
import Users from '../services/users'
import { mapMutations, mapGetters } from 'vuex'
import alertMixin from '@/services/alertMixin'

export default {
  mixins:[alertMixin],
  data(){
    return{
      view: 'users',
      users: Array(),
    }
  },

  methods:{
    ...mapMutations(['setNewLog', 'clearLogs']),  // Mapeia as mutations da Store

    refresh(){
      Users.list().then(response => {
        this.users = response.data
      }).
      catch(() => {
        this.generateMessage("Couldn't find users!", "alert alert-danger")
      })
    },

    logout(){
      localStorage.clear()
      this.logged = false
      this.$router.push('/login')
    },

    changeState(user){
      this.setNewLog({'email': user.email,'active': !user.active})
      const user_updated = {'active': !user.active}
      Users.update(user_updated, user.id).then(() =>{
        this.refresh()
      })
    },
  },

  computed:{
    ...mapGetters(['getUserLogs']), // Mapeia os getters da Store
  },

  created(){
    Users.list().then(response => {
      this.users = response.data
    }).
    catch(() => {
      this.generateMessage("Couldn't find users!", "alert alert-danger")
    })
  }
}
</script>

<style scoped>
.home{
  background-color: white;
  color: black;
}
.delete{
  color: red;
  cursor: pointer;
  text-align: center;
  margin-top: 8px;
}
.bi{
  color: white;
  cursor: pointer;
}
.active{
  color: green;
  cursor: pointer;
  text-align: center;
  margin-top: 8px;
}
.navbar-brand{
  color: #42B983;
}
.table{
  text-align: center;
  margin: none;
  width: 100%; 
  height: 300px;
  border: black 2px solid;
}
.alert{
  margin-bottom: 2px;
  margin-right: 220px;
  margin-left: 220px;
}
/* Animação */
.bi:hover{
  color: #5fa8d3;
  cursor: pointer;
}
@keyframes slide-in{
  from { transform:  translateY(40px);}
  to { transform:  translateY(0);}
}
@keyframes slide-out{
  from { transform:  translateY(0);}
  to { transform:  translateY(40px);}
} 
.slide-enter-active{
  animation: slide-in 2s ease;
  transition: opacity 2s;
}
.slide-leave-active{
  animation: slide-out 2s ease;
  transition: opacity 2s;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
}
</style>