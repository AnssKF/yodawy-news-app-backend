export const UPDATE_MY_FAVORITE_MUTATION = 'UPDATE_MY_FAVORITE_MUTATION'
const updateMyFavoriteMutation = (state, favorites) => {
    state.myFavorites = favorites
}

export const TOGGLE_FAVORITE_POSTED_STATUS = 'TOOGLE_FAVORITE_POSTED_STATUS'
const toggleFavoritePostedStatus = (state, newFav) => {
    const STATUS = state.statuses;

    if(newFav && newFav.id && STATUS.UNPOSTED){
        const oldFavIndex = state.myFavorites.findIndex( _ => _.id.value === newFav.id)
        state.myFavorites[oldFavIndex].status = {
            id: newFav.status_id,
            value: newFav.status_id === STATUS.UNPOSTED ? 'Posted': 'Unposted'
        }
    }
}

export const UPDATE_FAVORITES_PAGINATOR = 'UPDATE_FAVORITES_PAGINATOR'
const updateFavoritesPaginator = (state, paginator) => {
    const { prev_page_url, next_page_url, per_page } = paginator;
    state.paginator = {prev_page_url, next_page_url, per_page}
}

export const UPDATE_DATE_RANGE_FILTER = 'UPDATE_DATE_RANGE_FILTER'
const updateDateRangeFilte = (state, range) => {
    const { dateFrom = '', dateTo = '' } = range;
    state.filters = { dateFrom, dateTo }
}

export const UPDATE_STATUSES = 'UPDATE_STATUSES'
const updateStatuses = (state, statuses) => {
    state.statuses = {...statuses}
}

export default {
    [UPDATE_MY_FAVORITE_MUTATION]: updateMyFavoriteMutation,
    [TOGGLE_FAVORITE_POSTED_STATUS]: toggleFavoritePostedStatus,
    [UPDATE_FAVORITES_PAGINATOR]: updateFavoritesPaginator,
    [UPDATE_DATE_RANGE_FILTER]: updateDateRangeFilte,
    [UPDATE_STATUSES]: updateStatuses
}