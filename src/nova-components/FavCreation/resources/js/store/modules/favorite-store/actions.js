import { UPDATE_FAV_FORM_FIELD, RESET_FAV_FORM } from './mutations'

const addFav = async ({ commit }, fav) => {
    const {url, publishedAt, user} = fav

    try{
        const res = await Nova.request().post('/nova-api/favs', {
            url, publishedAt, user
        })
        return Promise.resolve(res);
    }catch(e){
        return Promise.reject(e)
    }
}

const updateFavFormField = ({ commit }, { field, attr, value }) => {
    commit(UPDATE_FAV_FORM_FIELD, { field, attr, value })
}

const resetFavForm = ({ commit }) => {
    commit(RESET_FAV_FORM)
}

export default {
    addFav, updateFavFormField, resetFavForm
}