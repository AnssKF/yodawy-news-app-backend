
export const FAV_FORM_INITIAL = () =>  ({
    url: { value: '', touched: false },
    publishedAt: { value: '', touched: false },
    user: { value: '', display: '', touched: false, userSearch: '' },
    author: { value: '', touched: false }
})

export default {
    favForm: FAV_FORM_INITIAL()
}