<template>
    <c-card title="My Favorites">

        <date-range-filter
            :on-change-values="dateRangeChange"
            from-label="Published From:"
            :from-value="getDateFromFilters"
            to-label="Published To:"
            :to-value="getDateToFilters">
        </date-range-filter>
        
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
                    :disabled-previous="!hasPrevPage"
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
        ...mapGetters('MyFavsStore', ['getMyFavorites', 'hasPrevPage', 'hasNextPage', 'getDateFromFilters', 'getDateToFilters'])
    },
    methods: {
        ...mapActions('MyFavsStore', ['fetchMyFavorites', 'getNextPage', 'getPreviousPage', 'setDateFilter']),

        dateRangeChange(range){
            const { from = '', to = '' } = range;
            
            this.setDateFilter({ 
                dateFrom: from,
                dateTo: to,
            })
                .then(() => this.fetchMyFavorites() )
        }
    },
    mounted() {
        this.fetchMyFavorites()
            .catch(() => {
                Nova.error('Error while fetching your favorites.')
            })
    },
}
</script>