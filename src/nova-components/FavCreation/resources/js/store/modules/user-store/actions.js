import { SET_AVAILABLE_USERS, UPDATE_SEARCH_CANCEL_TOKEN_SOURCE } from './mutations';
import { UsersHelper } from '../../../helpers/UsersHelpers';


const fetchUsers = async ({ commit, state }, searchResult) => {
    /**
     * Search Users by username | email ...
     */

    // Get latest request cancel token
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
        // ! Use AXIOS not Nova.request() because nova modify axios instance that not support cacel requests
        const res = await axios.get('/nova-api/users', {
            params: {
                search: searchResult,
            },
            cancelToken: searchCancelTokenSource.token
        })

        if(!res || !res.data || !res.data.resources) return Promise.reject('Invalid Response');
        
        const availableUsers = UsersHelper.parseUserResources(res.data.resources)
        commit(SET_AVAILABLE_USERS, availableUsers)

        return Promise.resolve()
    }catch(err) {
        if (axios.isCancel(err)) Promise.resolve()
        else Promise.reject()
    }
}

export default {
    fetchUsers
}