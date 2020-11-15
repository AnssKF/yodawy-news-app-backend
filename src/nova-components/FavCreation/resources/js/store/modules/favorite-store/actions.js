import { UPDATE_FAV_FORM_FIELD, RESET_FAV_FORM } from './mutations'

const addFav = async ({ commit, state }) => {
    const url           = state.favForm.user.value;
    const publishedAt   = state.favForm.publishedAt.value;
    const user          = state.favForm.user.value;

    try{
        const res = await Nova.request().post('/nova-api/favs', {
            url, publishedAt, user
        })
        commit(RESET_FAV_FORM);
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