<template>
    <div class="c-fav-creation-form">

        <form @submit.prevent="handleSubmit">
            <div>

                <div class="c-card__title-wrapper c-card__title__border-left">
                    <h2 class="c-card__title">Create Fav</h2>
                </div>

                <!-- URL -->
                <div class="c-form-field-wrapper c-border-bottom">
                    <FormField 
                        :value="getUrlField.value"
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
                        :value="getPublishedAtField.value"
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
                                :value="getUserSearch"
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
                            <div v-for="user in getAvailableUsers" :key="user.value" @click="selectUser(user)"
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
                        @click="resetFavForm"
                        type="button" 
                        class="c-btn c-btn-shadow-effect btn-clear">
                        X
                    </button>
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
import { mapGetters, mapActions } from 'vuex';
// Styles
import './FavCreationForm.css'

export default {
    name: 'FavCreationForm',

    computed: {
        ...mapGetters('UserStore', ['getAvailableUsers']),
        ...mapGetters('FavStore', ['getUserSearch', 'getUrlField', 'getPublishedAtField', 'getUserField']),

        invalidUrl() {
            const url = this.getUrlField
            return url.value === '' || !url.value.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
        },

        invalidPublishedAt() {
            const publishedAt = this.getPublishedAtField
            return publishedAt.value === '' || !publishedAt.value.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
        },

        invalidUser() {
            const user = this.getUserField
            return user.value === ''
        },

        showUrlErrorMessage() {
            return this.invalidUrl && this.getUrlField.touched && this.getUrlField.value !== ''
        },

        showPublishedAtErrorMessage() {
            return this.invalidPublishedAt && this.getPublishedAtField.touched && this.getPublishedAtField.value !== ''
        },

        showUserErrorMessage() {
            return this.invalidUser && this.getUserField.touched && this.getUserField.value !== ''
        },

        getSelectedUserName() {
            return this.getUserField.display ? `: ${this.getUserField.display}`: ''
        },
        
        submitDisabled() {
            return this.invalidUrl || this.invalidPublishedAt || this.invalidUser
        },

        noSearchResults() {
            return this.getAvailableUsers.length === 0 && this.getUserSearch !== ''
        }
    },

    methods: {
        ...mapActions('UserStore', ['fetchUsers']),
        ...mapActions('FavStore', ['addFav', 'updateFavFormField', 'resetFavForm']),

        async handleSubmit() {
            const url = this.getUrlField.value;
            const publishedAt = this.getPublishedAtField.value;
            const user = this.getUserField.value;

            try{
                const res = await this.addFav({url, publishedAt, user})
                Nova.success('Created')
                this.resetFavForm()
            }catch(e){
                Nova.error('Error')
            }
            
        },

        async handleSearchUser($e) {
            this.updateFavFormField({ field: 'user', attr: 'userSearch', value: $e.target.value })

            try{
                await this.fetchUsers(this.getUserSearch)
            }catch(e) {
                Nova.error('Error searching for user')
            }
        },

        selectUser(availableUser) {
            this.updateFavFormField({ field: 'user', attr: 'value', value: availableUser.value })
            this.updateFavFormField({ field: 'user', attr: 'display', value: availableUser.display })
            this.updateFavFormField({ field: 'user', attr: 'userSearch', value: '' })
            this.fetchUsers('')
        },

        setTouched($e) {
            this.updateFavFormField({ field: $e.key, attr: 'touched', value: true })
        },

        setValue($e) {
            this.updateFavFormField({ field: $e.key, attr: 'value', value: $e.target.value })
        }
    }
}
</script>