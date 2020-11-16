
export default {
    getFavForm: state => state.favForm,
    
    // FavForm Fields Getters
    getUserSearch: state => state.favForm.user.userSearch,
    getUrlField: state => state.favForm.url,
    getPublishedAtField: state => state.favForm.publishedAt,
    getUserField: state => state.favForm.user,
    getAuthorField: state => state.favForm.author,

    // FavForm Fields Validations
    invalidUrl: (state, { getUrlField }) =>  (getUrlField.value === '' || !getUrlField.value.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)),
    invalidPublishedAt: (state, { getPublishedAtField }) => (getPublishedAtField.value === '' || !getPublishedAtField.value.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)),
    invalidUser: (state, { getUserField }) => (getUserField.value === ''),
    invalidAuthor: (state, { getAuthorField }) => (getAuthorField.inValid) 
}