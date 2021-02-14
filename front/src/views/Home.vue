<template>
  <div class="home">

    <Navbar/>

    <nav class="navbar sticky-top navbar-dark bg-dark">
        <a class="navbar-brand">Admin manager</a>
        <button @click="logout()" class="btn btn-danger">Logout</button>
    </nav>

    <div id="nav">
      <a @click="setView('users')">Users</a> |
      <a @click="setView('logs')">Logs</a>
    </div>

    <br>
    <div class="container" v-if="view == 'users'">
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

      <div v-if="message.content" :class="message.type" role="alert">
        {{message.content}}
      </div>
    </div>

    <div v-else>
      <a @click="clearLogs()" v-if="logs.length" class="delete">Clear</a>
      <div v-for="log in logs" :key="log.index" class="alert alert-success msg" role="alert">
        {{log.msg}}
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Users from '../services/users'
import { mapMutations, mapState } from 'vuex'

export default {
  components:{Navbar},
  data(){
    return{
      view: 'users',
      users: Array(),
      message: {content:null, type:null}
    }
  },
  
  computed:{
    ...mapState({
      logs: state => state.logs
    }),
  },

  methods:{
    // Mapeia as mutations da Store
    ...mapMutations([
      'setNewLog',
      'clearLogs'
    ]),

    refresh(){
      Users.list(localStorage.token).then(response => {
        this.users = response.data
      }).
      catch(error => {
        console.log(error)
        this.message.content = "Couldn't find users!"
        this.message.type = "alert alert-danger"
      })
    },
    logout(){
      localStorage.clear()
      this.logged = false
      this.$router.push('/login')
    },
    changeState(user){
      this.setNewLog(user.email, !user.active)
      console.log(this.logs)
      const user_updated = {'active': !user.active}
      Users.update(user_updated, user.id, localStorage.token).then(() =>{
        this.refresh()
      })
    },
    setView(view){
      this.view = view
    }
  },

  created(){
    Users.list(localStorage.token).then(response => {
      this.users = response.data
    }).
    catch(error => {
      console.log(error)
      this.message.content = "Couldn't find users!"
      this.message.type = "alert alert-danger"
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
.bi:hover{
  color: #5fa8d3;
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
  height: 10%;
  text-align: center;
  margin: none;
  border: black 2px solid;
}
.msg{
  margin-bottom: 0%;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a:hover {
  color: #42b983;
  cursor: pointer;
}
</style>