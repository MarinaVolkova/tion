import firebase from 'firebase/app'
import { register } from 'register-service-worker'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}){
      try{
        await firebase.auth().signInWithEmailAndPassword(email, password)
      }catch(e){
        throw e
      }
    },
    async register({dispatch, commit},{email,password,resultstatus}){
      try{
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          status: resultstatus
        })
      }catch(e){
        throw e
      }
    }, 
    getUid(){
      const user = firebase.auth().currentUser 
      return user ? user.uid : null
    },
    async logout({commit}) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  }
}