<template>
    <div class="navbar-comp">
      <div id="nav">
          <!-- Direciona a rota da pagina -->
          <router-link to="/login">Login</router-link> |
          <router-link to="/register">Register</router-link>
      </div>
    </div>
</template>

<style scoped>
.navbar-comp{
  display: inline;
  margin: 0%;
  padding: 0%;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>