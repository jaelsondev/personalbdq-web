<template>
    <div>
      <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        fixed
        app
      >
        <v-list dense>
          <template v-for="item in items">
            <v-list-tile :key="item.text" :to="item.link">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="blue darken-3"
        dark
        app
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span class="hidden-sm-and-down">Personalbdq</span>
        </v-toolbar-title>
      </v-toolbar>
    </div>
</template>

<script>
export default {
    name: 'template',
    props: {
      source: String
    },
    data(){
        return {
            drawer: null,
            items: [
                { icon: 'school', text: 'Cursos', link: '/cursos' },
                { icon: 'people', text: 'Usuários', link: '/usuarios' },
                { icon: 'format_list_bulleted', text: 'Listas', link: '/listas' },
                { icon: 'list_alt', text: 'Minhas Avaliação', link: '/avaliacoes' },
                { icon: 'share', text: 'Compartilhadas Comigo', link: '/compartilhados' }
            ]
        }
    }
}
</script>

<style>

</style>
