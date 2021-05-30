import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  }, 
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    setGroup(state, group) {
      state.group = group
    },
    setGroups(state, groups) {
      state.groups = groups
    },
    clearInfo(state) {
      state.info = { }
    }
  },  
  actions:{
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .once('value')).val()
        commit('setInfo', info)

        const group = (await firebase
          .database()
          .ref(`/group/${localStorage.groupname}`)
          .once('value')).val()
        commit('setGroup', group)
        
        const groups = (await firebase
          .database()
          .ref(`/group/${localStorage.groupname}`)
          .once('value')).val()
        commit('setGroups', groups)

      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: s => s.info,
    group: s => s.group,
    groups: s => s.groups,
  },

}