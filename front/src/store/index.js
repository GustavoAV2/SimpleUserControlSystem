import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logs: []
  },
  
  mutations: {
    setNewLog(state, payload){
      const log = {
        'msg': 'User ' + payload.email + ' had his status changed to ' + payload.active, 
        'status': payload.active ? 'success' : 'danger',
        'index': state.logs.length + 1
      }
      if (state.logs.length > 3){
        state.logs = Array()
      }
      state.logs.push(log)
    },

    clearLogs(state){
      state.logs = Array()
    }
  },

  getters:{
    getUserLogs(state){
      return state.logs
    }
  }
})
