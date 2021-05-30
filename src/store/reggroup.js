import firebase from 'firebase/app'

export default{
  actions: {

    async updatee({commit, dispatch},{groupname, predname, typeZan, monthname, pos, week ,id}){
      try{
        await firebase.database().ref(`/group/${groupname}`).child(id).update({groupname, predname, typeZan, monthname, pos, week});
       }catch(e){
         commit('setError', e)
         throw e
       }
    },
    async createGroup({commit, dispatch},{groupname, predname, typeZan, monthname, pos, week}){
      try{
       const group = await firebase.database().ref(`/group/${groupname}`).push({groupname, predname, typeZan, monthname, pos, week});
       return {groupname, predname, typeZan, monthname, pos, week, id:group.key}
      }catch(e){
        commit('setError', e)
        throw e
      }
    }
  }
}