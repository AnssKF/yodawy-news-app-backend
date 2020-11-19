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
            <c-table>
                <c-table-header :headers="headers"/>
                <fav-item-row v-for="fav in getMyFavorites" :key="fav.id" :fav="fav">
                </fav-item-row>
            </c-table>

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
    data() {
        return {
            headers: [ 'ID', 'Url', 'Published At', 'User Name', 'Actions' ]
        }
    },
    computed: {
        ...mapGetters('MyFavsStore', ['getMyFavorites', 'hasPrevPage', 'hasNextPage', 'getDateFromFilters', 'getDateToFilters'])
    },
    methods: {
        ...mapActions('MyFavsStore', ['fetchMyFavorites', 'getNextPage', 'getPreviousPage', 'setDateFilter', 'fetchStatuses']),

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
        this.fetchStatuses()
        this.fetchMyFavorites()
            .catch(() => {
                Nova.error('Error while fetching your favorites.')
            })
    },
}
</script>