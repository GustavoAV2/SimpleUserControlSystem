import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logs: []
  },
  
  mutations: {
    setNewLog(state, email, active){
      const log = {
        'msg': 'User ' + email + ' had his status changed to ' + active, 
        'index': state.logs.length + 1
      }
      this.state.logs.push(log)
      console.log(state.logs)
    },
    clearLogs(){
      this.state.logs = Array()
    }
  },

  getters:{
    getUserLogs(){
      return this.state.logs
    }
  }
})
