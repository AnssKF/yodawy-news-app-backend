import { SET_AVAILABLE_USERS, UPDATE_SEARCH_CANCEL_TOKEN_SOURCE } from './mutations'


const fetchUsers = async ({ commit, state }, searchResult) => {
    let searchCancelTokenSource = state.searchCancelTokenSource;

    // Cancel Old Request
    if(searchCancelTokenSource) searchCancelTokenSource.cancel();

    // If search result is empty no need to send new request
    if(searchResult === '') {
        commit(SET_AVAILABLE_USERS, [])
        return
    }

    // Generate New Cancel Token and save it to state
    searchCancelTokenSource = axios.CancelToken.source()
    commit(UPDATE_SEARCH_CANCEL_TOKEN_SOURCE, searchCancelTokenSource)

    try {
        const res = await axios.get('/nova-api/favs/associatable/user', {
            params: {
                search: searchResult,
                first: false,
                withTrashed: false,
                viaResource: '',
                viaResourceId: '',
            },
            cancelToken: searchCancelTokenSource.token
        })

        commit(SET_AVAILABLE_USERS, res.data.resources)
        return Promise.resolve()
    }catch(err){
        if (axios.isCancel(err)) Promise.resolve()
        else Promise.reject()
    }
}

export default {
    fetchUsers
}