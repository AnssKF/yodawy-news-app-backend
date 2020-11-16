
export const UPDATE_MY_FAVORITE_MUTATION = 'UPDATE_MY_FAVORITE_MUTATION'
const updateMyFavoriteMutation = (state, favorites) => {
    state.myFavorites = favorites
}

export default {
    [UPDATE_MY_FAVORITE_MUTATION]: updateMyFavoriteMutation
}