
export default {
    getFavForm: state => state.favForm,
    getUserSearch: state => state.favForm.user.userSearch,
    getUrlField: state => state.favForm.url,
    getPublishedAtField: state => state.favForm.publishedAt,
    getUserField: state => state.favForm.user,
    getAuthorField: state => state.favForm.author
}