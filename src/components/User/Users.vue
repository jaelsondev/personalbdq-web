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
                <add-user :dialogdetail.sync="dialog" v-on:close = "close('adicionado')" v-on:sucess="alertSucess = true" v-on:error="alertError = true"></add-user>
                <edit-user :dialogdetail.sync="dialogEdit" :editedItem.sync="editedItem" v-on:close="close('alterado')" v-on:sucess="alertSucess = true" v-on:error="alertError = true"></edit-user>
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
                    Usuários
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="users"
                    hide-actions
                    class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                    <td>{{ props.item.registration }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.email }}</td>
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
                            @click="deleteUser(props.item._id)"
                        >
                            delete
                        </v-icon>
                        </div>
                    </td>
                    </template>
                    <template slot="no-data">
                        <v-loading :show="showLoading" msg="Não há usuários cadastrados"/>
                    </template>
                </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
  </v-container>
    </div>
</template>

<script>
import User from '@/services/User'
import AddUser from './AddUser'
import EditUser from './EditUser'

export default {
    name: 'users',
    components: {
        AddUser, EditUser
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
                text: 'Matrícula',
                align: 'left',
                sortable: false,
                value: 'name'
            },
            {
                text: 'Nome',
                align: 'left',
                sortable: false,
                value: 'name'
            },
            {
                text: 'Email',
                align: 'center',
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
            users: [],
            showLoading: 'loading'
        }
    },
    mounted () {
        this.alertError = false
        this.alertSucess = false
    },
    created () {
        this.getUsers()
        if(this.users.length === 0){
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
            this.textError = `Erro ao ${text} o usuário.`
            this.textSuccess = `Usuário ${text} com sucesso!`
            this.dialogEdit = false
            this.dialog = false
            this.getUsers()
        },
        async getUsers () {
            const response = await User.list()
            this.users = response.data
        },
        async deleteUser (id) {
            const response = await User.deleteUser(id)
            console.log(response)
            if (response.status === 200) {
                this.textSuccess = `Usuário excluido com sucesso!`
                this.alertError = false
                this.alertSucess = true
                this.getUsers()
            } else {
                this.textError = `Erro ao excluir o usuário..`
                this.alertError = true
                this.alertSucess = false
                this.getUsers()
            }
        }
    },

}
</script>

<style>

</style>
