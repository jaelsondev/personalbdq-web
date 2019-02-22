<template>
    <div>
        <app-navigation />
        <v-content>
            <router-view></router-view>
        </v-content>
    </div>
</template>

<script>
import AppNavigation from '@/views/AppNavigation'

export default {
    name: 'home',
    components: {
        AppNavigation
    }

}
</script>

<style>

</style>
