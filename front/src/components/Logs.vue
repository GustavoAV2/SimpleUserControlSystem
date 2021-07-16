<template>
  <div>
    <a @click="clearLogs()" class="delete">Clear</a>

    <transition v-for="log in getLogs" :key="log.index" name="slide" mode="out-in" appear>
        <div :class="`alert alert-${log.status}`" role="alert">
          {{log.msg}}
        </div>
    </transition>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    computed:{
        ...mapGetters(['getLogs']), // Mapeia os getters da Store
    },
    methods:{
        ...mapMutations(['clearLogs']),  // Mapeia as mutations da Store
        logout(){
            localStorage.clear()
            this.$router.push('/login')
        }
    },

    beforeDestroy(){
        this.clearLogs()
    }
}
</script>

<style scoped>
.alert{
  margin-bottom: 2px;
  margin-right: 220px;
  margin-left: 220px;
}
.delete{
  color: red;
  cursor: pointer;
  text-align: center;
  margin-top: 8px;
}

/* Animação */
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