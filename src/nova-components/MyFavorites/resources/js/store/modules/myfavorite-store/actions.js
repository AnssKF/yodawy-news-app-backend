import { UPDATE_MY_FAVORITE_MUTATION, TOGGLE_FAVORITE_POSTED_STATUS, UPDATE_FAVORITES_PAGINATOR } from './mutations';
import { FavoritesHelper } from '../../../helpers/FavoritesHelper';

const fetchMyFavorites = async ({ commit }, page=1) => {

    try {
        const res = await Nova.request().get('/nova-api/favs', {
            params: {
                page,
                perPage: 10,
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

const toggleFavPostedStatus = async ({ commit }, favId) => {
    try {
        const res = await Nova.request().post('/nova-vendor/my-favorites/toggle-posted', {
            id: favId
        })

        if(res && res.data && res.data.results) {
            commit(TOGGLE_FAVORITE_POSTED_STATUS, favId)
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

export default {
    fetchMyFavorites, toggleFavPostedStatus, getNextPage, getPreviousPage
}