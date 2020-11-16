<template>
    <c-card title="My Favorites">
        
        <div v-for="fav in getMyFavorites" :key="fav.id">
            <!-- TODO: Design fav table -->
            {{ fav.id }} {{ fav.url }} {{ fav.publishedAt }} {{ fav.user }}
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