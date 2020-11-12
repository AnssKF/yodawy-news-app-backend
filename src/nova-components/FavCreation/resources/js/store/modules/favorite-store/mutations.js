import { FAV_FORM_INITIAL } from './state'

export const UPDATE_FAV_FORM_FIELD = 'UPDATE_FORM_FIELD';
const updateFormField = (state, { field, attr, value }) => {
    state.favForm[field][attr] = value;
}

export const RESET_FAV_FORM = 'RESET_FAV_FORM';
const resetFavForm = (state) => {
    state.favForm = FAV_FORM_INITIAL()
}

export const UPDATE_FAV_FORM_FIELD = 'UPDATE_FORM_FIELD';
const updateFormField = (state, { field, attr, value }) => {
    state.favForm[field][attr] = value;
}

export const RESET_FAV_FORM = 'RESET_FAV_FORM';
const resetFavForm = (state) => {
    state.favForm = {
        url: { value: '', touched: false },
        publishedAt: { value: '', touched: false },
        user: { value: '', display: '', touched: false, userSearch: '' }
    }
}

export default {
    [UPDATE_FAV_FORM_FIELD]: updateFormField,
    [RESET_FAV_FORM]: resetFavForm
}