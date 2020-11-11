
export const SET_AVAILABLE_USERS = 'SET_AVAILABLE_USERS';
const setAvailableUsers = (store, availableUsers) => store.availableUsers = availableUsers

// ---- 
export const UPDATE_SEARCH_CANCEL_TOKEN_SOURCE = 'UPDATE_SEARCH_CANCEL_TOKEN_SOURCE'
const updateSearchCancelTokenSource = (store, source) => store.searchCancelTokenSource = source


// ----
export default {
    [SET_AVAILABLE_USERS]: setAvailableUsers,
    [UPDATE_SEARCH_CANCEL_TOKEN_SOURCE]: updateSearchCancelTokenSource
}