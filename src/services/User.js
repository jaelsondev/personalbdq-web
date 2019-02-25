import Api from './Api'

export default {
  list (params) {
    return Api().get('/users', {params})
  },
  createUser (user) {
    return Api().post('/users', user)
  },
  editUser (id, user) {
    return Api().put(`/users/${id}`, user)
  },
  deleteUser (id) {
    return Api().delete(`/users/${id}`)
  }
}