<template>
  <div class="home">

    <nav class="navbar sticky-top navbar-dark bg-dark">
      <a class="navbar-brand">Admin manager</a>
      <button @click="logout()" class="btn btn-danger">Logout</button>
    </nav>

    <TableUsers/>

    <Logs/>
  </div>
</template>

<script>
import TableUsers from '@/components/TableUsers'
import Logs from '@/components/Logs'

export default {
  components:{TableUsers, Logs},
 
  methods:{
    logout(){
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.home{
  background-color: white;
  color: black;
}
.navbar-brand{
  color: #42B983;
}
</style>