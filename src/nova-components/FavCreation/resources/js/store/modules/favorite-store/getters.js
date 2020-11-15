
export default {
    getFavForm: state => state.favForm,
    getUserSearch: state => state.favForm.user.userSearch,
    getUrlField: state => state.favForm.url,
    getPublishedAtField: state => state.favForm.publishedAt,
    getUserField: state => state.favForm.user,
    getAuthorField: state => state.favForm.author,

    invalidUrl: state =>  (state.favForm.url.value === '' || !state.favForm.url.value.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)),
    invalidPublishedAt: state => (state.favForm.publishedAt.value === '' || !state.favForm.publishedAt.value.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)),
    invalidUser: state => (state.favForm.user.value === '')
}