<template>
    <c-card title="My Favorites">
        
        <template v-if="getMyFavorites.length">
            <table class="fav-table">
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

            <div class="paginator-wrapper">
                <paginator
                    :disabled-previoud="!hasPrevPage"
                    :disabled-next="!hasNextPage"
                    :on-next="getNextPage"
                    :on-previous="getPreviousPage"
                ></paginator>
            </div>
        </template>

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
        ...mapGetters('MyFavsStore', ['getMyFavorites', 'hasPrevPage', 'hasNextPage'])
    },
    methods: {
        ...mapActions('MyFavsStore', ['fetchMyFavorites', 'getNextPage', 'getPreviousPage']),
    },
    mounted() {
        this.fetchMyFavorites()
            .then( res => {
                const { prev_page_url, next_page_url, per_page } = res;
                this.paginator = {prev_page_url, next_page_url, per_page}
            })
            .catch(() => {
                Nova.error('Error while fetching your favorites.')
            })
    },
}
</script>