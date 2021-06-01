import firebase from 'firebase/app'

export default {
  state: {
    info: {},
    group: {},

  }, 
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    setGroup(state, group) {
      state.group = group
    },

    clearInfo(state) {
      state.info = { }
    },
    clearGroup(state) {
      state.group = { }
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

      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: s => s.info,
    group: s => s.group,

  },
  
}