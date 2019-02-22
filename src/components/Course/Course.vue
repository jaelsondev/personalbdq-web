<template>
    <div>
        <v-container fluid>
        <v-layout row justify-center>
            <v-flex xs12 sm10>
                <v-alert
                dismissible
                color="error"
                icon="check_circle"
                outline
                :timeout="timeout"
                top
                v-model="alertError">
                {{ textError }}
                </v-alert>
                <v-alert
                dismissible
                icon="check_circle"
                outline
                color="success"
                :timeout="timeout"
                top
                v-model="alertSucess">
                {{ textSuccess }}
                </v-alert>
                <add-course :dialogdetail.sync="dialog" v-on:close = "close('adicionado')" v-on:sucess="alertSucess = true" v-on:error="alertError = true"></add-course>
                <v-btn
                    color="primary"
                    fab
                    fixed
                    right
                    bottom
                    @click="toggleDialog()"
                >
                    <v-icon>add</v-icon>
                </v-btn>
                <v-card>
                <v-card-title class="headline">
                    Cursos
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="courses"
                    hide-actions
                    class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.type | priceMask}}</td>
                    <td class="justify-center align-center layout px-0">
                        <div class="text-xs-center elevation-0">
                        <v-icon
                            medium
                            color="secondary"
                            @click="editItem(props.item)"
                        >
                            edit
                        </v-icon>
                        </div>
                        <div class="text-xs-center elevation-0">
                        <v-icon
                            medium
                            color="secondary"
                            @click="deletePlan(props.item.id)"
                        >
                            delete
                        </v-icon>
                        </div>
                    </td>
                    </template>
                    <template slot="no-data">
                    </template>
                </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
  </v-container>
    </div>
</template>

<script>
import AddCourse from './AddCourse'

export default {
    name: 'courses',
    components: {
        AddCourse
    },
    data(){
        return {
            alertSucess: false,
            alertError: false,
            timeout: 3000,
            textError: null,
            textSuccess: null,
            dialog: false,
            dialogEdit: false,
            editedItem: {},
            headers: [
            {
                text: 'Curso',
                align: 'left',
                sortable: false,
                value: 'name'
            },
            {
                text: 'Tipo',
                align: 'left',
                sortable: false,
                value: 'name'
            }
            ],
            courses: [],
        }
    },
    mounted () {
        this.alertError = false
        this.alertSucess = false
    },
    methods: {
        toggleDialog () {
            this.alertError = false
            this.alertSucess = false
            this.dialog = true
        },
        close (text) {
            this.textError = `Erro ao ${text} o curso.`
            this.textSuccess = `Curso ${text} com sucesso!`
            this.dialogEdit = false
            this.dialog = false
        }
    }
}
</script>

<style>

</style>
