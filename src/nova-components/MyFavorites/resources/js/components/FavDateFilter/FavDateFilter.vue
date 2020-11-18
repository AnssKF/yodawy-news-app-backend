<template>
    <div class="fav-date-range-filter">
        <div class="date-field">
            <label for="fav-date-from">PublishedAt From:</label>
            <input 
                id="fav-date-from" 
                type="date" 
                ref="dateFrom"
                @change="handleInput"
                :value="getDateFromFilters">
        </div>
        <div class="date-field">
            <label for="fav-date-to">PublishedAt To:</label>
            <input 
                id="fav-date-to" 
                type="date"
                ref="dateTo"
                @change="handleInput"
                :value="getDateToFilters">
        </div>
    </div>
</template>

<script>
import './FavDateFilter.css';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'fav-date-filter',
    computed: {
        ...mapGetters('MyFavsStore', ['getDateFromFilters', 'getDateToFilters']),
    },
    methods: {
        ...mapActions('MyFavsStore', ['setDateFilter', 'fetchMyFavorites']),

        handleInput($e) {
            const value = $e.target.value;
            if( value !== '' && !value.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) return 
            
            this.setDateFilter({ 
                dateFrom: this.$refs.dateFrom.value ,
                dateTo: this.$refs.dateTo.value ,
            })
                .then(() => this.fetchMyFavorites() )
        },

    },
}
</script>

<style>

</style>