import { UPDATE_FAV_FORM_FIELD, RESET_FAV_FORM } from './mutations'

const addFav = async ({ commit, state, getters }) => {
    const { invalidUrl, invalidPublishedAt, invalidUser } = getters

    const { url: {value: url},  publishedAt: {value: publishedAt}, user: {value: user}} = state.favForm;

    if(invalidUrl || invalidPublishedAt || invalidUser) return Promise.reject('Invalid Parameters')

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

const validateAuthor = ({ commit }, value) => {
    let invalidAuthor = false;

    if(value !== '' && !(/^[a-zA-Z ]+$/).test(value)){
        value = value.replace(/([^a-zA-Z ])+/, '')
        invalidAuthor = true;
    }else{
        invalidAuthor = false;
    }

    commit(UPDATE_FAV_FORM_FIELD, { field: 'author', attr: 'inValid', value: invalidAuthor })
    return value
}

const validateAndSetAuthorValue = ({ commit, dispatch }, $e) => {
    const value = $e.target.value
    
    dispatch('validateAuthor', value)
        .then((newVal) => {
            $e.target.value = newVal;
            commit(UPDATE_FAV_FORM_FIELD, { field: 'author', attr: 'value', value: newVal })
        })

}

export default {
    addFav, updateFavFormField, resetFavForm, validateAndSetAuthorValue, validateAuthor
}