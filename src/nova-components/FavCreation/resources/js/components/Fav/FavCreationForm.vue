<template>
    <div class="c-fav-creation-form">


        <form @submit.prevent="handleSubmit">
            <div class="c-card py-2">

                <div class="c-card__title__border-left mt-6 py-3">
                    <div class="px-8">
                        <h2 class="my-3">Create Fav</h2>
                    </div>
                </div>

                <!-- URL -->
                <div class="c-border-bottom">
                    <div class="py-6 px-8">
                        <FormField 
                            v-model="form.url.value"
                            @blur="form.url.touched = true"
                            id="url" 
                            type="text" 
                            :danger="invalidUrl && form.url.touched && form.url.value !== ''"
                            help-text="Please enter a valid URL."
                        >URL</FormField>
                    </div>
                </div>
                <!-- ./URL -->

                <!-- PublishedAt -->
                <div class="c-border-bottom">
                    <div class="py-6 px-8">
                        <FormField 
                            v-model="form.publishedAt.value"
                            @blur="form.publishedAt.touched = true"
                            id="publishedAt" 
                            type="date" 
                            :danger="invalidPublishedAt && form.publishedAt.touched && form.publishedAt.value !== ''"
                            help-text="Please enter a valid date yyyy-mm-dd."
                        >Published At</FormField>
                    </div>
                </div>
                <!-- ./PublishedAt -->

                <!-- USER -->
                <div class="c-border-bottom">
                    <div class="py-6 px-8">

                        <!-- Selected User -->
                        <div class="mb-3 pl-1">
                            <span class="font-bold">User{{ form.user.display ? `: ${form.user.display}`: '' }}</span>
                        </div>
                    
                        <!-- SearchUsers -->
                        <div class="px-0 overflow-hidden">
                            
                            <!-- SearchField -->
                            <div class="bg-grey-300">
                                <FormField 
                                    v-model="userSearch"
                                    @input="handleSearchUser"
                                    @blur="form.user.touched = true"
                                    id="searchUsers" 
                                    type="text" 
                                    :danger="invalidUser && form.user.touched && form.user.value !== ''"
                                    help-text="Please select a valid user."
                                >Select User</FormField>
                            </div>
                            <!-- ./SearchField -->

                            <div class="c-search-options overflow-y-scroll">
                                
                                <!-- Resultoption -->
                                <div v-if="availableUsers.length">
                                    <div v-for="user in availableUsers" :key="user.value" @click="selectUser(user)"
                                        class="px-4 py-2 cursor-pointer text-white">
                                        <div class="flex items-center">
                                            <div class="mr-3">
                                                <img :src="user.avatar" class="w-8 h-8 rounded-full block">
                                            </div> 
                                            <div>
                                                <div class="text-sm font-semibold leading-5 text-90">
                                                    {{ user.display }}
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="availableUsers.length === 0 && this.userSearch !== ''">
                                    <div class="px-4 py-2 cursor-pointer text-white">
                                        <div class="flex items-center">
                                            <div>
                                                <div class="text-sm font-semibold leading-5 text-90 text-danger">
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
                </div>
                <!-- ./USER -->

                <div class="flex justify-end m-6">
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