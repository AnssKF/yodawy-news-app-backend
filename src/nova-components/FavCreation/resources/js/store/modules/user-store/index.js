import { fetchUsers } from './actions'

const state = {
    availableUsers: [],

    searchCancelTokenSource: null,
}

const getters = {
    getAvailableUsers: store => store.availableUsers, 
}

const actions = {
    fetchUsers
}

const mutations = {
    updateSearchCancelTokenSource: (store, source) => store.searchCancelTokenSource = source,

    setAvailableUsers: (store, availableUsers) => store.availableUsers = availableUsers
}

export default {
    state, getters, actions, mutations
}