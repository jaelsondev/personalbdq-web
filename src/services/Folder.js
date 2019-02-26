import Api from './Api'

export default {
  list (params) {
    return Api().get('/folders', {params})
  },
  createFolder (folder) {
    return Api().post('/folders', folder)
  },
  editFolder (id, folder) {
    return Api().put(`/folders/${id}`, folder)
  },
  deleteFolder (id) {
    return Api().delete(`/folders/${id}`)
  }
}