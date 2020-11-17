
export const PAGINATOR_INITIAL_STATE = () => ({
    prev_page_url: null,
    next_page_url: null,
    per_page: 10,
})

export default {
    myFavorites: [],
    paginator: PAGINATOR_INITIAL_STATE()
}