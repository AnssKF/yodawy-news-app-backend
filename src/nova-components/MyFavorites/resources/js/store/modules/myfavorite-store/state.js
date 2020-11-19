
export const PAGINATOR_INITIAL_STATE = () => ({
    prev_page_url: null,
    next_page_url: null,
    per_page: 10,
})

export const FAVORITE_LIST_FILTER_INIT_STATE = () => ({
    dateFrom: '',
    dateTo: ''
})

export default {
    myFavorites: [],
    paginator: PAGINATOR_INITIAL_STATE(),
    filters: FAVORITE_LIST_FILTER_INIT_STATE(),
    statuses: {}
}