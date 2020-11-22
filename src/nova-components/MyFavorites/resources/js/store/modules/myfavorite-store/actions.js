import { 
    UPDATE_MY_FAVORITE_MUTATION, 
    TOGGLE_FAVORITE_POSTED_STATUS, 
    UPDATE_FAVORITES_PAGINATOR, 
    UPDATE_DATE_RANGE_FILTER,
    UPDATE_STATUSES } from './mutations';
import { FavoritesHelper } from '../../../helpers/FavoritesHelper';
import { StatusHelper } from '../../../helpers/StatusHelper';

const fetchMyFavorites = async ({ commit, getters }, page=1) => {
    const { getDateFromFilters, getDateToFilters, getPerPage } = getters;

    try {
        const filters = FavoritesHelper.encodeDateFromToFilter({dateFrom: getDateFromFilters, dateTo: getDateToFilters})
        
        const res = await Nova.request().get('/nova-api/favs', {
            params: {
                page,
                filters,
                perPage: getPerPage,
            }
        })

        if(res && res.data && res.data && res.data.resources) {
            const favs = FavoritesHelper.parseFavoritesResources(res.data.resources)
            commit(UPDATE_MY_FAVORITE_MUTATION, favs)

            const { prev_page_url, next_page_url, per_page} = res.data
            commit(UPDATE_FAVORITES_PAGINATOR, {prev_page_url, next_page_url, per_page})

            return Promise.resolve({
                prev_page_url,
                next_page_url,
                per_page,
                results: favs
            })
        }else {
            return Promise.reject('Invalid Response')
        }
    }catch(err) {
        return Promise.reject(err)
    }
}

const toggleFavPostedStatus = async ({ commit }, {favId, status}) => {
    try {
        const res = await Nova.request().post('/nova-vendor/my-favorites/toggle-posted', {
            status,
            id: favId
        })

        if(res && res.data && res.data.results) {
            commit(TOGGLE_FAVORITE_POSTED_STATUS, res.data.results)
            return Promise.resolve(res)
        }
        
        return Promise.reject('Invalid Response')
    }catch(err) {
        return Promise.reject(err)
    }
}

const getNextPage = ({ dispatch, state }) => {
    const page = +(new URL(state.paginator.next_page_url)).searchParams.get('page');
    dispatch('fetchMyFavorites', page)
}

const getPreviousPage = ({ dispatch, state }) => {
    const page = +(new URL(state.paginator.prev_page_url)).searchParams.get('page');
    dispatch('fetchMyFavorites', page)
}

const setDateFilter = ({ commit }, { dateFrom, dateTo }) => {
    commit(UPDATE_DATE_RANGE_FILTER, { dateFrom, dateTo })
}

const fetchStatuses = async ({ commit }) => {
    try {
        const res = await Nova.request().get('/nova-api/statuses')
        if(res && res.data && res.data && res.data.resources) {
            const statuses = StatusHelper.parseStatusesResource(res.data.resources)
            commit(UPDATE_STATUSES, statuses)
        }else {
            return Promise.reject('Invalid Response')
        }
    }catch(err) {
        return Promise.reject(err)
    }
}

export default {
    fetchMyFavorites, toggleFavPostedStatus, getNextPage, getPreviousPage, setDateFilter, fetchStatuses
}