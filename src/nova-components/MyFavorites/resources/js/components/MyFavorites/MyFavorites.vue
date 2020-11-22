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
            <c-table :columns="columns" :data="getTableData" :tr-class="getRowCssClass"></c-table>

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
            columns: [
                {
                    cell: {
                        type: 'text',
                        field: 'id'
                    },
                    header: 'ID'
                }, 
                {
                    cell: {
                        type: 'text',
                        field: 'url'
                    },
                    header: 'Url'
                }, 
                {
                    cell: {
                        type: 'text',
                        field: 'publishedAt'
                    },
                    header: 'Published At'
                }, 
                {
                    cell: {
                        type: 'text',
                        field: 'user'
                    },
                    header: 'User Name'
                }, 
                {
                    cell: {
                        type: 'action',
                        actionText: this.getTogglePostedActionText,
                        actionHandler: this.togglePosted
                    },
                    header: 'Actions'
                }
            ],
        }
    },
    computed: {
        ...mapGetters('MyFavsStore', ['getMyFavorites', 'hasPrevPage', 'hasNextPage', 'getDateFromFilters', 'getDateToFilters', 'getAvailableStatuses', 'getFavoriteById']),

        getTableData() {
            const data = this.getMyFavorites.reduce((acc, fav) => { 
                const { id: {value: id}, publishedAt:{value: publishedAt}, url:{value: url}, user:{value: user} } = fav;
                return [...acc, { id, publishedAt, url, user } ]
            }, [])

            return data
        },
    },
    methods: {
        ...mapActions('MyFavsStore', ['fetchMyFavorites', 'getNextPage', 'getPreviousPage', 'setDateFilter', 'fetchStatuses', 'toggleFavPostedStatus']),

        dateRangeChange(range){
            const { from = '', to = '' } = range;
            
            this.setDateFilter({ 
                dateFrom: from,
                dateTo: to,
            })
                .then(() => this.fetchMyFavorites() )
        },

        togglePosted(row) {
            this.toggleFavPostedStatus(row.id)
                .then((toggledToStatus) => {
                    Nova.success(toggledToStatus.toLowerCase() === 'posted' ? 'Posted': 'Unposted')
                })
                .catch(() => Nova.error('Error'))
        },

        getTogglePostedActionText(row) {
            const fav = this.getFavoriteById(row.id);
            const STATUS = this.getAvailableStatuses;

            if(fav && fav.status && fav.status.id && STATUS.UNPOSTED){
                return fav.status.id === STATUS.UNPOSTED ? 'Post' : 'Unpost';
            }else{
                return '';
            }
        },

        getRowCssClass(row) {
            const fav = this.getFavoriteById(row.id);
            const STATUS = this.getAvailableStatuses;

            if(fav && fav.status && fav.status.id && STATUS.POSTED && fav.status.id === STATUS.POSTED){
                return 'fav-item-posted'
            }else{
                return null;
            }
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