
export const UPDATE_MY_FAVORITE_MUTATION = 'UPDATE_MY_FAVORITE_MUTATION'
const updateMyFavoriteMutation = (state, favorites) => {
    state.myFavorites = favorites
}

export const TOGGLE_FAVORITE_POSTED_STATUS = 'TOOGLE_FAVORITE_POSTED_STATUS'
const toggleFavoritePostedStatus = (state, favId) => {
    const favIndex = state.myFavorites.findIndex( _ => _.id === favId)
    const fav = state.myFavorites[favIndex]; 
    state.myFavorites[favIndex].posted = !fav.posted
}

export const UPDATE_FAVORITES_PAGINATOR = 'UPDATE_FAVORITES_PAGINATOR'
const updateFavoritesPaginator = (state, paginator) => {
    const { prev_page_url, next_page_url, per_page } = paginator;
    state.paginator = {prev_page_url, next_page_url, per_page}
}

export const UPDATE_DATE_RANGE_FILTER = 'UPDATE_DATE_RANGE_FILTER'
const updateDateRangeFilte = (state, { dateFrom, dateTo }) => {
    state.filters = { dateFrom, dateTo }
}

export default {
    [UPDATE_MY_FAVORITE_MUTATION]: updateMyFavoriteMutation,
    [TOGGLE_FAVORITE_POSTED_STATUS]: toggleFavoritePostedStatus,
    [UPDATE_FAVORITES_PAGINATOR]: updateFavoritesPaginator,
    [UPDATE_DATE_RANGE_FILTER]: updateDateRangeFilte
}