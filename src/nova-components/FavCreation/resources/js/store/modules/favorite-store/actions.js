import { UPDATE_FAV_FORM_FIELD, RESET_FAV_FORM } from './mutations'

const addFav = async ({ commit, state, getters }) => {
    /**
     * API action that submit FavForm state to favs api to create a new instance of favorite
     * 
     * @returns
     *  Promise 
     *      - resolved with Http response 
     *      - rejected with error message or HTTP error response
     */

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
    /**
     * Update FavForm state 
     * 
     * @param 
     *  - field: FavForm Field name ex 'url', 'publishedAt' ..
     *  - attr: FavForm attr key to be updated
     *  - value: To be assigned to attr
     */

    commit(UPDATE_FAV_FORM_FIELD, { field, attr, value })
}

const resetFavForm = ({ commit }) => {
    commit(RESET_FAV_FORM)
}

const validateAuthor = ({ commit }, value) => {
    /**
     * Validate Author Input value to accept only English charachters
     * 
     * @param
     *  - value: String of input value
     * 
     * @returns
     * - value: String .. modified value with only EN chars
     */

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
    /**
     * Author Field handler that validate value and set modified field value.
     * 
     * @param
     *  - $e: FormField :on-input event
     */

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