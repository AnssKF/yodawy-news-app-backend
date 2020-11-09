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
                        v-model="form.url.value"
                        @blur="form.url.touched = true"
                        id="url" 
                        type="text" 
                        placeholder="URL of headline from newsapi.org"
                        :danger="invalidUrl && form.url.touched && form.url.value !== ''"
                        help-text="Please enter a valid URL."
                    >URL</FormField>
                </div>
                <!-- ./URL -->

                <!-- PublishedAt -->
                <div class="c-form-field-wrapper c-border-bottom">
                    <FormField 
                        v-model="form.publishedAt.value"
                        @blur="form.publishedAt.touched = true"
                        id="publishedAt" 
                        type="date" 
                        placeholder="Headline publish date"
                        :danger="invalidPublishedAt && form.publishedAt.touched && form.publishedAt.value !== ''"
                        help-text="Please enter a valid date yyyy-mm-dd."
                    >Published At</FormField>
                </div>
                <!-- ./PublishedAt -->

                <!-- USER -->
                <div class="c-form-field-wrapper c-border-bottom">

                    <!-- Selected User -->
                    <div class="selected-user">
                        <span>User{{ form.user.display ? `: ${form.user.display}`: '' }}</span>
                    </div>
                
                    <!-- SearchUsers -->
                    <div class="search-users">
                        
                        <!-- SearchField -->
                        <div>
                            <FormField 
                                v-model="userSearch"
                                @input="handleSearchUser"
                                @blur="form.user.touched = true"
                                id="searchUsers" 
                                type="text" 
                                placeholder="Search by username or email"
                                :danger="invalidUser && form.user.touched && form.user.value !== ''"
                                help-text="Please select a valid user."
                            >Select User</FormField>
                        </div>
                        <!-- ./SearchField -->

                        <div class="c-search-options">
                            
                            <!-- Resultoption -->
                            <div v-if="availableUsers.length">
                                <div v-for="user in availableUsers" :key="user.value" @click="selectUser(user)"
                                    class="search-option-wrapper">
                                    <div class="search-option">
                                        <div class="search-option__avatar">
                                            <img :src="user.avatar">
                                        </div> 
                                        <div class="search-option__display">
                                            <div>
                                                {{ user.display }}
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="availableUsers.length === 0 && this.userSearch !== ''">
                                <div class="search-option-wrapper">
                                    <div class="search-option">
                                        <div>
                                            <div class="search-option__display danger">
                                                There is no user exist.
                                            </div> 
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
                        :disabled="invalidUrl || invalidPublishedAt || invalidUser"
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
// Components
import FormField from '../custom/FormField/FormField.vue';

// Styles
import './FavCreationForm.css'

export default {
    name: 'FavCreationForm',

    components: {
        FormField
    },

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
            availableUsers: []
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

        handleSearchUser() {
            if(this.userSearch === '') return this.availableUsers = []
            Nova.request().get('/nova-api/favs/associatable/user', {
                params: {
                    search: this.userSearch,
                    first: false,
                    withTrashed: false,
                    viaResource: '',
                    viaResourceId: '',
                }
            })

            .then( res => {
                if(this.userSearch === '') return
                this.availableUsers = res.data.resources;
            })
            .catch( _ => {
                Nova.error('Error searching for user')
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
        }
    }
}
</script>