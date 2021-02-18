import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logs: []
  },

  getters:{
    getLogs(state){
      return state.logs
    }
  },

  mutations: {
    setNewLog(state, log){
      state.logs.push(log)
    },

    clearLogs(state){
      state.logs = Array()
    }
  },

  actions:{
    setNewLog(context, payload){
      const log = {
        'msg': 'User ' + payload.email + ' had his status changed to ' + payload.active, 
        'status': payload.active ? 'success' : 'danger',
        'index': context.getters.getLogs.length + 1
      }
      if (context.getters.getLogs.length > 3){
        context.commit('clearLogs')
      }
      context.commit('setNewLog', log)
    }
  }
})
