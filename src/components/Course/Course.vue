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
                <edit-course :dialogdetail.sync="dialogEdit" :editedItem.sync="editedItem" v-on:close="close('alterado')" v-on:sucess="alertSucess = true" v-on:error="alertError = true"></edit-course>
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
                    <td>{{ props.item.type }}</td>
                    <td class="justify-center align-center layout px-0">
                        <div class="text-xs-center elevation-0">
                        <v-icon
                            dark
                            color="primary"
                            @click="editItem(props.item)"
                        >
                            edit
                        </v-icon>
                        </div>
                        <div class="text-xs-center elevation-0">
                        <v-icon
                            dark
                            color="red"
                            @click="deleteCourse(props.item._id)"
                        >
                            delete
                        </v-icon>
                        </div>
                    </td>
                    </template>
                    <template slot="no-data">
                        <v-loading :show="showLoading" msg="Não há cursos cadastrados"/>
                    </template>
                </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
  </v-container>
    </div>
</template>

<script>
import Course from '@/services/Course'
import AddCourse from './AddCourse'
import EditCourse from './EditCourse'

export default {
    name: 'courses',
    components: {
        AddCourse, EditCourse
    },
    data(){
        return {
            alertSucess: false,
            alertError: false,
            loadingData: null,
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
            },
            {
                text: 'Ações',
                align: 'center',
                sortable: false,
                value: 'name'
            }
            ],
            courses: [],
            showLoading: 'loading'
        }
    },
    mounted () {
        this.alertError = false
        this.alertSucess = false
    },
    created () {
        this.getCourses()
        if(this.courses.length === 0){
            this.showLoading = 'msg'
        }
    },
    methods: {
        editItem (item) {
            this.alertError = false
            this.alertSucess = false
            this.editedItem = Object.assign({}, item)
            this.dialogEdit = true
        },
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
            this.getCourses()
        },
        async getCourses () {
            const response = await Course.list()
            this.courses = response.data
        },
        async deleteCourse (id) {
            const response = await Course.deleteCourse(id)
            console.log(response.data)
            if (response.length > 0) {
                this.textSuccess = `Curso excluido com sucesso!`
                this.alertError = false
                this.alertSucess = true
                this.getCourses()
            } else {
                this.textError = `Erro ao excluir o curso..`
                this.alertError = true
                this.alertSucess = false
                this.getCourses()
            }
        }
    },

}
</script>

<style>

</style>
