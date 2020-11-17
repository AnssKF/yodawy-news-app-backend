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
                    :disabled-previoud="!paginator.prev_page_url"
                    :disabled-next="!paginator.next_page_url"
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
    data() {
        return {
            paginator: {
                prev_page_url: null,
                next_page_url: null,
                per_page: null,
            }
        }
    },
    computed: {
        ...mapGetters('MyFavsStore', ['getMyFavorites'])
    },
    methods: {
        ...mapActions('MyFavsStore', ['fetchMyFavorites']),

        getNextPage() {
            const page = +(new URL(this.paginator.next_page_url)).searchParams.get('page');
            this.getFavs(page)
        },
        getPreviousPage() {
            const page = +(new URL(this.paginator.prev_page_url)).searchParams.get('page');
            this.getFavs(page)
        },

        getFavs(page = 1){
            this.fetchMyFavorites(page)
                .then( res => {
                    const { prev_page_url, next_page_url, per_page } = res;
                    this.paginator = {prev_page_url, next_page_url, per_page}
                })
                .catch(() => {
                    Nova.error('Error while fetching your favorites.')
                })
        }
    },
    mounted() {
        this.getFavs()
    },
}
</script>