<template>
    <div>
        <h2 class="my-3">Create Fav</h2>
        <form @submit.prevent="handleSubmit">
            <div class="card">
                <div class="flex border-b border-40">
                    <div class="w-1/5 px-8 py-6">
                        <label for="url" 
                            class="inline-block text-80 pt-2 leading-tight"
                            :class="{'text-danger': invalidUrl && form.url.touched && form.url.value !== ''}">
                            Url
                        </label>
                    </div> 
                    <div class="py-6 px-8 w-1/2">
                        <input 
                            v-model="form.url.value"
                            @blur="form.url.touched = true"
                            id="url" 
                            type="text" 
                            placeholder="Url" 
                            class="w-full form-control form-input form-input-bordered"> 

                            <span v-if="invalidUrl && form.url.touched && form.url.value !== ''" class="mt-2 text-danger">Please enter a valid URL.</span>
                    </div>
                </div>

                <div class="flex border-b border-40">
                    <div class="w-1/5 px-8 py-6">
                        <label for="PublishedAt" 
                            class="inline-block text-80 pt-2 leading-tight"
                            :class="{'text-danger': invalidPublishedAt && form.publishedAt.touched && form.publishedAt.value !== ''}">
                            Published At
                        </label>
                    </div> 
                    <div class="py-6 px-8 w-1/2">
                        <input 
                            v-model="form.publishedAt.value"
                            @blur="form.publishedAt.touched = true"
                            id="publishedAt" 
                            type="date" 
                            placeholder="publishedAt" 
                            class="w-full form-control form-input form-input-bordered"> 

                            <span v-if="invalidPublishedAt && form.publishedAt.touched && form.publishedAt.value !== ''" class="mt-2 text-danger">Please enter a valid date yyyy-mm-dd.</span>
                    </div>
                </div>

                <div class="flex border-b border-40">
                    <div class="w-1/5 px-8 py-6">
                        <label 
                            for="user_id" 
                            class="inline-block text-80 pt-2 leading-tight"
                            :class="{'text-danger': invalidUser && form.user.touched && form.user.value !== ''}">
                            User
                        </label>
                    </div> 
                    <div class="py-6 px-8 w-1/2">
                        <input 
                            v-model="form.user.display"
                            @blur="form.user.touched = true"
                            readonly
                            id="user_id" 
                            type="text" 
                            placeholder="User" 
                            class="w-full form-control form-input form-input-bordered"> 
                    
                        <!-- Search Users -->
                        <div class="form-input px-0 border border-60 pin-t pin-l my-1 overflow-hidden" style="width: 100%;">
                            <div class="p-2 bg-grey-300">
                                <input 
                                    @input="handleSearchUser"
                                    @blur="form.user.touched = true"
                                    v-model="userSearch"
                                    type="text" 
                                    placeholder="Search" 
                                    spellcheck="false" 
                                    class="outline-none search-input-input w-full px-2 py-1.5 text-sm leading-normal bg-white rounded">
                            </div>

                            <div tabindex="-1" class="search-input-options relative overflow-y-scroll scrolling-touch text-sm" style="max-height: 155px;">

                                <!-- Result option -->
                                <div v-if="availableUsers.length">
                                    <div v-for="user in availableUsers" :key="user.value" @click="selectUser(user)"
                                        class="px-4 py-2 cursor-pointer search-input-item-0 text-white">
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
                                    <div class="px-4 py-2 cursor-pointer search-input-item-0 text-white">
                                        <div class="flex items-center">
                                            <div>
                                                <div class="text-sm font-semibold leading-5 text-90 text-danger">
                                                    There is no user exist.
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div> <!-- ./search -->

                        <span v-if="invalidUser && form.user.touched && form.user.value !== ''" class="mt-2 text-danger">Please select a valid user.</span>
                    
                    </div>
                </div>


            </div>

            <div class="flex justify-content-end mt-3">
                <button 
                    :disabled="invalidUrl || invalidPublishedAt || invalidUser"
                    type="submit" 
                    class="btn btn-default btn-primary inline-flex items-center relative">
                    Create Fav
                </button>
            </div>
        </form>
    </div>
</template>

<script>
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
                } )
                .catch( _ => {
                    Nova.error('Error')
                } )
            
            this.resetForm()
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