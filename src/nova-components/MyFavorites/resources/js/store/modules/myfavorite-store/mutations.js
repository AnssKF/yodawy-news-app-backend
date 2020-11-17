
export const UPDATE_MY_FAVORITE_MUTATION = 'UPDATE_MY_FAVORITE_MUTATION'
const updateMyFavoriteMutation = (state, favorites) => {
    state.myFavorites = favorites
}

export const TOGGLE_FAVORITE_POSTED_STATUS = 'TOOGLE_FAVORITE_POSTED_STATUS'
const toggleFavoritePostedStatus = (state, favId) => {
    const favIndex = state.myFavorites.findIndex( _ => _.id === favId)
    const fav = state.myFavorites[favIndex]
    state.myFavorites[favIndex].posted = !fav.posted
}

export default {
    [UPDATE_MY_FAVORITE_MUTATION]: updateMyFavoriteMutation,
    [TOGGLE_FAVORITE_POSTED_STATUS]: toggleFavoritePostedStatus
}