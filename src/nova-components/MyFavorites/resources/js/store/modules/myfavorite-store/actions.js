import { UPDATE_MY_FAVORITE_MUTATION, TOGGLE_FAVORITE_POSTED_STATUS } from './mutations';
import { FavoritesHelper } from '../../../helpers/FavoritesHelper';

const fetchMyFavorites = async ({ commit }) => {

    try {
        const res = await Nova.request().get('/nova-api/favs', {
            params: {
                viaResource: 'users',
                viaResourceId: Nova.config.userId,
                viaRelationship: 'favs',
                relationshipType: 'hasMany'
            }
        })

        if(res && res.data && res.data && res.data.resources) {
            const favs = FavoritesHelper.parseFavoritesResources(res.data.resources)
            commit(UPDATE_MY_FAVORITE_MUTATION, favs)

            return Promise.resolve(favs)
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

export default {
    fetchMyFavorites, toggleFavPostedStatus
}