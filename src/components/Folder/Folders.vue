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
                <add-folder :dialogdetail.sync="dialog" v-on:close = "close('adicionado')" v-on:sucess="alertSucess = true" v-on:error="alertError = true"></add-folder>
                <edit-folder :dialogdetail.sync="dialogEdit" :editedItem.sync="editedItem" v-on:close="close('alterado')" v-on:sucess="alertSucess = true" v-on:error="alertError = true"></edit-folder>
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
                    Listas
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="folders"
                    hide-actions
                    class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.description }}</td>
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
                            @click="deleteFolder(props.item._id)"
                        >
                            delete
                        </v-icon>
                        </div>
                    </td>
                    </template>
                    <template slot="no-data">
                        <v-loading :show="showLoading" msg="Não há listas cadastradas"/>
                    </template>
                </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
  </v-container>
    </div>
</template>

<script>
import Folder from '@/services/Folder'
import AddFolder from './AddFolder'
import EditFolder from './EditFolder'

export default {
    name: 'folders',
    components: {
        AddFolder, EditFolder
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
            folders: [],
            showLoading: 'loading'
        }
    },
    mounted () {
        this.alertError = false
        this.alertSucess = false
    },
    created () {
        this.getFolders()
        if(this.folders.length === 0){
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
            this.textError = `Erro ao ${text} a lista.`
            this.textSuccess = `Lista ${text} com sucesso!`
            this.dialogEdit = false
            this.dialog = false
            this.getFolders()
        },
        async getFolders () {
            const response = await Folder.list()
            this.folders = response.data
        },
        async deleteFolder (id) {
            const response = await Folder.deleteFolder(id)
            console.log(response.data)
            if (response.status === 200) {
                this.textSuccess = `Lista excluida com sucesso!`
                this.alertError = false
                this.alertSucess = true
                this.getFolders()
            } else {
                this.textError = `Erro ao excluir a lista..`
                this.alertError = true
                this.alertSucess = false
                this.getFolders()
            }
        }
    },

}
</script>

<style>

</style>
