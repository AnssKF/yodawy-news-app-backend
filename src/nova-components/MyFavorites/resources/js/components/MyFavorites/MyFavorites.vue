<template>
    <c-card title="My Favorites">
        
        <table class="fav-table" v-if="getMyFavorites.length">
            <tr>
                <th>ID</th>
                <th>Url</th>
                <th>Published At</th>
                <th>User Name</th>
                <th>Actions</th>
            </tr>

            <fav-item-row v-for="fav in getMyFavorites" :key="fav.id" :fav="fav">
            </fav-item-row>
        </table>

        <div class="no-data-available" v-else>
            There is no data available ...
        </div>

    </c-card>
</template>

<script>
import './MyFavorites.css'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'my-favorites',
    computed: {
        ...mapGetters('MyFavsStore', ['getMyFavorites'])
    },
    methods: {
        ...mapActions('MyFavsStore', ['fetchMyFavorites'])
    },
    mounted() {
        this.fetchMyFavorites()
    },
}
</script>