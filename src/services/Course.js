import Api from './Api'

export default {
  list (params) {
    return Api().get('/courses', {params})
  },
  createCourse (course) {
    return Api().post('/courses', course)
  },
  editCourse (id, course) {
    return Api().put(`/courses/${id}`, course)
  },
  deleteCourse (id) {
    return Api().delete(`/courses/${id}`)
  }
}