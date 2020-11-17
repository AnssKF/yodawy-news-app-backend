
export default {
    getMyFavorites: state => (state.myFavorites),
    getPaginator: state => (state.paginator),

    hasPrevPage: state => (!!state.paginator.prev_page_url),
    hasNextPage: state => (!!state.paginator.next_page_url)
}