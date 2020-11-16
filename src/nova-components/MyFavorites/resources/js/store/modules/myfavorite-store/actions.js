import { UPDATE_MY_FAVORITE_MUTATION } from './mutations';
import { FavoritesHelper } from '../../../helpers/FavoritesHelper';

const fetchMyFavorites = async ({ commit }) => {

    try {
        const res = await Nova.request().get('/nova-api/favs')

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

export default {
    fetchMyFavorites
}