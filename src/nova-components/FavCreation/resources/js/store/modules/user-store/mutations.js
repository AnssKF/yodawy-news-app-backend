
export const SET_AVAILABLE_USERS = 'SET_AVAILABLE_USERS';
const setAvailableUsers = (state, availableUsers) => state.availableUsers = availableUsers

// ---- 
export const UPDATE_SEARCH_CANCEL_TOKEN_SOURCE = 'UPDATE_SEARCH_CANCEL_TOKEN_SOURCE'
const updateSearchCancelTokenSource = (state, source) => state.searchCancelTokenSource = source


// ----
export default {
    [SET_AVAILABLE_USERS]: setAvailableUsers,
    [UPDATE_SEARCH_CANCEL_TOKEN_SOURCE]: updateSearchCancelTokenSource
}