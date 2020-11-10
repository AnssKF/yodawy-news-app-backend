<template>
    <div class="c-fav-creation-form">

        <form @submit.prevent="handleSubmit">
            <div class="c-card">

                <div class="c-card__title-wrapper c-card__title__border-left">
                    <h2 class="c-card__title">Create Fav</h2>
                </div>

                <!-- URL -->
                <div class="c-form-field-wrapper c-border-bottom">
                    <FormField 
                        :value="form.url.value"
                        :on-input="setValue"
                        :on-blur="setTouched"
                        :danger="showUrlErrorMessage"
                        c-key="url"
                        id="url" 
                        type="text" 
                        placeholder="URL of headline from newsapi.org"
                        help-text="Please enter a valid URL."
                    >URL</FormField>
                </div>
                <!-- ./URL -->

                <!-- PublishedAt -->
                <div class="c-form-field-wrapper c-border-bottom">
                    <FormField 
                        :value="form.publishedAt.value"
                        :on-input="setValue"
                        :on-blur="setTouched"
                        :danger="showPublishedAtErrorMessage"
                        c-key="publishedAt"
                        id="publishedAt" 
                        type="date" 
                        placeholder="Headline publish date"
                        help-text="Please enter a valid date yyyy-mm-dd."
                    >Published At</FormField>
                </div>
                <!-- ./PublishedAt -->

                <!-- USER -->
                <div class="c-form-field-wrapper c-border-bottom">

                    <!-- Selected User -->
                    <div class="selected-user">
                        <span>User{{ getSelectedUserName }}</span>
                    </div>
                
                    <!-- SearchUsers -->
                    <div class="search-users">
                        
                        <!-- SearchField -->
                            <FormField 
                                :value="userSearch"
                                :on-input="handleSearchUser"
                                :on-blur="setTouched"
                                :danger="showUserErrorMessage"
                                c-key="user"
                                id="searchUsers" 
                                type="text" 
                                placeholder="Search by username or email"
                                help-text="Please select a valid user."
                            >Select User</FormField>
                        <!-- ./SearchField -->

                        <div class="c-search-options">
                            
                            <!-- Resultoption -->
                            <div v-for="user in availableUsers" :key="user.value" @click="selectUser(user)"
                                class="search-option-wrapper">
                                <div class="search-option">
                                    <div class="search-option__avatar">
                                        <img :src="user.avatar">
                                    </div> 
                                    <div class="search-option__display">
                                        {{ user.display }}
                                    </div>
                                </div>
                            </div>

                            <div class="search-option-wrapper" v-if="noSearchResults">
                                <div class="search-option">
                                    <div>
                                        <div class="search-option__display danger">
                                            There is no user exist.
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <!-- ./Resultoption -->

                        </div>
                    </div>
                    <!-- ./SearchUsers -->
                
                </div>
                <!-- ./USER -->

                <div class="c-form-footer">
                    <button 
                        :disabled="submitDisabled"
                        type="submit" 
                        class="c-btn c-btn-shadow-effect">
                        Create Fav
                    </button>
                </div>

            </div> <!-- ./card -->


        </form>
    </div>
</template>

<script>
// Styles
import './FavCreationForm.css'

export default {
    name: 'FavCreationForm',

    data(){
        return {
            form: {
                url: {
                    value: '',
                    touched: false
                },
                publishedAt: {
                    value: '',
                    touched: false
                },
                user: {
                    value: '',
                    display: '',
                    touched: false
                }
            },

            userSearch: '',
            availableUsers: [],

            searchUserCancelTokenSource: null,
        }
    },

    computed: {
        invalidUrl() {
            const url = this.form.url
            return url.value === '' || !url.value.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
        },

        invalidPublishedAt() {
            const publishedAt = this.form.publishedAt
            return publishedAt.value === '' || !publishedAt.value.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
        },

        invalidUser() {
            const user = this.form.user
            return user.value === ''
        },

        showUrlErrorMessage() {
            return this.invalidUrl && this.form.url.touched && this.form.url.value !== ''
        },

        showPublishedAtErrorMessage() {
            return this.invalidPublishedAt && this.form.publishedAt.touched && this.form.publishedAt.value !== ''
        },

        showUserErrorMessage() {
            return this.invalidUser && this.form.user.touched && this.form.user.value !== ''
        },

        getSelectedUserName() {
            return this.form.user.display ? `: ${this.form.user.display}`: ''
        },
        
        submitDisabled() {
            return this.invalidUrl || this.invalidPublishedAt || this.invalidUser
        },

        noSearchResults() {
            return this.availableUsers.length === 0 && this.userSearch !== ''
        }
    },

    methods: {
        handleSubmit() {
            const url = this.form.url.value;
            const publishedAt = this.form.publishedAt.value;
            const user = this.form.user.value;

            Nova.request().post('/nova-api/favs', {
                url, publishedAt, user
            })
                .then( _ => {
                    Nova.success('Created')
                    this.resetForm()
                })
                .catch( _ => {
                    Nova.error('Error')
                })
            
        },

        handleSearchUser($e) {
            this.userSearch = $e.target.value;

            if(this.searchUserCancelTokenSource) this.searchUserCancelTokenSource.cancel();

            if(this.userSearch === '') return this.availableUsers = []

            // Using axios not Nova.request() so i can cancel old request
            // Nova.request have an error with axios.isCancel(response)

            this.searchUserCancelTokenSource = axios.CancelToken.source();
            axios.get('/nova-api/favs/associatable/user', {
                params: {
                    search: this.userSearch,
                    first: false,
                    withTrashed: false,
                    viaResource: '',
                    viaResourceId: '',
                },

                cancelToken: this.searchUserCancelTokenSource.token
            })

            .then( res => {
                this.availableUsers = res.data.resources;
            })
            .catch( err => {
                if (axios.isCancel(err)) return
                else Nova.error('Error searching for user')
            })
        },

        selectUser(availableUser) {
            this.form.user.value = availableUser.value;
            this.form.user.display = availableUser.display;
            this.availableUsers = [];
            this.userSearch = '';
        },

        resetForm(){
            this.form = {
                url: {
                    value: '',
                    valid: true
                },
                publishedAt: {
                    value: '',
                    valid: true
                },
                user: {
                    value: '',
                    valid: true,
                    display: ''
                }
            }
        },

        setTouched($e) {
            this.form[$e.key].touched = true;
        },

        setValue($e) {
            this.form[$e.key].value = $e.target.value;
        }
    }
}
</script>