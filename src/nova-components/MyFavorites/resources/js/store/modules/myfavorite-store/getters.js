
export default {
    getPerPage: state => (state.perPage),
    getMyFavorites: state => (state.myFavorites),
    getFavoriteById: state => (id) => {
        return state.myFavorites.find((_) => _.id.value === id)
    },
    getPaginator: state => (state.paginator),

    hasPrevPage: state => (!!state.paginator.prev_page_url),
    hasNextPage: state => (!!state.paginator.next_page_url),

    getDateFromFilters: state => (state.filters.dateFrom),
    getDateToFilters: state => (state.filters.dateTo),

    getAvailableStatuses: state => (state.statuses)
}