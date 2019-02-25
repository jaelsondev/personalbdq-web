<template>
    <v-dialog v-model="dialogdetail" persistent max-width="50%">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
                <v-card-title>
                <span class="headline">Adicionar Usuário</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field
                        type="number"
                        label="Matrícula"
                        v-model="user.registration"
                        :rules="registrationRules"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        label="Nome"
                        v-model="user.name"
                        :rules="nameRules"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        type="email"
                        label="Email"
                        v-model="user.email"
                        :rules="emailRules"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        :type="show1 ? 'text' : 'password'"
                        label="Senha"
                        :append-icon="show1 ? 'visibility_off' : 'visibility'"
                        @click:append="show1 = !show1"
                        counter
                        v-model="user.password"
                        :rules="passwordRules"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-select
                        label="Curso"
                        :items="courses"
                        v-model="course"
                        :rules="courseRules"
                        item-text="name"
                        :return-object="true"
                        append-icon="add"
                        @click:append="addCourse"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12>
                        <v-list>
                            <v-subheader>
                              Cursos
                            </v-subheader>
                            <v-list-tile
                            v-for="(course,index) in this.user.courses"
                            :key="index"
                            >
                              <v-list-tile-content>
                                {{course.name}}
                              </v-list-tile-content>
                              <v-list-tile-action>
                                <v-btn
                                flat
                                icon
                                color="red"
                                @click.prevent="removeCourse(index)">
                                  <v-icon>remove</v-icon>
                                </v-btn>
                              </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                      </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="toggleDialog()">Fechar</v-btn>
                <v-btn color="blue darken-1" :disabled="!valid" flat @click="add">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script>
import Course from '@/services/Course'
import User from '@/services/User'

export default {
  props: ['dialogdetail'],
  data () {
    return {
      valid: false,
      show1: false,
      user: {
        registration: '',
        name: '',
        email: '',
        password: '',
        courses: []
      },
      course: '',
      courses: [],
      registrationRules: [
        v => !!v || 'Matrícula do usuário é Obrigatório'
      ],
      nameRules: [
        v => !!v || 'Nome do usuário é Obrigatório'
      ],
      emailRules: [
        v => !!v || 'Email do usuário é Obrigatório',
        v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Email inválido.'
        }
      ],
      passwordRules: [
        v => !!v || 'Senha do usuário é Obrigatório',
        v => (this.user.password && this.user.password.length > 5 && this.user.password.length <= 10) || 'O senha deve conter entre 6 e 10 caracteres'
      ],
      courseRules: [
        v => this.user.courses.length > 0 || 'Curso do usuário é Obrigatório'
      ],
    }
  },
  created () {
    this.getCourses()
  },
  methods: {
    toggleDialog () {
      this.$emit('close')
    },
    async add () {
      if (this.$refs.form.validate()) {
        try {
          await User.createUser(this.user)
          this.$refs.form.reset()
          this.clearFields()
          this.toggleDialog()
          this.$emit('sucess')
        } catch (err) {
          this.toggleDialog()
          this.$emit('error')
          throw err
        }
      }
    },
    clearFields () {
      this.user.registration = ''
      this.user.name = ''
      this.user.email = ''
      this.user.senha = ''
      this.user.courses = ''
    },
    async getCourses () {
      const response = await Course.list()
      this.courses = response.data
    },
    addCourse () {
      if (this.course) {
        this.user.courses = [...new Set([...this.user.courses, this.course])]
        this.course = ''
      }
    },
    removeCourse (index) {
      this.user.courses.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
