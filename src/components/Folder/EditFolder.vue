<template>
    <v-dialog v-model="dialogdetail" persistent max-width="50%">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
                <v-card-title>
                <span class="headline">Editar Lista</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                          <v-text-field
                          label="Nome"
                          v-model="editedItem.name"
                          :rules="nameRules"
                          ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                          <v-textarea
                          label="Descrição"
                          v-model="editedItem.description"
                          :rules="descriptionRules"
                          ></v-textarea>
                      </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="toggleDialog()">Fechar</v-btn>
                <v-btn color="blue darken-1" :disabled="!valid" flat @click="update">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script>
import Folder from '@/services/Folder'

export default {
  props: ['dialogdetail', 'editedItem'],
  data () {
    return {
      valid: false,
      nameRules: [
        v => !!v || 'Nome da Lista é Obrigatório'
      ],
      descriptionRules: [
        v => !!v || 'Descrição é Obrigatório'
      ],
    }
  },
  methods: {
    toggleDialog () {
      this.$emit('close')
    },
    async update () {
      if (this.$refs.form.validate()) {
        try {
          await Folder.editFolder(this.editedItem._id, this.editedItem)
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
      this.editedItem.name = ''
      this.editedItem.description = ''
    }
  }
}
</script>

<style scoped>

</style>
