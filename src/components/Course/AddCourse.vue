<template>
    <v-dialog v-model="dialogdetail" persistent max-width="50%">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
                <v-card-title>
                <span class="headline">Adicionar Curso</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                          <v-text-field
                          label="Curso"
                          v-model="course.name"
                          :rules="nameRules"
                          ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-select
                        label="Tipo"
                        :items="items"
                        v-model="course.type"
                        :rules="typeRules"
                        ></v-select>
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

export default {
  props: ['dialogdetail'],
  data () {
    return {
      valid: false,
      course: {
        name: '',
        type: ''
      },
      nameRules: [
        v => !!v || 'Nome do Curso é Obrigatório'
      ],
      typeRules: [
        v => !!v || 'Tipo do Curso é Obrigatório'
      ],
      items: [
        'Bacharel', 'Licenciatura', 'Tecnólogo'
      ]
    }
  },
  methods: {
    toggleDialog () {
      this.$emit('close')
    },
    async add () {
      if (this.$refs.form.validate()) {
        try {
          await Course.createCourse(this.course)
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
      this.course.name = ''
      this.course.type = ''
    }
  }
}
</script>

<style scoped>

</style>
