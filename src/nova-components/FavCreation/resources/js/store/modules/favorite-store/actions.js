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

const validateAndSetAuthorValue = ({ commit, dispatch }, $e) => {
    let value = $e.target.value
    let invalidAuthor = false;

    if(value !== '' && !(/^[a-zA-Z ]+$/).test(value)){
        $e.target.value = (value.match(/([a-zA-Z ]+)/g) || []).join(' ')
        invalidAuthor = true;
    }else{
        invalidAuthor = false;
    }

    dispatch('updateFavFormField', { field: 'author', attr: 'inValid', value: invalidAuthor })
    dispatch('updateFavFormField', { field: 'author', attr: 'value', value: $e.target.value })
}

export default {
    addFav, updateFavFormField, resetFavForm, validateAndSetAuthorValue
}